import React from 'react';
import { StyleSheet, View, KeyBoardAvoidinigView, TextInput } from 'react-native';
import firebase from 'firebase';
import CircleButton from '../elements/CircleButton';

export default class MemoEditScreen extends React.Component {
  state = {
    body: '',
    key: '',
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    console.log(params);
    this.setState({
      body: params.body,
      key: params.key,
    });
  }

  handlePress() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const newDate = new Date();
    db.collection(`users/${currentUser.uid}/memos`).doc(this.state.key)
      .update({
        body: this.state.body,
        createdOn: newDate,
      })
      .then(() => {
        const { navigation } = this.props
        navigation.state.params.returnMemo({
          body: this.state.body,
          createdOn: newDate,
          key: this.state.key,
        })
        navigation.goBack();
      })
      .catch(() => {
      })
    this.props.navigation.goBack();
  }

  render() {
    return (
      <KeyBoardAvoidinigView style={styles.container} behavior="height" keyboardVerticalOffset={80}>
        <TextInput
          style={styles.memoEditInput}
          value={this.state.body}
          multiline
          onChangeText={(text) => {this.setState({ body: text })}}
          underlineColorAndroid="transparent"
          textAlignVertical="top"
        />
        <CircleButton
          onPress={this.handlePress.bind(this)}
        >{'\uf00c'}</CircleButton>
      </KeyBoardAvoidinigView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  memoEditInput: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
});
