import React from 'react';
import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
      <ChakraProvider>
        <Router>
            <Routes>
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardPage></DashboardPage>} />
            </Routes>
        </Router>
      </ChakraProvider>

  );
}

export default App;
