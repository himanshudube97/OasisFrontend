import { io } from 'socket.io-client';
export const socketConnectFunction = () => {
  const socket = io('http://localhost:4000', { autoConnect: false });
  return socket;
};

//Ignore all the below ones. Testing husky
