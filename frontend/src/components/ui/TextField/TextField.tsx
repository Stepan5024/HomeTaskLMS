"use client";

import React, {InputHTMLAttributes, useEffect, useRef, useState} from "react";
import clsx from "clsx";
import styles from "./TextField.module.scss";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    helperText?: string;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
    color?: "default" | "error";
    mb?: string | number;
    fullWidth?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
                                                 label,
                                                 helperText,
                                                 startAdornment,
                                                 endAdornment,
                                                 color,
                                                 fullWidth,
                                                 mb,
                                                 ...props
                                             }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleFocusOnInput = () => {
        if (!isFocused) inputRef.current?.focus();
    };

    useEffect(() => {
        if (props.value) {
            setHasValue(true);
        } else {
            setHasValue(false);
        }
    }, [props.value]);

    return (
        <div
            className={clsx(
                styles.textField,
                fullWidth && styles.fullWidth,
                color === "error" && styles.error,
            )}
            style={{marginBottom: mb}}
        >
            <div
                className={clsx(
                    styles.inputContainer,
                    isFocused && styles.focused,
                )}
            >
                {startAdornment && (
                    <span className={styles.startAdornment}>
						{startAdornment}
					</span>
                )}
                <div
                    className={styles.inputWrapper}
                    onClick={handleFocusOnInput}
                >
                    {label && (
                        <label
                            className={clsx(
                                styles.label,
                                isFocused && styles.labelFocused,
                                (props?.placeholder ||
                                    inputRef.current?.value ||
                                    hasValue) &&
                                styles.hasPlaceholder,
                            )}
                        >
                            {label}
                        </label>
                    )}
                    <input
                        className={clsx(styles.input, label && styles.hasLabel)}
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
                {endAdornment && (
                    <span className={styles.endAdornment}>{endAdornment}</span>
                )}
            </div>
            {helperText && (
                <span className={styles.helperText}>{helperText}</span>
            )}
        </div>
    );
};

export default TextField;
