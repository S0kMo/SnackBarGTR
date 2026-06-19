import { CartQuantityControl } from "@/components/CartQuantityControl";
import { styles } from "@/constants/styles";
import { CartItem } from "@/types";
import { formatPrice } from "@/utils/formatPrice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

type CartItemCardProps = {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
};

export function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemCardProps) {
  return (
    <View style={styles.cartItemRow}>
      <View style={[styles.cartItemImageFrame, { backgroundColor: "#f0f0f0" }]}>
        {item.product.image ? (
          <Image
            source={{ uri: item.product.image }}
            style={{ width: "100%", height: "100%", borderRadius: 14 }}
            contentFit="cover"
          />
        ) : (
          <MaterialCommunityIcons name="image-off" size={24} color="#999" />
        )}
      </View>

      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemTitle} numberOfLines={2}>
          {item.product.name}
        </Text>
        <Text style={styles.cartItemCost}>{formatPrice(item.product.price)}</Text>

        <View style={styles.cartItemControlRow}>
          <CartQuantityControl
            productId={item.product.id}
            quantity={item.quantity}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemove}
          />
        </View>
      </View>
    </View>
  );
}
