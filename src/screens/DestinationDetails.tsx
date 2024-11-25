import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type DestinationDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  "DestinationDetails"
>;

const DestinationDetails: React.FC<DestinationDetailsProps> = ({
  route,
  navigation,
}) => {
  const { destination } = route.params;
  const [name, setName] = useState(destination.name);
  const [description, setDescription] = useState(destination.description);
  const [difficulty, setDifficulty] = useState(destination.difficulty);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    fetch(`http://161.35.143.238:8000/vechezarreta/${destination.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error deleting destination");
        }
        navigation.reset({
          index: 0,
          routes: [{ name: "DestinationList" }],
        });
      })
      .catch((err) => console.error("Error deleting destination:", err));
  };

  const handleSave = () => {
    fetch(`http://161.35.143.238:8000/vechezarreta/${destination.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        difficulty,
        favourite: destination.favourite,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error updating destination");
        }
        setIsEditing(false);
        navigation.reset({
          index: 0,
          routes: [{ name: "DestinationList", params: { refresh: true } }],
        });
      })
      .catch((err) => console.error("Error updating destination:", err));
  };

  const handleCheckboxPress = (value: string) => {
    setDifficulty(value);
  };

  return (
    <ScrollView style={styles.container}>
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
            placeholderTextColor="#929292"
          />
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
            placeholderTextColor="#929292"
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
            <Text style={styles.buttonText}>Save changes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsEditing(false)}
            style={styles.cancelButton}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.difficulty}>Difficulty: {difficulty}</Text>
          <TouchableOpacity
            onPress={() => setIsEditing(true)}
            style={styles.editButton}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  difficulty: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 20,
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
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "gray",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#199584",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default DestinationDetails;
