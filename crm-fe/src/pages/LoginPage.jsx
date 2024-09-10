import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, Heading, VStack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Background image url
const backgroundImageUrl = 'https://picsum.photos/1920/1080';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:8088/api/v1/auth/authenticate', {
                username,
                password,
            });

            // Save the token to localStorage
            localStorage.setItem('token', response.data.token);

            // Navigate the user dashboard
            navigate('/dashboard');
        } catch (err) {
            setError('Login is failed. Your username or password are wrong.');
        }
    };

    return (
        <Box
            w="100%"
            h="100vh"
            backgroundImage={`url(${backgroundImageUrl})`}
            backgroundSize="cover"
            backgroundPosition="center"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                w="100%"
                maxW="md"
                p={8}
                borderRadius="md"
                boxShadow="lg"
                bg="whiteAlpha.800" // For login articles
            >
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
        </Box>
    );
};

export default LoginPage;

