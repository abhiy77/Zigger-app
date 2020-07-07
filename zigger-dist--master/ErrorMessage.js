import React from 'react';
import { Text } from 'react-native';

export default class ErrorMessage extends React.Component {

  render() {
    return (
        <Text style={{padding: 10, fontSize: 20, color: '#DC143C'}}>
          {this.props.errorMessage}
        </Text>
    );
  }

}