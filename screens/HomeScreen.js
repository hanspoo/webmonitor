import React from 'react';
import { Notifications, Permissions, Constants } from 'expo';
import { connect } from 'react-redux';
import {
  Spinner,
  Left,
  Body,
  Right,
  Container,
  Content,
  List,
  ListItem,
  Icon,
  Button
} from 'native-base';
import axios from 'axios';
import { Text } from 'react-native';
import { marcarOk, marcarError } from '../src/redux/store';
import { CHECK_INTERVAL_SEGS } from '../src/config';

const config = { headers: { Accept: 'text/html' } };

class Home extends React.Component {
  static navigationOptions = {
    title: 'Servidores'
  };

  state = { loading: false };

  async componentDidMount() {
    const result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (Constants.isDevice && result.status === 'granted') {
      console.log('Notification permissions granted.');
    }

    this.interval = setInterval(this.verificarServidores, CHECK_INTERVAL_SEGS);
  }

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
  }

  verificarServidores = () => {
    this.setState({ loading: true });
    const { servers } = this.props;
    servers.forEach(s => this.verificarServidor(s));
    this.setState({ loading: false });
  };

  verificarServidor = s => {
    console.log('verificando', s.url);
    axios
      .get(s.url, config)
      .then(() => this.props.marcarOk(s.id))
      .catch(e => {
        this.props.marcarError(s.id, e.message);
        this.notificarError(s, e.message);
      });
  };

  notificarError = (s, message) => {
    const localNotification = {
      title: `Problemas sitio web ${s.name}`,
      body: `Error ${message} en sitio web ${s.url}.`
    };
    Notifications.presentLocalNotificationAsync(localNotification)
      .then(() => console.log('Me fue bien'))
      .catch(e => console.log(e));
  };

  render() {
    const { servers } = this.props;

    const { loading } = this.state;

    return (
      <Container>
        <Content>
          <List style={{ marginTop: 14 }}>
            {servers.map(({ id, url, error }) => (
              <ListItem icon key={id}>
                <Left>
                  <Button style={{ backgroundColor: error ? 'red' : 'green' }}>
                    <Icon active name="bluetooth" />
                  </Button>
                </Left>
                <Body>
                  <Text>{url}</Text>
                  {!!error && <Text>{error}</Text>}
                </Body>
                <Right>
                  <Icon active name="arrow-forward" />
                </Right>
              </ListItem>
            ))}
          </List>

          <Button iconLeft light block style={{ marginTop: 24 }} onPress={this.verificarServidores}>
            <Icon name="cog" />
            {loading ? <Spinner /> : <Text>Verificar Ahora</Text>}
          </Button>
        </Content>
      </Container>
    );
  }
}

const s2p = state => ({ servers: state.servers });
export default connect(
  s2p,
  { marcarOk, marcarError }
)(Home);
