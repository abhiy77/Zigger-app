import React , {Component} from 'react';
import {View , Text , StyleSheet , FlatList , Button , ToastAndroid, ScrollView} from 'react-native';
import firebase from 'firebase';
import UserListItem from './UserListItem';
import ErrorMessage from './ErrorMessage';
import LinearGradient from 'react-native-linear-gradient';

export default class UserList extends Component{

     constructor(props){
          super(props);
          this.state = {
               claimants : [],
               userids : [],
               errorMessage : '',
          };
          this.cuser = JSON.parse(JSON.stringify(this.props.navigation.getParam('user')));

     }

     static navigationOptions = () => ({
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: 'black'
          },
        });
      
     componentDidMount = () =>{
          firebase.database().ref('distributors').orderByChild('email').equalTo(this.cuser.email).once('value')
         .then((cdistributor) => {
              cdistributor = JSON.parse(JSON.stringify(cdistributor));
              this.duid = Object.keys(cdistributor)[0];
              cdistributor = cdistributor[Object.keys(cdistributor)[0]];
              this.setState({errorMessage : JSON.stringify(cdistributor)});
             this.setState({claimants: Object.keys(cdistributor.claimants).map((userid) => ({uid: userid,username: cdistributor.claimants[userid].username} ) )} );
           })
         .catch(error => this.setState({ errorMessage: error.message, disabled: false }));

    };
     render(){

          return(
               <LinearGradient
               colors={['#000428', '#004e92']}
               start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 0.0}}
               style={{flex: 1}}>
                        <ScrollView style={styles.container}>

                    <FlatList
                        data={this.state.claimants}
                        renderItem={({item}) => <UserListItem duid={this.duid} uid={item.uid} username={item.username} />}
                    />

               </ScrollView>
               </LinearGradient>
          );
     }
}

const styles = StyleSheet.create({
  container: {
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
