import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { addCustomer } from './CustomerService';

const AddCustomerModal = ({ isOpen, onClose, setCustomers }) => {
    const [customerData, setCustomerData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        region: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddCustomer = async () => {
        try {
            const newCustomer = await addCustomer(customerData);
            setCustomers(prev => [...prev, newCustomer]);
            onClose();
        } catch (error) {
            console.error('Error adding customer', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add New Customer</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>First Name</FormLabel>
                        <Input name="firstName" value={customerData.firstName} onChange={handleChange} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Last Name</FormLabel>
                        <Input name="lastName" value={customerData.lastName} onChange={handleChange} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Email</FormLabel>
                        <Input name="email" value={customerData.email} onChange={handleChange} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Region</FormLabel>
                        <Input name="region" value={customerData.region} onChange={handleChange} />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleAddCustomer}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddCustomerModal;
