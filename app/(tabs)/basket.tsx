import { styles } from "@/constants/styles";
import { CheckoutModal, OrderReceipt } from "@/components/CheckoutModal";
import { useCart } from "@/context/CartContext";
import { useOrderRefresh } from "@/context/OrderRefreshContext";
import { useTelegram } from "@/context/TelegramContext";
import { submitOrder } from "@/services/api";
import { formatPrice } from "@/utils/formatPrice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BasketScreen() {
  const router = useRouter();
  const { items, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const { notifyOrdersUpdated } = useOrderRefresh();
  const { user } = useTelegram();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderReceipt, setOrderReceipt] = useState<OrderReceipt | null>(null);
  const [checkoutError, setCheckoutError] = useState("");

  const handleCheckout = () => {
    if (items.length === 0) {
      setCheckoutError("Your basket is empty.");
      setShowPaymentModal(true);
      return;
    }

    setCheckoutError("");
    setOrderReceipt(null);
    setShowPaymentModal(true);
  };

  const handlePaymentSelect = async (method: string) => {
    setSelectedPayment(method);
    setIsProcessing(true);
    setCheckoutError("");

    try {
      const userId = user?.id?.toString() || "guest";
      const orderTotal = total;
      const result = await submitOrder(items, userId, method);

      if (result.success) {
        setOrderReceipt({
          orderId: result.orderId,
          paymentMethod: method,
          total: orderTotal,
        });
        clearCart();
        notifyOrdersUpdated();
      } else {
        setCheckoutError("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error processing order:", error);
      setCheckoutError("An error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const closeCheckoutModal = () => {
    if (isProcessing) return;

    setShowPaymentModal(false);
    setSelectedPayment(null);
    setCheckoutError("");
    setOrderReceipt(null);
  };

  if (items.length === 0 && !showPaymentModal) {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <View style={styles.emptyCartWrapper}>
          <MaterialCommunityIcons name="shopping" size={64} color="#ddd" />
          <Text style={styles.emptyCartText}>No active cravings yet...</Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#20a653",
              borderRadius: 14,
              paddingHorizontal: 22,
              paddingVertical: 12,
              marginTop: 18,
            }}
            onPress={() => router.push("/")}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 13,
                fontWeight: "800",
              }}
            >
              BROWSE MENU
            </Text>
          </TouchableOpacity>
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
      <CheckoutModal
        visible={showPaymentModal}
        isProcessing={isProcessing}
        selectedPayment={selectedPayment}
        checkoutError={checkoutError}
        orderReceipt={orderReceipt}
        disablePaymentOptions={items.length === 0}
        onClose={closeCheckoutModal}
        onSelectPayment={handlePaymentSelect}
      />
    </SafeAreaView>
  );
}
