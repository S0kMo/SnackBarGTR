import { CategoryTabs } from "@/components/CategoryTabs";
import { ProductCard } from "@/components/ProductCard";
import { styles } from "@/constants/styles";
import { fetchAllProducts, fetchCategories } from "@/services/api";
import { Category, Product } from "@/types";
import { Image } from "expo-image";
import { Leaf } from "lucide-react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [menuError, setMenuError] = useState("");

  const visibleProducts = useMemo(() => {
    if (!selectedCategory) return [];
    return products.filter((product) => product.category === selectedCategory);
  }, [products, selectedCategory]);

  const loadMenu = async () => {
    setLoading(true);
    setMenuError("");
    try {
      const [cats, prods] = await Promise.all([
        fetchCategories(),
        fetchAllProducts(),
      ]);

      setCategories(cats);
      setProducts(prods);

      if (cats.length > 0) {
        setSelectedCategory((current) => current || cats[0].id);
      }

      if (cats.length === 0 || prods.length === 0) {
        setMenuError("Menu data is unavailable right now.");
      }
    } catch (error) {
      console.error("Error loading menu data:", error);
      setMenuError("Could not load the menu. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Load menu data on mount
  useEffect(() => {
    loadMenu();
  }, []);

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={visibleProducts}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.productGrid}
        showsVerticalScrollIndicator={false}
        bounces={true}
        ListHeaderComponent={
          <SafeAreaView edges={["bottom"]}>
            {/* Banner View */}
            <View style={styles.headerBanner}>
              <Image
                source={require("@/assets/images/banner.png")}
                style={styles.bannerImage}
                contentFit="cover"
              />

              <View style={styles.bannerOverlay} />

              {/* Logo & Application Title Row */}
              <View style={styles.headerTitleRow}>
                <View style={styles.iconBadgeContainer}>
                  <Leaf className="text-white" size={28} color="#FFFFFF" />
                </View>
                <Text style={styles.mainTitleText}>SnackBarGTR</Text>
              </View>

              {/* Sub-tag Badge */}
              <View style={styles.subBadge}>
                <Text style={styles.subBadgeText}>
                  Fresh • Clean • Local 🇰🇭
                </Text>
              </View>
            </View>

            {/* Main White App Content Area */}
            <View style={styles.mainContent}>
              {/* Category Tabs */}
              <CategoryTabs
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
              />

              {/* Products Grid Header */}
              <View style={style.section}>
                <Text style={styles.sectionHeading}>Our top picks</Text>
                {loading && visibleProducts.length === 0 && (
                  <View style={style.stateCard}>
                    <ActivityIndicator size="small" color="#20a653" />
                    <Text style={style.stateTitle}>Loading menu</Text>
                    <Text style={style.stateText}>Getting today&apos;s picks.</Text>
                  </View>
                )}
                {!loading && menuError && visibleProducts.length === 0 && (
                  <View style={style.stateCard}>
                    <MaterialCommunityIcons
                      name="cloud-alert"
                      size={36}
                      color="#ef4444"
                    />
                    <Text style={style.stateTitle}>Menu unavailable</Text>
                    <Text style={style.stateText}>{menuError}</Text>
                    <TouchableOpacity style={style.retryButton} onPress={loadMenu}>
                      <Text style={style.retryButtonText}>TRY AGAIN</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {!loading && !menuError && visibleProducts.length === 0 && (
                  <View style={style.stateCard}>
                    <MaterialCommunityIcons
                      name="food-off"
                      size={36}
                      color="#94a3b8"
                    />
                    <Text style={style.stateTitle}>Nothing here yet</Text>
                    <Text style={style.stateText}>
                      This category has no products today.
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </SafeAreaView>
        }
      />
    </View>
  );
}

const style = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#b22020",
    marginBottom: 12,
  },
  stateCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginTop: 12,
  },
  stateTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0f172a",
    marginTop: 10,
  },
  stateText: {
    fontSize: 13,
    color: "#64748b",
    textAlign: "center",
    marginTop: 4,
  },
  retryButton: {
    backgroundColor: "#20a653",
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginTop: 14,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
  },
  section: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
});
