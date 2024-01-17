"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  renderRoot: () => renderRoot
});
module.exports = __toCommonJS(src_exports);

// src/render.tsx
var import_react = __toESM(require("react"));
function NoComp({ name }) {
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, `${name} component not found in renderRoot -> generateElement`);
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
      const Hydrated = import_react.default.createElement(
        Generic,
        { key, ...props },
        children
      );
      return Hydrated;
    } catch (error) {
      throw new Error("error in generateReactElement");
    }
  } else {
    return /* @__PURE__ */ import_react.default.createElement(NoComp, { key: "err-comp", name });
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
    name: "container",
    compKv,
    props: { id: rootKey },
    key: rootKey,
    children: mappedChildren
  });
  return Hydrated;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  renderRoot
});
