import React from "react";

// Customizable Area Start
require("isomorphic-fetch");
import {
  View,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";

// Customizable Area End
import OutlookCalendarController, {
  Props,
} from "./OutlookCalendarController";

export default class OutlookCalendar extends OutlookCalendarController {
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
      <View style={styles.container}>
        <ScrollView>
          <View>
          </View>
        </ScrollView>
      </View>
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
});
// Customizable Area End
