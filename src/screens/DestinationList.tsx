import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import DestinationCard from "../components/DestinationCard";
import { Destination } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { API_URL } from "@env";

const DestinationList: React.FC<NativeStackScreenProps<RootStackParamList, "DestinationList">> = ({ navigation }) => {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  const fetchDestinations = () => {
    fetch(`http://161.35.143.238:8000/vechezarreta`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch destinations. Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const mappedData = data.map((destination: any) => ({
          ...destination,
          favourite: destination.favourite,
        }));
        setDestinations(mappedData);
      })
      .catch((error) => console.error("Error fetching destinations:", error));
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const toggleFavorite = (id: string) => {
    const destination = destinations.find((d) => d.id === id);
    if (destination) {
      fetch(`http://161.35.143.238:8000/vechezarreta/${id}`, {
        method: "PATCH", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favourite: !destination.favourite }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to update favorite status. Status: ${response.status}`);
          }
          return fetchDestinations();
        })
        .catch((error) => console.error("Error updating favorite status:", error));
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={destinations.sort((a, b) => {
          if (a.favourite === b.favourite) {
            return a.name.localeCompare(b.name);
          }
          return a.favourite ? -1 : 1;
        })}
        renderItem={({ item }) => (
          <DestinationCard
            destination={item}
            onPress={() =>
              navigation.navigate("DestinationDetails", {
                destination: item,
              })
            }
            toggleFavorite={() => toggleFavorite(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddEditDestination", { destination: undefined })}
      >
        <Text style={styles.addButtonText}>Add Destination</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  addButton: {
    padding: 15,
    borderRadius: 10,
    margin: 10,
    backgroundColor: Platform.OS === "ios" ? "green" : "blue",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DestinationList;
