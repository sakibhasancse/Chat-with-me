import io from 'socket.io-client';
import { API_URL } from '../helpers';

const socket = io(API_URL, {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity
});

export default socket;
