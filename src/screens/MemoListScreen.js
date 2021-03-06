import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import firebase from 'firebase';
import MemoList from '../components/MemoList';
import CircleButton from '../elements/CircleButton';

export default class MemoListScreen extends React.Component {
  state = {
    divelogList: [],
  }
  componentWillMount() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();

    db.collection(`users/${currentUser.uid}/divelogs`)
      .onSnapshot((snapshot) => {
        const divelogList = [];

        snapshot.forEach((doc) => {
          divelogList.push({ ...doc.data(), key: doc.id });
        })
        this.setState({ divelogList })
      })
  }

  handleOnPress() {
    this.props.navigation.navigate('MemoCreate');
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.divelogList.length !== 0  ? (
          <MemoList divelogList={this.state.divelogList} navigation={this.props.navigation} />
        ) : (
        <Text style={styles.message}>
          登録されている情報はありません。
        </Text>) }
        <CircleButton onPress={this.handleOnPress.bind(this)}>{'\uf067'}</CircleButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fffdf6',
  },
  message: {
    color: "gray",
    fontSize: 20,
    paddingTop: 40,
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
