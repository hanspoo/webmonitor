import React from "react";
import { Text, View, StyleSheet } from "react-native";

import servers from "../src/servers.json";

export default class ServerMonitor extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>ServerMonitor</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
