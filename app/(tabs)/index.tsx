import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

type Item = { value: string; id: number; done: boolean };

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Item[]>([]);
  const [value, setValue] = useState("");
  const [editingValue, setEditingValue] = useState("");
  const [editing, setEditing] = useState<null | Item>(null);
  const addTask = () => {
    if (!value.trim().length) return;
    setTasks((prev) => [...prev, { id: Math.random(), value, done: false }]);
    setValue("");
  };
  const removeItem = (pressedItem: Item) => {
    setTasks((prev) => {
      return prev.filter((item) => item.id !== pressedItem.id);
    });
  };
  const editItemModal = (item: Item) => {
    setEditingValue(item.value);
    setEditing(item);
  };
  const closeModal = () => {
    setEditing(null);
    setEditingValue("");
  };
  const confirmEdit = () => {
    if (!editingValue.trim().length) {
    } else {
      setTasks((prev) => {
        const tempA = [...prev];
        const tempItem = tempA.find((item) => item.id === editing?.id);
        tempItem!.value = editingValue;
        return [...tempA];
      });
    }
    closeModal();
  };
  const toggleDone = (toggledElement: Item) => {
    setTasks(prev => {
      const temp = prev.map((item) => item.id === toggledElement.id ? {...item, done: !item.done} : item)
      return [...temp];
    })
  };
  return (
    <SafeAreaView style={styles.flex1}>
      <View style={styles.header}>
        <Text style={styles.headerText}>To-Do List (No A11Y)</Text>
      </View>
      <ScrollView>
        <TextInput
          style={[styles.general, styles.input]}
          placeholder="add a task"
          onChangeText={setValue}
          value={value}
        />
        <Pressable
          onPress={addTask}
          style={({ pressed }) => [
            styles.general,
            styles.button,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.buttonText}>Add Task</Text>
        </Pressable>

        <View style={[styles.general, styles.list]}>
          {tasks.map((item) => (
            <Pressable
              onPress={() => toggleDone(item)}
              style={({ pressed }) => [
                styles.listItem,
                pressed && styles.pressed,
              ]}
              key={item.id}
            >
              <Text style={item.done && {textDecorationLine: 'line-through'}}>{item.value}</Text>
              <View style={styles.actions}>
                <Pressable
                  onPress={() => editItemModal(item)}
                  style={({ pressed }) => [
                    styles.button,
                    styles.editButton,
                    pressed && styles.pressed,
                  ]}
                >
                  <FontAwesome name="edit" color="black" size={26} />
                </Pressable>
                <Pressable
                  style={({ pressed }) => [
                    styles.button,
                    styles.deleteButton,
                    pressed && styles.pressed,
                  ]}
                  onPress={() => removeItem(item)}
                >
                  <FontAwesome name="remove" color="white" size={26} />
                </Pressable>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <Modal visible={!!editing} transparent>
        <Pressable onPress={closeModal} style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={{ textAlign: "center" }}>Edit Item</Text>
            <TextInput
              style={[styles.general, styles.input]}
              placeholder="edit the task"
              onChangeText={setEditingValue}
              value={editingValue}
            />
            <Pressable
              onPress={confirmEdit}
              style={({ pressed }) => [
                styles.general,
                styles.button,
                styles.editButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={[styles.buttonText, { color: "black" }]}>
                Confirm Edit
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
