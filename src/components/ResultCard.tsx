import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface Props {
  label: string;
  score: number;
}

const ResultCard: React.FC<Props> = ({ label, score }) => {
  const getColor = () => {
    if (label.includes("positive")) return "#FFF6B0";
    if (label.includes("negative")) return "#F8B0B0";
    return "#E8E8E8";
  };

  const getImage = () => {
    if (label.includes("positive")) return require("../assets/pozitif.png");
    if (label.includes("negative")) return require("../assets/negatif.png");
    return require("../assets/notr.png");
  };

  const getText = () => {
    if (label.includes("positive")) return "Pozitif";
    if (label.includes("negative")) return "Negatif";
    return "Nötr";
  };

  return (
    <View style={[styles.card, { backgroundColor: getColor() }]}>
      <Image source={getImage()} style={styles.icon} />

      <View style={styles.textContainer}>
        <Text style={styles.label}>{getText()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginTop: 15,
    elevation: 12,
  },
  icon: {
    width: 80,
    height: 80,
    margin: 10,
    borderRadius: 40,
    resizeMode: "contain",
  },
  textContainer: {
    flexDirection: "column",
  },
  label: {
    fontSize: 26,
    fontWeight: "bold",
    marginLeft:10,
    color:"#3A6EA5",
  },
});

export default ResultCard;
