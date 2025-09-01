import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// ✅ Import apps from JSON
import allApps from "@/assets/files.json";

// 📊 Trending apps logic
const trendingApps = allApps
  .filter((app) => app.rating >= 4.5)
  .sort((a, b) => b.rating - a.rating)
  .map((app, index) => ({ ...app, rank: index + 1 }));

// 📊 Progress bar
const ProgressBar = ({ progress }: { progress: number }) => (
  <View style={styles.progressBarContainer}>
    <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
  </View>
);

// 🟦 Card for normal apps
const AppCard = ({ app, progress }: any) => (
  <Link href={{ pathname: "/app-details", params: { ...app } }} asChild>
    <TouchableOpacity style={styles.appCard}>
      <Image source={{ uri: app.icon }} style={styles.appIcon} />
      <View style={styles.appInfo}>
        <Text style={styles.appName}>{app.name}</Text>
        <Text style={styles.appCategory}>{app.category}</Text>
        <Text style={styles.appDescription}>{app.description}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" color="#FFD700" size={16} />
          <Text style={styles.ratingText}>{app.rating}</Text>
        </View>
        {progress !== undefined && <ProgressBar progress={progress} />}
      </View>
    </TouchableOpacity>
  </Link>
);

// 🟨 Card for trending apps
const TrendingAppCard = ({ app, progress }: any) => (
  <Link href={{ pathname: "/app-details", params: { ...app } }} asChild>
    <TouchableOpacity style={styles.trendingAppCard}>
      <Text style={styles.trendingRank}>#{app.rank}</Text>
      <Image source={{ uri: app.icon }} style={styles.trendingAppIcon} />
      <View style={styles.trendingAppInfo}>
        <Text style={styles.trendingAppName}>{app.name}</Text>
        {progress !== undefined && <ProgressBar progress={progress} />}
      </View>
    </TouchableOpacity>
  </Link>
);

export default function AppHomeScreen() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 Search state
  const [downloadProgress, setDownloadProgress] = useState<{ [key: string]: number }>({});

  // Fake download simulation
  const handleDownload = (app: any) => {
    setDownloadProgress((prev) => ({ ...prev, [app.id]: 0 }));
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        const progress = (prev[app.id] || 0) + 0.1;
        if (progress >= 1) clearInterval(interval);
        return { ...prev, [app.id]: Math.min(progress, 1) };
      });
    }, 500);
  };

  // 📌 Filtered + searched apps
  const filteredApps = allApps.filter((app) => {
    const matchesCategory = filter === "All" || app.category === filter;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      app.name.toLowerCase().includes(query) ||
      app.description.toLowerCase().includes(query) ||
      app.category.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  // 📌 Only show search results immediately if typing
  const searchResults =
    searchQuery.trim().length > 0
      ? allApps.filter((app) =>
        [app.name, app.description, app.category].some((field) =>
          field.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
      : [];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <LinearGradient colors={["#6200EE", "#3700B3"]} style={styles.header}>
        <ThemedText type="title" style={styles.headerText}>
          AY Store
        </ThemedText>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            placeholder="Search apps..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery} // 🔍 Search handler
          />
        </View>
      </LinearGradient>

      {/* 🔍 Search Results (just below search bar) */}
      {searchQuery.trim().length > 0 && (
        <View style={styles.section}>

          {searchResults.length > 0 ? (
            searchResults.map((app) => (
              <AppCard key={app.id} app={app} progress={downloadProgress[app.id]} />
            ))
          ) : (
            <Text style={{ textAlign: "center", color: "#888", marginTop: 20 }}>
              No apps found.
            </Text>
          )}
        </View>
      )}

      {/* Banner */}
      <View style={styles.bannerContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.bannerSlider}
        >
          <Image source={require("@/assets/images/banner/banner1.png")} style={styles.bannerImage} />
          <Image source={require("@/assets/images/banner/banner2.png")} style={styles.bannerImage} />
        </ScrollView>
      </View>

      {/* Trending */}
      <View style={styles.section}>
        <ThemedText type="title">Trending Apps</ThemedText>
        <FlatList
          data={trendingApps}
          renderItem={({ item }) => (
            <TrendingAppCard app={item} progress={downloadProgress[item.id]} />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.trendingList}
        />
      </View>

      {/* All Apps */}
      <View style={styles.section}>
        <ThemedText type="title">All Apps</ThemedText>
        <View style={styles.filterContainer}>
          {["All", "Tools", "Games", "Productivity"].map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setFilter(category)}
              style={[styles.filterButton, filter === category && styles.activeFilter]}
            >
              <Text style={[styles.filterText, filter === category && styles.activeFilterText]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {filteredApps.length > 0 ? (
          filteredApps.map((app) => (
            <AppCard key={app.id} app={app} progress={downloadProgress[app.id]} />
          ))
        ) : (
          <Text style={{ textAlign: "center", color: "#888", marginTop: 20 }}>
            No apps found.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },

  // Header
  header: { padding: 16, paddingTop: 50 },
  headerText: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, height: 40 },

  // Sections
  section: { padding: 16 },
  trendingList: { paddingVertical: 10 },

  // Trending apps
  trendingAppCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
    marginRight: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  trendingRank: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#888",
    position: "absolute",
    top: 5,
    left: 5,
  },
  trendingAppIcon: { width: 80, height: 80, borderRadius: 15, marginBottom: 8 },
  trendingAppInfo: { alignItems: "center" },
  trendingAppName: { fontWeight: "bold", marginBottom: 4 },

  // Filters
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 12,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#EEE",
  },
  activeFilter: { backgroundColor: "#6200EE" },
  filterText: { color: "#333" },
  activeFilterText: { color: "white" },

  // Normal apps
  appCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  appIcon: { width: 60, height: 60, borderRadius: 10, marginRight: 16 },
  appInfo: { flex: 1 },
  appName: { fontSize: 16, fontWeight: "bold" },
  appCategory: { color: "#888", marginBottom: 4 },
  appDescription: { color: "#555", marginBottom: 4 },
  ratingContainer: { flexDirection: "row", alignItems: "center" },
  ratingText: { marginLeft: 4, color: "#555" },

  // Progress bar
  progressBarContainer: {
    height: 5,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    marginTop: 6,
    width: "100%",
  },
  progressBar: { height: 5, backgroundColor: "#6200EE", borderRadius: 5 },

  // Banner
  bannerContainer: { height: 200, marginTop: 10 },
  bannerSlider: { width: 400, height: 200 },
  bannerImage: { width: 400, height: 200, resizeMode: "cover" },
});
