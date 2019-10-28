import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import api from '../../services/api';

// import { Container } from './styles';

export default function User({ navigation }) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const user = navigation.getParam('user');

    async function fetchData() {
      const response = await api.get(`/users/${user.login}/starred`);
      setStars([...stars, response.data]);
    }

    fetchData();
  }, []);

  return <View />;
}

User.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('user').name,
});

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
