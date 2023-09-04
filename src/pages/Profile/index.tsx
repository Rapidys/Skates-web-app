import React from 'react';
import {Card} from "flowbite-react";
import CreateAccount from "../onBoarding/CreateAccount";

const Profile = () => {
    return (
        <div className={'flex justify-center items-center bg-custom_dark_secondary h-full'} style = {{flexDirection:'column'}}>
            <div className={'mb-3'}>
                <h2 className={'text-custom_light text-lg'}>
                    პროფილი
                </h2>
            </div>
            <CreateAccount />
        </div>
    );
};

export default Profile;