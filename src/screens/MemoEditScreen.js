import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, TextInput, Text } from 'react-native';
import { Input } from 'react-native-elements';
import firebase from 'firebase';
import CircleButton from '../elements/CircleButton';
import DateTimePicker from 'react-native-modal-datetime-picker';
import fontAwesome from '../../assets/fonts/fontawesome-webfont.ttf';

export default class MemoEditScreen extends React.Component {
  state = {
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    point: '',
    purpose: '',
    buddy: '',
    condition: '',
    note: '',
    fish: '',
    key: '',
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;

    this.setState({
      date: params.date,
      startTime: params.startTime,
      endTime: params.endTime,
      location: params.location,
      point: params.point,
      purpose: params.purpose,
      buddy: params.buddy,
      condition: params.condition,
      note: params.note,
      fish: params.fish,
      key: params.key,
    });
  }

  handlePress() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const newDate = new Date();
    db.collection(`users/${currentUser.uid}/divelogs`).doc(this.state.key)
      .update({
        date: this.state.date,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        location: this.state.location,
        point: this.state.point,
        purpose: this.state.purpose,
        buddy: this.state.buddy,
        condition: this.state.condition,
        note: this.state.note,
        fish: this.state.fish,
        createdOn: newDate,
      })
      .then(() => {
        const { navigation } = this.props
        navigation.state.params.returnMemo({
          date: this.state.date,
          startTime: this.state.startTime,
          endTime: this.state.endTime,
          location: this.state.location,
          point: this.state.point,
          purpose: this.state.purpose,
          buddy: this.state.buddy,
          condition: this.state.condition,
          note: this.state.note,
          fish: this.state.fish,
          createdOn: newDate,
          key: this.state.key,
        })
        navigation.goBack();
      })
      .catch(() => {
      })
    this.props.navigation.goBack();
  }

  // Date => TODO:get together create & edit
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

  dateToStringTime(date) {
    const timeWithSec = date.toString().split(' ')[4];
    return timeWithSec.slice(0, 5);
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height" keyboardVerticalOffset={80}>
        {/* <TextInput
          style={styles.memoEditInput}
          value={this.state.location}
          // multiline
          onChangeText={(text) => {this.setState({ body: text })}}
          underlineColorAndroid="transparent"
          textAlignVertical="top"
        /> */}

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          customDatePickerIOS={null}
          onConfirm={this._handleDatePicker}
          onCancel={this._hideDateTimePicker}
        />
        <Input
          style={styles.baseTextStyle}
          placeholder='日付'
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
          value={this.state.startTime}
          onFocus={this._showStartTimePicker}
        />

        <Input
          style={styles.baseTextStyle}
          placeholder='終了時刻'
          value={this.state.endTime}
          onFocus={this._showEndTimePicker}
        />

        <Input
          style={styles.baseTextStyle}
          placeholder='場所'
          value={this.state.location}
          onChangeText={(location) => this.setState({location})}
          autoCapitalize={false}
        />
        <Input
          style={styles.baseTextStyle}
          placeholder='ポイント'
          value={this.state.point}
          onChangeText={(point) => this.setState({point})}
          autoCapitalize={false}
        />
        <Input
          style={styles.baseTextStyle}
          placeholder='目的'
          value={this.state.purpose}
          onChangeText={(purpose) => this.setState({purpose})}
          autoCapitalize={false}
        />
        <Input
          style={styles.baseTextStyle}
          placeholder='バディ'
          value={this.state.buddy}
          onChangeText={(buddy) => this.setState({buddy})}
          autoCapitalize={false}
        />
        <Input
          style={styles.baseTextStyle}
          placeholder='コンディション'
          value={this.state.condition}
          onChangeText={(condition) => this.setState({condition})}
          autoCapitalize={false}
        />
        <Input
          style={styles.baseTextStyle}
          placeholder='ノート'
          value={this.state.note}
          onChangeText={(note) => this.setState({note})}
          autoCapitalize={false}
        />
        <Input
          style={styles.baseTextStyle}
          placeholder='魚'
          value={this.state.fish}
          onChangeText={(fish) => this.setState({fish})}
          autoCapitalize={false}
        />

        <CircleButton
          onPress={this.handlePress.bind(this)}
        >{'\uf00c'}</CircleButton>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    paddingLeft: 40,
    paddingRight: 20,
    // 追加
    paddingTop: 40,
  },
  baseTextStyle: {
    flex:1,
    marginTop: 16,
    paddingRight: 30,
  },
  baseMultiTextStyle: {
    flex:1,
    marginTop: 16,
    paddingRight: 30,
    height: 50,
  },
  memoEditInput: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  circleButtonTitle: {
    fontFamily: 'FontAwesome',
    fontSize: 20,
    lineHeight: 20,
  }

});
