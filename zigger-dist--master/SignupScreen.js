import React from 'react';
import { Alert, Platform, StyleSheet, Text, View, TextInput, Image, Button } from 'react-native';
import firebase from 'firebase';
import ErrorMessage from './ErrorMessage';
import LinearGradient from 'react-native-linear-gradient';

export default class SignupScreen extends React.Component <{}> {

  constructor(props) {
    super(props);
    this._onSignup = this._onSignup.bind(this);
    this.state = {email: "", username: "", password: "", errorMessage: "" ,retypePassword:"",phoneNo: 0, disabled: false,units: 0,lat: 0,long: 0};
}

componentDidMount = () => {
  navigator.geolocation.getCurrentPosition(
   position => {
        this.setState({lat : parseFloat(JSON.stringify(position.coords.latitude)) , long: parseFloat(JSON.stringify(position.coords.longitude))});
   },
   error => alert(JSON.stringify(error)),
   { enableHighAccuracy: true, timeout: 20000 }
  );
};

static navigationOptions = () => ({
      headerTintColor: 'white',
      headerStyle: {
      backgroundColor: 'black'
   },
});

  handleSignUp = () => {
       if(this.state.username === '' || this.state.phoneno === '' || this.state.password != this.state.retypePassword) {
        this.setState({errorMessage: "Please enter all the details correctly!"});
      } else {
    this.setState({disabled: true});
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        firebase.database().ref('distributors').push({ email: this.state.email, username: this.state.username,phoneno: this.state.phoneNo ,foodUnits: this.state.units,latitude:this.state.lat,longitude:this.state.long})
        .then(() => this.props.navigation.navigate('Login'))
        .catch(error => this.setState({ errorMessage: error.message, disabled: false }));
      })
      .catch(error => this.setState({ errorMessage: error.message, disabled: false }));
    }
  }

  _onSignup() {
    this.handleSignUp();
 };

 render() {
   return (

     <LinearGradient
     colors={['#24c6dc', '#514a9d']}
     start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
     style={styles.container}>

       <View style={styles.inputContainer}>
         <TextInput
          placeholder='Email'
          onChangeText={(emaill) => this.setState({email: emaill})}
          style={{color: 'white'}}
         />
       </View>

       <View style={styles.inputContainer}>
         <TextInput
          placeholder='Username'
          onChangeText={(usernamee) => this.setState({username: usernamee})}
          style={{color: 'white'}}
         />
       </View>

       <View style={styles.inputContainer}>
         <TextInput
          placeholder='Phone Number'
          onChangeText={(phonenoo) => this.setState({phoneno: phonenoo})}
          style={{color: 'white'}}
         />
       </View>

       <View style={styles.inputContainer}>
         <TextInput
          secureTextEntry={true}
          placeholder='Password'
          textContentType='password'
          onChangeText={(passwordd) => this.setState({password: passwordd})}
          style={{color: 'white'}}
         />
       </View>

       <View style={styles.inputContainer}>
         <TextInput
          secureTextEntry={true}
          placeholder='Retype Password'
          textContentType='password'
          onChangeText={(retypePasswordd) => this.setState({retypePassword: retypePasswordd})}
          style={{color: 'white'}}
         />
       </View>

       <View style={styles.btnContainer}>
         <Button
          title="Sign Up"
          disabled={this.state.disabled}
          onPress={this._onSignup}
         />
       </View>

       <ErrorMessage errorMessage={this.state.errorMessage} />

       <Text style={{padding: 10, fontSize: 20}}>
         Already registered? &nbsp;
         <Text style={{padding: 10, fontSize: 30, color: '#841584'}} onPress={() => this.props.navigation.navigate('Login')}>Login</Text>
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
