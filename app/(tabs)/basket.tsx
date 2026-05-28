import { styles } from "@/constants/styles";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BasketScreen() {
  const { items, total, removeFromCart, updateQuantity } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Your basket is empty!");
      return;
    }
    // TODO: Navigate to payment screen
    alert("Proceeding to checkout...");
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
    </SafeAreaView>
  );
}
