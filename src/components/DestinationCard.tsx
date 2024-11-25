import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
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
      case "medium":
        return styles.medium;
      case "hard":
        return styles.hard;
      default:
        return styles.defaultTag;
    }
  };

  const getFavoriteStyle = () => {
    if (Platform.OS === "ios") {
      return {
        icon: destination.favourite ? "♥︎" : "♡",
        color: destination.favourite ? "#f65c87" : "white",
      };
    } else {
      return {
        icon: destination.favourite ? "★" : "☆",
        color: destination.favourite ? "#f0c70d" : "white",
      };
    }
  };

  const favoriteStyle = getFavoriteStyle();

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{destination.name}</Text>
        <TouchableOpacity onPress={toggleFavorite}>
          <Text style={[styles.favorite, { color: favoriteStyle.color }]}>
            {favoriteStyle.icon}
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
  medium: {
    backgroundColor: "#d7a806",
  },
  hard: {
    backgroundColor: "purple",
  },
  defaultTag: {
    backgroundColor: "gray",
  },
});

export default DestinationCard;
