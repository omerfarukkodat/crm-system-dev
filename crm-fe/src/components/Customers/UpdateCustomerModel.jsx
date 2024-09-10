import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input
} from '@chakra-ui/react';
import axios from 'axios';

const UpdateCustomerModel = ({ isOpen, onClose, selectedCustomer, setSelectedCustomer, fetchFilteredCustomers }) => {
    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:8088/api/v1/customers/${selectedCustomer.id}`, selectedCustomer, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
            fetchFilteredCustomers();
            onClose();
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Customer</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input
                        placeholder="First Name"
                        value={selectedCustomer?.firstName || ''}
                        onChange={(e) => setSelectedCustomer({ ...selectedCustomer, firstName: e.target.value })}
                        mb={3}
                    />
                    <Input
                        placeholder="Last Name"
                        value={selectedCustomer?.lastName || ''}
                        onChange={(e) => setSelectedCustomer({ ...selectedCustomer, lastName: e.target.value })}
                        mb={3}
                    />
                    <Input
                        placeholder="Email@example.com"
                        value={selectedCustomer?.email || ''}
                        onChange={(e) => setSelectedCustomer({ ...selectedCustomer, email: e.target.value })}
                        mb={3}
                    />
                    <Input
                        placeholder="Region"
                        value={selectedCustomer?.region || ''}
                        onChange={(e) => setSelectedCustomer({ ...selectedCustomer, region: e.target.value })}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSave}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default UpdateCustomerModel;

