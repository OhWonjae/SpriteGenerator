import { Rect, RectForCss } from '@/types/common';
export function LoadImage(
  src: string,
  name: string,
  id: string,
): Promise<HTMLImageElement> {
  // image onLoad 동기화 기능
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.src = src;
    img.id = id;
    img.title = name;
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

  getContainer(
    target: Rect,
    condition: (target: Rect, container: Rect) => boolean,
  ): Rect | null {
    let isSelect = false;
    // target 을 넣을 컨테이너 고르기
    if (this.head) {
      let idx = 0;
      let current = this.head;
      let result = current.item;
      if (condition(target, current.item)) {
        console.log('select container', target, current.item);
        isSelect = true;
        return result;
      }

      while (current.next) {
        const container = current.next.item;
        if (condition(target, container)) {
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
    // 추가될때 컨테이너의 x,y가 0과 가까운 순으로 정렬해서 추가해주기 sqrt(x^2 + y^2)
    const itemDistance = Math.sqrt(Math.pow(item.x, 2) + Math.pow(item.y, 2));
    console.log('timeDistance', itemDistance);
    let current = this.head;
    let pre = null;
    const newNode = new Node(item);
    if (!current) {
      this.head = newNode;
      return;
    }
    const headDistance = Math.sqrt(
      Math.pow(current.item.x, 2) + Math.pow(current.item.y, 2),
    );
    if (headDistance > itemDistance) {
      const prev = current;
      this.head = new Node(item);
      this.head.next = prev;
      return;
    }

    while (current.next) {
      pre = current;
      current = current.next;
      if (current) {
        const currentDistance = Math.sqrt(
          Math.pow(current.item.x, 2) + Math.pow(current.item.y, 2),
        );
        if (itemDistance < currentDistance) {
          pre.next = newNode;
          newNode.next = current;
          return;
        }
      }
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
function getContainerCondition(target: Rect, container: Rect) {
  // 컨테이너를 찾을 조건 함수
  if (target.w < container.w && target.h < container.h) {
    return true;
  } else {
    return false;
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
function isIncludeContainer(
  linkedListRef: LinkedRectList,
  targetContainer: Rect,
) {
  let isInclude = false;
  // 기존 컨테이너가 targetContainer 을 포함하는 경우는 해당 targetContainer 삭제시키기
  linkedListRef.foreach((containerNode) => {
    const container = containerNode.item;
    if (
      JSON.stringify(isIntersection(container, targetContainer)) ===
      JSON.stringify(targetContainer)
    ) {
      isInclude = true;
      return isInclude;
    }
  });
  return isInclude;
}

function DivideSpace(
  linkedListRef: LinkedRectList,
  target: Rect,
  container: Rect,
) {
  // 파라미터로 받은 target 을 container 의 기준으로 영역 나눠서 링크드 리스트에 추기하기.
  // 오른쪽 부터 시계방향으로 linkedList 에 추가
  console.log(
    'DivideSpace() 추가되는 영역---------------------------------------------------------',
  );
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
  initCanvasWidth: number,
  initCanvasHeight: number,
  _ctx: CanvasRenderingContext2D,
  images: HTMLImageElement[],
): RectForCss[] {
  const drawImages: RectForCss[] = [];
  let ctx = _ctx;
  let canvasWidth = initCanvasWidth;
  let canvasHeight = initCanvasHeight;
  const initRect = { x: 0, y: 0, w: canvasWidth, h: canvasHeight };
  const linkedList = new LinkedRectList();
  linkedList.append(initRect);
  for (let i = 0; i < images.length; i++) {
    const target = ImgToRect(images[i]);
    console.log('target : ', target);
    let container = linkedList.getContainer(target, getContainerCondition);
    console.log('getContainer : ', container);
    const prevCtxImageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    if (!container) {
      container = linkedList.getFirst();
      console.log('getFirst() : ', container);
      console.log('canvasWidth, canvasHeight : ', canvasWidth, canvasHeight);
      if (container) {
        console.log(
          '맞는 영역은 없는데 다른 나눠진 영역중 캔버스의 width와 height를 조절하면 되는경우 ---------------------------------------------------',
        );
      }
      console.log('ccc', container, canvasWidth, canvasHeight, target);
      if (
        container &&
        container.x + container.w === canvasWidth &&
        container.y + container.h === canvasHeight &&
        container.x + target.w > canvasWidth &&
        container.y + target.h > canvasHeight
      ) {
        ctx.canvas.style.width = container.x + target.w + 'px';
        ctx.canvas.width = container.x + target.w;
        ctx.canvas.style.height = container.y + target.h + 'px';
        ctx.canvas.height = container.y + target.h;
        container.w = target.w;
        container.h = target.h;
        // 여기서 새로 추가된 부분 영역 잡아주기
        if (container.x > 0) {
          const tmpRect1 = {
            x: 0,
            y: canvasHeight,
            w: container.x,
            h: container.y + target.h - canvasHeight,
          };
          linkedList.append(tmpRect1);
        }
        if (container.y > 0) {
          const tmpRect2 = {
            x: canvasWidth,
            y: 0,
            w: container.x + target.w - canvasWidth,
            h: container.y,
          };
          linkedList.append(tmpRect2);
        }

        canvasWidth = container.x + target.w;
        canvasHeight = container.y + target.h;

        console.log(
          '추가하는 이미지가 canvas의 너비, 높이 보다 클때 캔버스 너비, 높이 ',
          container.w,
          container.h,
        );
        target.x = container.x;
        target.y = container.y;
      } else if (
        container &&
        container.x + container.w === canvasWidth &&
        container.x + target.w > canvasWidth
      ) {
        ctx.canvas.style.width = container.x + target.w + 'px';
        ctx.canvas.width = container.x + target.w;
        container.w = target.w;
        if (container.y > 0) {
          const tmpRect1 = {
            x: canvasWidth,
            y: 0,
            w: container.x + target.w - canvasWidth,
            h: container.y,
          };
          linkedList.append(tmpRect1);
        }
        if (container.y + target.h < canvasHeight) {
          const tmpRect2 = {
            x: canvasWidth,
            y: target.y + target.h,
            w: container.x + target.w - canvasWidth,
            h: canvasHeight - (container.y + container.w),
          };
          linkedList.append(tmpRect2);
        }

        canvasWidth = container.x + target.w;
        console.log(
          '추가하는 이미지가 canvas의 너비만 클때 캔버스 너비 ',
          container,
        );
        target.x = container.x;
        target.y = container.y;
      } else if (
        container &&
        container.y + container.h === canvasHeight &&
        container.y + target.h > canvasHeight
      ) {
        ctx.canvas.style.height = container.y + target.h + 'px';
        ctx.canvas.height = container.y + target.h;
        container.h = target.h;
        if (container.x > 0) {
          const tmpRect1 = {
            x: 0,
            y: canvasHeight,
            w: container.x,
            h: container.y + target.h - canvasHeight,
          };
          linkedList.append(tmpRect1);
        }
        if (container.x + target.w < canvasWidth) {
          const tmpRect2 = {
            x: target.x + target.w,
            y: canvasHeight,
            w: canvasWidth - (container.x + target.w),
            h: container.y + target.h - canvasHeight,
          };
          linkedList.append(tmpRect2);
        }

        canvasHeight = container.y + target.h;
        console.log(
          '추가하는 이미지가 canvas의 높이만 클때 캔버스 너비 ',
          container,
        );
        target.x = container.x;
        target.y = container.y;
      } else {
        // 추가적인 컨테이너 공간이 없을때
        let newRect = {
          x: 0,
          y: 0,
          w: 0,
          h: 0,
        };
        // 추가되는 이미지의 height가 width보다 클때
        if (target.w < target.h) {
          console.log('추가되는 이미지의 height가 width보다 클때');
          ctx.canvas.style.width = canvasWidth + target.w + 'px';
          ctx.canvas.width = canvasWidth + target.w;
          newRect = {
            x: canvasWidth,
            y: 0,
            w: target.w,
            h: canvasHeight,
          };
          if (canvasHeight < target.h) {
            ctx.canvas.style.height = target.y + target.h + 'px';
            ctx.canvas.height = target.y + target.h;
            newRect.h = target.h;
            // 여기서 새로 추가된 부분 영역 잡아주기
            const tmpRect = {
              x: 0,
              y: canvasHeight,
              w: canvasWidth + target.w,
              h: target.h - canvasHeight,
            };
            linkedList.append(tmpRect);
            canvasHeight = target.y + target.h;
          }
          canvasWidth = canvasWidth + target.w;
        } else {
          console.log('추가되는 이미지의 width가 height보다 클때');
          ctx.canvas.style.height = canvasHeight + target.h + 'px';
          ctx.canvas.height = canvasHeight + target.h;
          newRect = {
            x: 0,
            y: canvasHeight,
            w: canvasWidth,
            h: target.h,
          };
          if (canvasWidth < target.w) {
            ctx.canvas.style.width = target.x + target.w + 'px';
            ctx.canvas.width = target.x + target.w;
            newRect.w = target.w;
            // 여기서 새로 추가된 부분 영역 잡아주기
            const tmpRect = {
              x: canvasWidth,
              y: 0,
              w: target.w - canvasWidth,
              h: canvasHeight + target.h,
            };
            linkedList.append(tmpRect);
            canvasWidth = target.x + target.w;
          }

          canvasHeight = canvasHeight + target.h;
        }

        linkedList.append(newRect);
        container = newRect;
        console.log(
          '남아있는 영역이 없거나 기존 영역을 넓힐수 없을때 추가되는 영역',
          newRect,
          target,
        );
        target.x = container.x;
        target.y = container.y;
      }
      const newCanvasCtx = ctx.canvas.getContext('2d');
      newCanvasCtx.fillStyle = '#525050';
      newCanvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);
      newCanvasCtx.putImageData(prevCtxImageData, 0, 0);
      ctx = newCanvasCtx;
    } else {
      target.x = container.x;
      target.y = container.y;
    }

    // 선택된 container 에 이미지에 따른 영역 나누고 캔버스에 그리기
    console.log('before DivideSpace', target, container);

    DivideSpace(linkedList, target, container);
    drawImages.push({
      id: images[i].id,
      name: images[i].title,
      x: container.x,
      y: container.y,
      w: target.w,
      h: target.h,
    });
    ctx.drawImage(images[i], container.x, container.y, target.w, target.h);
    // 위치시킨 container 제거
    linkedList.remove(container);
    console.log('위치시킨 컨테이너 삭제하기 : ', container);
    // 그려진 이미지와 곂치는 컨테이너 있는지 확인
    linkedList.foreach((cur, idx) => {
      const _container = cur.item;
      const intersection = isIntersection(_container, target);
      if (intersection) {
        // 곂치는 container 에 대해서 다시 영역 나누기
        DivideSpace(linkedList, intersection, _container);
        // 삭제할 LinkedList 컨테이너 Idx 담기
        linkedList.remove(_container);
        console.log('곂쳐진 영역,곂쳐진 컨테이너: ', intersection, _container);
      }
    });
  }

  console.log(
    '색칠할 영역-----------------------------------------------------------',
  );
  //container 영역 테스트 코드
  linkedList.foreach((cur, idx) => {
    const _container = cur.item;
    // ctx.fillStyle = getRndColor();
    //ctx.fillRect(_container.x, _container.y, _container.w, _container.h);
    console.log(
      'index : ',
      idx,
      'Rect : ',
      cur.item,
      'color : ',
      ctx.fillStyle,
    );
  });
  console.log('-----------------------------------------------------------');
  return drawImages;
}
