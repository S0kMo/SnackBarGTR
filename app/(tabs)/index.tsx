import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductCard } from "@/components/ProductCard";
import { CategoryTabs } from "@/components/CategoryTabs";
import { fetchCategories, fetchProductsByCategory } from "@/services/api";
import { Category, Product } from "@/types";
import { Image } from "expo-image";
import { Leaf } from "lucide-react-native";
import { styles } from "@/constants/styles";

export default function HomeScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // Load categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await fetchCategories();
        setCategories(cats);
        if (cats.length > 0) {
          setSelectedCategory(cats[0].id);
        }
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };

    loadCategories();
  }, []);

  // Load products when category changes
  useEffect(() => {
    if (!selectedCategory) return;

    const loadProducts = async () => {
      setLoading(true);
      try {
        const prods = await fetchProductsByCategory(selectedCategory);
        setProducts(prods);
        console.log("Loaded products for category", selectedCategory, prods);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedCategory]);

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={true}
        contentContainerStyle={{ padding: 0 }}
      >
        <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
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
              <Text style={styles.subBadgeText}>Fresh • Clean • Local 🇰🇭</Text>
            </View>
          </View>

          {/* 4. Main White App Content Area (Pulled upward via negative margin) */}
          <View style={styles.mainContent}>
            {/* Category Tabs */}
            <CategoryTabs
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />

            {/* Products Grid */}
            <View style={style.section}>
              <Text style={styles.sectionHeading}>Our top picks</Text>
              {loading ? (
                <Text style={style.loadingText}>Loading products...</Text>
              ) : products.length === 0 ? (
                <Text style={style.emptyText}>No products available</Text>
              ) : (
                <FlatList
                  data={products}
                  renderItem={({ item }) => <ProductCard product={item} />}
                  keyExtractor={(item) => item.id}
                  numColumns={2}
                  scrollEnabled={false}
                  columnWrapperStyle={style.gridRow}
                />
              )}
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  loadingText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    paddingVertical: 20,
  },
  gridRow: {
    justifyContent: "space-between",
  },
  section: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
});
