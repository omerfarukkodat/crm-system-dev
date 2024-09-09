import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Input, Flex, Box } from '@chakra-ui/react';
import axios from 'axios';

const Dashboard = () => {
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState('');
    const [filterCriteria, setFilterCriteria] = useState({
        firstName: '',
        lastName: '',
        email: '',
        region: ''
    });

    useEffect(() => {
        fetchFilteredCustomers();
    }, [search]);

    const fetchFilteredCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:8088/api/v1/customers/filter', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                params: {
                    page: 0, // Default page number
                    size: 10, // Default page size
                    firstName: filterCriteria.firstName,
                    lastName: filterCriteria.lastName,
                    email: filterCriteria.email,
                    region: filterCriteria.region,
                }
            });
            setCustomers(response.data.content);
        } catch (error) {
            console.error('Error fetching filtered customers', error);
        }
    };

    const handleSearchChange = (e) => {

        setSearch(e.target.value);
        setFilterCriteria(prev => ({
            ...prev,
            firstName: e.target.value,
            lastName: e.target.value,
            email: e.target.value,
            region: e.target.value
        }));
    };

    const handleUpdate = async (customerId) => {

        const updatedData = {
            firstName: 'New Name',
            lastName: 'New Last Name',
            email: 'mail@example.com',
            region: 'New region'
        };

        try {
            const response = await axios.put(
                'http://localhost:8088/api/v1/customers/$(customerId)',
                updatedData,
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Customer updated successfully:', response.data);
            //If the update success refresh customer list
             fetchFilteredCustomers();
        }catch (error){
            console.error('Error updating customers', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8088/api/v1/customers/${id}`,{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
            });
            fetchFilteredCustomers(); // Refresh the customer list after deletion
        } catch (error) {
            console.error('Error deleting customer', error);
        }
    };

    return (
        <Box p={5}>
            <Flex mb={4} align="center">
                <Input
                    placeholder="Search customers"
                    value={search}
                    onChange={handleSearchChange}
                />
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
                                <Button onClick={() => handleUpdate(customer.id)} colorScheme="blue" mr={2}>
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
        </Box>
    );
};

export default Dashboard;
