import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  header: {
    padding: 12,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "700",
  },
  general: {
    width: "95%",
    alignSelf: "center",
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginBottom: 8,
  },
  input: {
    borderRadius: 8,
    borderColor: "black",
    borderWidth: 1,
  },
  button: {
    padding: 8,
    backgroundColor: "#000091f0",
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  list: {
    gap: 8,
  },
  listItem: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  taskTextWrapper: {
    flex: 1, // fill available horizontal space
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  actions: {
    alignItems: "center",
    gap: 6,
    flexDirection: "row",
  },
  editButton: {
    backgroundColor: "#ffff00",
  },
  deleteButton: {
    backgroundColor: "#cc0000",
  },
  modal: {
    width: "100%",
    height: "100%",
    backgroundColor: "#0004",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    width: "80%",
    height: "20%",
    backgroundColor: "white",
    borderRadius: 16,
    justifyContent: "center",
    gap: 8,
  },
});
