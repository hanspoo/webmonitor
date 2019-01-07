import { createStore } from 'redux';

const INITIAL_STATE = {
  servers: [
    {
      id: 1,
      name: 'Servicio País',
      url: 'http://www.serviciopais.cl/intervi/login',
      error: ''
    },
    {
      id: 2,
      name: 'Sitio Welinux malo',
      url: 'http://www.welinux.cl/no-existe',
      error: ''
    },

    {
      id: 3,
      name: 'Sitio Welinux',
      url: 'http://www.welinux.cl',
      error: ''
    }
  ]
};
const rootReducer = (state = INITIAL_STATE, action) => {
  console.log('action', action);
  const { servers } = state;
  switch (action.type) {
    case 'MARCAR_ERROR': {
      const { id, message } = action.payload;
      const serversN = servers.map(s => (s.id === id ? { ...s, error: message } : s));
      return { ...state, servers: serversN };
    }
    case 'MARCAR_OK': {
      const serversN = servers.map(s => (s.id === action.payload ? { ...s, error: '' } : s));
      return { ...state, servers: serversN };
    }

    default:
      return state;
  }
};

const marcarError = (id, message) => ({ type: 'MARCAR_ERROR', payload: { id, message } });
export { marcarError };

const marcarOk = id => ({ type: 'MARCAR_OK', payload: id });
export { marcarOk };

export default createStore(rootReducer);
