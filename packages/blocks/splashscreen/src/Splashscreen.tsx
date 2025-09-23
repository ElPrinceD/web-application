import React from "react";
// Customizable Area Start
import {
  SafeAreaView,
  Dimensions,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import MergeEngineUtilities from "../../utilities/src/MergeEngineUtilities";

// Merge Engine - import assets - Start
import { imgSplash, imgloader } from "./assets";
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import SplashscreenController, { Props, configJSON } from "./SplashscreenController";

export default class Splashscreen extends SplashscreenController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    Dimensions.addEventListener("change", () => {
      MergeEngineUtilities.init(
        artBoardHeightOrg,
        artBoardWidthOrg,
        Dimensions.get("window").height,
        Dimensions.get("window").width
      );
      this.forceUpdate();
    });
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.splashScreenView}>
          <View
            style={[
              styles.viewBgSplash,
            ]}
          />
          <Image style={styles.imageLogoImage} source={imgSplash} />
          <Image style={styles.imageLoaderImage} source={imgloader} />
          <Text style={styles.textLabelPercentageText}>{configJSON.percentageText}</Text>
          <Text style={styles.textLabelBottomLineText}>{configJSON.bottomLine}</Text>
        </View>
      </SafeAreaView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
  // Customizable Area Start
  // Customizable Area End
}

// Customizable Area Start
const styles = StyleSheet.create({
  splashScreenView: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    flex: 1,
    alignItems: "flex-start"
  },

  viewBgSplash: {
    flex: 1,
    flexWrap: "nowrap",
    flexDirection: "row",
    position: "absolute",
    width: MergeEngineUtilities.deviceBasedDynamicDimension(375, true, 1),
    height: MergeEngineUtilities.deviceBasedDynamicDimension(667, false, 1),
    marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(
      0,
      true,
      1
    ),
    marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(
      0,
      false,
      1
    ),
    opacity: 1,
    backgroundColor: "rgba(38, 38, 38, 1)",
    borderRadius: MergeEngineUtilities.deviceBasedDynamicDimension(
      0,
      true,
      1
    ),
    borderWidth: MergeEngineUtilities.deviceBasedDynamicDimension(
      0,
      true,
      1
    )
  },
  imageLogoImage: {
    position: "absolute",
    width: MergeEngineUtilities.deviceBasedDynamicDimension(232, true, 1),
    height: MergeEngineUtilities.deviceBasedDynamicDimension(49, false, 1),
    marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(
      74,
      true,
      1
    ),
    marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(
      156,
      false,
      1
    ),
    opacity: 1,
    resizeMode: "contain"
  },

  imageLoaderImage: {
    position: "absolute",
    width: MergeEngineUtilities.deviceBasedDynamicDimension(136, true, 1),
    height: MergeEngineUtilities.deviceBasedDynamicDimension(137, false, 1),
    marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(
      120,
      true,
      1
    ),
    marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(
      301,
      false,
      1
    ),
    opacity: 1,
    resizeMode: "contain"
  },

  textLabelPercentageText: {
    position: "absolute",
    width: MergeEngineUtilities.deviceBasedDynamicDimension(51, true, 1),
    height: MergeEngineUtilities.deviceBasedDynamicDimension(33, false, 1),
    marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(
      164,
      true,
      1
    ),
    marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(
      355,
      false,
      1
    ),
    opacity: 1,
    backgroundColor: "transparent",
    fontStyle: "normal",
    fontWeight: "normal",
    includeFontPadding: false,
    padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    textAlignVertical: "top",
    fontFamily: "Roboto-Regular",
    fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(27, true, 1)
  },

  textLabelBottomLineText: {
    position: "absolute",
    width: MergeEngineUtilities.deviceBasedDynamicDimension(330, true, 1),
    height: MergeEngineUtilities.deviceBasedDynamicDimension(32, false, 1),
    marginLeft: MergeEngineUtilities.deviceBasedDynamicDimension(
      22,
      true,
      1
    ),
    marginTop: MergeEngineUtilities.deviceBasedDynamicDimension(
      556,
      false,
      1
    ),
    opacity: 1,
    backgroundColor: "transparent",
    fontStyle: "normal",
    fontWeight: "normal",
    includeFontPadding: false,
    padding: MergeEngineUtilities.deviceBasedDynamicDimension(0, true, 1),
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    textAlignVertical: "top",
    fontFamily: "Roboto-Regular",
    fontSize: MergeEngineUtilities.deviceBasedDynamicDimension(14, true, 1)
  },

  safeAreaView: {
    flex: 1
  }
});
// Customizable Area End
