import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';

import { createRoot } from 'react-dom/client';//react18

const App = () => {
  const ref = useRef<any>();//create ref

  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  //initializing esbuild used to transpile code
  //use ref to create reference
  const startService = async () => {

    //refer to service later by 'ref.current'
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    });
  }

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    console.log(input);

    if (!ref.current) {
      return;
    }

    //refer to service
    const result = await ref.current.transform(input, {
      loader: 'jsx',
      target: 'es2015'
    });

    console.log(result);
    setCode(result.code);
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