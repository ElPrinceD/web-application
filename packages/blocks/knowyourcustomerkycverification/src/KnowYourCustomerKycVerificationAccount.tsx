
import React from "react";
// Customizable Area Start
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";





// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import KnowYourCustomerKycVerificationController, {
    Props,
} from "./KnowYourCustomerKycVerificationController";
import { Success } from "./assets";


export default class KnowYourCustomerKycVerificationAccount extends KnowYourCustomerKycVerificationController {
    constructor(props: Props) {
        super(props);
        // Customizable Area Star
        // Customizable Area End
    }
    // Customizable Area Start
    // Customizable Area End
    render() {
        // Customizable Area Start
        // Merge Engine - render - Start
        return (
            <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
                <View style={styles.groupiconviewstyle}>
                    <Image source={Success} style={styles.groupiconstyle} />
                </View>
                <View style={styles.textviewstyle1}>
                    <Text style={styles.textstyle1}>
                        Your document has Submitted Sucessfully
                    </Text>
                </View>
                <View style={styles.textviewstyle2}>
                    <Text style={styles.textstyle2}>
                        Lorem Ipsum is Simply dummy text of the printing and typesetting industry.Lorem dten like Aldus
                        PageMaker including version.
                    </Text>
                </View>
                <View style={styles.btnview}>
                    <TouchableOpacity testID="backbtn"
                        onPress={() => this.onNavigationGobackscreen()}  style={styles.btnstyle}>
                            <Text style={styles.btntext}>BACK TO HOME</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
        // Merge Engine - render - End
        // Customizable Area End
    }
}

// Customizable Area Start
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#ffffffff",
    },
    groupiconviewstyle: {
        marginTop: 60, alignItems: 'center'
    },
    groupiconstyle: {
        width: 90, height: 85
    },
    textviewstyle1: {
        alignItems: 'center',
        marginTop: 20,

    },
    textstyle1: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '700',
        color: '#282828'
    },
    textviewstyle2: {
        alignItems: 'center',
        marginTop: 20,

    },
    textstyle2: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: '#282828'
    },
    btnstyle: {
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor:"#6C4695"
    },
    btntext: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF'
    },
    btnview: {
        marginTop: 20,
    }
});
// Customizable Area End
