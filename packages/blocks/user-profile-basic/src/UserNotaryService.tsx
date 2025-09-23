// Customizable Area Start
import React from "react";
import { View } from "react-native";
// Customizable Area End

import UserNotaryServiceController, {
  Props,
} from "./UserNotaryServiceController";

export default class UserNotaryService extends UserNotaryServiceController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return <View data-testID="view"></View>;
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = {};
// Customizable Area End
