import './Container.css';
import { ReactNode } from 'react';
interface IContainerProps {
  title?: string;
  children?: ReactNode;
}
export const Container = ({ title, children }: IContainerProps) => {
  return (
    <div className={'container'}>
      <div className={'container-title'}>{title || 'Sprite Generator'}</div>
      {children}
    </div>
  );
};
