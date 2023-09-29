import { atom } from 'jotai';
import { Attachment, RectForCss } from '@/types/common';
export const FilesAtom = atom<Attachment[]>([]);
export const DrawImagesAtom = atom<RectForCss[]>([]);
export const CanvasAtom = atom<HTMLCanvasElement>(null);
