import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, Heading, VStack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:8088/auth/authenticate', {
                username,
                password,
            });

            // Take the jwt and save the localStorage
            localStorage.setItem('token', response.data.token);

            // Navigate the user to dashboard
            navigate('/dashboard');
        } catch (err) {
            setError('Login is failed.Your username or password are wrong.');
        }
    };

    return (
        <Box w="100%" maxW="md" mx="auto" mt="8">
            <Heading as="h2" mb="6" textAlign="center">Login</Heading>
            <form onSubmit={handleSubmit}>
                <VStack spacing="4">
                    <FormControl id="username" isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                        />
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </FormControl>
                    {error && <Text color="red.500">{error}</Text>}
                    <Button type="submit" colorScheme="teal" width="full">Login</Button>
                </VStack>
            </form>
        </Box>
    );
};

export default LoginPage;
