import React from 'react';
import { StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput, Text, } from 'react-native';
import { Input } from 'react-native-elements';
import firebase from 'firebase';
import CircleButton from '../elements/CircleButton';
import DateTimePicker from 'react-native-modal-datetime-picker';
import fontAwesome from '../../assets/fonts/fontawesome-webfont.ttf';

export default class MemoCreateScreen extends React.Component {
  state = {
    body: '',
    isDateTimePickerVisible: false,
    isStartTimePickerVisible: false,
    isEndTimePickerVisible: false,
    date: '',
    startTime: '',
    endTime: '',
  }

  handleSubmit() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    db.collection(`users/${currentUser.uid}/divelogs`).add({
      date: this.state.date,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      createdOn: new Date(),
    })
    .then(() => {
      this.props.navigation.goBack();
    })
    .catch(() => {
    })

  }

  // Date
  _showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  }

  _hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  }

  _handleDatePicker = (date) => {
    this._hideDateTimePicker();
    if (!date) { return; }

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const _date = date.getDate();

    this.setState({ date: year + '/' + month + '/' + _date});
  };

  // StartTime
  _showStartTimePicker = () => {
    this.setState({ isStartTimePickerVisible: true });
  }

  _hideStartTimePicker = () => {
    this.setState({ isStartTimePickerVisible: false });
  }

  _handleStartTimePicker = (time) => {
    this._hideStartTimePicker();
    if(!time) { return; }
    this.setState({ startTime: this.dateToStringTime(time)});
  }

  dateToStringTime(date) {
    const timeWithSec = date.toString().split(' ')[4];
    const time = timeWithSec.slice(0, 5);
    return time
  }

  // EndTime
  _showEndTimePicker = () => {
    this.setState({ isEndTimePickerVisible: true });
  }

  _hideEndTimePicker = () => {
    this.setState({ isEndTimePickerVisible: false });
  }

  _handleEndTimePicker = (time) => {
    this._hideEndTimePicker();
    if(!time) { return; }

    this.setState({ endTime: this.dateToStringTime(time)});
  };


  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height" keyboardVerticalOffset={80}>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          customDatePickerIOS={null}
          onConfirm={this._handleDatePicker}
          onCancel={this._hideDateTimePicker}
        />
        <Input
          style={styles.baseTextStyle}
          placeholder='日付'
          shake={true}
          value={this.state.date}
          onFocus={this._showDateTimePicker}
          rightIcon={
            <Text style={styles.circleButtonTitle} onPress={this._showDateTimePicker}>{'\uf073'}</Text>
          }
        />

        <DateTimePicker
          mode='time'
          isVisible={this.state.isStartTimePickerVisible}
          onConfirm={this._handleStartTimePicker}
          onCancel={this._hideStartTimePicker}
        />

        <DateTimePicker
          mode='time'
          isVisible={this.state.isEndTimePickerVisible}
          onConfirm={this._handleEndTimePicker}
          onCancel={this._hideEndTimePicker}
        />

        <Input
          style={styles.baseTextStyle}
          placeholder='開始時刻'
          shake={true}
          value={this.state.startTime}
          onFocus={this._showStartTimePicker}
        />

        <Input
          style={styles.baseTextStyle}
          placeholder='終了時刻'
          shake={true}
          value={this.state.endTime}
          onFocus={this._showEndTimePicker}
        />

        <Input
          style={styles.baseTextStyle}
          placeholder='場所'
          shake={true}
          autoCapitalize={false}
        />
        <Input
          style={styles.baseTextStyle}
          placeholder='ポイント'
          shake={true}
          autoCapitalize={false}
        />
        <Input
          style={styles.baseTextStyle}
          placeholder='目的（=>プルダウン）'
          shake={true}
          autoCapitalize={false}
        />
        <Input
          style={styles.baseTextStyle}
          placeholder='バディ'
          shake={true}
          autoCapitalize={false}
        />
        <Input
          style={styles.baseTextStyle}
          placeholder='コンディション'
          shake={true}
          autoCapitalize={false}
        />
        <Input
          style={styles.baseTextStyle}
          placeholder='ノート'
          shake={true}
          autoCapitalize={false}
        />
        <Input
          style={styles.baseTextStyle}
          placeholder='魚'
          shake={true}
          autoCapitalize={false}
        />

        {/* <Input
          style={styles.baseTextStyle}
          placeholder='サイン'
          shake={true}
          autoCapitalize={false}
        /> */}

        <CircleButton onPress={this.handleSubmit.bind(this)}>{'\uf00c'}</CircleButton>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    width: '100%',
    paddingLeft: 40,
    paddingRight: 20,
    // 追加
    paddingTop: 40,
  },
  memoEditInput: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  baseTextStyle: {
    flex:1,
    marginTop: 16,
    paddingRight: 30,
  },
  circleButtonTitle: {
    fontFamily: 'FontAwesome',
    fontSize: 24,
    lineHeight: 24,
  },
});

