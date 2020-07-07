import React from 'react';
import { Alert, Platform, StyleSheet, Text, View, TextInput, Image, Button } from 'react-native';
import firebase from 'firebase';
import ErrorMessage from './ErrorMessage';
import LinearGradient from 'react-native-linear-gradient';

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this._onLogin = this._onLogin.bind(this);
    this.state = {email: "", password: "", errorMessage: "", disabled: false};
  }

  handleSignIn = () => {
    this.setState({disabled: true});
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        firebase.database().ref('distributors').orderByChild('email').equalTo(this.state.email).limitToFirst(1).once('value')
        .then(cuser => this.props.navigation.navigate('Main', {user: cuser}))
        .catch(error => this.setState({ errorMessage: error.message, disabled: false }));
      })
      .catch(error => this.setState({ errorMessage: error.message, disabled: false }));
  }

  _onLogin() {
    this.handleSignIn();
  }
  static navigationOptions = () => ({
        headerTintColor: 'white',
        headerStyle: {
        backgroundColor: 'black'
      },
  });

  render() {
    return (


      <LinearGradient
      colors={['#24c6dc', '#514a9d']}
      start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
      style={styles.container}>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Email'
            onChangeText={(email) => this.setState({email})}
            style={{color: 'white'}}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            secureTextEntry={true}
            placeholder='Password'
            onChangeText={(password) => this.setState({password})}
            style={{color: 'white'}}
          />
        </View>

        <View style={styles.btnContainer}>
          <Button
            title="Login"
            disabled={this.state.disabled}
            onPress={this._onLogin}
          />
        </View>

        <ErrorMessage errorMessage={this.state.errorMessage} />

        <Text style={{padding: 10, fontSize: 20, color: '#EEEEEE'}}>
          Not registered yet? &nbsp;
          <Text style={{padding: 10, fontSize: 30, color: '#841584'}} onPress={() => this.props.navigation.navigate('Signup')}>Sign Up</Text>
        </Text>

      </LinearGradient>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  field: {
    fontSize:20,
    color: '#841584',
  },
  btnContainer: {
    margin: 2,
    padding: 20,
    width: 200,
    color: 'white',
  },
  card:{
   padding:30,
   width: '80%',
   marginTop:100,
   marginBottom:100,
   backgroundColor: '#DDDDDD',
   borderRadius:20,
   borderWidth: 3,
   borderColor: '#222222',
   flex: 1,
   alignItems: 'center',
   flexDirection: 'column',
   justifyContent: 'center',
  },
  show:{
   fontSize:20,
   color: '#222222',

  },
  inputContainer: {
    margin: 4,
    width: 300,
    borderBottomWidth: 1,
    borderColor: 'white',
    color: 'white',
  },
});
