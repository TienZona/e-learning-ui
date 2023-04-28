import axios from 'axios';
import { useEffect, useState } from 'react';

import QuestionIcon from '~/assets/icon/question.png';
import AvatarCircle from '~/components/Global/AvatarCircle';

function RecordQuestion({ meet }) {
    const [question, setQuestion] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/meet/question/${meet.id_room}`)
            .then((res) => {
                if (res.status === 200) {
                    setQuestion(res.data);
                }
            })
            .catch((err) => console.log(err));
    }, [meet]);

    return (
        <div style={{ margin: '0 100px' }}>
            {question && (
                <div>
                    {question.map((question, index) => (
                        <div key={index}>
                            <div className="flex items-center">
                                <img src={QuestionIcon} width="30" alt="" />
                                <h1 className="px-3 text-3xl">{question.heading}</h1>
                            </div>
                            {question.answers.map((answer, index) => (
                                <div className="mx-16 my-3" key={index}>
                                    <div className="flex justify-between my-3">
                                        <h2 className="text-2xl">{index + 1 + '. ' + answer.content}</h2>
                                        <h2 className="text-2xl">{answer.vote.length} trả lời </h2>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {answer.vote.map((vote, index) => (
                                            <div
                                                className="flex items-center m-2 p-2 col-span-1"
                                                key={index}
                                                // style={{ border: '1px solid white', borderRadius: '10px' }}
                                            >
                                                <AvatarCircle avatar={vote.avatar} size="40px" border="" />
                                                <div className="mx-2">
                                                    <h2 className="text-2xl text-sky-400">{vote.name}</h2>
                                                    <span className="tex-l text-blue-200 truncate">{vote.email}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default RecordQuestion;
