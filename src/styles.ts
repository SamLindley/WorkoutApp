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
  listItem: {
    padding: 20,
    width: Dimensions.get("window").width,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: Dimensions.get("window").width,
    paddingLeft: 20,
    paddingRight: 20,
  },
  listTitle: {
    fontSize: 20,
  },
});

export default styles;
