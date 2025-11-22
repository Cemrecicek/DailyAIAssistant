import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  label: string;
  onPress: () => void;
}

const AnalyzeBtn: React.FC<Props> = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#3A6EA5",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  text: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

export default AnalyzeBtn;
