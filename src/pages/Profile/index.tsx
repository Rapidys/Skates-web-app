import React from 'react';
import {Card} from "flowbite-react";
import CreateAccount from "../onBoarding/CreateAccount";

const Profile = () => {
    return (
        <div className={'flex mt-20 items-center h-full'} style = {{flexDirection:'column'}}>
            <div className={'w-1/3 mb-3 bg-custom_dark rounded-lg px-2 py-3'}>
                <h2 className={'text-custom_light text-lg'}>
                    პროფილი
                </h2>
            </div>
            <CreateAccount  />
        </div>
    );
};

export default Profile;