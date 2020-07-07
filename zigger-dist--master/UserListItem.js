import React from 'react';
import {Platform, StyleSheet, Text, View, Button, Linking, ToastAndroid} from 'react-native';
import firebase from 'firebase';
import ErrorMessage from './ErrorMessage';

export default class UserListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {errorMessage: '', exists: true};
  }

  deleteClaimant() {
    firebase.database().ref('distributors').child(this.props.duid).child('claimants').child(this.props.uid).remove()
    .then(() => { this.setState({exists: false}); ToastAndroid.show('Username deleted', ToastAndroid.SHORT); })
    .catch(error => this.setState({errorMessage: error.message}));
  }

  render() {
      if(this.state.exists) {
        return (
            <View style={styles.container}>
              <View style={styles.cardLeftContainer}>
                <Text style={{color: '#4CBB17', fontSize: 24}}>{this.props.username}</Text>
                <ErrorMessage errorMessage={this.state.errorMessage} />
              </View>

              <View style={styles.cardRightContainer}>
                <View style={styles.cardBtnContainer}>
                    <Button title="Delete" color='#111EC6' onPress={this.deleteClaimant.bind(this)}></Button>
                </View>
              </View>
            </View>
          );
      } else {
          return (<View></View>);
      }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius:20,
    borderWidth: 3,
    borderBottomWidth: 3,
  },
  btnContainer: {
    margin: 20, 
    width: 200,
  },
  cardLeftContainer: {
    width: '50%',
  },
  cardRightContainer: {
    width: '50%',
  },
  cardBtnContainer: {
    margin: 5,
    width: 100,
    alignSelf: 'flex-end'
  }
});

