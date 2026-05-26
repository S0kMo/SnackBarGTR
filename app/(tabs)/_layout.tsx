import { Tabs } from "expo-router";
import React from "react";
import { Home, ShoppingCart, User } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/constants/styles";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#20a653",
        tabBarInactiveTintColor: "#575656",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          marginBottom: 0,
          marginTop: 10,
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
            <ShoppingCart color={color} size={28} />
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
