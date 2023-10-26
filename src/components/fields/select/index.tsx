import React, {FC, useRef} from 'react';
import Select, {Props as SelectProps} from 'react-select';
import {IOptions} from "../../../pages/Admin/orders/types";

interface IMySelectProps extends SelectProps {
    onSelectChange: (selectedOption: IOptions | IOptions[]) => void
}

const MySelect: FC<IMySelectProps> = ({onSelectChange, ...props}) => {


    const selectRef = useRef()

    const handleSelectChange = (selectedOption) => {
        // @ts-ignore
        selectRef.current?.blur();
        onSelectChange(selectedOption)
    };
    const dot = (color = 'transparent', isSelected) => isSelected && ({
        alignItems: 'center',
        display: 'flex',

        ':before': {
            backgroundColor: color,
            borderRadius: 10,
            content: '" "',
            display: 'block',
            position: 'absolute',
            right: 10,
            marginRight: 8,
            height: 10,
            width: 10,
        },
    });
    return (
        <Select
            ref={selectRef}
            onChange={handleSelectChange}
            menuPortalTarget={document.body}
            menuPlacement = {'auto'}
            styles={{
                menuPortal: base => ({...base, zIndex: 9999}),
                control: (baseStyles, state) => {
                    return ({
                        ...baseStyles,
                        transition: '0.3s',
                        borderColor: state.isFocused ? '#d946ef' : '#d1d5db',
                        backgroundColor: '#f9fafb',
                        boxShadow: state.isFocused ? '0 0 0 2px #d946ef33' : '',
                        fontSize:'0.875rem',
                        fontWeight:300
                    })
                },
                option: (styles, {data, isDisabled, isFocused, isSelected}) => {
                    return {
                        ...styles,
                        ...dot('#d946ef', isSelected),
                        backgroundColor: '#fff',
                        color: '#000',
                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                        '&:active': {
                            backgroundColor: 'inherit',
                        },
                        '&:hover': {
                            backgroundColor: '#f9fafb',
                        }
                    };
                }
            } as any}
            options={[{id: 1, label: '1', value: '1'}, {id: 2, label: '2', value: '2'}]}
            theme={(theme) => ({
                ...theme,
                borderRadius: ' 0.375rem',
                colors: {
                    ...theme.colors,
                    primary25: 'hotpink',
                    primary: '#d946ef',
                },
            }) as any}
            {...props}
        />
    );
};

export default MySelect;