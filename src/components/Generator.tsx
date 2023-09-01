import { useEffect, useRef, useState } from 'react';

export const Generator = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      canvas.width = 1000;
      canvas.height = 1000;
      const context = canvas.getContext('2d');
      setContext(context);
      const img = new Image();
      img.src = 'public/assets/img-card-holiday.jpg';
      img.onload = () => {
        context.drawImage(img, 100, 100);
      };
    }
  }, [canvasRef]);

  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  );
};
