import { CategoryTabs } from "@/components/CategoryTabs";
import { ProductCard } from "@/components/ProductCard";
import { styles } from "@/constants/styles";
import { fetchCategories, fetchProductsByCategory } from "@/services/api";
import { Category, Product } from "@/types";
import { Image } from "expo-image";
import { Leaf } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
      <FlatList
        data={products}
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
                {loading && (
                  <Text style={style.loadingText}>Loading products...</Text>
                )}
                {!loading && products.length === 0 && (
                  <Text style={style.emptyText}>No products available</Text>
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
  section: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
});
