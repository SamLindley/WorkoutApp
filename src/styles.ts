import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 40,
  },
  title: {
    textAlign: "center",
    fontSize: 100,
  },
  numberPicker: {
    borderColor: "black",
    borderWidth: 1,
    width: 60,
    height: 60,
    display: "flex",
    alignItems: "center",
    fontWeight: "700",
    backgroundColor: "white",
  },
  listItem: {
    padding: 20,
    width: Dimensions.get("window").width,
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default styles;
