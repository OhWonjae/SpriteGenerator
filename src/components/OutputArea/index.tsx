import './OutputArea.css';
import { useAtom } from 'jotai';
import React from 'react';
import { CanvasAtom, DrawImagesAtom } from '@/atoms/atoms';
export const OutputArea = () => {
  const [drawImages] = useAtom(DrawImagesAtom);
  const [canvasAtom] = useAtom(CanvasAtom);
  console.log('drawdImage', drawImages);
  return (
    <div className={'output-area'}>
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
