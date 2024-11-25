import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { API_URL } from "@env";

type DestinationDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  "DestinationDetails"
>;

const DestinationDetails: React.FC<DestinationDetailsProps> = ({ route, navigation }) => {
  const { destination } = route.params;
  const [isFavorite, setIsFavorite] = useState(destination.favourite);

  const toggleFavorite = () => {
    fetch(`http://161.35.143.238:8000/vechezarreta/${destination.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...destination, favorite: !isFavorite }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error updating favorite status");
        }
        setIsFavorite(!isFavorite);
      })
      .catch((err) => console.error("Error updating favorite status:", err));
  };

  // Manejo de eliminación
  const handleDelete = () => {
    fetch(`http://161.35.143.238:8000/vechezarreta/${destination.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error deleting destination");
        }
        navigation.navigate("DestinationList", { refresh: true });
      })
      .catch((err) => console.error("Error deleting destination:", err));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{destination.name}</Text>
      <Text style={styles.description}>{destination.description}</Text>
      <Text style={styles.difficulty}>Difficulty: {destination.difficulty}</Text>
      <Button
        title={isFavorite ? "Unfavorite" : "Favorite"}
        onPress={toggleFavorite}
      />
      <Button title="Delete" onPress={handleDelete} color="red" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#000",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  description: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  difficulty: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 20,
  },
});

export default DestinationDetails;
