import React from 'react';
import { useAccount } from '../../../context/AccountContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const ChooseUser = () => {
    const { Clients, setCurrentUser } = useAccount();

    const colors = [
        'custom_loading',
        'custom_light',
        'custom_button',
        'custom_ocean',
        'custom_danger',
        'custom_disabled',
        'custom_light',
        'custom_button',
        'custom_ocean',
        'custom_danger',
        'custom_disabled',
    ];

    return (
        <div className="flex flex-wrap justify-center p-4 w-full h-full overflow-y-scroll">
            {Clients.map((element, index) => {
                const i = Math.round(Math.random() * (colors.length - 1));

                return (
                    <div
                        className={`w-48 md:w-1/2 lg:w-1/3 xl:w-1/4 h-44 p-4 flex mr-2 justify-center  rounded-lg cursor-pointer border-1 border-custom_loading bg-${colors[i]} hover:opacity-80 mb-4`}
                        key={element?.clientId}
                        onClick={() => setCurrentUser(element)}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <div className="text-center mb-2">
                                <FontAwesomeIcon icon={faUserCircle} className="text-5xl" />
                            </div>
                            <div className="font-bold text-center">{element?.displayName}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ChooseUser;
