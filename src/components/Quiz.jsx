import React, { useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../assets/data";

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(data[index]);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);

    const option1 = useRef(null);
    const option2 = useRef(null);
    const option3 = useRef(null);
    const option4 = useRef(null);

    const options = [option1, option2, option3, option4];

    const checkAnswer = (element, answer) => {
        if (!lock) {
            if (question.ans === answer) {
                element.target.classList.add('correct');
                setScore(score + 1);
            } else {
                element.target.classList.add('wrong');
                options[question.ans - 1].current.classList.add('correct');
            }
            setLock(true);
        }
    }

    const next = () => {
        if (lock) {
            if (index === data.length - 1) {
                setResult(true);
                return;
            }
            const nextIndex = index + 1;
            setIndex(nextIndex);
            setQuestion(data[nextIndex]);
            setLock(false);
            options.forEach((option) => {
                option.current.classList.remove('wrong');
                option.current.classList.remove('correct');
            });
        }
    }

    const reset = () => {
        setIndex(0);
        setQuestion(data[0]);
        setLock(false);
        setScore(0);
        setResult(false);
        options.forEach((option) => {
            option.current.classList.remove('wrong');
            option.current.classList.remove('correct');
        });
    }

    return (
            <div className="container">
                <h1>Quiz App</h1>
                <hr />
                {
                    result ? (
                        <div>
                            <h2>Your Score: {score} out of {data.length}</h2>
                            <button onClick={reset}>Reset</button>
                        </div>
                    ) : (
                        <>
                            <h2>{index + 1}. {question.question}</h2>
                            <ul>
                                <li ref={option1} onClick={(element) => checkAnswer(element, 1)}>{question.option1}</li>
                                <li ref={option2} onClick={(element) => checkAnswer(element, 2)}>{question.option2}</li>
                                <li ref={option3} onClick={(element) => checkAnswer(element, 3)}>{question.option3}</li>
                                <li ref={option4} onClick={(element) => checkAnswer(element, 4)}>{question.option4}</li>
                            </ul>
                            <button onClick={next}>Next</button>
                            <div className="index">{index + 1} of {data.length} questions</div>
                        </>
                    )
                }
        </div>
    );
};

export default Quiz;
