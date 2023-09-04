import React, {useEffect, useRef, useState} from 'react';
import Card from "../../../components/Cards/Card";
import Input from "../../../components/fields/input";
import Button from "../../../components/Button";
import {useAuth} from "../../../context/authContext";
import {useAccount} from "../../../context/accountContext";

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
        <Card className={'px-4'}>
            <div className={'mt-2 text-custom_light'}>
                დააფიქსირეთ ბარათი ან შეიყვანეთ მობ.ნომერი
            </div>
            <div className={'w-full flex justify-center mt-2'}>
                <div className={'w-full'}>
                    <Input
                        label={'ბარ.ნომერი / მობ.ნომერი'}
                        type={'text'}
                        value={AccountId}
                        ref={AccountIdRef}
                        onChange={(e) => setAccountId(e.target.value)}
                        onBlur={() => AccountIdRef.current?.focus()}

                    />
                    <Button
                        onClick={() => CheckAccount(AccountId)}
                    >
                        შესვლა
                    </Button>
                </div>

            </div>

        </Card>
    );
};

export default FindAccount;