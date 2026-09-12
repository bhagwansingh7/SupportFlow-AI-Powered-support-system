import { useContext, createContext, useState, useEffect } from "react";

const UserContext = createContext();
import axios from "axios";

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);



    useEffect(()=>{
            console.log("use effect running")
          const getCurrentUser=async()=>{
            console.log("get current user runs")
            try {
                const result=await axios.get('http://localhost:5000/api/user/me',{
                withCredentials:true
                })
            console.log('user data:',result.data)
            
            setUser(result.data.user)
            
        } catch (error) {
        console.log('error in fetching user',error)
    }
}
getCurrentUser()

},[])
useEffect(()=>{
    console.log('after api call')
    console.log('user is',user)

},[user])



    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context= useContext(UserContext);
    if(!context){
        console.log('user must be in usercontext')
    }
    return context
};