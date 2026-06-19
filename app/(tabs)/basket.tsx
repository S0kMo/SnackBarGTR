import { styles } from "@/constants/styles";
import { useCart } from "@/context/CartContext";
import { useTelegram } from "@/context/TelegramContext";
import { submitOrder } from "@/services/api";
import { formatPrice } from "@/utils/formatPrice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modal, Pressable } from "react-native";

export default function BasketScreen() {
  const { items, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useTelegram();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Your basket is empty!");
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePaymentSelect = async (method: string) => {
    setSelectedPayment(method);
    setIsProcessing(true);

    try {
      const userId = user?.id?.toString() || "guest";
      const result = await submitOrder(items, userId, method);

      if (result.success) {
        alert(`✓ Order placed successfully!\nOrder ID: ${result.orderId}`);
        clearCart();
        setShowPaymentModal(false);
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error processing order:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <View style={styles.emptyCartWrapper}>
          <MaterialCommunityIcons name="shopping" size={64} color="#ddd" />
          <Text style={styles.emptyCartText}>No active cravings yet...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAF8" }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id}
        renderItem={({ item }) => (
          <View style={styles.cartItemRow}>
            <View style={styles.cartItemLeftSide}>
              <View
                style={[
                  styles.cartItemImageFrame,
                  { backgroundColor: "#f0f0f0" },
                ]}
              >
                {item.product.image ? (
                  <Image
                    source={{ uri: item.product.image }}
                    style={{ width: "100%", height: "100%", borderRadius: 12 }}
                    contentFit="cover"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="image-off"
                    size={24}
                    color="#999"
                  />
                )}
              </View>
              <View>
                <Text style={styles.cartItemTitle}>{item.product.name}</Text>
                <Text style={styles.cartItemCost}>
                  {formatPrice(item.product.price)}
                </Text>
              </View>
            </View>

            <View style={styles.quantityControlBox}>
              <TouchableOpacity
                onPress={() =>
                  updateQuantity(
                    item.product.id,
                    Math.max(1, item.quantity - 1),
                  )
                }
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "600", color: "#20a653" }}
                >
                  −
                </Text>
              </TouchableOpacity>

              <Text style={styles.quantityValueText}>{item.quantity}</Text>

              <TouchableOpacity
                onPress={() =>
                  updateQuantity(item.product.id, item.quantity + 1)
                }
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "600", color: "#20a653" }}
                >
                  +
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => removeFromCart(item.product.id)}>
                <MaterialCommunityIcons
                  name="trash-can"
                  size={18}
                  color="#ff4444"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        scrollEnabled={true}
        contentContainerStyle={[
          styles.cartListWrapper,
          { paddingHorizontal: 16, paddingVertical: 16, paddingBottom: 300 },
        ]}
      />
      <View style={styles.checkoutSummaryCard}>
        <View style={styles.summaryMetricsRow}>
          <Text style={styles.summaryMetricsLabel}>SUBTOTAL</Text>
          <Text style={styles.summaryMetricsAmount}>{formatPrice(total)}</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutActionButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutActionButtonText}>CHECKOUT</Text>
        </TouchableOpacity>
      </View>
      {/* Payment Method Modal */}
      <Modal
        visible={showPaymentModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPaymentModal(false)}
      >
        <Pressable
          style={styles.modalScrimBackdrop}
          onPress={() => setShowPaymentModal(false)}
        >
          <View style={styles.modalSurfaceBody}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "900",
                color: "#0f172a",
                marginBottom: 24,
              }}
            >
              Payment Method
            </Text>

            {/* Scan & Pay Option */}
            <TouchableOpacity
              style={styles.paymentChannelButton}
              onPress={() => handlePaymentSelect("scan")}
              disabled={isProcessing}
            >
              <View style={styles.paymentChannelIconFrame}>
                {isProcessing && selectedPayment === "scan" ? (
                  <ActivityIndicator size="small" color="#0f172a" />
                ) : (
                  <MaterialCommunityIcons
                    name="qrcode"
                    size={32}
                    color="#0f172a"
                  />
                )}
              </View>
              <View>
                <Text
                  style={{ fontSize: 18, fontWeight: "700", color: "#0f172a" }}
                >
                  Scan & Pay
                </Text>
                <Text style={{ fontSize: 14, color: "#94a3b8", marginTop: 4 }}>
                  Fastest GTR Node link
                </Text>
              </View>
            </TouchableOpacity>

            {/* Pay on Delivery Option */}
            <TouchableOpacity
              style={styles.paymentChannelButton}
              onPress={() => handlePaymentSelect("delivery")}
              disabled={isProcessing}
            >
              <View style={styles.paymentChannelIconFrame}>
                {isProcessing && selectedPayment === "delivery" ? (
                  <ActivityIndicator size="small" color="#0f172a" />
                ) : (
                  <MaterialCommunityIcons
                    name="truck-fast"
                    size={32}
                    color="#0f172a"
                  />
                )}
              </View>
              <View>
                <Text
                  style={{ fontSize: 18, fontWeight: "700", color: "#0f172a" }}
                >
                  Pay on Delivery
                </Text>
                <Text style={{ fontSize: 14, color: "#94a3b8", marginTop: 4 }}>
                  Cash at the classroom
                </Text>
              </View>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              onPress={() => setShowPaymentModal(false)}
              style={{ marginTop: 16, paddingVertical: 12 }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  color: "#94a3b8",
                  letterSpacing: 1,
                  textAlign: "center",
                  textTransform: "uppercase",
                }}
              >
                CANCEL
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
