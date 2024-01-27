import App from './App';
import { MainLoading } from './main-loading';
import { useEffect, useState } from 'react';
export const BootStrap = () => {
  const [isEntryCached, setIsEntryCached] = useState(false);
  console.log('adsf', isEntryCached);
  return (
    <>
      {isEntryCached ? (
        <App />
      ) : (
        <MainLoading
          loadingState={(loading: boolean) => {
            setIsEntryCached(!loading);
          }}
        />
      )}
    </>
  );
};
