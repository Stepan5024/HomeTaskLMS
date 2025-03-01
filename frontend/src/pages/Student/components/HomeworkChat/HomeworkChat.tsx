import { Button, Header, SendIcon } from '@/components/ui';
import React, { useEffect, useRef, useState } from 'react';
import s from './HomeworkChat.module.scss';
import { marked } from 'marked';
import Dropzone from '@/components/ui/Dropzone/Dropzone';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { uploadVideo } from '@/redux/slices/upload.slice';
import { useAppDispatch } from '@/redux/hooks/useAppDispatch';
import ProgressBar from '@/components/ui/ProgressBar/ProgressBar';

const text1 =
    '**Добро пожаловать в систему сдачи домашних заданий Adapstory.**\n1. После каждого урока вы будете получать задания, которые помогут закрепить изученный материал\n2. Выполняйте задания в удобное для вас время\n3. Загружайте готовые работы через эту систем';

const text2 =
    '**Курс: «Русский язык на рабочем месте»**\n\n**Урок: 1.1. Приветствие**';

const MiniLogoIcon = () => {
    return (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="0.5"
                y="0.5"
                width="23"
                height="23"
                rx="11.5"
                fill="white"
            />
            <rect
                x="0.5"
                y="0.5"
                width="23"
                height="23"
                rx="11.5"
                stroke="#22D38C"
            />
            <rect
                x="9.90625"
                y="5.92847"
                width="8.16503"
                height="4.18719"
                fill="#22D38C"
            />
            <rect
                x="5.92847"
                y="13.884"
                width="8.37438"
                height="4.18719"
                fill="#22D38C"
            />
            <path
                d="M9.90625 5.92847L16.5969 14.5165L14.3028 18.0713L7.61211 9.48326L9.90625 5.92847Z"
                fill="#22D38C"
            />
        </svg>
    );
};

const BotIcon = () => {
    return (
        <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="0.5"
                y="0.5"
                width="33"
                height="33"
                rx="15.5"
                fill="white"
            />
            <rect
                x="0.5"
                y="0.5"
                width="33"
                height="33"
                rx="15.5"
                stroke="#22D38C"
            />
            <rect
                x="14.0342"
                y="8.39893"
                width="11.5671"
                height="5.93186"
                fill="#22D38C"
            />
            <rect
                x="8.39893"
                y="19.6694"
                width="11.8637"
                height="5.93186"
                fill="#22D38C"
            />
            <path
                d="M14.0342 8.39893L23.5127 20.5653L20.2626 25.6013L10.7841 13.4349L14.0342 8.39893Z"
                fill="#22D38C"
            />
        </svg>
    );
};

marked.use({
    renderer: {
        link(token) {
            return `<a href="${token.href}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">${token.text}</a>`;
        },
    },
});

interface IHistory {
    type: 'bot' | 'my';
    message: string;
}

const HomeworkChat: React.FC = () => {
    const [isOpenChat, setIsOpenChat] = useState<boolean>(false);
    const [history, setHistory] = useState<IHistory[]>([]);
    const [activeQuestion, setActiveQuestion] = useState<{
        type:
            | 'homework'
            | 'upload'
            | 'question'
            | 'simple'
            | 'uploaded'
            | 'uploading'
            | 'result';
        message: string;
    }>({
        type: 'homework',
        message: '**Test**',
    });

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const messagesRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [answer, setAnswer] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { file } = useSelector((state: RootState) => state.uploadSlice);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            const adjustHeight = () => {
                textarea.style.height = 'auto';
                textarea.style.height = `${Math.min(
                    textarea.scrollHeight,
                    200
                )}px`;
            };

            textarea.addEventListener('input', adjustHeight);

            return () => {
                textarea.removeEventListener('input', adjustHeight);
            };
        }
    }, [textareaRef, activeQuestion.type]);

    useEffect(() => {
        if (isOpenChat)
            setTimeout(() => {
                if (messagesRef.current) {
                    messagesRef.current.scrollTop =
                        messagesRef.current.scrollHeight;
                }
            }, 100);
    }, [history.length, isOpenChat]);

    useEffect(() => {
        if (file.success) {
            setHistory((prev) => [
                ...prev,
                { type: 'bot', message: activeQuestion.message },
                { type: 'my', message: 'Хочу отправить задание на проверку' },
            ]);
            setActiveQuestion({
                type: 'simple',
                message:
                    '**Ваше задание успешно отправлено на проверку системы.**\n\nНеобходимы ли дополнительные действия?',
            });
        }
    }, [file.success]);

    function bytesToMB(bytes: number): string {
        return (bytes / (1024 * 1024)).toFixed(1) + ' мб.';
    }

    const handleFileSelect = (file: File | null) => {
        setSelectedFile(file);
        setActiveQuestion({
            type: 'uploaded',
            message: `**Ваш файл был загружен в систему.**\n\n**Вы можете его посмотреть по ссылке:**\n\n[${
                file!.name
            }. ${bytesToMB(file!.size)}](https://adapstory.ru)`,
        });
        setHistory((prev) => [
            ...prev,
            { type: 'bot', message: activeQuestion.message },
        ]);
    };

    const handleSendAnswerByClick = () => {
        if (activeQuestion) {
            setAnswer('');
            setHistory((prev) => [
                ...prev,
                { type: 'bot', message: activeQuestion.message },
                { type: 'my', message: answer },
            ]);
            setActiveQuestion({
                type: 'simple',
                message:
                    '**Ваш вопрос отправлен. Ожидайте ответа**\n\nНеобходимы ли дополнительные действия?',
            });
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (answer.trim()) {
                handleSendAnswerByClick();
            }
        }
    };

    const handleToggleChat = () => {
        setIsOpenChat((prev) => !prev);
    };

    const handleClickAskQuestion = () => {
        setHistory((prev) => [
            ...prev,
            { type: 'bot', message: activeQuestion.message },
            { type: 'my', message: 'Хочу задать вопрос' },
        ]);
        setActiveQuestion({
            type: 'question',
            message: '**Задайте ваш вопрос**\n\nНапишите его в поле ниже',
        });
    };

    const handleClickUpload = () => {
        setHistory((prev) => [
            ...prev,
            { type: 'bot', message: activeQuestion.message },
            { type: 'my', message: 'Загрузить свое задание' },
        ]);
        setActiveQuestion({
            type: 'upload',
            message:
                '**Вот форма загрузки вашего задания.**\n\nТребования к видео:\n\n* Хорошее качество звука\n* Формат файла с видео: .mp4\n* Размер не более 50 мб.',
        });
    };

    const handleClickReUpload = () => {
        setHistory((prev) => [
            ...prev,
            { type: 'bot', message: activeQuestion.message },
            { type: 'my', message: 'Хочу вернуть задание на доработку' },
        ]);
        setActiveQuestion({
            type: 'upload',
            message:
                '**Вот форма загрузки вашего задания.**\n\nТребования к видео:\n\n* Хорошее качество звука\n* Формат файла с видео: .mp4\n* Размер не более 50 мб.',
        });
    };

    const handleClickChangeFile = () => {
        setHistory((prev) => [
            ...prev,
            { type: 'bot', message: activeQuestion.message },
            { type: 'my', message: 'Хочу заменить файл' },
        ]);
        setActiveQuestion({
            type: 'upload',
            message:
                '**Вот форма загрузки вашего задания.**\n\nТребования к видео:\n\n* Хорошее качество звука\n* Формат файла с видео: .mp4\n* Размер не более 50 мб.',
        });
    };

    const handleClickUploadToServer = () => {
        if (selectedFile) {
            dispatch(
                uploadVideo({
                    file: selectedFile,
                })
            );
        }
        setHistory((prev) => [
            ...prev,
            { type: 'bot', message: activeQuestion.message },
            { type: 'my', message: 'Хочу отправить задание на проверку' },
        ]);
        setActiveQuestion({
            type: 'uploading',
            message: '**Отправка файла**',
        });
    };

    return (
        <div className={s.container}>
            {isOpenChat && (
                <div className={s.chat_container}>
                    <Header onClose={handleToggleChat} />

                    <div className={s.chat} ref={messagesRef}>
                        <div className={s.messages}>
                            <div className={`${s.message} ${s.bot}`}>
                                <div className={s.bot_container}>
                                    <BotIcon />
                                    <div
                                        className={s.content}
                                        dangerouslySetInnerHTML={{
                                            __html: marked.parse(text1),
                                        }}
                                    />
                                </div>
                            </div>
                            <div className={`${s.message} ${s.bot}`}>
                                <div className={s.bot_container}>
                                    <BotIcon />
                                    <div
                                        className={s.content}
                                        dangerouslySetInnerHTML={{
                                            __html: marked.parse(text2),
                                        }}
                                    />
                                </div>
                            </div>
                            {history.map((message, index) =>
                                message.type === 'bot' ? (
                                    <div
                                        className={`${s.message} ${s.bot}`}
                                        key={index}
                                    >
                                        <div className={s.bot_container}>
                                            <BotIcon />
                                            <div
                                                className={s.content}
                                                dangerouslySetInnerHTML={{
                                                    __html: marked.parse(
                                                        message.message
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className={`${s.message} ${s.my}`}
                                        key={index}
                                    >
                                        <div className={s.content}>
                                            {message.message}
                                        </div>
                                    </div>
                                )
                            )}
                            {activeQuestion && (
                                <div className={`${s.message} ${s.bot}`}>
                                    <div className={s.bot_container}>
                                        <BotIcon />
                                        <div
                                            className={s.content}
                                            dangerouslySetInnerHTML={{
                                                __html: marked.parse(
                                                    activeQuestion.message
                                                ),
                                            }}
                                        />
                                    </div>
                                    {activeQuestion.type === 'upload' && (
                                        <Dropzone
                                            onFileSelect={handleFileSelect}
                                        />
                                    )}
                                    {activeQuestion.type === 'uploading' &&
                                        file.loading && (
                                            <ProgressBar
                                                progress={file.progress}
                                            />
                                        )}
                                    <div className={s.options}>
                                        {activeQuestion.type === 'homework' && (
                                            <Button>
                                                Посмотреть пример задания
                                            </Button>
                                        )}
                                        {selectedFile &&
                                            activeQuestion.type ===
                                                'simple' && (
                                                <Button
                                                    onClick={
                                                        handleClickReUpload
                                                    }
                                                >
                                                    Вернуть задание на доработку
                                                </Button>
                                            )}
                                        {selectedFile &&
                                            activeQuestion.type ===
                                                'uploaded' && (
                                                <Button
                                                    onClick={
                                                        handleClickChangeFile
                                                    }
                                                >
                                                    Заменить файл
                                                </Button>
                                            )}
                                        {selectedFile &&
                                            activeQuestion.type ===
                                                'uploaded' && (
                                                <Button
                                                    onClick={
                                                        handleClickUploadToServer
                                                    }
                                                >
                                                    Отправить задание на
                                                    проверку
                                                </Button>
                                            )}
                                        {!selectedFile &&
                                            activeQuestion.type ===
                                                'simple' && (
                                                <Button
                                                    onClick={handleClickUpload}
                                                >
                                                    Загрузить свое задание
                                                </Button>
                                            )}
                                        {(activeQuestion.type === 'simple' ||
                                            activeQuestion.type ===
                                                'homework') && (
                                            <Button
                                                onClick={handleClickAskQuestion}
                                            >
                                                Задать вопрос
                                            </Button>
                                        )}
                                        {activeQuestion.type === 'homework' && (
                                            <Button onClick={handleClickUpload}>
                                                Загрузить свое задание
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {activeQuestion.type === 'question' && (
                        <div
                            className={`${s.input} ${
                                isFocused ? s.focused : ''
                            }`}
                        >
                            <div className={s.line}>
                                <textarea
                                    placeholder={'Напишите ваш вариант ответа'}
                                    ref={textareaRef}
                                    value={answer}
                                    rows={1}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                                <SendIcon
                                    onClick={handleSendAnswerByClick}
                                    className={`${
                                        isFocused || answer ? s.focused : ''
                                    }`}
                                    disabled={!answer}
                                    style={{
                                        cursor: !answer
                                            ? 'not-allowed'
                                            : 'pointer',
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
            <Button onClick={handleToggleChat}>
                <MiniLogoIcon /> Домашнее задание
            </Button>
        </div>
    );
};

export default HomeworkChat;
