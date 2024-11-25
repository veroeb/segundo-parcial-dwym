import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type AddDestinationProps = NativeStackScreenProps<
  RootStackParamList,
  "AddDestination"
>;

const AddDestination: React.FC<AddDestinationProps> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleCheckboxPress = (value: string) => {
    setDifficulty(value);
  };

  const handleSave = () => {
    fetch(`http://161.35.143.238:8000/vechezarreta`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        difficulty,
        favourite: false,
      }),
    })
      .then(() => navigation.navigate("DestinationList", { refresh: true }))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        placeholderTextColor="#929292"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        placeholderTextColor="#929292"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          onPress={() => handleCheckboxPress("easy")}
          style={[
            styles.checkbox,
            difficulty === "easy" && styles.checkboxSelected,
          ]}
        >
          <Text style={styles.checkboxText}>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleCheckboxPress("medium")}
          style={[
            styles.checkbox,
            difficulty === "medium" && styles.checkboxSelected,
          ]}
        >
          <Text style={styles.checkboxText}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleCheckboxPress("hard")}
          style={[
            styles.checkbox,
            difficulty === "hard" && styles.checkboxSelected,
          ]}
        >
          <Text style={styles.checkboxText}>Hard</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  input: {
    backgroundColor: "#dedcdc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  checkbox: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#fff",
    backgroundColor: "#222",
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  checkboxSelected: {
    backgroundColor: "#951926",
  },
  checkboxText: {
    color: "#fff",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AddDestination;
