// Customizable Area Start
import React from "react";

import {
  SafeAreaView,
  StatusBar
} from "react-native";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End

import DocusignIntegrationController, {
  Props,
} from "./DocusignIntegrationController";
StatusBar.setBarStyle("dark-content");

export default class DocusignIntegration extends DocusignIntegrationController {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView testID="test1">
      </SafeAreaView>
    );
    }
    }
// Customizable Area End
// Customizable Area End
