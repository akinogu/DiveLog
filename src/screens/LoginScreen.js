import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import CircleButton from '../elements/CircleButton';
import { NavigationActions } from 'react-navigation';
import { Input } from 'react-native-elements';
import { MessageBar, showMessage } from 'react-native-messages';

function Message({ message }) {
  if (message instanceof Error) {
    // return error-styled message
    console.log(message);
    const errorMsg = (
      <View style={styles.errorMessage}>
        <Text style={styles.message}>{message.message}</Text>
      </View>
    )
    return errorMsg;
  } else {
    // return normal message
    return message;
  }
}

export default class LoginScreen extends React.Component {
  state = {
    email: 'test@test.com',
    password: 'password',
    errorMessage: '',
  }


  handleSubmit() {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Home' }),
          ],
        });
        this.props.navigation.dispatch(resetAction);
      })
      .catch((e) => {
        console.log(e);
        showMessage(new Error('ログインに失敗しました。'));
      })
  }

  handlePress() {
    this.props.navigation.navigate('Signup');
  }

  render() {
    return (
      <View style={styles.container}>
        <MessageBar messageComponent={Message} />
        <Text style={styles.title}>
          ログイン
        </Text>
        <TextInput
          style={styles.input}
          value={this.state.email}
          onChangeText={(text) => this.setState({ email: text })}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email Address"
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.input}
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Password"
          secureTextEntry
          underlineColorAndroid="transparent"
        />
        <TouchableHighlight style={styles.button} onPress={this.handleSubmit.bind(this)} underlayColor="#c70f66">
          <Text style={styles.buttonTitle}>ログイン</Text>
        </TouchableHighlight>
        <TouchableOpacity style={styles.signup} onPress={this.handlePress.bind(this)}>
          <Text style={styles.signupText}>新規登録する</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 24,
    backgroundColor: '#fff',
  },
  input: {
    backgroundColor: '#eee',
    height: 48,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
  },
  title: {
    fontSize: 28,
    alignSelf: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#e31676',
    height: 48,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 18,
  },
  signup: {
    marginTop: 16,
    alignSelf: 'center',
  },
  signupText: {
    fontSize: 16,
  },
  errorMessage: {
    backgroundColor: 'red',
    opacity: 0.6,
    color: '#fff',
    height: 25,
    paddingTop: 4,
  },
  message: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 16,
  }
});
