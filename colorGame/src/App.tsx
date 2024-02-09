import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



type Color = {
  name: string;
  color: string;
}

const colors = [
  {
    name: "red",
    color: '#f00',
  },
  {
    name: "green",
    color: '#0f0',
  },
  {
    name: "blue",
    color: '#00f',
  },
  {
    name: "yellow",
    color: '#ff0',
  },
];




function App() {

  const [status, setStatus] = useState<"initial" | "playing" | "finish">('initial');
  const [time, setTime] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [color, setColor] = useState<null | Color>(null);
  const [wrongCOlor, setWrongColor] = useState<null | Color>(null)

  function handlePlay() {
    setStatus("playing");
    setTime(0);
    setScore(0);

    const [color, wrongCOlor] = colors.slice().sort(() => Math.random() - 0.5)
    setColor(color);
    setWrongColor(wrongCOlor)

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
        <h1>{0} SCORE</h1>
        <h1>{time} SECONDS</h1>
      </header>
      {status === "playing" && (
        <section>
          <span style={{ textTransform: "capitalize", color: wrongCOlor.color }}>{color?.name}</span>
        </section>
      )}
      <footer>
        {status === "initial" && <button onClick={handlePlay}>Play</button>}
        {status === "finished" && <button onClick={() => setStatus("initial")}>Restart</button>}
        {status === "playing" && color && wrongCOlor && <>
          <button onClick={() => handleColorClick(color)} style={{ width: 128, height: 128, backgroundColor: color.color }}></button>
          <button onClick={() => handleColorClick(wrongColor)} style={{ width: 128, height: 128, backgroundColor: wrongCOlor.color }}></button>

        </>}

      </footer>
    </main>
  );
}

export default App;