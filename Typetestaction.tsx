import React, { useEffect, useState } from "react";
import { RootState, AppDispatch } from "./Store";
import { fetchSentences, setCurrentSentence } from "./Typetestslice";
import { useDispatch, useSelector } from "react-redux";

const Typetestaction : React.FC = () => {
    const dispatch :AppDispatch = useDispatch();
    const {Sentence, currentsentence, loading, error} = useSelector((state:RootState) => state.Sentence);



    const[userinput, setUserinput] = useState<string>('');
    const[starttime, setStarttime] = useState<number | null>(null);
    const[wpm, setWpm] = useState<number | null>(null);
    const[accuracy, setAccuracy] = useState<number | null>(null);
    const[finished, setFinished] = useState<boolean>(false);
   

    useEffect (() => {
        dispatch((fetchSentences ()));
    },[dispatch] );

    

    const handleinputchange = (value:string) => {
        if(!starttime){
            setStarttime(Date.now());
        }
        setUserinput(value);
    };

    const handlefinish = () => {
        if(currentsentence && starttime){
            const endtime = Date.now();
            calculatewpm(endtime);
            calculateaccuracy(userinput);
            setFinished(true);
        } 
    };
    const calculatewpm = (endtime:number) => {
        if(starttime && currentsentence){
            const timeTakenMintues = (endtime - starttime)/60000;
            const wordCount = (currentsentence.split('').length);
            setWpm(Math.round(wordCount/timeTakenMintues));
             
        }
    };
    const calculateaccuracy =(Userinput:string) => {
        if(currentsentence){
            const totalChar = currentsentence.length;
            const correctChar = Userinput.split('').filter((Char, idx)=> Char ===currentsentence[idx]).length;
            setAccuracy(Math.round(correctChar/totalChar)*100);
        }
    };
    const nextsentence = () => {
        if(Sentence.length>0){
            const nextIndex = Math.floor(Math.random()* Sentence.length);
            dispatch(setCurrentSentence(Sentence[nextIndex]));
        }
        setUserinput('');
        setStarttime(null);
        setWpm(null);
        setAccuracy(null);
        setFinished(false);
    }
    if (loading) return <p>loading</p>
    if (error) return <p>error: {error}</p>

    return(
        <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center", marginTop: "50px" }}>
            <h1>Typing Speed Test</h1>
            <p style={{ fontSize: "1.5em", fontStyle: "italic" }}>{currentsentence}</p>

            {!finished && (
                <>
                <textarea
                    value = {userinput}
                    onChange={(e)=>handleinputchange(e.target.value)}
                    placeholder = "start typing here"
                    style={{width: "80%", height : "100px"}}
                    disabled={finished}
                /><br></br>
                <button
                onClick={handlefinish}
                style={{
                    marginTop:"20px",
                    padding:"10px 20px",
                    fontSize:"1em",
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}>
                    Finish
                </button>
                </>
            )}
            {finished && (
                <>
                <p><strong>WPM </strong>{wpm}</p>
                <p><strong>Accuracy </strong>{accuracy}%</p>
                <button onClick={nextsentence} 
                style={{marginTop: "20px",
                     padding: "10px 20px",
                     fontSize: "1em",
                     backgroundColor: "#28A745",
                     color: "#fff",
                     border: "none", 
                     borderRadius: "5px", 
                     cursor: "pointer", }}
                      > Next</button>
                </>
            )}          
        </div>
    )
}

export default Typetestaction;
