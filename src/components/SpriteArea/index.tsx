import './SpriteArea.css';
import { Empty } from './Empty';
import { useAtom } from 'jotai';
import { FilesAtom } from '@/atoms/FileUploader/atoms';
import { useEffect, useRef, useState } from 'react';
import { LoadImage, LocateSprite } from '@/helpers/common';
import Checkboard from 'public/assets/checkboard_bg.png';
export const SpriteArea = () => {
  const cRef = useRef<HTMLCanvasElement | null>(null);
  const [files, setFiles] = useAtom(FilesAtom);
  const handleRenderCanvas = async (canvasRef: HTMLCanvasElement) => {
    console.log('renderCanvas!!!');
    const ctx = canvasRef.getContext('2d');
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < files.length; i++) {
      const BlobUrl = URL.createObjectURL(files[i]);
      const img = await LoadImage(BlobUrl);
      images.push(img);
    }
    images.sort((a, b) => {
      return (
        b.naturalWidth + b.naturalHeight - (a.naturalWidth + a.naturalHeight)
      );
    });
    ctx.canvas.width = 1076;
    ctx.canvas.height = 600;
    ctx.canvas.style.width = 1076 + 'px';
    ctx.canvas.style.height = 600 + 'px';

    const bg = new Image();
    bg.src = Checkboard;
    bg.onload = () => {
      ctx.drawImage(bg, 0, 0, 1076, 600);
      LocateSprite(1076, 600, ctx, images, bg);
    };

    // draw the image onto the canvas
  };

  useEffect(() => {
    if (cRef.current) {
      const canvasRef = cRef.current;
      if (canvasRef) {
        handleRenderCanvas(canvasRef);
      }
    }
  }, [files]);
  return (
    <div className={'sprite-area'}>
      {files.length > 0 ? (
        <>
          <canvas className={'sprite-canvas-area'} ref={cRef}></canvas>
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
};
