import { AuthProvider } from '../context/AuthContext';
import './App.css';

import  LogIn  from './LogIn';
import  SignUp  from './SignUp';
import  Dashboard  from './Dashboard';
import  PrivateRoute  from './PrivateRoute';


import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ForgotPassword from './ForgotPassword';

function App() {
  return (
    <Router>
    <AuthProvider>
    <Routes>
    <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/login" element={<LogIn/>} />
      <Route path="/forgotpassword" element={<ForgotPassword/>} />
    </Routes>
    </AuthProvider>
    </Router>
  )
  
}

export default App;
