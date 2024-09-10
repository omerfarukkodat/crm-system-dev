import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { updateCustomer } from './CustomerService';

const UpdateCustomerModal = ({ isOpen, onClose, customer, setCustomers }) => {
    const [customerData, setCustomerData] = useState(customer);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdateCustomer = async () => {
        try {
            const updatedCustomer = await updateCustomer(customer.id, customerData);
            setCustomers(prev => prev.map(c => (c.id === updatedCustomer.id ? updatedCustomer : c)));
            onClose();
        } catch (error) {
            console.error('Error updating customer', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Customer</ModalHeader>
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
                    <Button colorScheme="blue" mr={3} onClick={handleUpdateCustomer}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default UpdateCustomerModal;
