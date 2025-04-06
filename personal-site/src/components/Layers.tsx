'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { usePathname } from "next/navigation";

const ACTIVE_COLOR_TW = {
  border: "border-blue-400", 
  text: "text-blue-400", 
  bg: "bg-blue-400"
};

const INACTIVE_COLOR_TW = {
  border: "border-blue-100", 
  text: "text-blue-100", 
  bg: "bg-blue-100"
};


const LayerMenuItems = 
  {
    label: 'HOME',
    url: "/",
    next: 
      {
        label: 'DRUM MACHINE',
        url: "/drums",
        next: 
          {
            label: 'OTHER',
            url: "/other",
            next: 
              {
                label: 'MISCELLANEOUS',
                url: "/misc",
                next: null
              }
          }
      }
  };

interface LayersProps {
  layers: LayerItemProps;
  children: ReactNode;
}

interface LayerItemProps {
  label: string;
  url: string;
  next: LayerItemProps | null;
}

function ContentWrapper({ children }: {children: ReactNode;}) {
  return (
    <div className="w-full h-full bg-blue-400">
        {children}
    </div>
  );
}

function LayerItem({
  layerItem,
  children,
}: Readonly<{
  layerItem: any,
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const {label, url, next} = layerItem;
  const color = url === pathname ? ACTIVE_COLOR_TW : INACTIVE_COLOR_TW;

  return(
    <div className={`px-[10px] pb-[10px] border-10 ${color.border} w-full h-full bg-black`}>
      <h1 className={color.text + " pb-[5px] ml-[-5px]"}><Link href={url}>{label}</Link></h1>
      {next ? <Layers layers={next} children={children}/> : <ContentWrapper>{children}</ContentWrapper> }
    </div>
  );

}
export default function Layers({ layers, children }: LayersProps) {
    return (
      <LayerItem layerItem={layers}>
          {children}
      </LayerItem>
    );
}

