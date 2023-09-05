import { createRoot } from 'react-dom/client';
import '@/css/base.css';
import App from './App';
import { RecoilRoot, atom, selector } from 'recoil';

const container = document.getElementById('root');
if (container === null) {
  throw new Error('root element not found');
}
const root = createRoot(container);
root.render(<App />);
