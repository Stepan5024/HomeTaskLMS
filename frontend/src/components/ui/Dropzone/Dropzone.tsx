import { useDropzone } from 'react-dropzone';
import { useCallback } from 'react';
import styles from './Dropzone.module.scss';

const FileIcon = () => (
    <svg
        width="33"
        height="25"
        viewBox="0 0 33 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.125 1.5C13.125 0.671573 12.4534 0 11.625 0H2.125C1.02043 0 0.125 0.895431 0.125 2V3V22V23C0.125 24.1046 1.02043 25 2.125 25H27.125C28.2296 25 29.125 24.1046 29.125 23V5C29.125 3.89543 28.2296 3 27.125 3H14.625C13.7966 3 13.125 2.32843 13.125 1.5Z"
            fill="#49CB98"
        />
        <path
            d="M4.89927 10.1992C5.27973 8.33722 6.91782 7 8.81829 7H30.425C31.6905 7 32.6379 8.16052 32.3845 9.40039L29.8507 21.8008C29.4703 23.6628 27.8322 25 25.9317 25H1.875L4.89927 10.1992Z"
            fill="#62E5B0"
        />
    </svg>
);

interface DropzoneProps {
    onFileSelect: (file: File | null) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileSelect }) => {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                onFileSelect(acceptedFiles[0]);
            }
        },
        [onFileSelect]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'video/mp4': [],
        },
        multiple: false,
    });

    return (
        <div
            {...getRootProps()}
            className={`${styles.dropzone} ${
                isDragActive ? styles.active : ''
            }`}
        >
            <input {...getInputProps()} />
            <div>
                <FileIcon />
                <p className={styles.text}>
                    {isDragActive
                        ? 'Отпустите файл\nздесь'
                        : 'Загрузите свои\nматериалы здесь'}
                </p>
            </div>
        </div>
    );
};

export default Dropzone;
