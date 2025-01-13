"use client";
import React, { HTMLAttributes, useEffect } from "react";

export type TItemControl = (itemLen: number) => void;

interface Props extends HTMLAttributes<HTMLElement> {
  itemLength: number;
  currentIndex: number;
  controller: TItemControl;
  autoplayController(): void;
}

const OverLayStack = ({
  controller,
  itemLength,
  currentIndex,
  className,
  children,
  autoplayController,
}: Props) => {
  useEffect(() => {
    const timeout = setInterval(() => {
      autoplayController();
    }, 3000);

    return () => clearInterval(timeout);
  }, [autoplayController]);

  return (
    <main
      className={`flex flex-col justify-center items-center space-y-7 ${className}`}
    >
      <section className="w-full h-full relative justify-center items-center flex">
        {children}
      </section>

      <div className="w-fit py-1 flex items-center space-x-3">
        {Array.from({ length: itemLength }).map((_e, i) => (
          <span
            key={"dot" + i}
            onClick={() => controller(i)}
            className={`w-2 h-2 rounded-full ${
              i === currentIndex ? "bg-[#0038FF]" : "bg-[#D9D9D9]"
            }`}
          ></span>
        ))}
      </div>
    </main>
  );
};

export default OverLayStack;
