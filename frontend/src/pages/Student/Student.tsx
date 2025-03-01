import React from 'react';
import s from './Student.module.scss';
import HomeworkChat from './components/HomeworkChat/HomeworkChat';
import back from '/assets/back.png';

const Student: React.FC = () => {
    return (
        <main className={s.main}>
            <img src={back} />
            <HomeworkChat />
        </main>
    );
};

export default Student;
