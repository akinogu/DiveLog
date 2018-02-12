import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: '#ddd',
    backgroundColor: '#eee',
  },
});

export default class BodyText extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.text}>{this.props.children}</Text>
      </View>
    );
  }
}
