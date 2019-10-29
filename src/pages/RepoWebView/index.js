import React from 'react';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

export default function RepoWebView({ navigation }) {
  const url = navigation.getParam('repository').html_url;

  return <WebView source={{ uri: url }} style={{ flex: 1 }} />;
}

RepoWebView.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('repository').full_name,
});

RepoWebView.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
