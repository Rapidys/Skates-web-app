import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import Card from "../../../components/Cards/Card";
import Input from "../../../components/fields/input";
import Button from "../../../components/Button";
import {useAuth} from "../../../context/authContext";

const Login = () => {

    const [state, setState] = useState({
        userName: '',
        password: ''
    })
    const {handleLogin} = useAuth()


    const handleChange = (type: string, e: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [type]: e.target.value
        })
    }


    return (
            <Card className={'px-4'}>
                <div className = {'mb-2'}>
                    <h4 className = {'text-custom_light'}>
                        ავტორიზაცია
                    </h4>
                </div>
                <Input
                    label={'მომხმარებელი'}
                    value={state.userName}
                    onChange={(e) => handleChange('userName', e)}
                />

                <Input
                    label={'პაროლი'}
                    type={'password'}
                    value={state.password}
                    onChange={(e) => handleChange('password', e)}
                />

                <Button
                    onClick={() => {
                        handleLogin()
                    }}
                >
                   შესვლა
                </Button>
            </Card>
    );
};

export default Login;