import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import axios from "axios";
const AddCustomerModal = ({ isOpen, onClose, newCustomer, setNewCustomer, fetchFilteredCustomers }) => {
    const [error, setError] = useState('');

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleAddCustomer = async () => {
        if (!isValidEmail(newCustomer.email)) {
            setError('Please enter a valid email address.');
            return;
        }

        // Eğer e-mail geçerliyse, hata mesajını sıfırla
        setError('');

        try {
            await axios.post('http://localhost:8088/api/v1/customers', newCustomer, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            setNewCustomer({
                firstName: '',
                lastName: '',
                email: '',
                region: ''
            });
            fetchFilteredCustomers();
            onClose();
        } catch (error) {
            if (error.response && error.response.status === 409){
                setError('A customer with this email already exists.');
            }
            console.error('Error adding customer', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Customer</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl isInvalid={!!error}>
                        <FormLabel>First Name</FormLabel>
                        <Input
                            value={newCustomer.firstName}
                            onChange={(e) => setNewCustomer({ ...newCustomer, firstName: e.target.value })}
                        />
                        <FormLabel>Last Name</FormLabel>
                        <Input
                            value={newCustomer.lastName}
                            onChange={(e) => setNewCustomer({ ...newCustomer, lastName: e.target.value })}
                        />
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            placeholder="Email@example.com"
                            value={newCustomer.email}
                            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                        />
                        <FormLabel>Region</FormLabel>
                        <Input
                            value={newCustomer.region}
                            onChange={(e) => setNewCustomer({ ...newCustomer, region: e.target.value })}
                        />
                        <FormErrorMessage>{error}</FormErrorMessage>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleAddCustomer}>
                        Save
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddCustomerModal;

