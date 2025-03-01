import React from 'react';
import { CloseIcon, Logo } from '@/components/ui';
import s from './Header.module.scss';

interface IHeaderProps {
    onClose: () => void;
}

const Header: React.FC<IHeaderProps> = ({ onClose }) => {
    return (
        <header className={s.header}>
            <Logo />
            <CloseIcon onClick={onClose} />
        </header>
    );
};

export default Header;
