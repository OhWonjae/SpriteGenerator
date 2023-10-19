import './Container.css';
import { ReactNode } from 'react';
interface IContainerProps {
  title?: string;
  children?: ReactNode;
}
export const Container = ({ title, children }: IContainerProps) => {
  return (
    <div className={'container'}>
      <div className={'container-title'}>
        <div></div>
        <div>{title || 'Sprite Generator'}</div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={'https://github.com/OhWonjae/SpriteGenerator'}
        >
          <img src={'public/assets/github.png'} width={36} height={36} />
        </a>
      </div>
      {children}
    </div>
  );
};
