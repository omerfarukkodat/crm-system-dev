import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Input, Flex, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';

const Dashboard = () => {
    const [customers, setCustomers] = useState([]);
    const [filterCriteria, setFilterCriteria] = useState({
        firstName: '',
        lastName: '',
        email: '',
        region: ''
    });

    const [newCustomer, setNewCustomer] = useState({
        firstName: '',
        lastName: '',
        email: '',
        region: ''
    });

    const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(() => {
        fetchFilteredCustomers();
    }, [filterCriteria]);

    const fetchFilteredCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:8088/api/v1/customers/filter', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                params: {
                    page: 0,
                    size: 10,
                    ...filterCriteria, // Tüm field'lara göre filtreleme
                }
            });
            setCustomers(response.data.content);
        } catch (error) {
            console.error('Error fetching filtered customers', error);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterCriteria(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddCustomer = async () => {
        try {
            const response = await axios.post('http://localhost:8088/api/v1/customers', newCustomer, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
            console.log('Customer added successfully:', response.data);
            fetchFilteredCustomers();
            setNewCustomer({ firstName: '', lastName: '', email: '', region: '' });
            onAddClose(); // Modalı kapatma işlemi
        } catch (error) {
            console.error('Error adding customer:', error);
        }
    };

    const handleUpdate = (customer) => {
        setSelectedCustomer(customer);
        onOpen();
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:8088/api/v1/customers/${selectedCustomer.id}`, selectedCustomer, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
            console.log('Customer updated successfully:', response.data);
            fetchFilteredCustomers();
            onClose();
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8088/api/v1/customers/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            fetchFilteredCustomers();
        } catch (error) {
            console.error('Error deleting customer', error);
        }
    };

    return (
        <Box p={5}>
            {/* Add Customer Section */}
            <Flex mb={4} justify="space-between" align="center">
                <Button onClick={onAddOpen} colorScheme="green">
                    Add Customer
                </Button>
                <Flex>
                    <Input
                        placeholder="First Name"
                        name="firstName"
                        value={filterCriteria.firstName}
                        onChange={handleFilterChange}
                        mr={2}
                    />
                    <Input
                        placeholder="Last Name"
                        name="lastName"
                        value={filterCriteria.lastName}
                        onChange={handleFilterChange}
                        mr={2}
                    />
                    <Input
                        placeholder="Email"
                        name="email"
                        value={filterCriteria.email}
                        onChange={handleFilterChange}
                        mr={2}
                    />
                    <Input
                        placeholder="Region"
                        name="region"
                        value={filterCriteria.region}
                        onChange={handleFilterChange}
                    />
                </Flex>
            </Flex>

            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>First Name</Th>
                        <Th>Last Name</Th>
                        <Th>Email</Th>
                        <Th>Region</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {customers.map(customer => (
                        <Tr key={customer.id}>
                            <Td>{customer.id}</Td>
                            <Td>{customer.firstName}</Td>
                            <Td>{customer.lastName}</Td>
                            <Td>{customer.email}</Td>
                            <Td>{customer.region}</Td>
                            <Td>
                                <Button onClick={() => handleUpdate(customer)} colorScheme="blue" mr={2}>
                                    Update
                                </Button>
                                <Button onClick={() => handleDelete(customer.id)} colorScheme="red">
                                    Delete
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            {/* Add Customer Modal */}
            <Modal isOpen={isAddOpen} onClose={onAddClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New Customer</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            placeholder="First Name"
                            value={newCustomer.firstName}
                            onChange={(e) => setNewCustomer({ ...newCustomer, firstName: e.target.value })}
                            mb={3}
                        />
                        <Input
                            placeholder="Last Name"
                            value={newCustomer.lastName}
                            onChange={(e) => setNewCustomer({ ...newCustomer, lastName: e.target.value })}
                            mb={3}
                        />
                        <Input
                            placeholder="Email"
                            value={newCustomer.email}
                            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                            mb={3}
                        />
                        <Input
                            placeholder="Region"
                            value={newCustomer.region}
                            onChange={(e) => setNewCustomer({ ...newCustomer, region: e.target.value })}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleAddCustomer}>
                            Save
                        </Button>
                        <Button onClick={onAddClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Update Customer Modal */}
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
                            placeholder="Email"
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
        </Box>
    );
};

export default Dashboard;
