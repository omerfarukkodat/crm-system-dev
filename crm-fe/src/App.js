import React from 'react';
import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import PrivateRoute from "./components/Customers/PrivateRoute";

function App() {
  return (
      <ChakraProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" component={DashboardPage} />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/dashboard"
                    element={
                    <PrivateRoute element={<DashboardPage />} />
                    }></Route>
            </Routes>
        </Router>
      </ChakraProvider>

  );
}

export default App;
