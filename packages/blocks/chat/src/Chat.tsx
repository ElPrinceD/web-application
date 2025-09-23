import React from "react";

// Customizable Area Start
import {
  Modal,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Octicons from "react-native-vector-icons/Octicons";
// Customizable Area End

import ChatController, { Props, configJSON, IChat } from "./ChatController";

export default class Chat extends ChatController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderAddRoomModal = () => (
    <Modal animationType={"fade"} transparent={false}>
      <View style={styles.modalContainer}>
        <TextInput
          testID={"inputRoomName"}
          style={styles.roomNameTextInput}
          placeholder={configJSON.namePlaceholder}
          {...this.inputRoomNameProps}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            testID={"createChatSubmitBtn"}
            style={styles.button}
            {...this.btnAddRoomProps}
          >
            <Text style={styles.buttonLabel}>
              {configJSON.createButtonText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID={"btnCloseModal"}
            style={styles.button}
            {...this.btnCloseModalProps}
          >
            <Text style={styles.buttonLabel}>{configJSON.cancelText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  renderRoomList = () => (
    <View>
      {this.state.chatList.map((item: IChat, index: number) => (
        <TouchableOpacity
          testID={`btnShowChat${index}`}
          key={`room-${index}`}
          onPress={() => {
            this.navigateToChatView(item.id);
          }}
          style={item.muted ? styles.mutedChat : styles.listItemContainer}
        >
          <View style={styles.listItemContainer}>
            <Text style={styles.chatNameLabel}>{item.name}</Text>
            {item.muted ? (
              <Octicons name="mute" size={26} color="blue" />
            ) : (
              <Octicons name="unmute" size={26} color="blue" />
            )}
            <Text>{`${item.unreadCount} ${configJSON.unreadMessageText}`}</Text>
            <Text>{`${configJSON.lastMessageText} ${item.lastMessage ?? ""}`}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <TouchableWithoutFeedback
          testID={"hideKeyboard"}
          onPress={() => {
            this.hideKeyboard();
          }}
        >
          <>
            {this.state.isVisibleModal ? (
              <>{this.renderAddRoomModal()}</>
            ) : (
              <>
                <View>
                  <TouchableOpacity
                    testID={"createChatRoomBtn"}
                    style={styles.button}
                    {...this.btnShowAddModalProps}
                  >
                    <Text style={styles.buttonLabel}>
                      {configJSON.createRoomButtonText}
                    </Text>
                  </TouchableOpacity>
                </View>
                {this.renderRoomList()}
              </>
            )}
          </>
        </TouchableWithoutFeedback>
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
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  button: {
    backgroundColor: "blue",
    marginLeft: 10,
    width: 120,
    height: 40,
    display: "flex",
    justifyContent: "center",
    borderRadius: 4,
    alignSelf: "flex-end",
  },
  buttonLabel: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  listItemContainer: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
  },
  chatNameLabel: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalContainer: {
    width: "80%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 80,
    marginLeft: 40,
    padding: 15,
  },
  roomNameTextInput: {
    fontSize: 16,
    textAlign: "left",
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 2,
    padding: 10,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  mutedChat: {
    backgroundColor: "lightgray",
  },
});
// Customizable Area End
