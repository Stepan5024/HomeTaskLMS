'use client';

import clsx from 'clsx';
import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'default' | 'outline' | 'blank';
    uppercase?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
    variant = 'default',
    children,
    className,
    uppercase = false,
    startIcon,
    endIcon,
    ...props
}) => {
    return (
        <button
            {...props}
            className={clsx(
                styles.button,
                styles[variant],
                { [styles.uppercase]: uppercase },
                className
            )}
        >
            {startIcon && startIcon}
            {children}
            {endIcon && endIcon}
        </button>
    );
};

export default Button;
