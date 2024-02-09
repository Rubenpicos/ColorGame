import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useMemo } from 'react';
import './App.css'


//the primary colors only. You can add more if you want.
type Color = {
  name: string;
  color: string;
  correct: boolean;
}

const colors = [
  {
    name: "red",
    color: '#EF476F',
    correct: false,
  },
  {
    name: "green",
    color: '#06D6A0',
    correct: false,
  },
  {
    name: "blue",
    color: '#118AB2',
    correct: false,
  },
  {
    name: "yellow",
    color: '#FFD166',
    correct: false,
  },
];




function App() {

  const [status, setStatus] = useState<"initial" | "playing" | "finished">('initial');
  const [time, setTime] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [gameColors, setGameColors] = useState<Color[]>([]);
  const correctColor = useMemo<Color> (() => gameColors.find((color) => color.correct)!,
   [gameColors]);

  function handlePlay() {
    setStatus("playing");
    setTime(0);
    setScore(0);

    const [correctColor, wrongColor] = colors.slice().sort(() => Math.random() - 0.5)

    setGameColors(
      [
        { ...correctColor, correct: true },
        wrongColor,
      ].sort(() => Math.random() - 0.5),

    );


      setCorrectColor(correctColor);
    setWrongColor(wrongColor);
  }



  function handleColorClick(clickedColor: Color) {
    if (clickedColor.correct) {
      setScore((score) => score + 1);


      if(score === 9){
        setStatus("finished")
      }else{
        const [correctColor, wrongColor] = colors.slice().sort(() => Math.random() - 0.5)
      setGameColors([{ ...correctColor, correct: true }, wrongColor,].sort(() => Math.random() - 0.5),
      

      
  
      );
      }
    }
  }




  useEffect(() => {

    let interval: number;
    if (status === "playing") {

      interval = setInterval(() => {
        setTime((time) => time + 1)
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [status]);

  return (
    <main>
      <header>
        <h1>{score} SCORE</h1>
        <h1>{time} SECONDS</h1>
      </header>
      {status === "playing" && (
        <section>
          <span style={{ textTransform: "capitalize", color: gameColors[0].color}}>{correctColor.name}</span>
        </section>
      )}
      <footer>
        {status === "initial" && <button style={{fontSize:32}} onClick={handlePlay}>Play</button>}
        {status === "finished" && <button style={{fontSize:32}} onClick={() => setStatus("initial")}>Restart</button>}
        {status === "playing" &&  <>
          <button onClick={() => handleColorClick(gameColors[0])} style={{ width: 128, height: 128, backgroundColor: gameColors[0].color }}></button>
          <button onClick={() => handleColorClick(gameColors[1])} style={{ width: 128, height: 128, backgroundColor: gameColors[1].color }}></button>

        </>}

      </footer>
    </main>
  );
}

export default App;