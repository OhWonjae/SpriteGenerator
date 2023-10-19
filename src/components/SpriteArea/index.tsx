import './SpriteArea.css';
import { Empty } from '@/components/Empty';
import { useAtom } from 'jotai';
import { FilesAtom, DrawImagesAtom, CanvasAtom } from '@/atoms/atoms';
import { useEffect, useRef } from 'react';
import { LoadImage, LocateSprite } from '@/helpers/common';
export const SpriteArea = () => {
  const cRef = useRef<HTMLCanvasElement | null>(null);
  const [files] = useAtom(FilesAtom);
  const [, setDrawImages] = useAtom(DrawImagesAtom);
  const [, setCanvasAtom] = useAtom(CanvasAtom);
  const handleRenderCanvas = async (canvasRef: HTMLCanvasElement) => {
    const ctx = canvasRef.getContext('2d');

    const images: HTMLImageElement[] = [];
    for (let i = 0; i < files.length; i++) {
      const BlobUrl = URL.createObjectURL(files[i]);
      const img = await LoadImage(BlobUrl, files[i].name, files[i].id);
      images.push(img);
    }
    images.sort((a, b) => {
      return (
        b.naturalWidth + b.naturalHeight - (a.naturalWidth + a.naturalHeight)
      );
    });
    ctx.canvas.width = 740;
    ctx.canvas.height = 600;
    ctx.canvas.style.width = 740 + 'px';
    ctx.canvas.style.height = 600 + 'px';
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, 740, 600);
    const drawImages = LocateSprite(740, 600, ctx, images);
    setDrawImages(drawImages);
    setCanvasAtom(cRef.current);
  };

  useEffect(() => {
    if (cRef.current) {
      const canvasRef = cRef.current;
      if (canvasRef) {
        handleRenderCanvas(canvasRef).catch((err) => {});
      }
    }
  }, [files]);
  return (
    <div className={'sprite-area'}>
      {files.length > 0 && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'none';
          }}
        >
          <canvas className={'sprite-canvas-area'} ref={cRef}></canvas>
        </div>
      )}
    </div>
  );
};
