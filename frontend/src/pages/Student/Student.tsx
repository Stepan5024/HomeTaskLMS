import React from 'react';
import s from './Student.module.scss';
import HomeworkChat from './components/HomeworkChat/HomeworkChat';

const Student: React.FC = () => {
    return (
        <main className={s.main}>
            <HomeworkChat />
        </main>
    );
};

export default Student;
