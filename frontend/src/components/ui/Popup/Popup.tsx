'use client';

import React, { useEffect } from 'react';
import s from './Popup.module.scss';
import { CloseIcon } from '@/components/ui';

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({
    isOpen,
    onClose,
    children,
    ...rest
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={s.overlay} onClick={handleOverlayClick}>
            <div className={s.popup} {...rest}>
                <CloseIcon onClick={onClose} size={20} className={s.close} />
                {children}
            </div>
        </div>
    );
};

export default Popup;
