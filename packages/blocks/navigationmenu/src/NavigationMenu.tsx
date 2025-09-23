import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
// Customizable Area End

import NavigationMenuController, {
  Props,
  configJSON,
} from "./NavigationMenuController";

export default class NavigationMenu extends NavigationMenuController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideKeyboard();
          }}
        >
        </TouchableWithoutFeedback>
      </ScrollView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  buttonWrapper: {
    flex: 1,
    alignItems: "center",
  },
  userProfileWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  userProfile: {
    height: 80,
    width: 80,
  },
  username: {
    fontSize: 18,
  },
  userDesignation: {
    fontSize: 14,
    color: "#ccc",
  },
  logout: {
    color: "#2196F3",
    marginTop: 10,
    fontWeight: "700",
  },
  drawerItems: {
    borderColor: "#ccc",
    borderTopWidth: 1,
    marginTop: 15,
    paddingTop: 10,
  },
  drawerItem: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  drawerItemIcon: {
    height: 20,
    width: 20,
    marginRight: 20,
  },
  drawerItemTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
});
// Customizable Area End
