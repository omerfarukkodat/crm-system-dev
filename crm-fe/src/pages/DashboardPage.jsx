import React, { useState, useEffect } from 'react';
import { Box, Flex, Button, Input, Select, Table, Thead, Tbody, Tr, Th, Td, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import CustomerTable from '../components/Customers/CustomerTable';
import AddCustomerModal from '../components/Customers/AddCustomerModal';
import UpdateCustomerModal from '../components/Customers/UpdateCustomerModal';
import LogoutButton from "../components/Customers/Logout";

const DashboardPage = () => {
    const [customers, setCustomers] = useState([]);
    const [filterField, setFilterField] = useState('firstName');
    const [filterValue, setFilterValue] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [newCustomer, setNewCustomer] = useState({
        firstName: '',
        lastName: '',
        email: '',
        region: ''
    });
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);

    useEffect(() => {
        fetchFilteredCustomers(currentPage);
    }, [filterField, filterValue, currentPage]);

    const fetchFilteredCustomers = async (page) => {
        try {
            const response = await axios.get('http://localhost:8088/api/v1/customers/filter', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                params: {
                    page: page,
                    size: 10,
                    [filterField]: filterValue
                }
            });
            setCustomers(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching filtered customers', error);
        }
    };

    const handleFilterFieldChange = (e) => {
        setFilterField(e.target.value);
    };

    const handleFilterValueChange = (e) => {
        setFilterValue(e.target.value);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8088/api/v1/customers/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            fetchFilteredCustomers(currentPage);
        } catch (error) {
            console.error('Error deleting customer', error);
        }
    };

    const openAddModal = () => setIsAddOpen(true);
    const closeAddModal = () => setIsAddOpen(false);

    const openUpdateModal = (customer) => {
        setSelectedCustomer(customer);
        setIsUpdateOpen(true);
    };
    const closeUpdateModal = () => setIsUpdateOpen(false);

    const handlePageChange = (direction) => {
        setCurrentPage(prevPage => {
            const newPage = direction === 'next' ? prevPage + 1 : prevPage - 1;
            return Math.max(0, Math.min(newPage, totalPages - 1));
        });
    };

    return (
        <Box p={6} bg="white" minHeight="100vh">
            <Flex mb={6} justify="space-between" align="center" p={4} bg="white" shadow="md" borderRadius="md">
                <Button onClick={openAddModal} colorScheme="teal" size="lg" mr={4}>
                    Add Customer
                </Button>
                <Flex align="center">
                    <Select
                        placeholder="Select field"
                        value={filterField}
                        onChange={handleFilterFieldChange}
                        size="lg"
                        variant="outline"
                        mr={4}
                    >
                        <option value="firstName">First Name</option>
                        <option value="lastName">Last Name</option>
                        <option value="email">Email</option>
                        <option value="region">Region</option>
                    </Select>
                    <Input
                        placeholder="Search..."
                        value={filterValue}
                        onChange={handleFilterValueChange}
                        size="lg"
                        variant="outline"
                        width="300px"
                    />
                </Flex>
                <LogoutButton />
            </Flex>

            <CustomerTable customers={customers} onDelete={handleDelete} onUpdate={openUpdateModal} />

            <Flex mt={6} justify="center" align="center">
                <Button
                    disabled={currentPage === 0}
                    onClick={() => handlePageChange('prev')}
                    colorScheme="blue"
                    size="md"
                    mr={2}
                >
                    Previous
                </Button>
                <Button
                    disabled={currentPage >= totalPages - 1}
                    onClick={() => handlePageChange('next')}
                    colorScheme="blue"
                    size="md"
                >
                    Next
                </Button>
            </Flex>

            <AddCustomerModal
                isOpen={isAddOpen}
                onClose={closeAddModal}
                newCustomer={newCustomer}
                setNewCustomer={setNewCustomer}
                fetchFilteredCustomers={fetchFilteredCustomers}
            />

            {selectedCustomer && (
                <UpdateCustomerModal
                    isOpen={isUpdateOpen}
                    onClose={closeUpdateModal}
                    selectedCustomer={selectedCustomer}
                    setSelectedCustomer={setSelectedCustomer}
                    fetchFilteredCustomers={fetchFilteredCustomers}
                />
            )}
        </Box>
    );
};

export default DashboardPage;
