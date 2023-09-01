import './ContainerInner.css';
import { ReactNode } from 'react';
interface IContainerProps {
  children?: ReactNode;
}
export const ContainerInner = ({ children }: IContainerProps) => {
  return <div className={'container-inner'}>{children}</div>;
};
