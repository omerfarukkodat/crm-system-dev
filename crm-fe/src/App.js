import React from 'react';
import {ChakraProvider,Box} from "@chakra-ui/react";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import AddCustomer from "./components/CustomersTab/AddCustomer";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
      <ChakraProvider>
        <Router>
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard></Dashboard>} />
            </Routes>
        </Router>
      </ChakraProvider>

  );
}

export default App;
