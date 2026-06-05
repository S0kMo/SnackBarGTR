import { styles } from "@/constants/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { Image } from "expo-image";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useTelegram } from "@/context/TelegramContext";
import { fetchUserOrders } from "@/services/api";
import { formatPrice } from "@/utils/formatPrice";
import { Order } from "@/types";

export default function ProfileScreen() {
  const { user, isReady } = useTelegram();
  const [selectedProtocol, setSelectedProtocol] = useState("The Network Ninja");
  const [gtrPoints] = useState(420);
  const [ecoStatus] = useState("Elite");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (isReady && user) {
      loadOrders();
    }
  }, [isReady, user]);

  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      const userId = user?.id?.toString() || "guest";
      const userOrders = await fetchUserOrders(userId);
      setOrders(userOrders || []);
    } catch (error) {
      console.error("Error loading orders:", error);
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  if (!isReady) {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <MaterialCommunityIcons name="loading" size={48} color="#20a653" />
          <Text style={{ marginTop: 12, fontSize: 14, color: "#666" }}>
            Loading...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const displayName = user
    ? `${user.firstName}${user.lastName ? " " + user.lastName : ""}`
    : "GTR Student";

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 24,
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card Container */}
        <View style={styles.profileCardBody}>
          {/* Avatar Section */}
          <View style={styles.avatarOuterFrame}>
            <View style={styles.avatarInnerWrapper}>
              {user?.photoUrl ? (
                <Image
                  source={{ uri: user.photoUrl }}
                  style={{ width: "100%", height: "100%", borderRadius: 64 }}
                  contentFit="cover"
                />
              ) : (
                <MaterialCommunityIcons
                  name="account"
                  size={64}
                  color="#059669"
                />
              )}
            </View>
            <TouchableOpacity style={styles.avatarCameraAction}>
              <MaterialCommunityIcons name="camera" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          {/* User Name */}
          <Text style={styles.profileInputName}>{displayName}</Text>
          {/* Username */}
          {user?.username && (
            <Text style={{ fontSize: 14, color: "#94a3b8", marginBottom: 24 }}>
              @{user.username}
            </Text>
          )}

          {/* Protocol Selection */}
          <View style={styles.inputStackGroup}>
            <Text style={styles.inputFieldHeading}>PROTOCOL</Text>
            <View style={styles.nativeSelectContainer}>
              <Picker
                selectedValue={selectedProtocol}
                onValueChange={(itemValue: React.SetStateAction<string>) =>
                  setSelectedProtocol(itemValue)
                }
                style={[styles.nativeSelectContainer]}
              >
                {" "}
                <Picker.Item
                  label="The Network Ninja"
                  value="The Network Ninja"
                />
                <Picker.Item
                  label="Community Builder"
                  value="Community Builder"
                />
                <Picker.Item label="Eco Warrior" value="Eco Warrior" />
              </Picker>
            </View>
          </View>
          {/* Metrics Row */}
          <View style={styles.metricsSplitFooterRow}>
            <View style={styles.metricsColumnNode}>
              <Text style={styles.inputFieldHeading}>GTR POINTS</Text>
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: "900",
                  color: "#059669",
                  marginTop: 12,
                }}
              >
                {gtrPoints}
              </Text>
            </View>
            <View
              style={[
                styles.metricsColumnNode,
                { borderLeftWidth: 1, borderLeftColor: "#d9dadb" },
              ]}
            >
              <Text style={styles.inputFieldHeading}>ECO STATUS</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 26,
                    fontWeight: "900",
                    color: "#0f172a",
                    marginTop: 5,
                    marginLeft: 8,
                  }}
                >
                  {ecoStatus}🌿
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Order History Section */}
        <View style={{ width: "100%", marginTop: 32 }}>
          <Text style={styles.inputFieldHeading}>ORDER HISTORY</Text>

          {loadingOrders ? (
            <View style={{ paddingVertical: 24, alignItems: "center" }}>
              <ActivityIndicator size="small" color="#20a653" />
            </View>
          ) : !orders || orders.length === 0 ? (
            <View style={{ marginTop: 16, paddingHorizontal: 0 }}>
              <Text
                style={{
                  fontSize: 14,
                  color: "#94a3b8",
                  textAlign: "center",
                  paddingVertical: 24,
                }}
              >
                No orders yet. Start ordering to see your history!
              </Text>
            </View>
          ) : (
            <View style={{ marginTop: 16, gap: 12 }}>
              {orders.map((order) => (
                <View
                  key={order.id}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 12,
                    padding: 16,
                    borderWidth: 1,
                    borderColor: "#e2e8f0",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 12,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "700",
                        color: "#0f172a",
                      }}
                    >
                      Order #{order.id?.slice(0, 8) || "N/A"}
                    </Text>
                    <View
                      style={{
                        backgroundColor:
                          order.status === "completed"
                            ? "#dcfce7"
                            : order.status === "pending"
                              ? "#fef3c7"
                              : "#fee2e2",
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderRadius: 6,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "600",
                          color:
                            order.status === "completed"
                              ? "#16a34a"
                              : order.status === "pending"
                                ? "#ca8a04"
                                : "#dc2626",
                          textTransform: "capitalize",
                        }}
                      >
                        {order.status || "pending"}
                      </Text>
                    </View>
                  </View>

                  <Text
                    style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}
                  >
                    {(() => {
                      const dateValue = order.timestamp || order.createdAt;
                      if (!dateValue) return "N/A";
                      try {
                        const date =
                          typeof dateValue === "string"
                            ? new Date(dateValue)
                            : dateValue instanceof Date
                              ? dateValue
                              : new Date();
                        return date.toLocaleDateString();
                      } catch {
                        return "N/A";
                      }
                    })()}
                  </Text>

                  <View
                    style={{
                      backgroundColor: "#f8fafc",
                      padding: 8,
                      borderRadius: 8,
                      marginBottom: 8,
                    }}
                  >
                    {order.items?.map((item, idx) => (
                      <Text
                        key={idx}
                        style={{ fontSize: 12, color: "#475569" }}
                      >
                        {item.quantity}x {item.product?.name || "Item"}
                      </Text>
                    ))}
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontSize: 12, color: "#64748b" }}>
                      Total:
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "700",
                        color: "#059669",
                      }}
                    >
                      {formatPrice(order.total || 0)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
