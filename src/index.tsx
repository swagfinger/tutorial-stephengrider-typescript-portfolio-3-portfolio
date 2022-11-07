import * as esbuild from 'esbuild-wasm';
import { useState, useEffect } from 'react';

import { createRoot } from 'react-dom/client';//react18

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  //initializing esbuild used to transpile code
  const startService = async () => {
    const service = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    });
    console.log(service);
  }

  useEffect(() => {
    startService();
  }, []);

  const onClick = () => {
    console.log(input);
  }

  return <div>
    <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
    <div>
      <button onClick={onClick}>submit</button>
    </div>
    <pre>{ code }</pre>
  </div>
}

//react18
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App/>);