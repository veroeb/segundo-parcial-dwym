import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { API_URL } from "@env";

type AddEditDestinationProps = NativeStackScreenProps<
  RootStackParamList,
  "AddEditDestination"
>;

const AddEditDestination: React.FC<AddEditDestinationProps> = ({
  route,
  navigation,
}) => {
  const destination = route.params?.destination;

  const [name, setName] = useState(destination?.name || "");
  const [description, setDescription] = useState(destination?.description || "");
  const [difficulty, setDifficulty] = useState(destination?.difficulty || "");
  const [favorite, setFavorite] = useState(destination?.favourite || false);

  const handleSave = () => {
    const method = destination ? "PUT" : "POST";
    const url = destination
      ? `http://161.35.143.238:8000/vechezarreta/${destination.id}`
      : `http://161.35.143.238:8000/vechezarreta`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: destination?.id,
        name,
        description,
        difficulty,
        favorite,
      }),
    })
      .then(() => navigation.navigate("DestinationList", { refresh: true }))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Difficulty (e.g., easy, medium, hard)"
        value={difficulty}
        onChangeText={setDifficulty}
        style={styles.input}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#000",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default AddEditDestination;
