import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { COLORS } from '../../constants';

const EmergencyChatScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Emergency Chat Screen</Text>
      <Text style={styles.subtext}>Coming Soon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.light,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  subtext: {
    fontSize: 16,
    color: COLORS.gray,
    marginTop: 8,
  },
});

export default EmergencyChatScreen;


