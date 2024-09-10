import React, { useState, useEffect } from 'react';
import { Box, Button, Input, Flex } from '@chakra-ui/react';
import CustomerTable from './CustomerTable';
import AddCustomerModal from './AddCustomerModal';
import { fetchFilteredCustomers } from './CustomerService';

const Dashboard = () => {
    const [customers, setCustomers] = useState([]);
    const [filterCriteria, setFilterCriteria] = useState({
        firstName: '',
        lastName: '',
        email: '',
        region: ''
    });

    const [isAddOpen, setIsAddOpen] = useState(false);

    useEffect(() => {
        fetchFilteredCustomers(filterCriteria).then(setCustomers).catch(console.error);
    }, [filterCriteria]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterCriteria(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Box p={5}>
            <Flex mb={4} justify="space-between" align="center">
                <Button onClick={() => setIsAddOpen(true)} colorScheme="green">
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

            <CustomerTable customers={customers} setCustomers={setCustomers} />
            <AddCustomerModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} setCustomers={setCustomers} />
        </Box>
    );
};

export default Dashboard;
