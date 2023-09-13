import { atom } from 'jotai';
import { Attachment } from '@/types/common';
export const FilesAtom = atom<Attachment[]>([]);
