import React, { Component } from 'react';
import { View, Picker, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';
import { FormLabel, FormInput, Button, CheckBox,FormValidationMessage } from 'react-native-elements';

// Make a component
class SettingScreen extends Component {
  state = {
    email: null,
    username: null,
    city: null,
    gender: 'mail',
    loading: false,
    error:'',
  };

  async componentWillMount() {

  }

  onSaveInfo = async () => {
    this.setState({ saving: true });
    const { currentUser } = firebase.auth();
    const { email, phone, username, city, gender } = this.state;
    let dbUserid = firebase.database().ref(`/users/${currentUser.uid}`);
    await dbUserid.set({ email, username, city, gender });
    this.setState({ saving: false });
  }

    onCreateUser = async () => {
    const { email, password } = this.state;
    try {
    this.setState({
      email: '',
      password: '',
      loading: true,
      error:'',
    });
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const { currentUser } = firebase.auth();
      let dbUserid = firebase.database().ref(`/users/${currentUser.uid}`);
      await dbUserid.set({ email:"", phone: "", username:"", city:"", gender:""});
      this.onSaveInfo();
      this.setState({ loading: false });
      this.props.navigation.navigate('UserStack');
    } catch (err) {
      this.setState({
        email: '',
        password: '',
        error: err.message,
        loading: false,
      });
    }
  }

  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator size='large' />;
    }

    return (
      <Button
        style={{ marginTop: -20 }}
        title='Sign Up'
        onPress={this.onCreateUser}
      />
    );
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.formStyle}>
        <FormLabel>Email</FormLabel>
        <FormInput
          placeholder='user@email.com'
          autoCorrect={false}
          autoCapitalize='none'
          keyboardType='email-address'
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <FormLabel>Password</FormLabel>
        <FormInput
          autoCorrect={false}
          placeholder='abc1234'
          autoCapitalize='none'
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />
        <FormLabel>Username</FormLabel>
        <FormInput
          autoCorrect={false}
          placeholder='John Doe'
          value={this.state.username}
          onChangeText={username => this.setState({ username })}
        />
        <FormLabel>City</FormLabel>
        <FormInput
          autoCorrect={false}
          placeholder='Taipei city'
          value={this.state.city}
          onChangeText={city => this.setState({ city })}
        />
        <Picker
          selectedValue={this.state.gender}
          onValueChange={gender => this.setState({ gender })}
        >
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
        
        {this.renderButton()}
        <FormValidationMessage>{this.state.error}</FormValidationMessage>
      </View>
    );
  }
}

const styles = {
  formStyle: {
    marginTop: 40
  }
};

export default SettingScreen;