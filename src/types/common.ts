export interface Attachment extends File {
  id: string;
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface RectForCss extends Rect {
  name: string;
}
