import { customerAxios } from '../../utils/base-axios';

// Filtrelenmiş müşteri listesini getir
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

// Müşteri ekle
export const addCustomer = async (newCustomer) => {
    return customerAxios.post('/', newCustomer, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
};

// Müşteri güncelle
export const updateCustomer = async (customerId, updatedData) => {
    return customerAxios.put(`/${customerId}`, updatedData, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
};

// Müşteri sil
export const deleteCustomer = async (customerId) => {
    return customerAxios.delete(`/${customerId}`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
};
