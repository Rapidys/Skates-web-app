import React from 'react';
import {useAccount} from "../../../context/AccountContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLeftLong, faUserCircle} from "@fortawesome/free-solid-svg-icons";

const ChooseUser = () => {

    const {Clients, setCurrentUser} = useAccount()

    const colors = [
        'custom_loading',
        'custom_light',
        'custom_button',
        'custom_ocean',
        'custom_danger',
        'custom_disabled',
    ]


    return (
        <div className={'flex w-full h-full'}>
            {Clients.map((element, index) => {
                return (
                    <div
                        className={`flex items-center justify-center border-1 cursor-pointer border-custom_loading w-1/${Clients.length} bg-${colors[index]} h-full hover:opacity-80`}
                        key={element?.clientId}
                        onClick={() => setCurrentUser(element)}
                    >
                        <div className={'flex-col items-center justify-center'}>
                            <div className={'text-center mb-2'}>
                                <FontAwesomeIcon icon={faUserCircle} className={'text-5xl'}/>
                            </div>
                            <div className={'font-bold'}>
                                {element?.displayName}
                            </div>
                        </div>

                    </div>
                )
            })}

        </div>
    );
};

export default ChooseUser;