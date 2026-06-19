import { styles } from "@/constants/styles";
import { formatPrice } from "@/utils/formatPrice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export type OrderReceipt = {
  orderId: string;
  reference?: string;
  paymentMethod: string;
  total: number;
};

type CheckoutModalProps = {
  visible: boolean;
  isProcessing: boolean;
  selectedPayment: string | null;
  checkoutError: string;
  orderReceipt: OrderReceipt | null;
  disablePaymentOptions: boolean;
  onClose: () => void;
  onSelectPayment: (method: string) => void;
};

export const CheckoutModal = ({
  visible,
  isProcessing,
  selectedPayment,
  checkoutError,
  orderReceipt,
  disablePaymentOptions,
  onClose,
  onSelectPayment,
}: CheckoutModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalScrimBackdrop} onPress={onClose}>
        <Pressable
          style={styles.modalSurfaceBody}
          onPress={(event) => event.stopPropagation()}
        >
          {orderReceipt ? (
            <>
              <View
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 36,
                  backgroundColor: "#dcfce7",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 18,
                }}
              >
                <MaterialCommunityIcons
                  name="check-circle"
                  size={44}
                  color="#16a34a"
                />
              </View>

              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "900",
                  color: "#0f172a",
                  marginBottom: 8,
                  textAlign: "center",
                }}
              >
                Order placed
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#64748b",
                  textAlign: "center",
                  marginBottom: 24,
                }}
              >
                Your receipt has been saved to your profile history.
              </Text>

              <View
                style={{
                  width: "100%",
                  backgroundColor: "#f8fafc",
                  borderRadius: 20,
                  padding: 18,
                  marginBottom: 18,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 12,
                  }}
                >
                  <Text style={{ color: "#64748b", fontSize: 13 }}>
                    Order ID
                  </Text>
                  <Text
                    style={{
                      color: "#0f172a",
                      fontSize: 13,
                      fontWeight: "700",
                    }}
                  >
                    #{orderReceipt.reference || orderReceipt.orderId.slice(0, 8)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 12,
                  }}
                >
                  <Text style={{ color: "#64748b", fontSize: 13 }}>
                    Payment
                  </Text>
                  <Text
                    style={{
                      color: "#0f172a",
                      fontSize: 13,
                      fontWeight: "700",
                      textTransform: "capitalize",
                    }}
                  >
                    {orderReceipt.paymentMethod === "scan"
                      ? "Scan & Pay"
                      : "Pay on Delivery"}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#64748b", fontSize: 13 }}>
                    Total
                  </Text>
                  <Text
                    style={{
                      color: "#059669",
                      fontSize: 16,
                      fontWeight: "900",
                    }}
                  >
                    {formatPrice(orderReceipt.total)}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.checkoutActionButton}
                onPress={onClose}
              >
                <Text style={styles.checkoutActionButtonText}>DONE</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
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

              {checkoutError ? (
                <View
                  style={{
                    width: "100%",
                    backgroundColor: "#fee2e2",
                    borderRadius: 14,
                    padding: 12,
                    marginBottom: 16,
                  }}
                >
                  <Text
                    style={{
                      color: "#b91c1c",
                      fontSize: 13,
                      fontWeight: "700",
                      textAlign: "center",
                    }}
                  >
                    {checkoutError}
                  </Text>
                </View>
              ) : null}

              <TouchableOpacity
                style={styles.paymentChannelButton}
                onPress={() => onSelectPayment("scan")}
                disabled={isProcessing || disablePaymentOptions}
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
                    style={{
                      fontSize: 18,
                      fontWeight: "700",
                      color: "#0f172a",
                    }}
                  >
                    Scan & Pay
                  </Text>
                  <Text
                    style={{ fontSize: 14, color: "#94a3b8", marginTop: 4 }}
                  >
                    Fastest GTR Node link
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.paymentChannelButton}
                onPress={() => onSelectPayment("delivery")}
                disabled={isProcessing || disablePaymentOptions}
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
                    style={{
                      fontSize: 18,
                      fontWeight: "700",
                      color: "#0f172a",
                    }}
                  >
                    Pay on Delivery
                  </Text>
                  <Text
                    style={{ fontSize: 14, color: "#94a3b8", marginTop: 4 }}
                  >
                    Cash at the classroom
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onClose}
                style={{ marginTop: 16, paddingVertical: 12 }}
                disabled={isProcessing}
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
            </>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
};
