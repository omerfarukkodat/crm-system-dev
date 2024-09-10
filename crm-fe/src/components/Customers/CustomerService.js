import { customerAxios } from '../../utils/base-axios';

// Feth the filtered Customer
export const fetchFilteredCustomers = async (filterCriteria) => {
    return customerAxios.get('/filter', {
        params: {
            page: 0,
            size: 10,
            ...filterCriteria
        },
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
};

// AddCustomer
export const addCustomer = async (newCustomer) => {
    return customerAxios.post('/', newCustomer, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
};

// UpdateCustomer
export const updateCustomer = async (customerId, updatedData) => {
    return customerAxios.put(`/${customerId}`, updatedData, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
};

// DeleteCustomer
export const deleteCustomer = async (customerId) => {
    return customerAxios.delete(`/${customerId}`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
};

