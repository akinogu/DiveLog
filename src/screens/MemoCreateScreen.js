import React from 'react';
import { StyleSheet, KeyboardAvoidingView, TouchableOpacity, TouchableHighlight, TextInput, Text } from 'react-native';
import { Input } from 'react-native-elements';
import firebase from 'firebase';
import CircleButton from '../elements/CircleButton';
import DateTimePicker from 'react-native-modal-datetime-picker';
import fontAwesome from '../../assets/fonts/fontawesome-webfont.ttf';

let _this = null;
export default class MemoCreateScreen extends React.Component {
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
    isDateTimePickerVisible: false,
    isStartTimePickerVisible: false,
    isEndTimePickerVisible: false,
  }

  static navigationOptions={
    headerRight: (
      <TouchableHighlight onPress={(e) => _this.handleSubmit()}>
        <Text style={{color: '#fff', marginRight: 18, fontWeight: 'bold', paddingTop: 6}}>SAVE</Text>
      </TouchableHighlight>
    ),
  }

  // HACK: このやり方はあまりよくなさげ....
  componentDidMount() {
    _this = this;
  }

  handleSubmit() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    db.collection(`users/${currentUser.uid}/divelogs`).add({
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
  // Location / max-Length=40
  onChangeLocation(e) {
    this.setState({ location: e.slice(0, 40)});
  }
  // Point / max-Length=40
  onChangePoint(e) {
    this.setState({ point: e.slice(0, 40)});
  }
  // purpose / max-Length=40
  onChangePurpose(e) {
    this.setState({ purpose: e.slice(0, 40)});
  }
  // buddy / max-Length=40
  onChangeBuddy(e) {
    this.setState({ buddy: e.slice(0, 255)});
  }
  // condition / max-Length=40
  onChangeCondition(e) {
    this.setState({ condition: e.slice(0, 255)});
  }
  // note / max-Length=40
  onChangeNote(e) {
    this.setState({ note: e.slice(0, 255)});
  }
  // fish / max-Length=40
  onChangeFish(e) {
    this.setState({ fish: e.slice(0, 255)});
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
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
          value={this.state.location}
          onChangeText={(l) => this.onChangeLocation(l)}
          shake={true}
          autoCapitalize='none'
        />
        <Input
          style={styles.baseTextStyle}
          placeholder='ポイント'
          value={this.state.point}
          onChangeText={(p) => this.onChangePoint(p)}
          shake={true}
          autoCapitalize='none'
        />
        <Input
          style={styles.baseTextStyle}
          placeholder='目的'
          value={this.state.purpose}
          onChangeText={(p) => this.onChangePurpose(p)}
          shake={true}
          autoCapitalize='none'
        />
        <Input
          style={styles.baseTextStyle}
          placeholder='バディ'
          value={this.state.buddy}
          onChangeText={(b) => this.onChangeBuddy(b)}
          shake={true}
          autoCapitalize='none'
        />
        <Input
          style={styles.baseTextStyle}
          placeholder='コンディション'
          value={this.state.condition}
          onChangeText={(c) => this.onChangeCondition(c)}
          shake={true}
          autoCapitalize='none'
        />
        <Input
          style={styles.baseTextStyle}
          placeholder='ノート'
          value={this.state.note}
          onChangeText={(n) => this.onChangeNote(n)}
          shake={true}
          autoCapitalize='none'
        />
        <Input
          style={styles.baseTextStyle}
          placeholder='魚'
          value={this.state.fish}
          onChangeText={(f) => this.onChangeFish(f)}
          shake={true}
          autoCapitalize='none'
        />

        {/* <Input
          style={styles.baseTextStyle}
          placeholder='サイン'
          shake={true}
          autoCapitalize={false}
        /> */}

        {/* <CircleButton onPress={this.handleSubmit.bind(this)}>{'\uf00c'}</CircleButton> */}
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
    fontSize: 20,
    lineHeight: 20,
  },
  saveBtn: {
    color: '#fff',
    marginRight: 10,
    fontWeight: 'bold',
  }
});

