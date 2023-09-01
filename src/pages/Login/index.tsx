import React, {ChangeEvent, useState} from 'react';
import Card from "../../components/Cards/Card";
import Input from "../../components/input";
import Button from "../../components/Button";

const Login = () => {

    const [state,setState] = useState({
        userName:'',
        password:''
    })

    const handleChange = (type:string,e:ChangeEvent<HTMLInputElement>) => {
       setState({
           ...state,
           [type]:e.target.value
       })
    }

    return (
        <div className={'w-screen h-screen bg-custom_dark flex justify-center items-center'}>
            <Card>
                <Input
                    label = {'Username'}
                    value = {state.userName}
                    onChange={(e) => handleChange('userName',e)}
                />

                <Input
                    label = {'Password'}
                    type = {'password'}
                    value = {state.password}
                    onChange={(e) => handleChange('password',e)}
                />

                <Button>
                    Log in
                </Button>
            </Card>
        </div>
    );
};

export default Login;