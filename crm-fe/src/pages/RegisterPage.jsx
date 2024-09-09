import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, Heading, VStack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await axios.post('http://localhost:8088/api/v1/auth/register', {
                username,
                password,
            },{
                withCredentials: true,
            });

            // If the Registration is success , navigate the login page
            navigate('/login');
        } catch (err) {
            setError('Registration is failed.Username is exists');
        }
    };

    return (
        <Box w="100%" maxW="md" mx="auto" mt="8">
            <Heading as="h2" mb="6" textAlign="center">Register</Heading>
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
                    <Button type="submit" colorScheme="teal" width="full">Sign Up</Button>
                </VStack>
            </form>
        </Box>
    );
};

export default RegisterPage;
