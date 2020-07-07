import React from 'react';
import {Alert, Platform, StyleSheet, Text, View, Image, Button, Linking , TextInput , ToastAndroid} from 'react-native';
import firebase from 'firebase';
import errorMessage from './ErrorMessage';
import LinearGradient from 'react-native-linear-gradient';

export default class MainScreen extends React.Component {
constructor(props){

     super(props);
     this.state = {
          numUnits: 0
    };
    this.cuser = JSON.parse(JSON.stringify(this.props.navigation.getParam('user')));
    this.uid = Object.keys(this.cuser)[0];
    this.cuser = this.cuser[Object.keys(this.cuser)[0]];
}

static navigationOptions = () => ({
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: 'black'
  },
});

 updateUnits(){
       this.setState({disabled: true});
       firebase.database().ref('distributors/'+this.uid).update({foodUnits:parseInt(this.state.numUnits)})
          .then(() => {})
          .catch(error => this.setState({ errorMessage: error.message, disabled: false }));
          ToastAndroid.show("Number of Updated Units = " + this.state.numUnits ,ToastAndroid.SHORT);
   };
  nav2List(){
       this.props.navigation.navigate('List', {user: this.cuser})
 }

  render() {
    const {navigate} = this.props.navigation;
    const cuser = JSON.parse(JSON.stringify(this.props.navigation.getParam('user')));
    return (
      <LinearGradient
      colors={['#000428', '#004e92']}
      start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 0.0}}
      style={styles.container}
      >
      <View style={styles.card}>

        <Text><Text style={styles.field}>Email:</Text> {cuser[Object.keys(cuser)[0]].email}</Text>
        <Text><Text style={styles.field}>Username:</Text> {cuser[Object.keys(cuser)[0]].username}</Text>
        <Text><Text style={styles.field}>Phone No.:</Text> {cuser[Object.keys(cuser)[0]].phoneno}</Text>

        <View style = {styles.inputContainer}>
        <TextInput
               placeholder = "Food Units"
               onChangeText={(numUnits) => this.setState({numUnits})}
        />

        </View>

        <View style={styles.btnContainer}>
          <Button
               title="Update"
               color='#111EC6'
               onPress={() => this.updateUnits()}
          />
        </View>

        <View style={styles.btnContainer}>
               <Button
                    title="List of Users"
                    color='#111EC6'
                    onPress={this.nav2List.bind(this)}
               />
        </View>

      </View>
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
    margin: 20,
    width: 200,
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
    margin: 6,
    width: 100,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
});
