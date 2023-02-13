import React from 'react'
import {Navigate, Routes} from "react-router-dom"
import {useAuth} from "../context/AuthContext"


export default function PrivateRoute({ children }) {
    const auth = useAuth();
    return auth.currentUser ? children : <Navigate to="/login" />;
  }
    