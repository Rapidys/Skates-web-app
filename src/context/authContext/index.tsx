import React, {useState} from 'react';


const AuthContext = React.createContext({
    role:'',
    token:'',
    user:{}
})

interface IUserInfo {

}
const AuthContextProvider = () => {

    const [userInfo,setUserInfo] = useState({})

    return (
        <div>

        </div>
    );
};

export default AuthContextProvider;