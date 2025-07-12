"use client";
import React, { useEffect, useRef } from "react";
import { initDraw } from "../../../draw";
import Button from "../../../components/Button";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      initDraw(canvas);
    }
  }, []);
  return (
    <>
      <canvas ref={canvasRef} width={1080} height={1920}></canvas>
      {/* <div className="absolute bottom-0 right-0 flex gap-2">
        <Button variant="primary">Rectangle</Button>
        <Button variant="primary">Circle</Button>
      </div> */}
    </>
  );
};

export default Canvas;
