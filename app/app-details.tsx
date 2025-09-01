import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// ✅ Correct relative import (adjust if your file is in assets folder)
import { screenshotMapper } from "../assets/screenshotMapper";

const AppDetailsScreen = () => {
  const app: any = useLocalSearchParams();
  const screenshots = screenshotMapper[app.id] || [];

  const handleDownload = () => {
    if (app.file) {
      Linking.openURL(app.file).catch(() =>
        Alert.alert("Error", "Could not open download link.")
      );
    } else {
      Alert.alert("Not Available", "Download link not found for this app.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: app.icon }} style={styles.appIcon} />
        <View style={styles.headerInfo}>
          <Text style={styles.appName}>{app.name}</Text>
          <Text style={styles.appCategory}>{app.category}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" color="#FFD700" size={20} />
            <Text style={styles.ratingText}>{app.rating}</Text>
          </View>
        </View>
      </View>

      {/* App Details */}
      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Text style={styles.detailValue}>{app.size}</Text>
          <Text style={styles.detailLabel}>Size</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailValue}>{app.version}</Text>
          <Text style={styles.detailLabel}>Version</Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{app.description}</Text>
      </View>

      {/* Screenshots */}
      <View style={styles.screenshotGallery}>
        <Text style={styles.galleryTitle}>Screenshots</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {screenshots.map((img, index) => (
            <Image key={index} source={img} style={styles.screenshot} />
          ))}
        </ScrollView>
      </View>

      {/* Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reviewButton}>
          <Text style={styles.buttonText}>Write a Review</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },

  header: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
  },
  appIcon: { width: 80, height: 80, borderRadius: 15, marginRight: 20 },
  headerInfo: { flex: 1 },
  appName: { fontSize: 24, fontWeight: "bold" },
  appCategory: { fontSize: 16, color: "#888", marginBottom: 5 },
  ratingContainer: { flexDirection: "row", alignItems: "center" },
  ratingText: { marginLeft: 5, fontSize: 16 },

  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  detailItem: { alignItems: "center" },
  detailValue: { fontSize: 18, fontWeight: "bold" },
  detailLabel: { fontSize: 14, color: "#888" },

  descriptionContainer: {
    padding: 20,
    backgroundColor: "white",
    marginTop: 10,
  },
  description: { fontSize: 16, lineHeight: 24 },

  screenshotGallery: {
    padding: 20,
    backgroundColor: "white",
    marginTop: 10,
  },
  galleryTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },

  // ✅ Improved Screenshot style
  screenshot: {
    width: 180, // phone-like size
    height: 360,
    borderRadius: 15,
    marginRight: 15,
    resizeMode: "cover",
    backgroundColor: "#f0f0f0",
  },

  actionButtons: { padding: 20 },
  downloadButton: {
    backgroundColor: "#6200EE",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
  },
  reviewButton: {
    backgroundColor: "#03DAC6",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
});

export default AppDetailsScreen;
