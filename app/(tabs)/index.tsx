import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
  BackHandler,
} from "react-native";
import { ProductCard } from "@/components/ProductCard";
import { CategoryTabs } from "@/components/CategoryTabs";
import { fetchCategories, fetchProductsByCategory } from "@/services/firestore";
import { Category, Product } from "@/types";
import { Image } from "expo-image";
import { Leaf } from "lucide-react-native";
import { Colors } from "@/constants/theme";

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
    <SafeAreaView style={styles.header}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.appContainer}>
          <Image
            source={require("@/assets/images/banner.png")}
            style={{
              opacity: 0.9,
              justifyContent: "center",
              width: "100%",
              height: 150,
            }}
          />
        </View>
        <Text style={styles.title}>
          <Leaf style={styles.logo} color="#10B981" size={28} /> SnackBarGTR
        </Text>
        <Text style={styles.tagline}>Frais • Durable • Local 🇰🇭</Text>

        {/* Category Tabs */}
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* Products Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our top picks</Text>
          {loading ? (
            <Text style={styles.loadingText}>Loading products...</Text>
          ) : products.length === 0 ? (
            <Text style={styles.emptyText}>No products available</Text>
          ) : (
            <FlatList
              data={products}
              renderItem={({ item }) => <ProductCard product={item} />}
              keyExtractor={(item) => item.id}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.gridRow}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  btnPrimary: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: "#666",
  },
  section: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  gridRow: {
    justifyContent: "space-between",
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
});
