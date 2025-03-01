'use client';

import React from 'react';

interface FlowchartIconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
}

const FlowchartIcon: React.FC<FlowchartIconProps> = ({
    size = 24,
    ...rest
}) => {
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
                        d="M15.1348 19.5V17.5673H11.25V7.92324H8.85575V9.84624H2.5V4.49049H8.85575V6.42324H11.25H12.75V9.43263L15.1348 9.43252V7.50002H21.5V12.8653H15.1348V10.9325H12.75V16.0673H15.1348V14.1442H21.5V19.5H15.1348ZM16.6345 18H20V15.6442H16.6345V18ZM4 8.34624H7.35575V5.99049H4V8.34624ZM16.6345 11.3653H20V9.00002H16.6345V11.3653Z"
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
                d="M15.1348 19.5V17.5673H11.25V7.92324H8.85575V9.84624H2.5V4.49049H8.85575V6.42324H11.25H12.75V9.43263L15.1348 9.43252V7.50002H21.5V12.8653H15.1348V10.9325H12.75V16.0673H15.1348V14.1442H21.5V19.5H15.1348ZM16.6345 18H20V15.6442H16.6345V18ZM4 8.34624H7.35575V5.99049H4V8.34624ZM16.6345 11.3653H20V9.00002H16.6345V11.3653Z"
                fill="inherit"
            />
        </svg>
    );
};

export default FlowchartIcon;
