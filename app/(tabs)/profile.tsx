import { styles } from "@/constants/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const [userName, setUserName] = useState("GTR Student");
  const [selectedProtocol, setSelectedProtocol] = useState("The Network Ninja");
  const [gtrPoints] = useState(420);
  const [ecoStatus] = useState("Elite");

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
              <MaterialCommunityIcons
                name="account"
                size={64}
                color="#059669"
              />
            </View>
            <TouchableOpacity style={styles.avatarCameraAction}>
              <MaterialCommunityIcons name="camera" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          {/* User Name */}
          <Text style={styles.profileInputName}>{userName}</Text>

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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
