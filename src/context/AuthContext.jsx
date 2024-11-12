import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState, useEffect, useContext, createContext } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider(props) {
    const { children } = props
    const [globalUser, setGlobalUser] = useState(null)
    const [globalData, setGlobalData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }
    function logout() {
        setGlobalUser(null)
        setGlobalData(null)
        return signOut(auth)
    }
    const value = { globalUser, globalData, setGlobalData, isLoading, signup, login, logout }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            //if there's no user empty the global user state and return from this listner.
            if (!user) {
                console.log('no active user')
                return
            }
            //if there is a user, then check if the user has a data in the database and if they do fetch the data and updata the global state.
            try {
                setIsLoading(true)
                setGlobalUser(user)
                console.log("user loged in")
                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)
                let firebaseData = {}
                if (docSnap.exists()) {
                    firebaseData = docSnap.data()
                    console.log('Found user data')
                }
                setGlobalData(firebaseData)
            } catch (err) {
                console.log(err.message)
            }
            finally {
                setIsLoading(false)
            }
        })
        return unsubscribe
    }, [])
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}