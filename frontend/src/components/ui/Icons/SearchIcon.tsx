'use client';

import React from 'react';

interface SearchIconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
}

const SearchIcon: React.FC<SearchIconProps> = ({ size = 24, ...rest }) => {
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
                        d="M9.51925 15.6152C7.81158 15.6152 6.36542 15.023 5.18075 13.8385C3.99625 12.6538 3.404 11.2077 3.404 9.5C3.404 7.79233 3.99625 6.34617 5.18075 5.1615C6.36542 3.977 7.81158 3.38475 9.51925 3.38475C11.2269 3.38475 12.6731 3.977 13.8577 5.1615C15.0422 6.34617 15.6345 7.79233 15.6345 9.5C15.6345 10.2142 15.5147 10.8963 15.275 11.5463C15.0352 12.1962 14.7152 12.7616 14.3152 13.2423L20.0692 18.9962C20.2077 19.1346 20.2786 19.3086 20.2817 19.5182C20.2849 19.7279 20.2141 19.9052 20.0692 20.05C19.9244 20.1948 19.7487 20.2673 19.5422 20.2673C19.3359 20.2673 19.1603 20.1948 19.0155 20.05L13.2615 14.296C12.7615 14.7088 12.1865 15.0319 11.5365 15.2653C10.8865 15.4986 10.2141 15.6152 9.51925 15.6152ZM9.51925 14.1155C10.8077 14.1155 11.8991 13.6683 12.7932 12.774C13.6876 11.8798 14.1347 10.7885 14.1347 9.5C14.1347 8.2115 13.6876 7.12017 12.7932 6.226C11.8991 5.33167 10.8077 4.8845 9.51925 4.8845C8.23075 4.8845 7.13942 5.33167 6.24525 6.226C5.35092 7.12017 4.90375 8.2115 4.90375 9.5C4.90375 10.7885 5.35092 11.8798 6.24525 12.774C7.13942 13.6683 8.23075 14.1155 9.51925 14.1155Z"
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
            style={{ cursor: rest?.onClick ? 'pointer' : 'default' }}
            xmlns="http://www.w3.org/2000/svg"
            {...rest}
        >
            <path
                d="M9.51925 15.6152C7.81158 15.6152 6.36542 15.023 5.18075 13.8385C3.99625 12.6538 3.404 11.2077 3.404 9.5C3.404 7.79233 3.99625 6.34617 5.18075 5.1615C6.36542 3.977 7.81158 3.38475 9.51925 3.38475C11.2269 3.38475 12.6731 3.977 13.8577 5.1615C15.0422 6.34617 15.6345 7.79233 15.6345 9.5C15.6345 10.2142 15.5147 10.8963 15.275 11.5463C15.0352 12.1962 14.7152 12.7616 14.3152 13.2423L20.0692 18.9962C20.2077 19.1346 20.2786 19.3086 20.2817 19.5182C20.2849 19.7279 20.2141 19.9052 20.0692 20.05C19.9244 20.1948 19.7487 20.2673 19.5422 20.2673C19.3359 20.2673 19.1603 20.1948 19.0155 20.05L13.2615 14.296C12.7615 14.7088 12.1865 15.0319 11.5365 15.2653C10.8865 15.4986 10.2141 15.6152 9.51925 15.6152ZM9.51925 14.1155C10.8077 14.1155 11.8991 13.6683 12.7932 12.774C13.6876 11.8798 14.1347 10.7885 14.1347 9.5C14.1347 8.2115 13.6876 7.12017 12.7932 6.226C11.8991 5.33167 10.8077 4.8845 9.51925 4.8845C8.23075 4.8845 7.13942 5.33167 6.24525 6.226C5.35092 7.12017 4.90375 8.2115 4.90375 9.5C4.90375 10.7885 5.35092 11.8798 6.24525 12.774C7.13942 13.6683 8.23075 14.1155 9.51925 14.1155Z"
                fill="inherit"
            />
        </svg>
    );
};

export default SearchIcon;
