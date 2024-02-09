import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [status, setStatus] = useState<"initial" | "playing" | "finish">('initial');
  const [time, setTime] = useState<number>(0);
  const [score, setScore] = useState<number>(0);


    useEffect(() => {
      if (status=== "playing") {
        
      }
    }, [status]))

  return (
    <main>
      <header>
        <h1>{0} SCORE</h1>
        <h1>{0} SECONDS</h1>
      </header>
      {status === "playing" &&(
      <section>
        <span>White</span>
      </section>
      )}
      <footer>
        {status ==="initial" && <button onClick={() => setStatus ("playing")}>Play</button>}
        {status ==="finished" && <button onClick={() => setStatus ("initial")}>Restart</button>}

      </footer>
    </main>
  );
}

export default App;