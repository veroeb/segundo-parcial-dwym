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
import { useIsFocused } from "@react-navigation/native";

type DestinationListProps = NativeStackScreenProps<
  RootStackParamList,
  "DestinationList"
>;

const DestinationList: React.FC<DestinationListProps> = ({ navigation }) => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const isFocused = useIsFocused();

  const fetchDestinations = () => {
    fetch(`http://161.35.143.238:8000/vechezarreta`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch destinations. Status: ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        setDestinations(data);
      })
      .catch((error) => console.error("Error fetching destinations:", error));
  };

  useEffect(() => {
    if (isFocused) {
      fetchDestinations();
    }
  }, [isFocused]);

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
            throw new Error(
              `Failed to update favorite status. Status: ${response.status}`
            );
          }
          return fetchDestinations();
        })
        .catch((error) =>
          console.error("Error updating favorite status:", error)
        );
    }
  };

  const sortedDestinations = destinations.sort((a, b) => {
    if (a.favourite && !b.favourite) return -1;
    if (!a.favourite && b.favourite) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedDestinations}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default DestinationList;
