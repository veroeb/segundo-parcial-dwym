import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Destination } from "../types";

interface DestinationCardProps {
  destination: Destination;
  onPress: () => void;
  toggleFavorite: () => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onPress,
  toggleFavorite,
}) => {
  const getDifficultyStyle = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return styles.easy;
      case "moderate":
        return styles.moderate;
      case "hard":
        return styles.hard;
      default:
        return styles.defaultTag;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{destination.name}</Text>
        <TouchableOpacity onPress={toggleFavorite}>
          <Text style={styles.favorite}>
            {destination.favourite ? "★" : "☆"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.tag, getDifficultyStyle(destination.difficulty)]}>
        <Text style={styles.tagText}>{destination.difficulty}</Text>
      </View>
      <Text style={styles.description}>{destination.description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    margin: 10,
    backgroundColor: "#444",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  favorite: {
    fontSize: 20,
    color: "gold",
  },
  description: {
    marginTop: 5,
    fontSize: 12,
    color: "#aaa",
  },
  tag: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  tagText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  easy: {
    backgroundColor: "green",
  },
  moderate: {
    backgroundColor: "yellow",
  },
  hard: {
    backgroundColor: "purple",
  },
  defaultTag: {
    backgroundColor: "gray",
  },
});

export default DestinationCard;
