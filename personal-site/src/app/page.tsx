import { collectRoutesUsingEdgeRuntime } from "next/dist/build/utils";
import Image from "next/image";
import Link from 'next/link';
import {ReactNode} from 'react';

interface LayerProps {
  color: string;
  borderSize: number;
  children: ReactNode;
}

interface HomeProps {
  children: ReactNode;
}

function Layer({color, borderSize, children}: LayerProps) {
    return (
      <div className={`p-[${borderSize}px] border-${borderSize} ${color} w-full h-full bg-black`}>
          {children}
      </div>
    );
}

export default function Home() {
  return (
    <div className="m-[20px] p-[10px] font-[MONOSPACE] w-auto h-auto">
      <h3 className="text-blue-100 font-[MONOSPACE] text-[14px]">Hi, welcome to my site. Use the borders to navigate. More coming soon.</h3>
    </div>
  );

};
