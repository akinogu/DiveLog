import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, FlatList } from 'react-native';

const dateToString = (date) => {
  if (date == null) { return ''; }
  const str = date.toISOString();
  return str.split('T')[0];
};

export default class MemoList extends React.Component {
  renderMemo({item}) {
    return (
      <TouchableHighlight onPress={() => {this.props.navigation.navigate('MemoDetail', { memo: item }); }}>
        <View style={styles.monoListItem}>
          <Text style={styles.monoTitle}>
            {item.body.substring(0, 10)}
          </Text>
          <Text style={styles.monoDate}>
            {dateToString(item.createdOn)}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.monoList}>
        <FlatList data={this.props.memoList} renderItem={this.renderMemo.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  monoList: {
    width: '100%',
    flex: 1,
  },
  monoListItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  monoTitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  monoDate: {
    fontSize: 12,
    color: '#a2a2a2',
  },
});
