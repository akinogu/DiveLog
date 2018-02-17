import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, TextInput, Text, TouchableHighlight } from 'react-native';
import { Input } from 'react-native-elements';
import firebase from 'firebase';
import CircleButton from '../elements/CircleButton';
import DateTimePicker from 'react-native-modal-datetime-picker';
import fontAwesome from '../../assets/fonts/fontawesome-webfont.ttf';

let _this = null;
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
    dateErrorMsg: '',
    locationErrorMsg: '',
    key: '',
  }

  static navigationOptions={
    headerRight: (
      <TouchableHighlight onPress={() => _this.handlePress()}>
        <Text style={{color: '#fff', marginRight: 18, fontWeight: 'bold', paddingTop: 6}}>SAVE</Text>
      </TouchableHighlight>
    ),
  }

  componentDidMount() {
    _this = this;
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
    let errorData = {
      date: '',
      location:'',
    }

    if (!this.state.date || this.state.date.length === 0 ) {
      errorData.date = '日付を入力してください';
    }
    if (!this.state.location || this.state.location.length === 0) {
      errorData.location = '場所を入力してください';
    }
    if (errorData.date.length !== 0 || errorData.location.length !== 0) {
      this.setState({
        dateErrorMsg: errorData.date,
        locationErrorMsg: errorData.location,
      })
    return;
    }
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
          value={this.state.date}
          onFocus={this._showDateTimePicker}
          rightIcon={
            <Text style={styles.circleButtonTitle} onPress={this._showDateTimePicker}>{'\uf073'}</Text>
          }
        />
        {(this.state.dateErrorMsg || this.state.dateErrorMsg.length !== 0) ? (
          <Text style={styles.errorMsg}>{this.state.dateErrorMsg}</Text>
        ) : null}

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
          onChangeText={(l) => this.onChangeLocation(l)}
          autoCapitalize='none'
        />
        {(this.state.locationErrorMsg || this.state.locationErrorMsg.length !== 0) ? (
          <Text style={styles.errorMsg}>{this.state.locationErrorMsg}</Text>
        ) : null}

        <Input
          style={styles.baseTextStyle}
          placeholder='ポイント'
          value={this.state.point}
          onChangeText={(p) => this.onChangePoint(p)}
          autoCapitalize='none'
        />
        <Input
          style={styles.baseTextStyle}
          placeholder='目的'
          value={this.state.purpose}
          onChangeText={(p) => this.onChangePurpose(p)}
          autoCapitalize='none'
        />
        <Input
          style={styles.baseTextStyle}
          placeholder='バディ'
          value={this.state.buddy}
          onChangeText={(b) => this.onChangeBuddy(b)}
          autoCapitalize='none'
        />
        <Input
          style={styles.baseTextStyle}
          placeholder='コンディション'
          value={this.state.condition}
          onChangeText={(c) => this.onChangeCondition(c)}
          autoCapitalize='none'
        />
        <Input
          style={styles.baseTextStyle}
          placeholder='ノート'
          value={this.state.note}
          onChangeText={(n) => this.onChangeNote(n)}
          autoCapitalize='none'
        />
        <Input
          style={styles.baseTextStyle}
          placeholder='魚'
          value={this.state.fish}
          onChangeText={(f) => this.onChangeFish(f)}
          autoCapitalize='none'
        />

        {/* <CircleButton
          onPress={this.handlePress.bind(this)}
        >{'\uf00c'}</CircleButton> */}
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
  errorMsg: {
    color: 'red',
    marginTop: 2,
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
