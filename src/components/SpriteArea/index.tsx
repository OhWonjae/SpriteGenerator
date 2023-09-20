import './SpriteArea.css';
import { Empty } from './Empty';
import { useAtom } from 'jotai';
import { FilesAtom, DrawImagesAtom, CanvasAtom } from '@/atoms/atoms';
import { useEffect, useRef, useState } from 'react';
import { LoadImage, LocateSprite } from '@/helpers/common';
export const SpriteArea = () => {
  const cRef = useRef<HTMLCanvasElement | null>(null);
  const [files, setFiles] = useAtom(FilesAtom);
  const [drawImages, setDrawImages] = useAtom(DrawImagesAtom);
  const [canvasAtom, setCanvasAtom] = useAtom(CanvasAtom);
  const handleRenderCanvas = async (canvasRef: HTMLCanvasElement) => {
    const ctx = canvasRef.getContext('2d');
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < files.length; i++) {
      const BlobUrl = URL.createObjectURL(files[i]);
      const img = await LoadImage(BlobUrl, files[i].name);
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
    ctx.fillStyle = '#525050';
    ctx.fillRect(0, 0, 1076, 600);
    const drawImages = LocateSprite(1076, 600, ctx, images);
    setDrawImages(drawImages);
    setCanvasAtom(cRef.current);
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
