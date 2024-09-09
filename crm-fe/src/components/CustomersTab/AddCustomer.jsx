import React, { useState } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
    VStack,
    useToast
} from '@chakra-ui/react';
import axios from 'axios';

const AddCustomer = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [region, setRegion] = useState('');
    const toast = useToast();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8088/api/v1/customers', {
                firstName,
                lastName,
                email,
                region
            });
            toast({
                title: 'Customer added.',
                description: `Customer ID: ${response.data}`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error adding customer:', error);
            toast({
                title: 'Error occurred.',
                description: 'Unable to add customer.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box p={4}>
            <VStack spacing={4} align="stretch">
                <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </FormControl>

                <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </FormControl>

                <FormControl id="email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>

                <FormControl id="region" isRequired>
                    <FormLabel>Region</FormLabel>
                    <Input
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                    />
                </FormControl>

                <Button colorScheme="teal" onClick={handleSubmit}>
                    Add Customer
                </Button>
            </VStack>
        </Box>
    );
};

export default AddCustomer;
