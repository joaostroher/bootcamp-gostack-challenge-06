import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import api from '../../services/api';
import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  LoadingIndicator,
} from './styles';

export default function User({ navigation }) {
  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const user = navigation.getParam('user');

  async function fetchData() {
    setLoading(true);
    const response = await api.get(`/users/${user.login}/starred`, {
      params: {
        page,
      },
    });
    if (response.data.length === 0) setPage(-1);
    setStars([...stars, ...response.data]);
    setLoading(false);
  }

  useEffect(() => {
    if (page !== -1) fetchData();
  }, [page]);

  function nextPage() {
    if (page !== -1) setPage(page + 1);
  }

  function refreshList() {
    setRefreshing(true);
    setStars([]);
    setPage(1);
    setRefreshing(false);
  }

  function handleNavigate(star) {
    navigation.navigate('RepoWebView', { repository: star });
  }

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>
      <Stars
        data={stars}
        keyExtractor={star => String(star.id)}
        onEndReachedThreshold={0.2}
        onEndReached={nextPage}
        onRefresh={refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
        refreshing={refreshing}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => handleNavigate(item)}>
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          </TouchableWithoutFeedback>
        )}
        ListFooterComponent={() => (
          <>{loading && <LoadingIndicator size="large" color="#7159C1" />}</>
        )}
      />
    </Container>
  );
}

User.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('user').name,
});

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
};
