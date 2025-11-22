import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Props {
    summary: string;
    suggestion: string;
}

const SuggestionCard: React.FC<Props> = ({ summary, suggestion }) => {
    return (
        <View style={styles.card}>

            {/* Günlük Özet */}
            <View style={styles.headerRow}>
                <Ionicons name="chatbubble-ellipses-outline" size={26} color="#3A6EA5" style={{ marginRight: 8, marginBottom: 8 }} />
                <Text style={styles.sectionTitle}>Günlük Özet</Text>
            </View>
            <Text style={styles.text}>{summary}</Text>

            {/* Öneri */}
            <View style={styles.headerRow}>
                <Ionicons name="rocket-outline" size={26} color="#3A6EA5" style={{ marginRight: 8, marginBottom: 8 }} />
                <Text style={styles.sectionTitle}>Öneri</Text>
            </View>
            <Text style={styles.text}>{suggestion}</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        marginTop: 15,
        backgroundColor: "#fdfdfd",
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#D7E6F5",
        elevation: 6,
        width: "100%",
    },
    headerRow: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",

    },
    sectionTitle: {
        marginBottom: 8,
        fontSize: 22,
        fontWeight: "700",
        color: "#3A6EA5",
    },
    text: {
        fontSize: 15,
        color: "#4A4A4A",
        flexShrink: 1,
        flexWrap: "wrap",
        lineHeight: 20,
    },
});

export default SuggestionCard; 