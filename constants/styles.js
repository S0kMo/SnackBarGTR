import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  // ==========================================
  // GLOBAL LAYOUT & WRAPPERS
  // ==========================================

  // Used on the outermost <View> enclosing the entire screen
  // Replaces: min-h-screen bg-[#F8FAF8] text-slate-900 font-sans pb-32
  screenContainer: {
    flex: 1,
    backgroundColor: "#F8FAF8",
    padding: 0,
    // Replaces pb-32 to clear the navigation bar
  },

  // Used on the <ScrollView> or <View> wrapping the tab contents
  // Replaces: px-6 -mt-4 relative z-20
  mainContent: {
    borderRadius: 40,
    paddingHorizontal: 0,
    marginTop: 4,
    zIndex: 20,
    position: "relative",
  },

  // ==========================================
  // HEADER BANNER COMPONENT
  // ==========================================

  // Used on the <View> wrapping the top header image background
  // Replaces: relative h-56 flex flex-col justify-end p-6 overflow-hidden
  headerBanner: {
    position: "relative",
    height: 220,
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: 0,
    marginHorizontal: -8,
    overflow: "hidden",
  },

  // Used on the background <Image> inside the header
  // Replaces: w-full h-full object-cover brightness-50
  bannerImage: {
    position: "absolute",
    left: -8,
    right: -8,
    top: 0,
    bottom: 0,
    opacity: 1, // use overlay for tinting instead of lowering image opacity
  },

  // Used on the <View> creating a fade effect over the image
  // Replaces: absolute inset-0 bg-gradient-to-t from-[#F8FAF8] to-transparent
  bannerOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    // simple dark overlay to improve text contrast
    backgroundColor: "rgba(0,0,0,0.28)",
  },

  // Used on the row container holding the Leaf icon and Title text
  // Replaces: flex items-center gap-2 mb-1
  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
    paddingHorizontal: 18,
  },

  // Used on the small container box around the Leaf icon
  // Replaces: bg-emerald-600 p-1.5 rounded-lg shadow-lg
  iconBadgeContainer: {
    backgroundColor: "#059669",
    padding: 6,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: { elevation: 6 },
    }),
  },

  // Used on the "SnackBarGTR" <Text> element
  // Replaces: text-3xl font-black tracking-tight text-white
  mainTitleText: {
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: -0.5,
    color: "#FFFFFF",
  },

  // Used on the sub-badge container ("Frais • Durable • Local")
  // Replaces: text-emerald-900 font-bold bg-white/70 backdrop-blur-sm inline-block px-3 py-1 rounded-full text-[10px] border border-white/50
  subBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Replaces bg-white/70
    alignSelf: "flex-start", // Replaces inline-block behavior
    paddingHorizontal: 0,
    paddingVertical: 2,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    marginBottom: 8,
    marginLeft: 18,
  },

  // Used on the sub-badge <Text> inside the badge container
  // Replaces: text-[10px] text-emerald-900 font-bold
  subBadgeText: {
    fontSize: 10,
    color: "#064e3b",
    fontWeight: "700",
    paddingHorizontal: 18,
  },

  // ==========================================
  // HOME TAB: CATEGORY FILTER ROW
  // ==========================================

  // Used on the horizontal filter pill container layout wrapper
  // Replaces: flex gap-2 p-1 bg-white/50 backdrop-blur-md rounded-full mb-8 border border-white shadow-sm inline-flex overflow-x-auto no-scrollbar max-w-full
  categoryScrollContainer: {
    flexDirection: "row",
    padding: 6,
    backgroundColor: "white50",
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignSelf: "flex-start",
    maxWidth: "100%",
  },

  // Used on individual category pill buttons (<TouchableOpacity>)
  // Replaces: px-5 py-2 rounded-full font-bold text-[10px] transition-all uppercase tracking-widest whitespace-nowrap
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 9999,
  },

  // Appended conditionally to active category pill buttons
  // Replaces: bg-emerald-800 text-white shadow-lg
  categoryButtonActive: {
    backgroundColor: "#064e3b",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: { elevation: 4 },
    }),
  },

  // Used on the <Text> component inside category pills
  // Replaces: text-[10px] font-bold uppercase tracking-widest text-slate-400
  categoryText: {
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: "#94a3b8",
  },

  // Appended conditionally to the active category pill text
  // Replaces: text-white
  categoryTextActive: {
    color: "#FFFFFF",
  },

  // Used on section title headers (e.g., "Our top picks", "Current Basket")
  // Replaces: text-xl font-black mb-6 text-slate-800
  sectionHeading: {
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 8,
    color: "#1e293b",
  },

  // ==========================================
  // HOME TAB: PRODUCT CARD COMPONENT
  // ==========================================

  // Used on the main wrapper layout for displaying cards side-by-side
  // Replaces: grid grid-cols-2 gap-5 mb-8
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 20,
    marginBottom: 32,
  },

  // Used on the card <View> component itself.
  // Replaces background color via dynamic inline styles (`item.bg`) + rounded-[32px] p-4 flex flex-col items-center relative overflow-hidden
  productCard: {
    width: "47%", // Replaces web grid-cols-2 to form 2 clean native columns
    borderRadius: 32,
    padding: 16,
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },

  // Used on the image container inside the card
  // Replaces: w-full h-32 mb-4 flex items-center justify-center
  productImageWrapper: {
    width: "100%",
    height: 128,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  // Used on the product <Image> itself
  // Replaces: h-full w-auto object-contain mix-blend-multiply
  productImage: {
    height: "100%",
    width: "100%",
    resizeMode: "contain", // Native translation for object-contain
  },

  // Used on the wrapper containing metadata text inside cards
  // Replaces: w-full text-left space-y-1
  productTextContainer: {
    width: "100%",
    alignItems: "flex-start",
    gap: 4,
  },

  // Used on product title labels
  // Replaces: font-bold text-slate-800 text-[15px] leading-tight line-clamp-1
  productTitle: {
    fontWeight: "700",
    color: "#1e293b",
    fontSize: 15,
    lineHeight: 18,
  },

  // Used on description blocks under titles
  // Replaces: text-[10px] text-slate-500 line-clamp-2 leading-relaxed min-h-[2.5em]
  productDescription: {
    fontSize: 10,
    color: "#64748b",
    lineHeight: 14,
    minHeight: 35,
  },

  // Used on the lower layout row holding price and add button
  // Replaces: flex justify-between items-center mt-2 pt-1
  productFooterRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingTop: 4,
  },

  // Used on product cost numbers
  // Replaces: font-black text-slate-900 text-lg
  productPriceText: {
    fontWeight: "900",
    color: "#0f172a",
    fontSize: 18,
  },

  // Used on the circular plus button inside product cards
  // Replaces: w-10 h-10 rounded-full bg-white/60 backdrop-blur-sm border-2 border-white flex items-center justify-center text-slate-800 shadow-sm
  addToCartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: { elevation: 2 },
    }),
  },

  // ==========================================
  // BASKET TAB
  // ==========================================

  // Used on the fallback screen when checkout cart is completely empty
  // Replaces: text-center py-12 bg-white rounded-[40px] border-2 border-dashed border-slate-100
  emptyCartWrapper: {
    paddingVertical: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#f1f5f9",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },

  // Used on the text label inside the empty cart view
  // Replaces: text-slate-400 text-sm font-bold italic
  emptyCartText: {
    color: "#94a3b8",
    fontSize: 14,
    fontWeight: "700",
    fontStyle: "italic",
  },

  // Used on structural wrapper enclosing loaded items list
  // Replaces: space-y-4
  cartListWrapper: {
    gap: 16,
  },

  // Used on individual active cart rows
  // Replaces: bg-white rounded-3xl p-4 flex items-center justify-between shadow-sm
  cartItemRow: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: { elevation: 2 },
    }),
  },

  // Used on the leftmost columns grouping item images and info blocks together
  // Replaces: flex items-center gap-4
  cartItemLeftSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  // Used on the image frame boundaries inside basket card item list blocks
  // Replaces dynamic background color (`item.bg`) + w-16 h-16 rounded-2xl flex items-center justify-center p-2
  cartItemImageFrame: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },

  // Used on item label headers inside the basket listing rows
  // Replaces: font-black text-sm
  cartItemTitle: {
    fontWeight: "900",
    fontSize: 14,
    color: "#0f172a",
  },

  // Used on item costing labels inside basket listing rows
  // Replaces: text-xs text-emerald-600 font-bold
  cartItemCost: {
    fontSize: 12,
    color: "#059669",
    fontWeight: "700",
  },

  // Used on quantitative controllers right hand side action docks
  // Replaces: flex items-center gap-3 bg-slate-50 rounded-xl p-1 px-3
  quantityControlBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },

  // Used on numerical counters tracking volume within selectors
  // Replaces: font-black text-sm w-4 text-center
  quantityValueText: {
    fontWeight: "900",
    fontSize: 14,
    width: 16,
    textAlign: "center",
  },

  // ==========================================
  // BASKET TAB: BOTTOM PRICE CARD & BUTTON
  // ==========================================

  // Used on the dark lower summarizing dashboard box component
  // Replaces: bg-slate-900 text-white p-8 rounded-[40px] mt-4 space-y-4 shadow-xl
  checkoutSummaryCard: {
    backgroundColor: "#0f172a",
    padding: 32,
    borderRadius: 40,
    marginTop: 16,
    gap: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
      },
      android: { elevation: 10 },
    }),
  },

  // Used on layout container separating summary descriptions and actual aggregate sums
  // Replaces: flex justify-between items-center
  summaryMetricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // Used on tracking headers ("Subtotal")
  // Replaces: text-xs font-bold uppercase tracking-widest opacity-60
  summaryMetricsLabel: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    opacity: 0.6,
    color: "#FFFFFF",
  },

  // Used on structural dollar totals inside black cards
  // Replaces: text-3xl font-black
  summaryMetricsAmount: {
    fontSize: 30,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  // Used on big buttons triggering checkouts (<TouchableOpacity>)
  // Replaces: w-full bg-emerald-500 text-white py-5 rounded-2xl font-black text-sm
  checkoutActionButton: {
    width: "100%",
    backgroundColor: "#10b981",
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  // Used on texts inside big execution buttons
  // Replaces: text-white font-black text-sm
  checkoutActionButtonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 14,
  },

  // ==========================================
  // ORDER HISTORY SECTION
  // ==========================================

  // Used on structural layout rows for previous order logs
  // Replaces: bg-white/60 border border-slate-100 rounded-3xl p-5 flex items-center justify-between group
  historyRecordRow: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderWidth: 1,
    borderColor: "#f1f5f9",
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  // Used on tiny thumbnail boxes showcasing transaction type vectors
  // Replaces: w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400
  historyIconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
  },

  // Used on rows containing context code labels and current status updates
  // Replaces: flex items-center gap-2
  historyStatusHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  // Used on tracking token references ("REF:")
  // Replaces: text-[10px] font-black text-slate-400 uppercase tracking-tighter
  historyRefToken: {
    fontSize: 10,
    fontWeight: "900",
    color: "#94a3b8",
    textTransform: "uppercase",
  },

  // Used on status dynamic bubbles. Background updates programmatically
  // Replaces base classes: text-[9px] px-2 py-0.5 rounded-full font-bold
  historyStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 9999,
  },

  // Used on historical date texts
  // Replaces: font-bold text-sm text-slate-700
  historyDateText: {
    fontWeight: "700",
    fontSize: 14,
    color: "#334155",
  },

  // ==========================================
  // PROFILE TAB
  // ==========================================

  // Used on central container cards representing profiles
  // Replaces: bg-white rounded-[40px] p-8 text-center shadow-sm border border-slate-50
  profileCardBody: {
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    padding: 32,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f8fafc",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: { elevation: 2 },
    }),
  },

  // Used on structural bounds enclosing avatar layers
  // Replaces: relative w-32 h-32 mx-auto mb-6
  avatarOuterFrame: {
    position: "relative",
    width: 128,
    height: 128,
    marginBottom: 24,
  },

  // Used on the circular framing block around user avatars
  // Replaces: w-full h-full rounded-full bg-emerald-50 border-4 border-white shadow-inner flex items-center justify-center overflow-hidden
  avatarInnerWrapper: {
    width: "100%",
    height: "100%",
    borderRadius: 64,
    backgroundColor: "#ecfdf5",
    borderWidth: 4,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  // Used on buttons triggering image inputs overlays
  // Replaces: absolute bottom-1 right-1 bg-slate-900 text-white p-2 rounded-full border-2 border-white shadow-lg
  avatarCameraAction: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: "#0f172a",
    padding: 8,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: { elevation: 4 },
    }),
  },

  // Used on input lines displaying editable nicknames (<TextInput>)
  // Replaces: text-2xl font-black text-center bg-transparent border-none focus:outline-none w-full mb-8
  profileInputName: {
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
    width: "100%",
    marginBottom: 32,
    color: "#0f172a",
  },

  // Used on dropdown blocks grouping inputs together
  // Replaces: text-left space-y-2
  inputStackGroup: {
    width: "100%",
    alignItems: "flex-start",
    gap: 8,
  },

  // Used on individual text descriptions managing configurations
  // Replaces: text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest
  inputFieldHeading: {
    fontSize: 10,
    fontWeight: "900",
    textTransform: "uppercase",
    color: "#94a3b8",
    marginLeft: 16,
    letterSpacing: 1.5,
  },

  // Used on relative bounds containing custom select elements
  // Replaces: relative wrapper containing w-full bg-[#F1F3F1] border-2 border-transparent rounded-2xl py-4 px-6 font-black text-sm
  nativeSelectContainer: {
    width: "100%",
    backgroundColor: "#F1F3F1",
    borderRadius: 16,
  },

  // Used directly on React Native's `<Picker>` element
  nativePickerElement: {
    width: "100%",
    height: 56,
    color: "#1e293b",
  },

  // Used on split footer dashboard metrics boxes
  // Replaces: grid grid-cols-2 gap-4 mt-10 pt-10 border-t border-slate-100
  metricsSplitFooterRow: {
    flexDirection: "row",
    width: "100%",
    marginTop: 40,
    paddingTop: 40,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },

  // Used on independent metadata metric items
  // Replaces: text-center nodes + border-l border-slate-100 variants
  metricsColumnNode: {
    flex: 1,
    alignItems: "center",
  },

  // ==========================================
  // CHECKOUT MODAL OVERLAY SHEET
  // ==========================================

  // Used on backdrop views blocking interaction fields (<Modal>)
  // Replaces: fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-xl flex items-end sm:items-center justify-end
  modalScrimBackdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    justifyContent: "flex-end", // Aligns modal overlay to sheet from bottom
  },

  // Used on structural bodies floating within sheets
  // Replaces: bg-white w-full max-w-md rounded-t-[40px] sm:rounded-[40px] p-8 sm:p-10 text-center
  modalSurfaceBody: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 40,
    alignItems: "center",
  },

  // Used on card selection docks handling specific channels (QR/COD)
  // Replaces: w-full p-6 bg-slate-50 rounded-3xl flex items-center gap-6 group
  paymentChannelButton: {
    width: "100%",
    padding: 24,
    backgroundColor: "#f8fafc",
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    marginBottom: 16,
  },

  // Used on small vector icon containers inside option rows
  // Replaces: bg-white p-3 rounded-2xl shadow-sm
  paymentChannelIconFrame: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: { elevation: 1 },
    }),
  },

  // ==========================================
  // STICKY BOTTOM NAVIGATION BAR
  // ==========================================

  // Used on bottom layout bars hosting navigational maps
  // Replaces: fixed bottom-0 left-0 right-0 h-24 bg-white border-t border-slate-100 flex justify-around items-center px-10 z-[50]
  stickyBottomTabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 96,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 40,
    zIndex: 50,
  },

  // Used on navigation anchors (<TouchableOpacity>)
  // Replaces: relative flex flex-col items-center justify-center
  tabBarAnchor: {
    position: "relative",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },

  // Used on absolute dots indicating items exist inside basket
  // Replaces: absolute -top-1 -right-1 bg-emerald-500 w-3 h-3 rounded-full border-2 border-white
  tabBarNotificationDot: {
    position: "absolute",
    top: 20,
    right: -2,
    backgroundColor: "#10b981",
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  // Used on textual summaries supporting bottom icons
  // Replaces: text-[9px] font-black uppercase mt-1.5
  tabBarLabelText: {
    fontSize: 9,
    fontWeight: "900",
    textTransform: "uppercase",
    marginTop: 6,
  },
});
