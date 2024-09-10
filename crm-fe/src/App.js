import React from 'react';
import {ChakraProvider,Box} from "@chakra-ui/react";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AddCustomerModal from "./components/CustomersTab/AddCustomerModal";

function App() {
  return (
      <ChakraProvider>
        <Router>
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard></Dashboard>} />
                <Route path="/add-customer" element={<AddCustomerModal/>} />
            </Routes>
        </Router>
      </ChakraProvider>

  );
}

export default App;
