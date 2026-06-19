import { styles } from "@/constants/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type CartQuantityControlProps = {
  productId: string;
  quantity: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
};

export function CartQuantityControl({
  productId,
  quantity,
  onUpdateQuantity,
  onRemove,
}: CartQuantityControlProps) {
  return (
    <View style={styles.quantityControlBox}>
      <TouchableOpacity
        style={styles.quantityActionButton}
        onPress={() => onUpdateQuantity(productId, Math.max(1, quantity - 1))}
      >
        <Text style={styles.quantityActionText}>-</Text>
      </TouchableOpacity>

      <Text style={styles.quantityValueText}>{quantity}</Text>

      <TouchableOpacity
        style={styles.quantityActionButton}
        onPress={() => onUpdateQuantity(productId, quantity + 1)}
      >
        <Text style={styles.quantityActionText}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.quantityActionButton}
        onPress={() => onRemove(productId)}
      >
        <MaterialCommunityIcons name="trash-can" size={18} color="#ff4444" />
      </TouchableOpacity>
    </View>
  );
}
