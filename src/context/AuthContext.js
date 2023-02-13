import React, {useContext, useEffect, useState} from 'react'
import {auth} from '../firebase'
const AuthContext= React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}
export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()


    function signUp(email, password){
       return  auth.createUserWithEmailAndPassword(email,password)
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
     }

     function logout(){
         return auth.signOut()
     }

     function resetpassword(email){
         return auth.sendPasswordResetEmail(email)
     }

    useEffect(()=>{ 
        const unsubscribe= auth.onAuthStateChanged(user =>{
        setCurrentUser(user)
    })
    return unsubscribe
    }, [])
   
    const value ={
        currentUser,
        signUp,
        login,
        logout,
        resetpassword
    }
    return (
        <div>
           <AuthContext.Provider value={value}>
               {children}
           </AuthContext.Provider>
        </div>
    )
}

