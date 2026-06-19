import { Tabs } from "expo-router";
import { Home, ShoppingBasket, User } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { styles } from "@/constants/styles";
import { useCart } from "@/context/CartContext";

export default function TabLayout() {
  const { items } = useCart();
  const hasCartItems = items.length > 0;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#20a653",
        tabBarInactiveTintColor: "#575656",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#e5e7eb",
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="basket"
        options={{
          title: "Basket",
          tabBarIcon: ({ color, size }) => (
            <View style={{ position: "relative" }}>
              <ShoppingBasket color={color} size={30} />
              {hasCartItems && <View style={styles.tabBarNotificationDot} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User color={color} size={28} />,
        }}
      />
    </Tabs>
  );
}
