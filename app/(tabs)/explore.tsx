import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  AccessibilityInfo,
  findNodeHandle,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

type Item = { value: string; id: number; done: boolean };

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Item[]>([]);
  const [value, setValue] = useState("");
  const [editingValue, setEditingValue] = useState("");
  const [editing, setEditing] = useState<null | Item>(null);
  const modalRef = useRef<View>(null);

  useEffect(() => {
    if (editing && modalRef.current) {
      const reactTag = findNodeHandle(modalRef.current);
      if (reactTag) {
        AccessibilityInfo.setAccessibilityFocus(reactTag);
      }
    }
  }, [editing]);

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
    setTasks((prev) => {
      const temp = prev.map((item) =>
        item.id === toggledElement.id ? { ...item, done: !item.done } : item
      );
      return [...temp];
    });
  };
  return (
    <SafeAreaView style={styles.flex1}>
      <View
        accessible={false}
        importantForAccessibility={editing ? "no-hide-descendants" : "yes"}
      >
        <View style={styles.header} accessibilityRole="header">
          <Text style={styles.headerText}>To-Do List (A11Y)</Text>
        </View>
        <ScrollView>
          <TextInput
            style={[styles.general, styles.input]}
            onChangeText={setValue}
            value={value}
            placeholder="add a task here"
            accessibilityLabel="Task input field"
            accessibilityHint="Enter a task for your to-do list here"
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Add task button"
            accessibilityHint="Press this to add your task to your to-do list"
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
            {/* {tasks.map((item) => (
              <Pressable
                onPress={() => toggleDone(item)}
                style={({ pressed }) => [
                  styles.listItem,
                  pressed && styles.pressed,
                ]}
                key={item.id}
                accessibilityRole="button"
                accessibilityState={{ checked: item.done }}
                accessibilityLabel={`Task ${item.value} is marked as ${
                  item.done ? "completed" : "incomplete"
                }`}
                accessibilityHint={`Click this task to mark ${item.value} as ${
                  !item.done ? "completed" : "incomplete"
                }`}
              >
                <Text
                  style={
                    item.done
                      ? { textDecorationLine: "line-through" }
                      : undefined
                  }
                >
                  {item.value}
                </Text>
                <View style={styles.actions}>
                  <Pressable
                    onPress={() => editItemModal(item)}
                    style={({ pressed }) => [
                      styles.button,
                      styles.editButton,
                      pressed && styles.pressed,
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel={`Edit ${item.value}`}
                    accessibilityHint={`Press this button to edit ${item.value}`}
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
                    accessibilityRole="button"
                    accessibilityLabel={`Delete ${item.value}`}
                    accessibilityHint={`Press this button to delete ${item.value}`}
                  >
                    <FontAwesome name="remove" color="white" size={26} />
                  </Pressable>
                </View>
              </Pressable>
            ))} */}
            {tasks.map((item) => (
              <View
                key={item.id}
                style={styles.listItem}
                accessible={false} // don't treat the whole row as one accessible element
              >
                <Pressable
                  onPress={() => toggleDone(item)}
                  style={({ pressed }) => [
                    styles.taskTextWrapper,
                    pressed && styles.pressed,
                  ]}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: item.done }}
                  accessibilityLabel={`Task: ${item.value}`}
                  accessibilityHint={`Double tap to mark as ${
                    item.done ? "incomplete" : "completed"
                  }`}
                >
                  <Text
                    accessible={false} // prevent double reading
                    style={
                      item.done
                        ? { textDecorationLine: "line-through" }
                        : undefined
                    }
                  >
                    {item.value}
                  </Text>
                </Pressable>

                <View style={styles.actions}>
                  <Pressable
                    onPress={() => editItemModal(item)}
                    style={({ pressed }) => [
                      styles.button,
                      styles.editButton,
                      pressed && styles.pressed,
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel={`Edit ${item.value}`}
                    accessibilityHint={`Press to edit ${item.value}`}
                  >
                    <FontAwesome name="edit" color="black" size={26} />
                  </Pressable>

                  <Pressable
                    onPress={() => removeItem(item)}
                    style={({ pressed }) => [
                      styles.button,
                      styles.deleteButton,
                      pressed && styles.pressed,
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel={`Delete ${item.value}`}
                    accessibilityHint={`Press to delete ${item.value}`}
                  >
                    <FontAwesome name="remove" color="white" size={26} />
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <Modal visible={!!editing} transparent animationType="fade">
        <View style={styles.modal}>
          {/* Backdrop layer */}
          <Pressable
            onPress={closeModal}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Dismiss modal"
            accessibilityHint="Closes the edit task dialog"
            style={StyleSheet.absoluteFill}
          />

          {/* Modal content */}
          <View
            ref={modalRef}
            style={styles.modalContent}
            accessibilityViewIsModal={true}
          >
            <Text style={{ textAlign: "center" }}>Edit Item</Text>

            <TextInput
              style={[styles.general, styles.input]}
              placeholder="edit the task"
              onChangeText={setEditingValue}
              value={editingValue}
              accessibilityLabel="Edit task input field"
              accessibilityHint="Enter the new task name here"
            />

            <Pressable
              onPress={confirmEdit}
              style={({ pressed }) => [
                styles.general,
                styles.button,
                styles.editButton,
                pressed && styles.pressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Confirm edit"
              accessibilityHint="Saves the changes you made to the task"
            >
              <Text style={[styles.buttonText, { color: "black" }]}>
                Confirm Edit
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
