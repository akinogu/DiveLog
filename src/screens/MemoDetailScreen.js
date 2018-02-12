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
    memo: {},
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState({
      memo: params.memo,
    })
  }

  returnMemo(memo) {
    this.setState({ memo });
  }
  render() {
    const { memo } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.memoHeader}>
          <Text style={styles.memoHeaderTitle}>{this.state.memo.body ? this.state.memo.body.substring(0, 10) : ''}</Text>
          <Text style={styles.memoHeaderDate}>{dateToString(this.state.memo.createdOn)}</Text>
        </View>

        <View style={styles.memoContent}>
          <Text style={styles.memoBody}>{this.state.memo.body}</Text>
        </View>
        <CircleButton
          color="white"
          style={styles.editButton}
          onPress={() => { this.props.navigation.navigate('MemoEdit', { ...memo, returnMemo: this.returnMemo.bind(this) }); }}
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  memoHeaderDate: {
    color: '#fff',
    fontSize: 12,
  },
  memoContent: {
    paddingTop: 30,
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
