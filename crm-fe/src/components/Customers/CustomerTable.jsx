import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';

const CustomerTable = ({ customers, onDelete, onUpdate }) => {
    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>First Name</Th>
                    <Th>Last Name</Th>
                    <Th>Email</Th>
                    <Th>Region</Th>
                    <Th>Registration Date</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {customers.map(customer => (
                    <Tr key={customer.id}>
                        <Td>{customer.firstName}</Td>
                        <Td>{customer.lastName}</Td>
                        <Td>{customer.email}</Td>
                        <Td>{customer.region}</Td>
                        <Td>{new Date(customer.registrationDate).toLocaleDateString()}</Td> {/* Date Format */}
                        <Td>
                            <Button colorScheme="blue" onClick={() => onUpdate(customer)}>Update</Button>
                            <Button colorScheme="red" onClick={() => onDelete(customer.id)}>Delete</Button>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default CustomerTable;

