const reactDom = {
  createElement(type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.map((child) => {
          if (typeof child === "object") {
            return child;
          } else {
            return reactDom.createTextElement(child);
          }
        }),
      },
    };
  },
  createTextElement(text) {
    return {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue: text,
        children: [],
      },
    };
  },
};

const vdom = reactDom.createElement(
  "div",
  { id: 1 },
  reactDom.createElement("span", null, "刘雨鑫")
);

console.log(vdom, "vdom");

//#region
// 浏览器一帧做些什么
// 1:处理事件的回调click...事件
// 2:处理计时器的回调
// 3:开始帧
// 4:执行requestAnimationFrame 动画的回调
// 5:计算机页面布局计算 合并到主线程
// 6:绘制
// 7:如果此时还有空闲时间，执行requestIdleCallback
//#endregion

let nextUnitOfWork = null;
let wipRoot = null; // 当前正在执行的fiber树
let currentRoot = null; // 旧的fiber树
let deletions = null; // 需要删除的fiber节点

// container 是根节点
function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: currentRoot, //旧的fiber树
  };
  deletions = [];
  nextUnitOfWork = wipRoot;
}

function createDom(fiber) {
  const dom =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);
  upDateDom(dom, {}, fiber.props);
  return dom;
}

function upDateDom(dom, oldProps, newProps) {
  Object.keys(oldProps)
    .filter((key) => key !== "children")
    .forEach((item) => {
      dom[item] = null;
    });
  Object.keys(newProps)
    .filter((key) => key !== "children")
    .forEach((item) => {
      dom[item] = newProps[item];
    });
}

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  if(!nextUnitOfWork && wipRoot){
    commitRoot()
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  const element = fiber.props.children;
  // 遍历子节点
  reconcileChildren(fiber,element);

  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    return nextFiber.parent;
  }
  return null;
}

function createFiber(element,parent){
  return {
    type: element.type,
    props: element.props,
    parent,
    dom: null,
    child: null,
    sibling: null,
    alternate: null,
    effectTag: null,
  };
}

function reconcileChildren(fiber, elements) {
  // diff算法
  // 形成fiber树
  let index = 0;
  let prevSibling = null;
  let oldFiber = fiber.alternate && fiber.alternate.child;
  while (index < elements.length || oldFiber !== null) {
    const element = elements[index];
    // 1复用
    let newFiber = null;
    const sameType = oldFiber && element && oldFiber.type === element.type;
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        parent: fiber,
        dom: oldFiber.dom,
        alternate: oldFiber,
        effectTag: "UPDATE",
      };
    }
    // 2新增
    if (element && !sameType) {
      newFiber = createFiber(element,fiber);
      newFiber.effectTag = "PLACEMENT";
    }
    // 3删除
    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION";
      deletions.push(oldFiber);
    }

    if(oldFiber) oldFiber = oldFiber.sibling;

    if (index === 0) {
      fiber.child = newFiber;
    } else if (element) {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
  }
}

function commitRoot(){
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
};

function commitWork(fiber){
  if(!fiber) return;
  const domParent = fiber.parent.dom;
  if(fiber.effectTag === 'PLACEMENT'){
    domParent.appendChild(fiber.dom);
  } else if(fiber.effectTag === 'DELETION'){
    domParent.removeChild(fiber.dom);
  } else if(fiber.effectTag === 'UPDATE'){
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  }
  commitWork(fiber.child);
  commitWork(fiber.sibling);
};

render(vdom,document.getElementById('root'));
