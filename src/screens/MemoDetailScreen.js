import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CircleButton from '../elements/CircleButton';

const dateToString = (date) => {
  if (date == null) { return ''; }
  const str = date.toISOString();
  return str.split('T')[0];
};

export default class MemoDetailScreen extends React.Component {
  state = {
    log: {},
  }

  componentWillMount() {
    console.log(this.props.navigation);
    const params = this.props.navigation.state.params;
    this.setState({
      log: params.log || '',
    })
  }

  returnMemo(log) {
    this.setState({ log });
  }
  render() {
    const { log } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.memoHeader}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.memoHeaderTitle}>
              {this.state.log.location ? this.state.log.location.substring(0, 10) : ''}
            </Text>
            <Text style={styles.headerTitleRight}>{this.state.log.point ? ('  ' + this.state.log.point) : ''}</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 4,}}>
            <Text style={styles.memoHeaderDate}>
              {this.state.log.date}
            </Text>
            <Text style={styles.headerTime}>
              {'  ' + log.startTime + ' ~ ' + log.endTime }
            </Text>
          </View>
        </View>

        <View style={styles.memoContent}>
          <View style={styles.listItem}>
            <Text style={styles.itemTitle}>場所</Text>
            <Text style={styles.itemContent}>{this.state.log.location}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.itemTitle}>ポイント</Text>
            <Text style={styles.itemContent}>{this.state.log.point}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.itemTitle}>目的</Text>
            <Text style={styles.itemContent}>{this.state.log.purpose}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.itemTitle}>バディ</Text>
            <Text style={styles.itemContent}>{this.state.log.buddy}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.itemTitle}>コンディション</Text>
            <Text style={styles.itemContent}>{this.state.log.condition}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.itemTitle}>ノート</Text>
            <Text style={styles.itemContent}>{this.state.log.note}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.itemTitle}>魚</Text>
            <Text style={styles.itemContent}>{this.state.log.fish}</Text>
          </View>

        </View>
        <CircleButton
          color="white"
          style={styles.editButton}
          onPress={() => { this.props.navigation.navigate('MemoEdit', { ...log, returnMemo: this.returnMemo.bind(this) }); }}
        >{'\uf040'}</CircleButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  memoHeader: {
    height: 100,
    backgroundColor: '#17313C',
    justifyContent: 'center',
    padding: 10,
  },
  memoHeaderTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    // marginTop: 4,
  },
  headerTitleRight: {
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
    marginLeft: 12,
  },
  memoHeaderDate: {
    color: '#fff',
    fontSize: 12,
  },
  listItem: {
    marginTop: 16,
  },
  headerTime: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 12,
    color: 'gray',
  },
  itemContent: {
    fontSize: 18,
    marginLeft: 8,
  },
  memoContent: {
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  memoBody: {
    lineHeight: 22,
    fontSize: 15,
  },
  editButton: {
    top: 68,
  },
});
