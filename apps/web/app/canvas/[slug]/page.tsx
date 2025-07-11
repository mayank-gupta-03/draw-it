"use client";
import React, { useEffect, useRef } from "react";
import { initDraw } from "../../../draw";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      initDraw(canvas);
    }
  }, []);
  return <canvas ref={canvasRef} width={1080} height={1920}></canvas>;
};

export default Canvas;
