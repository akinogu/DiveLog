import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native';
import firebase from 'firebase';
import CircleButton from '../elements/CircleButton';
import { NavigationActions } from 'react-navigation';
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
    const errorMsg = (
      <View style={styles.errorMessage}>
        <Text style={styles.message}>アカウント登録に失敗しました。</Text>
      </View>
    )
    return errorMsg;
  }
}

export default class SignupScreen extends React.Component {
  state = {
    email: '',
    emailConfirm: '',
    password: '',
  }

  handleSubmit() {
    if (this.state.email !== this.state.emailConfirm) {
      showMessage(new Error('メールアドレスが異なります。'));
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
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
        let msg = '入力情報をご確認ください。';
        if (e.code === 'auth/email-already-in-use') {
          msg = 'メールアドレスはすでに登録されています。';
        }
        showMessage(new Error(msg));
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <MessageBar messageComponent={Message} />
        <Text style={styles.title}>
          アカウント登録
        </Text>

        <TextInput
          style={styles.input}
          value={this.state.email}
          onChangeText={(text) => this.setState({ email: text })}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email Address"
        />

        <TextInput
          style={styles.input}
          value={this.state.emailConfirm}
          onChangeText={(text) => this.setState({ emailConfirm: text })}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email Address(確認用)"
        />

        <TextInput
          style={styles.input}
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Password"
          secureTextEntry
        />
        <TouchableHighlight style={styles.button} onPress={this.handleSubmit.bind(this)} underlayColor="#c70f66" >
          <Text style={styles.buttonTitle}>登録</Text>
        </TouchableHighlight>
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
  },
});
