'use client';

import React from 'react';

interface AddIconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
}

const AddIcon: React.FC<AddIconProps> = ({ size = 24, ...rest }) => {
    if (rest?.onClick) {
        return (
            <button type="button">
                <svg
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    {...rest}
                >
                    <path
                        d="M11.25 12.75H5.5V11.25H11.25V5.5H12.75V11.25H18.5V12.75H12.75V18.5H11.25V12.75Z"
                        fill="inherit"
                    />
                </svg>
            </button>
        );
    }

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            {...rest}
        >
            <path
                d="M11.25 12.75H5.5V11.25H11.25V5.5H12.75V11.25H18.5V12.75H12.75V18.5H11.25V12.75Z"
                fill="inherit"
            />
        </svg>
    );
};

export default AddIcon;
