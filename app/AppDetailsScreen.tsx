// AppDetailsScreen.tsx
import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { RouteProp } from "@react-navigation/native";

type AppDetailsScreenProps = {
    route: RouteProp<{ params: { app: any } }, "params">;
};

export default function AppDetailsScreen({ route }: AppDetailsScreenProps) {
    const { app } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: app.icon }} style={styles.icon} />
            <Text style={styles.name}>{app.name}</Text>
            <Text style={styles.category}>{app.category}</Text>
            <Text style={styles.description}>{app.description}</Text>
            <Text style={styles.meta}>⭐ {app.rating} | 📦 {app.size} | 🔖 v{app.version}</Text>
            <Text style={styles.meta}>#Rank {app.rank}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, alignItems: "center" },
    icon: { width: 120, height: 120, borderRadius: 20, marginBottom: 15 },
    name: { fontSize: 24, fontWeight: "bold" },
    category: { fontSize: 18, color: "#777", marginBottom: 10 },
    description: { fontSize: 16, textAlign: "center", marginVertical: 10 },
    meta: { fontSize: 14, color: "#555", marginTop: 5 },
});
