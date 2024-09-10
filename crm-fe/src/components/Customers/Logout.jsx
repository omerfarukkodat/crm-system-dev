import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "@chakra-ui/react";


const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        //Remove the token from localStorage
        localStorage.removeItem('token');

        //Navigate the user to login
        navigate('/login');
    };

    return (
        <Button onClick={handleLogout} colorScheme="red">
            Logout
        </Button>
    );
};

export default LogoutButton;
