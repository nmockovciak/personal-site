'use client';

import { collectRoutesUsingEdgeRuntime } from "next/dist/build/utils";
import { warnOptionHasBeenMovedOutOfExperimental } from "next/dist/server/config";
import Image from "next/image";
import {ReactNode} from 'react';

import { useState, useEffect, ChangeEvent } from "react";

const BEAT_TOTAL = 16;
const BPM_MIN = 20;
const BPM_MAX = 300;

const stepButtonsGrid =[
  [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
  [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
  [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ], 
  [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ] 
];

function StepButton({active}: {active: boolean;}) {
  const [pressed, setPressed] = useState(false);

  const handleClick = () => {
      setPressed(!pressed);
  };
  return(<div onClick={() => handleClick()} className={active ? (pressed ? "bg-orange-200 w-[40px] h-[40px] m-[5px] inline-block text-pink-400" : "bg-green-200 w-[40px] h-[40px] m-[5px] inline-block text-pink-400") : (pressed ? "bg-orange-600 w-[40px] h-[40px] m-[5px] inline-block text-pink-400" : "bg-green-700 w-[40px] h-[40px] m-[5px] inline-block text-pink-400") }/>);
}


interface DrumMachineProps {
  min: number;
  max: number;
  bpmIntervalMS: number;
};


function DrumMachine({min, max, bpmIntervalMS}: DrumMachineProps) {

  const [steps, setSteps] = useState();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount >= (BEAT_TOTAL -1) ? 0 : prevCount + 1);
    }, bpmIntervalMS/4);

    return () => clearInterval(intervalId);
  }, [bpmIntervalMS]);

  return (
  
      <div>
      { stepButtonsGrid.map((row, i) => {
          return  <div key={i*234}>
            {row.map((step, j) => {
            return <StepButton key={i*j+i+j} active={j === count}/>
          })}
        </div>
        })
      }
      <p>{count}</p>
      </div>
  );

};



export default function Home() {

  const [steps, setSteps] = useState();
  const [bpmInputValue, setBpmInputValue] = useState<number | undefined>(60);

  const handleBpmInputChange = (event: ChangeEvent<HTMLInputElement>) => {

    const newValue = event.target.value === '' ? undefined : parseInt(event.target.value, 10);

    if ((BPM_MIN === undefined || newValue === undefined || newValue >= BPM_MIN) && (BPM_MAX === undefined || newValue === undefined || newValue <= BPM_MAX)) {
      setBpmInputValue(newValue);
    }
  };

  return (
    <div className="m-[20px] p-[10px] font-[MONOSPACE] w-auto h-auto">
      <input
        type="number"
        value={bpmInputValue}
        onChange={handleBpmInputChange}
        placeholder="___ BPM"
      />
      <p>Tempo: {bpmInputValue} BPM</p>
      <DrumMachine min={BPM_MIN} max={BPM_MAX} bpmIntervalMS={(bpmInputValue && bpmInputValue > 0) ? 60000/bpmInputValue : 500} />
    </div>
  );

};
