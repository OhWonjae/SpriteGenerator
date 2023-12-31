import './OutputArea.css';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { Empty } from '@/components/Empty';
import { CanvasAtom, DrawImagesAtom } from '@/atoms/atoms';
export const OutputArea = () => {
  const [drawImages] = useAtom(DrawImagesAtom);
  const [canvasAtom] = useAtom(CanvasAtom);
  if (drawImages.length === 0) {
    return <></>;
  }
  return (
    <div
      className={`output-area`}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'none';
      }}
    >
      <div className={'output-title'}>
        Output StyleSheet
        {drawImages.length > 0 && (
          <div className={'output-button'}>
            <a
              download={'sprite.png'}
              href={canvasAtom && canvasAtom.toDataURL('image/png')}
            >
              Download Image
            </a>
          </div>
        )}
      </div>
      <pre className={'output-style'}>
        {drawImages.length > 0 && (
          <>
            {
              '.sprite {\n\tbackground-image: url(sprite.png);\n\tbackground-repeat: no-repeat;\n\tdisplay: block;\n}\n'
            }
            {drawImages.map((d) => (
              <React.Fragment
                key={d.id}
              >{`.sprite-${d.name} {\n\twidth: ${d.w}px;\n\theight: ${d.h}px;\n\tbackground-position: -${d.x}px -${d.y}px;\n}\n`}</React.Fragment>
            ))}
          </>
        )}
      </pre>
    </div>
  );
};
