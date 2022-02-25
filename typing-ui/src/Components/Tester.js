import React,{useEffect, useState} from 'react';
import './Tester.css';
import $ from 'jquery';

const Tester = () => {
    const requiredWords = [
        {
            word: 'varda',
            id:1
        },
        {
            word: 'kari',
            id:2
        },
        {
            word: 'goes',
            id:3
        },
        {
            word: 'to',
            id:4
        },
        {
            word: 'buy',
            id:5
        },
        {
            word: 'vegetable',
            id:6
        },
        {
            word: 'aeroplane',
            id:7
        },
        {
            word: 'across',
            id:8
        },
        {
            word: 'poison',
            id:9
        },
        {
            word: 'never',
            id:10
        },
        {
            word: 'flower',
            id:11
        },
        {
            word: 'bizzare',
            id:12
        },
        {
            word: 'before',
            id:13
        },
        {
            word: 'never',
            id:14
        },
        {
            word: 'fire',
            id:15
        },
        {
            word: 'gather',
            id:16
        }
    ];
    const [requiredWordIndex, setRequiredWordIndex] = useState(0);
    const [requiredWord, setRequiredWord] = useState();
    const [attemptedWords, setAttemptedWords] = useState(0);
    const [incorrectWords, setIncorrectWords] = useState(0);
    const [correctWords, setCorrectWords] = useState(0);
    const [userLetterInput, setUserLetterInput] = useState([]);
    const [userAccuracy, setUserAccuracy] = useState(0);
    const [timeCount, setTimeCount] = useState(60);
    const userInputHandler = (event) => {
        if(requiredWordIndex < requiredWords.length){
            var requiredObject = requiredWords[requiredWordIndex];
            setRequiredWord(requiredObject.word);
        }
        if(event.key !== null){
            // console.log(event.key, event);
            const keyName = event.key;
            if(event.keyCode > 64 && event.keyCode < 91){ 
                setUserLetterInput(prevState => [...prevState, keyName]); //setting state only on alphabet keycodes
            }
            // document.addEventListener('keydown', handleKeyDown, false);
            if(keyName === ' '){
                // console.log(event);
                const userinput = userLetterInput.toString();
                const toMatch = userinput.split(',').join('');
                // console.log(toMatch);
                const isMatched = toMatch.localeCompare(requiredWord);
                const nextword = requiredObject != null ? requiredObject.id + 1 : null;
                if(nextword == null){
                    return;
                }
                if(isMatched !== 0){
                    $('#' + requiredObject.id).addClass('error');
                    $('#' + requiredObject.id).removeClass('underline');
                    setIncorrectWords(prevState => prevState + 1);
                }else{
                    $('#' + requiredObject.id).addClass('active');
                    $('#' + requiredObject.id).removeClass('underline');
                }
                $('#' + nextword).addClass('underline');
                setAttemptedWords(prevState => prevState + 1);
                setRequiredWordIndex(prevState => prevState + 1);
                setUserLetterInput([]);
                // console.log(isMatched);
            }else if(keyName === "Backspace"){
                let removed = userLetterInput.filter((_, index) => index !== userLetterInput.length - 1);
                setUserLetterInput(removed);
                // console.log(userLetterInput);
            }
            return keyName;
        }
    }
    const timecountHandler = (timer) => {
        setTimeCount(prevState => prevState - 1);
        if (timeCount > 0) {
          setTimeout(timecountHandler, 1000);
        }else{
            setTimeCount(60);
        }
    }
    const calculateAccuracy = (incorrectWords, attemptedWords) => {
        const correctWords = attemptedWords - incorrectWords;
        setCorrectWords(correctWords);
        const accuracy = (correctWords / attemptedWords) * 100;
        setUserAccuracy(accuracy.toFixed(2));
    }
    const setTimeCounter = (setTo) => {
        setTimeCount(setTo);
        setAttemptedWords(0);
        setCorrectWords(0);
        setIncorrectWords(0);
        setUserAccuracy(0);
        $(".requiredWord").removeClass("error");
        $(".requiredWord").removeClass("underline");
        $(".requiredWord").removeClass("active");
        $(".user-typebox").val("");
        setRequiredWordIndex(0);
    }
    useEffect(()=>{
        console.log(userLetterInput);
    },[userLetterInput]);
    useEffect(()=>{
        calculateAccuracy(incorrectWords, attemptedWords);
    },[attemptedWords, incorrectWords]);
    useEffect(()=>{
        timecountHandler(61);
    },[]);
    //check OVERFLOW CONTENT MOVING TO LEFT SIDE in WPM TEST inside laravel-react folder
    //Create a Landing Page which would have a button for take a test, that pops up a small input to enter the name, and takes the user to the next Component, ie Tester.js
        return (
            <React.Fragment>
                <div className="tester" style={{"maxWidth": "100%"}}> 
                    <div className="container-fluid tester-body d-flex my-5 justify-content-center">
                        <div className="col-sm-10 my-5">
                            <div className="row">
                                <div className="circular-counter text-center col-sm-3">
                                    <svg className="progress-ring-basic" height="120" width="120">
                                    <circle className="progress-ring__circle__basic" strokeWidth="6" fill="transparent" r="50" cx="60" cy="60" strokeLinecap="round" id="circle2" stroke="#e86033" style={{"strokeDasharray": 314.159, "strokeDashoffset": 0}}></circle>
                                    </svg>
                                    <span className="fw-bold time-counter">{timeCount > 0 ? timeCount : 60}s</span>
                                </div>
                                <div class="col-sm-9 row m-0 d-flex justify-content-around">
                                    <div className="col-sm-4 bg-white display-card text-center pt-3">
                                        <p>Accuracy</p>
                                        <span className="fw-bold">{userAccuracy > 0 ? userAccuracy + '%' : '--'}</span>
                                    </div>
                                    <div className="col-sm-4 bg-white display-card text-center pt-3">
                                        <p>Words/min</p>
                                        <span className="fw-bold">{ correctWords > 0 ? correctWords + 'WPM' : '--'}</span>
                                    </div>
                                    <div className="col-sm-4 bg-white display-card text-center pt-3">
                                        <p>Errors</p>
                                        <span className="fw-bold">{incorrectWords}/{attemptedWords}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center menu-row mt-5">
                                <div className="d-flex col-sm-5 offset-sm-1 col-12">
                                    <p className="mr-1 my-auto">Modes</p>
                                    <button className="btn mx-2 menu-btn" onClick={() => setTimeCounter(60)}>1 Minute</button>
                                    <button className="btn mx-2 menu-btn" onClick={() => setTimeCounter(180)}>3 Minute</button>
                                    <button className="btn mx-2 menu-btn" onClick={() => setTimeCounter(300)}>5 Minute</button>
                                </div>
                            </div>
                            <div className="row justify-content-center task-row mt-5">
                                <div className="task-card">
                                    <div className="word-section">
                                        {requiredWords.map((requiredWord)=> (
                                            <span className="requiredWord" id={requiredWord.id} key={requiredWord.id}>{requiredWord.word}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="row input-row mt-4">
                                <input className="form-control mx-auto user-typebox" onKeyUp={userInputHandler} placeholder="Start Typing..."/>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
 
export default Tester;