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
      <TouchableHighlight onPress={() => {this.props.navigation.navigate('MemoDetail', { log: item }); }}>
        <View style={styles.listItem}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.location}>
              {item.location}
            </Text>
            <Text style={styles.point}>
              {item.point}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.diveDate}>
              {item.date}
            </Text>
            <Text style={styles.time}>
              {item.startTime + ' ~ ' + item.endTime }
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.monoList}>
        <FlatList data={this.props.divelogList} renderItem={this.renderMemo.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  monoList: {
    width: '100%',
    flex: 1,
  },
  listItem: {
    padding: 16,
    paddingLeft: 24,
    justifyContent: 'center',
  },
  location: {
    fontSize: 24,
    marginBottom: 4,
  },
  point: {
    fontSize: 18,
    marginLeft: 20,
    paddingTop: 4,
  },
  diveDate: {
    fontSize: 14,
    color: '#a2a2a2',
  },
  time: {
    fontSize: 14,
    marginLeft: 20,
    color: '#a2a2a2',
  },
  timeWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  }
});
