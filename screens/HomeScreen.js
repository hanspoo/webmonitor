import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { List, ListItem } from 'native-base';
import servers from '../src/servers.json';

export default class Home extends React.Component {
  state = {};

  render() {
    return (
      <View style={styles.container}>
        <Text>Servidores</Text>
        <List>
          {servers.map(s => (
            <ListItem>
              <Text>{s}</Text>
            </ListItem>
          ))}
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // alignItems: "center",
    // justifyContent: "center"
  }
});
