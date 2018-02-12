import React from 'react';
import { StyleSheet, View } from 'react-native';
import MemoList from '../components/MemoList';
import CircleButton from '../elements/CircleButton';
import firebase from 'firebase';

export default class MemoListScreen extends React.Component {
  state = {
    memoList: [],
  }
  componentWillMount() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    console.log(currentUser);
    db.collection(`users/${currentUser.uid}/memos`)
      .onSnapshot((snapshot) => {
        console.log(snapshot);
        const memoList = [];
        snapshot.forEach((doc) => {
          memoList.push({ ...doc.data(), key: doc.id });
        })
        this.setState({ memoList })
      })
  }

  handleOnPress() {
    this.props.navigation.navigate('MemoCreate');
  }

  render() {
    return (
      <View style={styles.container}>
        <MemoList memoList={this.state.memoList} navigation={this.props.navigation} />
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
});
