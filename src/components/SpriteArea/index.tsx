import './SpriteArea.css';
import { Empty } from './Empty';
import { useAtom } from 'jotai';
import { FilesAtom } from '@/atoms/FileUploader/atoms';
import { useEffect, useRef, useState } from 'react';
import { LoadImage, LocateSprite } from '@/helpers/common';
export const SpriteArea = () => {
  const cRef = useRef<HTMLCanvasElement | null>(null);
  const [files, setFiles] = useAtom(FilesAtom);
  const handleRenderCanvas = async (canvasRef: HTMLCanvasElement) => {
    const ctx = canvasRef.getContext('2d');
    const images = [];
    for (let i = 0; i < files.length; i++) {
      const BlobUrl = URL.createObjectURL(files[i]);
      const img = await LoadImage(BlobUrl);
      images.push(img);
    }
    ctx.canvas.width = 1076;
    ctx.canvas.height = 600;
    LocateSprite(1076, 600, ctx, images);
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
