import { useEffect, useRef, useState } from 'react';
import './main-loading.css';
interface MainLoadingProps {
  loadingState: (loading: boolean) => void;
}
export const MainLoading = ({ loadingState }: MainLoadingProps) => {
  const logoLetterRef = useRef<HTMLImageElement | null>(null);
  const handleOnAnimationEndEvent = (e: Event) => {
    loadingState(false);
  };
  useEffect(() => {
    if (logoLetterRef.current) {
      logoLetterRef.current?.addEventListener(
        'animationend',
        handleOnAnimationEndEvent,
      );
      return () => {
        logoLetterRef.current?.removeEventListener(
          'animationend',
          handleOnAnimationEndEvent,
        );
      };
    }
  }, [logoLetterRef.current]);
  const handleOnClickEvent = () => {
    loadingState(false);
  };
  useEffect(() => {
    window.addEventListener('click', handleOnClickEvent);
    return () => window.removeEventListener('click', handleOnClickEvent);
  }, []);

  return (
    <div className={'main-loading'}>
      <div className={'logo-container'}>
        <img
          className={'logo-piece0'}
          src={'public/assets/logo-anim/logo-piece0.png'}
        />
        <img
          className={'logo-piece1'}
          src={'public/assets/logo-anim/logo-piece1.png'}
        />
        <img
          className={'logo-piece2'}
          src={'public/assets/logo-anim/logo-piece2.png'}
        />
        <img
          className={'logo-piece3'}
          src={'public/assets/logo-anim/logo-piece3.png'}
        />
        <img
          className={'logo-piece4'}
          src={'public/assets/logo-anim/logo-piece4.png'}
        />
        <img
          className={'logo-piece5'}
          src={'public/assets/logo-anim/logo-piece5.png'}
        />
        <img
          className={'logo-piece6'}
          src={'public/assets/logo-anim/logo-piece6.png'}
        />
        <img
          className={'logo-piece7'}
          src={'public/assets/logo-anim/logo-piece7.png'}
        />
        <img
          className={'logo-piece8'}
          src={'public/assets/logo-anim/logo-piece8.png'}
        />
        <img
          className={'logo-piece9'}
          src={'public/assets/logo-anim/logo-piece9.png'}
        />
        <img
          className={'logo-piece10'}
          src={'public/assets/logo-anim/logo-piece10.png'}
        />
        <img
          ref={logoLetterRef}
          className={'logo-letter'}
          src={'public/assets/logo-anim/logo-letter.png'}
        />
      </div>
    </div>
  );
};
