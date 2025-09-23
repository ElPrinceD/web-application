// Customizable Area Start
import React from "react";
import { View } from "react-native";
import TransactionHistoryController, {Props} from "./TransactionHistoryController";
// Customizable Area End



export default class TransactionHistory extends TransactionHistoryController {
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
