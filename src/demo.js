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

console.log(vdom,'vdom');
