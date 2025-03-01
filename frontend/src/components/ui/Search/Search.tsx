'use client';

import clsx from 'clsx';
import styles from './Search.module.scss';
import {useRef, useState} from 'react';
import SearchIcon from '../Icons/SearchIcon';

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
    fullWidth?: boolean;
}

const Search: React.FC<SearchProps> = ({fullWidth, ...props}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleFocusOnInput = () => {
        if (!isFocused) inputRef.current?.focus();
    };

    return (
        <div
            className={clsx(
                styles.searchContainer,
                isFocused && styles.focused,
                fullWidth && styles.fullWidth
            )}
        >
            <SearchIcon/>
            <div className={styles.inputWrapper} onClick={handleFocusOnInput}>
                <input
                    className={clsx(styles.input)}
                    {...props}
                    ref={inputRef}
                    onFocus={(e) => {
                        handleFocus();
                        if (props?.onFocus) props.onFocus(e);
                    }}
                    onBlur={(e) => {
                        handleBlur();
                        if (props?.onBlur) props.onBlur(e);
                    }}
                />
            </div>
        </div>
    );
};

export default Search;