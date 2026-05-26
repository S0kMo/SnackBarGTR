import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/formatPrice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { fetchCategories, fetchProductsByCategory } from "@/services/api";

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
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="shopping" size={64} color="#ddd" />
          <Text style={styles.emptyText}>No active cravings yet...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Current Basket 🧺</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.product.name}</Text>
              <Text style={styles.itemPrice}>
                {formatPrice(item.product.price)}
              </Text>
            </View>

            <View style={styles.quantityControl}>
              <TouchableOpacity
                onPress={() =>
                  updateQuantity(
                    item.product.id,
                    Math.max(1, item.quantity - 1),
                  )
                }
                style={styles.quantityButton}
              >
                <Text style={styles.quantityButtonText}>−</Text>
              </TouchableOpacity>

              <Text style={styles.quantity}>{item.quantity}</Text>

              <TouchableOpacity
                onPress={() =>
                  updateQuantity(item.product.id, item.quantity + 1)
                }
                style={styles.quantityButton}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => removeFromCart(item.product.id)}
                style={styles.removeButton}
              >
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
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.footer}>
        <View style={styles.subtotal}>
          <Text style={styles.subtotalLabel}>SUBTOTAL</Text>
          <Text style={styles.subtotalPrice}>{formatPrice(total)}</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>CHECKOUT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginTop: 16,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  cartItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: "#20a653",
    fontWeight: "600",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#20a653",
  },
  quantity: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
    minWidth: 20,
    textAlign: "center",
  },
  removeButton: {
    paddingHorizontal: 8,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#1a1a2e",
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  subtotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  subtotalLabel: {
    fontSize: 14,
    color: "#888",
    fontWeight: "600",
    letterSpacing: 1,
  },
  subtotalPrice: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
  },
  checkoutButton: {
    backgroundColor: "#20a653",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },
});
