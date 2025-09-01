import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

// ✅ Import JSON data
import allApps from "@/assets/files.json";

const trendingApps = allApps.filter((app) => app.rating > 4.5);

const AppCard = ({ app }: { app: any }) => (
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
      </View>
    </TouchableOpacity>
  </Link>
);

const TrendingCard = ({ app }: { app: any }) => (
  <Link href={{ pathname: "/app-details", params: { ...app } }} asChild>
    <TouchableOpacity style={styles.trendingCard}>
      <Image source={{ uri: app.icon }} style={styles.trendingAppIcon} />
      <Text style={styles.trendingAppName}>{app.name}</Text>
    </TouchableOpacity>
  </Link>
);

export default function AppsScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Trending Section */}
      <View style={styles.section}>
        <ThemedText type="title" style={styles.sectionTitle}>
          Trending
        </ThemedText>
        <FlatList
          data={trendingApps}
          renderItem={({ item }) => <TrendingCard app={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.trendingList}
        />
      </View>

      {/* All Apps Section */}
      <View style={styles.section}>
        <View style={styles.header}>
          <ThemedText type="title">All Apps</ThemedText>
          <Link href="/add-app" asChild>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add-circle-outline" size={24} color="white" />
            </TouchableOpacity>
          </Link>
        </View>
        {allApps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  section: {
    paddingVertical: 16,
  },
  sectionTitle: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  trendingList: {
    paddingHorizontal: 16,
  },
  trendingCard: {
    marginRight: 12,
    alignItems: "center",
    width: 100,
  },
  trendingAppIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginBottom: 8,
  },
  trendingAppName: {
    textAlign: "center",
    fontWeight: "500",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  addButton: {
    backgroundColor: "#007BFF",
    borderRadius: 20,
    padding: 8,
  },
  appCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginHorizontal: 16,
  },
  appIcon: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 16,
  },
  appInfo: {
    flex: 1,
  },
  appName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  appCategory: {
    color: "#888",
    marginBottom: 4,
  },
  appDescription: {
    color: "#555",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    color: "#555",
  },
});
