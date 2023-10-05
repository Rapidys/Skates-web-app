import React, {useEffect, useRef, useState} from 'react';
import Card from "../../../components/Cards/Card";
import Input from "../../../components/fields/input";
import Button from "../../../components/Button";
import {useAuth} from "../../../context/AuthContext";
import {useAccount} from "../../../context/AccountContext";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const FindAccount = () => {

    const [AccountId, setAccountId] = useState('')
    const AccountIdRef = useRef<HTMLInputElement>(null);
    const {isLoggedIn} = useAuth()

    const {CheckAccount} = useAccount()


    useEffect(() => {
        if (isLoggedIn) {
            setTimeout(() => {
                AccountIdRef.current?.focus()
            },600)
        }
    }, [isLoggedIn])

    return (
        <div className={'w-full sm:w-1/2 md:w-1/3'}>
            <Card className={'px-4'}>

                <div className={'mt-2 text-custom_light'}>
                    დააფიქსირეთ ბარათი ან შეიყვანეთ მობ.ნომერი
                </div>
                <div className={'w-full flex justify-center mt-2'}>
                    <div className={'w-full'}>
                        <Input
                            label={'ბარ.ნომერი / მობ.ნომერი'}
                            value={AccountId}
                            ref={AccountIdRef}
                            onChange={(e) => setAccountId(e.target.value)}
                            onBlur={() => AccountIdRef.current?.focus()}
                            withEye = {true}
                            onEnterPress = {() => AccountId && CheckAccount(AccountId)}
                        />
                        <Button
                            onClick={() => CheckAccount(AccountId)}
                            className = {'mt-4'}
                            disabled = {!AccountId}
                        >
                            შესვლა
                        </Button>
                    </div>

                </div>

            </Card>
        </div>

    );
};

export default FindAccount;