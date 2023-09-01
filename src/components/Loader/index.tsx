import React from 'react';
import {PuffLoader} from "react-spinners";

const Loader = () => {
    return (
        <div className={'flex justify-center items-center'}>
            <PuffLoader color="#36d7b7" />
        </div>
    );
};

export default Loader;