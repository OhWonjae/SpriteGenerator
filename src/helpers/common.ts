import { Rect } from '@/types/common';
export function LoadImage(src: string): Promise<HTMLImageElement> {
  // image onLoad 동기화 기능
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.src = src;
  });
}

class Node {
  // Rect 담을 노드 객체
  item: Rect;
  next: Node | null = null;
  constructor(item: Rect) {
    this.item = item;
  }
}

class LinkedRectList {
  // 분할된 공간을 담을 링크드리스트
  private head: Node | null = null;
  constructor(item?: Rect | null) {
    if (item) {
      const newNode = new Node(item);
      this.head = newNode;
    }
  }
  getFirst() {
    if (this.head?.item) {
      return this.head.item;
    } else {
      console.log('데이터를 넣어주세요.');
      return null;
    }
  }
  getContainer(target: Rect): Rect | null {
    let isSelect = false;
    // target 을 넣을 컨테이너 고르기
    if (this.head) {
      let idx = 0;
      let current = this.head;
      let result = current.item;
      while (current.next) {
        const container = current.next.item;
        if (target.w < container.w && target.h < container.h) {
          console.log('select container', target, container);
          isSelect = true;
          result = container;
          break;
        }
        current = current.next;
        idx += 1;
      }
      if (isSelect) {
        return result;
      } else {
        return null;
      }
    } else {
      console.log('데이터를 넣어주세요.');
    }
  }
  remove(rect: Rect) {
    let current = this.head;
    let pre;
    if (JSON.stringify(current?.item) === JSON.stringify(rect)) {
      if (current && current.next) {
        this.head = current.next;
      } else {
        this.head = null;
      }

      return;
    }
    while (current && current.next) {
      pre = current;
      current = current.next;
      if (JSON.stringify(current?.item) === JSON.stringify(rect)) {
        pre.next = current.next;
        break;
      }
    }
  }

  traverse() {
    let current = this.head;
    console.log('순환 시작');
    while (current) {
      console.log(current.item, ',');
      current = current.next;
    }
    console.log('순환 끝');
  }

  append(item: Rect) {
    let current = this.head;
    const newNode = new Node(item);
    if (!current) {
      this.head = newNode;
      return;
    }
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }
  foreach(callback: (cur: Node, idx: number) => void) {
    let idx = 0;
    let current = this.head;
    if (!current) {
      return;
    }
    callback(current, idx);
    while (current.next) {
      idx += 1;
      current = current.next;
      callback(current, idx);
    }
  }
}

function ImgToRect(img: HTMLImageElement): Rect {
  // 이미지를 Rect 로 변환
  const rect: Rect = {
    x: 0,
    y: 0,
    w: img.width,
    h: img.height,
  };
  return rect;
}

function DivideSpace(
  linkedListRef: LinkedRectList,
  target: Rect,
  container: Rect,
) {
  // 파라미터로 받은 target 을 container 의 기준으로 영역 나눠서 링크드 리스트에 추기하기.
  // 오른쪽 부터 시계방향으로 linkedList 에 추가
  console.log(
    'DivideSpace---------------------------------------------------------',
  );
  console.log('target', target);
  console.log('container', container);

  const right: Rect = {
    x: target.x + target.w,
    y: container.y,
    w: container.x + container.w - (target.x + target.w),
    h: container.h,
  };
  const bottom: Rect = {
    x: container.x,
    y: target.y + target.h,
    w: container.w,
    h: container.y + container.h - (target.y + target.h),
  };
  const left: Rect = {
    x: container.x,
    y: container.y,
    w: target.x - container.x,
    h: container.h,
  };
  const top: Rect = {
    x: container.x,
    y: container.y,
    w: container.w,
    h: target.y - container.y,
  };
  if (right.w > 0 && right.h > 0) {
    linkedListRef.append(right);
  }
  if (bottom.w > 0 && bottom.h > 0) {
    linkedListRef.append(bottom);
  }
  if (left.w > 0 && left.h > 0) {
    linkedListRef.append(left);
  }
  if (top.w > 0 && top.h > 0) {
    linkedListRef.append(top);
  }
  linkedListRef.traverse();
  console.log('---------------------------------------------------------');
}

function isIntersection(target1: Rect, target2: Rect) {
  console.log(
    'Intersection---------------------------------------------------------',
  );
  console.log('target1', target1);
  console.log('target2', target2);
  // 두 영역이 곂치는지 확인 후 곂치지 않으면 null, 곂치면 곂치는 영역 리턴
  if (target1.x >= target2.x + target2.w) {
    return null;
  }
  if (target2.x >= target1.x + target1.w) {
    return null;
  }
  if (target1.y >= target2.y + target2.h) {
    return null;
  }
  if (target2.y >= target1.y + target1.h) {
    return null;
  }
  const rect: Rect = {
    x: Math.max(target1.x, target2.x),
    y: Math.max(target1.y, target2.y),
    w: Math.min(target1.x + target1.w, target2.x + target2.w),
    h: Math.min(target1.y + target1.h, target2.y + target2.h),
  };
  console.log('Intersection Rect', rect);
  console.log('---------------------------------------------------------');
  return rect;
}

function getRndColor() {
  const r = (255 * Math.random()) | 0,
    g = (255 * Math.random()) | 0,
    b = (255 * Math.random()) | 0;
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

export function LocateSprite(
  _ctx: CanvasRenderingContext2D,
  images: HTMLImageElement[],
) {
  let ctx = _ctx;
  let canvasWidth = ctx.canvas.scrollWidth;
  let canvasHeight = ctx.canvas.scrollHeight;
  ctx.canvas.width = canvasWidth;
  ctx.canvas.height = canvasHeight;
  const initRect = { x: 0, y: 0, w: canvasWidth, h: canvasHeight };
  const linkedList = new LinkedRectList(initRect);
  for (let i = 0; i < images.length; i++) {
    const target = ImgToRect(images[i]);
    console.log('target!!', target, canvasHeight, canvasWidth);
    let container = linkedList.getContainer(target);
    const prevCtxImageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    if (!container) {
      container = linkedList.getFirst();
      canvasWidth = ctx.canvas.scrollWidth;
      canvasHeight = ctx.canvas.scrollHeight;
      if (
        container &&
        container.x + target.w > canvasWidth &&
        container.y + target.h > canvasHeight
      ) {
        console.log('111');
        ctx.canvas.style.width = container.x + target.w + 'px';
        ctx.canvas.width = container.x + target.w;
        ctx.canvas.style.height = container.y + target.h + 'px';
        ctx.canvas.height = container.y + target.h;
        container.w = container.x + target.w;
        container.h = container.y + target.h;
      } else if (
        container &&
        container.x + target.w > canvasWidth &&
        container.y + target.h <= container.h
      ) {
        console.log('222');
        ctx.canvas.style.width = container.x + target.w + 'px';
        ctx.canvas.width = container.x + target.w;
        container.w = container.x + target.w;
      } else if (
        container &&
        container.x + target.w <= container.w &&
        container.y + target.h > canvasHeight
      ) {
        console.log('333');
        ctx.canvas.style.height = container.y + target.h + 'px';
        ctx.canvas.height = container.y + target.h;
        container.h = container.y + target.h;
      } else {
        console.log('4444');
        // 추가적인 컨테이너 공간이 없을때
        ctx.canvas.style.width = canvasWidth + target.w + 'px';
        ctx.canvas.width = canvasWidth + target.w;
        const newRect = {
          x: canvasWidth + 1,
          y: 0,
          w: canvasWidth + target.w,
          h: canvasHeight,
        };
        if (canvasHeight < target.h) {
          ctx.canvas.style.height = canvasHeight + target.h + 'px';
          ctx.canvas.height = canvasHeight + target.h;
          newRect.h = canvasHeight + target.h;
        }

        linkedList.append(newRect);
        container = newRect;
      }

      const newCanvasCtx = ctx.canvas.getContext('2d');
      newCanvasCtx.putImageData(prevCtxImageData, 0, 0);

      ctx = newCanvasCtx;

      console.log(
        'exceed!!!',
        container,
        target,
        container.x + container.w,
        container.y + container.h,
        ctx.canvas.width,
        ctx.canvas.height,
      );
    }
    target.x = container.x;
    target.y = container.y;
    // linkedList 맨앞의 container 에 이미지에 따른 영역 나누고 캔버스에 그리기
    DivideSpace(linkedList, target, container);
    console.log('drawImages', container.x, container.y, target.w, target.h);
    ctx.drawImage(images[i], container.x, container.y, target.w, target.h);
    // 위치시킨 container 제거
    linkedList.traverse();
    console.log('remove!!!', container);
    linkedList.remove(container);
    linkedList.traverse();
    // 그려진 이미지와 곂치는 컨테이너 있는지 확인
    linkedList.foreach((cur, idx) => {
      const _container = cur.item;
      console.log('container!!!', _container);
      const intersection = isIntersection(_container, target);
      if (intersection) {
        // 곂치는 container 에 대해서 다시 영역 나누기
        DivideSpace(linkedList, intersection, _container);
        // ctx.drawImage(
        //   images[i],
        //   intersection.x,
        //   intersection.y,
        //   intersection.w,
        //   intersection.h,
        // );
        // 삭제할 LinkedList 컨테이너 Idx 담기
        linkedList.remove(_container);
      }
    });
  }
  //container 영역 테스트 코드
  linkedList.foreach((cur, idx) => {
    console.log('iii', idx, cur);
    const _container = cur.item;
    ctx.fillStyle = getRndColor();
    ctx.fillRect(_container.x, _container.y, _container.w, _container.h);
  });

  // linkedList 맨앞의 container에 img 위치시키고 해당 컨테이너 영역 나누기,캔버스 그리고, 컨테이너 제거

  // 위치된 img와 곂치는 컨테이너에 대해서 다시 영역 나누기

  // 나눠진 영역들 통합

  // // 로드된 이미지들을 canvas에 위치 시킴
  // for (let i = 0; i < images.length; i++) {
  //   ctx.drawImage(
  //     images[i],
  //     100 * i,
  //     0,
  //     images[i].naturalWidth,
  //     images[i].naturalHeight,
  //   );
  // }
}
