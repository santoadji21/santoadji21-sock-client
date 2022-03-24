import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../../Context';
import { SocketContext } from '../../Context/Socket';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useBreakpointValue,
  useColorModeValue,
  Stack,
  Center,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { UsersContext } from '../../Context/User';

export default function LoginRoom() {
  const socket = useContext(SocketContext);
  const { name, setName, room, setRoom } = useContext(MainContext);
  let history = useNavigate();
  const toast = useToast();
  const { setUsers } = useContext(UsersContext);

  //Checks to see if there's a user already present

  useEffect(() => {
    socket.on('users', users => {
      setUsers(users);
    });
  });

  //Emits the login event and if successful redirects to chat and saves user data
  const handleClick = () => {
    socket.emit('login', { name, room }, error => {
      if (error) {
        console.log(error);
        return toast({
          position: 'top',
          title: 'Error',
          description: error,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
      history('/chat');
      return toast({
        position: 'top',
        title: 'Hey there',
        description: `Welcome to ${room}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    });
  };

  return (
    <Center
      minH="100vh"
      bgGradient="linear(to-r, cyan.500, blue.500, purple.500)"
    >
      <Container py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        <Stack spacing="8">
          <Stack spacing="6">
            <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
              <Heading color={'white'} size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
                Log in to chat
              </Heading>
            </Stack>
          </Stack>
          <Box  
           bg={'white'}
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
            borderRadius={{ base: 'none', sm: 'xl' }}
          >
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    id="text"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="room">Room Name</FormLabel>
                  <Input
                    id="text"
                    type="text"
                    placeholder="Enter Room name"
                    value={room}
                    onChange={e => setRoom(e.target.value)}
                  />
                </FormControl>
                <Button colorScheme="blue" onClick={handleClick}>
                  Join Room
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Center>
  );
}
