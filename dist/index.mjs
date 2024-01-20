// src/render.tsx
import React from "react";
function NoComp({ name }) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, `${name} component not found in renderRoot -> generateElement`);
}
function getComponent({ name, compKv }) {
  return compKv[name];
}
function generateReactElement({
  name,
  compKv,
  key,
  props,
  children
}) {
  if (getComponent({ name, compKv })) {
    try {
      const Generic = getComponent({ name, compKv });
      const Hydrated = React.createElement(
        Generic,
        { key, ...props },
        children
      );
      return Hydrated;
    } catch (error) {
      throw new Error("error in generateReactElement");
    }
  } else {
    return /* @__PURE__ */ React.createElement(NoComp, { key: "err-comp", name });
  }
}
function mapChildren({
  key,
  compKv,
  compData
}) {
  let mappedChildren;
  const { properties: { descendents = null } } = compData;
  if (descendents) {
    mappedChildren = descendents.map((data, i) => {
      const newKey = key + i;
      return mapChildren({
        key: newKey,
        compKv,
        compData: descendents[i]
      });
    });
  }
  const Hydrated = generateReactElement({
    name: compData.name,
    compKv,
    props: compData.properties,
    key: String(key),
    children: mappedChildren
  });
  return Hydrated;
}
function renderRoot({
  rootKey = "root-1",
  compKv,
  data
}) {
  const mappedChildren = data.map((comp, i) => {
    return mapChildren({
      key: i + 450,
      compKv,
      compData: comp
    });
  });
  const Hydrated = generateReactElement({
    name: "view",
    compKv,
    props: { id: rootKey },
    key: rootKey,
    children: mappedChildren
  });
  return Hydrated;
}
export {
  renderRoot
};
