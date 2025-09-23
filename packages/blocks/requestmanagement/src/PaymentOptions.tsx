
// Customizable Area Start
import React from "react";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
import { ScrollView } from "react-native";


import PaymentOptionsController, {
    Props,
} from "./PaymentOptionsController";
// Customizable Area End

export default class RequestDetails extends PaymentOptionsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
        <ScrollView keyboardShouldPersistTaps="always" testID="test1">


        </ScrollView>
        );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
// Customizable Area End