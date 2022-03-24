import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Chat from './Components/Chat/index.jsx';
import { MainProvider } from './Context/index.js';
import { UsersProvider } from './Context/User/index.js';
import { SocketProvider } from './Context/Socket/index.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginRoom from './Components/Room/';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <MainProvider>
        <UsersProvider>
          <SocketProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LoginRoom />} />
                <Route path="/chat" element={<Chat />} />
              </Routes>
            </BrowserRouter>
          </SocketProvider>
        </UsersProvider>
      </MainProvider>
    </ChakraProvider>
  );
}

export default App;
