function _mergeNamespaces(n2, m2) {
  m2.forEach(function(e2) {
    e2 && typeof e2 !== "string" && !Array.isArray(e2) && Object.keys(e2).forEach(function(k2) {
      if (k2 !== "default" && !(k2 in n2)) {
        var d2 = Object.getOwnPropertyDescriptor(e2, k2);
        Object.defineProperty(n2, k2, d2.get ? d2 : {
          enumerable: true,
          get: function() {
            return e2[k2];
          }
        });
      }
    });
  });
  return Object.freeze(n2);
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getAugmentedNamespace(n2) {
  if (n2.__esModule)
    return n2;
  var a2 = Object.defineProperty({}, "__esModule", {
    value: true
  });
  Object.keys(n2).forEach(function(k2) {
    var d2 = Object.getOwnPropertyDescriptor(n2, k2);
    Object.defineProperty(a2, k2, d2.get ? d2 : {
      enumerable: true,
      get: function() {
        return n2[k2];
      }
    });
  });
  return a2;
}
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l$5 = Symbol.for("react.element"), n$7 = Symbol.for("react.portal"), p$7 = Symbol.for("react.fragment"), q$7 = Symbol.for("react.strict_mode"), r$5 = Symbol.for("react.profiler"), t$6 = Symbol.for("react.provider"), u$5 = Symbol.for("react.context"), v$5 = Symbol.for("react.forward_ref"), w$3 = Symbol.for("react.suspense"), x$2 = Symbol.for("react.memo"), y$2 = Symbol.for("react.lazy"), z$3 = Symbol.iterator;
function A$2(a2) {
  if (a2 === null || typeof a2 !== "object")
    return null;
  a2 = z$3 && a2[z$3] || a2["@@iterator"];
  return typeof a2 === "function" ? a2 : null;
}
var B$1 = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C = Object.assign, D$2 = {};
function E$2(a2, b2, e2) {
  this.props = a2;
  this.context = b2;
  this.refs = D$2;
  this.updater = e2 || B$1;
}
E$2.prototype.isReactComponent = {};
E$2.prototype.setState = function(a2, b2) {
  if (typeof a2 !== "object" && typeof a2 !== "function" && a2 != null)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a2, b2, "setState");
};
E$2.prototype.forceUpdate = function(a2) {
  this.updater.enqueueForceUpdate(this, a2, "forceUpdate");
};
function F$2() {
}
F$2.prototype = E$2.prototype;
function G$2(a2, b2, e2) {
  this.props = a2;
  this.context = b2;
  this.refs = D$2;
  this.updater = e2 || B$1;
}
var H$2 = G$2.prototype = new F$2();
H$2.constructor = G$2;
C(H$2, E$2.prototype);
H$2.isPureReactComponent = true;
var I$2 = Array.isArray, J$1 = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$1 = { key: true, ref: true, __self: true, __source: true };
function M$2(a2, b2, e2) {
  var d2, c2 = {}, k2 = null, h2 = null;
  if (b2 != null)
    for (d2 in b2.ref !== void 0 && (h2 = b2.ref), b2.key !== void 0 && (k2 = "" + b2.key), b2)
      J$1.call(b2, d2) && !L$1.hasOwnProperty(d2) && (c2[d2] = b2[d2]);
  var g2 = arguments.length - 2;
  if (g2 === 1)
    c2.children = e2;
  else if (1 < g2) {
    for (var f2 = Array(g2), m2 = 0; m2 < g2; m2++)
      f2[m2] = arguments[m2 + 2];
    c2.children = f2;
  }
  if (a2 && a2.defaultProps)
    for (d2 in g2 = a2.defaultProps, g2)
      c2[d2] === void 0 && (c2[d2] = g2[d2]);
  return { $$typeof: l$5, type: a2, key: k2, ref: h2, props: c2, _owner: K$1.current };
}
function N$2(a2, b2) {
  return { $$typeof: l$5, type: a2.type, key: b2, ref: a2.ref, props: a2.props, _owner: a2._owner };
}
function O$1(a2) {
  return typeof a2 === "object" && a2 !== null && a2.$$typeof === l$5;
}
function escape(a2) {
  var b2 = { "=": "=0", ":": "=2" };
  return "$" + a2.replace(/[=:]/g, function(a3) {
    return b2[a3];
  });
}
var P$2 = /\/+/g;
function Q$2(a2, b2) {
  return typeof a2 === "object" && a2 !== null && a2.key != null ? escape("" + a2.key) : b2.toString(36);
}
function R$2(a2, b2, e2, d2, c2) {
  var k2 = typeof a2;
  if (k2 === "undefined" || k2 === "boolean")
    a2 = null;
  var h2 = false;
  if (a2 === null)
    h2 = true;
  else
    switch (k2) {
      case "string":
      case "number":
        h2 = true;
        break;
      case "object":
        switch (a2.$$typeof) {
          case l$5:
          case n$7:
            h2 = true;
        }
    }
  if (h2)
    return h2 = a2, c2 = c2(h2), a2 = d2 === "" ? "." + Q$2(h2, 0) : d2, I$2(c2) ? (e2 = "", a2 != null && (e2 = a2.replace(P$2, "$&/") + "/"), R$2(c2, b2, e2, "", function(a3) {
      return a3;
    })) : c2 != null && (O$1(c2) && (c2 = N$2(c2, e2 + (!c2.key || h2 && h2.key === c2.key ? "" : ("" + c2.key).replace(P$2, "$&/") + "/") + a2)), b2.push(c2)), 1;
  h2 = 0;
  d2 = d2 === "" ? "." : d2 + ":";
  if (I$2(a2))
    for (var g2 = 0; g2 < a2.length; g2++) {
      k2 = a2[g2];
      var f2 = d2 + Q$2(k2, g2);
      h2 += R$2(k2, b2, e2, f2, c2);
    }
  else if (f2 = A$2(a2), typeof f2 === "function")
    for (a2 = f2.call(a2), g2 = 0; !(k2 = a2.next()).done; )
      k2 = k2.value, f2 = d2 + Q$2(k2, g2++), h2 += R$2(k2, b2, e2, f2, c2);
  else if (k2 === "object")
    throw b2 = String(a2), Error("Objects are not valid as a React child (found: " + (b2 === "[object Object]" ? "object with keys {" + Object.keys(a2).join(", ") + "}" : b2) + "). If you meant to render a collection of children, use an array instead.");
  return h2;
}
function S$2(a2, b2, e2) {
  if (a2 == null)
    return a2;
  var d2 = [], c2 = 0;
  R$2(a2, d2, "", "", function(a3) {
    return b2.call(e2, a3, c2++);
  });
  return d2;
}
function T(a2) {
  if (a2._status === -1) {
    var b2 = a2._result;
    b2 = b2();
    b2.then(function(b3) {
      if (a2._status === 0 || a2._status === -1)
        a2._status = 1, a2._result = b3;
    }, function(b3) {
      if (a2._status === 0 || a2._status === -1)
        a2._status = 2, a2._result = b3;
    });
    a2._status === -1 && (a2._status = 0, a2._result = b2);
  }
  if (a2._status === 1)
    return a2._result.default;
  throw a2._result;
}
var U$2 = { current: null }, V$1 = { transition: null }, W$2 = { ReactCurrentDispatcher: U$2, ReactCurrentBatchConfig: V$1, ReactCurrentOwner: K$1 };
react_production_min.Children = { map: S$2, forEach: function(a2, b2, e2) {
  S$2(a2, function() {
    b2.apply(this, arguments);
  }, e2);
}, count: function(a2) {
  var b2 = 0;
  S$2(a2, function() {
    b2++;
  });
  return b2;
}, toArray: function(a2) {
  return S$2(a2, function(a3) {
    return a3;
  }) || [];
}, only: function(a2) {
  if (!O$1(a2))
    throw Error("React.Children.only expected to receive a single React element child.");
  return a2;
} };
react_production_min.Component = E$2;
react_production_min.Fragment = p$7;
react_production_min.Profiler = r$5;
react_production_min.PureComponent = G$2;
react_production_min.StrictMode = q$7;
react_production_min.Suspense = w$3;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$2;
react_production_min.cloneElement = function(a2, b2, e2) {
  if (a2 === null || a2 === void 0)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a2 + ".");
  var d2 = C({}, a2.props), c2 = a2.key, k2 = a2.ref, h2 = a2._owner;
  if (b2 != null) {
    b2.ref !== void 0 && (k2 = b2.ref, h2 = K$1.current);
    b2.key !== void 0 && (c2 = "" + b2.key);
    if (a2.type && a2.type.defaultProps)
      var g2 = a2.type.defaultProps;
    for (f2 in b2)
      J$1.call(b2, f2) && !L$1.hasOwnProperty(f2) && (d2[f2] = b2[f2] === void 0 && g2 !== void 0 ? g2[f2] : b2[f2]);
  }
  var f2 = arguments.length - 2;
  if (f2 === 1)
    d2.children = e2;
  else if (1 < f2) {
    g2 = Array(f2);
    for (var m2 = 0; m2 < f2; m2++)
      g2[m2] = arguments[m2 + 2];
    d2.children = g2;
  }
  return { $$typeof: l$5, type: a2.type, key: c2, ref: k2, props: d2, _owner: h2 };
};
react_production_min.createContext = function(a2) {
  a2 = { $$typeof: u$5, _currentValue: a2, _currentValue2: a2, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a2.Provider = { $$typeof: t$6, _context: a2 };
  return a2.Consumer = a2;
};
react_production_min.createElement = M$2;
react_production_min.createFactory = function(a2) {
  var b2 = M$2.bind(null, a2);
  b2.type = a2;
  return b2;
};
react_production_min.createRef = function() {
  return { current: null };
};
react_production_min.forwardRef = function(a2) {
  return { $$typeof: v$5, render: a2 };
};
react_production_min.isValidElement = O$1;
react_production_min.lazy = function(a2) {
  return { $$typeof: y$2, _payload: { _status: -1, _result: a2 }, _init: T };
};
react_production_min.memo = function(a2, b2) {
  return { $$typeof: x$2, type: a2, compare: b2 === void 0 ? null : b2 };
};
react_production_min.startTransition = function(a2) {
  var b2 = V$1.transition;
  V$1.transition = {};
  try {
    a2();
  } finally {
    V$1.transition = b2;
  }
};
react_production_min.unstable_act = function() {
  throw Error("act(...) is not supported in production builds of React.");
};
react_production_min.useCallback = function(a2, b2) {
  return U$2.current.useCallback(a2, b2);
};
react_production_min.useContext = function(a2) {
  return U$2.current.useContext(a2);
};
react_production_min.useDebugValue = function() {
};
react_production_min.useDeferredValue = function(a2) {
  return U$2.current.useDeferredValue(a2);
};
react_production_min.useEffect = function(a2, b2) {
  return U$2.current.useEffect(a2, b2);
};
react_production_min.useId = function() {
  return U$2.current.useId();
};
react_production_min.useImperativeHandle = function(a2, b2, e2) {
  return U$2.current.useImperativeHandle(a2, b2, e2);
};
react_production_min.useInsertionEffect = function(a2, b2) {
  return U$2.current.useInsertionEffect(a2, b2);
};
react_production_min.useLayoutEffect = function(a2, b2) {
  return U$2.current.useLayoutEffect(a2, b2);
};
react_production_min.useMemo = function(a2, b2) {
  return U$2.current.useMemo(a2, b2);
};
react_production_min.useReducer = function(a2, b2, e2) {
  return U$2.current.useReducer(a2, b2, e2);
};
react_production_min.useRef = function(a2) {
  return U$2.current.useRef(a2);
};
react_production_min.useState = function(a2) {
  return U$2.current.useState(a2);
};
react_production_min.useSyncExternalStore = function(a2, b2, e2) {
  return U$2.current.useSyncExternalStore(a2, b2, e2);
};
react_production_min.useTransition = function() {
  return U$2.current.useTransition();
};
react_production_min.version = "18.0.0-fc46dba67-20220329";
{
  react.exports = react_production_min;
}
var React = react.exports;
var React$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": React
}, [react.exports]));
function _extends$1() {
  _extends$1 = Object.assign || function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i2;
  for (i2 = 0; i2 < sourceKeys.length; i2++) {
    key = sourceKeys[i2];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function memoize(fn3) {
  var cache2 = {};
  return function(arg) {
    if (cache2[arg] === void 0)
      cache2[arg] = fn3(arg);
    return cache2[arg];
  };
}
var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
var isPropValid = /* @__PURE__ */ memoize(function(prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
});
function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  }
  for (var i2 = 0; i2 < document.styleSheets.length; i2++) {
    if (document.styleSheets[i2].ownerNode === tag) {
      return document.styleSheets[i2];
    }
  }
}
function createStyleElement(options) {
  var tag = document.createElement("style");
  tag.setAttribute("data-emotion", options.key);
  if (options.nonce !== void 0) {
    tag.setAttribute("nonce", options.nonce);
  }
  tag.appendChild(document.createTextNode(""));
  tag.setAttribute("data-s", "");
  return tag;
}
var StyleSheet = /* @__PURE__ */ function() {
  function StyleSheet2(options) {
    var _this = this;
    this._insertTag = function(tag) {
      var before;
      if (_this.tags.length === 0) {
        if (_this.insertionPoint) {
          before = _this.insertionPoint.nextSibling;
        } else if (_this.prepend) {
          before = _this.container.firstChild;
        } else {
          before = _this.before;
        }
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }
      _this.container.insertBefore(tag, before);
      _this.tags.push(tag);
    };
    this.isSpeedy = options.speedy === void 0 ? true : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce;
    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.insertionPoint = options.insertionPoint;
    this.before = null;
  }
  var _proto = StyleSheet2.prototype;
  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };
  _proto.insert = function insert(rule) {
    if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }
    var tag = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);
      try {
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e2) {
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }
    this.ctr++;
  };
  _proto.flush = function flush() {
    this.tags.forEach(function(tag) {
      return tag.parentNode && tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
  };
  return StyleSheet2;
}();
var MS = "-ms-";
var MOZ = "-moz-";
var WEBKIT = "-webkit-";
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var KEYFRAMES = "@keyframes";
var abs = Math.abs;
var from = String.fromCharCode;
var assign = Object.assign;
function hash$2(value, length2) {
  return (((length2 << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3);
}
function trim(value) {
  return value.trim();
}
function match(value, pattern) {
  return (value = pattern.exec(value)) ? value[0] : value;
}
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
function indexof(value, search) {
  return value.indexOf(search);
}
function charat(value, index) {
  return value.charCodeAt(index) | 0;
}
function substr(value, begin, end2) {
  return value.slice(begin, end2);
}
function strlen(value) {
  return value.length;
}
function sizeof(value) {
  return value.length;
}
function append(value, array) {
  return array.push(value), value;
}
function combine(array, callback) {
  return array.map(callback).join("");
}
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
function node(value, root, parent, type, props, children, length2) {
  return { value, root, parent, type, props, children, line, column, length: length2, return: "" };
}
function copy(root, props) {
  return assign(node("", null, null, "", null, null, 0), root, { length: -root.length }, props);
}
function char() {
  return character;
}
function prev() {
  character = position > 0 ? charat(characters, --position) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
function next() {
  character = position < length ? charat(characters, position++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
function peek() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(begin, end2) {
  return substr(characters, begin, end2);
}
function token(type) {
  switch (type) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value) {
  return line = column = 1, length = strlen(characters = value), position = 0, [];
}
function dealloc(value) {
  return characters = "", value;
}
function delimit(type) {
  return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function whitespace(type) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function escaping(index, count) {
  while (--count && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
  while (next())
    switch (character) {
      case type:
        return position;
      case 34:
      case 39:
        if (type !== 34 && type !== 39)
          delimiter(character);
        break;
      case 40:
        if (type === 41)
          delimiter(type);
        break;
      case 92:
        next();
        break;
    }
  return position;
}
function commenter(type, index) {
  while (next())
    if (type + character === 47 + 10)
      break;
    else if (type + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index) {
  while (!token(peek()))
    next();
  return slice(index, position);
}
function compile(value) {
  return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index = 0;
  var offset2 = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var character2 = 0;
  var type = "";
  var props = rules;
  var children = rulesets;
  var reference2 = rule;
  var characters2 = type;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      case 40:
        if (previous != 108 && characters2.charCodeAt(length2 - 1) == 58) {
          if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f") != -1)
            ampersand = -1;
          break;
        }
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace(previous);
        break;
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root, parent), declarations);
            break;
          default:
            characters2 += "/";
        }
        break;
      case 123 * variable:
        points[index++] = strlen(characters2) * ampersand;
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          case 0:
          case 125:
            scanning = 0;
          case 59 + offset2:
            if (property > 0 && strlen(characters2) - length2)
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2), declarations);
            break;
          case 59:
            characters2 += ";";
          default:
            append(reference2 = ruleset(characters2, root, parent, index, offset2, rules, points, type, props = [], children = [], length2), rulesets);
            if (character2 === 123)
              if (offset2 === 0)
                parse(characters2, root, reference2, reference2, props, rulesets, length2, points, children);
              else
                switch (atrule) {
                  case 100:
                  case 109:
                  case 115:
                    parse(value, reference2, reference2, rule && append(ruleset(value, reference2, reference2, 0, 0, rules, points, type, rules, props = [], length2), children), rules, children, length2, points, rule ? props : children);
                    break;
                  default:
                    parse(characters2, reference2, reference2, reference2, [""], children, 0, points, children);
                }
        }
        index = offset2 = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          case 38:
            ampersand = offset2 > 0 ? 1 : (characters2 += "\f", -1);
            break;
          case 44:
            points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset2 = length2 = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
function ruleset(value, root, parent, index, offset2, rules, points, type, props, children, length2) {
  var post = offset2 - 1;
  var rule = offset2 === 0 ? rules : [""];
  var size = sizeof(rule);
  for (var i2 = 0, j2 = 0, k2 = 0; i2 < index; ++i2)
    for (var x2 = 0, y2 = substr(value, post + 1, post = abs(j2 = points[i2])), z2 = value; x2 < size; ++x2)
      if (z2 = trim(j2 > 0 ? rule[x2] + " " + y2 : replace(y2, /&\f/g, rule[x2])))
        props[k2++] = z2;
  return node(value, root, parent, offset2 === 0 ? RULESET : type, props, children, length2);
}
function comment(value, root, parent) {
  return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0);
}
function declaration(value, root, parent, length2) {
  return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2);
}
function prefix(value, length2) {
  switch (hash$2(value, length2)) {
    case 5103:
      return WEBKIT + "print-" + value + value;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + value + value;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    case 6828:
    case 4268:
      return WEBKIT + value + MS + value + value;
    case 6165:
      return WEBKIT + value + MS + "flex-" + value + value;
    case 5187:
      return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
    case 5443:
      return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/, "") + value;
    case 4675:
      return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/, "") + value;
    case 5548:
      return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
    case 5292:
      return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
    case 6060:
      return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
    case 4554:
      return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
    case 6187:
      return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
    case 4968:
      return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + WEBKIT + value + value;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (strlen(value) - 1 - length2 > 6)
        switch (charat(value, length2 + 1)) {
          case 109:
            if (charat(value, length2 + 4) !== 45)
              break;
          case 102:
            return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
          case 115:
            return ~indexof(value, "stretch") ? prefix(replace(value, "stretch", "fill-available"), length2) + value : value;
        }
      break;
    case 4949:
      if (charat(value, length2 + 1) !== 115)
        break;
    case 6444:
      switch (charat(value, strlen(value) - 3 - (~indexof(value, "!important") && 10))) {
        case 107:
          return replace(value, ":", ":" + WEBKIT) + value;
        case 101:
          return replace(value, /(.+:)([^;!]+)(;|!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
      }
      break;
    case 5936:
      switch (charat(value, length2 + 11)) {
        case 114:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
        case 108:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
        case 45:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
      }
      return WEBKIT + value + MS + value + value;
  }
  return value;
}
function serialize(children, callback) {
  var output = "";
  var length2 = sizeof(children);
  for (var i2 = 0; i2 < length2; i2++)
    output += callback(children[i2], i2, children, callback) || "";
  return output;
}
function stringify(element, index, children, callback) {
  switch (element.type) {
    case IMPORT:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element.return = element.value + "{" + serialize(element.children, callback) + "}";
    case RULESET:
      element.value = element.props.join(",");
  }
  return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
function middleware(collection) {
  var length2 = sizeof(collection);
  return function(element, index, children, callback) {
    var output = "";
    for (var i2 = 0; i2 < length2; i2++)
      output += collection[i2](element, index, children, callback) || "";
    return output;
  };
}
function rulesheet(callback) {
  return function(element) {
    if (!element.root) {
      if (element = element.return)
        callback(element);
    }
  };
}
function prefixer(element, index, children, callback) {
  if (element.length > -1) {
    if (!element.return)
      switch (element.type) {
        case DECLARATION:
          element.return = prefix(element.value, element.length);
          break;
        case KEYFRAMES:
          return serialize([copy(element, { value: replace(element.value, "@", "@" + WEBKIT) })], callback);
        case RULESET:
          if (element.length)
            return combine(element.props, function(value) {
              switch (match(value, /(::plac\w+|:read-\w+)/)) {
                case ":read-only":
                case ":read-write":
                  return serialize([copy(element, { props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")] })], callback);
                case "::placeholder":
                  return serialize([
                    copy(element, { props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")] }),
                    copy(element, { props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")] }),
                    copy(element, { props: [replace(value, /:(plac\w+)/, MS + "input-$1")] })
                  ], callback);
              }
              return "";
            });
      }
  }
}
var weakMemoize = function weakMemoize2(func) {
  var cache2 = /* @__PURE__ */ new WeakMap();
  return function(arg) {
    if (cache2.has(arg)) {
      return cache2.get(arg);
    }
    var ret = func(arg);
    cache2.set(arg, ret);
    return ret;
  };
};
var identifierWithPointTracking = function identifierWithPointTracking2(begin, points, index) {
  var previous = 0;
  var character2 = 0;
  while (true) {
    previous = character2;
    character2 = peek();
    if (previous === 38 && character2 === 12) {
      points[index] = 1;
    }
    if (token(character2)) {
      break;
    }
    next();
  }
  return slice(begin, position);
};
var toRules = function toRules2(parsed, points) {
  var index = -1;
  var character2 = 44;
  do {
    switch (token(character2)) {
      case 0:
        if (character2 === 38 && peek() === 12) {
          points[index] = 1;
        }
        parsed[index] += identifierWithPointTracking(position - 1, points, index);
        break;
      case 2:
        parsed[index] += delimit(character2);
        break;
      case 4:
        if (character2 === 44) {
          parsed[++index] = peek() === 58 ? "&\f" : "";
          points[index] = parsed[index].length;
          break;
        }
      default:
        parsed[index] += from(character2);
    }
  } while (character2 = next());
  return parsed;
};
var getRules = function getRules2(value, points) {
  return dealloc(toRules(alloc(value), points));
};
var fixedElements = /* @__PURE__ */ new WeakMap();
var compat = function compat2(element) {
  if (element.type !== "rule" || !element.parent || element.length < 1) {
    return;
  }
  var value = element.value, parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;
  while (parent.type !== "rule") {
    parent = parent.parent;
    if (!parent)
      return;
  }
  if (element.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) {
    return;
  }
  if (isImplicitRule) {
    return;
  }
  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;
  for (var i2 = 0, k2 = 0; i2 < rules.length; i2++) {
    for (var j2 = 0; j2 < parentRules.length; j2++, k2++) {
      element.props[k2] = points[i2] ? rules[i2].replace(/&\f/g, parentRules[j2]) : parentRules[j2] + " " + rules[i2];
    }
  }
};
var removeLabel = function removeLabel2(element) {
  if (element.type === "decl") {
    var value = element.value;
    if (value.charCodeAt(0) === 108 && value.charCodeAt(2) === 98) {
      element["return"] = "";
      element.value = "";
    }
  }
};
var defaultStylisPlugins = [prefixer];
var createCache = function createCache2(options) {
  var key = options.key;
  if (key === "css") {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(ssrStyles, function(node2) {
      var dataEmotionAttribute = node2.getAttribute("data-emotion");
      if (dataEmotionAttribute.indexOf(" ") === -1) {
        return;
      }
      document.head.appendChild(node2);
      node2.setAttribute("data-s", "");
    });
  }
  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
  var inserted = {};
  var container;
  var nodesToHydrate = [];
  {
    container = options.container || document.head;
    Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="' + key + ' "]'), function(node2) {
      var attrib = node2.getAttribute("data-emotion").split(" ");
      for (var i2 = 1; i2 < attrib.length; i2++) {
        inserted[attrib[i2]] = true;
      }
      nodesToHydrate.push(node2);
    });
  }
  var _insert;
  var omnipresentPlugins = [compat, removeLabel];
  {
    var currentSheet;
    var finalizingPlugins = [stringify, rulesheet(function(rule) {
      currentSheet.insert(rule);
    })];
    var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
    var stylis = function stylis2(styles) {
      return serialize(compile(styles), serializer);
    };
    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;
      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
      if (shouldCache) {
        cache2.inserted[serialized.name] = true;
      }
    };
  }
  var cache2 = {
    key,
    sheet: new StyleSheet({
      key,
      container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint
    }),
    nonce: options.nonce,
    inserted,
    registered: {},
    insert: _insert
  };
  cache2.sheet.hydrate(nodesToHydrate);
  return cache2;
};
var emotionCache_browser_esm = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": createCache
});
var reactIs$1 = { exports: {} };
var reactIs_production_min$1 = {};
/** @license React v16.12.0
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(reactIs_production_min$1, "__esModule", { value: true });
var b$2 = typeof Symbol === "function" && Symbol.for, c$3 = b$2 ? Symbol.for("react.element") : 60103, d$2 = b$2 ? Symbol.for("react.portal") : 60106, e$3 = b$2 ? Symbol.for("react.fragment") : 60107, f$4 = b$2 ? Symbol.for("react.strict_mode") : 60108, g$2 = b$2 ? Symbol.for("react.profiler") : 60114, h$4 = b$2 ? Symbol.for("react.provider") : 60109, k$4 = b$2 ? Symbol.for("react.context") : 60110, l$4 = b$2 ? Symbol.for("react.async_mode") : 60111, m$5 = b$2 ? Symbol.for("react.concurrent_mode") : 60111, n$6 = b$2 ? Symbol.for("react.forward_ref") : 60112, p$6 = b$2 ? Symbol.for("react.suspense") : 60113, q$6 = b$2 ? Symbol.for("react.suspense_list") : 60120, r$4 = b$2 ? Symbol.for("react.memo") : 60115, t$5 = b$2 ? Symbol.for("react.lazy") : 60116, v$4 = b$2 ? Symbol.for("react.fundamental") : 60117, w$2 = b$2 ? Symbol.for("react.responder") : 60118, x$1 = b$2 ? Symbol.for("react.scope") : 60119;
function y$1(a2) {
  if (typeof a2 === "object" && a2 !== null) {
    var u2 = a2.$$typeof;
    switch (u2) {
      case c$3:
        switch (a2 = a2.type, a2) {
          case l$4:
          case m$5:
          case e$3:
          case g$2:
          case f$4:
          case p$6:
            return a2;
          default:
            switch (a2 = a2 && a2.$$typeof, a2) {
              case k$4:
              case n$6:
              case t$5:
              case r$4:
              case h$4:
                return a2;
              default:
                return u2;
            }
        }
      case d$2:
        return u2;
    }
  }
}
function z$2(a2) {
  return y$1(a2) === m$5;
}
reactIs_production_min$1.typeOf = y$1;
reactIs_production_min$1.AsyncMode = l$4;
reactIs_production_min$1.ConcurrentMode = m$5;
reactIs_production_min$1.ContextConsumer = k$4;
reactIs_production_min$1.ContextProvider = h$4;
reactIs_production_min$1.Element = c$3;
reactIs_production_min$1.ForwardRef = n$6;
reactIs_production_min$1.Fragment = e$3;
reactIs_production_min$1.Lazy = t$5;
reactIs_production_min$1.Memo = r$4;
reactIs_production_min$1.Portal = d$2;
reactIs_production_min$1.Profiler = g$2;
reactIs_production_min$1.StrictMode = f$4;
reactIs_production_min$1.Suspense = p$6;
reactIs_production_min$1.isValidElementType = function(a2) {
  return typeof a2 === "string" || typeof a2 === "function" || a2 === e$3 || a2 === m$5 || a2 === g$2 || a2 === f$4 || a2 === p$6 || a2 === q$6 || typeof a2 === "object" && a2 !== null && (a2.$$typeof === t$5 || a2.$$typeof === r$4 || a2.$$typeof === h$4 || a2.$$typeof === k$4 || a2.$$typeof === n$6 || a2.$$typeof === v$4 || a2.$$typeof === w$2 || a2.$$typeof === x$1);
};
reactIs_production_min$1.isAsyncMode = function(a2) {
  return z$2(a2) || y$1(a2) === l$4;
};
reactIs_production_min$1.isConcurrentMode = z$2;
reactIs_production_min$1.isContextConsumer = function(a2) {
  return y$1(a2) === k$4;
};
reactIs_production_min$1.isContextProvider = function(a2) {
  return y$1(a2) === h$4;
};
reactIs_production_min$1.isElement = function(a2) {
  return typeof a2 === "object" && a2 !== null && a2.$$typeof === c$3;
};
reactIs_production_min$1.isForwardRef = function(a2) {
  return y$1(a2) === n$6;
};
reactIs_production_min$1.isFragment = function(a2) {
  return y$1(a2) === e$3;
};
reactIs_production_min$1.isLazy = function(a2) {
  return y$1(a2) === t$5;
};
reactIs_production_min$1.isMemo = function(a2) {
  return y$1(a2) === r$4;
};
reactIs_production_min$1.isPortal = function(a2) {
  return y$1(a2) === d$2;
};
reactIs_production_min$1.isProfiler = function(a2) {
  return y$1(a2) === g$2;
};
reactIs_production_min$1.isStrictMode = function(a2) {
  return y$1(a2) === f$4;
};
reactIs_production_min$1.isSuspense = function(a2) {
  return y$1(a2) === p$6;
};
{
  reactIs$1.exports = reactIs_production_min$1;
}
var reactIs = reactIs$1.exports;
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  "$$typeof": true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  "$$typeof": true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
function getStatics(component) {
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  }
  return TYPE_STATICS[component["$$typeof"]] || REACT_STATICS;
}
var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics$2(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== "string") {
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);
      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics$2(targetComponent, inheritedComponent, blacklist);
      }
    }
    var keys = getOwnPropertyNames(sourceComponent);
    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }
    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);
    for (var i2 = 0; i2 < keys.length; ++i2) {
      var key = keys[i2];
      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
        try {
          defineProperty(targetComponent, key, descriptor);
        } catch (e2) {
        }
      }
    }
  }
  return targetComponent;
}
var hoistNonReactStatics_cjs = hoistNonReactStatics$2;
var hoistNonReactStatics = function(targetComponent, sourceComponent) {
  return hoistNonReactStatics_cjs(targetComponent, sourceComponent);
};
var hoistNonReactStatics$1 = hoistNonReactStatics;
var isBrowser = true;
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = "";
  classNames.split(" ").forEach(function(className) {
    if (registered[className] !== void 0) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var insertStyles = function insertStyles2(cache2, serialized, isStringTag) {
  var className = cache2.key + "-" + serialized.name;
  if ((isStringTag === false || isBrowser === false) && cache2.registered[className] === void 0) {
    cache2.registered[className] = serialized.styles;
  }
  if (cache2.inserted[serialized.name] === void 0) {
    var current = serialized;
    do {
      cache2.insert(serialized === current ? "." + className : "", current, cache2.sheet, true);
      current = current.next;
    } while (current !== void 0);
  }
};
var emotionUtils_browser_esm = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  getRegisteredStyles,
  insertStyles
});
function murmur2(str) {
  var h2 = 0;
  var k2, i2 = 0, len = str.length;
  for (; len >= 4; ++i2, len -= 4) {
    k2 = str.charCodeAt(i2) & 255 | (str.charCodeAt(++i2) & 255) << 8 | (str.charCodeAt(++i2) & 255) << 16 | (str.charCodeAt(++i2) & 255) << 24;
    k2 = (k2 & 65535) * 1540483477 + ((k2 >>> 16) * 59797 << 16);
    k2 ^= k2 >>> 24;
    h2 = (k2 & 65535) * 1540483477 + ((k2 >>> 16) * 59797 << 16) ^ (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  }
  switch (len) {
    case 3:
      h2 ^= (str.charCodeAt(i2 + 2) & 255) << 16;
    case 2:
      h2 ^= (str.charCodeAt(i2 + 1) & 255) << 8;
    case 1:
      h2 ^= str.charCodeAt(i2) & 255;
      h2 = (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  }
  h2 ^= h2 >>> 13;
  h2 = (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  return ((h2 ^ h2 >>> 15) >>> 0).toString(36);
}
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
var isCustomProperty = function isCustomProperty2(property) {
  return property.charCodeAt(1) === 45;
};
var isProcessableValue = function isProcessableValue2(value) {
  return value != null && typeof value !== "boolean";
};
var processStyleName = /* @__PURE__ */ memoize(function(styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
});
var processStyleValue = function processStyleValue2(key, value) {
  switch (key) {
    case "animation":
    case "animationName": {
      if (typeof value === "string") {
        return value.replace(animationRegex, function(match2, p1, p2) {
          cursor = {
            name: p1,
            styles: p2,
            next: cursor
          };
          return p1;
        });
      }
    }
  }
  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === "number" && value !== 0) {
    return value + "px";
  }
  return value;
};
function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return "";
  }
  if (interpolation.__emotion_styles !== void 0) {
    return interpolation;
  }
  switch (typeof interpolation) {
    case "boolean": {
      return "";
    }
    case "object": {
      if (interpolation.anim === 1) {
        cursor = {
          name: interpolation.name,
          styles: interpolation.styles,
          next: cursor
        };
        return interpolation.name;
      }
      if (interpolation.styles !== void 0) {
        var next2 = interpolation.next;
        if (next2 !== void 0) {
          while (next2 !== void 0) {
            cursor = {
              name: next2.name,
              styles: next2.styles,
              next: cursor
            };
            next2 = next2.next;
          }
        }
        var styles = interpolation.styles + ";";
        return styles;
      }
      return createStringFromObject(mergedProps, registered, interpolation);
    }
    case "function": {
      if (mergedProps !== void 0) {
        var previousCursor = cursor;
        var result = interpolation(mergedProps);
        cursor = previousCursor;
        return handleInterpolation(mergedProps, registered, result);
      }
      break;
    }
  }
  if (registered == null) {
    return interpolation;
  }
  var cached = registered[interpolation];
  return cached !== void 0 ? cached : interpolation;
}
function createStringFromObject(mergedProps, registered, obj) {
  var string = "";
  if (Array.isArray(obj)) {
    for (var i2 = 0; i2 < obj.length; i2++) {
      string += handleInterpolation(mergedProps, registered, obj[i2]) + ";";
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];
      if (typeof value !== "object") {
        if (registered != null && registered[value] !== void 0) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === "NO_COMPONENT_SELECTOR" && false) {
          throw new Error("Component selectors can only be used in conjunction with @emotion/babel-plugin.");
        }
        if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);
          switch (_key) {
            case "animation":
            case "animationName": {
              string += processStyleName(_key) + ":" + interpolated + ";";
              break;
            }
            default: {
              string += _key + "{" + interpolated + "}";
            }
          }
        }
      }
    }
  }
  return string;
}
var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
var cursor;
var serializeStyles = function serializeStyles2(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) {
    return args[0];
  }
  var stringMode = true;
  var styles = "";
  cursor = void 0;
  var strings = args[0];
  if (strings == null || strings.raw === void 0) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    styles += strings[0];
  }
  for (var i2 = 1; i2 < args.length; i2++) {
    styles += handleInterpolation(mergedProps, registered, args[i2]);
    if (stringMode) {
      styles += strings[i2];
    }
  }
  labelPattern.lastIndex = 0;
  var identifierName = "";
  var match2;
  while ((match2 = labelPattern.exec(styles)) !== null) {
    identifierName += "-" + match2[1];
  }
  var name = murmur2(styles) + identifierName;
  return {
    name,
    styles,
    next: cursor
  };
};
var emotionSerialize_browser_esm = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  serializeStyles
});
var hasOwnProperty = Object.prototype.hasOwnProperty;
var EmotionCacheContext = /* @__PURE__ */ react.exports.createContext(typeof HTMLElement !== "undefined" ? /* @__PURE__ */ createCache({
  key: "css"
}) : null);
var CacheProvider = EmotionCacheContext.Provider;
var __unsafe_useEmotionCache = function useEmotionCache() {
  return react.exports.useContext(EmotionCacheContext);
};
var withEmotionCache = function withEmotionCache2(func) {
  return /* @__PURE__ */ react.exports.forwardRef(function(props, ref) {
    var cache2 = react.exports.useContext(EmotionCacheContext);
    return func(props, cache2, ref);
  });
};
var ThemeContext = /* @__PURE__ */ react.exports.createContext({});
var useTheme = function useTheme2() {
  return react.exports.useContext(ThemeContext);
};
var getTheme = function getTheme2(outerTheme, theme) {
  if (typeof theme === "function") {
    var mergedTheme = theme(outerTheme);
    return mergedTheme;
  }
  return _extends$1({}, outerTheme, theme);
};
var createCacheWithTheme = /* @__PURE__ */ weakMemoize(function(outerTheme) {
  return weakMemoize(function(theme) {
    return getTheme(outerTheme, theme);
  });
});
var ThemeProvider = function ThemeProvider2(props) {
  var theme = react.exports.useContext(ThemeContext);
  if (props.theme !== theme) {
    theme = createCacheWithTheme(theme)(props.theme);
  }
  return /* @__PURE__ */ react.exports.createElement(ThemeContext.Provider, {
    value: theme
  }, props.children);
};
function withTheme(Component) {
  var componentName = Component.displayName || Component.name || "Component";
  var render = function render2(props, ref) {
    var theme = react.exports.useContext(ThemeContext);
    return /* @__PURE__ */ react.exports.createElement(Component, _extends$1({
      theme,
      ref
    }, props));
  };
  var WithTheme = /* @__PURE__ */ react.exports.forwardRef(render);
  WithTheme.displayName = "WithTheme(" + componentName + ")";
  return hoistNonReactStatics$1(WithTheme, Component);
}
var typePropName = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__";
var createEmotionProps = function createEmotionProps2(type, props) {
  var newProps = {};
  for (var key in props) {
    if (hasOwnProperty.call(props, key)) {
      newProps[key] = props[key];
    }
  }
  newProps[typePropName] = type;
  return newProps;
};
var Emotion = /* @__PURE__ */ withEmotionCache(function(props, cache2, ref) {
  var cssProp = props.css;
  if (typeof cssProp === "string" && cache2.registered[cssProp] !== void 0) {
    cssProp = cache2.registered[cssProp];
  }
  var type = props[typePropName];
  var registeredStyles = [cssProp];
  var className = "";
  if (typeof props.className === "string") {
    className = getRegisteredStyles(cache2.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }
  var serialized = serializeStyles(registeredStyles, void 0, react.exports.useContext(ThemeContext));
  insertStyles(cache2, serialized, typeof type === "string");
  className += cache2.key + "-" + serialized.name;
  var newProps = {};
  for (var key in props) {
    if (hasOwnProperty.call(props, key) && key !== "css" && key !== typePropName && true) {
      newProps[key] = props[key];
    }
  }
  newProps.ref = ref;
  newProps.className = className;
  var ele = /* @__PURE__ */ react.exports.createElement(type, newProps);
  return ele;
});
var jsx = function jsx2(type, props) {
  var args = arguments;
  if (props == null || !hasOwnProperty.call(props, "css")) {
    return react.exports.createElement.apply(void 0, args);
  }
  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = Emotion;
  createElementArgArray[1] = createEmotionProps(type, props);
  for (var i2 = 2; i2 < argsLength; i2++) {
    createElementArgArray[i2] = args[i2];
  }
  return react.exports.createElement.apply(null, createElementArgArray);
};
var Global = /* @__PURE__ */ withEmotionCache(function(props, cache2) {
  var styles = props.styles;
  var serialized = serializeStyles([styles], void 0, react.exports.useContext(ThemeContext));
  var sheetRef = react.exports.useRef();
  react.exports.useLayoutEffect(function() {
    var key = cache2.key + "-global";
    var sheet = new StyleSheet({
      key,
      nonce: cache2.sheet.nonce,
      container: cache2.sheet.container,
      speedy: cache2.sheet.isSpeedy
    });
    var rehydrating = false;
    var node2 = document.querySelector('style[data-emotion="' + key + " " + serialized.name + '"]');
    if (cache2.sheet.tags.length) {
      sheet.before = cache2.sheet.tags[0];
    }
    if (node2 !== null) {
      rehydrating = true;
      node2.setAttribute("data-emotion", key);
      sheet.hydrate([node2]);
    }
    sheetRef.current = [sheet, rehydrating];
    return function() {
      sheet.flush();
    };
  }, [cache2]);
  react.exports.useLayoutEffect(function() {
    var sheetRefCurrent = sheetRef.current;
    var sheet = sheetRefCurrent[0], rehydrating = sheetRefCurrent[1];
    if (rehydrating) {
      sheetRefCurrent[1] = false;
      return;
    }
    if (serialized.next !== void 0) {
      insertStyles(cache2, serialized.next, true);
    }
    if (sheet.tags.length) {
      var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
      sheet.before = element;
      sheet.flush();
    }
    cache2.insert("", serialized, sheet, false);
  }, [cache2, serialized.name]);
  return null;
});
function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return serializeStyles(args);
}
var keyframes = function keyframes2() {
  var insertable = css.apply(void 0, arguments);
  var name = "animation-" + insertable.name;
  return {
    name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};
var classnames$1 = function classnames(args) {
  var len = args.length;
  var i2 = 0;
  var cls = "";
  for (; i2 < len; i2++) {
    var arg = args[i2];
    if (arg == null)
      continue;
    var toAdd = void 0;
    switch (typeof arg) {
      case "boolean":
        break;
      case "object": {
        if (Array.isArray(arg)) {
          toAdd = classnames(arg);
        } else {
          toAdd = "";
          for (var k2 in arg) {
            if (arg[k2] && k2) {
              toAdd && (toAdd += " ");
              toAdd += k2;
            }
          }
        }
        break;
      }
      default: {
        toAdd = arg;
      }
    }
    if (toAdd) {
      cls && (cls += " ");
      cls += toAdd;
    }
  }
  return cls;
};
function merge(registered, css2, className) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles(registered, registeredStyles, className);
  if (registeredStyles.length < 2) {
    return className;
  }
  return rawClassName + css2(registeredStyles);
}
var ClassNames = /* @__PURE__ */ withEmotionCache(function(props, cache2) {
  var hasRendered = false;
  var css2 = function css3() {
    if (hasRendered && false) {
      throw new Error("css can only be used during render");
    }
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var serialized = serializeStyles(args, cache2.registered);
    {
      insertStyles(cache2, serialized, false);
    }
    return cache2.key + "-" + serialized.name;
  };
  var cx2 = function cx3() {
    if (hasRendered && false) {
      throw new Error("cx can only be used during render");
    }
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return merge(cache2.registered, css2, classnames$1(args));
  };
  var content = {
    css: css2,
    cx: cx2,
    theme: react.exports.useContext(ThemeContext)
  };
  var ele = props.children(content);
  hasRendered = true;
  return ele;
});
var emotionReact_browser_esm = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  ClassNames,
  Global,
  createElement: jsx,
  css,
  jsx,
  keyframes,
  CacheProvider,
  ThemeContext,
  ThemeProvider,
  __unsafe_useEmotionCache,
  useTheme,
  withEmotionCache,
  withTheme
});
var testOmitPropsOnStringTag = isPropValid;
var testOmitPropsOnComponent = function testOmitPropsOnComponent2(key) {
  return key !== "theme";
};
var getDefaultShouldForwardProp = function getDefaultShouldForwardProp2(tag) {
  return typeof tag === "string" && tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
};
var composeShouldForwardProps = function composeShouldForwardProps2(tag, options, isReal) {
  var shouldForwardProp;
  if (options) {
    var optionsShouldForwardProp = options.shouldForwardProp;
    shouldForwardProp = tag.__emotion_forwardProp && optionsShouldForwardProp ? function(propName) {
      return tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName);
    } : optionsShouldForwardProp;
  }
  if (typeof shouldForwardProp !== "function" && isReal) {
    shouldForwardProp = tag.__emotion_forwardProp;
  }
  return shouldForwardProp;
};
var createStyled = function createStyled2(tag, options) {
  var isReal = tag.__emotion_real === tag;
  var baseTag = isReal && tag.__emotion_base || tag;
  var identifierName;
  var targetClassName;
  if (options !== void 0) {
    identifierName = options.label;
    targetClassName = options.target;
  }
  var shouldForwardProp = composeShouldForwardProps(tag, options, isReal);
  var defaultShouldForwardProp = shouldForwardProp || getDefaultShouldForwardProp(baseTag);
  var shouldUseAs = !defaultShouldForwardProp("as");
  return function() {
    var args = arguments;
    var styles = isReal && tag.__emotion_styles !== void 0 ? tag.__emotion_styles.slice(0) : [];
    if (identifierName !== void 0) {
      styles.push("label:" + identifierName + ";");
    }
    if (args[0] == null || args[0].raw === void 0) {
      styles.push.apply(styles, args);
    } else {
      styles.push(args[0][0]);
      var len = args.length;
      var i2 = 1;
      for (; i2 < len; i2++) {
        styles.push(args[i2], args[0][i2]);
      }
    }
    var Styled = withEmotionCache(function(props, cache2, ref) {
      var finalTag = shouldUseAs && props.as || baseTag;
      var className = "";
      var classInterpolations = [];
      var mergedProps = props;
      if (props.theme == null) {
        mergedProps = {};
        for (var key in props) {
          mergedProps[key] = props[key];
        }
        mergedProps.theme = react.exports.useContext(ThemeContext);
      }
      if (typeof props.className === "string") {
        className = getRegisteredStyles(cache2.registered, classInterpolations, props.className);
      } else if (props.className != null) {
        className = props.className + " ";
      }
      var serialized = serializeStyles(styles.concat(classInterpolations), cache2.registered, mergedProps);
      insertStyles(cache2, serialized, typeof finalTag === "string");
      className += cache2.key + "-" + serialized.name;
      if (targetClassName !== void 0) {
        className += " " + targetClassName;
      }
      var finalShouldForwardProp = shouldUseAs && shouldForwardProp === void 0 ? getDefaultShouldForwardProp(finalTag) : defaultShouldForwardProp;
      var newProps = {};
      for (var _key in props) {
        if (shouldUseAs && _key === "as")
          continue;
        if (finalShouldForwardProp(_key)) {
          newProps[_key] = props[_key];
        }
      }
      newProps.className = className;
      newProps.ref = ref;
      var ele = /* @__PURE__ */ react.exports.createElement(finalTag, newProps);
      return ele;
    });
    Styled.displayName = identifierName !== void 0 ? identifierName : "Styled(" + (typeof baseTag === "string" ? baseTag : baseTag.displayName || baseTag.name || "Component") + ")";
    Styled.defaultProps = tag.defaultProps;
    Styled.__emotion_real = Styled;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_styles = styles;
    Styled.__emotion_forwardProp = shouldForwardProp;
    Object.defineProperty(Styled, "toString", {
      value: function value() {
        if (targetClassName === void 0 && false) {
          return "NO_COMPONENT_SELECTOR";
        }
        return "." + targetClassName;
      }
    });
    Styled.withComponent = function(nextTag, nextOptions) {
      return createStyled2(nextTag, _extends$1({}, options, nextOptions, {
        shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, true)
      })).apply(void 0, styles);
    };
    return Styled;
  };
};
var tags = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "marquee",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
];
var newStyled = createStyled.bind();
tags.forEach(function(tagName) {
  newStyled[tagName] = newStyled(tagName);
});
var emStyled = newStyled;
var ReactPropTypesSecret$1 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;
var ReactPropTypesSecret = ReactPropTypesSecret_1;
function emptyFunction() {
}
function emptyFunctionWithReset() {
}
emptyFunctionWithReset.resetWarningCache = emptyFunction;
var factoryWithThrowingShims = function() {
  function shim2(props, propName, componentName, location2, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      return;
    }
    var err = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
    err.name = "Invariant Violation";
    throw err;
  }
  shim2.isRequired = shim2;
  function getShim() {
    return shim2;
  }
  var ReactPropTypes = {
    array: shim2,
    bool: shim2,
    func: shim2,
    number: shim2,
    object: shim2,
    string: shim2,
    symbol: shim2,
    any: shim2,
    arrayOf: getShim,
    element: shim2,
    elementType: shim2,
    instanceOf: getShim,
    node: shim2,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};
{
  factoryWithThrowingShims();
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f$3 = react.exports, k$3 = Symbol.for("react.element"), l$3 = Symbol.for("react.fragment"), m$4 = Object.prototype.hasOwnProperty, n$5 = f$3.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$5 = { key: true, ref: true, __self: true, __source: true };
function q$5(c2, a2, g2) {
  var b2, d2 = {}, e2 = null, h2 = null;
  g2 !== void 0 && (e2 = "" + g2);
  a2.key !== void 0 && (e2 = "" + a2.key);
  a2.ref !== void 0 && (h2 = a2.ref);
  for (b2 in a2)
    m$4.call(a2, b2) && !p$5.hasOwnProperty(b2) && (d2[b2] = a2[b2]);
  if (c2 && c2.defaultProps)
    for (b2 in a2 = c2.defaultProps, a2)
      d2[b2] === void 0 && (d2[b2] = a2[b2]);
  return { $$typeof: k$3, type: c2, key: e2, ref: h2, props: d2, _owner: n$5.current };
}
reactJsxRuntime_production_min.Fragment = l$3;
reactJsxRuntime_production_min.jsx = q$5;
reactJsxRuntime_production_min.jsxs = q$5;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
function toVal(mix) {
  var k2, y2, str = "";
  if (typeof mix === "string" || typeof mix === "number") {
    str += mix;
  } else if (typeof mix === "object") {
    if (Array.isArray(mix)) {
      for (k2 = 0; k2 < mix.length; k2++) {
        if (mix[k2]) {
          if (y2 = toVal(mix[k2])) {
            str && (str += " ");
            str += y2;
          }
        }
      }
    } else {
      for (k2 in mix) {
        if (mix[k2]) {
          str && (str += " ");
          str += k2;
        }
      }
    }
  }
  return str;
}
function cx() {
  var i2 = 0, tmp, x2, str = "";
  while (i2 < arguments.length) {
    if (tmp = arguments[i2++]) {
      if (x2 = toVal(tmp)) {
        str && (str += " ");
        str += x2;
      }
    }
  }
  return str;
}
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports) {
  function f2(a2, b2) {
    var c2 = a2.length;
    a2.push(b2);
    a:
      for (; 0 < c2; ) {
        var d2 = c2 - 1 >>> 1, e2 = a2[d2];
        if (0 < g2(e2, b2))
          a2[d2] = b2, a2[c2] = e2, c2 = d2;
        else
          break a;
      }
  }
  function h2(a2) {
    return a2.length === 0 ? null : a2[0];
  }
  function k2(a2) {
    if (a2.length === 0)
      return null;
    var b2 = a2[0], c2 = a2.pop();
    if (c2 !== b2) {
      a2[0] = c2;
      a:
        for (var d2 = 0, e2 = a2.length, w2 = e2 >>> 1; d2 < w2; ) {
          var m2 = 2 * (d2 + 1) - 1, C2 = a2[m2], n2 = m2 + 1, x2 = a2[n2];
          if (0 > g2(C2, c2))
            n2 < e2 && 0 > g2(x2, C2) ? (a2[d2] = x2, a2[n2] = c2, d2 = n2) : (a2[d2] = C2, a2[m2] = c2, d2 = m2);
          else if (n2 < e2 && 0 > g2(x2, c2))
            a2[d2] = x2, a2[n2] = c2, d2 = n2;
          else
            break a;
        }
    }
    return b2;
  }
  function g2(a2, b2) {
    var c2 = a2.sortIndex - b2.sortIndex;
    return c2 !== 0 ? c2 : a2.id - b2.id;
  }
  if (typeof performance === "object" && typeof performance.now === "function") {
    var l2 = performance;
    exports.unstable_now = function() {
      return l2.now();
    };
  } else {
    var p2 = Date, q2 = p2.now();
    exports.unstable_now = function() {
      return p2.now() - q2;
    };
  }
  var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = typeof setTimeout === "function" ? setTimeout : null, E2 = typeof clearTimeout === "function" ? clearTimeout : null, F2 = typeof setImmediate !== "undefined" ? setImmediate : null;
  typeof navigator !== "undefined" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function G2(a2) {
    for (var b2 = h2(t2); b2 !== null; ) {
      if (b2.callback === null)
        k2(t2);
      else if (b2.startTime <= a2)
        k2(t2), b2.sortIndex = b2.expirationTime, f2(r2, b2);
      else
        break;
      b2 = h2(t2);
    }
  }
  function H2(a2) {
    B2 = false;
    G2(a2);
    if (!A2)
      if (h2(r2) !== null)
        A2 = true, I2(J2);
      else {
        var b2 = h2(t2);
        b2 !== null && K2(H2, b2.startTime - a2);
      }
  }
  function J2(a2, b2) {
    A2 = false;
    B2 && (B2 = false, E2(L2), L2 = -1);
    z2 = true;
    var c2 = y2;
    try {
      G2(b2);
      for (v2 = h2(r2); v2 !== null && (!(v2.expirationTime > b2) || a2 && !M2()); ) {
        var d2 = v2.callback;
        if (typeof d2 === "function") {
          v2.callback = null;
          y2 = v2.priorityLevel;
          var e2 = d2(v2.expirationTime <= b2);
          b2 = exports.unstable_now();
          typeof e2 === "function" ? v2.callback = e2 : v2 === h2(r2) && k2(r2);
          G2(b2);
        } else
          k2(r2);
        v2 = h2(r2);
      }
      if (v2 !== null)
        var w2 = true;
      else {
        var m2 = h2(t2);
        m2 !== null && K2(H2, m2.startTime - b2);
        w2 = false;
      }
      return w2;
    } finally {
      v2 = null, y2 = c2, z2 = false;
    }
  }
  var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
  function M2() {
    return exports.unstable_now() - Q2 < P2 ? false : true;
  }
  function R2() {
    if (O2 !== null) {
      var a2 = exports.unstable_now();
      Q2 = a2;
      var b2 = true;
      try {
        b2 = O2(true, a2);
      } finally {
        b2 ? S2() : (N2 = false, O2 = null);
      }
    } else
      N2 = false;
  }
  var S2;
  if (typeof F2 === "function")
    S2 = function() {
      F2(R2);
    };
  else if (typeof MessageChannel !== "undefined") {
    var T2 = new MessageChannel(), U2 = T2.port2;
    T2.port1.onmessage = R2;
    S2 = function() {
      U2.postMessage(null);
    };
  } else
    S2 = function() {
      D2(R2, 0);
    };
  function I2(a2) {
    O2 = a2;
    N2 || (N2 = true, S2());
  }
  function K2(a2, b2) {
    L2 = D2(function() {
      a2(exports.unstable_now());
    }, b2);
  }
  exports.unstable_IdlePriority = 5;
  exports.unstable_ImmediatePriority = 1;
  exports.unstable_LowPriority = 4;
  exports.unstable_NormalPriority = 3;
  exports.unstable_Profiling = null;
  exports.unstable_UserBlockingPriority = 2;
  exports.unstable_cancelCallback = function(a2) {
    a2.callback = null;
  };
  exports.unstable_continueExecution = function() {
    A2 || z2 || (A2 = true, I2(J2));
  };
  exports.unstable_forceFrameRate = function(a2) {
    0 > a2 || 125 < a2 ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a2 ? Math.floor(1e3 / a2) : 5;
  };
  exports.unstable_getCurrentPriorityLevel = function() {
    return y2;
  };
  exports.unstable_getFirstCallbackNode = function() {
    return h2(r2);
  };
  exports.unstable_next = function(a2) {
    switch (y2) {
      case 1:
      case 2:
      case 3:
        var b2 = 3;
        break;
      default:
        b2 = y2;
    }
    var c2 = y2;
    y2 = b2;
    try {
      return a2();
    } finally {
      y2 = c2;
    }
  };
  exports.unstable_pauseExecution = function() {
  };
  exports.unstable_requestPaint = function() {
  };
  exports.unstable_runWithPriority = function(a2, b2) {
    switch (a2) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a2 = 3;
    }
    var c2 = y2;
    y2 = a2;
    try {
      return b2();
    } finally {
      y2 = c2;
    }
  };
  exports.unstable_scheduleCallback = function(a2, b2, c2) {
    var d2 = exports.unstable_now();
    typeof c2 === "object" && c2 !== null ? (c2 = c2.delay, c2 = typeof c2 === "number" && 0 < c2 ? d2 + c2 : d2) : c2 = d2;
    switch (a2) {
      case 1:
        var e2 = -1;
        break;
      case 2:
        e2 = 250;
        break;
      case 5:
        e2 = 1073741823;
        break;
      case 4:
        e2 = 1e4;
        break;
      default:
        e2 = 5e3;
    }
    e2 = c2 + e2;
    a2 = { id: u2++, callback: b2, priorityLevel: a2, startTime: c2, expirationTime: e2, sortIndex: -1 };
    c2 > d2 ? (a2.sortIndex = c2, f2(t2, a2), h2(r2) === null && a2 === h2(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c2 - d2))) : (a2.sortIndex = e2, f2(r2, a2), A2 || z2 || (A2 = true, I2(J2)));
    return a2;
  };
  exports.unstable_shouldYield = M2;
  exports.unstable_wrapCallback = function(a2) {
    var b2 = y2;
    return function() {
      var c2 = y2;
      y2 = b2;
      try {
        return a2.apply(this, arguments);
      } finally {
        y2 = c2;
      }
    };
  };
})(scheduler_production_min);
{
  scheduler.exports = scheduler_production_min;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = react.exports, ba = scheduler.exports;
function p$4(a2) {
  for (var b2 = "https://reactjs.org/docs/error-decoder.html?invariant=" + a2, c2 = 1; c2 < arguments.length; c2++)
    b2 += "&args[]=" + encodeURIComponent(arguments[c2]);
  return "Minified React error #" + a2 + "; visit " + b2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var ca = /* @__PURE__ */ new Set(), da = {};
function ea(a2, b2) {
  fa(a2, b2);
  fa(a2 + "Capture", b2);
}
function fa(a2, b2) {
  da[a2] = b2;
  for (a2 = 0; a2 < b2.length; a2++)
    ca.add(b2[a2]);
}
var ha = !(typeof window === "undefined" || typeof window.document === "undefined" || typeof window.document.createElement === "undefined"), ia = Object.prototype.hasOwnProperty, ja = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, ka = {}, la = {};
function ma(a2) {
  if (ia.call(la, a2))
    return true;
  if (ia.call(ka, a2))
    return false;
  if (ja.test(a2))
    return la[a2] = true;
  ka[a2] = true;
  return false;
}
function na(a2, b2, c2, d2) {
  if (c2 !== null && c2.type === 0)
    return false;
  switch (typeof b2) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d2)
        return false;
      if (c2 !== null)
        return !c2.acceptsBooleans;
      a2 = a2.toLowerCase().slice(0, 5);
      return a2 !== "data-" && a2 !== "aria-";
    default:
      return false;
  }
}
function oa(a2, b2, c2, d2) {
  if (b2 === null || typeof b2 === "undefined" || na(a2, b2, c2, d2))
    return true;
  if (d2)
    return false;
  if (c2 !== null)
    switch (c2.type) {
      case 3:
        return !b2;
      case 4:
        return b2 === false;
      case 5:
        return isNaN(b2);
      case 6:
        return isNaN(b2) || 1 > b2;
    }
  return false;
}
function q$4(a2, b2, c2, d2, e2, f2, g2) {
  this.acceptsBooleans = b2 === 2 || b2 === 3 || b2 === 4;
  this.attributeName = d2;
  this.attributeNamespace = e2;
  this.mustUseProperty = c2;
  this.propertyName = a2;
  this.type = b2;
  this.sanitizeURL = f2;
  this.removeEmptyString = g2;
}
var z$1 = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a2) {
  z$1[a2] = new q$4(a2, 0, false, a2, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a2) {
  var b2 = a2[0];
  z$1[b2] = new q$4(b2, 1, false, a2[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a2) {
  z$1[a2] = new q$4(a2, 2, false, a2.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a2) {
  z$1[a2] = new q$4(a2, 2, false, a2, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a2) {
  z$1[a2] = new q$4(a2, 3, false, a2.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a2) {
  z$1[a2] = new q$4(a2, 3, true, a2, null, false, false);
});
["capture", "download"].forEach(function(a2) {
  z$1[a2] = new q$4(a2, 4, false, a2, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a2) {
  z$1[a2] = new q$4(a2, 6, false, a2, null, false, false);
});
["rowSpan", "start"].forEach(function(a2) {
  z$1[a2] = new q$4(a2, 5, false, a2.toLowerCase(), null, false, false);
});
var pa = /[\-:]([a-z])/g;
function qa(a2) {
  return a2[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a2) {
  var b2 = a2.replace(pa, qa);
  z$1[b2] = new q$4(b2, 1, false, a2, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a2) {
  var b2 = a2.replace(pa, qa);
  z$1[b2] = new q$4(b2, 1, false, a2, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a2) {
  var b2 = a2.replace(pa, qa);
  z$1[b2] = new q$4(b2, 1, false, a2, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a2) {
  z$1[a2] = new q$4(a2, 1, false, a2.toLowerCase(), null, false, false);
});
z$1.xlinkHref = new q$4("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a2) {
  z$1[a2] = new q$4(a2, 1, false, a2.toLowerCase(), null, true, true);
});
function ra(a2, b2, c2, d2) {
  var e2 = z$1.hasOwnProperty(b2) ? z$1[b2] : null;
  if (e2 !== null ? e2.type !== 0 : d2 || !(2 < b2.length) || b2[0] !== "o" && b2[0] !== "O" || b2[1] !== "n" && b2[1] !== "N")
    oa(b2, c2, e2, d2) && (c2 = null), d2 || e2 === null ? ma(b2) && (c2 === null ? a2.removeAttribute(b2) : a2.setAttribute(b2, "" + c2)) : e2.mustUseProperty ? a2[e2.propertyName] = c2 === null ? e2.type === 3 ? false : "" : c2 : (b2 = e2.attributeName, d2 = e2.attributeNamespace, c2 === null ? a2.removeAttribute(b2) : (e2 = e2.type, c2 = e2 === 3 || e2 === 4 && c2 === true ? "" : "" + c2, d2 ? a2.setAttributeNS(d2, b2, c2) : a2.setAttribute(b2, c2)));
}
var sa = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, ta = Symbol.for("react.element"), ua = Symbol.for("react.portal"), va = Symbol.for("react.fragment"), wa = Symbol.for("react.strict_mode"), xa = Symbol.for("react.profiler"), ya = Symbol.for("react.provider"), Aa = Symbol.for("react.context"), Ba = Symbol.for("react.forward_ref"), Ca = Symbol.for("react.suspense"), Da = Symbol.for("react.suspense_list"), Ea = Symbol.for("react.memo"), Fa = Symbol.for("react.lazy");
var Ga = Symbol.for("react.offscreen");
var Ha = Symbol.iterator;
function Ia(a2) {
  if (a2 === null || typeof a2 !== "object")
    return null;
  a2 = Ha && a2[Ha] || a2["@@iterator"];
  return typeof a2 === "function" ? a2 : null;
}
var A$1 = Object.assign, Ja;
function Ka(a2) {
  if (Ja === void 0)
    try {
      throw Error();
    } catch (c2) {
      var b2 = c2.stack.trim().match(/\n( *(at )?)/);
      Ja = b2 && b2[1] || "";
    }
  return "\n" + Ja + a2;
}
var La = false;
function Ma(a2, b2) {
  if (!a2 || La)
    return "";
  La = true;
  var c2 = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b2)
      if (b2 = function() {
        throw Error();
      }, Object.defineProperty(b2.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect === "object" && Reflect.construct) {
        try {
          Reflect.construct(b2, []);
        } catch (l2) {
          var d2 = l2;
        }
        Reflect.construct(a2, [], b2);
      } else {
        try {
          b2.call();
        } catch (l2) {
          d2 = l2;
        }
        a2.call(b2.prototype);
      }
    else {
      try {
        throw Error();
      } catch (l2) {
        d2 = l2;
      }
      a2();
    }
  } catch (l2) {
    if (l2 && d2 && typeof l2.stack === "string") {
      for (var e2 = l2.stack.split("\n"), f2 = d2.stack.split("\n"), g2 = e2.length - 1, h2 = f2.length - 1; 1 <= g2 && 0 <= h2 && e2[g2] !== f2[h2]; )
        h2--;
      for (; 1 <= g2 && 0 <= h2; g2--, h2--)
        if (e2[g2] !== f2[h2]) {
          if (g2 !== 1 || h2 !== 1) {
            do
              if (g2--, h2--, 0 > h2 || e2[g2] !== f2[h2]) {
                var k2 = "\n" + e2[g2].replace(" at new ", " at ");
                a2.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a2.displayName));
                return k2;
              }
            while (1 <= g2 && 0 <= h2);
          }
          break;
        }
    }
  } finally {
    La = false, Error.prepareStackTrace = c2;
  }
  return (a2 = a2 ? a2.displayName || a2.name : "") ? Ka(a2) : "";
}
function Na(a2) {
  switch (a2.tag) {
    case 5:
      return Ka(a2.type);
    case 16:
      return Ka("Lazy");
    case 13:
      return Ka("Suspense");
    case 19:
      return Ka("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a2 = Ma(a2.type, false), a2;
    case 11:
      return a2 = Ma(a2.type.render, false), a2;
    case 1:
      return a2 = Ma(a2.type, true), a2;
    default:
      return "";
  }
}
function Oa(a2) {
  if (a2 == null)
    return null;
  if (typeof a2 === "function")
    return a2.displayName || a2.name || null;
  if (typeof a2 === "string")
    return a2;
  switch (a2) {
    case va:
      return "Fragment";
    case ua:
      return "Portal";
    case xa:
      return "Profiler";
    case wa:
      return "StrictMode";
    case Ca:
      return "Suspense";
    case Da:
      return "SuspenseList";
  }
  if (typeof a2 === "object")
    switch (a2.$$typeof) {
      case Aa:
        return (a2.displayName || "Context") + ".Consumer";
      case ya:
        return (a2._context.displayName || "Context") + ".Provider";
      case Ba:
        var b2 = a2.render;
        a2 = a2.displayName;
        a2 || (a2 = b2.displayName || b2.name || "", a2 = a2 !== "" ? "ForwardRef(" + a2 + ")" : "ForwardRef");
        return a2;
      case Ea:
        return b2 = a2.displayName || null, b2 !== null ? b2 : Oa(a2.type) || "Memo";
      case Fa:
        b2 = a2._payload;
        a2 = a2._init;
        try {
          return Oa(a2(b2));
        } catch (c2) {
        }
    }
  return null;
}
function Pa(a2) {
  var b2 = a2.type;
  switch (a2.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b2.displayName || "Context") + ".Consumer";
    case 10:
      return (b2._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a2 = b2.render, a2 = a2.displayName || a2.name || "", b2.displayName || (a2 !== "" ? "ForwardRef(" + a2 + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b2;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Oa(b2);
    case 8:
      return b2 === wa ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof b2 === "function")
        return b2.displayName || b2.name || null;
      if (typeof b2 === "string")
        return b2;
  }
  return null;
}
function Qa(a2) {
  switch (typeof a2) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a2;
    case "object":
      return a2;
    default:
      return "";
  }
}
function Ra(a2) {
  var b2 = a2.type;
  return (a2 = a2.nodeName) && a2.toLowerCase() === "input" && (b2 === "checkbox" || b2 === "radio");
}
function Sa(a2) {
  var b2 = Ra(a2) ? "checked" : "value", c2 = Object.getOwnPropertyDescriptor(a2.constructor.prototype, b2), d2 = "" + a2[b2];
  if (!a2.hasOwnProperty(b2) && typeof c2 !== "undefined" && typeof c2.get === "function" && typeof c2.set === "function") {
    var e2 = c2.get, f2 = c2.set;
    Object.defineProperty(a2, b2, { configurable: true, get: function() {
      return e2.call(this);
    }, set: function(a3) {
      d2 = "" + a3;
      f2.call(this, a3);
    } });
    Object.defineProperty(a2, b2, { enumerable: c2.enumerable });
    return { getValue: function() {
      return d2;
    }, setValue: function(a3) {
      d2 = "" + a3;
    }, stopTracking: function() {
      a2._valueTracker = null;
      delete a2[b2];
    } };
  }
}
function Ta(a2) {
  a2._valueTracker || (a2._valueTracker = Sa(a2));
}
function Ua(a2) {
  if (!a2)
    return false;
  var b2 = a2._valueTracker;
  if (!b2)
    return true;
  var c2 = b2.getValue();
  var d2 = "";
  a2 && (d2 = Ra(a2) ? a2.checked ? "true" : "false" : a2.value);
  a2 = d2;
  return a2 !== c2 ? (b2.setValue(a2), true) : false;
}
function Va(a2) {
  a2 = a2 || (typeof document !== "undefined" ? document : void 0);
  if (typeof a2 === "undefined")
    return null;
  try {
    return a2.activeElement || a2.body;
  } catch (b2) {
    return a2.body;
  }
}
function Wa(a2, b2) {
  var c2 = b2.checked;
  return A$1({}, b2, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: c2 != null ? c2 : a2._wrapperState.initialChecked });
}
function Xa(a2, b2) {
  var c2 = b2.defaultValue == null ? "" : b2.defaultValue, d2 = b2.checked != null ? b2.checked : b2.defaultChecked;
  c2 = Qa(b2.value != null ? b2.value : c2);
  a2._wrapperState = { initialChecked: d2, initialValue: c2, controlled: b2.type === "checkbox" || b2.type === "radio" ? b2.checked != null : b2.value != null };
}
function Ya(a2, b2) {
  b2 = b2.checked;
  b2 != null && ra(a2, "checked", b2, false);
}
function Za(a2, b2) {
  Ya(a2, b2);
  var c2 = Qa(b2.value), d2 = b2.type;
  if (c2 != null)
    if (d2 === "number") {
      if (c2 === 0 && a2.value === "" || a2.value != c2)
        a2.value = "" + c2;
    } else
      a2.value !== "" + c2 && (a2.value = "" + c2);
  else if (d2 === "submit" || d2 === "reset") {
    a2.removeAttribute("value");
    return;
  }
  b2.hasOwnProperty("value") ? $a(a2, b2.type, c2) : b2.hasOwnProperty("defaultValue") && $a(a2, b2.type, Qa(b2.defaultValue));
  b2.checked == null && b2.defaultChecked != null && (a2.defaultChecked = !!b2.defaultChecked);
}
function ab(a2, b2, c2) {
  if (b2.hasOwnProperty("value") || b2.hasOwnProperty("defaultValue")) {
    var d2 = b2.type;
    if (!(d2 !== "submit" && d2 !== "reset" || b2.value !== void 0 && b2.value !== null))
      return;
    b2 = "" + a2._wrapperState.initialValue;
    c2 || b2 === a2.value || (a2.value = b2);
    a2.defaultValue = b2;
  }
  c2 = a2.name;
  c2 !== "" && (a2.name = "");
  a2.defaultChecked = !!a2._wrapperState.initialChecked;
  c2 !== "" && (a2.name = c2);
}
function $a(a2, b2, c2) {
  if (b2 !== "number" || Va(a2.ownerDocument) !== a2)
    c2 == null ? a2.defaultValue = "" + a2._wrapperState.initialValue : a2.defaultValue !== "" + c2 && (a2.defaultValue = "" + c2);
}
var bb = Array.isArray;
function cb(a2, b2, c2, d2) {
  a2 = a2.options;
  if (b2) {
    b2 = {};
    for (var e2 = 0; e2 < c2.length; e2++)
      b2["$" + c2[e2]] = true;
    for (c2 = 0; c2 < a2.length; c2++)
      e2 = b2.hasOwnProperty("$" + a2[c2].value), a2[c2].selected !== e2 && (a2[c2].selected = e2), e2 && d2 && (a2[c2].defaultSelected = true);
  } else {
    c2 = "" + Qa(c2);
    b2 = null;
    for (e2 = 0; e2 < a2.length; e2++) {
      if (a2[e2].value === c2) {
        a2[e2].selected = true;
        d2 && (a2[e2].defaultSelected = true);
        return;
      }
      b2 !== null || a2[e2].disabled || (b2 = a2[e2]);
    }
    b2 !== null && (b2.selected = true);
  }
}
function db(a2, b2) {
  if (b2.dangerouslySetInnerHTML != null)
    throw Error(p$4(91));
  return A$1({}, b2, { value: void 0, defaultValue: void 0, children: "" + a2._wrapperState.initialValue });
}
function eb(a2, b2) {
  var c2 = b2.value;
  if (c2 == null) {
    c2 = b2.children;
    b2 = b2.defaultValue;
    if (c2 != null) {
      if (b2 != null)
        throw Error(p$4(92));
      if (bb(c2)) {
        if (1 < c2.length)
          throw Error(p$4(93));
        c2 = c2[0];
      }
      b2 = c2;
    }
    b2 == null && (b2 = "");
    c2 = b2;
  }
  a2._wrapperState = { initialValue: Qa(c2) };
}
function fb(a2, b2) {
  var c2 = Qa(b2.value), d2 = Qa(b2.defaultValue);
  c2 != null && (c2 = "" + c2, c2 !== a2.value && (a2.value = c2), b2.defaultValue == null && a2.defaultValue !== c2 && (a2.defaultValue = c2));
  d2 != null && (a2.defaultValue = "" + d2);
}
function gb(a2) {
  var b2 = a2.textContent;
  b2 === a2._wrapperState.initialValue && b2 !== "" && b2 !== null && (a2.value = b2);
}
function hb(a2) {
  switch (a2) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function ib(a2, b2) {
  return a2 == null || a2 === "http://www.w3.org/1999/xhtml" ? hb(b2) : a2 === "http://www.w3.org/2000/svg" && b2 === "foreignObject" ? "http://www.w3.org/1999/xhtml" : a2;
}
var jb, kb = function(a2) {
  return typeof MSApp !== "undefined" && MSApp.execUnsafeLocalFunction ? function(b2, c2, d2, e2) {
    MSApp.execUnsafeLocalFunction(function() {
      return a2(b2, c2, d2, e2);
    });
  } : a2;
}(function(a2, b2) {
  if (a2.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in a2)
    a2.innerHTML = b2;
  else {
    jb = jb || document.createElement("div");
    jb.innerHTML = "<svg>" + b2.valueOf().toString() + "</svg>";
    for (b2 = jb.firstChild; a2.firstChild; )
      a2.removeChild(a2.firstChild);
    for (; b2.firstChild; )
      a2.appendChild(b2.firstChild);
  }
});
function lb(a2, b2) {
  if (b2) {
    var c2 = a2.firstChild;
    if (c2 && c2 === a2.lastChild && c2.nodeType === 3) {
      c2.nodeValue = b2;
      return;
    }
  }
  a2.textContent = b2;
}
var mb = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, nb = ["Webkit", "ms", "Moz", "O"];
Object.keys(mb).forEach(function(a2) {
  nb.forEach(function(b2) {
    b2 = b2 + a2.charAt(0).toUpperCase() + a2.substring(1);
    mb[b2] = mb[a2];
  });
});
function ob(a2, b2, c2) {
  return b2 == null || typeof b2 === "boolean" || b2 === "" ? "" : c2 || typeof b2 !== "number" || b2 === 0 || mb.hasOwnProperty(a2) && mb[a2] ? ("" + b2).trim() : b2 + "px";
}
function pb(a2, b2) {
  a2 = a2.style;
  for (var c2 in b2)
    if (b2.hasOwnProperty(c2)) {
      var d2 = c2.indexOf("--") === 0, e2 = ob(c2, b2[c2], d2);
      c2 === "float" && (c2 = "cssFloat");
      d2 ? a2.setProperty(c2, e2) : a2[c2] = e2;
    }
}
var qb = A$1({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function rb(a2, b2) {
  if (b2) {
    if (qb[a2] && (b2.children != null || b2.dangerouslySetInnerHTML != null))
      throw Error(p$4(137, a2));
    if (b2.dangerouslySetInnerHTML != null) {
      if (b2.children != null)
        throw Error(p$4(60));
      if (typeof b2.dangerouslySetInnerHTML !== "object" || !("__html" in b2.dangerouslySetInnerHTML))
        throw Error(p$4(61));
    }
    if (b2.style != null && typeof b2.style !== "object")
      throw Error(p$4(62));
  }
}
function sb(a2, b2) {
  if (a2.indexOf("-") === -1)
    return typeof b2.is === "string";
  switch (a2) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var tb = null;
function ub(a2) {
  a2 = a2.target || a2.srcElement || window;
  a2.correspondingUseElement && (a2 = a2.correspondingUseElement);
  return a2.nodeType === 3 ? a2.parentNode : a2;
}
var vb = null, wb = null, xb = null;
function yb(a2) {
  if (a2 = zb(a2)) {
    if (typeof vb !== "function")
      throw Error(p$4(280));
    var b2 = a2.stateNode;
    b2 && (b2 = Ab(b2), vb(a2.stateNode, a2.type, b2));
  }
}
function Bb(a2) {
  wb ? xb ? xb.push(a2) : xb = [a2] : wb = a2;
}
function Cb() {
  if (wb) {
    var a2 = wb, b2 = xb;
    xb = wb = null;
    yb(a2);
    if (b2)
      for (a2 = 0; a2 < b2.length; a2++)
        yb(b2[a2]);
  }
}
function Db(a2, b2) {
  return a2(b2);
}
function Eb() {
}
var Fb = false;
function Gb(a2, b2, c2) {
  if (Fb)
    return a2(b2, c2);
  Fb = true;
  try {
    return Db(a2, b2, c2);
  } finally {
    if (Fb = false, wb !== null || xb !== null)
      Eb(), Cb();
  }
}
function Hb(a2, b2) {
  var c2 = a2.stateNode;
  if (c2 === null)
    return null;
  var d2 = Ab(c2);
  if (d2 === null)
    return null;
  c2 = d2[b2];
  a:
    switch (b2) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (d2 = !d2.disabled) || (a2 = a2.type, d2 = !(a2 === "button" || a2 === "input" || a2 === "select" || a2 === "textarea"));
        a2 = !d2;
        break a;
      default:
        a2 = false;
    }
  if (a2)
    return null;
  if (c2 && typeof c2 !== "function")
    throw Error(p$4(231, b2, typeof c2));
  return c2;
}
var Ib = false;
if (ha)
  try {
    var Jb = {};
    Object.defineProperty(Jb, "passive", { get: function() {
      Ib = true;
    } });
    window.addEventListener("test", Jb, Jb);
    window.removeEventListener("test", Jb, Jb);
  } catch (a2) {
    Ib = false;
  }
function Kb(a2, b2, c2, d2, e2, f2, g2, h2, k2) {
  var l2 = Array.prototype.slice.call(arguments, 3);
  try {
    b2.apply(c2, l2);
  } catch (m2) {
    this.onError(m2);
  }
}
var Lb = false, Mb = null, Nb = false, Ob = null, Pb = { onError: function(a2) {
  Lb = true;
  Mb = a2;
} };
function Qb(a2, b2, c2, d2, e2, f2, g2, h2, k2) {
  Lb = false;
  Mb = null;
  Kb.apply(Pb, arguments);
}
function Rb(a2, b2, c2, d2, e2, f2, g2, h2, k2) {
  Qb.apply(this, arguments);
  if (Lb) {
    if (Lb) {
      var l2 = Mb;
      Lb = false;
      Mb = null;
    } else
      throw Error(p$4(198));
    Nb || (Nb = true, Ob = l2);
  }
}
function Sb(a2) {
  var b2 = a2, c2 = a2;
  if (a2.alternate)
    for (; b2.return; )
      b2 = b2.return;
  else {
    a2 = b2;
    do
      b2 = a2, (b2.flags & 4098) !== 0 && (c2 = b2.return), a2 = b2.return;
    while (a2);
  }
  return b2.tag === 3 ? c2 : null;
}
function Tb(a2) {
  if (a2.tag === 13) {
    var b2 = a2.memoizedState;
    b2 === null && (a2 = a2.alternate, a2 !== null && (b2 = a2.memoizedState));
    if (b2 !== null)
      return b2.dehydrated;
  }
  return null;
}
function Ub(a2) {
  if (Sb(a2) !== a2)
    throw Error(p$4(188));
}
function Vb(a2) {
  var b2 = a2.alternate;
  if (!b2) {
    b2 = Sb(a2);
    if (b2 === null)
      throw Error(p$4(188));
    return b2 !== a2 ? null : a2;
  }
  for (var c2 = a2, d2 = b2; ; ) {
    var e2 = c2.return;
    if (e2 === null)
      break;
    var f2 = e2.alternate;
    if (f2 === null) {
      d2 = e2.return;
      if (d2 !== null) {
        c2 = d2;
        continue;
      }
      break;
    }
    if (e2.child === f2.child) {
      for (f2 = e2.child; f2; ) {
        if (f2 === c2)
          return Ub(e2), a2;
        if (f2 === d2)
          return Ub(e2), b2;
        f2 = f2.sibling;
      }
      throw Error(p$4(188));
    }
    if (c2.return !== d2.return)
      c2 = e2, d2 = f2;
    else {
      for (var g2 = false, h2 = e2.child; h2; ) {
        if (h2 === c2) {
          g2 = true;
          c2 = e2;
          d2 = f2;
          break;
        }
        if (h2 === d2) {
          g2 = true;
          d2 = e2;
          c2 = f2;
          break;
        }
        h2 = h2.sibling;
      }
      if (!g2) {
        for (h2 = f2.child; h2; ) {
          if (h2 === c2) {
            g2 = true;
            c2 = f2;
            d2 = e2;
            break;
          }
          if (h2 === d2) {
            g2 = true;
            d2 = f2;
            c2 = e2;
            break;
          }
          h2 = h2.sibling;
        }
        if (!g2)
          throw Error(p$4(189));
      }
    }
    if (c2.alternate !== d2)
      throw Error(p$4(190));
  }
  if (c2.tag !== 3)
    throw Error(p$4(188));
  return c2.stateNode.current === c2 ? a2 : b2;
}
function Wb(a2) {
  a2 = Vb(a2);
  return a2 !== null ? Xb(a2) : null;
}
function Xb(a2) {
  if (a2.tag === 5 || a2.tag === 6)
    return a2;
  for (a2 = a2.child; a2 !== null; ) {
    var b2 = Xb(a2);
    if (b2 !== null)
      return b2;
    a2 = a2.sibling;
  }
  return null;
}
var Yb = ba.unstable_scheduleCallback, Zb = ba.unstable_cancelCallback, $b = ba.unstable_shouldYield, ac = ba.unstable_requestPaint, D$1 = ba.unstable_now, bc = ba.unstable_getCurrentPriorityLevel, cc = ba.unstable_ImmediatePriority, dc = ba.unstable_UserBlockingPriority, ec = ba.unstable_NormalPriority, fc = ba.unstable_LowPriority, gc = ba.unstable_IdlePriority, hc = null, ic = null;
function jc(a2) {
  if (ic && typeof ic.onCommitFiberRoot === "function")
    try {
      ic.onCommitFiberRoot(hc, a2, void 0, (a2.current.flags & 128) === 128);
    } catch (b2) {
    }
}
var lc = Math.clz32 ? Math.clz32 : kc, mc = Math.log, nc = Math.LN2;
function kc(a2) {
  a2 >>>= 0;
  return a2 === 0 ? 32 : 31 - (mc(a2) / nc | 0) | 0;
}
var oc = 64, pc = 4194304;
function qc(a2) {
  switch (a2 & -a2) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a2 & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a2 & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a2;
  }
}
function rc(a2, b2) {
  var c2 = a2.pendingLanes;
  if (c2 === 0)
    return 0;
  var d2 = 0, e2 = a2.suspendedLanes, f2 = a2.pingedLanes, g2 = c2 & 268435455;
  if (g2 !== 0) {
    var h2 = g2 & ~e2;
    h2 !== 0 ? d2 = qc(h2) : (f2 &= g2, f2 !== 0 && (d2 = qc(f2)));
  } else
    g2 = c2 & ~e2, g2 !== 0 ? d2 = qc(g2) : f2 !== 0 && (d2 = qc(f2));
  if (d2 === 0)
    return 0;
  if (b2 !== 0 && b2 !== d2 && (b2 & e2) === 0 && (e2 = d2 & -d2, f2 = b2 & -b2, e2 >= f2 || e2 === 16 && (f2 & 4194240) !== 0))
    return b2;
  (d2 & 4) !== 0 && (d2 |= c2 & 16);
  b2 = a2.entangledLanes;
  if (b2 !== 0)
    for (a2 = a2.entanglements, b2 &= d2; 0 < b2; )
      c2 = 31 - lc(b2), e2 = 1 << c2, d2 |= a2[c2], b2 &= ~e2;
  return d2;
}
function sc(a2, b2) {
  switch (a2) {
    case 1:
    case 2:
    case 4:
      return b2 + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return b2 + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function tc(a2, b2) {
  for (var c2 = a2.suspendedLanes, d2 = a2.pingedLanes, e2 = a2.expirationTimes, f2 = a2.pendingLanes; 0 < f2; ) {
    var g2 = 31 - lc(f2), h2 = 1 << g2, k2 = e2[g2];
    if (k2 === -1) {
      if ((h2 & c2) === 0 || (h2 & d2) !== 0)
        e2[g2] = sc(h2, b2);
    } else
      k2 <= b2 && (a2.expiredLanes |= h2);
    f2 &= ~h2;
  }
}
function uc(a2) {
  a2 = a2.pendingLanes & -1073741825;
  return a2 !== 0 ? a2 : a2 & 1073741824 ? 1073741824 : 0;
}
function vc(a2) {
  for (var b2 = [], c2 = 0; 31 > c2; c2++)
    b2.push(a2);
  return b2;
}
function wc(a2, b2, c2) {
  a2.pendingLanes |= b2;
  b2 !== 536870912 && (a2.suspendedLanes = 0, a2.pingedLanes = 0);
  a2 = a2.eventTimes;
  b2 = 31 - lc(b2);
  a2[b2] = c2;
}
function xc(a2, b2) {
  var c2 = a2.pendingLanes & ~b2;
  a2.pendingLanes = b2;
  a2.suspendedLanes = 0;
  a2.pingedLanes = 0;
  a2.expiredLanes &= b2;
  a2.mutableReadLanes &= b2;
  a2.entangledLanes &= b2;
  b2 = a2.entanglements;
  var d2 = a2.eventTimes;
  for (a2 = a2.expirationTimes; 0 < c2; ) {
    var e2 = 31 - lc(c2), f2 = 1 << e2;
    b2[e2] = 0;
    d2[e2] = -1;
    a2[e2] = -1;
    c2 &= ~f2;
  }
}
function yc(a2, b2) {
  var c2 = a2.entangledLanes |= b2;
  for (a2 = a2.entanglements; c2; ) {
    var d2 = 31 - lc(c2), e2 = 1 << d2;
    e2 & b2 | a2[d2] & b2 && (a2[d2] |= b2);
    c2 &= ~e2;
  }
}
var E$1 = 0;
function zc(a2) {
  a2 &= -a2;
  return 1 < a2 ? 4 < a2 ? (a2 & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
}
var Ac, Bc, Cc, Dc, Ec, Fc = false, Gc = [], Hc = null, Ic = null, Jc = null, Kc = /* @__PURE__ */ new Map(), Lc = /* @__PURE__ */ new Map(), Mc = [], Nc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Oc(a2, b2) {
  switch (a2) {
    case "focusin":
    case "focusout":
      Hc = null;
      break;
    case "dragenter":
    case "dragleave":
      Ic = null;
      break;
    case "mouseover":
    case "mouseout":
      Jc = null;
      break;
    case "pointerover":
    case "pointerout":
      Kc.delete(b2.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Lc.delete(b2.pointerId);
  }
}
function Pc(a2, b2, c2, d2, e2, f2) {
  if (a2 === null || a2.nativeEvent !== f2)
    return a2 = { blockedOn: b2, domEventName: c2, eventSystemFlags: d2, nativeEvent: f2, targetContainers: [e2] }, b2 !== null && (b2 = zb(b2), b2 !== null && Bc(b2)), a2;
  a2.eventSystemFlags |= d2;
  b2 = a2.targetContainers;
  e2 !== null && b2.indexOf(e2) === -1 && b2.push(e2);
  return a2;
}
function Qc(a2, b2, c2, d2, e2) {
  switch (b2) {
    case "focusin":
      return Hc = Pc(Hc, a2, b2, c2, d2, e2), true;
    case "dragenter":
      return Ic = Pc(Ic, a2, b2, c2, d2, e2), true;
    case "mouseover":
      return Jc = Pc(Jc, a2, b2, c2, d2, e2), true;
    case "pointerover":
      var f2 = e2.pointerId;
      Kc.set(f2, Pc(Kc.get(f2) || null, a2, b2, c2, d2, e2));
      return true;
    case "gotpointercapture":
      return f2 = e2.pointerId, Lc.set(f2, Pc(Lc.get(f2) || null, a2, b2, c2, d2, e2)), true;
  }
  return false;
}
function Rc(a2) {
  var b2 = Sc(a2.target);
  if (b2 !== null) {
    var c2 = Sb(b2);
    if (c2 !== null) {
      if (b2 = c2.tag, b2 === 13) {
        if (b2 = Tb(c2), b2 !== null) {
          a2.blockedOn = b2;
          Ec(a2.priority, function() {
            Cc(c2);
          });
          return;
        }
      } else if (b2 === 3 && c2.stateNode.current.memoizedState.isDehydrated) {
        a2.blockedOn = c2.tag === 3 ? c2.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a2.blockedOn = null;
}
function Tc(a2) {
  if (a2.blockedOn !== null)
    return false;
  for (var b2 = a2.targetContainers; 0 < b2.length; ) {
    var c2 = Uc(a2.domEventName, a2.eventSystemFlags, b2[0], a2.nativeEvent);
    if (c2 === null) {
      c2 = a2.nativeEvent;
      var d2 = new c2.constructor(c2.type, c2);
      tb = d2;
      c2.target.dispatchEvent(d2);
      tb = null;
    } else
      return b2 = zb(c2), b2 !== null && Bc(b2), a2.blockedOn = c2, false;
    b2.shift();
  }
  return true;
}
function Vc(a2, b2, c2) {
  Tc(a2) && c2.delete(b2);
}
function Wc() {
  Fc = false;
  Hc !== null && Tc(Hc) && (Hc = null);
  Ic !== null && Tc(Ic) && (Ic = null);
  Jc !== null && Tc(Jc) && (Jc = null);
  Kc.forEach(Vc);
  Lc.forEach(Vc);
}
function Xc(a2, b2) {
  a2.blockedOn === b2 && (a2.blockedOn = null, Fc || (Fc = true, ba.unstable_scheduleCallback(ba.unstable_NormalPriority, Wc)));
}
function Yc(a2) {
  function b2(b3) {
    return Xc(b3, a2);
  }
  if (0 < Gc.length) {
    Xc(Gc[0], a2);
    for (var c2 = 1; c2 < Gc.length; c2++) {
      var d2 = Gc[c2];
      d2.blockedOn === a2 && (d2.blockedOn = null);
    }
  }
  Hc !== null && Xc(Hc, a2);
  Ic !== null && Xc(Ic, a2);
  Jc !== null && Xc(Jc, a2);
  Kc.forEach(b2);
  Lc.forEach(b2);
  for (c2 = 0; c2 < Mc.length; c2++)
    d2 = Mc[c2], d2.blockedOn === a2 && (d2.blockedOn = null);
  for (; 0 < Mc.length && (c2 = Mc[0], c2.blockedOn === null); )
    Rc(c2), c2.blockedOn === null && Mc.shift();
}
var Zc = sa.ReactCurrentBatchConfig;
function $c(a2, b2, c2, d2) {
  var e2 = E$1, f2 = Zc.transition;
  Zc.transition = null;
  try {
    E$1 = 1, ad(a2, b2, c2, d2);
  } finally {
    E$1 = e2, Zc.transition = f2;
  }
}
function bd(a2, b2, c2, d2) {
  var e2 = E$1, f2 = Zc.transition;
  Zc.transition = null;
  try {
    E$1 = 4, ad(a2, b2, c2, d2);
  } finally {
    E$1 = e2, Zc.transition = f2;
  }
}
function ad(a2, b2, c2, d2) {
  var e2 = Uc(a2, b2, c2, d2);
  if (e2 === null)
    cd(a2, b2, d2, dd, c2), Oc(a2, d2);
  else if (Qc(e2, a2, b2, c2, d2))
    d2.stopPropagation();
  else if (Oc(a2, d2), b2 & 4 && -1 < Nc.indexOf(a2)) {
    for (; e2 !== null; ) {
      var f2 = zb(e2);
      f2 !== null && Ac(f2);
      f2 = Uc(a2, b2, c2, d2);
      f2 === null && cd(a2, b2, d2, dd, c2);
      if (f2 === e2)
        break;
      e2 = f2;
    }
    e2 !== null && d2.stopPropagation();
  } else
    cd(a2, b2, d2, null, c2);
}
var dd = null;
function Uc(a2, b2, c2, d2) {
  dd = null;
  a2 = ub(d2);
  a2 = Sc(a2);
  if (a2 !== null)
    if (b2 = Sb(a2), b2 === null)
      a2 = null;
    else if (c2 = b2.tag, c2 === 13) {
      a2 = Tb(b2);
      if (a2 !== null)
        return a2;
      a2 = null;
    } else if (c2 === 3) {
      if (b2.stateNode.current.memoizedState.isDehydrated)
        return b2.tag === 3 ? b2.stateNode.containerInfo : null;
      a2 = null;
    } else
      b2 !== a2 && (a2 = null);
  dd = a2;
  return null;
}
function ed(a2) {
  switch (a2) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (bc()) {
        case cc:
          return 1;
        case dc:
          return 4;
        case ec:
        case fc:
          return 16;
        case gc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var fd = null, gd = null, hd = null;
function id() {
  if (hd)
    return hd;
  var a2, b2 = gd, c2 = b2.length, d2, e2 = "value" in fd ? fd.value : fd.textContent, f2 = e2.length;
  for (a2 = 0; a2 < c2 && b2[a2] === e2[a2]; a2++)
    ;
  var g2 = c2 - a2;
  for (d2 = 1; d2 <= g2 && b2[c2 - d2] === e2[f2 - d2]; d2++)
    ;
  return hd = e2.slice(a2, 1 < d2 ? 1 - d2 : void 0);
}
function jd(a2) {
  var b2 = a2.keyCode;
  "charCode" in a2 ? (a2 = a2.charCode, a2 === 0 && b2 === 13 && (a2 = 13)) : a2 = b2;
  a2 === 10 && (a2 = 13);
  return 32 <= a2 || a2 === 13 ? a2 : 0;
}
function kd() {
  return true;
}
function ld() {
  return false;
}
function md(a2) {
  function b2(b3, d2, e2, f2, g2) {
    this._reactName = b3;
    this._targetInst = e2;
    this.type = d2;
    this.nativeEvent = f2;
    this.target = g2;
    this.currentTarget = null;
    for (var c2 in a2)
      a2.hasOwnProperty(c2) && (b3 = a2[c2], this[c2] = b3 ? b3(f2) : f2[c2]);
    this.isDefaultPrevented = (f2.defaultPrevented != null ? f2.defaultPrevented : f2.returnValue === false) ? kd : ld;
    this.isPropagationStopped = ld;
    return this;
  }
  A$1(b2.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a3 = this.nativeEvent;
    a3 && (a3.preventDefault ? a3.preventDefault() : typeof a3.returnValue !== "unknown" && (a3.returnValue = false), this.isDefaultPrevented = kd);
  }, stopPropagation: function() {
    var a3 = this.nativeEvent;
    a3 && (a3.stopPropagation ? a3.stopPropagation() : typeof a3.cancelBubble !== "unknown" && (a3.cancelBubble = true), this.isPropagationStopped = kd);
  }, persist: function() {
  }, isPersistent: kd });
  return b2;
}
var nd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a2) {
  return a2.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, od = md(nd), pd = A$1({}, nd, { view: 0, detail: 0 }), qd = md(pd), rd, sd, td, vd = A$1({}, pd, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: ud, button: 0, buttons: 0, relatedTarget: function(a2) {
  return a2.relatedTarget === void 0 ? a2.fromElement === a2.srcElement ? a2.toElement : a2.fromElement : a2.relatedTarget;
}, movementX: function(a2) {
  if ("movementX" in a2)
    return a2.movementX;
  a2 !== td && (td && a2.type === "mousemove" ? (rd = a2.screenX - td.screenX, sd = a2.screenY - td.screenY) : sd = rd = 0, td = a2);
  return rd;
}, movementY: function(a2) {
  return "movementY" in a2 ? a2.movementY : sd;
} }), wd = md(vd), xd = A$1({}, vd, { dataTransfer: 0 }), yd = md(xd), zd = A$1({}, pd, { relatedTarget: 0 }), Ad = md(zd), Bd = A$1({}, nd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Cd = md(Bd), Dd = A$1({}, nd, { clipboardData: function(a2) {
  return "clipboardData" in a2 ? a2.clipboardData : window.clipboardData;
} }), Ed = md(Dd), Fd = A$1({}, nd, { data: 0 }), Gd = md(Fd), Hd = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Id = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Jd = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Kd(a2) {
  var b2 = this.nativeEvent;
  return b2.getModifierState ? b2.getModifierState(a2) : (a2 = Jd[a2]) ? !!b2[a2] : false;
}
function ud() {
  return Kd;
}
var Ld = A$1({}, pd, { key: function(a2) {
  if (a2.key) {
    var b2 = Hd[a2.key] || a2.key;
    if (b2 !== "Unidentified")
      return b2;
  }
  return a2.type === "keypress" ? (a2 = jd(a2), a2 === 13 ? "Enter" : String.fromCharCode(a2)) : a2.type === "keydown" || a2.type === "keyup" ? Id[a2.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: ud, charCode: function(a2) {
  return a2.type === "keypress" ? jd(a2) : 0;
}, keyCode: function(a2) {
  return a2.type === "keydown" || a2.type === "keyup" ? a2.keyCode : 0;
}, which: function(a2) {
  return a2.type === "keypress" ? jd(a2) : a2.type === "keydown" || a2.type === "keyup" ? a2.keyCode : 0;
} }), Md = md(Ld), Nd = A$1({}, vd, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Od = md(Nd), Pd = A$1({}, pd, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: ud }), Qd = md(Pd), Rd = A$1({}, nd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Sd = md(Rd), Td = A$1({}, vd, {
  deltaX: function(a2) {
    return "deltaX" in a2 ? a2.deltaX : "wheelDeltaX" in a2 ? -a2.wheelDeltaX : 0;
  },
  deltaY: function(a2) {
    return "deltaY" in a2 ? a2.deltaY : "wheelDeltaY" in a2 ? -a2.wheelDeltaY : "wheelDelta" in a2 ? -a2.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Ud = md(Td), Vd = [9, 13, 27, 32], Wd = ha && "CompositionEvent" in window, Xd = null;
ha && "documentMode" in document && (Xd = document.documentMode);
var Yd = ha && "TextEvent" in window && !Xd, Zd = ha && (!Wd || Xd && 8 < Xd && 11 >= Xd), $d = String.fromCharCode(32), ae = false;
function be(a2, b2) {
  switch (a2) {
    case "keyup":
      return Vd.indexOf(b2.keyCode) !== -1;
    case "keydown":
      return b2.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function ce(a2) {
  a2 = a2.detail;
  return typeof a2 === "object" && "data" in a2 ? a2.data : null;
}
var de = false;
function ee(a2, b2) {
  switch (a2) {
    case "compositionend":
      return ce(b2);
    case "keypress":
      if (b2.which !== 32)
        return null;
      ae = true;
      return $d;
    case "textInput":
      return a2 = b2.data, a2 === $d && ae ? null : a2;
    default:
      return null;
  }
}
function fe(a2, b2) {
  if (de)
    return a2 === "compositionend" || !Wd && be(a2, b2) ? (a2 = id(), hd = gd = fd = null, de = false, a2) : null;
  switch (a2) {
    case "paste":
      return null;
    case "keypress":
      if (!(b2.ctrlKey || b2.altKey || b2.metaKey) || b2.ctrlKey && b2.altKey) {
        if (b2.char && 1 < b2.char.length)
          return b2.char;
        if (b2.which)
          return String.fromCharCode(b2.which);
      }
      return null;
    case "compositionend":
      return Zd && b2.locale !== "ko" ? null : b2.data;
    default:
      return null;
  }
}
var ge = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function he(a2) {
  var b2 = a2 && a2.nodeName && a2.nodeName.toLowerCase();
  return b2 === "input" ? !!ge[a2.type] : b2 === "textarea" ? true : false;
}
function ie(a2, b2, c2, d2) {
  Bb(d2);
  b2 = je(b2, "onChange");
  0 < b2.length && (c2 = new od("onChange", "change", null, c2, d2), a2.push({ event: c2, listeners: b2 }));
}
var ke = null, le = null;
function me(a2) {
  ne(a2, 0);
}
function oe(a2) {
  var b2 = pe(a2);
  if (Ua(b2))
    return a2;
}
function qe(a2, b2) {
  if (a2 === "change")
    return b2;
}
var re = false;
if (ha) {
  var se;
  if (ha) {
    var te = "oninput" in document;
    if (!te) {
      var ue = document.createElement("div");
      ue.setAttribute("oninput", "return;");
      te = typeof ue.oninput === "function";
    }
    se = te;
  } else
    se = false;
  re = se && (!document.documentMode || 9 < document.documentMode);
}
function ve() {
  ke && (ke.detachEvent("onpropertychange", we), le = ke = null);
}
function we(a2) {
  if (a2.propertyName === "value" && oe(le)) {
    var b2 = [];
    ie(b2, le, a2, ub(a2));
    Gb(me, b2);
  }
}
function xe(a2, b2, c2) {
  a2 === "focusin" ? (ve(), ke = b2, le = c2, ke.attachEvent("onpropertychange", we)) : a2 === "focusout" && ve();
}
function ye(a2) {
  if (a2 === "selectionchange" || a2 === "keyup" || a2 === "keydown")
    return oe(le);
}
function ze(a2, b2) {
  if (a2 === "click")
    return oe(b2);
}
function Ae(a2, b2) {
  if (a2 === "input" || a2 === "change")
    return oe(b2);
}
function Be(a2, b2) {
  return a2 === b2 && (a2 !== 0 || 1 / a2 === 1 / b2) || a2 !== a2 && b2 !== b2;
}
var Ce = typeof Object.is === "function" ? Object.is : Be;
function De(a2, b2) {
  if (Ce(a2, b2))
    return true;
  if (typeof a2 !== "object" || a2 === null || typeof b2 !== "object" || b2 === null)
    return false;
  var c2 = Object.keys(a2), d2 = Object.keys(b2);
  if (c2.length !== d2.length)
    return false;
  for (d2 = 0; d2 < c2.length; d2++) {
    var e2 = c2[d2];
    if (!ia.call(b2, e2) || !Ce(a2[e2], b2[e2]))
      return false;
  }
  return true;
}
function Ee(a2) {
  for (; a2 && a2.firstChild; )
    a2 = a2.firstChild;
  return a2;
}
function Fe(a2, b2) {
  var c2 = Ee(a2);
  a2 = 0;
  for (var d2; c2; ) {
    if (c2.nodeType === 3) {
      d2 = a2 + c2.textContent.length;
      if (a2 <= b2 && d2 >= b2)
        return { node: c2, offset: b2 - a2 };
      a2 = d2;
    }
    a: {
      for (; c2; ) {
        if (c2.nextSibling) {
          c2 = c2.nextSibling;
          break a;
        }
        c2 = c2.parentNode;
      }
      c2 = void 0;
    }
    c2 = Ee(c2);
  }
}
function Ge(a2, b2) {
  return a2 && b2 ? a2 === b2 ? true : a2 && a2.nodeType === 3 ? false : b2 && b2.nodeType === 3 ? Ge(a2, b2.parentNode) : "contains" in a2 ? a2.contains(b2) : a2.compareDocumentPosition ? !!(a2.compareDocumentPosition(b2) & 16) : false : false;
}
function He() {
  for (var a2 = window, b2 = Va(); b2 instanceof a2.HTMLIFrameElement; ) {
    try {
      var c2 = typeof b2.contentWindow.location.href === "string";
    } catch (d2) {
      c2 = false;
    }
    if (c2)
      a2 = b2.contentWindow;
    else
      break;
    b2 = Va(a2.document);
  }
  return b2;
}
function Ie(a2) {
  var b2 = a2 && a2.nodeName && a2.nodeName.toLowerCase();
  return b2 && (b2 === "input" && (a2.type === "text" || a2.type === "search" || a2.type === "tel" || a2.type === "url" || a2.type === "password") || b2 === "textarea" || a2.contentEditable === "true");
}
function Je(a2) {
  var b2 = He(), c2 = a2.focusedElem, d2 = a2.selectionRange;
  if (b2 !== c2 && c2 && c2.ownerDocument && Ge(c2.ownerDocument.documentElement, c2)) {
    if (d2 !== null && Ie(c2)) {
      if (b2 = d2.start, a2 = d2.end, a2 === void 0 && (a2 = b2), "selectionStart" in c2)
        c2.selectionStart = b2, c2.selectionEnd = Math.min(a2, c2.value.length);
      else if (a2 = (b2 = c2.ownerDocument || document) && b2.defaultView || window, a2.getSelection) {
        a2 = a2.getSelection();
        var e2 = c2.textContent.length, f2 = Math.min(d2.start, e2);
        d2 = d2.end === void 0 ? f2 : Math.min(d2.end, e2);
        !a2.extend && f2 > d2 && (e2 = d2, d2 = f2, f2 = e2);
        e2 = Fe(c2, f2);
        var g2 = Fe(c2, d2);
        e2 && g2 && (a2.rangeCount !== 1 || a2.anchorNode !== e2.node || a2.anchorOffset !== e2.offset || a2.focusNode !== g2.node || a2.focusOffset !== g2.offset) && (b2 = b2.createRange(), b2.setStart(e2.node, e2.offset), a2.removeAllRanges(), f2 > d2 ? (a2.addRange(b2), a2.extend(g2.node, g2.offset)) : (b2.setEnd(g2.node, g2.offset), a2.addRange(b2)));
      }
    }
    b2 = [];
    for (a2 = c2; a2 = a2.parentNode; )
      a2.nodeType === 1 && b2.push({ element: a2, left: a2.scrollLeft, top: a2.scrollTop });
    typeof c2.focus === "function" && c2.focus();
    for (c2 = 0; c2 < b2.length; c2++)
      a2 = b2[c2], a2.element.scrollLeft = a2.left, a2.element.scrollTop = a2.top;
  }
}
var Ke = ha && "documentMode" in document && 11 >= document.documentMode, Le = null, Me = null, Ne = null, Oe = false;
function Pe(a2, b2, c2) {
  var d2 = c2.window === c2 ? c2.document : c2.nodeType === 9 ? c2 : c2.ownerDocument;
  Oe || Le == null || Le !== Va(d2) || (d2 = Le, "selectionStart" in d2 && Ie(d2) ? d2 = { start: d2.selectionStart, end: d2.selectionEnd } : (d2 = (d2.ownerDocument && d2.ownerDocument.defaultView || window).getSelection(), d2 = { anchorNode: d2.anchorNode, anchorOffset: d2.anchorOffset, focusNode: d2.focusNode, focusOffset: d2.focusOffset }), Ne && De(Ne, d2) || (Ne = d2, d2 = je(Me, "onSelect"), 0 < d2.length && (b2 = new od("onSelect", "select", null, b2, c2), a2.push({ event: b2, listeners: d2 }), b2.target = Le)));
}
function Qe(a2, b2) {
  var c2 = {};
  c2[a2.toLowerCase()] = b2.toLowerCase();
  c2["Webkit" + a2] = "webkit" + b2;
  c2["Moz" + a2] = "moz" + b2;
  return c2;
}
var Re = { animationend: Qe("Animation", "AnimationEnd"), animationiteration: Qe("Animation", "AnimationIteration"), animationstart: Qe("Animation", "AnimationStart"), transitionend: Qe("Transition", "TransitionEnd") }, Se = {}, Te = {};
ha && (Te = document.createElement("div").style, "AnimationEvent" in window || (delete Re.animationend.animation, delete Re.animationiteration.animation, delete Re.animationstart.animation), "TransitionEvent" in window || delete Re.transitionend.transition);
function Ue(a2) {
  if (Se[a2])
    return Se[a2];
  if (!Re[a2])
    return a2;
  var b2 = Re[a2], c2;
  for (c2 in b2)
    if (b2.hasOwnProperty(c2) && c2 in Te)
      return Se[a2] = b2[c2];
  return a2;
}
var Ve = Ue("animationend"), We = Ue("animationiteration"), Xe = Ue("animationstart"), Ye = Ue("transitionend"), Ze = /* @__PURE__ */ new Map(), $e = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function af(a2, b2) {
  Ze.set(a2, b2);
  ea(b2, [a2]);
}
for (var bf = 0; bf < $e.length; bf++) {
  var cf = $e[bf], df = cf.toLowerCase(), ef = cf[0].toUpperCase() + cf.slice(1);
  af(df, "on" + ef);
}
af(Ve, "onAnimationEnd");
af(We, "onAnimationIteration");
af(Xe, "onAnimationStart");
af("dblclick", "onDoubleClick");
af("focusin", "onFocus");
af("focusout", "onBlur");
af(Ye, "onTransitionEnd");
fa("onMouseEnter", ["mouseout", "mouseover"]);
fa("onMouseLeave", ["mouseout", "mouseover"]);
fa("onPointerEnter", ["pointerout", "pointerover"]);
fa("onPointerLeave", ["pointerout", "pointerover"]);
ea("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
ea("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
ea("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
ea("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
ea("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
ea("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var ff = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), gf = new Set("cancel close invalid load scroll toggle".split(" ").concat(ff));
function hf(a2, b2, c2) {
  var d2 = a2.type || "unknown-event";
  a2.currentTarget = c2;
  Rb(d2, b2, void 0, a2);
  a2.currentTarget = null;
}
function ne(a2, b2) {
  b2 = (b2 & 4) !== 0;
  for (var c2 = 0; c2 < a2.length; c2++) {
    var d2 = a2[c2], e2 = d2.event;
    d2 = d2.listeners;
    a: {
      var f2 = void 0;
      if (b2)
        for (var g2 = d2.length - 1; 0 <= g2; g2--) {
          var h2 = d2[g2], k2 = h2.instance, l2 = h2.currentTarget;
          h2 = h2.listener;
          if (k2 !== f2 && e2.isPropagationStopped())
            break a;
          hf(e2, h2, l2);
          f2 = k2;
        }
      else
        for (g2 = 0; g2 < d2.length; g2++) {
          h2 = d2[g2];
          k2 = h2.instance;
          l2 = h2.currentTarget;
          h2 = h2.listener;
          if (k2 !== f2 && e2.isPropagationStopped())
            break a;
          hf(e2, h2, l2);
          f2 = k2;
        }
    }
  }
  if (Nb)
    throw a2 = Ob, Nb = false, Ob = null, a2;
}
function F$1(a2, b2) {
  var c2 = b2[jf];
  c2 === void 0 && (c2 = b2[jf] = /* @__PURE__ */ new Set());
  var d2 = a2 + "__bubble";
  c2.has(d2) || (kf(b2, a2, 2, false), c2.add(d2));
}
function lf(a2, b2, c2) {
  var d2 = 0;
  b2 && (d2 |= 4);
  kf(c2, a2, d2, b2);
}
var mf = "_reactListening" + Math.random().toString(36).slice(2);
function nf(a2) {
  if (!a2[mf]) {
    a2[mf] = true;
    ca.forEach(function(b3) {
      b3 !== "selectionchange" && (gf.has(b3) || lf(b3, false, a2), lf(b3, true, a2));
    });
    var b2 = a2.nodeType === 9 ? a2 : a2.ownerDocument;
    b2 === null || b2[mf] || (b2[mf] = true, lf("selectionchange", false, b2));
  }
}
function kf(a2, b2, c2, d2) {
  switch (ed(b2)) {
    case 1:
      var e2 = $c;
      break;
    case 4:
      e2 = bd;
      break;
    default:
      e2 = ad;
  }
  c2 = e2.bind(null, b2, c2, a2);
  e2 = void 0;
  !Ib || b2 !== "touchstart" && b2 !== "touchmove" && b2 !== "wheel" || (e2 = true);
  d2 ? e2 !== void 0 ? a2.addEventListener(b2, c2, { capture: true, passive: e2 }) : a2.addEventListener(b2, c2, true) : e2 !== void 0 ? a2.addEventListener(b2, c2, { passive: e2 }) : a2.addEventListener(b2, c2, false);
}
function cd(a2, b2, c2, d2, e2) {
  var f2 = d2;
  if ((b2 & 1) === 0 && (b2 & 2) === 0 && d2 !== null)
    a:
      for (; ; ) {
        if (d2 === null)
          return;
        var g2 = d2.tag;
        if (g2 === 3 || g2 === 4) {
          var h2 = d2.stateNode.containerInfo;
          if (h2 === e2 || h2.nodeType === 8 && h2.parentNode === e2)
            break;
          if (g2 === 4)
            for (g2 = d2.return; g2 !== null; ) {
              var k2 = g2.tag;
              if (k2 === 3 || k2 === 4) {
                if (k2 = g2.stateNode.containerInfo, k2 === e2 || k2.nodeType === 8 && k2.parentNode === e2)
                  return;
              }
              g2 = g2.return;
            }
          for (; h2 !== null; ) {
            g2 = Sc(h2);
            if (g2 === null)
              return;
            k2 = g2.tag;
            if (k2 === 5 || k2 === 6) {
              d2 = f2 = g2;
              continue a;
            }
            h2 = h2.parentNode;
          }
        }
        d2 = d2.return;
      }
  Gb(function() {
    var d3 = f2, e3 = ub(c2), g3 = [];
    a: {
      var h3 = Ze.get(a2);
      if (h3 !== void 0) {
        var k3 = od, n2 = a2;
        switch (a2) {
          case "keypress":
            if (jd(c2) === 0)
              break a;
          case "keydown":
          case "keyup":
            k3 = Md;
            break;
          case "focusin":
            n2 = "focus";
            k3 = Ad;
            break;
          case "focusout":
            n2 = "blur";
            k3 = Ad;
            break;
          case "beforeblur":
          case "afterblur":
            k3 = Ad;
            break;
          case "click":
            if (c2.button === 2)
              break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k3 = wd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k3 = yd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k3 = Qd;
            break;
          case Ve:
          case We:
          case Xe:
            k3 = Cd;
            break;
          case Ye:
            k3 = Sd;
            break;
          case "scroll":
            k3 = qd;
            break;
          case "wheel":
            k3 = Ud;
            break;
          case "copy":
          case "cut":
          case "paste":
            k3 = Ed;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k3 = Od;
        }
        var v2 = (b2 & 4) !== 0, C2 = !v2 && a2 === "scroll", t2 = v2 ? h3 !== null ? h3 + "Capture" : null : h3;
        v2 = [];
        for (var r2 = d3, x2; r2 !== null; ) {
          x2 = r2;
          var B2 = x2.stateNode;
          x2.tag === 5 && B2 !== null && (x2 = B2, t2 !== null && (B2 = Hb(r2, t2), B2 != null && v2.push(of(r2, B2, x2))));
          if (C2)
            break;
          r2 = r2.return;
        }
        0 < v2.length && (h3 = new k3(h3, n2, null, c2, e3), g3.push({ event: h3, listeners: v2 }));
      }
    }
    if ((b2 & 7) === 0) {
      a: {
        h3 = a2 === "mouseover" || a2 === "pointerover";
        k3 = a2 === "mouseout" || a2 === "pointerout";
        if (h3 && c2 !== tb && (n2 = c2.relatedTarget || c2.fromElement) && (Sc(n2) || n2[pf]))
          break a;
        if (k3 || h3) {
          h3 = e3.window === e3 ? e3 : (h3 = e3.ownerDocument) ? h3.defaultView || h3.parentWindow : window;
          if (k3) {
            if (n2 = c2.relatedTarget || c2.toElement, k3 = d3, n2 = n2 ? Sc(n2) : null, n2 !== null && (C2 = Sb(n2), n2 !== C2 || n2.tag !== 5 && n2.tag !== 6))
              n2 = null;
          } else
            k3 = null, n2 = d3;
          if (k3 !== n2) {
            v2 = wd;
            B2 = "onMouseLeave";
            t2 = "onMouseEnter";
            r2 = "mouse";
            if (a2 === "pointerout" || a2 === "pointerover")
              v2 = Od, B2 = "onPointerLeave", t2 = "onPointerEnter", r2 = "pointer";
            C2 = k3 == null ? h3 : pe(k3);
            x2 = n2 == null ? h3 : pe(n2);
            h3 = new v2(B2, r2 + "leave", k3, c2, e3);
            h3.target = C2;
            h3.relatedTarget = x2;
            B2 = null;
            Sc(e3) === d3 && (v2 = new v2(t2, r2 + "enter", n2, c2, e3), v2.target = x2, v2.relatedTarget = C2, B2 = v2);
            C2 = B2;
            if (k3 && n2)
              b: {
                v2 = k3;
                t2 = n2;
                r2 = 0;
                for (x2 = v2; x2; x2 = qf(x2))
                  r2++;
                x2 = 0;
                for (B2 = t2; B2; B2 = qf(B2))
                  x2++;
                for (; 0 < r2 - x2; )
                  v2 = qf(v2), r2--;
                for (; 0 < x2 - r2; )
                  t2 = qf(t2), x2--;
                for (; r2--; ) {
                  if (v2 === t2 || t2 !== null && v2 === t2.alternate)
                    break b;
                  v2 = qf(v2);
                  t2 = qf(t2);
                }
                v2 = null;
              }
            else
              v2 = null;
            k3 !== null && rf(g3, h3, k3, v2, false);
            n2 !== null && C2 !== null && rf(g3, C2, n2, v2, true);
          }
        }
      }
      a: {
        h3 = d3 ? pe(d3) : window;
        k3 = h3.nodeName && h3.nodeName.toLowerCase();
        if (k3 === "select" || k3 === "input" && h3.type === "file")
          var O2 = qe;
        else if (he(h3))
          if (re)
            O2 = Ae;
          else {
            O2 = ye;
            var T2 = xe;
          }
        else
          (k3 = h3.nodeName) && k3.toLowerCase() === "input" && (h3.type === "checkbox" || h3.type === "radio") && (O2 = ze);
        if (O2 && (O2 = O2(a2, d3))) {
          ie(g3, O2, c2, e3);
          break a;
        }
        T2 && T2(a2, h3, d3);
        a2 === "focusout" && (T2 = h3._wrapperState) && T2.controlled && h3.type === "number" && $a(h3, "number", h3.value);
      }
      T2 = d3 ? pe(d3) : window;
      switch (a2) {
        case "focusin":
          if (he(T2) || T2.contentEditable === "true")
            Le = T2, Me = d3, Ne = null;
          break;
        case "focusout":
          Ne = Me = Le = null;
          break;
        case "mousedown":
          Oe = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Oe = false;
          Pe(g3, c2, e3);
          break;
        case "selectionchange":
          if (Ke)
            break;
        case "keydown":
        case "keyup":
          Pe(g3, c2, e3);
      }
      var za;
      if (Wd)
        b: {
          switch (a2) {
            case "compositionstart":
              var L2 = "onCompositionStart";
              break b;
            case "compositionend":
              L2 = "onCompositionEnd";
              break b;
            case "compositionupdate":
              L2 = "onCompositionUpdate";
              break b;
          }
          L2 = void 0;
        }
      else
        de ? be(a2, c2) && (L2 = "onCompositionEnd") : a2 === "keydown" && c2.keyCode === 229 && (L2 = "onCompositionStart");
      L2 && (Zd && c2.locale !== "ko" && (de || L2 !== "onCompositionStart" ? L2 === "onCompositionEnd" && de && (za = id()) : (fd = e3, gd = "value" in fd ? fd.value : fd.textContent, de = true)), T2 = je(d3, L2), 0 < T2.length && (L2 = new Gd(L2, a2, null, c2, e3), g3.push({ event: L2, listeners: T2 }), za ? L2.data = za : (za = ce(c2), za !== null && (L2.data = za))));
      if (za = Yd ? ee(a2, c2) : fe(a2, c2))
        d3 = je(d3, "onBeforeInput"), 0 < d3.length && (e3 = new Gd("onBeforeInput", "beforeinput", null, c2, e3), g3.push({ event: e3, listeners: d3 }), e3.data = za);
    }
    ne(g3, b2);
  });
}
function of(a2, b2, c2) {
  return { instance: a2, listener: b2, currentTarget: c2 };
}
function je(a2, b2) {
  for (var c2 = b2 + "Capture", d2 = []; a2 !== null; ) {
    var e2 = a2, f2 = e2.stateNode;
    e2.tag === 5 && f2 !== null && (e2 = f2, f2 = Hb(a2, c2), f2 != null && d2.unshift(of(a2, f2, e2)), f2 = Hb(a2, b2), f2 != null && d2.push(of(a2, f2, e2)));
    a2 = a2.return;
  }
  return d2;
}
function qf(a2) {
  if (a2 === null)
    return null;
  do
    a2 = a2.return;
  while (a2 && a2.tag !== 5);
  return a2 ? a2 : null;
}
function rf(a2, b2, c2, d2, e2) {
  for (var f2 = b2._reactName, g2 = []; c2 !== null && c2 !== d2; ) {
    var h2 = c2, k2 = h2.alternate, l2 = h2.stateNode;
    if (k2 !== null && k2 === d2)
      break;
    h2.tag === 5 && l2 !== null && (h2 = l2, e2 ? (k2 = Hb(c2, f2), k2 != null && g2.unshift(of(c2, k2, h2))) : e2 || (k2 = Hb(c2, f2), k2 != null && g2.push(of(c2, k2, h2))));
    c2 = c2.return;
  }
  g2.length !== 0 && a2.push({ event: b2, listeners: g2 });
}
var sf = /\r\n?/g, tf = /\u0000|\uFFFD/g;
function uf(a2) {
  return (typeof a2 === "string" ? a2 : "" + a2).replace(sf, "\n").replace(tf, "");
}
function vf(a2, b2, c2) {
  b2 = uf(b2);
  if (uf(a2) !== b2 && c2)
    throw Error(p$4(425));
}
function wf() {
}
var xf = null;
function yf(a2, b2) {
  return a2 === "textarea" || a2 === "noscript" || typeof b2.children === "string" || typeof b2.children === "number" || typeof b2.dangerouslySetInnerHTML === "object" && b2.dangerouslySetInnerHTML !== null && b2.dangerouslySetInnerHTML.__html != null;
}
var zf = typeof setTimeout === "function" ? setTimeout : void 0, Af = typeof clearTimeout === "function" ? clearTimeout : void 0, Bf = typeof Promise === "function" ? Promise : void 0, Df = typeof queueMicrotask === "function" ? queueMicrotask : typeof Bf !== "undefined" ? function(a2) {
  return Bf.resolve(null).then(a2).catch(Cf);
} : zf;
function Cf(a2) {
  setTimeout(function() {
    throw a2;
  });
}
function Ef(a2, b2) {
  var c2 = b2, d2 = 0;
  do {
    var e2 = c2.nextSibling;
    a2.removeChild(c2);
    if (e2 && e2.nodeType === 8)
      if (c2 = e2.data, c2 === "/$") {
        if (d2 === 0) {
          a2.removeChild(e2);
          Yc(b2);
          return;
        }
        d2--;
      } else
        c2 !== "$" && c2 !== "$?" && c2 !== "$!" || d2++;
    c2 = e2;
  } while (c2);
  Yc(b2);
}
function Ff(a2) {
  for (; a2 != null; a2 = a2.nextSibling) {
    var b2 = a2.nodeType;
    if (b2 === 1 || b2 === 3)
      break;
    if (b2 === 8) {
      b2 = a2.data;
      if (b2 === "$" || b2 === "$!" || b2 === "$?")
        break;
      if (b2 === "/$")
        return null;
    }
  }
  return a2;
}
function Gf(a2) {
  a2 = a2.previousSibling;
  for (var b2 = 0; a2; ) {
    if (a2.nodeType === 8) {
      var c2 = a2.data;
      if (c2 === "$" || c2 === "$!" || c2 === "$?") {
        if (b2 === 0)
          return a2;
        b2--;
      } else
        c2 === "/$" && b2++;
    }
    a2 = a2.previousSibling;
  }
  return null;
}
var Hf = Math.random().toString(36).slice(2), If = "__reactFiber$" + Hf, Jf = "__reactProps$" + Hf, pf = "__reactContainer$" + Hf, jf = "__reactEvents$" + Hf, Kf = "__reactListeners$" + Hf, Lf = "__reactHandles$" + Hf;
function Sc(a2) {
  var b2 = a2[If];
  if (b2)
    return b2;
  for (var c2 = a2.parentNode; c2; ) {
    if (b2 = c2[pf] || c2[If]) {
      c2 = b2.alternate;
      if (b2.child !== null || c2 !== null && c2.child !== null)
        for (a2 = Gf(a2); a2 !== null; ) {
          if (c2 = a2[If])
            return c2;
          a2 = Gf(a2);
        }
      return b2;
    }
    a2 = c2;
    c2 = a2.parentNode;
  }
  return null;
}
function zb(a2) {
  a2 = a2[If] || a2[pf];
  return !a2 || a2.tag !== 5 && a2.tag !== 6 && a2.tag !== 13 && a2.tag !== 3 ? null : a2;
}
function pe(a2) {
  if (a2.tag === 5 || a2.tag === 6)
    return a2.stateNode;
  throw Error(p$4(33));
}
function Ab(a2) {
  return a2[Jf] || null;
}
var Mf = [], Nf = -1;
function Of(a2) {
  return { current: a2 };
}
function G$1(a2) {
  0 > Nf || (a2.current = Mf[Nf], Mf[Nf] = null, Nf--);
}
function H$1(a2, b2) {
  Nf++;
  Mf[Nf] = a2.current;
  a2.current = b2;
}
var Pf = {}, I$1 = Of(Pf), Qf = Of(false), Rf = Pf;
function Sf(a2, b2) {
  var c2 = a2.type.contextTypes;
  if (!c2)
    return Pf;
  var d2 = a2.stateNode;
  if (d2 && d2.__reactInternalMemoizedUnmaskedChildContext === b2)
    return d2.__reactInternalMemoizedMaskedChildContext;
  var e2 = {}, f2;
  for (f2 in c2)
    e2[f2] = b2[f2];
  d2 && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = b2, a2.__reactInternalMemoizedMaskedChildContext = e2);
  return e2;
}
function Tf(a2) {
  a2 = a2.childContextTypes;
  return a2 !== null && a2 !== void 0;
}
function Uf() {
  G$1(Qf);
  G$1(I$1);
}
function Vf(a2, b2, c2) {
  if (I$1.current !== Pf)
    throw Error(p$4(168));
  H$1(I$1, b2);
  H$1(Qf, c2);
}
function Wf(a2, b2, c2) {
  var d2 = a2.stateNode;
  b2 = b2.childContextTypes;
  if (typeof d2.getChildContext !== "function")
    return c2;
  d2 = d2.getChildContext();
  for (var e2 in d2)
    if (!(e2 in b2))
      throw Error(p$4(108, Pa(a2) || "Unknown", e2));
  return A$1({}, c2, d2);
}
function Xf(a2) {
  a2 = (a2 = a2.stateNode) && a2.__reactInternalMemoizedMergedChildContext || Pf;
  Rf = I$1.current;
  H$1(I$1, a2);
  H$1(Qf, Qf.current);
  return true;
}
function Yf(a2, b2, c2) {
  var d2 = a2.stateNode;
  if (!d2)
    throw Error(p$4(169));
  c2 ? (a2 = Wf(a2, b2, Rf), d2.__reactInternalMemoizedMergedChildContext = a2, G$1(Qf), G$1(I$1), H$1(I$1, a2)) : G$1(Qf);
  H$1(Qf, c2);
}
var Zf = null, $f = false, ag = false;
function bg(a2) {
  Zf === null ? Zf = [a2] : Zf.push(a2);
}
function cg(a2) {
  $f = true;
  bg(a2);
}
function dg() {
  if (!ag && Zf !== null) {
    ag = true;
    var a2 = 0, b2 = E$1;
    try {
      var c2 = Zf;
      for (E$1 = 1; a2 < c2.length; a2++) {
        var d2 = c2[a2];
        do
          d2 = d2(true);
        while (d2 !== null);
      }
      Zf = null;
      $f = false;
    } catch (e2) {
      throw Zf !== null && (Zf = Zf.slice(a2 + 1)), Yb(cc, dg), e2;
    } finally {
      E$1 = b2, ag = false;
    }
  }
  return null;
}
var eg = sa.ReactCurrentBatchConfig;
function fg(a2, b2) {
  if (a2 && a2.defaultProps) {
    b2 = A$1({}, b2);
    a2 = a2.defaultProps;
    for (var c2 in a2)
      b2[c2] === void 0 && (b2[c2] = a2[c2]);
    return b2;
  }
  return b2;
}
var gg = Of(null), hg = null, ig = null, jg = null;
function kg() {
  jg = ig = hg = null;
}
function lg(a2) {
  var b2 = gg.current;
  G$1(gg);
  a2._currentValue = b2;
}
function mg(a2, b2, c2) {
  for (; a2 !== null; ) {
    var d2 = a2.alternate;
    (a2.childLanes & b2) !== b2 ? (a2.childLanes |= b2, d2 !== null && (d2.childLanes |= b2)) : d2 !== null && (d2.childLanes & b2) !== b2 && (d2.childLanes |= b2);
    if (a2 === c2)
      break;
    a2 = a2.return;
  }
}
function ng(a2, b2) {
  hg = a2;
  jg = ig = null;
  a2 = a2.dependencies;
  a2 !== null && a2.firstContext !== null && ((a2.lanes & b2) !== 0 && (og = true), a2.firstContext = null);
}
function pg(a2) {
  var b2 = a2._currentValue;
  if (jg !== a2)
    if (a2 = { context: a2, memoizedValue: b2, next: null }, ig === null) {
      if (hg === null)
        throw Error(p$4(308));
      ig = a2;
      hg.dependencies = { lanes: 0, firstContext: a2 };
    } else
      ig = ig.next = a2;
  return b2;
}
var qg = null, rg = false;
function sg(a2) {
  a2.updateQueue = { baseState: a2.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function tg(a2, b2) {
  a2 = a2.updateQueue;
  b2.updateQueue === a2 && (b2.updateQueue = { baseState: a2.baseState, firstBaseUpdate: a2.firstBaseUpdate, lastBaseUpdate: a2.lastBaseUpdate, shared: a2.shared, effects: a2.effects });
}
function ug(a2, b2) {
  return { eventTime: a2, lane: b2, tag: 0, payload: null, callback: null, next: null };
}
function vg(a2, b2) {
  var c2 = a2.updateQueue;
  c2 !== null && (c2 = c2.shared, J !== null && (a2.mode & 1) !== 0 && (K & 2) === 0 ? (a2 = c2.interleaved, a2 === null ? (b2.next = b2, qg === null ? qg = [c2] : qg.push(c2)) : (b2.next = a2.next, a2.next = b2), c2.interleaved = b2) : (a2 = c2.pending, a2 === null ? b2.next = b2 : (b2.next = a2.next, a2.next = b2), c2.pending = b2));
}
function wg(a2, b2, c2) {
  b2 = b2.updateQueue;
  if (b2 !== null && (b2 = b2.shared, (c2 & 4194240) !== 0)) {
    var d2 = b2.lanes;
    d2 &= a2.pendingLanes;
    c2 |= d2;
    b2.lanes = c2;
    yc(a2, c2);
  }
}
function xg(a2, b2) {
  var c2 = a2.updateQueue, d2 = a2.alternate;
  if (d2 !== null && (d2 = d2.updateQueue, c2 === d2)) {
    var e2 = null, f2 = null;
    c2 = c2.firstBaseUpdate;
    if (c2 !== null) {
      do {
        var g2 = { eventTime: c2.eventTime, lane: c2.lane, tag: c2.tag, payload: c2.payload, callback: c2.callback, next: null };
        f2 === null ? e2 = f2 = g2 : f2 = f2.next = g2;
        c2 = c2.next;
      } while (c2 !== null);
      f2 === null ? e2 = f2 = b2 : f2 = f2.next = b2;
    } else
      e2 = f2 = b2;
    c2 = { baseState: d2.baseState, firstBaseUpdate: e2, lastBaseUpdate: f2, shared: d2.shared, effects: d2.effects };
    a2.updateQueue = c2;
    return;
  }
  a2 = c2.lastBaseUpdate;
  a2 === null ? c2.firstBaseUpdate = b2 : a2.next = b2;
  c2.lastBaseUpdate = b2;
}
function yg(a2, b2, c2, d2) {
  var e2 = a2.updateQueue;
  rg = false;
  var f2 = e2.firstBaseUpdate, g2 = e2.lastBaseUpdate, h2 = e2.shared.pending;
  if (h2 !== null) {
    e2.shared.pending = null;
    var k2 = h2, l2 = k2.next;
    k2.next = null;
    g2 === null ? f2 = l2 : g2.next = l2;
    g2 = k2;
    var m2 = a2.alternate;
    m2 !== null && (m2 = m2.updateQueue, h2 = m2.lastBaseUpdate, h2 !== g2 && (h2 === null ? m2.firstBaseUpdate = l2 : h2.next = l2, m2.lastBaseUpdate = k2));
  }
  if (f2 !== null) {
    var w2 = e2.baseState;
    g2 = 0;
    m2 = l2 = k2 = null;
    h2 = f2;
    do {
      var u2 = h2.lane, y2 = h2.eventTime;
      if ((d2 & u2) === u2) {
        m2 !== null && (m2 = m2.next = {
          eventTime: y2,
          lane: 0,
          tag: h2.tag,
          payload: h2.payload,
          callback: h2.callback,
          next: null
        });
        a: {
          var n2 = a2, v2 = h2;
          u2 = b2;
          y2 = c2;
          switch (v2.tag) {
            case 1:
              n2 = v2.payload;
              if (typeof n2 === "function") {
                w2 = n2.call(y2, w2, u2);
                break a;
              }
              w2 = n2;
              break a;
            case 3:
              n2.flags = n2.flags & -65537 | 128;
            case 0:
              n2 = v2.payload;
              u2 = typeof n2 === "function" ? n2.call(y2, w2, u2) : n2;
              if (u2 === null || u2 === void 0)
                break a;
              w2 = A$1({}, w2, u2);
              break a;
            case 2:
              rg = true;
          }
        }
        h2.callback !== null && h2.lane !== 0 && (a2.flags |= 64, u2 = e2.effects, u2 === null ? e2.effects = [h2] : u2.push(h2));
      } else
        y2 = { eventTime: y2, lane: u2, tag: h2.tag, payload: h2.payload, callback: h2.callback, next: null }, m2 === null ? (l2 = m2 = y2, k2 = w2) : m2 = m2.next = y2, g2 |= u2;
      h2 = h2.next;
      if (h2 === null)
        if (h2 = e2.shared.pending, h2 === null)
          break;
        else
          u2 = h2, h2 = u2.next, u2.next = null, e2.lastBaseUpdate = u2, e2.shared.pending = null;
    } while (1);
    m2 === null && (k2 = w2);
    e2.baseState = k2;
    e2.firstBaseUpdate = l2;
    e2.lastBaseUpdate = m2;
    b2 = e2.shared.interleaved;
    if (b2 !== null) {
      e2 = b2;
      do
        g2 |= e2.lane, e2 = e2.next;
      while (e2 !== b2);
    } else
      f2 === null && (e2.shared.lanes = 0);
    zg |= g2;
    a2.lanes = g2;
    a2.memoizedState = w2;
  }
}
function Ag(a2, b2, c2) {
  a2 = b2.effects;
  b2.effects = null;
  if (a2 !== null)
    for (b2 = 0; b2 < a2.length; b2++) {
      var d2 = a2[b2], e2 = d2.callback;
      if (e2 !== null) {
        d2.callback = null;
        d2 = c2;
        if (typeof e2 !== "function")
          throw Error(p$4(191, e2));
        e2.call(d2);
      }
    }
}
var Bg = new aa.Component().refs;
function Cg(a2, b2, c2, d2) {
  b2 = a2.memoizedState;
  c2 = c2(d2, b2);
  c2 = c2 === null || c2 === void 0 ? b2 : A$1({}, b2, c2);
  a2.memoizedState = c2;
  a2.lanes === 0 && (a2.updateQueue.baseState = c2);
}
var Fg = { isMounted: function(a2) {
  return (a2 = a2._reactInternals) ? Sb(a2) === a2 : false;
}, enqueueSetState: function(a2, b2, c2) {
  a2 = a2._reactInternals;
  var d2 = M$1(), e2 = Dg(a2), f2 = ug(d2, e2);
  f2.payload = b2;
  c2 !== void 0 && c2 !== null && (f2.callback = c2);
  vg(a2, f2);
  b2 = Eg(a2, e2, d2);
  b2 !== null && wg(b2, a2, e2);
}, enqueueReplaceState: function(a2, b2, c2) {
  a2 = a2._reactInternals;
  var d2 = M$1(), e2 = Dg(a2), f2 = ug(d2, e2);
  f2.tag = 1;
  f2.payload = b2;
  c2 !== void 0 && c2 !== null && (f2.callback = c2);
  vg(a2, f2);
  b2 = Eg(a2, e2, d2);
  b2 !== null && wg(b2, a2, e2);
}, enqueueForceUpdate: function(a2, b2) {
  a2 = a2._reactInternals;
  var c2 = M$1(), d2 = Dg(a2), e2 = ug(c2, d2);
  e2.tag = 2;
  b2 !== void 0 && b2 !== null && (e2.callback = b2);
  vg(a2, e2);
  b2 = Eg(a2, d2, c2);
  b2 !== null && wg(b2, a2, d2);
} };
function Gg(a2, b2, c2, d2, e2, f2, g2) {
  a2 = a2.stateNode;
  return typeof a2.shouldComponentUpdate === "function" ? a2.shouldComponentUpdate(d2, f2, g2) : b2.prototype && b2.prototype.isPureReactComponent ? !De(c2, d2) || !De(e2, f2) : true;
}
function Hg(a2, b2, c2) {
  var d2 = false, e2 = Pf;
  var f2 = b2.contextType;
  typeof f2 === "object" && f2 !== null ? f2 = pg(f2) : (e2 = Tf(b2) ? Rf : I$1.current, d2 = b2.contextTypes, f2 = (d2 = d2 !== null && d2 !== void 0) ? Sf(a2, e2) : Pf);
  b2 = new b2(c2, f2);
  a2.memoizedState = b2.state !== null && b2.state !== void 0 ? b2.state : null;
  b2.updater = Fg;
  a2.stateNode = b2;
  b2._reactInternals = a2;
  d2 && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = e2, a2.__reactInternalMemoizedMaskedChildContext = f2);
  return b2;
}
function Ig(a2, b2, c2, d2) {
  a2 = b2.state;
  typeof b2.componentWillReceiveProps === "function" && b2.componentWillReceiveProps(c2, d2);
  typeof b2.UNSAFE_componentWillReceiveProps === "function" && b2.UNSAFE_componentWillReceiveProps(c2, d2);
  b2.state !== a2 && Fg.enqueueReplaceState(b2, b2.state, null);
}
function Jg(a2, b2, c2, d2) {
  var e2 = a2.stateNode;
  e2.props = c2;
  e2.state = a2.memoizedState;
  e2.refs = Bg;
  sg(a2);
  var f2 = b2.contextType;
  typeof f2 === "object" && f2 !== null ? e2.context = pg(f2) : (f2 = Tf(b2) ? Rf : I$1.current, e2.context = Sf(a2, f2));
  e2.state = a2.memoizedState;
  f2 = b2.getDerivedStateFromProps;
  typeof f2 === "function" && (Cg(a2, b2, f2, c2), e2.state = a2.memoizedState);
  typeof b2.getDerivedStateFromProps === "function" || typeof e2.getSnapshotBeforeUpdate === "function" || typeof e2.UNSAFE_componentWillMount !== "function" && typeof e2.componentWillMount !== "function" || (b2 = e2.state, typeof e2.componentWillMount === "function" && e2.componentWillMount(), typeof e2.UNSAFE_componentWillMount === "function" && e2.UNSAFE_componentWillMount(), b2 !== e2.state && Fg.enqueueReplaceState(e2, e2.state, null), yg(a2, c2, e2, d2), e2.state = a2.memoizedState);
  typeof e2.componentDidMount === "function" && (a2.flags |= 4194308);
}
var Kg = [], Lg = 0, Mg = null, Ng = 0, Og = [], Pg = 0, Qg = null, Rg = 1, Sg = "";
function Tg(a2, b2) {
  Kg[Lg++] = Ng;
  Kg[Lg++] = Mg;
  Mg = a2;
  Ng = b2;
}
function Ug(a2, b2, c2) {
  Og[Pg++] = Rg;
  Og[Pg++] = Sg;
  Og[Pg++] = Qg;
  Qg = a2;
  var d2 = Rg;
  a2 = Sg;
  var e2 = 32 - lc(d2) - 1;
  d2 &= ~(1 << e2);
  c2 += 1;
  var f2 = 32 - lc(b2) + e2;
  if (30 < f2) {
    var g2 = e2 - e2 % 5;
    f2 = (d2 & (1 << g2) - 1).toString(32);
    d2 >>= g2;
    e2 -= g2;
    Rg = 1 << 32 - lc(b2) + e2 | c2 << e2 | d2;
    Sg = f2 + a2;
  } else
    Rg = 1 << f2 | c2 << e2 | d2, Sg = a2;
}
function Vg(a2) {
  a2.return !== null && (Tg(a2, 1), Ug(a2, 1, 0));
}
function Wg(a2) {
  for (; a2 === Mg; )
    Mg = Kg[--Lg], Kg[Lg] = null, Ng = Kg[--Lg], Kg[Lg] = null;
  for (; a2 === Qg; )
    Qg = Og[--Pg], Og[Pg] = null, Sg = Og[--Pg], Og[Pg] = null, Rg = Og[--Pg], Og[Pg] = null;
}
var Xg = null, Yg = null, N$1 = false, Zg = null;
function $g(a2, b2) {
  var c2 = ah(5, null, null, 0);
  c2.elementType = "DELETED";
  c2.stateNode = b2;
  c2.return = a2;
  b2 = a2.deletions;
  b2 === null ? (a2.deletions = [c2], a2.flags |= 16) : b2.push(c2);
}
function bh(a2, b2) {
  switch (a2.tag) {
    case 5:
      var c2 = a2.type;
      b2 = b2.nodeType !== 1 || c2.toLowerCase() !== b2.nodeName.toLowerCase() ? null : b2;
      return b2 !== null ? (a2.stateNode = b2, Xg = a2, Yg = Ff(b2.firstChild), true) : false;
    case 6:
      return b2 = a2.pendingProps === "" || b2.nodeType !== 3 ? null : b2, b2 !== null ? (a2.stateNode = b2, Xg = a2, Yg = null, true) : false;
    case 13:
      return b2 = b2.nodeType !== 8 ? null : b2, b2 !== null ? (c2 = Qg !== null ? { id: Rg, overflow: Sg } : null, a2.memoizedState = { dehydrated: b2, treeContext: c2, retryLane: 1073741824 }, c2 = ah(18, null, null, 0), c2.stateNode = b2, c2.return = a2, a2.child = c2, Xg = a2, Yg = null, true) : false;
    default:
      return false;
  }
}
function ch(a2) {
  return (a2.mode & 1) !== 0 && (a2.flags & 128) === 0;
}
function dh(a2) {
  if (N$1) {
    var b2 = Yg;
    if (b2) {
      var c2 = b2;
      if (!bh(a2, b2)) {
        if (ch(a2))
          throw Error(p$4(418));
        b2 = Ff(c2.nextSibling);
        var d2 = Xg;
        b2 && bh(a2, b2) ? $g(d2, c2) : (a2.flags = a2.flags & -4097 | 2, N$1 = false, Xg = a2);
      }
    } else {
      if (ch(a2))
        throw Error(p$4(418));
      a2.flags = a2.flags & -4097 | 2;
      N$1 = false;
      Xg = a2;
    }
  }
}
function eh(a2) {
  for (a2 = a2.return; a2 !== null && a2.tag !== 5 && a2.tag !== 3 && a2.tag !== 13; )
    a2 = a2.return;
  Xg = a2;
}
function fh(a2) {
  if (a2 !== Xg)
    return false;
  if (!N$1)
    return eh(a2), N$1 = true, false;
  var b2;
  (b2 = a2.tag !== 3) && !(b2 = a2.tag !== 5) && (b2 = a2.type, b2 = b2 !== "head" && b2 !== "body" && !yf(a2.type, a2.memoizedProps));
  if (b2 && (b2 = Yg)) {
    if (ch(a2)) {
      for (a2 = Yg; a2; )
        a2 = Ff(a2.nextSibling);
      throw Error(p$4(418));
    }
    for (; b2; )
      $g(a2, b2), b2 = Ff(b2.nextSibling);
  }
  eh(a2);
  if (a2.tag === 13) {
    a2 = a2.memoizedState;
    a2 = a2 !== null ? a2.dehydrated : null;
    if (!a2)
      throw Error(p$4(317));
    a: {
      a2 = a2.nextSibling;
      for (b2 = 0; a2; ) {
        if (a2.nodeType === 8) {
          var c2 = a2.data;
          if (c2 === "/$") {
            if (b2 === 0) {
              Yg = Ff(a2.nextSibling);
              break a;
            }
            b2--;
          } else
            c2 !== "$" && c2 !== "$!" && c2 !== "$?" || b2++;
        }
        a2 = a2.nextSibling;
      }
      Yg = null;
    }
  } else
    Yg = Xg ? Ff(a2.stateNode.nextSibling) : null;
  return true;
}
function gh() {
  Yg = Xg = null;
  N$1 = false;
}
function hh(a2) {
  Zg === null ? Zg = [a2] : Zg.push(a2);
}
function ih(a2, b2, c2) {
  a2 = c2.ref;
  if (a2 !== null && typeof a2 !== "function" && typeof a2 !== "object") {
    if (c2._owner) {
      c2 = c2._owner;
      if (c2) {
        if (c2.tag !== 1)
          throw Error(p$4(309));
        var d2 = c2.stateNode;
      }
      if (!d2)
        throw Error(p$4(147, a2));
      var e2 = d2, f2 = "" + a2;
      if (b2 !== null && b2.ref !== null && typeof b2.ref === "function" && b2.ref._stringRef === f2)
        return b2.ref;
      b2 = function(a3) {
        var b3 = e2.refs;
        b3 === Bg && (b3 = e2.refs = {});
        a3 === null ? delete b3[f2] : b3[f2] = a3;
      };
      b2._stringRef = f2;
      return b2;
    }
    if (typeof a2 !== "string")
      throw Error(p$4(284));
    if (!c2._owner)
      throw Error(p$4(290, a2));
  }
  return a2;
}
function jh(a2, b2) {
  a2 = Object.prototype.toString.call(b2);
  throw Error(p$4(31, a2 === "[object Object]" ? "object with keys {" + Object.keys(b2).join(", ") + "}" : a2));
}
function kh(a2) {
  var b2 = a2._init;
  return b2(a2._payload);
}
function lh(a2) {
  function b2(b3, c3) {
    if (a2) {
      var d3 = b3.deletions;
      d3 === null ? (b3.deletions = [c3], b3.flags |= 16) : d3.push(c3);
    }
  }
  function c2(c3, d3) {
    if (!a2)
      return null;
    for (; d3 !== null; )
      b2(c3, d3), d3 = d3.sibling;
    return null;
  }
  function d2(a3, b3) {
    for (a3 = /* @__PURE__ */ new Map(); b3 !== null; )
      b3.key !== null ? a3.set(b3.key, b3) : a3.set(b3.index, b3), b3 = b3.sibling;
    return a3;
  }
  function e2(a3, b3) {
    a3 = mh(a3, b3);
    a3.index = 0;
    a3.sibling = null;
    return a3;
  }
  function f2(b3, c3, d3) {
    b3.index = d3;
    if (!a2)
      return b3.flags |= 1048576, c3;
    d3 = b3.alternate;
    if (d3 !== null)
      return d3 = d3.index, d3 < c3 ? (b3.flags |= 2, c3) : d3;
    b3.flags |= 2;
    return c3;
  }
  function g2(b3) {
    a2 && b3.alternate === null && (b3.flags |= 2);
    return b3;
  }
  function h2(a3, b3, c3, d3) {
    if (b3 === null || b3.tag !== 6)
      return b3 = nh(c3, a3.mode, d3), b3.return = a3, b3;
    b3 = e2(b3, c3);
    b3.return = a3;
    return b3;
  }
  function k2(a3, b3, c3, d3) {
    var f3 = c3.type;
    if (f3 === va)
      return m2(a3, b3, c3.props.children, d3, c3.key);
    if (b3 !== null && (b3.elementType === f3 || typeof f3 === "object" && f3 !== null && f3.$$typeof === Fa && kh(f3) === b3.type))
      return d3 = e2(b3, c3.props), d3.ref = ih(a3, b3, c3), d3.return = a3, d3;
    d3 = oh(c3.type, c3.key, c3.props, null, a3.mode, d3);
    d3.ref = ih(a3, b3, c3);
    d3.return = a3;
    return d3;
  }
  function l2(a3, b3, c3, d3) {
    if (b3 === null || b3.tag !== 4 || b3.stateNode.containerInfo !== c3.containerInfo || b3.stateNode.implementation !== c3.implementation)
      return b3 = ph(c3, a3.mode, d3), b3.return = a3, b3;
    b3 = e2(b3, c3.children || []);
    b3.return = a3;
    return b3;
  }
  function m2(a3, b3, c3, d3, f3) {
    if (b3 === null || b3.tag !== 7)
      return b3 = qh(c3, a3.mode, d3, f3), b3.return = a3, b3;
    b3 = e2(b3, c3);
    b3.return = a3;
    return b3;
  }
  function w2(a3, b3, c3) {
    if (typeof b3 === "string" && b3 !== "" || typeof b3 === "number")
      return b3 = nh("" + b3, a3.mode, c3), b3.return = a3, b3;
    if (typeof b3 === "object" && b3 !== null) {
      switch (b3.$$typeof) {
        case ta:
          return c3 = oh(b3.type, b3.key, b3.props, null, a3.mode, c3), c3.ref = ih(a3, null, b3), c3.return = a3, c3;
        case ua:
          return b3 = ph(b3, a3.mode, c3), b3.return = a3, b3;
        case Fa:
          var d3 = b3._init;
          return w2(a3, d3(b3._payload), c3);
      }
      if (bb(b3) || Ia(b3))
        return b3 = qh(b3, a3.mode, c3, null), b3.return = a3, b3;
      jh(a3, b3);
    }
    return null;
  }
  function u2(a3, b3, c3, d3) {
    var e3 = b3 !== null ? b3.key : null;
    if (typeof c3 === "string" && c3 !== "" || typeof c3 === "number")
      return e3 !== null ? null : h2(a3, b3, "" + c3, d3);
    if (typeof c3 === "object" && c3 !== null) {
      switch (c3.$$typeof) {
        case ta:
          return c3.key === e3 ? k2(a3, b3, c3, d3) : null;
        case ua:
          return c3.key === e3 ? l2(a3, b3, c3, d3) : null;
        case Fa:
          return e3 = c3._init, u2(a3, b3, e3(c3._payload), d3);
      }
      if (bb(c3) || Ia(c3))
        return e3 !== null ? null : m2(a3, b3, c3, d3, null);
      jh(a3, c3);
    }
    return null;
  }
  function y2(a3, b3, c3, d3, e3) {
    if (typeof d3 === "string" && d3 !== "" || typeof d3 === "number")
      return a3 = a3.get(c3) || null, h2(b3, a3, "" + d3, e3);
    if (typeof d3 === "object" && d3 !== null) {
      switch (d3.$$typeof) {
        case ta:
          return a3 = a3.get(d3.key === null ? c3 : d3.key) || null, k2(b3, a3, d3, e3);
        case ua:
          return a3 = a3.get(d3.key === null ? c3 : d3.key) || null, l2(b3, a3, d3, e3);
        case Fa:
          var f3 = d3._init;
          return y2(a3, b3, c3, f3(d3._payload), e3);
      }
      if (bb(d3) || Ia(d3))
        return a3 = a3.get(c3) || null, m2(b3, a3, d3, e3, null);
      jh(b3, d3);
    }
    return null;
  }
  function n2(e3, g3, h3, k3) {
    for (var l3 = null, n3 = null, m3 = g3, r2 = g3 = 0, x2 = null; m3 !== null && r2 < h3.length; r2++) {
      m3.index > r2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
      var t2 = u2(e3, m3, h3[r2], k3);
      if (t2 === null) {
        m3 === null && (m3 = x2);
        break;
      }
      a2 && m3 && t2.alternate === null && b2(e3, m3);
      g3 = f2(t2, g3, r2);
      n3 === null ? l3 = t2 : n3.sibling = t2;
      n3 = t2;
      m3 = x2;
    }
    if (r2 === h3.length)
      return c2(e3, m3), N$1 && Tg(e3, r2), l3;
    if (m3 === null) {
      for (; r2 < h3.length; r2++)
        m3 = w2(e3, h3[r2], k3), m3 !== null && (g3 = f2(m3, g3, r2), n3 === null ? l3 = m3 : n3.sibling = m3, n3 = m3);
      N$1 && Tg(e3, r2);
      return l3;
    }
    for (m3 = d2(e3, m3); r2 < h3.length; r2++)
      x2 = y2(m3, e3, r2, h3[r2], k3), x2 !== null && (a2 && x2.alternate !== null && m3.delete(x2.key === null ? r2 : x2.key), g3 = f2(x2, g3, r2), n3 === null ? l3 = x2 : n3.sibling = x2, n3 = x2);
    a2 && m3.forEach(function(a3) {
      return b2(e3, a3);
    });
    N$1 && Tg(e3, r2);
    return l3;
  }
  function v2(e3, g3, h3, k3) {
    var l3 = Ia(h3);
    if (typeof l3 !== "function")
      throw Error(p$4(150));
    h3 = l3.call(h3);
    if (h3 == null)
      throw Error(p$4(151));
    for (var m3 = l3 = null, n3 = g3, r2 = g3 = 0, x2 = null, t2 = h3.next(); n3 !== null && !t2.done; r2++, t2 = h3.next()) {
      n3.index > r2 ? (x2 = n3, n3 = null) : x2 = n3.sibling;
      var v3 = u2(e3, n3, t2.value, k3);
      if (v3 === null) {
        n3 === null && (n3 = x2);
        break;
      }
      a2 && n3 && v3.alternate === null && b2(e3, n3);
      g3 = f2(v3, g3, r2);
      m3 === null ? l3 = v3 : m3.sibling = v3;
      m3 = v3;
      n3 = x2;
    }
    if (t2.done)
      return c2(e3, n3), N$1 && Tg(e3, r2), l3;
    if (n3 === null) {
      for (; !t2.done; r2++, t2 = h3.next())
        t2 = w2(e3, t2.value, k3), t2 !== null && (g3 = f2(t2, g3, r2), m3 === null ? l3 = t2 : m3.sibling = t2, m3 = t2);
      N$1 && Tg(e3, r2);
      return l3;
    }
    for (n3 = d2(e3, n3); !t2.done; r2++, t2 = h3.next())
      t2 = y2(n3, e3, r2, t2.value, k3), t2 !== null && (a2 && t2.alternate !== null && n3.delete(t2.key === null ? r2 : t2.key), g3 = f2(t2, g3, r2), m3 === null ? l3 = t2 : m3.sibling = t2, m3 = t2);
    a2 && n3.forEach(function(a3) {
      return b2(e3, a3);
    });
    N$1 && Tg(e3, r2);
    return l3;
  }
  function C2(a3, d3, f3, h3) {
    typeof f3 === "object" && f3 !== null && f3.type === va && f3.key === null && (f3 = f3.props.children);
    if (typeof f3 === "object" && f3 !== null) {
      switch (f3.$$typeof) {
        case ta:
          a: {
            for (var k3 = f3.key, l3 = d3; l3 !== null; ) {
              if (l3.key === k3) {
                k3 = f3.type;
                if (k3 === va) {
                  if (l3.tag === 7) {
                    c2(a3, l3.sibling);
                    d3 = e2(l3, f3.props.children);
                    d3.return = a3;
                    a3 = d3;
                    break a;
                  }
                } else if (l3.elementType === k3 || typeof k3 === "object" && k3 !== null && k3.$$typeof === Fa && kh(k3) === l3.type) {
                  c2(a3, l3.sibling);
                  d3 = e2(l3, f3.props);
                  d3.ref = ih(a3, l3, f3);
                  d3.return = a3;
                  a3 = d3;
                  break a;
                }
                c2(a3, l3);
                break;
              } else
                b2(a3, l3);
              l3 = l3.sibling;
            }
            f3.type === va ? (d3 = qh(f3.props.children, a3.mode, h3, f3.key), d3.return = a3, a3 = d3) : (h3 = oh(f3.type, f3.key, f3.props, null, a3.mode, h3), h3.ref = ih(a3, d3, f3), h3.return = a3, a3 = h3);
          }
          return g2(a3);
        case ua:
          a: {
            for (l3 = f3.key; d3 !== null; ) {
              if (d3.key === l3)
                if (d3.tag === 4 && d3.stateNode.containerInfo === f3.containerInfo && d3.stateNode.implementation === f3.implementation) {
                  c2(a3, d3.sibling);
                  d3 = e2(d3, f3.children || []);
                  d3.return = a3;
                  a3 = d3;
                  break a;
                } else {
                  c2(a3, d3);
                  break;
                }
              else
                b2(a3, d3);
              d3 = d3.sibling;
            }
            d3 = ph(f3, a3.mode, h3);
            d3.return = a3;
            a3 = d3;
          }
          return g2(a3);
        case Fa:
          return l3 = f3._init, C2(a3, d3, l3(f3._payload), h3);
      }
      if (bb(f3))
        return n2(a3, d3, f3, h3);
      if (Ia(f3))
        return v2(a3, d3, f3, h3);
      jh(a3, f3);
    }
    return typeof f3 === "string" && f3 !== "" || typeof f3 === "number" ? (f3 = "" + f3, d3 !== null && d3.tag === 6 ? (c2(a3, d3.sibling), d3 = e2(d3, f3), d3.return = a3, a3 = d3) : (c2(a3, d3), d3 = nh(f3, a3.mode, h3), d3.return = a3, a3 = d3), g2(a3)) : c2(a3, d3);
  }
  return C2;
}
var rh = lh(true), sh = lh(false), th = {}, uh = Of(th), vh = Of(th), wh = Of(th);
function xh(a2) {
  if (a2 === th)
    throw Error(p$4(174));
  return a2;
}
function yh(a2, b2) {
  H$1(wh, b2);
  H$1(vh, a2);
  H$1(uh, th);
  a2 = b2.nodeType;
  switch (a2) {
    case 9:
    case 11:
      b2 = (b2 = b2.documentElement) ? b2.namespaceURI : ib(null, "");
      break;
    default:
      a2 = a2 === 8 ? b2.parentNode : b2, b2 = a2.namespaceURI || null, a2 = a2.tagName, b2 = ib(b2, a2);
  }
  G$1(uh);
  H$1(uh, b2);
}
function zh() {
  G$1(uh);
  G$1(vh);
  G$1(wh);
}
function Ah(a2) {
  xh(wh.current);
  var b2 = xh(uh.current);
  var c2 = ib(b2, a2.type);
  b2 !== c2 && (H$1(vh, a2), H$1(uh, c2));
}
function Bh(a2) {
  vh.current === a2 && (G$1(uh), G$1(vh));
}
var P$1 = Of(0);
function Ch(a2) {
  for (var b2 = a2; b2 !== null; ) {
    if (b2.tag === 13) {
      var c2 = b2.memoizedState;
      if (c2 !== null && (c2 = c2.dehydrated, c2 === null || c2.data === "$?" || c2.data === "$!"))
        return b2;
    } else if (b2.tag === 19 && b2.memoizedProps.revealOrder !== void 0) {
      if ((b2.flags & 128) !== 0)
        return b2;
    } else if (b2.child !== null) {
      b2.child.return = b2;
      b2 = b2.child;
      continue;
    }
    if (b2 === a2)
      break;
    for (; b2.sibling === null; ) {
      if (b2.return === null || b2.return === a2)
        return null;
      b2 = b2.return;
    }
    b2.sibling.return = b2.return;
    b2 = b2.sibling;
  }
  return null;
}
var Dh = [];
function Eh() {
  for (var a2 = 0; a2 < Dh.length; a2++)
    Dh[a2]._workInProgressVersionPrimary = null;
  Dh.length = 0;
}
var Fh = sa.ReactCurrentDispatcher, Gh = sa.ReactCurrentBatchConfig, Hh = 0, Q$1 = null, R$1 = null, S$1 = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
function U$1() {
  throw Error(p$4(321));
}
function Mh(a2, b2) {
  if (b2 === null)
    return false;
  for (var c2 = 0; c2 < b2.length && c2 < a2.length; c2++)
    if (!Ce(a2[c2], b2[c2]))
      return false;
  return true;
}
function Nh(a2, b2, c2, d2, e2, f2) {
  Hh = f2;
  Q$1 = b2;
  b2.memoizedState = null;
  b2.updateQueue = null;
  b2.lanes = 0;
  Fh.current = a2 === null || a2.memoizedState === null ? Oh : Ph;
  a2 = c2(d2, e2);
  if (Jh) {
    f2 = 0;
    do {
      Jh = false;
      Kh = 0;
      if (25 <= f2)
        throw Error(p$4(301));
      f2 += 1;
      S$1 = R$1 = null;
      b2.updateQueue = null;
      Fh.current = Qh;
      a2 = c2(d2, e2);
    } while (Jh);
  }
  Fh.current = Rh;
  b2 = R$1 !== null && R$1.next !== null;
  Hh = 0;
  S$1 = R$1 = Q$1 = null;
  Ih = false;
  if (b2)
    throw Error(p$4(300));
  return a2;
}
function Sh() {
  var a2 = Kh !== 0;
  Kh = 0;
  return a2;
}
function Th() {
  var a2 = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  S$1 === null ? Q$1.memoizedState = S$1 = a2 : S$1 = S$1.next = a2;
  return S$1;
}
function Uh() {
  if (R$1 === null) {
    var a2 = Q$1.alternate;
    a2 = a2 !== null ? a2.memoizedState : null;
  } else
    a2 = R$1.next;
  var b2 = S$1 === null ? Q$1.memoizedState : S$1.next;
  if (b2 !== null)
    S$1 = b2, R$1 = a2;
  else {
    if (a2 === null)
      throw Error(p$4(310));
    R$1 = a2;
    a2 = { memoizedState: R$1.memoizedState, baseState: R$1.baseState, baseQueue: R$1.baseQueue, queue: R$1.queue, next: null };
    S$1 === null ? Q$1.memoizedState = S$1 = a2 : S$1 = S$1.next = a2;
  }
  return S$1;
}
function Vh(a2, b2) {
  return typeof b2 === "function" ? b2(a2) : b2;
}
function Wh(a2) {
  var b2 = Uh(), c2 = b2.queue;
  if (c2 === null)
    throw Error(p$4(311));
  c2.lastRenderedReducer = a2;
  var d2 = R$1, e2 = d2.baseQueue, f2 = c2.pending;
  if (f2 !== null) {
    if (e2 !== null) {
      var g2 = e2.next;
      e2.next = f2.next;
      f2.next = g2;
    }
    d2.baseQueue = e2 = f2;
    c2.pending = null;
  }
  if (e2 !== null) {
    f2 = e2.next;
    d2 = d2.baseState;
    var h2 = g2 = null, k2 = null, l2 = f2;
    do {
      var m2 = l2.lane;
      if ((Hh & m2) === m2)
        k2 !== null && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d2 = l2.hasEagerState ? l2.eagerState : a2(d2, l2.action);
      else {
        var w2 = {
          lane: m2,
          action: l2.action,
          hasEagerState: l2.hasEagerState,
          eagerState: l2.eagerState,
          next: null
        };
        k2 === null ? (h2 = k2 = w2, g2 = d2) : k2 = k2.next = w2;
        Q$1.lanes |= m2;
        zg |= m2;
      }
      l2 = l2.next;
    } while (l2 !== null && l2 !== f2);
    k2 === null ? g2 = d2 : k2.next = h2;
    Ce(d2, b2.memoizedState) || (og = true);
    b2.memoizedState = d2;
    b2.baseState = g2;
    b2.baseQueue = k2;
    c2.lastRenderedState = d2;
  }
  a2 = c2.interleaved;
  if (a2 !== null) {
    e2 = a2;
    do
      f2 = e2.lane, Q$1.lanes |= f2, zg |= f2, e2 = e2.next;
    while (e2 !== a2);
  } else
    e2 === null && (c2.lanes = 0);
  return [b2.memoizedState, c2.dispatch];
}
function Xh(a2) {
  var b2 = Uh(), c2 = b2.queue;
  if (c2 === null)
    throw Error(p$4(311));
  c2.lastRenderedReducer = a2;
  var d2 = c2.dispatch, e2 = c2.pending, f2 = b2.memoizedState;
  if (e2 !== null) {
    c2.pending = null;
    var g2 = e2 = e2.next;
    do
      f2 = a2(f2, g2.action), g2 = g2.next;
    while (g2 !== e2);
    Ce(f2, b2.memoizedState) || (og = true);
    b2.memoizedState = f2;
    b2.baseQueue === null && (b2.baseState = f2);
    c2.lastRenderedState = f2;
  }
  return [f2, d2];
}
function Yh() {
}
function Zh(a2, b2) {
  var c2 = Q$1, d2 = Uh(), e2 = b2(), f2 = !Ce(d2.memoizedState, e2);
  f2 && (d2.memoizedState = e2, og = true);
  d2 = d2.queue;
  $h(ai.bind(null, c2, d2, a2), [a2]);
  if (d2.getSnapshot !== b2 || f2 || S$1 !== null && S$1.memoizedState.tag & 1) {
    c2.flags |= 2048;
    bi(9, ci.bind(null, c2, d2, e2, b2), void 0, null);
    if (J === null)
      throw Error(p$4(349));
    (Hh & 30) !== 0 || di(c2, b2, e2);
  }
  return e2;
}
function di(a2, b2, c2) {
  a2.flags |= 16384;
  a2 = { getSnapshot: b2, value: c2 };
  b2 = Q$1.updateQueue;
  b2 === null ? (b2 = { lastEffect: null, stores: null }, Q$1.updateQueue = b2, b2.stores = [a2]) : (c2 = b2.stores, c2 === null ? b2.stores = [a2] : c2.push(a2));
}
function ci(a2, b2, c2, d2) {
  b2.value = c2;
  b2.getSnapshot = d2;
  ei(b2) && Eg(a2, 1, -1);
}
function ai(a2, b2, c2) {
  return c2(function() {
    ei(b2) && Eg(a2, 1, -1);
  });
}
function ei(a2) {
  var b2 = a2.getSnapshot;
  a2 = a2.value;
  try {
    var c2 = b2();
    return !Ce(a2, c2);
  } catch (d2) {
    return true;
  }
}
function fi(a2) {
  var b2 = Th();
  typeof a2 === "function" && (a2 = a2());
  b2.memoizedState = b2.baseState = a2;
  a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a2 };
  b2.queue = a2;
  a2 = a2.dispatch = gi.bind(null, Q$1, a2);
  return [b2.memoizedState, a2];
}
function bi(a2, b2, c2, d2) {
  a2 = { tag: a2, create: b2, destroy: c2, deps: d2, next: null };
  b2 = Q$1.updateQueue;
  b2 === null ? (b2 = { lastEffect: null, stores: null }, Q$1.updateQueue = b2, b2.lastEffect = a2.next = a2) : (c2 = b2.lastEffect, c2 === null ? b2.lastEffect = a2.next = a2 : (d2 = c2.next, c2.next = a2, a2.next = d2, b2.lastEffect = a2));
  return a2;
}
function hi() {
  return Uh().memoizedState;
}
function ii(a2, b2, c2, d2) {
  var e2 = Th();
  Q$1.flags |= a2;
  e2.memoizedState = bi(1 | b2, c2, void 0, d2 === void 0 ? null : d2);
}
function ji(a2, b2, c2, d2) {
  var e2 = Uh();
  d2 = d2 === void 0 ? null : d2;
  var f2 = void 0;
  if (R$1 !== null) {
    var g2 = R$1.memoizedState;
    f2 = g2.destroy;
    if (d2 !== null && Mh(d2, g2.deps)) {
      e2.memoizedState = bi(b2, c2, f2, d2);
      return;
    }
  }
  Q$1.flags |= a2;
  e2.memoizedState = bi(1 | b2, c2, f2, d2);
}
function ki(a2, b2) {
  return ii(8390656, 8, a2, b2);
}
function $h(a2, b2) {
  return ji(2048, 8, a2, b2);
}
function li(a2, b2) {
  return ji(4, 2, a2, b2);
}
function mi(a2, b2) {
  return ji(4, 4, a2, b2);
}
function ni(a2, b2) {
  if (typeof b2 === "function")
    return a2 = a2(), b2(a2), function() {
      b2(null);
    };
  if (b2 !== null && b2 !== void 0)
    return a2 = a2(), b2.current = a2, function() {
      b2.current = null;
    };
}
function oi(a2, b2, c2) {
  c2 = c2 !== null && c2 !== void 0 ? c2.concat([a2]) : null;
  return ji(4, 4, ni.bind(null, b2, a2), c2);
}
function pi() {
}
function qi(a2, b2) {
  var c2 = Uh();
  b2 = b2 === void 0 ? null : b2;
  var d2 = c2.memoizedState;
  if (d2 !== null && b2 !== null && Mh(b2, d2[1]))
    return d2[0];
  c2.memoizedState = [a2, b2];
  return a2;
}
function ri(a2, b2) {
  var c2 = Uh();
  b2 = b2 === void 0 ? null : b2;
  var d2 = c2.memoizedState;
  if (d2 !== null && b2 !== null && Mh(b2, d2[1]))
    return d2[0];
  a2 = a2();
  c2.memoizedState = [a2, b2];
  return a2;
}
function si(a2, b2) {
  var c2 = E$1;
  E$1 = c2 !== 0 && 4 > c2 ? c2 : 4;
  a2(true);
  var d2 = Gh.transition;
  Gh.transition = {};
  try {
    a2(false), b2();
  } finally {
    E$1 = c2, Gh.transition = d2;
  }
}
function ti() {
  return Uh().memoizedState;
}
function ui(a2, b2, c2) {
  var d2 = Dg(a2);
  c2 = { lane: d2, action: c2, hasEagerState: false, eagerState: null, next: null };
  vi(a2) ? wi(b2, c2) : (xi(a2, b2, c2), c2 = M$1(), a2 = Eg(a2, d2, c2), a2 !== null && yi(a2, b2, d2));
}
function gi(a2, b2, c2) {
  var d2 = Dg(a2), e2 = { lane: d2, action: c2, hasEagerState: false, eagerState: null, next: null };
  if (vi(a2))
    wi(b2, e2);
  else {
    xi(a2, b2, e2);
    var f2 = a2.alternate;
    if (a2.lanes === 0 && (f2 === null || f2.lanes === 0) && (f2 = b2.lastRenderedReducer, f2 !== null))
      try {
        var g2 = b2.lastRenderedState, h2 = f2(g2, c2);
        e2.hasEagerState = true;
        e2.eagerState = h2;
        if (Ce(h2, g2))
          return;
      } catch (k2) {
      } finally {
      }
    c2 = M$1();
    a2 = Eg(a2, d2, c2);
    a2 !== null && yi(a2, b2, d2);
  }
}
function vi(a2) {
  var b2 = a2.alternate;
  return a2 === Q$1 || b2 !== null && b2 === Q$1;
}
function wi(a2, b2) {
  Jh = Ih = true;
  var c2 = a2.pending;
  c2 === null ? b2.next = b2 : (b2.next = c2.next, c2.next = b2);
  a2.pending = b2;
}
function xi(a2, b2, c2) {
  J !== null && (a2.mode & 1) !== 0 && (K & 2) === 0 ? (a2 = b2.interleaved, a2 === null ? (c2.next = c2, qg === null ? qg = [b2] : qg.push(b2)) : (c2.next = a2.next, a2.next = c2), b2.interleaved = c2) : (a2 = b2.pending, a2 === null ? c2.next = c2 : (c2.next = a2.next, a2.next = c2), b2.pending = c2);
}
function yi(a2, b2, c2) {
  if ((c2 & 4194240) !== 0) {
    var d2 = b2.lanes;
    d2 &= a2.pendingLanes;
    c2 |= d2;
    b2.lanes = c2;
    yc(a2, c2);
  }
}
var Rh = { readContext: pg, useCallback: U$1, useContext: U$1, useEffect: U$1, useImperativeHandle: U$1, useInsertionEffect: U$1, useLayoutEffect: U$1, useMemo: U$1, useReducer: U$1, useRef: U$1, useState: U$1, useDebugValue: U$1, useDeferredValue: U$1, useTransition: U$1, useMutableSource: U$1, useSyncExternalStore: U$1, useId: U$1, unstable_isNewReconciler: false }, Oh = { readContext: pg, useCallback: function(a2, b2) {
  Th().memoizedState = [a2, b2 === void 0 ? null : b2];
  return a2;
}, useContext: pg, useEffect: ki, useImperativeHandle: function(a2, b2, c2) {
  c2 = c2 !== null && c2 !== void 0 ? c2.concat([a2]) : null;
  return ii(4194308, 4, ni.bind(null, b2, a2), c2);
}, useLayoutEffect: function(a2, b2) {
  return ii(4194308, 4, a2, b2);
}, useInsertionEffect: function(a2, b2) {
  return ii(4, 2, a2, b2);
}, useMemo: function(a2, b2) {
  var c2 = Th();
  b2 = b2 === void 0 ? null : b2;
  a2 = a2();
  c2.memoizedState = [a2, b2];
  return a2;
}, useReducer: function(a2, b2, c2) {
  var d2 = Th();
  b2 = c2 !== void 0 ? c2(b2) : b2;
  d2.memoizedState = d2.baseState = b2;
  a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a2, lastRenderedState: b2 };
  d2.queue = a2;
  a2 = a2.dispatch = ui.bind(null, Q$1, a2);
  return [d2.memoizedState, a2];
}, useRef: function(a2) {
  var b2 = Th();
  a2 = { current: a2 };
  return b2.memoizedState = a2;
}, useState: fi, useDebugValue: pi, useDeferredValue: function(a2) {
  var b2 = fi(a2), c2 = b2[0], d2 = b2[1];
  ki(function() {
    var b3 = Gh.transition;
    Gh.transition = {};
    try {
      d2(a2);
    } finally {
      Gh.transition = b3;
    }
  }, [a2]);
  return c2;
}, useTransition: function() {
  var a2 = fi(false), b2 = a2[0];
  a2 = si.bind(null, a2[1]);
  Th().memoizedState = a2;
  return [b2, a2];
}, useMutableSource: function() {
}, useSyncExternalStore: function(a2, b2, c2) {
  var d2 = Q$1, e2 = Th();
  if (N$1) {
    if (c2 === void 0)
      throw Error(p$4(407));
    c2 = c2();
  } else {
    c2 = b2();
    if (J === null)
      throw Error(p$4(349));
    (Hh & 30) !== 0 || di(d2, b2, c2);
  }
  e2.memoizedState = c2;
  var f2 = { value: c2, getSnapshot: b2 };
  e2.queue = f2;
  ki(ai.bind(null, d2, f2, a2), [a2]);
  d2.flags |= 2048;
  bi(9, ci.bind(null, d2, f2, c2, b2), void 0, null);
  return c2;
}, useId: function() {
  var a2 = Th(), b2 = J.identifierPrefix;
  if (N$1) {
    var c2 = Sg;
    var d2 = Rg;
    c2 = (d2 & ~(1 << 32 - lc(d2) - 1)).toString(32) + c2;
    b2 = ":" + b2 + "R" + c2;
    c2 = Kh++;
    0 < c2 && (b2 += "H" + c2.toString(32));
    b2 += ":";
  } else
    c2 = Lh++, b2 = ":" + b2 + "r" + c2.toString(32) + ":";
  return a2.memoizedState = b2;
}, unstable_isNewReconciler: false }, Ph = {
  readContext: pg,
  useCallback: qi,
  useContext: pg,
  useEffect: $h,
  useImperativeHandle: oi,
  useInsertionEffect: li,
  useLayoutEffect: mi,
  useMemo: ri,
  useReducer: Wh,
  useRef: hi,
  useState: function() {
    return Wh(Vh);
  },
  useDebugValue: pi,
  useDeferredValue: function(a2) {
    var b2 = Wh(Vh), c2 = b2[0], d2 = b2[1];
    $h(function() {
      var b3 = Gh.transition;
      Gh.transition = {};
      try {
        d2(a2);
      } finally {
        Gh.transition = b3;
      }
    }, [a2]);
    return c2;
  },
  useTransition: function() {
    var a2 = Wh(Vh)[0], b2 = Uh().memoizedState;
    return [a2, b2];
  },
  useMutableSource: Yh,
  useSyncExternalStore: Zh,
  useId: ti,
  unstable_isNewReconciler: false
}, Qh = {
  readContext: pg,
  useCallback: qi,
  useContext: pg,
  useEffect: $h,
  useImperativeHandle: oi,
  useInsertionEffect: li,
  useLayoutEffect: mi,
  useMemo: ri,
  useReducer: Xh,
  useRef: hi,
  useState: function() {
    return Xh(Vh);
  },
  useDebugValue: pi,
  useDeferredValue: function(a2) {
    var b2 = Xh(Vh), c2 = b2[0], d2 = b2[1];
    $h(function() {
      var b3 = Gh.transition;
      Gh.transition = {};
      try {
        d2(a2);
      } finally {
        Gh.transition = b3;
      }
    }, [a2]);
    return c2;
  },
  useTransition: function() {
    var a2 = Xh(Vh)[0], b2 = Uh().memoizedState;
    return [a2, b2];
  },
  useMutableSource: Yh,
  useSyncExternalStore: Zh,
  useId: ti,
  unstable_isNewReconciler: false
};
function zi(a2, b2) {
  try {
    var c2 = "", d2 = b2;
    do
      c2 += Na(d2), d2 = d2.return;
    while (d2);
    var e2 = c2;
  } catch (f2) {
    e2 = "\nError generating stack: " + f2.message + "\n" + f2.stack;
  }
  return { value: a2, source: b2, stack: e2 };
}
function Ai(a2, b2) {
  try {
    console.error(b2.value);
  } catch (c2) {
    setTimeout(function() {
      throw c2;
    });
  }
}
var Bi = typeof WeakMap === "function" ? WeakMap : Map;
function Ci(a2, b2, c2) {
  c2 = ug(-1, c2);
  c2.tag = 3;
  c2.payload = { element: null };
  var d2 = b2.value;
  c2.callback = function() {
    Di || (Di = true, Ei = d2);
    Ai(a2, b2);
  };
  return c2;
}
function Fi(a2, b2, c2) {
  c2 = ug(-1, c2);
  c2.tag = 3;
  var d2 = a2.type.getDerivedStateFromError;
  if (typeof d2 === "function") {
    var e2 = b2.value;
    c2.payload = function() {
      return d2(e2);
    };
    c2.callback = function() {
      Ai(a2, b2);
    };
  }
  var f2 = a2.stateNode;
  f2 !== null && typeof f2.componentDidCatch === "function" && (c2.callback = function() {
    Ai(a2, b2);
    typeof d2 !== "function" && (Gi === null ? Gi = /* @__PURE__ */ new Set([this]) : Gi.add(this));
    var c3 = b2.stack;
    this.componentDidCatch(b2.value, { componentStack: c3 !== null ? c3 : "" });
  });
  return c2;
}
function Hi(a2, b2, c2) {
  var d2 = a2.pingCache;
  if (d2 === null) {
    d2 = a2.pingCache = new Bi();
    var e2 = /* @__PURE__ */ new Set();
    d2.set(b2, e2);
  } else
    e2 = d2.get(b2), e2 === void 0 && (e2 = /* @__PURE__ */ new Set(), d2.set(b2, e2));
  e2.has(c2) || (e2.add(c2), a2 = Ii.bind(null, a2, b2, c2), b2.then(a2, a2));
}
function Ji(a2) {
  do {
    var b2;
    if (b2 = a2.tag === 13)
      b2 = a2.memoizedState, b2 = b2 !== null ? b2.dehydrated !== null ? true : false : true;
    if (b2)
      return a2;
    a2 = a2.return;
  } while (a2 !== null);
  return null;
}
function Ki(a2, b2, c2, d2, e2) {
  if ((a2.mode & 1) === 0)
    return a2 === b2 ? a2.flags |= 65536 : (a2.flags |= 128, c2.flags |= 131072, c2.flags &= -52805, c2.tag === 1 && (c2.alternate === null ? c2.tag = 17 : (b2 = ug(-1, 1), b2.tag = 2, vg(c2, b2))), c2.lanes |= 1), a2;
  a2.flags |= 65536;
  a2.lanes = e2;
  return a2;
}
var Li, Mi, Ni, Oi;
Li = function(a2, b2) {
  for (var c2 = b2.child; c2 !== null; ) {
    if (c2.tag === 5 || c2.tag === 6)
      a2.appendChild(c2.stateNode);
    else if (c2.tag !== 4 && c2.child !== null) {
      c2.child.return = c2;
      c2 = c2.child;
      continue;
    }
    if (c2 === b2)
      break;
    for (; c2.sibling === null; ) {
      if (c2.return === null || c2.return === b2)
        return;
      c2 = c2.return;
    }
    c2.sibling.return = c2.return;
    c2 = c2.sibling;
  }
};
Mi = function() {
};
Ni = function(a2, b2, c2, d2) {
  var e2 = a2.memoizedProps;
  if (e2 !== d2) {
    a2 = b2.stateNode;
    xh(uh.current);
    var f2 = null;
    switch (c2) {
      case "input":
        e2 = Wa(a2, e2);
        d2 = Wa(a2, d2);
        f2 = [];
        break;
      case "select":
        e2 = A$1({}, e2, { value: void 0 });
        d2 = A$1({}, d2, { value: void 0 });
        f2 = [];
        break;
      case "textarea":
        e2 = db(a2, e2);
        d2 = db(a2, d2);
        f2 = [];
        break;
      default:
        typeof e2.onClick !== "function" && typeof d2.onClick === "function" && (a2.onclick = wf);
    }
    rb(c2, d2);
    var g2;
    c2 = null;
    for (l2 in e2)
      if (!d2.hasOwnProperty(l2) && e2.hasOwnProperty(l2) && e2[l2] != null)
        if (l2 === "style") {
          var h2 = e2[l2];
          for (g2 in h2)
            h2.hasOwnProperty(g2) && (c2 || (c2 = {}), c2[g2] = "");
        } else
          l2 !== "dangerouslySetInnerHTML" && l2 !== "children" && l2 !== "suppressContentEditableWarning" && l2 !== "suppressHydrationWarning" && l2 !== "autoFocus" && (da.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
    for (l2 in d2) {
      var k2 = d2[l2];
      h2 = e2 != null ? e2[l2] : void 0;
      if (d2.hasOwnProperty(l2) && k2 !== h2 && (k2 != null || h2 != null))
        if (l2 === "style")
          if (h2) {
            for (g2 in h2)
              !h2.hasOwnProperty(g2) || k2 && k2.hasOwnProperty(g2) || (c2 || (c2 = {}), c2[g2] = "");
            for (g2 in k2)
              k2.hasOwnProperty(g2) && h2[g2] !== k2[g2] && (c2 || (c2 = {}), c2[g2] = k2[g2]);
          } else
            c2 || (f2 || (f2 = []), f2.push(l2, c2)), c2 = k2;
        else
          l2 === "dangerouslySetInnerHTML" ? (k2 = k2 ? k2.__html : void 0, h2 = h2 ? h2.__html : void 0, k2 != null && h2 !== k2 && (f2 = f2 || []).push(l2, k2)) : l2 === "children" ? typeof k2 !== "string" && typeof k2 !== "number" || (f2 = f2 || []).push(l2, "" + k2) : l2 !== "suppressContentEditableWarning" && l2 !== "suppressHydrationWarning" && (da.hasOwnProperty(l2) ? (k2 != null && l2 === "onScroll" && F$1("scroll", a2), f2 || h2 === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
    }
    c2 && (f2 = f2 || []).push("style", c2);
    var l2 = f2;
    if (b2.updateQueue = l2)
      b2.flags |= 4;
  }
};
Oi = function(a2, b2, c2, d2) {
  c2 !== d2 && (b2.flags |= 4);
};
function Pi(a2, b2) {
  if (!N$1)
    switch (a2.tailMode) {
      case "hidden":
        b2 = a2.tail;
        for (var c2 = null; b2 !== null; )
          b2.alternate !== null && (c2 = b2), b2 = b2.sibling;
        c2 === null ? a2.tail = null : c2.sibling = null;
        break;
      case "collapsed":
        c2 = a2.tail;
        for (var d2 = null; c2 !== null; )
          c2.alternate !== null && (d2 = c2), c2 = c2.sibling;
        d2 === null ? b2 || a2.tail === null ? a2.tail = null : a2.tail.sibling = null : d2.sibling = null;
    }
}
function V(a2) {
  var b2 = a2.alternate !== null && a2.alternate.child === a2.child, c2 = 0, d2 = 0;
  if (b2)
    for (var e2 = a2.child; e2 !== null; )
      c2 |= e2.lanes | e2.childLanes, d2 |= e2.subtreeFlags & 14680064, d2 |= e2.flags & 14680064, e2.return = a2, e2 = e2.sibling;
  else
    for (e2 = a2.child; e2 !== null; )
      c2 |= e2.lanes | e2.childLanes, d2 |= e2.subtreeFlags, d2 |= e2.flags, e2.return = a2, e2 = e2.sibling;
  a2.subtreeFlags |= d2;
  a2.childLanes = c2;
  return b2;
}
function Qi(a2, b2, c2) {
  var d2 = b2.pendingProps;
  Wg(b2);
  switch (b2.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return V(b2), null;
    case 1:
      return Tf(b2.type) && Uf(), V(b2), null;
    case 3:
      d2 = b2.stateNode;
      zh();
      G$1(Qf);
      G$1(I$1);
      Eh();
      d2.pendingContext && (d2.context = d2.pendingContext, d2.pendingContext = null);
      if (a2 === null || a2.child === null)
        fh(b2) ? b2.flags |= 4 : a2 === null || a2.memoizedState.isDehydrated && (b2.flags & 256) === 0 || (b2.flags |= 1024, Zg !== null && (Ri(Zg), Zg = null));
      Mi(a2, b2);
      V(b2);
      return null;
    case 5:
      Bh(b2);
      var e2 = xh(wh.current);
      c2 = b2.type;
      if (a2 !== null && b2.stateNode != null)
        Ni(a2, b2, c2, d2, e2), a2.ref !== b2.ref && (b2.flags |= 512, b2.flags |= 2097152);
      else {
        if (!d2) {
          if (b2.stateNode === null)
            throw Error(p$4(166));
          V(b2);
          return null;
        }
        a2 = xh(uh.current);
        if (fh(b2)) {
          d2 = b2.stateNode;
          c2 = b2.type;
          var f2 = b2.memoizedProps;
          d2[If] = b2;
          d2[Jf] = f2;
          a2 = (b2.mode & 1) !== 0;
          switch (c2) {
            case "dialog":
              F$1("cancel", d2);
              F$1("close", d2);
              break;
            case "iframe":
            case "object":
            case "embed":
              F$1("load", d2);
              break;
            case "video":
            case "audio":
              for (e2 = 0; e2 < ff.length; e2++)
                F$1(ff[e2], d2);
              break;
            case "source":
              F$1("error", d2);
              break;
            case "img":
            case "image":
            case "link":
              F$1("error", d2);
              F$1("load", d2);
              break;
            case "details":
              F$1("toggle", d2);
              break;
            case "input":
              Xa(d2, f2);
              F$1("invalid", d2);
              break;
            case "select":
              d2._wrapperState = { wasMultiple: !!f2.multiple };
              F$1("invalid", d2);
              break;
            case "textarea":
              eb(d2, f2), F$1("invalid", d2);
          }
          rb(c2, f2);
          e2 = null;
          for (var g2 in f2)
            if (f2.hasOwnProperty(g2)) {
              var h2 = f2[g2];
              g2 === "children" ? typeof h2 === "string" ? d2.textContent !== h2 && (vf(d2.textContent, h2, a2), e2 = ["children", h2]) : typeof h2 === "number" && d2.textContent !== "" + h2 && (vf(d2.textContent, h2, a2), e2 = ["children", "" + h2]) : da.hasOwnProperty(g2) && h2 != null && g2 === "onScroll" && F$1("scroll", d2);
            }
          switch (c2) {
            case "input":
              Ta(d2);
              ab(d2, f2, true);
              break;
            case "textarea":
              Ta(d2);
              gb(d2);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof f2.onClick === "function" && (d2.onclick = wf);
          }
          d2 = e2;
          b2.updateQueue = d2;
          d2 !== null && (b2.flags |= 4);
        } else {
          g2 = e2.nodeType === 9 ? e2 : e2.ownerDocument;
          a2 === "http://www.w3.org/1999/xhtml" && (a2 = hb(c2));
          a2 === "http://www.w3.org/1999/xhtml" ? c2 === "script" ? (a2 = g2.createElement("div"), a2.innerHTML = "<script><\/script>", a2 = a2.removeChild(a2.firstChild)) : typeof d2.is === "string" ? a2 = g2.createElement(c2, { is: d2.is }) : (a2 = g2.createElement(c2), c2 === "select" && (g2 = a2, d2.multiple ? g2.multiple = true : d2.size && (g2.size = d2.size))) : a2 = g2.createElementNS(a2, c2);
          a2[If] = b2;
          a2[Jf] = d2;
          Li(a2, b2, false, false);
          b2.stateNode = a2;
          a: {
            g2 = sb(c2, d2);
            switch (c2) {
              case "dialog":
                F$1("cancel", a2);
                F$1("close", a2);
                e2 = d2;
                break;
              case "iframe":
              case "object":
              case "embed":
                F$1("load", a2);
                e2 = d2;
                break;
              case "video":
              case "audio":
                for (e2 = 0; e2 < ff.length; e2++)
                  F$1(ff[e2], a2);
                e2 = d2;
                break;
              case "source":
                F$1("error", a2);
                e2 = d2;
                break;
              case "img":
              case "image":
              case "link":
                F$1("error", a2);
                F$1("load", a2);
                e2 = d2;
                break;
              case "details":
                F$1("toggle", a2);
                e2 = d2;
                break;
              case "input":
                Xa(a2, d2);
                e2 = Wa(a2, d2);
                F$1("invalid", a2);
                break;
              case "option":
                e2 = d2;
                break;
              case "select":
                a2._wrapperState = { wasMultiple: !!d2.multiple };
                e2 = A$1({}, d2, { value: void 0 });
                F$1("invalid", a2);
                break;
              case "textarea":
                eb(a2, d2);
                e2 = db(a2, d2);
                F$1("invalid", a2);
                break;
              default:
                e2 = d2;
            }
            rb(c2, e2);
            h2 = e2;
            for (f2 in h2)
              if (h2.hasOwnProperty(f2)) {
                var k2 = h2[f2];
                f2 === "style" ? pb(a2, k2) : f2 === "dangerouslySetInnerHTML" ? (k2 = k2 ? k2.__html : void 0, k2 != null && kb(a2, k2)) : f2 === "children" ? typeof k2 === "string" ? (c2 !== "textarea" || k2 !== "") && lb(a2, k2) : typeof k2 === "number" && lb(a2, "" + k2) : f2 !== "suppressContentEditableWarning" && f2 !== "suppressHydrationWarning" && f2 !== "autoFocus" && (da.hasOwnProperty(f2) ? k2 != null && f2 === "onScroll" && F$1("scroll", a2) : k2 != null && ra(a2, f2, k2, g2));
              }
            switch (c2) {
              case "input":
                Ta(a2);
                ab(a2, d2, false);
                break;
              case "textarea":
                Ta(a2);
                gb(a2);
                break;
              case "option":
                d2.value != null && a2.setAttribute("value", "" + Qa(d2.value));
                break;
              case "select":
                a2.multiple = !!d2.multiple;
                f2 = d2.value;
                f2 != null ? cb(a2, !!d2.multiple, f2, false) : d2.defaultValue != null && cb(a2, !!d2.multiple, d2.defaultValue, true);
                break;
              default:
                typeof e2.onClick === "function" && (a2.onclick = wf);
            }
            switch (c2) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d2 = !!d2.autoFocus;
                break a;
              case "img":
                d2 = true;
                break a;
              default:
                d2 = false;
            }
          }
          d2 && (b2.flags |= 4);
        }
        b2.ref !== null && (b2.flags |= 512, b2.flags |= 2097152);
      }
      V(b2);
      return null;
    case 6:
      if (a2 && b2.stateNode != null)
        Oi(a2, b2, a2.memoizedProps, d2);
      else {
        if (typeof d2 !== "string" && b2.stateNode === null)
          throw Error(p$4(166));
        c2 = xh(wh.current);
        xh(uh.current);
        if (fh(b2)) {
          d2 = b2.stateNode;
          c2 = b2.memoizedProps;
          d2[If] = b2;
          if (f2 = d2.nodeValue !== c2) {
            if (a2 = Xg, a2 !== null)
              switch (g2 = (a2.mode & 1) !== 0, a2.tag) {
                case 3:
                  vf(d2.nodeValue, c2, g2);
                  break;
                case 5:
                  a2.memoizedProps[void 0] !== true && vf(d2.nodeValue, c2, g2);
              }
          }
          f2 && (b2.flags |= 4);
        } else
          d2 = (c2.nodeType === 9 ? c2 : c2.ownerDocument).createTextNode(d2), d2[If] = b2, b2.stateNode = d2;
      }
      V(b2);
      return null;
    case 13:
      G$1(P$1);
      d2 = b2.memoizedState;
      if (N$1 && Yg !== null && (b2.mode & 1) !== 0 && (b2.flags & 128) === 0) {
        for (d2 = Yg; d2; )
          d2 = Ff(d2.nextSibling);
        gh();
        b2.flags |= 98560;
        return b2;
      }
      if (d2 !== null && d2.dehydrated !== null) {
        d2 = fh(b2);
        if (a2 === null) {
          if (!d2)
            throw Error(p$4(318));
          d2 = b2.memoizedState;
          d2 = d2 !== null ? d2.dehydrated : null;
          if (!d2)
            throw Error(p$4(317));
          d2[If] = b2;
        } else
          gh(), (b2.flags & 128) === 0 && (b2.memoizedState = null), b2.flags |= 4;
        V(b2);
        return null;
      }
      Zg !== null && (Ri(Zg), Zg = null);
      if ((b2.flags & 128) !== 0)
        return b2.lanes = c2, b2;
      d2 = d2 !== null;
      c2 = false;
      a2 === null ? fh(b2) : c2 = a2.memoizedState !== null;
      d2 && !c2 && (b2.child.flags |= 8192, (b2.mode & 1) !== 0 && (a2 === null || (P$1.current & 1) !== 0 ? W$1 === 0 && (W$1 = 3) : Si()));
      b2.updateQueue !== null && (b2.flags |= 4);
      V(b2);
      return null;
    case 4:
      return zh(), Mi(a2, b2), a2 === null && nf(b2.stateNode.containerInfo), V(b2), null;
    case 10:
      return lg(b2.type._context), V(b2), null;
    case 17:
      return Tf(b2.type) && Uf(), V(b2), null;
    case 19:
      G$1(P$1);
      f2 = b2.memoizedState;
      if (f2 === null)
        return V(b2), null;
      d2 = (b2.flags & 128) !== 0;
      g2 = f2.rendering;
      if (g2 === null)
        if (d2)
          Pi(f2, false);
        else {
          if (W$1 !== 0 || a2 !== null && (a2.flags & 128) !== 0)
            for (a2 = b2.child; a2 !== null; ) {
              g2 = Ch(a2);
              if (g2 !== null) {
                b2.flags |= 128;
                Pi(f2, false);
                d2 = g2.updateQueue;
                d2 !== null && (b2.updateQueue = d2, b2.flags |= 4);
                b2.subtreeFlags = 0;
                d2 = c2;
                for (c2 = b2.child; c2 !== null; )
                  f2 = c2, a2 = d2, f2.flags &= 14680066, g2 = f2.alternate, g2 === null ? (f2.childLanes = 0, f2.lanes = a2, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g2.childLanes, f2.lanes = g2.lanes, f2.child = g2.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g2.memoizedProps, f2.memoizedState = g2.memoizedState, f2.updateQueue = g2.updateQueue, f2.type = g2.type, a2 = g2.dependencies, f2.dependencies = a2 === null ? null : { lanes: a2.lanes, firstContext: a2.firstContext }), c2 = c2.sibling;
                H$1(P$1, P$1.current & 1 | 2);
                return b2.child;
              }
              a2 = a2.sibling;
            }
          f2.tail !== null && D$1() > Ti && (b2.flags |= 128, d2 = true, Pi(f2, false), b2.lanes = 4194304);
        }
      else {
        if (!d2)
          if (a2 = Ch(g2), a2 !== null) {
            if (b2.flags |= 128, d2 = true, c2 = a2.updateQueue, c2 !== null && (b2.updateQueue = c2, b2.flags |= 4), Pi(f2, true), f2.tail === null && f2.tailMode === "hidden" && !g2.alternate && !N$1)
              return V(b2), null;
          } else
            2 * D$1() - f2.renderingStartTime > Ti && c2 !== 1073741824 && (b2.flags |= 128, d2 = true, Pi(f2, false), b2.lanes = 4194304);
        f2.isBackwards ? (g2.sibling = b2.child, b2.child = g2) : (c2 = f2.last, c2 !== null ? c2.sibling = g2 : b2.child = g2, f2.last = g2);
      }
      if (f2.tail !== null)
        return b2 = f2.tail, f2.rendering = b2, f2.tail = b2.sibling, f2.renderingStartTime = D$1(), b2.sibling = null, c2 = P$1.current, H$1(P$1, d2 ? c2 & 1 | 2 : c2 & 1), b2;
      V(b2);
      return null;
    case 22:
    case 23:
      return Ui(), d2 = b2.memoizedState !== null, a2 !== null && a2.memoizedState !== null !== d2 && (b2.flags |= 8192), d2 && (b2.mode & 1) !== 0 ? (Vi & 1073741824) !== 0 && (V(b2), b2.subtreeFlags & 6 && (b2.flags |= 8192)) : V(b2), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p$4(156, b2.tag));
}
var Wi = sa.ReactCurrentOwner, og = false;
function Xi(a2, b2, c2, d2) {
  b2.child = a2 === null ? sh(b2, null, c2, d2) : rh(b2, a2.child, c2, d2);
}
function Yi(a2, b2, c2, d2, e2) {
  c2 = c2.render;
  var f2 = b2.ref;
  ng(b2, e2);
  d2 = Nh(a2, b2, c2, d2, f2, e2);
  c2 = Sh();
  if (a2 !== null && !og)
    return b2.updateQueue = a2.updateQueue, b2.flags &= -2053, a2.lanes &= ~e2, Zi(a2, b2, e2);
  N$1 && c2 && Vg(b2);
  b2.flags |= 1;
  Xi(a2, b2, d2, e2);
  return b2.child;
}
function $i(a2, b2, c2, d2, e2) {
  if (a2 === null) {
    var f2 = c2.type;
    if (typeof f2 === "function" && !aj(f2) && f2.defaultProps === void 0 && c2.compare === null && c2.defaultProps === void 0)
      return b2.tag = 15, b2.type = f2, bj(a2, b2, f2, d2, e2);
    a2 = oh(c2.type, null, d2, b2, b2.mode, e2);
    a2.ref = b2.ref;
    a2.return = b2;
    return b2.child = a2;
  }
  f2 = a2.child;
  if ((a2.lanes & e2) === 0) {
    var g2 = f2.memoizedProps;
    c2 = c2.compare;
    c2 = c2 !== null ? c2 : De;
    if (c2(g2, d2) && a2.ref === b2.ref)
      return Zi(a2, b2, e2);
  }
  b2.flags |= 1;
  a2 = mh(f2, d2);
  a2.ref = b2.ref;
  a2.return = b2;
  return b2.child = a2;
}
function bj(a2, b2, c2, d2, e2) {
  if (a2 !== null && De(a2.memoizedProps, d2) && a2.ref === b2.ref)
    if (og = false, (a2.lanes & e2) !== 0)
      (a2.flags & 131072) !== 0 && (og = true);
    else
      return b2.lanes = a2.lanes, Zi(a2, b2, e2);
  return cj(a2, b2, c2, d2, e2);
}
function dj(a2, b2, c2) {
  var d2 = b2.pendingProps, e2 = d2.children, f2 = a2 !== null ? a2.memoizedState : null;
  if (d2.mode === "hidden")
    if ((b2.mode & 1) === 0)
      b2.memoizedState = { baseLanes: 0, cachePool: null }, H$1(ej, Vi), Vi |= c2;
    else if ((c2 & 1073741824) !== 0)
      b2.memoizedState = { baseLanes: 0, cachePool: null }, d2 = f2 !== null ? f2.baseLanes : c2, H$1(ej, Vi), Vi |= d2;
    else
      return a2 = f2 !== null ? f2.baseLanes | c2 : c2, b2.lanes = b2.childLanes = 1073741824, b2.memoizedState = { baseLanes: a2, cachePool: null }, b2.updateQueue = null, H$1(ej, Vi), Vi |= a2, null;
  else
    f2 !== null ? (d2 = f2.baseLanes | c2, b2.memoizedState = null) : d2 = c2, H$1(ej, Vi), Vi |= d2;
  Xi(a2, b2, e2, c2);
  return b2.child;
}
function fj(a2, b2) {
  var c2 = b2.ref;
  if (a2 === null && c2 !== null || a2 !== null && a2.ref !== c2)
    b2.flags |= 512, b2.flags |= 2097152;
}
function cj(a2, b2, c2, d2, e2) {
  var f2 = Tf(c2) ? Rf : I$1.current;
  f2 = Sf(b2, f2);
  ng(b2, e2);
  c2 = Nh(a2, b2, c2, d2, f2, e2);
  d2 = Sh();
  if (a2 !== null && !og)
    return b2.updateQueue = a2.updateQueue, b2.flags &= -2053, a2.lanes &= ~e2, Zi(a2, b2, e2);
  N$1 && d2 && Vg(b2);
  b2.flags |= 1;
  Xi(a2, b2, c2, e2);
  return b2.child;
}
function gj(a2, b2, c2, d2, e2) {
  if (Tf(c2)) {
    var f2 = true;
    Xf(b2);
  } else
    f2 = false;
  ng(b2, e2);
  if (b2.stateNode === null)
    a2 !== null && (a2.alternate = null, b2.alternate = null, b2.flags |= 2), Hg(b2, c2, d2), Jg(b2, c2, d2, e2), d2 = true;
  else if (a2 === null) {
    var g2 = b2.stateNode, h2 = b2.memoizedProps;
    g2.props = h2;
    var k2 = g2.context, l2 = c2.contextType;
    typeof l2 === "object" && l2 !== null ? l2 = pg(l2) : (l2 = Tf(c2) ? Rf : I$1.current, l2 = Sf(b2, l2));
    var m2 = c2.getDerivedStateFromProps, w2 = typeof m2 === "function" || typeof g2.getSnapshotBeforeUpdate === "function";
    w2 || typeof g2.UNSAFE_componentWillReceiveProps !== "function" && typeof g2.componentWillReceiveProps !== "function" || (h2 !== d2 || k2 !== l2) && Ig(b2, g2, d2, l2);
    rg = false;
    var u2 = b2.memoizedState;
    g2.state = u2;
    yg(b2, d2, g2, e2);
    k2 = b2.memoizedState;
    h2 !== d2 || u2 !== k2 || Qf.current || rg ? (typeof m2 === "function" && (Cg(b2, c2, m2, d2), k2 = b2.memoizedState), (h2 = rg || Gg(b2, c2, h2, d2, u2, k2, l2)) ? (w2 || typeof g2.UNSAFE_componentWillMount !== "function" && typeof g2.componentWillMount !== "function" || (typeof g2.componentWillMount === "function" && g2.componentWillMount(), typeof g2.UNSAFE_componentWillMount === "function" && g2.UNSAFE_componentWillMount()), typeof g2.componentDidMount === "function" && (b2.flags |= 4194308)) : (typeof g2.componentDidMount === "function" && (b2.flags |= 4194308), b2.memoizedProps = d2, b2.memoizedState = k2), g2.props = d2, g2.state = k2, g2.context = l2, d2 = h2) : (typeof g2.componentDidMount === "function" && (b2.flags |= 4194308), d2 = false);
  } else {
    g2 = b2.stateNode;
    tg(a2, b2);
    h2 = b2.memoizedProps;
    l2 = b2.type === b2.elementType ? h2 : fg(b2.type, h2);
    g2.props = l2;
    w2 = b2.pendingProps;
    u2 = g2.context;
    k2 = c2.contextType;
    typeof k2 === "object" && k2 !== null ? k2 = pg(k2) : (k2 = Tf(c2) ? Rf : I$1.current, k2 = Sf(b2, k2));
    var y2 = c2.getDerivedStateFromProps;
    (m2 = typeof y2 === "function" || typeof g2.getSnapshotBeforeUpdate === "function") || typeof g2.UNSAFE_componentWillReceiveProps !== "function" && typeof g2.componentWillReceiveProps !== "function" || (h2 !== w2 || u2 !== k2) && Ig(b2, g2, d2, k2);
    rg = false;
    u2 = b2.memoizedState;
    g2.state = u2;
    yg(b2, d2, g2, e2);
    var n2 = b2.memoizedState;
    h2 !== w2 || u2 !== n2 || Qf.current || rg ? (typeof y2 === "function" && (Cg(b2, c2, y2, d2), n2 = b2.memoizedState), (l2 = rg || Gg(b2, c2, l2, d2, u2, n2, k2) || false) ? (m2 || typeof g2.UNSAFE_componentWillUpdate !== "function" && typeof g2.componentWillUpdate !== "function" || (typeof g2.componentWillUpdate === "function" && g2.componentWillUpdate(d2, n2, k2), typeof g2.UNSAFE_componentWillUpdate === "function" && g2.UNSAFE_componentWillUpdate(d2, n2, k2)), typeof g2.componentDidUpdate === "function" && (b2.flags |= 4), typeof g2.getSnapshotBeforeUpdate === "function" && (b2.flags |= 1024)) : (typeof g2.componentDidUpdate !== "function" || h2 === a2.memoizedProps && u2 === a2.memoizedState || (b2.flags |= 4), typeof g2.getSnapshotBeforeUpdate !== "function" || h2 === a2.memoizedProps && u2 === a2.memoizedState || (b2.flags |= 1024), b2.memoizedProps = d2, b2.memoizedState = n2), g2.props = d2, g2.state = n2, g2.context = k2, d2 = l2) : (typeof g2.componentDidUpdate !== "function" || h2 === a2.memoizedProps && u2 === a2.memoizedState || (b2.flags |= 4), typeof g2.getSnapshotBeforeUpdate !== "function" || h2 === a2.memoizedProps && u2 === a2.memoizedState || (b2.flags |= 1024), d2 = false);
  }
  return hj(a2, b2, c2, d2, f2, e2);
}
function hj(a2, b2, c2, d2, e2, f2) {
  fj(a2, b2);
  var g2 = (b2.flags & 128) !== 0;
  if (!d2 && !g2)
    return e2 && Yf(b2, c2, false), Zi(a2, b2, f2);
  d2 = b2.stateNode;
  Wi.current = b2;
  var h2 = g2 && typeof c2.getDerivedStateFromError !== "function" ? null : d2.render();
  b2.flags |= 1;
  a2 !== null && g2 ? (b2.child = rh(b2, a2.child, null, f2), b2.child = rh(b2, null, h2, f2)) : Xi(a2, b2, h2, f2);
  b2.memoizedState = d2.state;
  e2 && Yf(b2, c2, true);
  return b2.child;
}
function ij(a2) {
  var b2 = a2.stateNode;
  b2.pendingContext ? Vf(a2, b2.pendingContext, b2.pendingContext !== b2.context) : b2.context && Vf(a2, b2.context, false);
  yh(a2, b2.containerInfo);
}
function jj(a2, b2, c2, d2, e2) {
  gh();
  hh(e2);
  b2.flags |= 256;
  Xi(a2, b2, c2, d2);
  return b2.child;
}
var kj = { dehydrated: null, treeContext: null, retryLane: 0 };
function lj(a2) {
  return { baseLanes: a2, cachePool: null };
}
function mj(a2, b2, c2) {
  var d2 = b2.pendingProps, e2 = P$1.current, f2 = false, g2 = (b2.flags & 128) !== 0, h2;
  (h2 = g2) || (h2 = a2 !== null && a2.memoizedState === null ? false : (e2 & 2) !== 0);
  if (h2)
    f2 = true, b2.flags &= -129;
  else if (a2 === null || a2.memoizedState !== null)
    e2 |= 1;
  H$1(P$1, e2 & 1);
  if (a2 === null) {
    dh(b2);
    a2 = b2.memoizedState;
    if (a2 !== null && (a2 = a2.dehydrated, a2 !== null))
      return (b2.mode & 1) === 0 ? b2.lanes = 1 : a2.data === "$!" ? b2.lanes = 8 : b2.lanes = 1073741824, null;
    e2 = d2.children;
    a2 = d2.fallback;
    return f2 ? (d2 = b2.mode, f2 = b2.child, e2 = { mode: "hidden", children: e2 }, (d2 & 1) === 0 && f2 !== null ? (f2.childLanes = 0, f2.pendingProps = e2) : f2 = nj(e2, d2, 0, null), a2 = qh(a2, d2, c2, null), f2.return = b2, a2.return = b2, f2.sibling = a2, b2.child = f2, b2.child.memoizedState = lj(c2), b2.memoizedState = kj, a2) : oj(b2, e2);
  }
  e2 = a2.memoizedState;
  if (e2 !== null) {
    h2 = e2.dehydrated;
    if (h2 !== null) {
      if (g2) {
        if (b2.flags & 256)
          return b2.flags &= -257, pj(a2, b2, c2, Error(p$4(422)));
        if (b2.memoizedState !== null)
          return b2.child = a2.child, b2.flags |= 128, null;
        f2 = d2.fallback;
        e2 = b2.mode;
        d2 = nj({ mode: "visible", children: d2.children }, e2, 0, null);
        f2 = qh(f2, e2, c2, null);
        f2.flags |= 2;
        d2.return = b2;
        f2.return = b2;
        d2.sibling = f2;
        b2.child = d2;
        (b2.mode & 1) !== 0 && rh(b2, a2.child, null, c2);
        b2.child.memoizedState = lj(c2);
        b2.memoizedState = kj;
        return f2;
      }
      if ((b2.mode & 1) === 0)
        b2 = pj(a2, b2, c2, null);
      else if (h2.data === "$!")
        b2 = pj(a2, b2, c2, Error(p$4(419)));
      else if (d2 = (c2 & a2.childLanes) !== 0, og || d2) {
        d2 = J;
        if (d2 !== null) {
          switch (c2 & -c2) {
            case 4:
              f2 = 2;
              break;
            case 16:
              f2 = 8;
              break;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
              f2 = 32;
              break;
            case 536870912:
              f2 = 268435456;
              break;
            default:
              f2 = 0;
          }
          d2 = (f2 & (d2.suspendedLanes | c2)) !== 0 ? 0 : f2;
          d2 !== 0 && d2 !== e2.retryLane && (e2.retryLane = d2, Eg(a2, d2, -1));
        }
        Si();
        b2 = pj(a2, b2, c2, Error(p$4(421)));
      } else
        h2.data === "$?" ? (b2.flags |= 128, b2.child = a2.child, b2 = qj.bind(null, a2), h2._reactRetry = b2, b2 = null) : (c2 = e2.treeContext, Yg = Ff(h2.nextSibling), Xg = b2, N$1 = true, Zg = null, c2 !== null && (Og[Pg++] = Rg, Og[Pg++] = Sg, Og[Pg++] = Qg, Rg = c2.id, Sg = c2.overflow, Qg = b2), b2 = oj(b2, b2.pendingProps.children), b2.flags |= 4096);
      return b2;
    }
    if (f2)
      return d2 = rj(a2, b2, d2.children, d2.fallback, c2), f2 = b2.child, e2 = a2.child.memoizedState, f2.memoizedState = e2 === null ? lj(c2) : { baseLanes: e2.baseLanes | c2, cachePool: null }, f2.childLanes = a2.childLanes & ~c2, b2.memoizedState = kj, d2;
    c2 = sj(a2, b2, d2.children, c2);
    b2.memoizedState = null;
    return c2;
  }
  if (f2)
    return d2 = rj(a2, b2, d2.children, d2.fallback, c2), f2 = b2.child, e2 = a2.child.memoizedState, f2.memoizedState = e2 === null ? lj(c2) : { baseLanes: e2.baseLanes | c2, cachePool: null }, f2.childLanes = a2.childLanes & ~c2, b2.memoizedState = kj, d2;
  c2 = sj(a2, b2, d2.children, c2);
  b2.memoizedState = null;
  return c2;
}
function oj(a2, b2) {
  b2 = nj({ mode: "visible", children: b2 }, a2.mode, 0, null);
  b2.return = a2;
  return a2.child = b2;
}
function sj(a2, b2, c2, d2) {
  var e2 = a2.child;
  a2 = e2.sibling;
  c2 = mh(e2, { mode: "visible", children: c2 });
  (b2.mode & 1) === 0 && (c2.lanes = d2);
  c2.return = b2;
  c2.sibling = null;
  a2 !== null && (d2 = b2.deletions, d2 === null ? (b2.deletions = [a2], b2.flags |= 16) : d2.push(a2));
  return b2.child = c2;
}
function rj(a2, b2, c2, d2, e2) {
  var f2 = b2.mode;
  a2 = a2.child;
  var g2 = a2.sibling, h2 = { mode: "hidden", children: c2 };
  (f2 & 1) === 0 && b2.child !== a2 ? (c2 = b2.child, c2.childLanes = 0, c2.pendingProps = h2, b2.deletions = null) : (c2 = mh(a2, h2), c2.subtreeFlags = a2.subtreeFlags & 14680064);
  g2 !== null ? d2 = mh(g2, d2) : (d2 = qh(d2, f2, e2, null), d2.flags |= 2);
  d2.return = b2;
  c2.return = b2;
  c2.sibling = d2;
  b2.child = c2;
  return d2;
}
function pj(a2, b2, c2, d2) {
  d2 !== null && hh(d2);
  rh(b2, a2.child, null, c2);
  a2 = oj(b2, b2.pendingProps.children);
  a2.flags |= 2;
  b2.memoizedState = null;
  return a2;
}
function tj(a2, b2, c2) {
  a2.lanes |= b2;
  var d2 = a2.alternate;
  d2 !== null && (d2.lanes |= b2);
  mg(a2.return, b2, c2);
}
function uj(a2, b2, c2, d2, e2) {
  var f2 = a2.memoizedState;
  f2 === null ? a2.memoizedState = { isBackwards: b2, rendering: null, renderingStartTime: 0, last: d2, tail: c2, tailMode: e2 } : (f2.isBackwards = b2, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d2, f2.tail = c2, f2.tailMode = e2);
}
function vj(a2, b2, c2) {
  var d2 = b2.pendingProps, e2 = d2.revealOrder, f2 = d2.tail;
  Xi(a2, b2, d2.children, c2);
  d2 = P$1.current;
  if ((d2 & 2) !== 0)
    d2 = d2 & 1 | 2, b2.flags |= 128;
  else {
    if (a2 !== null && (a2.flags & 128) !== 0)
      a:
        for (a2 = b2.child; a2 !== null; ) {
          if (a2.tag === 13)
            a2.memoizedState !== null && tj(a2, c2, b2);
          else if (a2.tag === 19)
            tj(a2, c2, b2);
          else if (a2.child !== null) {
            a2.child.return = a2;
            a2 = a2.child;
            continue;
          }
          if (a2 === b2)
            break a;
          for (; a2.sibling === null; ) {
            if (a2.return === null || a2.return === b2)
              break a;
            a2 = a2.return;
          }
          a2.sibling.return = a2.return;
          a2 = a2.sibling;
        }
    d2 &= 1;
  }
  H$1(P$1, d2);
  if ((b2.mode & 1) === 0)
    b2.memoizedState = null;
  else
    switch (e2) {
      case "forwards":
        c2 = b2.child;
        for (e2 = null; c2 !== null; )
          a2 = c2.alternate, a2 !== null && Ch(a2) === null && (e2 = c2), c2 = c2.sibling;
        c2 = e2;
        c2 === null ? (e2 = b2.child, b2.child = null) : (e2 = c2.sibling, c2.sibling = null);
        uj(b2, false, e2, c2, f2);
        break;
      case "backwards":
        c2 = null;
        e2 = b2.child;
        for (b2.child = null; e2 !== null; ) {
          a2 = e2.alternate;
          if (a2 !== null && Ch(a2) === null) {
            b2.child = e2;
            break;
          }
          a2 = e2.sibling;
          e2.sibling = c2;
          c2 = e2;
          e2 = a2;
        }
        uj(b2, true, c2, null, f2);
        break;
      case "together":
        uj(b2, false, null, null, void 0);
        break;
      default:
        b2.memoizedState = null;
    }
  return b2.child;
}
function Zi(a2, b2, c2) {
  a2 !== null && (b2.dependencies = a2.dependencies);
  zg |= b2.lanes;
  if ((c2 & b2.childLanes) === 0)
    return null;
  if (a2 !== null && b2.child !== a2.child)
    throw Error(p$4(153));
  if (b2.child !== null) {
    a2 = b2.child;
    c2 = mh(a2, a2.pendingProps);
    b2.child = c2;
    for (c2.return = b2; a2.sibling !== null; )
      a2 = a2.sibling, c2 = c2.sibling = mh(a2, a2.pendingProps), c2.return = b2;
    c2.sibling = null;
  }
  return b2.child;
}
function wj(a2, b2, c2) {
  switch (b2.tag) {
    case 3:
      ij(b2);
      gh();
      break;
    case 5:
      Ah(b2);
      break;
    case 1:
      Tf(b2.type) && Xf(b2);
      break;
    case 4:
      yh(b2, b2.stateNode.containerInfo);
      break;
    case 10:
      var d2 = b2.type._context, e2 = b2.memoizedProps.value;
      H$1(gg, d2._currentValue);
      d2._currentValue = e2;
      break;
    case 13:
      d2 = b2.memoizedState;
      if (d2 !== null) {
        if (d2.dehydrated !== null)
          return H$1(P$1, P$1.current & 1), b2.flags |= 128, null;
        if ((c2 & b2.child.childLanes) !== 0)
          return mj(a2, b2, c2);
        H$1(P$1, P$1.current & 1);
        a2 = Zi(a2, b2, c2);
        return a2 !== null ? a2.sibling : null;
      }
      H$1(P$1, P$1.current & 1);
      break;
    case 19:
      d2 = (c2 & b2.childLanes) !== 0;
      if ((a2.flags & 128) !== 0) {
        if (d2)
          return vj(a2, b2, c2);
        b2.flags |= 128;
      }
      e2 = b2.memoizedState;
      e2 !== null && (e2.rendering = null, e2.tail = null, e2.lastEffect = null);
      H$1(P$1, P$1.current);
      if (d2)
        break;
      else
        return null;
    case 22:
    case 23:
      return b2.lanes = 0, dj(a2, b2, c2);
  }
  return Zi(a2, b2, c2);
}
function xj(a2, b2) {
  Wg(b2);
  switch (b2.tag) {
    case 1:
      return Tf(b2.type) && Uf(), a2 = b2.flags, a2 & 65536 ? (b2.flags = a2 & -65537 | 128, b2) : null;
    case 3:
      return zh(), G$1(Qf), G$1(I$1), Eh(), a2 = b2.flags, (a2 & 65536) !== 0 && (a2 & 128) === 0 ? (b2.flags = a2 & -65537 | 128, b2) : null;
    case 5:
      return Bh(b2), null;
    case 13:
      G$1(P$1);
      a2 = b2.memoizedState;
      if (a2 !== null && a2.dehydrated !== null) {
        if (b2.alternate === null)
          throw Error(p$4(340));
        gh();
      }
      a2 = b2.flags;
      return a2 & 65536 ? (b2.flags = a2 & -65537 | 128, b2) : null;
    case 19:
      return G$1(P$1), null;
    case 4:
      return zh(), null;
    case 10:
      return lg(b2.type._context), null;
    case 22:
    case 23:
      return Ui(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var yj = false, zj = false, Aj = typeof WeakSet === "function" ? WeakSet : Set, X$1 = null;
function Bj(a2, b2) {
  var c2 = a2.ref;
  if (c2 !== null)
    if (typeof c2 === "function")
      try {
        c2(null);
      } catch (d2) {
        Cj(a2, b2, d2);
      }
    else
      c2.current = null;
}
function Dj(a2, b2, c2) {
  try {
    c2();
  } catch (d2) {
    Cj(a2, b2, d2);
  }
}
var Ej = false;
function Fj(a2, b2) {
  a2 = He();
  if (Ie(a2)) {
    if ("selectionStart" in a2)
      var c2 = { start: a2.selectionStart, end: a2.selectionEnd };
    else
      a: {
        c2 = (c2 = a2.ownerDocument) && c2.defaultView || window;
        var d2 = c2.getSelection && c2.getSelection();
        if (d2 && d2.rangeCount !== 0) {
          c2 = d2.anchorNode;
          var e2 = d2.anchorOffset, f2 = d2.focusNode;
          d2 = d2.focusOffset;
          try {
            c2.nodeType, f2.nodeType;
          } catch (O2) {
            c2 = null;
            break a;
          }
          var g2 = 0, h2 = -1, k2 = -1, l2 = 0, m2 = 0, w2 = a2, u2 = null;
          b:
            for (; ; ) {
              for (var y2; ; ) {
                w2 !== c2 || e2 !== 0 && w2.nodeType !== 3 || (h2 = g2 + e2);
                w2 !== f2 || d2 !== 0 && w2.nodeType !== 3 || (k2 = g2 + d2);
                w2.nodeType === 3 && (g2 += w2.nodeValue.length);
                if ((y2 = w2.firstChild) === null)
                  break;
                u2 = w2;
                w2 = y2;
              }
              for (; ; ) {
                if (w2 === a2)
                  break b;
                u2 === c2 && ++l2 === e2 && (h2 = g2);
                u2 === f2 && ++m2 === d2 && (k2 = g2);
                if ((y2 = w2.nextSibling) !== null)
                  break;
                w2 = u2;
                u2 = w2.parentNode;
              }
              w2 = y2;
            }
          c2 = h2 === -1 || k2 === -1 ? null : { start: h2, end: k2 };
        } else
          c2 = null;
      }
    c2 = c2 || { start: 0, end: 0 };
  } else
    c2 = null;
  xf = { focusedElem: a2, selectionRange: c2 };
  for (X$1 = b2; X$1 !== null; )
    if (b2 = X$1, a2 = b2.child, (b2.subtreeFlags & 1028) !== 0 && a2 !== null)
      a2.return = b2, X$1 = a2;
    else
      for (; X$1 !== null; ) {
        b2 = X$1;
        try {
          var n2 = b2.alternate;
          if ((b2.flags & 1024) !== 0)
            switch (b2.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (n2 !== null) {
                  var v2 = n2.memoizedProps, C2 = n2.memoizedState, t2 = b2.stateNode, r2 = t2.getSnapshotBeforeUpdate(b2.elementType === b2.type ? v2 : fg(b2.type, v2), C2);
                  t2.__reactInternalSnapshotBeforeUpdate = r2;
                }
                break;
              case 3:
                var x2 = b2.stateNode.containerInfo;
                if (x2.nodeType === 1)
                  x2.textContent = "";
                else if (x2.nodeType === 9) {
                  var B2 = x2.body;
                  B2 != null && (B2.textContent = "");
                }
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(p$4(163));
            }
        } catch (O2) {
          Cj(b2, b2.return, O2);
        }
        a2 = b2.sibling;
        if (a2 !== null) {
          a2.return = b2.return;
          X$1 = a2;
          break;
        }
        X$1 = b2.return;
      }
  n2 = Ej;
  Ej = false;
  return n2;
}
function Gj(a2, b2, c2) {
  var d2 = b2.updateQueue;
  d2 = d2 !== null ? d2.lastEffect : null;
  if (d2 !== null) {
    var e2 = d2 = d2.next;
    do {
      if ((e2.tag & a2) === a2) {
        var f2 = e2.destroy;
        e2.destroy = void 0;
        f2 !== void 0 && Dj(b2, c2, f2);
      }
      e2 = e2.next;
    } while (e2 !== d2);
  }
}
function Hj(a2, b2) {
  b2 = b2.updateQueue;
  b2 = b2 !== null ? b2.lastEffect : null;
  if (b2 !== null) {
    var c2 = b2 = b2.next;
    do {
      if ((c2.tag & a2) === a2) {
        var d2 = c2.create;
        c2.destroy = d2();
      }
      c2 = c2.next;
    } while (c2 !== b2);
  }
}
function Ij(a2) {
  var b2 = a2.ref;
  if (b2 !== null) {
    var c2 = a2.stateNode;
    switch (a2.tag) {
      case 5:
        a2 = c2;
        break;
      default:
        a2 = c2;
    }
    typeof b2 === "function" ? b2(a2) : b2.current = a2;
  }
}
function Jj(a2, b2, c2) {
  if (ic && typeof ic.onCommitFiberUnmount === "function")
    try {
      ic.onCommitFiberUnmount(hc, b2);
    } catch (g2) {
    }
  switch (b2.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      a2 = b2.updateQueue;
      if (a2 !== null && (a2 = a2.lastEffect, a2 !== null)) {
        var d2 = a2 = a2.next;
        do {
          var e2 = d2, f2 = e2.destroy;
          e2 = e2.tag;
          f2 !== void 0 && ((e2 & 2) !== 0 ? Dj(b2, c2, f2) : (e2 & 4) !== 0 && Dj(b2, c2, f2));
          d2 = d2.next;
        } while (d2 !== a2);
      }
      break;
    case 1:
      Bj(b2, c2);
      a2 = b2.stateNode;
      if (typeof a2.componentWillUnmount === "function")
        try {
          a2.props = b2.memoizedProps, a2.state = b2.memoizedState, a2.componentWillUnmount();
        } catch (g2) {
          Cj(b2, c2, g2);
        }
      break;
    case 5:
      Bj(b2, c2);
      break;
    case 4:
      Kj(a2, b2, c2);
  }
}
function Lj(a2) {
  var b2 = a2.alternate;
  b2 !== null && (a2.alternate = null, Lj(b2));
  a2.child = null;
  a2.deletions = null;
  a2.sibling = null;
  a2.tag === 5 && (b2 = a2.stateNode, b2 !== null && (delete b2[If], delete b2[Jf], delete b2[jf], delete b2[Kf], delete b2[Lf]));
  a2.stateNode = null;
  a2.return = null;
  a2.dependencies = null;
  a2.memoizedProps = null;
  a2.memoizedState = null;
  a2.pendingProps = null;
  a2.stateNode = null;
  a2.updateQueue = null;
}
function Mj(a2) {
  return a2.tag === 5 || a2.tag === 3 || a2.tag === 4;
}
function Nj(a2) {
  a:
    for (; ; ) {
      for (; a2.sibling === null; ) {
        if (a2.return === null || Mj(a2.return))
          return null;
        a2 = a2.return;
      }
      a2.sibling.return = a2.return;
      for (a2 = a2.sibling; a2.tag !== 5 && a2.tag !== 6 && a2.tag !== 18; ) {
        if (a2.flags & 2)
          continue a;
        if (a2.child === null || a2.tag === 4)
          continue a;
        else
          a2.child.return = a2, a2 = a2.child;
      }
      if (!(a2.flags & 2))
        return a2.stateNode;
    }
}
function Oj(a2) {
  a: {
    for (var b2 = a2.return; b2 !== null; ) {
      if (Mj(b2))
        break a;
      b2 = b2.return;
    }
    throw Error(p$4(160));
  }
  var c2 = b2;
  switch (c2.tag) {
    case 5:
      b2 = c2.stateNode;
      c2.flags & 32 && (lb(b2, ""), c2.flags &= -33);
      c2 = Nj(a2);
      Pj(a2, c2, b2);
      break;
    case 3:
    case 4:
      b2 = c2.stateNode.containerInfo;
      c2 = Nj(a2);
      Qj(a2, c2, b2);
      break;
    default:
      throw Error(p$4(161));
  }
}
function Qj(a2, b2, c2) {
  var d2 = a2.tag;
  if (d2 === 5 || d2 === 6)
    a2 = a2.stateNode, b2 ? c2.nodeType === 8 ? c2.parentNode.insertBefore(a2, b2) : c2.insertBefore(a2, b2) : (c2.nodeType === 8 ? (b2 = c2.parentNode, b2.insertBefore(a2, c2)) : (b2 = c2, b2.appendChild(a2)), c2 = c2._reactRootContainer, c2 !== null && c2 !== void 0 || b2.onclick !== null || (b2.onclick = wf));
  else if (d2 !== 4 && (a2 = a2.child, a2 !== null))
    for (Qj(a2, b2, c2), a2 = a2.sibling; a2 !== null; )
      Qj(a2, b2, c2), a2 = a2.sibling;
}
function Pj(a2, b2, c2) {
  var d2 = a2.tag;
  if (d2 === 5 || d2 === 6)
    a2 = a2.stateNode, b2 ? c2.insertBefore(a2, b2) : c2.appendChild(a2);
  else if (d2 !== 4 && (a2 = a2.child, a2 !== null))
    for (Pj(a2, b2, c2), a2 = a2.sibling; a2 !== null; )
      Pj(a2, b2, c2), a2 = a2.sibling;
}
function Kj(a2, b2, c2) {
  for (var d2 = b2, e2 = false, f2, g2; ; ) {
    if (!e2) {
      e2 = d2.return;
      a:
        for (; ; ) {
          if (e2 === null)
            throw Error(p$4(160));
          f2 = e2.stateNode;
          switch (e2.tag) {
            case 5:
              g2 = false;
              break a;
            case 3:
              f2 = f2.containerInfo;
              g2 = true;
              break a;
            case 4:
              f2 = f2.containerInfo;
              g2 = true;
              break a;
          }
          e2 = e2.return;
        }
      e2 = true;
    }
    if (d2.tag === 5 || d2.tag === 6) {
      a:
        for (var h2 = a2, k2 = d2, l2 = c2, m2 = k2; ; )
          if (Jj(h2, m2, l2), m2.child !== null && m2.tag !== 4)
            m2.child.return = m2, m2 = m2.child;
          else {
            if (m2 === k2)
              break a;
            for (; m2.sibling === null; ) {
              if (m2.return === null || m2.return === k2)
                break a;
              m2 = m2.return;
            }
            m2.sibling.return = m2.return;
            m2 = m2.sibling;
          }
      g2 ? (h2 = f2, k2 = d2.stateNode, h2.nodeType === 8 ? h2.parentNode.removeChild(k2) : h2.removeChild(k2)) : f2.removeChild(d2.stateNode);
    } else if (d2.tag === 18)
      g2 ? (h2 = f2, k2 = d2.stateNode, h2.nodeType === 8 ? Ef(h2.parentNode, k2) : h2.nodeType === 1 && Ef(h2, k2), Yc(h2)) : Ef(f2, d2.stateNode);
    else if (d2.tag === 4) {
      if (d2.child !== null) {
        f2 = d2.stateNode.containerInfo;
        g2 = true;
        d2.child.return = d2;
        d2 = d2.child;
        continue;
      }
    } else if (Jj(a2, d2, c2), d2.child !== null) {
      d2.child.return = d2;
      d2 = d2.child;
      continue;
    }
    if (d2 === b2)
      break;
    for (; d2.sibling === null; ) {
      if (d2.return === null || d2.return === b2)
        return;
      d2 = d2.return;
      d2.tag === 4 && (e2 = false);
    }
    d2.sibling.return = d2.return;
    d2 = d2.sibling;
  }
}
function Rj(a2, b2) {
  switch (b2.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      Gj(3, b2, b2.return);
      Hj(3, b2);
      Gj(5, b2, b2.return);
      return;
    case 1:
      return;
    case 5:
      var c2 = b2.stateNode;
      if (c2 != null) {
        var d2 = b2.memoizedProps, e2 = a2 !== null ? a2.memoizedProps : d2;
        a2 = b2.type;
        var f2 = b2.updateQueue;
        b2.updateQueue = null;
        if (f2 !== null) {
          a2 === "input" && d2.type === "radio" && d2.name != null && Ya(c2, d2);
          sb(a2, e2);
          b2 = sb(a2, d2);
          for (e2 = 0; e2 < f2.length; e2 += 2) {
            var g2 = f2[e2], h2 = f2[e2 + 1];
            g2 === "style" ? pb(c2, h2) : g2 === "dangerouslySetInnerHTML" ? kb(c2, h2) : g2 === "children" ? lb(c2, h2) : ra(c2, g2, h2, b2);
          }
          switch (a2) {
            case "input":
              Za(c2, d2);
              break;
            case "textarea":
              fb(c2, d2);
              break;
            case "select":
              a2 = c2._wrapperState.wasMultiple, c2._wrapperState.wasMultiple = !!d2.multiple, f2 = d2.value, f2 != null ? cb(c2, !!d2.multiple, f2, false) : a2 !== !!d2.multiple && (d2.defaultValue != null ? cb(c2, !!d2.multiple, d2.defaultValue, true) : cb(c2, !!d2.multiple, d2.multiple ? [] : "", false));
          }
          c2[Jf] = d2;
        }
      }
      return;
    case 6:
      if (b2.stateNode === null)
        throw Error(p$4(162));
      b2.stateNode.nodeValue = b2.memoizedProps;
      return;
    case 3:
      a2 !== null && a2.memoizedState.isDehydrated && Yc(b2.stateNode.containerInfo);
      return;
    case 12:
      return;
    case 13:
      Sj(b2);
      return;
    case 19:
      Sj(b2);
      return;
    case 17:
      return;
  }
  throw Error(p$4(163));
}
function Sj(a2) {
  var b2 = a2.updateQueue;
  if (b2 !== null) {
    a2.updateQueue = null;
    var c2 = a2.stateNode;
    c2 === null && (c2 = a2.stateNode = new Aj());
    b2.forEach(function(b3) {
      var d2 = Tj.bind(null, a2, b3);
      c2.has(b3) || (c2.add(b3), b3.then(d2, d2));
    });
  }
}
function Uj(a2, b2) {
  for (X$1 = b2; X$1 !== null; ) {
    b2 = X$1;
    var c2 = b2.deletions;
    if (c2 !== null)
      for (var d2 = 0; d2 < c2.length; d2++) {
        var e2 = c2[d2];
        try {
          Kj(a2, e2, b2);
          var f2 = e2.alternate;
          f2 !== null && (f2.return = null);
          e2.return = null;
        } catch (L2) {
          Cj(e2, b2, L2);
        }
      }
    c2 = b2.child;
    if ((b2.subtreeFlags & 12854) !== 0 && c2 !== null)
      c2.return = b2, X$1 = c2;
    else
      for (; X$1 !== null; ) {
        b2 = X$1;
        try {
          var g2 = b2.flags;
          g2 & 32 && lb(b2.stateNode, "");
          if (g2 & 512) {
            var h2 = b2.alternate;
            if (h2 !== null) {
              var k2 = h2.ref;
              k2 !== null && (typeof k2 === "function" ? k2(null) : k2.current = null);
            }
          }
          if (g2 & 8192)
            switch (b2.tag) {
              case 13:
                if (b2.memoizedState !== null) {
                  var l2 = b2.alternate;
                  if (l2 === null || l2.memoizedState === null)
                    Vj = D$1();
                }
                break;
              case 22:
                var m2 = b2.memoizedState !== null, w2 = b2.alternate, u2 = w2 !== null && w2.memoizedState !== null;
                c2 = b2;
                a: {
                  d2 = c2;
                  e2 = m2;
                  for (var y2 = null, n2 = d2; ; ) {
                    if (n2.tag === 5) {
                      if (y2 === null) {
                        y2 = n2;
                        var v2 = n2.stateNode;
                        if (e2) {
                          var C2 = v2.style;
                          typeof C2.setProperty === "function" ? C2.setProperty("display", "none", "important") : C2.display = "none";
                        } else {
                          var t2 = n2.stateNode, r2 = n2.memoizedProps.style, x2 = r2 !== void 0 && r2 !== null && r2.hasOwnProperty("display") ? r2.display : null;
                          t2.style.display = ob("display", x2);
                        }
                      }
                    } else if (n2.tag === 6)
                      y2 === null && (n2.stateNode.nodeValue = e2 ? "" : n2.memoizedProps);
                    else if ((n2.tag !== 22 && n2.tag !== 23 || n2.memoizedState === null || n2 === d2) && n2.child !== null) {
                      n2.child.return = n2;
                      n2 = n2.child;
                      continue;
                    }
                    if (n2 === d2)
                      break;
                    for (; n2.sibling === null; ) {
                      if (n2.return === null || n2.return === d2)
                        break a;
                      y2 === n2 && (y2 = null);
                      n2 = n2.return;
                    }
                    y2 === n2 && (y2 = null);
                    n2.sibling.return = n2.return;
                    n2 = n2.sibling;
                  }
                }
                if (m2 && !u2 && (c2.mode & 1) !== 0) {
                  X$1 = c2;
                  for (var B2 = c2.child; B2 !== null; ) {
                    for (c2 = X$1 = B2; X$1 !== null; ) {
                      d2 = X$1;
                      var O2 = d2.child;
                      switch (d2.tag) {
                        case 0:
                        case 11:
                        case 14:
                        case 15:
                          Gj(4, d2, d2.return);
                          break;
                        case 1:
                          Bj(d2, d2.return);
                          var T2 = d2.stateNode;
                          if (typeof T2.componentWillUnmount === "function") {
                            var za = d2.return;
                            try {
                              T2.props = d2.memoizedProps, T2.state = d2.memoizedState, T2.componentWillUnmount();
                            } catch (L2) {
                              Cj(d2, za, L2);
                            }
                          }
                          break;
                        case 5:
                          Bj(d2, d2.return);
                          break;
                        case 22:
                          if (d2.memoizedState !== null) {
                            Wj(c2);
                            continue;
                          }
                      }
                      O2 !== null ? (O2.return = d2, X$1 = O2) : Wj(c2);
                    }
                    B2 = B2.sibling;
                  }
                }
            }
          switch (g2 & 4102) {
            case 2:
              Oj(b2);
              b2.flags &= -3;
              break;
            case 6:
              Oj(b2);
              b2.flags &= -3;
              Rj(b2.alternate, b2);
              break;
            case 4096:
              b2.flags &= -4097;
              break;
            case 4100:
              b2.flags &= -4097;
              Rj(b2.alternate, b2);
              break;
            case 4:
              Rj(b2.alternate, b2);
          }
        } catch (L2) {
          Cj(b2, b2.return, L2);
        }
        c2 = b2.sibling;
        if (c2 !== null) {
          c2.return = b2.return;
          X$1 = c2;
          break;
        }
        X$1 = b2.return;
      }
  }
}
function Xj(a2, b2, c2) {
  X$1 = a2;
  Yj(a2);
}
function Yj(a2, b2, c2) {
  for (var d2 = (a2.mode & 1) !== 0; X$1 !== null; ) {
    var e2 = X$1, f2 = e2.child;
    if (e2.tag === 22 && d2) {
      var g2 = e2.memoizedState !== null || yj;
      if (!g2) {
        var h2 = e2.alternate, k2 = h2 !== null && h2.memoizedState !== null || zj;
        h2 = yj;
        var l2 = zj;
        yj = g2;
        if ((zj = k2) && !l2)
          for (X$1 = e2; X$1 !== null; )
            g2 = X$1, k2 = g2.child, g2.tag === 22 && g2.memoizedState !== null ? Zj(e2) : k2 !== null ? (k2.return = g2, X$1 = k2) : Zj(e2);
        for (; f2 !== null; )
          X$1 = f2, Yj(f2), f2 = f2.sibling;
        X$1 = e2;
        yj = h2;
        zj = l2;
      }
      ak(a2);
    } else
      (e2.subtreeFlags & 8772) !== 0 && f2 !== null ? (f2.return = e2, X$1 = f2) : ak(a2);
  }
}
function ak(a2) {
  for (; X$1 !== null; ) {
    var b2 = X$1;
    if ((b2.flags & 8772) !== 0) {
      var c2 = b2.alternate;
      try {
        if ((b2.flags & 8772) !== 0)
          switch (b2.tag) {
            case 0:
            case 11:
            case 15:
              zj || Hj(5, b2);
              break;
            case 1:
              var d2 = b2.stateNode;
              if (b2.flags & 4 && !zj)
                if (c2 === null)
                  d2.componentDidMount();
                else {
                  var e2 = b2.elementType === b2.type ? c2.memoizedProps : fg(b2.type, c2.memoizedProps);
                  d2.componentDidUpdate(e2, c2.memoizedState, d2.__reactInternalSnapshotBeforeUpdate);
                }
              var f2 = b2.updateQueue;
              f2 !== null && Ag(b2, f2, d2);
              break;
            case 3:
              var g2 = b2.updateQueue;
              if (g2 !== null) {
                c2 = null;
                if (b2.child !== null)
                  switch (b2.child.tag) {
                    case 5:
                      c2 = b2.child.stateNode;
                      break;
                    case 1:
                      c2 = b2.child.stateNode;
                  }
                Ag(b2, g2, c2);
              }
              break;
            case 5:
              var h2 = b2.stateNode;
              if (c2 === null && b2.flags & 4) {
                c2 = h2;
                var k2 = b2.memoizedProps;
                switch (b2.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    k2.autoFocus && c2.focus();
                    break;
                  case "img":
                    k2.src && (c2.src = k2.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (b2.memoizedState === null) {
                var l2 = b2.alternate;
                if (l2 !== null) {
                  var m2 = l2.memoizedState;
                  if (m2 !== null) {
                    var w2 = m2.dehydrated;
                    w2 !== null && Yc(w2);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
              break;
            default:
              throw Error(p$4(163));
          }
        zj || b2.flags & 512 && Ij(b2);
      } catch (u2) {
        Cj(b2, b2.return, u2);
      }
    }
    if (b2 === a2) {
      X$1 = null;
      break;
    }
    c2 = b2.sibling;
    if (c2 !== null) {
      c2.return = b2.return;
      X$1 = c2;
      break;
    }
    X$1 = b2.return;
  }
}
function Wj(a2) {
  for (; X$1 !== null; ) {
    var b2 = X$1;
    if (b2 === a2) {
      X$1 = null;
      break;
    }
    var c2 = b2.sibling;
    if (c2 !== null) {
      c2.return = b2.return;
      X$1 = c2;
      break;
    }
    X$1 = b2.return;
  }
}
function Zj(a2) {
  for (; X$1 !== null; ) {
    var b2 = X$1;
    try {
      switch (b2.tag) {
        case 0:
        case 11:
        case 15:
          var c2 = b2.return;
          try {
            Hj(4, b2);
          } catch (k2) {
            Cj(b2, c2, k2);
          }
          break;
        case 1:
          var d2 = b2.stateNode;
          if (typeof d2.componentDidMount === "function") {
            var e2 = b2.return;
            try {
              d2.componentDidMount();
            } catch (k2) {
              Cj(b2, e2, k2);
            }
          }
          var f2 = b2.return;
          try {
            Ij(b2);
          } catch (k2) {
            Cj(b2, f2, k2);
          }
          break;
        case 5:
          var g2 = b2.return;
          try {
            Ij(b2);
          } catch (k2) {
            Cj(b2, g2, k2);
          }
      }
    } catch (k2) {
      Cj(b2, b2.return, k2);
    }
    if (b2 === a2) {
      X$1 = null;
      break;
    }
    var h2 = b2.sibling;
    if (h2 !== null) {
      h2.return = b2.return;
      X$1 = h2;
      break;
    }
    X$1 = b2.return;
  }
}
var bk = Math.ceil, ck = sa.ReactCurrentDispatcher, dk = sa.ReactCurrentOwner, ek = sa.ReactCurrentBatchConfig, K = 0, J = null, Y = null, Z$1 = 0, Vi = 0, ej = Of(0), W$1 = 0, fk = null, zg = 0, gk = 0, hk = 0, ik = null, jk = null, Vj = 0, Ti = Infinity, Di = false, Ei = null, Gi = null, kk = false, lk = null, mk = 0, nk = 0, ok = null, pk = -1, qk = 0;
function M$1() {
  return (K & 6) !== 0 ? D$1() : pk !== -1 ? pk : pk = D$1();
}
function Dg(a2) {
  if ((a2.mode & 1) === 0)
    return 1;
  if ((K & 2) !== 0 && Z$1 !== 0)
    return Z$1 & -Z$1;
  if (eg.transition !== null)
    return qk === 0 && (a2 = oc, oc <<= 1, (oc & 4194240) === 0 && (oc = 64), qk = a2), qk;
  a2 = E$1;
  if (a2 !== 0)
    return a2;
  a2 = window.event;
  a2 = a2 === void 0 ? 16 : ed(a2.type);
  return a2;
}
function Eg(a2, b2, c2) {
  if (50 < nk)
    throw nk = 0, ok = null, Error(p$4(185));
  var d2 = rk(a2, b2);
  if (d2 === null)
    return null;
  wc(d2, b2, c2);
  if ((K & 2) === 0 || d2 !== J)
    d2 === J && ((K & 2) === 0 && (gk |= b2), W$1 === 4 && sk(d2, Z$1)), tk(d2, c2), b2 === 1 && K === 0 && (a2.mode & 1) === 0 && (Ti = D$1() + 500, $f && dg());
  return d2;
}
function rk(a2, b2) {
  a2.lanes |= b2;
  var c2 = a2.alternate;
  c2 !== null && (c2.lanes |= b2);
  c2 = a2;
  for (a2 = a2.return; a2 !== null; )
    a2.childLanes |= b2, c2 = a2.alternate, c2 !== null && (c2.childLanes |= b2), c2 = a2, a2 = a2.return;
  return c2.tag === 3 ? c2.stateNode : null;
}
function tk(a2, b2) {
  var c2 = a2.callbackNode;
  tc(a2, b2);
  var d2 = rc(a2, a2 === J ? Z$1 : 0);
  if (d2 === 0)
    c2 !== null && Zb(c2), a2.callbackNode = null, a2.callbackPriority = 0;
  else if (b2 = d2 & -d2, a2.callbackPriority !== b2) {
    c2 != null && Zb(c2);
    if (b2 === 1)
      a2.tag === 0 ? cg(uk.bind(null, a2)) : bg(uk.bind(null, a2)), Df(function() {
        K === 0 && dg();
      }), c2 = null;
    else {
      switch (zc(d2)) {
        case 1:
          c2 = cc;
          break;
        case 4:
          c2 = dc;
          break;
        case 16:
          c2 = ec;
          break;
        case 536870912:
          c2 = gc;
          break;
        default:
          c2 = ec;
      }
      c2 = vk(c2, wk.bind(null, a2));
    }
    a2.callbackPriority = b2;
    a2.callbackNode = c2;
  }
}
function wk(a2, b2) {
  pk = -1;
  qk = 0;
  if ((K & 6) !== 0)
    throw Error(p$4(327));
  var c2 = a2.callbackNode;
  if (xk() && a2.callbackNode !== c2)
    return null;
  var d2 = rc(a2, a2 === J ? Z$1 : 0);
  if (d2 === 0)
    return null;
  if ((d2 & 30) !== 0 || (d2 & a2.expiredLanes) !== 0 || b2)
    b2 = yk(a2, d2);
  else {
    b2 = d2;
    var e2 = K;
    K |= 2;
    var f2 = zk();
    if (J !== a2 || Z$1 !== b2)
      Ti = D$1() + 500, Ak(a2, b2);
    do
      try {
        Bk();
        break;
      } catch (h2) {
        Ck(a2, h2);
      }
    while (1);
    kg();
    ck.current = f2;
    K = e2;
    Y !== null ? b2 = 0 : (J = null, Z$1 = 0, b2 = W$1);
  }
  if (b2 !== 0) {
    b2 === 2 && (e2 = uc(a2), e2 !== 0 && (d2 = e2, b2 = Dk(a2, e2)));
    if (b2 === 1)
      throw c2 = fk, Ak(a2, 0), sk(a2, d2), tk(a2, D$1()), c2;
    if (b2 === 6)
      sk(a2, d2);
    else {
      e2 = a2.current.alternate;
      if ((d2 & 30) === 0 && !Ek(e2) && (b2 = yk(a2, d2), b2 === 2 && (f2 = uc(a2), f2 !== 0 && (d2 = f2, b2 = Dk(a2, f2))), b2 === 1))
        throw c2 = fk, Ak(a2, 0), sk(a2, d2), tk(a2, D$1()), c2;
      a2.finishedWork = e2;
      a2.finishedLanes = d2;
      switch (b2) {
        case 0:
        case 1:
          throw Error(p$4(345));
        case 2:
          Fk(a2, jk);
          break;
        case 3:
          sk(a2, d2);
          if ((d2 & 130023424) === d2 && (b2 = Vj + 500 - D$1(), 10 < b2)) {
            if (rc(a2, 0) !== 0)
              break;
            e2 = a2.suspendedLanes;
            if ((e2 & d2) !== d2) {
              M$1();
              a2.pingedLanes |= a2.suspendedLanes & e2;
              break;
            }
            a2.timeoutHandle = zf(Fk.bind(null, a2, jk), b2);
            break;
          }
          Fk(a2, jk);
          break;
        case 4:
          sk(a2, d2);
          if ((d2 & 4194240) === d2)
            break;
          b2 = a2.eventTimes;
          for (e2 = -1; 0 < d2; ) {
            var g2 = 31 - lc(d2);
            f2 = 1 << g2;
            g2 = b2[g2];
            g2 > e2 && (e2 = g2);
            d2 &= ~f2;
          }
          d2 = e2;
          d2 = D$1() - d2;
          d2 = (120 > d2 ? 120 : 480 > d2 ? 480 : 1080 > d2 ? 1080 : 1920 > d2 ? 1920 : 3e3 > d2 ? 3e3 : 4320 > d2 ? 4320 : 1960 * bk(d2 / 1960)) - d2;
          if (10 < d2) {
            a2.timeoutHandle = zf(Fk.bind(null, a2, jk), d2);
            break;
          }
          Fk(a2, jk);
          break;
        case 5:
          Fk(a2, jk);
          break;
        default:
          throw Error(p$4(329));
      }
    }
  }
  tk(a2, D$1());
  return a2.callbackNode === c2 ? wk.bind(null, a2) : null;
}
function Dk(a2, b2) {
  var c2 = ik;
  a2.current.memoizedState.isDehydrated && (Ak(a2, b2).flags |= 256);
  a2 = yk(a2, b2);
  a2 !== 2 && (b2 = jk, jk = c2, b2 !== null && Ri(b2));
  return a2;
}
function Ri(a2) {
  jk === null ? jk = a2 : jk.push.apply(jk, a2);
}
function Ek(a2) {
  for (var b2 = a2; ; ) {
    if (b2.flags & 16384) {
      var c2 = b2.updateQueue;
      if (c2 !== null && (c2 = c2.stores, c2 !== null))
        for (var d2 = 0; d2 < c2.length; d2++) {
          var e2 = c2[d2], f2 = e2.getSnapshot;
          e2 = e2.value;
          try {
            if (!Ce(f2(), e2))
              return false;
          } catch (g2) {
            return false;
          }
        }
    }
    c2 = b2.child;
    if (b2.subtreeFlags & 16384 && c2 !== null)
      c2.return = b2, b2 = c2;
    else {
      if (b2 === a2)
        break;
      for (; b2.sibling === null; ) {
        if (b2.return === null || b2.return === a2)
          return true;
        b2 = b2.return;
      }
      b2.sibling.return = b2.return;
      b2 = b2.sibling;
    }
  }
  return true;
}
function sk(a2, b2) {
  b2 &= ~hk;
  b2 &= ~gk;
  a2.suspendedLanes |= b2;
  a2.pingedLanes &= ~b2;
  for (a2 = a2.expirationTimes; 0 < b2; ) {
    var c2 = 31 - lc(b2), d2 = 1 << c2;
    a2[c2] = -1;
    b2 &= ~d2;
  }
}
function uk(a2) {
  if ((K & 6) !== 0)
    throw Error(p$4(327));
  xk();
  var b2 = rc(a2, 0);
  if ((b2 & 1) === 0)
    return tk(a2, D$1()), null;
  var c2 = yk(a2, b2);
  if (a2.tag !== 0 && c2 === 2) {
    var d2 = uc(a2);
    d2 !== 0 && (b2 = d2, c2 = Dk(a2, d2));
  }
  if (c2 === 1)
    throw c2 = fk, Ak(a2, 0), sk(a2, b2), tk(a2, D$1()), c2;
  if (c2 === 6)
    throw Error(p$4(345));
  a2.finishedWork = a2.current.alternate;
  a2.finishedLanes = b2;
  Fk(a2, jk);
  tk(a2, D$1());
  return null;
}
function Gk(a2, b2) {
  var c2 = K;
  K |= 1;
  try {
    return a2(b2);
  } finally {
    K = c2, K === 0 && (Ti = D$1() + 500, $f && dg());
  }
}
function Hk(a2) {
  lk !== null && lk.tag === 0 && (K & 6) === 0 && xk();
  var b2 = K;
  K |= 1;
  var c2 = ek.transition, d2 = E$1;
  try {
    if (ek.transition = null, E$1 = 1, a2)
      return a2();
  } finally {
    E$1 = d2, ek.transition = c2, K = b2, (K & 6) === 0 && dg();
  }
}
function Ui() {
  Vi = ej.current;
  G$1(ej);
}
function Ak(a2, b2) {
  a2.finishedWork = null;
  a2.finishedLanes = 0;
  var c2 = a2.timeoutHandle;
  c2 !== -1 && (a2.timeoutHandle = -1, Af(c2));
  if (Y !== null)
    for (c2 = Y.return; c2 !== null; ) {
      var d2 = c2;
      Wg(d2);
      switch (d2.tag) {
        case 1:
          d2 = d2.type.childContextTypes;
          d2 !== null && d2 !== void 0 && Uf();
          break;
        case 3:
          zh();
          G$1(Qf);
          G$1(I$1);
          Eh();
          break;
        case 5:
          Bh(d2);
          break;
        case 4:
          zh();
          break;
        case 13:
          G$1(P$1);
          break;
        case 19:
          G$1(P$1);
          break;
        case 10:
          lg(d2.type._context);
          break;
        case 22:
        case 23:
          Ui();
      }
      c2 = c2.return;
    }
  J = a2;
  Y = a2 = mh(a2.current, null);
  Z$1 = Vi = b2;
  W$1 = 0;
  fk = null;
  hk = gk = zg = 0;
  jk = ik = null;
  if (qg !== null) {
    for (b2 = 0; b2 < qg.length; b2++)
      if (c2 = qg[b2], d2 = c2.interleaved, d2 !== null) {
        c2.interleaved = null;
        var e2 = d2.next, f2 = c2.pending;
        if (f2 !== null) {
          var g2 = f2.next;
          f2.next = e2;
          d2.next = g2;
        }
        c2.pending = d2;
      }
    qg = null;
  }
  return a2;
}
function Ck(a2, b2) {
  do {
    var c2 = Y;
    try {
      kg();
      Fh.current = Rh;
      if (Ih) {
        for (var d2 = Q$1.memoizedState; d2 !== null; ) {
          var e2 = d2.queue;
          e2 !== null && (e2.pending = null);
          d2 = d2.next;
        }
        Ih = false;
      }
      Hh = 0;
      S$1 = R$1 = Q$1 = null;
      Jh = false;
      Kh = 0;
      dk.current = null;
      if (c2 === null || c2.return === null) {
        W$1 = 1;
        fk = b2;
        Y = null;
        break;
      }
      a: {
        var f2 = a2, g2 = c2.return, h2 = c2, k2 = b2;
        b2 = Z$1;
        h2.flags |= 32768;
        if (k2 !== null && typeof k2 === "object" && typeof k2.then === "function") {
          var l2 = k2, m2 = h2, w2 = m2.tag;
          if ((m2.mode & 1) === 0 && (w2 === 0 || w2 === 11 || w2 === 15)) {
            var u2 = m2.alternate;
            u2 ? (m2.updateQueue = u2.updateQueue, m2.memoizedState = u2.memoizedState, m2.lanes = u2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
          }
          var y2 = Ji(g2);
          if (y2 !== null) {
            y2.flags &= -257;
            Ki(y2, g2, h2, f2, b2);
            y2.mode & 1 && Hi(f2, l2, b2);
            b2 = y2;
            k2 = l2;
            var n2 = b2.updateQueue;
            if (n2 === null) {
              var v2 = /* @__PURE__ */ new Set();
              v2.add(k2);
              b2.updateQueue = v2;
            } else
              n2.add(k2);
            break a;
          } else {
            if ((b2 & 1) === 0) {
              Hi(f2, l2, b2);
              Si();
              break a;
            }
            k2 = Error(p$4(426));
          }
        } else if (N$1 && h2.mode & 1) {
          var C2 = Ji(g2);
          if (C2 !== null) {
            (C2.flags & 65536) === 0 && (C2.flags |= 256);
            Ki(C2, g2, h2, f2, b2);
            hh(k2);
            break a;
          }
        }
        f2 = k2;
        W$1 !== 4 && (W$1 = 2);
        ik === null ? ik = [f2] : ik.push(f2);
        k2 = zi(k2, h2);
        h2 = g2;
        do {
          switch (h2.tag) {
            case 3:
              h2.flags |= 65536;
              b2 &= -b2;
              h2.lanes |= b2;
              var t2 = Ci(h2, k2, b2);
              xg(h2, t2);
              break a;
            case 1:
              f2 = k2;
              var r2 = h2.type, x2 = h2.stateNode;
              if ((h2.flags & 128) === 0 && (typeof r2.getDerivedStateFromError === "function" || x2 !== null && typeof x2.componentDidCatch === "function" && (Gi === null || !Gi.has(x2)))) {
                h2.flags |= 65536;
                b2 &= -b2;
                h2.lanes |= b2;
                var B2 = Fi(h2, f2, b2);
                xg(h2, B2);
                break a;
              }
          }
          h2 = h2.return;
        } while (h2 !== null);
      }
      Ik(c2);
    } catch (O2) {
      b2 = O2;
      Y === c2 && c2 !== null && (Y = c2 = c2.return);
      continue;
    }
    break;
  } while (1);
}
function zk() {
  var a2 = ck.current;
  ck.current = Rh;
  return a2 === null ? Rh : a2;
}
function Si() {
  if (W$1 === 0 || W$1 === 3 || W$1 === 2)
    W$1 = 4;
  J === null || (zg & 268435455) === 0 && (gk & 268435455) === 0 || sk(J, Z$1);
}
function yk(a2, b2) {
  var c2 = K;
  K |= 2;
  var d2 = zk();
  J === a2 && Z$1 === b2 || Ak(a2, b2);
  do
    try {
      Jk();
      break;
    } catch (e2) {
      Ck(a2, e2);
    }
  while (1);
  kg();
  K = c2;
  ck.current = d2;
  if (Y !== null)
    throw Error(p$4(261));
  J = null;
  Z$1 = 0;
  return W$1;
}
function Jk() {
  for (; Y !== null; )
    Kk(Y);
}
function Bk() {
  for (; Y !== null && !$b(); )
    Kk(Y);
}
function Kk(a2) {
  var b2 = Lk(a2.alternate, a2, Vi);
  a2.memoizedProps = a2.pendingProps;
  b2 === null ? Ik(a2) : Y = b2;
  dk.current = null;
}
function Ik(a2) {
  var b2 = a2;
  do {
    var c2 = b2.alternate;
    a2 = b2.return;
    if ((b2.flags & 32768) === 0) {
      if (c2 = Qi(c2, b2, Vi), c2 !== null) {
        Y = c2;
        return;
      }
    } else {
      c2 = xj(c2, b2);
      if (c2 !== null) {
        c2.flags &= 32767;
        Y = c2;
        return;
      }
      if (a2 !== null)
        a2.flags |= 32768, a2.subtreeFlags = 0, a2.deletions = null;
      else {
        W$1 = 6;
        Y = null;
        return;
      }
    }
    b2 = b2.sibling;
    if (b2 !== null) {
      Y = b2;
      return;
    }
    Y = b2 = a2;
  } while (b2 !== null);
  W$1 === 0 && (W$1 = 5);
}
function Fk(a2, b2) {
  var c2 = E$1, d2 = ek.transition;
  try {
    ek.transition = null, E$1 = 1, Mk(a2, b2, c2);
  } finally {
    ek.transition = d2, E$1 = c2;
  }
  return null;
}
function Mk(a2, b2, c2) {
  do
    xk();
  while (lk !== null);
  if ((K & 6) !== 0)
    throw Error(p$4(327));
  var d2 = a2.finishedWork, e2 = a2.finishedLanes;
  if (d2 === null)
    return null;
  a2.finishedWork = null;
  a2.finishedLanes = 0;
  if (d2 === a2.current)
    throw Error(p$4(177));
  a2.callbackNode = null;
  a2.callbackPriority = 0;
  var f2 = d2.lanes | d2.childLanes;
  xc(a2, f2);
  a2 === J && (Y = J = null, Z$1 = 0);
  (d2.subtreeFlags & 2064) === 0 && (d2.flags & 2064) === 0 || kk || (kk = true, vk(ec, function() {
    xk();
    return null;
  }));
  f2 = (d2.flags & 15990) !== 0;
  if ((d2.subtreeFlags & 15990) !== 0 || f2) {
    f2 = ek.transition;
    ek.transition = null;
    var g2 = E$1;
    E$1 = 1;
    var h2 = K;
    K |= 4;
    dk.current = null;
    Fj(a2, d2);
    Uj(a2, d2);
    Je(xf);
    xf = null;
    a2.current = d2;
    Xj(d2);
    ac();
    K = h2;
    E$1 = g2;
    ek.transition = f2;
  } else
    a2.current = d2;
  kk && (kk = false, lk = a2, mk = e2);
  f2 = a2.pendingLanes;
  f2 === 0 && (Gi = null);
  jc(d2.stateNode);
  tk(a2, D$1());
  if (b2 !== null)
    for (c2 = a2.onRecoverableError, d2 = 0; d2 < b2.length; d2++)
      c2(b2[d2]);
  if (Di)
    throw Di = false, a2 = Ei, Ei = null, a2;
  (mk & 1) !== 0 && a2.tag !== 0 && xk();
  f2 = a2.pendingLanes;
  (f2 & 1) !== 0 ? a2 === ok ? nk++ : (nk = 0, ok = a2) : nk = 0;
  dg();
  return null;
}
function xk() {
  if (lk !== null) {
    var a2 = zc(mk), b2 = ek.transition, c2 = E$1;
    try {
      ek.transition = null;
      E$1 = 16 > a2 ? 16 : a2;
      if (lk === null)
        var d2 = false;
      else {
        a2 = lk;
        lk = null;
        mk = 0;
        if ((K & 6) !== 0)
          throw Error(p$4(331));
        var e2 = K;
        K |= 4;
        for (X$1 = a2.current; X$1 !== null; ) {
          var f2 = X$1, g2 = f2.child;
          if ((X$1.flags & 16) !== 0) {
            var h2 = f2.deletions;
            if (h2 !== null) {
              for (var k2 = 0; k2 < h2.length; k2++) {
                var l2 = h2[k2];
                for (X$1 = l2; X$1 !== null; ) {
                  var m2 = X$1;
                  switch (m2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Gj(8, m2, f2);
                  }
                  var w2 = m2.child;
                  if (w2 !== null)
                    w2.return = m2, X$1 = w2;
                  else
                    for (; X$1 !== null; ) {
                      m2 = X$1;
                      var u2 = m2.sibling, y2 = m2.return;
                      Lj(m2);
                      if (m2 === l2) {
                        X$1 = null;
                        break;
                      }
                      if (u2 !== null) {
                        u2.return = y2;
                        X$1 = u2;
                        break;
                      }
                      X$1 = y2;
                    }
                }
              }
              var n2 = f2.alternate;
              if (n2 !== null) {
                var v2 = n2.child;
                if (v2 !== null) {
                  n2.child = null;
                  do {
                    var C2 = v2.sibling;
                    v2.sibling = null;
                    v2 = C2;
                  } while (v2 !== null);
                }
              }
              X$1 = f2;
            }
          }
          if ((f2.subtreeFlags & 2064) !== 0 && g2 !== null)
            g2.return = f2, X$1 = g2;
          else
            b:
              for (; X$1 !== null; ) {
                f2 = X$1;
                if ((f2.flags & 2048) !== 0)
                  switch (f2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Gj(9, f2, f2.return);
                  }
                var t2 = f2.sibling;
                if (t2 !== null) {
                  t2.return = f2.return;
                  X$1 = t2;
                  break b;
                }
                X$1 = f2.return;
              }
        }
        var r2 = a2.current;
        for (X$1 = r2; X$1 !== null; ) {
          g2 = X$1;
          var x2 = g2.child;
          if ((g2.subtreeFlags & 2064) !== 0 && x2 !== null)
            x2.return = g2, X$1 = x2;
          else
            b:
              for (g2 = r2; X$1 !== null; ) {
                h2 = X$1;
                if ((h2.flags & 2048) !== 0)
                  try {
                    switch (h2.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Hj(9, h2);
                    }
                  } catch (O2) {
                    Cj(h2, h2.return, O2);
                  }
                if (h2 === g2) {
                  X$1 = null;
                  break b;
                }
                var B2 = h2.sibling;
                if (B2 !== null) {
                  B2.return = h2.return;
                  X$1 = B2;
                  break b;
                }
                X$1 = h2.return;
              }
        }
        K = e2;
        dg();
        if (ic && typeof ic.onPostCommitFiberRoot === "function")
          try {
            ic.onPostCommitFiberRoot(hc, a2);
          } catch (O2) {
          }
        d2 = true;
      }
      return d2;
    } finally {
      E$1 = c2, ek.transition = b2;
    }
  }
  return false;
}
function Nk(a2, b2, c2) {
  b2 = zi(c2, b2);
  b2 = Ci(a2, b2, 1);
  vg(a2, b2);
  b2 = M$1();
  a2 = rk(a2, 1);
  a2 !== null && (wc(a2, 1, b2), tk(a2, b2));
}
function Cj(a2, b2, c2) {
  if (a2.tag === 3)
    Nk(a2, a2, c2);
  else
    for (; b2 !== null; ) {
      if (b2.tag === 3) {
        Nk(b2, a2, c2);
        break;
      } else if (b2.tag === 1) {
        var d2 = b2.stateNode;
        if (typeof b2.type.getDerivedStateFromError === "function" || typeof d2.componentDidCatch === "function" && (Gi === null || !Gi.has(d2))) {
          a2 = zi(c2, a2);
          a2 = Fi(b2, a2, 1);
          vg(b2, a2);
          a2 = M$1();
          b2 = rk(b2, 1);
          b2 !== null && (wc(b2, 1, a2), tk(b2, a2));
          break;
        }
      }
      b2 = b2.return;
    }
}
function Ii(a2, b2, c2) {
  var d2 = a2.pingCache;
  d2 !== null && d2.delete(b2);
  b2 = M$1();
  a2.pingedLanes |= a2.suspendedLanes & c2;
  J === a2 && (Z$1 & c2) === c2 && (W$1 === 4 || W$1 === 3 && (Z$1 & 130023424) === Z$1 && 500 > D$1() - Vj ? Ak(a2, 0) : hk |= c2);
  tk(a2, b2);
}
function Ok(a2, b2) {
  b2 === 0 && ((a2.mode & 1) === 0 ? b2 = 1 : (b2 = pc, pc <<= 1, (pc & 130023424) === 0 && (pc = 4194304)));
  var c2 = M$1();
  a2 = rk(a2, b2);
  a2 !== null && (wc(a2, b2, c2), tk(a2, c2));
}
function qj(a2) {
  var b2 = a2.memoizedState, c2 = 0;
  b2 !== null && (c2 = b2.retryLane);
  Ok(a2, c2);
}
function Tj(a2, b2) {
  var c2 = 0;
  switch (a2.tag) {
    case 13:
      var d2 = a2.stateNode;
      var e2 = a2.memoizedState;
      e2 !== null && (c2 = e2.retryLane);
      break;
    case 19:
      d2 = a2.stateNode;
      break;
    default:
      throw Error(p$4(314));
  }
  d2 !== null && d2.delete(b2);
  Ok(a2, c2);
}
var Lk;
Lk = function(a2, b2, c2) {
  if (a2 !== null)
    if (a2.memoizedProps !== b2.pendingProps || Qf.current)
      og = true;
    else {
      if ((a2.lanes & c2) === 0 && (b2.flags & 128) === 0)
        return og = false, wj(a2, b2, c2);
      og = (a2.flags & 131072) !== 0 ? true : false;
    }
  else
    og = false, N$1 && (b2.flags & 1048576) !== 0 && Ug(b2, Ng, b2.index);
  b2.lanes = 0;
  switch (b2.tag) {
    case 2:
      var d2 = b2.type;
      a2 !== null && (a2.alternate = null, b2.alternate = null, b2.flags |= 2);
      a2 = b2.pendingProps;
      var e2 = Sf(b2, I$1.current);
      ng(b2, c2);
      e2 = Nh(null, b2, d2, a2, e2, c2);
      var f2 = Sh();
      b2.flags |= 1;
      typeof e2 === "object" && e2 !== null && typeof e2.render === "function" && e2.$$typeof === void 0 ? (b2.tag = 1, b2.memoizedState = null, b2.updateQueue = null, Tf(d2) ? (f2 = true, Xf(b2)) : f2 = false, b2.memoizedState = e2.state !== null && e2.state !== void 0 ? e2.state : null, sg(b2), e2.updater = Fg, b2.stateNode = e2, e2._reactInternals = b2, Jg(b2, d2, a2, c2), b2 = hj(null, b2, d2, true, f2, c2)) : (b2.tag = 0, N$1 && f2 && Vg(b2), Xi(null, b2, e2, c2), b2 = b2.child);
      return b2;
    case 16:
      d2 = b2.elementType;
      a: {
        a2 !== null && (a2.alternate = null, b2.alternate = null, b2.flags |= 2);
        a2 = b2.pendingProps;
        e2 = d2._init;
        d2 = e2(d2._payload);
        b2.type = d2;
        e2 = b2.tag = Pk(d2);
        a2 = fg(d2, a2);
        switch (e2) {
          case 0:
            b2 = cj(null, b2, d2, a2, c2);
            break a;
          case 1:
            b2 = gj(null, b2, d2, a2, c2);
            break a;
          case 11:
            b2 = Yi(null, b2, d2, a2, c2);
            break a;
          case 14:
            b2 = $i(null, b2, d2, fg(d2.type, a2), c2);
            break a;
        }
        throw Error(p$4(306, d2, ""));
      }
      return b2;
    case 0:
      return d2 = b2.type, e2 = b2.pendingProps, e2 = b2.elementType === d2 ? e2 : fg(d2, e2), cj(a2, b2, d2, e2, c2);
    case 1:
      return d2 = b2.type, e2 = b2.pendingProps, e2 = b2.elementType === d2 ? e2 : fg(d2, e2), gj(a2, b2, d2, e2, c2);
    case 3:
      a: {
        ij(b2);
        if (a2 === null)
          throw Error(p$4(387));
        d2 = b2.pendingProps;
        f2 = b2.memoizedState;
        e2 = f2.element;
        tg(a2, b2);
        yg(b2, d2, null, c2);
        var g2 = b2.memoizedState;
        d2 = g2.element;
        if (f2.isDehydrated)
          if (f2 = {
            element: d2,
            isDehydrated: false,
            cache: g2.cache,
            transitions: g2.transitions
          }, b2.updateQueue.baseState = f2, b2.memoizedState = f2, b2.flags & 256) {
            e2 = Error(p$4(423));
            b2 = jj(a2, b2, d2, c2, e2);
            break a;
          } else if (d2 !== e2) {
            e2 = Error(p$4(424));
            b2 = jj(a2, b2, d2, c2, e2);
            break a;
          } else
            for (Yg = Ff(b2.stateNode.containerInfo.firstChild), Xg = b2, N$1 = true, Zg = null, c2 = sh(b2, null, d2, c2), b2.child = c2; c2; )
              c2.flags = c2.flags & -3 | 4096, c2 = c2.sibling;
        else {
          gh();
          if (d2 === e2) {
            b2 = Zi(a2, b2, c2);
            break a;
          }
          Xi(a2, b2, d2, c2);
        }
        b2 = b2.child;
      }
      return b2;
    case 5:
      return Ah(b2), a2 === null && dh(b2), d2 = b2.type, e2 = b2.pendingProps, f2 = a2 !== null ? a2.memoizedProps : null, g2 = e2.children, yf(d2, e2) ? g2 = null : f2 !== null && yf(d2, f2) && (b2.flags |= 32), fj(a2, b2), Xi(a2, b2, g2, c2), b2.child;
    case 6:
      return a2 === null && dh(b2), null;
    case 13:
      return mj(a2, b2, c2);
    case 4:
      return yh(b2, b2.stateNode.containerInfo), d2 = b2.pendingProps, a2 === null ? b2.child = rh(b2, null, d2, c2) : Xi(a2, b2, d2, c2), b2.child;
    case 11:
      return d2 = b2.type, e2 = b2.pendingProps, e2 = b2.elementType === d2 ? e2 : fg(d2, e2), Yi(a2, b2, d2, e2, c2);
    case 7:
      return Xi(a2, b2, b2.pendingProps, c2), b2.child;
    case 8:
      return Xi(a2, b2, b2.pendingProps.children, c2), b2.child;
    case 12:
      return Xi(a2, b2, b2.pendingProps.children, c2), b2.child;
    case 10:
      a: {
        d2 = b2.type._context;
        e2 = b2.pendingProps;
        f2 = b2.memoizedProps;
        g2 = e2.value;
        H$1(gg, d2._currentValue);
        d2._currentValue = g2;
        if (f2 !== null)
          if (Ce(f2.value, g2)) {
            if (f2.children === e2.children && !Qf.current) {
              b2 = Zi(a2, b2, c2);
              break a;
            }
          } else
            for (f2 = b2.child, f2 !== null && (f2.return = b2); f2 !== null; ) {
              var h2 = f2.dependencies;
              if (h2 !== null) {
                g2 = f2.child;
                for (var k2 = h2.firstContext; k2 !== null; ) {
                  if (k2.context === d2) {
                    if (f2.tag === 1) {
                      k2 = ug(-1, c2 & -c2);
                      k2.tag = 2;
                      var l2 = f2.updateQueue;
                      if (l2 !== null) {
                        l2 = l2.shared;
                        var m2 = l2.pending;
                        m2 === null ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                        l2.pending = k2;
                      }
                    }
                    f2.lanes |= c2;
                    k2 = f2.alternate;
                    k2 !== null && (k2.lanes |= c2);
                    mg(f2.return, c2, b2);
                    h2.lanes |= c2;
                    break;
                  }
                  k2 = k2.next;
                }
              } else if (f2.tag === 10)
                g2 = f2.type === b2.type ? null : f2.child;
              else if (f2.tag === 18) {
                g2 = f2.return;
                if (g2 === null)
                  throw Error(p$4(341));
                g2.lanes |= c2;
                h2 = g2.alternate;
                h2 !== null && (h2.lanes |= c2);
                mg(g2, c2, b2);
                g2 = f2.sibling;
              } else
                g2 = f2.child;
              if (g2 !== null)
                g2.return = f2;
              else
                for (g2 = f2; g2 !== null; ) {
                  if (g2 === b2) {
                    g2 = null;
                    break;
                  }
                  f2 = g2.sibling;
                  if (f2 !== null) {
                    f2.return = g2.return;
                    g2 = f2;
                    break;
                  }
                  g2 = g2.return;
                }
              f2 = g2;
            }
        Xi(a2, b2, e2.children, c2);
        b2 = b2.child;
      }
      return b2;
    case 9:
      return e2 = b2.type, d2 = b2.pendingProps.children, ng(b2, c2), e2 = pg(e2), d2 = d2(e2), b2.flags |= 1, Xi(a2, b2, d2, c2), b2.child;
    case 14:
      return d2 = b2.type, e2 = fg(d2, b2.pendingProps), e2 = fg(d2.type, e2), $i(a2, b2, d2, e2, c2);
    case 15:
      return bj(a2, b2, b2.type, b2.pendingProps, c2);
    case 17:
      return d2 = b2.type, e2 = b2.pendingProps, e2 = b2.elementType === d2 ? e2 : fg(d2, e2), a2 !== null && (a2.alternate = null, b2.alternate = null, b2.flags |= 2), b2.tag = 1, Tf(d2) ? (a2 = true, Xf(b2)) : a2 = false, ng(b2, c2), Hg(b2, d2, e2), Jg(b2, d2, e2, c2), hj(null, b2, d2, true, a2, c2);
    case 19:
      return vj(a2, b2, c2);
    case 22:
      return dj(a2, b2, c2);
  }
  throw Error(p$4(156, b2.tag));
};
function vk(a2, b2) {
  return Yb(a2, b2);
}
function Qk(a2, b2, c2, d2) {
  this.tag = a2;
  this.key = c2;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b2;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d2;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function ah(a2, b2, c2, d2) {
  return new Qk(a2, b2, c2, d2);
}
function aj(a2) {
  a2 = a2.prototype;
  return !(!a2 || !a2.isReactComponent);
}
function Pk(a2) {
  if (typeof a2 === "function")
    return aj(a2) ? 1 : 0;
  if (a2 !== void 0 && a2 !== null) {
    a2 = a2.$$typeof;
    if (a2 === Ba)
      return 11;
    if (a2 === Ea)
      return 14;
  }
  return 2;
}
function mh(a2, b2) {
  var c2 = a2.alternate;
  c2 === null ? (c2 = ah(a2.tag, b2, a2.key, a2.mode), c2.elementType = a2.elementType, c2.type = a2.type, c2.stateNode = a2.stateNode, c2.alternate = a2, a2.alternate = c2) : (c2.pendingProps = b2, c2.type = a2.type, c2.flags = 0, c2.subtreeFlags = 0, c2.deletions = null);
  c2.flags = a2.flags & 14680064;
  c2.childLanes = a2.childLanes;
  c2.lanes = a2.lanes;
  c2.child = a2.child;
  c2.memoizedProps = a2.memoizedProps;
  c2.memoizedState = a2.memoizedState;
  c2.updateQueue = a2.updateQueue;
  b2 = a2.dependencies;
  c2.dependencies = b2 === null ? null : { lanes: b2.lanes, firstContext: b2.firstContext };
  c2.sibling = a2.sibling;
  c2.index = a2.index;
  c2.ref = a2.ref;
  return c2;
}
function oh(a2, b2, c2, d2, e2, f2) {
  var g2 = 2;
  d2 = a2;
  if (typeof a2 === "function")
    aj(a2) && (g2 = 1);
  else if (typeof a2 === "string")
    g2 = 5;
  else
    a:
      switch (a2) {
        case va:
          return qh(c2.children, e2, f2, b2);
        case wa:
          g2 = 8;
          e2 |= 8;
          break;
        case xa:
          return a2 = ah(12, c2, b2, e2 | 2), a2.elementType = xa, a2.lanes = f2, a2;
        case Ca:
          return a2 = ah(13, c2, b2, e2), a2.elementType = Ca, a2.lanes = f2, a2;
        case Da:
          return a2 = ah(19, c2, b2, e2), a2.elementType = Da, a2.lanes = f2, a2;
        case Ga:
          return nj(c2, e2, f2, b2);
        default:
          if (typeof a2 === "object" && a2 !== null)
            switch (a2.$$typeof) {
              case ya:
                g2 = 10;
                break a;
              case Aa:
                g2 = 9;
                break a;
              case Ba:
                g2 = 11;
                break a;
              case Ea:
                g2 = 14;
                break a;
              case Fa:
                g2 = 16;
                d2 = null;
                break a;
            }
          throw Error(p$4(130, a2 == null ? a2 : typeof a2, ""));
      }
  b2 = ah(g2, c2, b2, e2);
  b2.elementType = a2;
  b2.type = d2;
  b2.lanes = f2;
  return b2;
}
function qh(a2, b2, c2, d2) {
  a2 = ah(7, a2, d2, b2);
  a2.lanes = c2;
  return a2;
}
function nj(a2, b2, c2, d2) {
  a2 = ah(22, a2, d2, b2);
  a2.elementType = Ga;
  a2.lanes = c2;
  a2.stateNode = {};
  return a2;
}
function nh(a2, b2, c2) {
  a2 = ah(6, a2, null, b2);
  a2.lanes = c2;
  return a2;
}
function ph(a2, b2, c2) {
  b2 = ah(4, a2.children !== null ? a2.children : [], a2.key, b2);
  b2.lanes = c2;
  b2.stateNode = { containerInfo: a2.containerInfo, pendingChildren: null, implementation: a2.implementation };
  return b2;
}
function Rk(a2, b2, c2, d2, e2) {
  this.tag = b2;
  this.containerInfo = a2;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = vc(0);
  this.expirationTimes = vc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = vc(0);
  this.identifierPrefix = d2;
  this.onRecoverableError = e2;
  this.mutableSourceEagerHydrationData = null;
}
function Sk(a2, b2, c2, d2, e2, f2, g2, h2, k2) {
  a2 = new Rk(a2, b2, c2, h2, k2);
  b2 === 1 ? (b2 = 1, f2 === true && (b2 |= 8)) : b2 = 0;
  f2 = ah(3, null, null, b2);
  a2.current = f2;
  f2.stateNode = a2;
  f2.memoizedState = { element: d2, isDehydrated: c2, cache: null, transitions: null };
  sg(f2);
  return a2;
}
function Tk(a2, b2, c2) {
  var d2 = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: ua, key: d2 == null ? null : "" + d2, children: a2, containerInfo: b2, implementation: c2 };
}
function Uk(a2) {
  if (!a2)
    return Pf;
  a2 = a2._reactInternals;
  a: {
    if (Sb(a2) !== a2 || a2.tag !== 1)
      throw Error(p$4(170));
    var b2 = a2;
    do {
      switch (b2.tag) {
        case 3:
          b2 = b2.stateNode.context;
          break a;
        case 1:
          if (Tf(b2.type)) {
            b2 = b2.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b2 = b2.return;
    } while (b2 !== null);
    throw Error(p$4(171));
  }
  if (a2.tag === 1) {
    var c2 = a2.type;
    if (Tf(c2))
      return Wf(a2, c2, b2);
  }
  return b2;
}
function Vk(a2, b2, c2, d2, e2, f2, g2, h2, k2) {
  a2 = Sk(c2, d2, true, a2, e2, f2, g2, h2, k2);
  a2.context = Uk(null);
  c2 = a2.current;
  d2 = M$1();
  e2 = Dg(c2);
  f2 = ug(d2, e2);
  f2.callback = b2 !== void 0 && b2 !== null ? b2 : null;
  vg(c2, f2);
  a2.current.lanes = e2;
  wc(a2, e2, d2);
  tk(a2, d2);
  return a2;
}
function Wk(a2, b2, c2, d2) {
  var e2 = b2.current, f2 = M$1(), g2 = Dg(e2);
  c2 = Uk(c2);
  b2.context === null ? b2.context = c2 : b2.pendingContext = c2;
  b2 = ug(f2, g2);
  b2.payload = { element: a2 };
  d2 = d2 === void 0 ? null : d2;
  d2 !== null && (b2.callback = d2);
  vg(e2, b2);
  a2 = Eg(e2, g2, f2);
  a2 !== null && wg(a2, e2, g2);
  return g2;
}
function Xk(a2) {
  a2 = a2.current;
  if (!a2.child)
    return null;
  switch (a2.child.tag) {
    case 5:
      return a2.child.stateNode;
    default:
      return a2.child.stateNode;
  }
}
function Yk(a2, b2) {
  a2 = a2.memoizedState;
  if (a2 !== null && a2.dehydrated !== null) {
    var c2 = a2.retryLane;
    a2.retryLane = c2 !== 0 && c2 < b2 ? c2 : b2;
  }
}
function Zk(a2, b2) {
  Yk(a2, b2);
  (a2 = a2.alternate) && Yk(a2, b2);
}
function $k() {
  return null;
}
var al = typeof reportError === "function" ? reportError : function(a2) {
  console.error(a2);
};
function bl(a2) {
  this._internalRoot = a2;
}
cl.prototype.render = bl.prototype.render = function(a2) {
  var b2 = this._internalRoot;
  if (b2 === null)
    throw Error(p$4(409));
  Wk(a2, b2, null, null);
};
cl.prototype.unmount = bl.prototype.unmount = function() {
  var a2 = this._internalRoot;
  if (a2 !== null) {
    this._internalRoot = null;
    var b2 = a2.containerInfo;
    Hk(function() {
      Wk(null, a2, null, null);
    });
    b2[pf] = null;
  }
};
function cl(a2) {
  this._internalRoot = a2;
}
cl.prototype.unstable_scheduleHydration = function(a2) {
  if (a2) {
    var b2 = Dc();
    a2 = { blockedOn: null, target: a2, priority: b2 };
    for (var c2 = 0; c2 < Mc.length && b2 !== 0 && b2 < Mc[c2].priority; c2++)
      ;
    Mc.splice(c2, 0, a2);
    c2 === 0 && Rc(a2);
  }
};
function dl(a2) {
  return !(!a2 || a2.nodeType !== 1 && a2.nodeType !== 9 && a2.nodeType !== 11);
}
function el(a2) {
  return !(!a2 || a2.nodeType !== 1 && a2.nodeType !== 9 && a2.nodeType !== 11 && (a2.nodeType !== 8 || a2.nodeValue !== " react-mount-point-unstable "));
}
function fl() {
}
function gl(a2, b2, c2, d2, e2) {
  if (e2) {
    if (typeof d2 === "function") {
      var f2 = d2;
      d2 = function() {
        var a3 = Xk(g2);
        f2.call(a3);
      };
    }
    var g2 = Vk(b2, d2, a2, 0, null, false, false, "", fl);
    a2._reactRootContainer = g2;
    a2[pf] = g2.current;
    nf(a2.nodeType === 8 ? a2.parentNode : a2);
    Hk();
    return g2;
  }
  for (; e2 = a2.lastChild; )
    a2.removeChild(e2);
  if (typeof d2 === "function") {
    var h2 = d2;
    d2 = function() {
      var a3 = Xk(k2);
      h2.call(a3);
    };
  }
  var k2 = Sk(a2, 0, false, null, null, false, false, "", fl);
  a2._reactRootContainer = k2;
  a2[pf] = k2.current;
  nf(a2.nodeType === 8 ? a2.parentNode : a2);
  Hk(function() {
    Wk(b2, k2, c2, d2);
  });
  return k2;
}
function hl(a2, b2, c2, d2, e2) {
  var f2 = c2._reactRootContainer;
  if (f2) {
    var g2 = f2;
    if (typeof e2 === "function") {
      var h2 = e2;
      e2 = function() {
        var a3 = Xk(g2);
        h2.call(a3);
      };
    }
    Wk(b2, g2, a2, e2);
  } else
    g2 = gl(c2, b2, a2, e2, d2);
  return Xk(g2);
}
Ac = function(a2) {
  switch (a2.tag) {
    case 3:
      var b2 = a2.stateNode;
      if (b2.current.memoizedState.isDehydrated) {
        var c2 = qc(b2.pendingLanes);
        c2 !== 0 && (yc(b2, c2 | 1), tk(b2, D$1()), (K & 6) === 0 && (Ti = D$1() + 500, dg()));
      }
      break;
    case 13:
      var d2 = M$1();
      Hk(function() {
        return Eg(a2, 1, d2);
      });
      Zk(a2, 1);
  }
};
Bc = function(a2) {
  if (a2.tag === 13) {
    var b2 = M$1();
    Eg(a2, 134217728, b2);
    Zk(a2, 134217728);
  }
};
Cc = function(a2) {
  if (a2.tag === 13) {
    var b2 = M$1(), c2 = Dg(a2);
    Eg(a2, c2, b2);
    Zk(a2, c2);
  }
};
Dc = function() {
  return E$1;
};
Ec = function(a2, b2) {
  var c2 = E$1;
  try {
    return E$1 = a2, b2();
  } finally {
    E$1 = c2;
  }
};
vb = function(a2, b2, c2) {
  switch (b2) {
    case "input":
      Za(a2, c2);
      b2 = c2.name;
      if (c2.type === "radio" && b2 != null) {
        for (c2 = a2; c2.parentNode; )
          c2 = c2.parentNode;
        c2 = c2.querySelectorAll("input[name=" + JSON.stringify("" + b2) + '][type="radio"]');
        for (b2 = 0; b2 < c2.length; b2++) {
          var d2 = c2[b2];
          if (d2 !== a2 && d2.form === a2.form) {
            var e2 = Ab(d2);
            if (!e2)
              throw Error(p$4(90));
            Ua(d2);
            Za(d2, e2);
          }
        }
      }
      break;
    case "textarea":
      fb(a2, c2);
      break;
    case "select":
      b2 = c2.value, b2 != null && cb(a2, !!c2.multiple, b2, false);
  }
};
Db = Gk;
Eb = Hk;
var il = { usingClientEntryPoint: false, Events: [zb, pe, Ab, Bb, Cb, Gk] }, jl = { findFiberByHostInstance: Sc, bundleType: 0, version: "18.0.0-fc46dba67-20220329", rendererPackageName: "react-dom" };
var kl = { bundleType: jl.bundleType, version: jl.version, rendererPackageName: jl.rendererPackageName, rendererConfig: jl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: sa.ReactCurrentDispatcher, findHostInstanceByFiber: function(a2) {
  a2 = Wb(a2);
  return a2 === null ? null : a2.stateNode;
}, findFiberByHostInstance: jl.findFiberByHostInstance || $k, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.0.0-fc46dba67-20220329" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined") {
  var ll = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!ll.isDisabled && ll.supportsFiber)
    try {
      hc = ll.inject(kl), ic = ll;
    } catch (a2) {
    }
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = il;
reactDom_production_min.createPortal = function(a2, b2) {
  var c2 = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!dl(b2))
    throw Error(p$4(200));
  return Tk(a2, b2, null, c2);
};
reactDom_production_min.createRoot = function(a2, b2) {
  if (!dl(a2))
    throw Error(p$4(299));
  var c2 = false, d2 = "", e2 = al;
  b2 !== null && b2 !== void 0 && (b2.unstable_strictMode === true && (c2 = true), b2.identifierPrefix !== void 0 && (d2 = b2.identifierPrefix), b2.onRecoverableError !== void 0 && (e2 = b2.onRecoverableError));
  b2 = Sk(a2, 1, false, null, null, c2, false, d2, e2);
  a2[pf] = b2.current;
  nf(a2.nodeType === 8 ? a2.parentNode : a2);
  return new bl(b2);
};
reactDom_production_min.findDOMNode = function(a2) {
  if (a2 == null)
    return null;
  if (a2.nodeType === 1)
    return a2;
  var b2 = a2._reactInternals;
  if (b2 === void 0) {
    if (typeof a2.render === "function")
      throw Error(p$4(188));
    a2 = Object.keys(a2).join(",");
    throw Error(p$4(268, a2));
  }
  a2 = Wb(b2);
  a2 = a2 === null ? null : a2.stateNode;
  return a2;
};
reactDom_production_min.flushSync = function(a2) {
  return Hk(a2);
};
reactDom_production_min.hydrate = function(a2, b2, c2) {
  if (!el(b2))
    throw Error(p$4(200));
  return hl(null, a2, b2, true, c2);
};
reactDom_production_min.hydrateRoot = function(a2, b2, c2) {
  if (!dl(a2))
    throw Error(p$4(405));
  var d2 = c2 != null && c2.hydratedSources || null, e2 = false, f2 = "", g2 = al;
  c2 !== null && c2 !== void 0 && (c2.unstable_strictMode === true && (e2 = true), c2.identifierPrefix !== void 0 && (f2 = c2.identifierPrefix), c2.onRecoverableError !== void 0 && (g2 = c2.onRecoverableError));
  b2 = Vk(b2, null, a2, 1, c2 != null ? c2 : null, e2, false, f2, g2);
  a2[pf] = b2.current;
  nf(a2);
  if (d2)
    for (a2 = 0; a2 < d2.length; a2++)
      c2 = d2[a2], e2 = c2._getVersion, e2 = e2(c2._source), b2.mutableSourceEagerHydrationData == null ? b2.mutableSourceEagerHydrationData = [c2, e2] : b2.mutableSourceEagerHydrationData.push(c2, e2);
  return new cl(b2);
};
reactDom_production_min.render = function(a2, b2, c2) {
  if (!el(b2))
    throw Error(p$4(200));
  return hl(null, a2, b2, false, c2);
};
reactDom_production_min.unmountComponentAtNode = function(a2) {
  if (!el(a2))
    throw Error(p$4(40));
  return a2._reactRootContainer ? (Hk(function() {
    hl(null, null, a2, false, function() {
      a2._reactRootContainer = null;
      a2[pf] = null;
    });
  }), true) : false;
};
reactDom_production_min.unstable_batchedUpdates = Gk;
reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a2, b2, c2, d2) {
  if (!el(c2))
    throw Error(p$4(200));
  if (a2 == null || a2._reactInternals === void 0)
    throw Error(p$4(38));
  return hl(a2, b2, c2, false, d2);
};
reactDom_production_min.version = "18.0.0-fc46dba67-20220329";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  reactDom.exports = reactDom_production_min;
}
var ReactDOM = reactDom.exports;
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}
function getWindow(node2) {
  if (node2 == null) {
    return window;
  }
  if (node2.toString() !== "[object Window]") {
    var ownerDocument = node2.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node2;
}
function isElement(node2) {
  var OwnElement = getWindow(node2).Element;
  return node2 instanceof OwnElement || node2 instanceof Element;
}
function isHTMLElement(node2) {
  var OwnElement = getWindow(node2).HTMLElement;
  return node2 instanceof OwnElement || node2 instanceof HTMLElement;
}
function isShadowRoot(node2) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node2).ShadowRoot;
  return node2 instanceof OwnElement || node2 instanceof ShadowRoot;
}
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect$2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles$1 = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect: effect$2,
  requires: ["computeStyles"]
};
function getBasePlacement(placement) {
  return placement.split("-")[0];
}
var max = Math.max;
var min = Math.min;
var round = Math.round;
function getBoundingClientRect(element, includeScale) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  var rect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (isHTMLElement(element) && includeScale) {
    var offsetHeight = element.offsetHeight;
    var offsetWidth = element.offsetWidth;
    if (offsetWidth > 0) {
      scaleX = round(rect.width) / offsetWidth || 1;
    }
    if (offsetHeight > 0) {
      scaleY = round(rect.height) / offsetHeight || 1;
    }
  }
  return {
    width: rect.width / scaleX,
    height: rect.height / scaleY,
    top: rect.top / scaleY,
    right: rect.right / scaleX,
    bottom: rect.bottom / scaleY,
    left: rect.left / scaleX,
    x: rect.left / scaleX,
    y: rect.top / scaleY
  };
}
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next2 = child;
    do {
      if (next2 && parent.isSameNode(next2)) {
        return true;
      }
      next2 = next2.parentNode || next2.host;
    } while (next2);
  }
  return false;
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
  var isIE = navigator.userAgent.indexOf("Trident") !== -1;
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css2 = getComputedStyle(currentNode);
    if (css2.transform !== "none" || css2.perspective !== "none" || css2.contain === "paint" || ["transform", "perspective"].indexOf(css2.willChange) !== -1 || isFirefox && css2.willChange === "filter" || isFirefox && css2.filter && css2.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}
function withinMaxClamp(min2, value, max2) {
  var v2 = within(min2, value, max2);
  return v2 > max2 ? max2 : v2;
}
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect$1(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    return;
  }
  state.elements.arrow = arrowElement;
}
var arrow$1 = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect$1,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function getVariation(placement) {
  return placement.split("-")[1];
}
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref) {
  var x2 = _ref.x, y2 = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x2 * dpr) / dpr || 0,
    y: round(y2 * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position2 = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x2 = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y2 = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x: x2,
    y: y2
  }) : {
    x: x2,
    y: y2
  };
  x2 = _ref3.x;
  y2 = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle(offsetParent).position !== "static" && position2 === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
      y2 -= offsetY - popperRect.height;
      y2 *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
      x2 -= offsetX - popperRect.width;
      x2 *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position: position2
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x2,
    y: y2
  }) : {
    x: x2,
    y: y2
  };
  x2 = _ref4.x;
  y2 = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x2 + "px, " + y2 + "px)" : "translate3d(" + x2 + "px, " + y2 + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y2 + "px" : "", _Object$assign2[sideX] = hasX ? x2 + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles$1 = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};
var passive = {
  passive: true
};
function effect(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect,
  data: {}
};
var hash$1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash$1[matched];
  });
}
var hash = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash[matched];
  });
}
function getWindowScroll(node2) {
  var win = getWindow(node2);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x2 = 0;
  var y2 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x2 = visualViewport.offsetLeft;
      y2 = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x2 + getWindowScrollBarX(element),
    y: y2
  };
}
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x2 = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y2 = -winScroll.scrollTop;
  if (getComputedStyle(body || html).direction === "rtl") {
    x2 += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
function getScrollParent(node2) {
  if (["html", "body", "#document"].indexOf(getNodeName(node2)) >= 0) {
    return node2.ownerDocument.body;
  }
  if (isHTMLElement(node2) && isScrollParent(node2)) {
    return node2;
  }
  return getScrollParent(getParentNode(node2));
}
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
    }
  }
  return offsets;
}
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a2, b2) {
    return overflows[a2] - overflows[b2];
  });
}
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i2 = 0; i2 < placements2.length; i2++) {
    var placement = placements2[i2];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip$1 = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide$1 = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x2 = _data$state$placement.x, y2 = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x2;
    state.modifiersData.popperOffsets.y += y2;
  }
  state.modifiersData[name] = data;
}
var offset$1 = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets$1 = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min$1 = offset2 + overflow[mainSide];
    var max$1 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset2, tether ? max(max$1, tetherMax) : max$1);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
var preventOverflow$1 = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
function getNodeScroll(node2) {
  if (node2 === getWindow(node2) || !isHTMLElement(node2)) {
    return getWindowScroll(node2);
  } else {
    return getHTMLElementScroll(node2);
  }
}
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
function debounce(fn3) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn3());
        });
      });
    }
    return pending;
  };
}
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper2(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m2) {
          return m2.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn3 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn3 === "function") {
            state = fn3({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref3) {
        var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect2 = _ref3.effect;
        if (typeof effect2 === "function") {
          var cleanupFn = effect2({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn3) {
        return fn3();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});
function _setPrototypeOf(o2, p2) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o3, p3) {
    o3.__proto__ = p3;
    return o3;
  };
  return _setPrototypeOf(o2, p2);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
var config = {
  disabled: false
};
var TransitionGroupContext = React.createContext(null);
var UNMOUNTED = "unmounted";
var EXITED = "exited";
var ENTERING = "entering";
var ENTERED = "entered";
var EXITING = "exiting";
var Transition = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(Transition2, _React$Component);
  function Transition2(props, context) {
    var _this;
    _this = _React$Component.call(this, props, context) || this;
    var parentGroup = context;
    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
    var initialStatus;
    _this.appearStatus = null;
    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.appearStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }
    _this.state = {
      status: initialStatus
    };
    _this.nextCallback = null;
    return _this;
  }
  Transition2.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var nextIn = _ref.in;
    if (nextIn && prevState.status === UNMOUNTED) {
      return {
        status: EXITED
      };
    }
    return null;
  };
  var _proto = Transition2.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var nextStatus = null;
    if (prevProps !== this.props) {
      var status = this.state.status;
      if (this.props.in) {
        if (status !== ENTERING && status !== ENTERED) {
          nextStatus = ENTERING;
        }
      } else {
        if (status === ENTERING || status === ENTERED) {
          nextStatus = EXITING;
        }
      }
    }
    this.updateStatus(false, nextStatus);
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };
  _proto.getTimeouts = function getTimeouts() {
    var timeout = this.props.timeout;
    var exit, enter, appear;
    exit = enter = appear = timeout;
    if (timeout != null && typeof timeout !== "number") {
      exit = timeout.exit;
      enter = timeout.enter;
      appear = timeout.appear !== void 0 ? timeout.appear : enter;
    }
    return {
      exit,
      enter,
      appear
    };
  };
  _proto.updateStatus = function updateStatus(mounting, nextStatus) {
    if (mounting === void 0) {
      mounting = false;
    }
    if (nextStatus !== null) {
      this.cancelNextCallback();
      if (nextStatus === ENTERING) {
        this.performEnter(mounting);
      } else {
        this.performExit();
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({
        status: UNMOUNTED
      });
    }
  };
  _proto.performEnter = function performEnter(mounting) {
    var _this2 = this;
    var enter = this.props.enter;
    var appearing = this.context ? this.context.isMounting : mounting;
    var _ref2 = this.props.nodeRef ? [appearing] : [ReactDOM.findDOMNode(this), appearing], maybeNode = _ref2[0], maybeAppearing = _ref2[1];
    var timeouts = this.getTimeouts();
    var enterTimeout = appearing ? timeouts.appear : timeouts.enter;
    if (!mounting && !enter || config.disabled) {
      this.safeSetState({
        status: ENTERED
      }, function() {
        _this2.props.onEntered(maybeNode);
      });
      return;
    }
    this.props.onEnter(maybeNode, maybeAppearing);
    this.safeSetState({
      status: ENTERING
    }, function() {
      _this2.props.onEntering(maybeNode, maybeAppearing);
      _this2.onTransitionEnd(enterTimeout, function() {
        _this2.safeSetState({
          status: ENTERED
        }, function() {
          _this2.props.onEntered(maybeNode, maybeAppearing);
        });
      });
    });
  };
  _proto.performExit = function performExit() {
    var _this3 = this;
    var exit = this.props.exit;
    var timeouts = this.getTimeouts();
    var maybeNode = this.props.nodeRef ? void 0 : ReactDOM.findDOMNode(this);
    if (!exit || config.disabled) {
      this.safeSetState({
        status: EXITED
      }, function() {
        _this3.props.onExited(maybeNode);
      });
      return;
    }
    this.props.onExit(maybeNode);
    this.safeSetState({
      status: EXITING
    }, function() {
      _this3.props.onExiting(maybeNode);
      _this3.onTransitionEnd(timeouts.exit, function() {
        _this3.safeSetState({
          status: EXITED
        }, function() {
          _this3.props.onExited(maybeNode);
        });
      });
    });
  };
  _proto.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };
  _proto.safeSetState = function safeSetState(nextState, callback) {
    callback = this.setNextCallback(callback);
    this.setState(nextState, callback);
  };
  _proto.setNextCallback = function setNextCallback(callback) {
    var _this4 = this;
    var active = true;
    this.nextCallback = function(event) {
      if (active) {
        active = false;
        _this4.nextCallback = null;
        callback(event);
      }
    };
    this.nextCallback.cancel = function() {
      active = false;
    };
    return this.nextCallback;
  };
  _proto.onTransitionEnd = function onTransitionEnd(timeout, handler) {
    this.setNextCallback(handler);
    var node2 = this.props.nodeRef ? this.props.nodeRef.current : ReactDOM.findDOMNode(this);
    var doesNotHaveTimeoutOrListener = timeout == null && !this.props.addEndListener;
    if (!node2 || doesNotHaveTimeoutOrListener) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node2, this.nextCallback], maybeNode = _ref3[0], maybeNextCallback = _ref3[1];
      this.props.addEndListener(maybeNode, maybeNextCallback);
    }
    if (timeout != null) {
      setTimeout(this.nextCallback, timeout);
    }
  };
  _proto.render = function render() {
    var status = this.state.status;
    if (status === UNMOUNTED) {
      return null;
    }
    var _this$props = this.props, children = _this$props.children;
    _this$props.in;
    _this$props.mountOnEnter;
    _this$props.unmountOnExit;
    _this$props.appear;
    _this$props.enter;
    _this$props.exit;
    _this$props.timeout;
    _this$props.addEndListener;
    _this$props.onEnter;
    _this$props.onEntering;
    _this$props.onEntered;
    _this$props.onExit;
    _this$props.onExiting;
    _this$props.onExited;
    _this$props.nodeRef;
    var childProps = _objectWithoutPropertiesLoose$1(_this$props, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return /* @__PURE__ */ React.createElement(TransitionGroupContext.Provider, {
      value: null
    }, typeof children === "function" ? children(status, childProps) : React.cloneElement(React.Children.only(children), childProps));
  };
  return Transition2;
}(React.Component);
Transition.contextType = TransitionGroupContext;
Transition.propTypes = {};
function noop() {
}
Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: noop,
  onEntering: noop,
  onEntered: noop,
  onExit: noop,
  onExiting: noop,
  onExited: noop
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;
var Transition$1 = Transition;
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
function getChildMapping(children, mapFn) {
  var mapper = function mapper2(child) {
    return mapFn && react.exports.isValidElement(child) ? mapFn(child) : child;
  };
  var result = /* @__PURE__ */ Object.create(null);
  if (children)
    react.exports.Children.map(children, function(c2) {
      return c2;
    }).forEach(function(child) {
      result[child.key] = mapper(child);
    });
  return result;
}
function mergeChildMappings(prev2, next2) {
  prev2 = prev2 || {};
  next2 = next2 || {};
  function getValueForKey(key) {
    return key in next2 ? next2[key] : prev2[key];
  }
  var nextKeysPending = /* @__PURE__ */ Object.create(null);
  var pendingKeys = [];
  for (var prevKey in prev2) {
    if (prevKey in next2) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }
  var i2;
  var childMapping = {};
  for (var nextKey in next2) {
    if (nextKeysPending[nextKey]) {
      for (i2 = 0; i2 < nextKeysPending[nextKey].length; i2++) {
        var pendingNextKey = nextKeysPending[nextKey][i2];
        childMapping[nextKeysPending[nextKey][i2]] = getValueForKey(pendingNextKey);
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }
  for (i2 = 0; i2 < pendingKeys.length; i2++) {
    childMapping[pendingKeys[i2]] = getValueForKey(pendingKeys[i2]);
  }
  return childMapping;
}
function getProp(child, prop, props) {
  return props[prop] != null ? props[prop] : child.props[prop];
}
function getInitialChildMapping(props, onExited) {
  return getChildMapping(props.children, function(child) {
    return react.exports.cloneElement(child, {
      onExited: onExited.bind(null, child),
      in: true,
      appear: getProp(child, "appear", props),
      enter: getProp(child, "enter", props),
      exit: getProp(child, "exit", props)
    });
  });
}
function getNextChildMapping(nextProps, prevChildMapping, onExited) {
  var nextChildMapping = getChildMapping(nextProps.children);
  var children = mergeChildMappings(prevChildMapping, nextChildMapping);
  Object.keys(children).forEach(function(key) {
    var child = children[key];
    if (!react.exports.isValidElement(child))
      return;
    var hasPrev = key in prevChildMapping;
    var hasNext = key in nextChildMapping;
    var prevChild = prevChildMapping[key];
    var isLeaving = react.exports.isValidElement(prevChild) && !prevChild.props.in;
    if (hasNext && (!hasPrev || isLeaving)) {
      children[key] = react.exports.cloneElement(child, {
        onExited: onExited.bind(null, child),
        in: true,
        exit: getProp(child, "exit", nextProps),
        enter: getProp(child, "enter", nextProps)
      });
    } else if (!hasNext && hasPrev && !isLeaving) {
      children[key] = react.exports.cloneElement(child, {
        in: false
      });
    } else if (hasNext && hasPrev && react.exports.isValidElement(prevChild)) {
      children[key] = react.exports.cloneElement(child, {
        onExited: onExited.bind(null, child),
        in: prevChild.props.in,
        exit: getProp(child, "exit", nextProps),
        enter: getProp(child, "enter", nextProps)
      });
    }
  });
  return children;
}
var values = Object.values || function(obj) {
  return Object.keys(obj).map(function(k2) {
    return obj[k2];
  });
};
var defaultProps = {
  component: "div",
  childFactory: function childFactory(child) {
    return child;
  }
};
var TransitionGroup = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(TransitionGroup2, _React$Component);
  function TransitionGroup2(props, context) {
    var _this;
    _this = _React$Component.call(this, props, context) || this;
    var handleExited = _this.handleExited.bind(_assertThisInitialized(_this));
    _this.state = {
      contextValue: {
        isMounting: true
      },
      handleExited,
      firstRender: true
    };
    return _this;
  }
  var _proto = TransitionGroup2.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.mounted = true;
    this.setState({
      contextValue: {
        isMounting: false
      }
    });
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.mounted = false;
  };
  TransitionGroup2.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, _ref) {
    var prevChildMapping = _ref.children, handleExited = _ref.handleExited, firstRender = _ref.firstRender;
    return {
      children: firstRender ? getInitialChildMapping(nextProps, handleExited) : getNextChildMapping(nextProps, prevChildMapping, handleExited),
      firstRender: false
    };
  };
  _proto.handleExited = function handleExited(child, node2) {
    var currentChildMapping = getChildMapping(this.props.children);
    if (child.key in currentChildMapping)
      return;
    if (child.props.onExited) {
      child.props.onExited(node2);
    }
    if (this.mounted) {
      this.setState(function(state) {
        var children = _extends$1({}, state.children);
        delete children[child.key];
        return {
          children
        };
      });
    }
  };
  _proto.render = function render() {
    var _this$props = this.props, Component = _this$props.component, childFactory2 = _this$props.childFactory, props = _objectWithoutPropertiesLoose$1(_this$props, ["component", "childFactory"]);
    var contextValue = this.state.contextValue;
    var children = values(this.state.children).map(childFactory2);
    delete props.appear;
    delete props.enter;
    delete props.exit;
    if (Component === null) {
      return /* @__PURE__ */ React.createElement(TransitionGroupContext.Provider, {
        value: contextValue
      }, children);
    }
    return /* @__PURE__ */ React.createElement(TransitionGroupContext.Provider, {
      value: contextValue
    }, /* @__PURE__ */ React.createElement(Component, props, children));
  };
  return TransitionGroup2;
}(React.Component);
TransitionGroup.propTypes = {};
TransitionGroup.defaultProps = defaultProps;
var TransitionGroup$1 = TransitionGroup;
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i2;
  for (i2 = 0; i2 < sourceKeys.length; i2++) {
    key = sourceKeys[i2];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function isNum(v2) {
  return typeof v2 === "number" && !isNaN(v2);
}
function isBool(v2) {
  return typeof v2 === "boolean";
}
function isStr(v2) {
  return typeof v2 === "string";
}
function isFn(v2) {
  return typeof v2 === "function";
}
function parseClassName(v2) {
  return isStr(v2) || isFn(v2) ? v2 : null;
}
function isToastIdValid(toastId) {
  return toastId === 0 || toastId;
}
function getAutoCloseDelay(toastAutoClose, containerAutoClose) {
  return toastAutoClose === false || isNum(toastAutoClose) && toastAutoClose > 0 ? toastAutoClose : containerAutoClose;
}
var canUseDom = !!(typeof window !== "undefined" && window.document && window.document.createElement);
function canBeRendered(content) {
  return react.exports.isValidElement(content) || isStr(content) || isFn(content) || isNum(content);
}
var POSITION = {
  TOP_LEFT: "top-left",
  TOP_RIGHT: "top-right",
  TOP_CENTER: "top-center",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_RIGHT: "bottom-right",
  BOTTOM_CENTER: "bottom-center"
};
var TYPE = {
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
  DEFAULT: "default"
};
function collapseToast(node2, done, duration) {
  if (duration === void 0) {
    duration = 300;
  }
  var scrollHeight = node2.scrollHeight, style = node2.style;
  requestAnimationFrame(function() {
    style.minHeight = "initial";
    style.height = scrollHeight + "px";
    style.transition = "all " + duration + "ms";
    requestAnimationFrame(function() {
      style.height = "0";
      style.padding = "0";
      style.margin = "0";
      setTimeout(done, duration);
    });
  });
}
function cssTransition(_ref) {
  var enter = _ref.enter, exit = _ref.exit, _ref$appendPosition = _ref.appendPosition, appendPosition = _ref$appendPosition === void 0 ? false : _ref$appendPosition, _ref$collapse = _ref.collapse, collapse = _ref$collapse === void 0 ? true : _ref$collapse, _ref$collapseDuration = _ref.collapseDuration, collapseDuration = _ref$collapseDuration === void 0 ? 300 : _ref$collapseDuration;
  return function ToastTransition(_ref2) {
    var children = _ref2.children, position2 = _ref2.position, preventExitTransition = _ref2.preventExitTransition, done = _ref2.done, nodeRef = _ref2.nodeRef, isIn = _ref2.isIn;
    var enterClassName = appendPosition ? enter + "--" + position2 : enter;
    var exitClassName = appendPosition ? exit + "--" + position2 : exit;
    var baseClassName = react.exports.useRef();
    var animationStep = react.exports.useRef(0);
    react.exports.useLayoutEffect(function() {
      onEnter();
    }, []);
    react.exports.useEffect(function() {
      if (!isIn)
        preventExitTransition ? onExited() : onExit();
    }, [isIn]);
    function onEnter() {
      var node2 = nodeRef.current;
      baseClassName.current = node2.className;
      node2.className += " " + enterClassName;
      node2.addEventListener("animationend", onEntered);
    }
    function onEntered(e2) {
      if (e2.target !== nodeRef.current)
        return;
      var node2 = nodeRef.current;
      node2.removeEventListener("animationend", onEntered);
      if (animationStep.current === 0) {
        node2.className = baseClassName.current;
      }
    }
    function onExit() {
      animationStep.current = 1;
      var node2 = nodeRef.current;
      node2.className += " " + exitClassName;
      node2.addEventListener("animationend", onExited);
    }
    function onExited() {
      var node2 = nodeRef.current;
      node2.removeEventListener("animationend", onExited);
      collapse ? collapseToast(node2, done, collapseDuration) : done();
    }
    return React.createElement(React.Fragment, null, children);
  };
}
var eventManager = {
  list: /* @__PURE__ */ new Map(),
  emitQueue: /* @__PURE__ */ new Map(),
  on: function on(event, callback) {
    this.list.has(event) || this.list.set(event, []);
    this.list.get(event).push(callback);
    return this;
  },
  off: function off(event, callback) {
    if (callback) {
      var cb2 = this.list.get(event).filter(function(cb3) {
        return cb3 !== callback;
      });
      this.list.set(event, cb2);
      return this;
    }
    this.list["delete"](event);
    return this;
  },
  cancelEmit: function cancelEmit(event) {
    var timers = this.emitQueue.get(event);
    if (timers) {
      timers.forEach(clearTimeout);
      this.emitQueue["delete"](event);
    }
    return this;
  },
  emit: function emit(event) {
    var _this = this;
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    this.list.has(event) && this.list.get(event).forEach(function(callback) {
      var timer = setTimeout(function() {
        callback.apply(void 0, args);
      }, 0);
      _this.emitQueue.has(event) || _this.emitQueue.set(event, []);
      _this.emitQueue.get(event).push(timer);
    });
  }
};
function useKeeper(arg, refresh) {
  if (refresh === void 0) {
    refresh = false;
  }
  var ref = react.exports.useRef(arg);
  react.exports.useEffect(function() {
    if (refresh)
      ref.current = arg;
  });
  return ref.current;
}
function reducer(state, action) {
  switch (action.type) {
    case 0:
      return [].concat(state, [action.toastId]).filter(function(id2) {
        return id2 !== action.staleId;
      });
    case 1:
      return isToastIdValid(action.toastId) ? state.filter(function(id2) {
        return id2 !== action.toastId;
      }) : [];
  }
}
var _excluded = ["delay", "staleId"];
function useToastContainer(props) {
  var _useReducer = react.exports.useReducer(function(x2) {
    return x2 + 1;
  }, 0), forceUpdate = _useReducer[1];
  var _useReducer2 = react.exports.useReducer(reducer, []), toast3 = _useReducer2[0], dispatch = _useReducer2[1];
  var containerRef = react.exports.useRef(null);
  var toastCount = useKeeper(0);
  var queue2 = useKeeper([]);
  var collection = useKeeper({});
  var instance = useKeeper({
    toastKey: 1,
    displayedToast: 0,
    props,
    containerId: null,
    isToastActive,
    getToast: function getToast2(id2) {
      return collection[id2] || null;
    }
  });
  react.exports.useEffect(function() {
    instance.containerId = props.containerId;
    eventManager.cancelEmit(3).on(0, buildToast).on(1, function(toastId) {
      return containerRef.current && removeToast(toastId);
    }).on(5, clearWaitingQueue).emit(2, instance);
    return function() {
      return eventManager.emit(3, instance);
    };
  }, []);
  react.exports.useEffect(function() {
    instance.isToastActive = isToastActive;
    instance.displayedToast = toast3.length;
    eventManager.emit(4, toast3.length, props.containerId);
  }, [toast3]);
  react.exports.useEffect(function() {
    instance.props = props;
  });
  function isToastActive(id2) {
    return toast3.indexOf(id2) !== -1;
  }
  function clearWaitingQueue(_ref) {
    var containerId = _ref.containerId;
    var limit = instance.props.limit;
    if (limit && (!containerId || instance.containerId === containerId)) {
      toastCount -= queue2.length;
      queue2 = [];
    }
  }
  function removeToast(toastId) {
    dispatch({
      type: 1,
      toastId
    });
  }
  function dequeueToast() {
    var _queue$shift = queue2.shift(), toastContent = _queue$shift.toastContent, toastProps = _queue$shift.toastProps, staleId = _queue$shift.staleId;
    appendToast(toastContent, toastProps, staleId);
  }
  function isNotValid(_ref2) {
    var containerId = _ref2.containerId, toastId = _ref2.toastId, updateId = _ref2.updateId;
    return !containerRef.current || instance.props.enableMultiContainer && containerId !== instance.props.containerId || collection[toastId] && updateId == null ? true : false;
  }
  function buildToast(content, _ref3) {
    var _options$icon;
    var delay = _ref3.delay, staleId = _ref3.staleId, options = _objectWithoutPropertiesLoose(_ref3, _excluded);
    if (!canBeRendered(content) || isNotValid(options))
      return;
    var toastId = options.toastId, updateId = options.updateId, data = options.data;
    var props2 = instance.props;
    var closeToast = function closeToast2() {
      return removeToast(toastId);
    };
    var isNotAnUpdate = options.updateId == null;
    if (isNotAnUpdate)
      toastCount++;
    var toastProps = {
      toastId,
      updateId,
      isLoading: options.isLoading,
      theme: options.theme || props2.theme,
      icon: (_options$icon = options.icon) != null ? _options$icon : props2.icon,
      isIn: false,
      key: options.key || instance.toastKey++,
      type: options.type,
      closeToast,
      closeButton: options.closeButton,
      rtl: props2.rtl,
      position: options.position || props2.position,
      transition: options.transition || props2.transition,
      className: parseClassName(options.className || props2.toastClassName),
      bodyClassName: parseClassName(options.bodyClassName || props2.bodyClassName),
      style: options.style || props2.toastStyle,
      bodyStyle: options.bodyStyle || props2.bodyStyle,
      onClick: options.onClick || props2.onClick,
      pauseOnHover: isBool(options.pauseOnHover) ? options.pauseOnHover : props2.pauseOnHover,
      pauseOnFocusLoss: isBool(options.pauseOnFocusLoss) ? options.pauseOnFocusLoss : props2.pauseOnFocusLoss,
      draggable: isBool(options.draggable) ? options.draggable : props2.draggable,
      draggablePercent: isNum(options.draggablePercent) ? options.draggablePercent : props2.draggablePercent,
      draggableDirection: options.draggableDirection || props2.draggableDirection,
      closeOnClick: isBool(options.closeOnClick) ? options.closeOnClick : props2.closeOnClick,
      progressClassName: parseClassName(options.progressClassName || props2.progressClassName),
      progressStyle: options.progressStyle || props2.progressStyle,
      autoClose: options.isLoading ? false : getAutoCloseDelay(options.autoClose, props2.autoClose),
      hideProgressBar: isBool(options.hideProgressBar) ? options.hideProgressBar : props2.hideProgressBar,
      progress: options.progress,
      role: isStr(options.role) ? options.role : props2.role,
      deleteToast: function deleteToast() {
        removeFromCollection(toastId);
      }
    };
    if (isFn(options.onOpen))
      toastProps.onOpen = options.onOpen;
    if (isFn(options.onClose))
      toastProps.onClose = options.onClose;
    if (toastProps.draggableDirection === "y" && toastProps.draggablePercent === 80) {
      toastProps.draggablePercent *= 1.5;
    }
    var closeButton = props2.closeButton;
    if (options.closeButton === false || canBeRendered(options.closeButton)) {
      closeButton = options.closeButton;
    } else if (options.closeButton === true) {
      closeButton = canBeRendered(props2.closeButton) ? props2.closeButton : true;
    }
    toastProps.closeButton = closeButton;
    var toastContent = content;
    if (react.exports.isValidElement(content) && !isStr(content.type)) {
      toastContent = react.exports.cloneElement(content, {
        closeToast,
        toastProps,
        data
      });
    } else if (isFn(content)) {
      toastContent = content({
        closeToast,
        toastProps,
        data
      });
    }
    if (props2.limit && props2.limit > 0 && toastCount > props2.limit && isNotAnUpdate) {
      queue2.push({
        toastContent,
        toastProps,
        staleId
      });
    } else if (isNum(delay) && delay > 0) {
      setTimeout(function() {
        appendToast(toastContent, toastProps, staleId);
      }, delay);
    } else {
      appendToast(toastContent, toastProps, staleId);
    }
  }
  function appendToast(content, toastProps, staleId) {
    var toastId = toastProps.toastId;
    if (staleId)
      delete collection[staleId];
    collection[toastId] = {
      content,
      props: toastProps
    };
    dispatch({
      type: 0,
      toastId,
      staleId
    });
  }
  function removeFromCollection(toastId) {
    delete collection[toastId];
    var queueLen = queue2.length;
    toastCount = isToastIdValid(toastId) ? toastCount - 1 : toastCount - instance.displayedToast;
    if (toastCount < 0)
      toastCount = 0;
    if (queueLen > 0) {
      var freeSlot = isToastIdValid(toastId) ? 1 : instance.props.limit;
      if (queueLen === 1 || freeSlot === 1) {
        instance.displayedToast++;
        dequeueToast();
      } else {
        var toDequeue = freeSlot > queueLen ? queueLen : freeSlot;
        instance.displayedToast = toDequeue;
        for (var i2 = 0; i2 < toDequeue; i2++) {
          dequeueToast();
        }
      }
    } else {
      forceUpdate();
    }
  }
  function getToastToRender(cb2) {
    var toastToRender = {};
    var toastList = props.newestOnTop ? Object.keys(collection).reverse() : Object.keys(collection);
    for (var i2 = 0; i2 < toastList.length; i2++) {
      var _toast = collection[toastList[i2]];
      var position2 = _toast.props.position;
      toastToRender[position2] || (toastToRender[position2] = []);
      toastToRender[position2].push(_toast);
    }
    return Object.keys(toastToRender).map(function(p2) {
      return cb2(p2, toastToRender[p2]);
    });
  }
  return {
    getToastToRender,
    collection,
    containerRef,
    isToastActive
  };
}
function getX(e2) {
  return e2.targetTouches && e2.targetTouches.length >= 1 ? e2.targetTouches[0].clientX : e2.clientX;
}
function getY(e2) {
  return e2.targetTouches && e2.targetTouches.length >= 1 ? e2.targetTouches[0].clientY : e2.clientY;
}
function useToast(props) {
  var _useState = react.exports.useState(true), isRunning = _useState[0], setIsRunning = _useState[1];
  var _useState2 = react.exports.useState(false), preventExitTransition = _useState2[0], setPreventExitTransition = _useState2[1];
  var toastRef = react.exports.useRef(null);
  var drag = useKeeper({
    start: 0,
    x: 0,
    y: 0,
    delta: 0,
    removalDistance: 0,
    canCloseOnClick: true,
    canDrag: false,
    boundingRect: null
  });
  var syncProps = useKeeper(props, true);
  var autoClose = props.autoClose, pauseOnHover = props.pauseOnHover, closeToast = props.closeToast, onClick = props.onClick, closeOnClick = props.closeOnClick;
  react.exports.useEffect(function() {
    if (isFn(props.onOpen))
      props.onOpen(react.exports.isValidElement(props.children) && props.children.props);
    return function() {
      if (isFn(syncProps.onClose))
        syncProps.onClose(react.exports.isValidElement(syncProps.children) && syncProps.children.props);
    };
  }, []);
  react.exports.useEffect(function() {
    props.draggable && bindDragEvents();
    return function() {
      props.draggable && unbindDragEvents();
    };
  }, [props.draggable]);
  react.exports.useEffect(function() {
    props.pauseOnFocusLoss && bindFocusEvents();
    return function() {
      props.pauseOnFocusLoss && unbindFocusEvents();
    };
  }, [props.pauseOnFocusLoss]);
  function onDragStart(e2) {
    if (props.draggable) {
      var toast3 = toastRef.current;
      drag.canCloseOnClick = true;
      drag.canDrag = true;
      drag.boundingRect = toast3.getBoundingClientRect();
      toast3.style.transition = "";
      drag.x = getX(e2.nativeEvent);
      drag.y = getY(e2.nativeEvent);
      if (props.draggableDirection === "x") {
        drag.start = drag.x;
        drag.removalDistance = toast3.offsetWidth * (props.draggablePercent / 100);
      } else {
        drag.start = drag.y;
        drag.removalDistance = toast3.offsetHeight * (props.draggablePercent / 100);
      }
    }
  }
  function onDragTransitionEnd() {
    if (drag.boundingRect) {
      var _drag$boundingRect = drag.boundingRect, top2 = _drag$boundingRect.top, bottom2 = _drag$boundingRect.bottom, left2 = _drag$boundingRect.left, right2 = _drag$boundingRect.right;
      if (props.pauseOnHover && drag.x >= left2 && drag.x <= right2 && drag.y >= top2 && drag.y <= bottom2) {
        pauseToast();
      } else {
        playToast();
      }
    }
  }
  function playToast() {
    setIsRunning(true);
  }
  function pauseToast() {
    setIsRunning(false);
  }
  function bindFocusEvents() {
    if (!document.hasFocus())
      pauseToast();
    window.addEventListener("focus", playToast);
    window.addEventListener("blur", pauseToast);
  }
  function unbindFocusEvents() {
    window.removeEventListener("focus", playToast);
    window.removeEventListener("blur", pauseToast);
  }
  function bindDragEvents() {
    document.addEventListener("mousemove", onDragMove);
    document.addEventListener("mouseup", onDragEnd);
    document.addEventListener("touchmove", onDragMove);
    document.addEventListener("touchend", onDragEnd);
  }
  function unbindDragEvents() {
    document.removeEventListener("mousemove", onDragMove);
    document.removeEventListener("mouseup", onDragEnd);
    document.removeEventListener("touchmove", onDragMove);
    document.removeEventListener("touchend", onDragEnd);
  }
  function onDragMove(e2) {
    if (drag.canDrag) {
      e2.preventDefault();
      var toast3 = toastRef.current;
      if (isRunning)
        pauseToast();
      drag.x = getX(e2);
      drag.y = getY(e2);
      if (props.draggableDirection === "x") {
        drag.delta = drag.x - drag.start;
      } else {
        drag.delta = drag.y - drag.start;
      }
      if (drag.start !== drag.x)
        drag.canCloseOnClick = false;
      toast3.style.transform = "translate" + props.draggableDirection + "(" + drag.delta + "px)";
      toast3.style.opacity = "" + (1 - Math.abs(drag.delta / drag.removalDistance));
    }
  }
  function onDragEnd() {
    var toast3 = toastRef.current;
    if (drag.canDrag) {
      drag.canDrag = false;
      if (Math.abs(drag.delta) > drag.removalDistance) {
        setPreventExitTransition(true);
        props.closeToast();
        return;
      }
      toast3.style.transition = "transform 0.2s, opacity 0.2s";
      toast3.style.transform = "translate" + props.draggableDirection + "(0)";
      toast3.style.opacity = "1";
    }
  }
  var eventHandlers = {
    onMouseDown: onDragStart,
    onTouchStart: onDragStart,
    onMouseUp: onDragTransitionEnd,
    onTouchEnd: onDragTransitionEnd
  };
  if (autoClose && pauseOnHover) {
    eventHandlers.onMouseEnter = pauseToast;
    eventHandlers.onMouseLeave = playToast;
  }
  if (closeOnClick) {
    eventHandlers.onClick = function(e2) {
      onClick && onClick(e2);
      drag.canCloseOnClick && closeToast();
    };
  }
  return {
    playToast,
    pauseToast,
    isRunning,
    preventExitTransition,
    toastRef,
    eventHandlers
  };
}
function CloseButton(_ref) {
  var closeToast = _ref.closeToast, theme = _ref.theme, _ref$ariaLabel = _ref.ariaLabel, ariaLabel = _ref$ariaLabel === void 0 ? "close" : _ref$ariaLabel;
  return react.exports.createElement("button", {
    className: "Toastify__close-button Toastify__close-button--" + theme,
    type: "button",
    onClick: function onClick(e2) {
      e2.stopPropagation();
      closeToast(e2);
    },
    "aria-label": ariaLabel
  }, react.exports.createElement("svg", {
    "aria-hidden": "true",
    viewBox: "0 0 14 16"
  }, react.exports.createElement("path", {
    fillRule: "evenodd",
    d: "M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"
  })));
}
function ProgressBar(_ref) {
  var _cx, _animationEvent;
  var delay = _ref.delay, isRunning = _ref.isRunning, closeToast = _ref.closeToast, type = _ref.type, hide2 = _ref.hide, className = _ref.className, userStyle = _ref.style, controlledProgress = _ref.controlledProgress, progress = _ref.progress, rtl = _ref.rtl, isIn = _ref.isIn, theme = _ref.theme;
  var style = _extends({}, userStyle, {
    animationDuration: delay + "ms",
    animationPlayState: isRunning ? "running" : "paused",
    opacity: hide2 ? 0 : 1
  });
  if (controlledProgress)
    style.transform = "scaleX(" + progress + ")";
  var defaultClassName = cx("Toastify__progress-bar", controlledProgress ? "Toastify__progress-bar--controlled" : "Toastify__progress-bar--animated", "Toastify__progress-bar-theme--" + theme, "Toastify__progress-bar--" + type, (_cx = {}, _cx["Toastify__progress-bar--rtl"] = rtl, _cx));
  var classNames = isFn(className) ? className({
    rtl,
    type,
    defaultClassName
  }) : cx(defaultClassName, className);
  var animationEvent = (_animationEvent = {}, _animationEvent[controlledProgress && progress >= 1 ? "onTransitionEnd" : "onAnimationEnd"] = controlledProgress && progress < 1 ? null : function() {
    isIn && closeToast();
  }, _animationEvent);
  return react.exports.createElement("div", Object.assign({
    role: "progressbar",
    "aria-hidden": hide2 ? "true" : "false",
    "aria-label": "notification timer",
    className: classNames,
    style
  }, animationEvent));
}
ProgressBar.defaultProps = {
  type: TYPE.DEFAULT,
  hide: false
};
var _excluded$1 = ["theme", "type"];
var Svg = function Svg2(_ref) {
  var theme = _ref.theme, type = _ref.type, rest = _objectWithoutPropertiesLoose(_ref, _excluded$1);
  return React.createElement("svg", Object.assign({
    viewBox: "0 0 24 24",
    width: "100%",
    height: "100%",
    fill: theme === "colored" ? "currentColor" : "var(--toastify-icon-color-" + type + ")"
  }, rest));
};
function Warning(props) {
  return React.createElement(Svg, Object.assign({}, props), React.createElement("path", {
    d: "M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"
  }));
}
function Info(props) {
  return React.createElement(Svg, Object.assign({}, props), React.createElement("path", {
    d: "M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"
  }));
}
function Success(props) {
  return React.createElement(Svg, Object.assign({}, props), React.createElement("path", {
    d: "M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"
  }));
}
function Error$1(props) {
  return React.createElement(Svg, Object.assign({}, props), React.createElement("path", {
    d: "M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"
  }));
}
function Spinner() {
  return React.createElement("div", {
    className: "Toastify__spinner"
  });
}
var Icons = {
  info: Info,
  warning: Warning,
  success: Success,
  error: Error$1,
  spinner: Spinner
};
var Toast = function Toast2(props) {
  var _cx, _cx2;
  var _useToast = useToast(props), isRunning = _useToast.isRunning, preventExitTransition = _useToast.preventExitTransition, toastRef = _useToast.toastRef, eventHandlers = _useToast.eventHandlers;
  var closeButton = props.closeButton, children = props.children, autoClose = props.autoClose, onClick = props.onClick, type = props.type, hideProgressBar = props.hideProgressBar, closeToast = props.closeToast, Transition2 = props.transition, position2 = props.position, className = props.className, style = props.style, bodyClassName = props.bodyClassName, bodyStyle = props.bodyStyle, progressClassName = props.progressClassName, progressStyle = props.progressStyle, updateId = props.updateId, role = props.role, progress = props.progress, rtl = props.rtl, toastId = props.toastId, deleteToast = props.deleteToast, isIn = props.isIn, isLoading = props.isLoading, icon = props.icon, theme = props.theme;
  var defaultClassName = cx("Toastify__toast", "Toastify__toast-theme--" + theme, "Toastify__toast--" + type, (_cx = {}, _cx["Toastify__toast--rtl"] = rtl, _cx));
  var cssClasses = isFn(className) ? className({
    rtl,
    position: position2,
    type,
    defaultClassName
  }) : cx(defaultClassName, className);
  var isProgressControlled = !!progress;
  var maybeIcon = Icons[type];
  var iconProps = {
    theme,
    type
  };
  var Icon = maybeIcon && maybeIcon(iconProps);
  if (icon === false) {
    Icon = void 0;
  } else if (isFn(icon)) {
    Icon = icon(iconProps);
  } else if (react.exports.isValidElement(icon)) {
    Icon = react.exports.cloneElement(icon, iconProps);
  } else if (isStr(icon)) {
    Icon = icon;
  } else if (isLoading) {
    Icon = Icons.spinner();
  }
  function renderCloseButton(closeButton2) {
    if (!closeButton2)
      return;
    var props2 = {
      closeToast,
      type,
      theme
    };
    if (isFn(closeButton2))
      return closeButton2(props2);
    if (react.exports.isValidElement(closeButton2))
      return react.exports.cloneElement(closeButton2, props2);
  }
  return react.exports.createElement(Transition2, {
    isIn,
    done: deleteToast,
    position: position2,
    preventExitTransition,
    nodeRef: toastRef
  }, react.exports.createElement("div", Object.assign({
    id: toastId,
    onClick,
    className: cssClasses
  }, eventHandlers, {
    style,
    ref: toastRef
  }), react.exports.createElement("div", Object.assign({}, isIn && {
    role
  }, {
    className: isFn(bodyClassName) ? bodyClassName({
      type
    }) : cx("Toastify__toast-body", bodyClassName),
    style: bodyStyle
  }), Icon && react.exports.createElement("div", {
    className: cx("Toastify__toast-icon", (_cx2 = {}, _cx2["Toastify--animate-icon Toastify__zoom-enter"] = !isLoading, _cx2))
  }, Icon), react.exports.createElement("div", null, children)), renderCloseButton(closeButton), (autoClose || isProgressControlled) && react.exports.createElement(ProgressBar, Object.assign({}, updateId && !isProgressControlled ? {
    key: "pb-" + updateId
  } : {}, {
    rtl,
    theme,
    delay: autoClose,
    isRunning,
    isIn,
    closeToast,
    hide: hideProgressBar,
    type,
    style: progressStyle,
    className: progressClassName,
    controlledProgress: isProgressControlled,
    progress
  }))));
};
var Bounce = /* @__PURE__ */ cssTransition({
  enter: "Toastify--animate Toastify__bounce-enter",
  exit: "Toastify--animate Toastify__bounce-exit",
  appendPosition: true
});
var ToastContainer = function ToastContainer2(props) {
  var _useToastContainer = useToastContainer(props), getToastToRender = _useToastContainer.getToastToRender, containerRef = _useToastContainer.containerRef, isToastActive = _useToastContainer.isToastActive;
  var className = props.className, style = props.style, rtl = props.rtl, containerId = props.containerId;
  function getClassName(position2) {
    var _cx;
    var defaultClassName = cx("Toastify__toast-container", "Toastify__toast-container--" + position2, (_cx = {}, _cx["Toastify__toast-container--rtl"] = rtl, _cx));
    return isFn(className) ? className({
      position: position2,
      rtl,
      defaultClassName
    }) : cx(defaultClassName, parseClassName(className));
  }
  return react.exports.createElement("div", {
    ref: containerRef,
    className: "Toastify",
    id: containerId
  }, getToastToRender(function(position2, toastList) {
    var containerStyle = toastList.length === 0 ? _extends({}, style, {
      pointerEvents: "none"
    }) : _extends({}, style);
    return react.exports.createElement("div", {
      className: getClassName(position2),
      style: containerStyle,
      key: "container-" + position2
    }, toastList.map(function(_ref) {
      var content = _ref.content, toastProps = _ref.props;
      return react.exports.createElement(Toast, Object.assign({}, toastProps, {
        isIn: isToastActive(toastProps.toastId),
        key: "toast-" + toastProps.key,
        closeButton: toastProps.closeButton === true ? CloseButton : toastProps.closeButton
      }), content);
    }));
  }));
};
ToastContainer.defaultProps = {
  position: POSITION.TOP_RIGHT,
  transition: Bounce,
  rtl: false,
  autoClose: 5e3,
  hideProgressBar: false,
  closeButton: CloseButton,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  closeOnClick: true,
  newestOnTop: false,
  draggable: true,
  draggablePercent: 80,
  draggableDirection: "x",
  role: "alert",
  theme: "light"
};
var containers = /* @__PURE__ */ new Map();
var latestInstance;
var containerDomNode;
var containerConfig;
var queue = [];
var lazy = false;
function isAnyContainerMounted() {
  return containers.size > 0;
}
function getToast(toastId, _ref) {
  var containerId = _ref.containerId;
  var container = containers.get(containerId || latestInstance);
  if (!container)
    return null;
  return container.getToast(toastId);
}
function generateToastId() {
  return Math.random().toString(36).substr(2, 9);
}
function getToastId(options) {
  if (options && (isStr(options.toastId) || isNum(options.toastId))) {
    return options.toastId;
  }
  return generateToastId();
}
function dispatchToast(content, options) {
  if (isAnyContainerMounted()) {
    eventManager.emit(0, content, options);
  } else {
    queue.push({
      content,
      options
    });
    if (lazy && canUseDom) {
      lazy = false;
      containerDomNode = document.createElement("div");
      document.body.appendChild(containerDomNode);
      reactDom.exports.render(react.exports.createElement(ToastContainer, Object.assign({}, containerConfig)), containerDomNode);
    }
  }
  return options.toastId;
}
function mergeOptions(type, options) {
  return _extends({}, options, {
    type: options && options.type || type,
    toastId: getToastId(options)
  });
}
var createToastByType = function createToastByType2(type) {
  return function(content, options) {
    return dispatchToast(content, mergeOptions(type, options));
  };
};
var toast = function toast2(content, options) {
  return dispatchToast(content, mergeOptions(TYPE.DEFAULT, options));
};
toast.loading = function(content, options) {
  return dispatchToast(content, mergeOptions(TYPE.DEFAULT, _extends({
    isLoading: true,
    autoClose: false,
    closeOnClick: false,
    closeButton: false,
    draggable: false
  }, options)));
};
function handlePromise(promise, _ref2, options) {
  var pending = _ref2.pending, error = _ref2.error, success = _ref2.success;
  var id2;
  if (pending) {
    id2 = isStr(pending) ? toast.loading(pending, options) : toast.loading(pending.render, _extends({}, options, pending));
  }
  var resetParams = {
    isLoading: null,
    autoClose: null,
    closeOnClick: null,
    closeButton: null,
    draggable: null
  };
  var resolver = function resolver2(type, input, result) {
    var baseParams = _extends({
      type
    }, resetParams, options, {
      data: result
    });
    var params = isStr(input) ? {
      render: input
    } : input;
    if (id2) {
      toast.update(id2, _extends({}, baseParams, params));
    } else {
      toast(params.render, _extends({}, baseParams, params));
    }
    return result;
  };
  var p2 = isFn(promise) ? promise() : promise;
  p2.then(function(result) {
    return success && resolver("success", success, result);
  })["catch"](function(err) {
    return error && resolver("error", error, err);
  });
  return p2;
}
toast.promise = handlePromise;
toast.success = /* @__PURE__ */ createToastByType(TYPE.SUCCESS);
toast.info = /* @__PURE__ */ createToastByType(TYPE.INFO);
toast.error = /* @__PURE__ */ createToastByType(TYPE.ERROR);
toast.warning = /* @__PURE__ */ createToastByType(TYPE.WARNING);
toast.warn = toast.warning;
toast.dark = function(content, options) {
  return dispatchToast(content, mergeOptions(TYPE.DEFAULT, _extends({
    theme: "dark"
  }, options)));
};
toast.dismiss = function(id2) {
  return eventManager.emit(1, id2);
};
toast.clearWaitingQueue = function(params) {
  if (params === void 0) {
    params = {};
  }
  return eventManager.emit(5, params);
};
toast.isActive = function(id2) {
  var isToastActive = false;
  containers.forEach(function(container) {
    if (container.isToastActive && container.isToastActive(id2)) {
      isToastActive = true;
    }
  });
  return isToastActive;
};
toast.update = function(toastId, options) {
  if (options === void 0) {
    options = {};
  }
  setTimeout(function() {
    var toast3 = getToast(toastId, options);
    if (toast3) {
      var oldOptions = toast3.props, oldContent = toast3.content;
      var nextOptions = _extends({}, oldOptions, options, {
        toastId: options.toastId || toastId,
        updateId: generateToastId()
      });
      if (nextOptions.toastId !== toastId)
        nextOptions.staleId = toastId;
      var content = nextOptions.render || oldContent;
      delete nextOptions.render;
      dispatchToast(content, nextOptions);
    }
  }, 0);
};
toast.done = function(id2) {
  toast.update(id2, {
    progress: 1
  });
};
toast.onChange = function(callback) {
  if (isFn(callback)) {
    eventManager.on(4, callback);
  }
  return function() {
    isFn(callback) && eventManager.off(4, callback);
  };
};
toast.configure = function(config2) {
  if (config2 === void 0) {
    config2 = {};
  }
  lazy = true;
  containerConfig = config2;
};
toast.POSITION = POSITION;
toast.TYPE = TYPE;
eventManager.on(2, function(containerInstance) {
  latestInstance = containerInstance.containerId || containerInstance;
  containers.set(latestInstance, containerInstance);
  queue.forEach(function(item) {
    eventManager.emit(0, item.content, item.options);
  });
  queue = [];
}).on(3, function(containerInstance) {
  containers["delete"](containerInstance.containerId || containerInstance);
  if (containers.size === 0) {
    eventManager.off(0).off(1).off(5);
  }
  if (canUseDom && containerDomNode) {
    document.body.removeChild(containerDomNode);
  }
});
var tssReact = {};
var cssAndCx = {};
var classnames2 = {};
var assert$1 = {};
Object.defineProperty(assert$1, "__esModule", { value: true });
assert$1.assert = void 0;
function assert(condition, msg) {
  if (!condition) {
    throw new Error(msg);
  }
}
assert$1.assert = assert;
var typeGuard$1 = {};
Object.defineProperty(typeGuard$1, "__esModule", { value: true });
typeGuard$1.typeGuard = void 0;
function typeGuard(_value, isMatched) {
  return isMatched;
}
typeGuard$1.typeGuard = typeGuard;
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.classnames = void 0;
  const assert_1 = assert$1;
  const typeGuard_12 = typeGuard$1;
  const classnames3 = (args) => {
    const len = args.length;
    let i2 = 0;
    let cls = "";
    for (; i2 < len; i2++) {
      const arg = args[i2];
      if (arg == null)
        continue;
      let toAdd;
      switch (typeof arg) {
        case "boolean":
          break;
        case "object": {
          if (Array.isArray(arg)) {
            toAdd = (0, exports.classnames)(arg);
          } else {
            (0, assert_1.assert)(!(0, typeGuard_12.typeGuard)(arg, false));
            toAdd = "";
            for (const k2 in arg) {
              if (arg[k2] && k2) {
                toAdd && (toAdd += " ");
                toAdd += k2;
              }
            }
          }
          break;
        }
        default: {
          toAdd = arg;
        }
      }
      if (toAdd) {
        cls && (cls += " ");
        cls += toAdd;
      }
    }
    return cls;
  };
  exports.classnames = classnames3;
})(classnames2);
var require$$1 = /* @__PURE__ */ getAugmentedNamespace(emotionSerialize_browser_esm);
var require$$2$1 = /* @__PURE__ */ getAugmentedNamespace(emotionUtils_browser_esm);
var useGuaranteedMemo$1 = {};
Object.defineProperty(useGuaranteedMemo$1, "__esModule", { value: true });
useGuaranteedMemo$1.useGuaranteedMemo = void 0;
const react_1$2 = react.exports;
function useGuaranteedMemo(fn3, deps) {
  const ref = (0, react_1$2.useRef)();
  if (!ref.current || deps.length !== ref.current.prevDeps.length || ref.current.prevDeps.map((v2, i2) => v2 === deps[i2]).indexOf(false) >= 0) {
    ref.current = {
      "v": fn3(),
      "prevDeps": [...deps]
    };
  }
  return ref.current.v;
}
useGuaranteedMemo$1.useGuaranteedMemo = useGuaranteedMemo;
var cache = {};
var require$$2 = /* @__PURE__ */ getAugmentedNamespace(emotionCache_browser_esm);
(function(exports) {
  var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  var _a;
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TssCacheProvider = exports.useTssEmotionCache = exports.getDoExistsTssDefaultEmotionCacheMemoizedValue = exports.getTssDefaultEmotionCache = void 0;
  const jsx_runtime_12 = jsxRuntime.exports;
  const react_12 = react.exports;
  const cache_12 = __importDefault(require$$2);
  _a = (() => {
    let cache2 = void 0;
    function getTssDefaultEmotionCache(params) {
      const { doReset = false } = params !== null && params !== void 0 ? params : {};
      if (doReset) {
        cache2 = void 0;
      }
      if (cache2 === void 0) {
        cache2 = (0, cache_12.default)({ "key": "tss" });
      }
      return cache2;
    }
    return {
      getTssDefaultEmotionCache,
      "getDoExistsTssDefaultEmotionCacheMemoizedValue": () => cache2 !== void 0
    };
  })(), exports.getTssDefaultEmotionCache = _a.getTssDefaultEmotionCache, exports.getDoExistsTssDefaultEmotionCacheMemoizedValue = _a.getDoExistsTssDefaultEmotionCacheMemoizedValue;
  const context = (0, react_12.createContext)(void 0);
  function useTssEmotionCache() {
    const cacheExplicitlyProvidedForTss = (0, react_12.useContext)(context);
    return cacheExplicitlyProvidedForTss !== null && cacheExplicitlyProvidedForTss !== void 0 ? cacheExplicitlyProvidedForTss : (0, exports.getTssDefaultEmotionCache)();
  }
  exports.useTssEmotionCache = useTssEmotionCache;
  function TssCacheProvider(props) {
    const { children, value } = props;
    return (0, jsx_runtime_12.jsx)(context.Provider, Object.assign({ value }, { children }), void 0);
  }
  exports.TssCacheProvider = TssCacheProvider;
})(cache);
var types = {};
Object.defineProperty(types, "__esModule", { value: true });
types.matchCSSObject = void 0;
function matchCSSObject(arg) {
  return arg instanceof Object && !("styles" in arg) && !("length" in arg) && !("__emotion_styles" in arg);
}
types.matchCSSObject = matchCSSObject;
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.useCssAndCx = exports.createCssAndCx = void 0;
  const classnames_1 = classnames2;
  const serialize_1 = require$$1;
  const utils_1 = require$$2$1;
  const useGuaranteedMemo_1 = useGuaranteedMemo$1;
  const cache_12 = cache;
  const types_1 = types;
  const refPropertyName = "ref";
  exports.createCssAndCx = (() => {
    function merge2(registered, css2, className) {
      const registeredStyles = [];
      const rawClassName = (0, utils_1.getRegisteredStyles)(registered, registeredStyles, className);
      if (registeredStyles.length < 2) {
        return className;
      }
      return rawClassName + css2(registeredStyles);
    }
    function createCssAndCx(params) {
      const { cache: cache2 } = params;
      const css2 = (...args) => {
        let ref = void 0;
        scope: {
          if (args.length !== 1) {
            break scope;
          }
          const [arg] = args;
          if (!(arg instanceof Object)) {
            break scope;
          }
          if (!(refPropertyName in arg)) {
            break scope;
          }
          const mostLikelyRef = arg[refPropertyName];
          if (typeof mostLikelyRef !== "string" && mostLikelyRef !== void 0) {
            break scope;
          }
          ref = mostLikelyRef;
          const argCopy = Object.assign({}, arg);
          delete argCopy[refPropertyName];
          args = [argCopy];
        }
        const serialized = (0, serialize_1.serializeStyles)(args, cache2.registered);
        (0, utils_1.insertStyles)(cache2, serialized, false);
        const className = `${cache2.key}-${serialized.name}${ref === void 0 ? "" : ` ${ref}`}`;
        scope: {
          const arg = args[0];
          if (!(0, types_1.matchCSSObject)(arg)) {
            break scope;
          }
          increaseSpecificityToTakePrecedenceOverMediaQuerries.saveClassNameCSSObjectMapping(cache2, className, arg);
        }
        return className;
      };
      const cx2 = (...args) => {
        const className = (0, classnames_1.classnames)(args);
        const feat27FixedClassnames = increaseSpecificityToTakePrecedenceOverMediaQuerries.fixClassName(cache2, className, css2);
        return merge2(cache2.registered, css2, feat27FixedClassnames);
      };
      return { css: css2, cx: cx2 };
    }
    return { createCssAndCx };
  })().createCssAndCx;
  function useCssAndCx() {
    const cache2 = (0, cache_12.useTssEmotionCache)();
    const { css: css2, cx: cx2 } = (0, useGuaranteedMemo_1.useGuaranteedMemo)(() => (0, exports.createCssAndCx)({ cache: cache2 }), [cache2]);
    return { css: css2, cx: cx2 };
  }
  exports.useCssAndCx = useCssAndCx;
  const increaseSpecificityToTakePrecedenceOverMediaQuerries = (() => {
    const cssObjectMapByCache = /* @__PURE__ */ new WeakMap();
    return {
      "saveClassNameCSSObjectMapping": (cache2, className, cssObject) => {
        let cssObjectMap = cssObjectMapByCache.get(cache2);
        if (cssObjectMap === void 0) {
          cssObjectMap = /* @__PURE__ */ new Map();
          cssObjectMapByCache.set(cache2, cssObjectMap);
        }
        cssObjectMap.set(className, cssObject);
      },
      "fixClassName": (() => {
        function fix(classNameCSSObjects) {
          let isThereAnyMediaQueriesInPreviousClasses = false;
          return classNameCSSObjects.map(([className, cssObject]) => {
            if (cssObject === void 0) {
              return className;
            }
            let out;
            if (!isThereAnyMediaQueriesInPreviousClasses) {
              out = className;
              if (Object.keys(cssObject).find((key) => key.startsWith("@media")) !== void 0) {
                isThereAnyMediaQueriesInPreviousClasses = true;
              }
            } else {
              out = {
                "&&": cssObject
              };
            }
            return out;
          });
        }
        return (cache2, className, css2) => {
          const cssObjectMap = cssObjectMapByCache.get(cache2);
          return (0, classnames_1.classnames)(fix(className.split(" ").map((className2) => [
            className2,
            cssObjectMap === null || cssObjectMap === void 0 ? void 0 : cssObjectMap.get(className2)
          ])).map((classNameOrCSSObject) => typeof classNameOrCSSObject === "string" ? classNameOrCSSObject : css2(classNameOrCSSObject)));
        };
      })()
    };
  })();
})(cssAndCx);
var makeStyles = {};
var Object_fromEntries = {};
Object.defineProperty(Object_fromEntries, "__esModule", { value: true });
Object_fromEntries.objectFromEntries = void 0;
Object_fromEntries.objectFromEntries = !Object.fromEntries ? (entries) => {
  if (!entries || !entries[Symbol.iterator]) {
    throw new Error("Object.fromEntries() requires a single iterable argument");
  }
  const o2 = {};
  Object.keys(entries).forEach((key) => {
    const [k2, v2] = entries[key];
    o2[k2] = v2;
  });
  return o2;
} : Object.fromEntries;
var objectKeys$1 = {};
Object.defineProperty(objectKeys$1, "__esModule", { value: true });
objectKeys$1.objectKeys = void 0;
function objectKeys(o2) {
  return Object.keys(o2);
}
objectKeys$1.objectKeys = objectKeys;
var getDependencyArrayRef$1 = {};
Object.defineProperty(getDependencyArrayRef$1, "__esModule", { value: true });
getDependencyArrayRef$1.getDependencyArrayRef = void 0;
function getDependencyArrayRef(obj) {
  if (!(obj instanceof Object) || typeof obj === "function") {
    return obj;
  }
  const arr = [];
  for (const key in obj) {
    const value = obj[key];
    const typeofValue = typeof value;
    if (!(typeofValue === "string" || typeofValue === "number" && !isNaN(value) || typeofValue === "boolean" || value === void 0 || value === null)) {
      return obj;
    }
    arr.push(`${key}:${typeofValue}_${value}`);
  }
  return "xSqLiJdLMd9s" + arr.join("|");
}
getDependencyArrayRef$1.getDependencyArrayRef = getDependencyArrayRef;
Object.defineProperty(makeStyles, "__esModule", { value: true });
makeStyles.createMakeStyles = void 0;
const react_1$1 = react.exports;
const Object_fromEntries_1 = Object_fromEntries;
const objectKeys_1 = objectKeys$1;
const cssAndCx_1 = cssAndCx;
const getDependencyArrayRef_1 = getDependencyArrayRef$1;
const typeGuard_1 = typeGuard$1;
const cache_1 = cache;
const getCounter = (() => {
  let counter = 0;
  return () => counter++;
})();
function createMakeStyles(params) {
  const { useTheme: useTheme3 } = params;
  function makeStyles2(params2) {
    const { name: nameOrWrappedName } = params2 !== null && params2 !== void 0 ? params2 : {};
    const name = typeof nameOrWrappedName !== "object" ? nameOrWrappedName : Object.keys(nameOrWrappedName)[0];
    return function(cssObjectByRuleNameOrGetCssObjectByRuleName) {
      const getCssObjectByRuleName = typeof cssObjectByRuleNameOrGetCssObjectByRuleName === "function" ? cssObjectByRuleNameOrGetCssObjectByRuleName : () => cssObjectByRuleNameOrGetCssObjectByRuleName;
      const outerCounter = getCounter();
      return function useStyles2(params3) {
        const theme = useTheme3();
        const { css: css2, cx: cx2 } = (0, cssAndCx_1.useCssAndCx)();
        const cache2 = (0, cache_1.useTssEmotionCache)();
        return (0, react_1$1.useMemo)(() => {
          const refClassesCache = {};
          const refClasses = new Proxy({}, {
            "get": (...args) => {
              const [, propertyKey] = args;
              if (typeof propertyKey === "symbol") {
                return Reflect.get(...args);
              }
              return refClassesCache[propertyKey] = `${cache2.key}-${outerCounter}${name !== void 0 ? `-${name}` : ""}-${propertyKey}-ref`;
            }
          });
          const cssObjectByRuleName = getCssObjectByRuleName(theme, params3, refClasses);
          const classes = (0, Object_fromEntries_1.objectFromEntries)((0, objectKeys_1.objectKeys)(cssObjectByRuleName).map((ruleName) => {
            const cssObject = cssObjectByRuleName[ruleName];
            if (!cssObject.name) {
              cssObject.label = `${name !== void 0 ? `${name}-` : ""}${ruleName}`;
            }
            return [
              ruleName,
              `${css2(cssObject)}${(0, typeGuard_1.typeGuard)(ruleName, ruleName in refClassesCache) ? ` ${refClassesCache[ruleName]}` : ""}`
            ];
          }));
          (0, objectKeys_1.objectKeys)(refClassesCache).forEach((ruleName) => {
            if (ruleName in classes) {
              return;
            }
            classes[ruleName] = refClassesCache[ruleName];
          });
          return {
            classes,
            theme,
            css: css2,
            cx: cx2
          };
        }, [cache2, theme, (0, getDependencyArrayRef_1.getDependencyArrayRef)(params3)]);
      };
    };
  }
  function useStyles() {
    const theme = useTheme3();
    const { css: css2, cx: cx2 } = (0, cssAndCx_1.useCssAndCx)();
    return { theme, css: css2, cx: cx2 };
  }
  return { makeStyles: makeStyles2, useStyles };
}
makeStyles.createMakeStyles = createMakeStyles;
var withStyles = {};
var capitalize$1 = {};
Object.defineProperty(capitalize$1, "__esModule", { value: true });
capitalize$1.capitalize = void 0;
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
capitalize$1.capitalize = capitalize;
var __rest = commonjsGlobal && commonjsGlobal.__rest || function(s2, e2) {
  var t2 = {};
  for (var p2 in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p2) && e2.indexOf(p2) < 0)
      t2[p2] = s2[p2];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s2); i2 < p2.length; i2++) {
      if (e2.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i2]))
        t2[p2[i2]] = s2[p2[i2]];
    }
  return t2;
};
Object.defineProperty(withStyles, "__esModule", { value: true });
withStyles.createWithStyles = void 0;
const jsx_runtime_1$1 = jsxRuntime.exports;
const react_1 = react.exports;
const makeStyles_1 = makeStyles;
const capitalize_1 = capitalize$1;
function createWithStyles(params) {
  const { useTheme: useTheme3 } = params;
  const { makeStyles: makeStyles2 } = (0, makeStyles_1.createMakeStyles)({ useTheme: useTheme3 });
  function withStyles2(Component, cssObjectByRuleNameOrGetCssObjectByRuleName) {
    const Component_ = typeof Component === "string" ? (() => {
      const tag = Component;
      const Out2 = function(_a) {
        var { children } = _a, props = __rest(_a, ["children"]);
        return (0, react_1.createElement)(tag, props, children);
      };
      Object.defineProperty(Out2, "name", {
        "value": (0, capitalize_1.capitalize)(tag)
      });
      return Out2;
    })() : Component;
    const useStyles = makeStyles2()(typeof cssObjectByRuleNameOrGetCssObjectByRuleName === "function" ? (theme, props, classes) => incorporateMediaQueries(cssObjectByRuleNameOrGetCssObjectByRuleName(theme, props, classes)) : incorporateMediaQueries(cssObjectByRuleNameOrGetCssObjectByRuleName));
    const Out = (0, react_1.forwardRef)(function(props, ref) {
      const { classes, cx: cx2 } = useStyles(props);
      const { className } = props, rest = __rest(props, ["className"]);
      return (0, jsx_runtime_1$1.jsx)(Component_, Object.assign({ ref, className: cx2(classes.root, className) }, typeof Component === "string" ? {} : { classes }, rest), void 0);
    });
    const { name } = Component_;
    if (typeof name === "string") {
      Object.defineProperty(Out, "name", {
        "value": `${name}WithStyles`
      });
    }
    return Out;
  }
  return { withStyles: withStyles2 };
}
withStyles.createWithStyles = createWithStyles;
function incorporateMediaQueries(cssObjectByRuleNameWithMediaQueries) {
  const cssObjectByRuleName = {};
  const cssObjectByRuleNameWithMediaQueriesByMediaQuery = {};
  Object.keys(cssObjectByRuleNameWithMediaQueries).forEach((ruleNameOrMediaQuery) => (ruleNameOrMediaQuery.startsWith("@media") ? cssObjectByRuleNameWithMediaQueriesByMediaQuery : cssObjectByRuleName)[ruleNameOrMediaQuery] = cssObjectByRuleNameWithMediaQueries[ruleNameOrMediaQuery]);
  Object.keys(cssObjectByRuleNameWithMediaQueriesByMediaQuery).forEach((mediaQuery) => {
    const cssObjectByRuleNameBis = cssObjectByRuleNameWithMediaQueriesByMediaQuery[mediaQuery];
    Object.keys(cssObjectByRuleNameBis).forEach((ruleName) => {
      var _a;
      return cssObjectByRuleName[ruleName] = Object.assign(Object.assign({}, (_a = cssObjectByRuleName[ruleName]) !== null && _a !== void 0 ? _a : {}), { [mediaQuery]: cssObjectByRuleNameBis[ruleName] });
    });
  });
  return cssObjectByRuleName;
}
var require$$3 = /* @__PURE__ */ getAugmentedNamespace(emotionReact_browser_esm);
var GlobalStyles$1 = {};
var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o2, m2, k2, k22) {
  if (k22 === void 0)
    k22 = k2;
  Object.defineProperty(o2, k22, { enumerable: true, get: function() {
    return m2[k2];
  } });
} : function(o2, m2, k2, k22) {
  if (k22 === void 0)
    k22 = k2;
  o2[k22] = m2[k2];
});
var __setModuleDefault = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o2, v2) {
  Object.defineProperty(o2, "default", { enumerable: true, value: v2 });
} : function(o2, v2) {
  o2["default"] = v2;
});
var __importStar = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
  if (mod && mod.__esModule)
    return mod;
  var result = {};
  if (mod != null) {
    for (var k2 in mod)
      if (k2 !== "default" && Object.prototype.hasOwnProperty.call(mod, k2))
        __createBinding(result, mod, k2);
  }
  __setModuleDefault(result, mod);
  return result;
};
Object.defineProperty(GlobalStyles$1, "__esModule", { value: true });
GlobalStyles$1.GlobalStyles = void 0;
const jsx_runtime_1 = jsxRuntime.exports;
const reactEmotion = __importStar(require$$3);
function GlobalStyles(props) {
  const { styles } = props;
  return (0, jsx_runtime_1.jsx)(reactEmotion.Global, { styles: reactEmotion.css(styles) }, void 0);
}
GlobalStyles$1.GlobalStyles = GlobalStyles;
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.createMakeAndWithStyles = exports.TssCacheProvider = exports.getTssDefaultEmotionCache = exports.GlobalStyles = exports.keyframes = exports.createWithStyles = exports.createMakeStyles = exports.useCssAndCx = void 0;
  var cssAndCx_12 = cssAndCx;
  Object.defineProperty(exports, "useCssAndCx", { enumerable: true, get: function() {
    return cssAndCx_12.useCssAndCx;
  } });
  const makeStyles_12 = makeStyles;
  Object.defineProperty(exports, "createMakeStyles", { enumerable: true, get: function() {
    return makeStyles_12.createMakeStyles;
  } });
  const withStyles_1 = withStyles;
  Object.defineProperty(exports, "createWithStyles", { enumerable: true, get: function() {
    return withStyles_1.createWithStyles;
  } });
  var react_12 = require$$3;
  Object.defineProperty(exports, "keyframes", { enumerable: true, get: function() {
    return react_12.keyframes;
  } });
  var GlobalStyles_1 = GlobalStyles$1;
  Object.defineProperty(exports, "GlobalStyles", { enumerable: true, get: function() {
    return GlobalStyles_1.GlobalStyles;
  } });
  var cache_12 = cache;
  Object.defineProperty(exports, "getTssDefaultEmotionCache", { enumerable: true, get: function() {
    return cache_12.getTssDefaultEmotionCache;
  } });
  Object.defineProperty(exports, "TssCacheProvider", { enumerable: true, get: function() {
    return cache_12.TssCacheProvider;
  } });
  function createMakeAndWithStyles(params) {
    return Object.assign(Object.assign({}, (0, makeStyles_12.createMakeStyles)(params)), (0, withStyles_1.createWithStyles)(params));
  }
  exports.createMakeAndWithStyles = createMakeAndWithStyles;
})(tssReact);
var shim = { exports: {} };
var useSyncExternalStoreShim_production_min = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var e$2 = react.exports;
function h$3(a2, b2) {
  return a2 === b2 && (a2 !== 0 || 1 / a2 === 1 / b2) || a2 !== a2 && b2 !== b2;
}
var k$2 = typeof Object.is === "function" ? Object.is : h$3, l$2 = e$2.useState, m$3 = e$2.useEffect, n$4 = e$2.useLayoutEffect, p$3 = e$2.useDebugValue;
function q$3(a2, b2) {
  var d2 = b2(), f2 = l$2({ inst: { value: d2, getSnapshot: b2 } }), c2 = f2[0].inst, g2 = f2[1];
  n$4(function() {
    c2.value = d2;
    c2.getSnapshot = b2;
    r$3(c2) && g2({ inst: c2 });
  }, [a2, d2, b2]);
  m$3(function() {
    r$3(c2) && g2({ inst: c2 });
    return a2(function() {
      r$3(c2) && g2({ inst: c2 });
    });
  }, [a2]);
  p$3(d2);
  return d2;
}
function r$3(a2) {
  var b2 = a2.getSnapshot;
  a2 = a2.value;
  try {
    var d2 = b2();
    return !k$2(a2, d2);
  } catch (f2) {
    return true;
  }
}
function t$4(a2, b2) {
  return b2();
}
var u$4 = typeof window === "undefined" || typeof window.document === "undefined" || typeof window.document.createElement === "undefined" ? t$4 : q$3;
useSyncExternalStoreShim_production_min.useSyncExternalStore = e$2.useSyncExternalStore !== void 0 ? e$2.useSyncExternalStore : u$4;
{
  shim.exports = useSyncExternalStoreShim_production_min;
}
var withSelector = { exports: {} };
var withSelector_production_min = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var h$2 = react.exports, n$3 = shim.exports;
function p$2(a2, b2) {
  return a2 === b2 && (a2 !== 0 || 1 / a2 === 1 / b2) || a2 !== a2 && b2 !== b2;
}
var q$2 = typeof Object.is === "function" ? Object.is : p$2, r$2 = n$3.useSyncExternalStore, t$3 = h$2.useRef, u$3 = h$2.useEffect, v$3 = h$2.useMemo, w$1 = h$2.useDebugValue;
withSelector_production_min.useSyncExternalStoreWithSelector = function(a2, b2, e2, l2, g2) {
  var c2 = t$3(null);
  if (c2.current === null) {
    var f2 = { hasValue: false, value: null };
    c2.current = f2;
  } else
    f2 = c2.current;
  c2 = v$3(function() {
    function a3(a4) {
      if (!c3) {
        c3 = true;
        d3 = a4;
        a4 = l2(a4);
        if (g2 !== void 0 && f2.hasValue) {
          var b3 = f2.value;
          if (g2(b3, a4))
            return k2 = b3;
        }
        return k2 = a4;
      }
      b3 = k2;
      if (q$2(d3, a4))
        return b3;
      var e3 = l2(a4);
      if (g2 !== void 0 && g2(b3, e3))
        return b3;
      d3 = a4;
      return k2 = e3;
    }
    var c3 = false, d3, k2, m2 = e2 === void 0 ? null : e2;
    return [function() {
      return a3(b2());
    }, m2 === null ? void 0 : function() {
      return a3(m2());
    }];
  }, [b2, e2, l2, g2]);
  var d2 = r$2(a2, c2[0], c2[1]);
  u$3(function() {
    f2.hasValue = true;
    f2.value = d2;
  }, [d2]);
  w$1(d2);
  return d2;
};
{
  withSelector.exports = withSelector_production_min;
}
function defaultNoopBatch(callback) {
  callback();
}
let batch = defaultNoopBatch;
const setBatch = (newBatch) => batch = newBatch;
const getBatch = () => batch;
const ReactReduxContext = /* @__PURE__ */ React.createContext(null);
function useReduxContext() {
  const contextValue = react.exports.useContext(ReactReduxContext);
  return contextValue;
}
const notInitialized = () => {
  throw new Error("uSES not initialized!");
};
let useSyncExternalStoreWithSelector = notInitialized;
const initializeUseSelector = (fn3) => {
  useSyncExternalStoreWithSelector = fn3;
};
const refEquality = (a2, b2) => a2 === b2;
function createSelectorHook(context = ReactReduxContext) {
  const useReduxContext$1 = context === ReactReduxContext ? useReduxContext : () => react.exports.useContext(context);
  return function useSelector2(selector, equalityFn = refEquality) {
    const {
      store,
      subscription,
      getServerState
    } = useReduxContext$1();
    const selectedState = useSyncExternalStoreWithSelector(subscription.addNestedSub, store.getState, getServerState || store.getState, selector, equalityFn);
    react.exports.useDebugValue(selectedState);
    return selectedState;
  };
}
const useSelector = /* @__PURE__ */ createSelectorHook();
var reactIs_production_min = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b$1 = Symbol.for("react.element"), c$2 = Symbol.for("react.portal"), d$1 = Symbol.for("react.fragment"), e$1 = Symbol.for("react.strict_mode"), f$2 = Symbol.for("react.profiler"), g$1 = Symbol.for("react.provider"), h$1 = Symbol.for("react.context"), k$1 = Symbol.for("react.server_context"), l$1 = Symbol.for("react.forward_ref"), m$2 = Symbol.for("react.suspense"), n$2 = Symbol.for("react.suspense_list"), p$1 = Symbol.for("react.memo"), q$1 = Symbol.for("react.lazy"), t$2 = Symbol.for("react.offscreen"), u$2 = Symbol.for("react.module.reference");
function v$2(a2) {
  if (typeof a2 === "object" && a2 !== null) {
    var r2 = a2.$$typeof;
    switch (r2) {
      case b$1:
        switch (a2 = a2.type, a2) {
          case d$1:
          case f$2:
          case e$1:
          case m$2:
          case n$2:
            return a2;
          default:
            switch (a2 = a2 && a2.$$typeof, a2) {
              case k$1:
              case h$1:
              case l$1:
              case q$1:
              case p$1:
              case g$1:
                return a2;
              default:
                return r2;
            }
        }
      case c$2:
        return r2;
    }
  }
}
reactIs_production_min.ContextConsumer = h$1;
reactIs_production_min.ContextProvider = g$1;
reactIs_production_min.Element = b$1;
reactIs_production_min.ForwardRef = l$1;
reactIs_production_min.Fragment = d$1;
reactIs_production_min.Lazy = q$1;
reactIs_production_min.Memo = p$1;
reactIs_production_min.Portal = c$2;
reactIs_production_min.Profiler = f$2;
reactIs_production_min.StrictMode = e$1;
reactIs_production_min.Suspense = m$2;
reactIs_production_min.SuspenseList = n$2;
reactIs_production_min.isAsyncMode = function() {
  return false;
};
reactIs_production_min.isConcurrentMode = function() {
  return false;
};
reactIs_production_min.isContextConsumer = function(a2) {
  return v$2(a2) === h$1;
};
reactIs_production_min.isContextProvider = function(a2) {
  return v$2(a2) === g$1;
};
reactIs_production_min.isElement = function(a2) {
  return typeof a2 === "object" && a2 !== null && a2.$$typeof === b$1;
};
reactIs_production_min.isForwardRef = function(a2) {
  return v$2(a2) === l$1;
};
reactIs_production_min.isFragment = function(a2) {
  return v$2(a2) === d$1;
};
reactIs_production_min.isLazy = function(a2) {
  return v$2(a2) === q$1;
};
reactIs_production_min.isMemo = function(a2) {
  return v$2(a2) === p$1;
};
reactIs_production_min.isPortal = function(a2) {
  return v$2(a2) === c$2;
};
reactIs_production_min.isProfiler = function(a2) {
  return v$2(a2) === f$2;
};
reactIs_production_min.isStrictMode = function(a2) {
  return v$2(a2) === e$1;
};
reactIs_production_min.isSuspense = function(a2) {
  return v$2(a2) === m$2;
};
reactIs_production_min.isSuspenseList = function(a2) {
  return v$2(a2) === n$2;
};
reactIs_production_min.isValidElementType = function(a2) {
  return typeof a2 === "string" || typeof a2 === "function" || a2 === d$1 || a2 === f$2 || a2 === e$1 || a2 === m$2 || a2 === n$2 || a2 === t$2 || typeof a2 === "object" && a2 !== null && (a2.$$typeof === q$1 || a2.$$typeof === p$1 || a2.$$typeof === g$1 || a2.$$typeof === h$1 || a2.$$typeof === l$1 || a2.$$typeof === u$2 || a2.getModuleId !== void 0) ? true : false;
};
reactIs_production_min.typeOf = v$2;
function createListenerCollection() {
  const batch2 = getBatch();
  let first = null;
  let last = null;
  return {
    clear() {
      first = null;
      last = null;
    },
    notify() {
      batch2(() => {
        let listener = first;
        while (listener) {
          listener.callback();
          listener = listener.next;
        }
      });
    },
    get() {
      let listeners = [];
      let listener = first;
      while (listener) {
        listeners.push(listener);
        listener = listener.next;
      }
      return listeners;
    },
    subscribe(callback) {
      let isSubscribed = true;
      let listener = last = {
        callback,
        next: null,
        prev: last
      };
      if (listener.prev) {
        listener.prev.next = listener;
      } else {
        first = listener;
      }
      return function unsubscribe() {
        if (!isSubscribed || first === null)
          return;
        isSubscribed = false;
        if (listener.next) {
          listener.next.prev = listener.prev;
        } else {
          last = listener.prev;
        }
        if (listener.prev) {
          listener.prev.next = listener.next;
        } else {
          first = listener.next;
        }
      };
    }
  };
}
const nullListeners = {
  notify() {
  },
  get: () => []
};
function createSubscription(store, parentSub) {
  let unsubscribe;
  let listeners = nullListeners;
  function addNestedSub(listener) {
    trySubscribe();
    return listeners.subscribe(listener);
  }
  function notifyNestedSubs() {
    listeners.notify();
  }
  function handleChangeWrapper() {
    if (subscription.onStateChange) {
      subscription.onStateChange();
    }
  }
  function isSubscribed() {
    return Boolean(unsubscribe);
  }
  function trySubscribe() {
    if (!unsubscribe) {
      unsubscribe = parentSub ? parentSub.addNestedSub(handleChangeWrapper) : store.subscribe(handleChangeWrapper);
      listeners = createListenerCollection();
    }
  }
  function tryUnsubscribe() {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = void 0;
      listeners.clear();
      listeners = nullListeners;
    }
  }
  const subscription = {
    addNestedSub,
    notifyNestedSubs,
    handleChangeWrapper,
    isSubscribed,
    trySubscribe,
    tryUnsubscribe,
    getListeners: () => listeners
  };
  return subscription;
}
const canUseDOM = !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
const useIsomorphicLayoutEffect = canUseDOM ? react.exports.useLayoutEffect : react.exports.useEffect;
function Provider({
  store,
  context,
  children,
  serverState
}) {
  const contextValue = react.exports.useMemo(() => {
    const subscription = createSubscription(store);
    return {
      store,
      subscription,
      getServerState: serverState ? () => serverState : void 0
    };
  }, [store, serverState]);
  const previousState = react.exports.useMemo(() => store.getState(), [store]);
  useIsomorphicLayoutEffect(() => {
    const {
      subscription
    } = contextValue;
    subscription.onStateChange = subscription.notifyNestedSubs;
    subscription.trySubscribe();
    if (previousState !== store.getState()) {
      subscription.notifyNestedSubs();
    }
    return () => {
      subscription.tryUnsubscribe();
      subscription.onStateChange = void 0;
    };
  }, [contextValue, previousState]);
  const Context = context || ReactReduxContext;
  return /* @__PURE__ */ React.createElement(Context.Provider, {
    value: contextValue
  }, children);
}
function createStoreHook(context = ReactReduxContext) {
  const useReduxContext$1 = context === ReactReduxContext ? useReduxContext : () => react.exports.useContext(context);
  return function useStore2() {
    const {
      store
    } = useReduxContext$1();
    return store;
  };
}
const useStore = /* @__PURE__ */ createStoreHook();
function createDispatchHook(context = ReactReduxContext) {
  const useStore$1 = context === ReactReduxContext ? useStore : createStoreHook(context);
  return function useDispatch2() {
    const store = useStore$1();
    return store.dispatch;
  };
}
const useDispatch = /* @__PURE__ */ createDispatchHook();
initializeUseSelector(withSelector.exports.useSyncExternalStoreWithSelector);
setBatch(reactDom.exports.unstable_batchedUpdates);
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && typeof Symbol == "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _possibleConstructorReturn(self2, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self2);
}
function _getPrototypeOf(o2) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o3) {
    return o3.__proto__ || Object.getPrototypeOf(o3);
  };
  return _getPrototypeOf(o2);
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
    arr2[i2] = arr[i2];
  }
  return arr2;
}
function _unsupportedIterableToArray(o2, minLen) {
  if (!o2)
    return;
  if (typeof o2 === "string")
    return _arrayLikeToArray(o2, minLen);
  var n2 = Object.prototype.toString.call(o2).slice(8, -1);
  if (n2 === "Object" && o2.constructor)
    n2 = o2.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o2);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray(o2, minLen);
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toArray(arr) {
  return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
}
function _iterableToArrayLimit(arr, i2) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null)
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i2 && _arr.length === i2)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _slicedToArray(arr, i2) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i2) || _unsupportedIterableToArray(arr, i2) || _nonIterableRest();
}
function n$1(n2) {
  for (var t2 = arguments.length, r2 = Array(t2 > 1 ? t2 - 1 : 0), e2 = 1; e2 < t2; e2++)
    r2[e2 - 1] = arguments[e2];
  throw Error("[Immer] minified error nr: " + n2 + (r2.length ? " " + r2.map(function(n3) {
    return "'" + n3 + "'";
  }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
}
function t$1(n2) {
  return !!n2 && !!n2[Q];
}
function r$1(n2) {
  return !!n2 && (function(n3) {
    if (!n3 || typeof n3 != "object")
      return false;
    var t2 = Object.getPrototypeOf(n3);
    if (t2 === null)
      return true;
    var r2 = Object.hasOwnProperty.call(t2, "constructor") && t2.constructor;
    return r2 === Object || typeof r2 == "function" && Function.toString.call(r2) === Z;
  }(n2) || Array.isArray(n2) || !!n2[L] || !!n2.constructor[L] || s$1(n2) || v$1(n2));
}
function i$1(n2, t2, r2) {
  r2 === void 0 && (r2 = false), o$1(n2) === 0 ? (r2 ? Object.keys : nn)(n2).forEach(function(e2) {
    r2 && typeof e2 == "symbol" || t2(e2, n2[e2], n2);
  }) : n2.forEach(function(r3, e2) {
    return t2(e2, r3, n2);
  });
}
function o$1(n2) {
  var t2 = n2[Q];
  return t2 ? t2.i > 3 ? t2.i - 4 : t2.i : Array.isArray(n2) ? 1 : s$1(n2) ? 2 : v$1(n2) ? 3 : 0;
}
function u$1(n2, t2) {
  return o$1(n2) === 2 ? n2.has(t2) : Object.prototype.hasOwnProperty.call(n2, t2);
}
function a$1(n2, t2) {
  return o$1(n2) === 2 ? n2.get(t2) : n2[t2];
}
function f$1(n2, t2, r2) {
  var e2 = o$1(n2);
  e2 === 2 ? n2.set(t2, r2) : e2 === 3 ? (n2.delete(t2), n2.add(r2)) : n2[t2] = r2;
}
function c$1(n2, t2) {
  return n2 === t2 ? n2 !== 0 || 1 / n2 == 1 / t2 : n2 != n2 && t2 != t2;
}
function s$1(n2) {
  return X && n2 instanceof Map;
}
function v$1(n2) {
  return q && n2 instanceof Set;
}
function p(n2) {
  return n2.o || n2.t;
}
function l(n2) {
  if (Array.isArray(n2))
    return Array.prototype.slice.call(n2);
  var t2 = tn(n2);
  delete t2[Q];
  for (var r2 = nn(t2), e2 = 0; e2 < r2.length; e2++) {
    var i2 = r2[e2], o2 = t2[i2];
    o2.writable === false && (o2.writable = true, o2.configurable = true), (o2.get || o2.set) && (t2[i2] = { configurable: true, writable: true, enumerable: o2.enumerable, value: n2[i2] });
  }
  return Object.create(Object.getPrototypeOf(n2), t2);
}
function d(n2, e2) {
  return e2 === void 0 && (e2 = false), y(n2) || t$1(n2) || !r$1(n2) ? n2 : (o$1(n2) > 1 && (n2.set = n2.add = n2.clear = n2.delete = h), Object.freeze(n2), e2 && i$1(n2, function(n3, t2) {
    return d(t2, true);
  }, true), n2);
}
function h() {
  n$1(2);
}
function y(n2) {
  return n2 == null || typeof n2 != "object" || Object.isFrozen(n2);
}
function b(t2) {
  var r2 = rn[t2];
  return r2 || n$1(18, t2), r2;
}
function m$1(n2, t2) {
  rn[n2] || (rn[n2] = t2);
}
function _$1() {
  return U;
}
function j(n2, t2) {
  t2 && (b("Patches"), n2.u = [], n2.s = [], n2.v = t2);
}
function O(n2) {
  g(n2), n2.p.forEach(S), n2.p = null;
}
function g(n2) {
  n2 === U && (U = n2.l);
}
function w(n2) {
  return U = { p: [], l: U, h: n2, m: true, _: 0 };
}
function S(n2) {
  var t2 = n2[Q];
  t2.i === 0 || t2.i === 1 ? t2.j() : t2.O = true;
}
function P(t2, e2) {
  e2._ = e2.p.length;
  var i2 = e2.p[0], o2 = t2 !== void 0 && t2 !== i2;
  return e2.h.g || b("ES5").S(e2, t2, o2), o2 ? (i2[Q].P && (O(e2), n$1(4)), r$1(t2) && (t2 = M(e2, t2), e2.l || x(e2, t2)), e2.u && b("Patches").M(i2[Q], t2, e2.u, e2.s)) : t2 = M(e2, i2, []), O(e2), e2.u && e2.v(e2.u, e2.s), t2 !== H ? t2 : void 0;
}
function M(n2, t2, r2) {
  if (y(t2))
    return t2;
  var e2 = t2[Q];
  if (!e2)
    return i$1(t2, function(i2, o3) {
      return A(n2, e2, t2, i2, o3, r2);
    }, true), t2;
  if (e2.A !== n2)
    return t2;
  if (!e2.P)
    return x(n2, e2.t, true), e2.t;
  if (!e2.I) {
    e2.I = true, e2.A._--;
    var o2 = e2.i === 4 || e2.i === 5 ? e2.o = l(e2.k) : e2.o;
    i$1(e2.i === 3 ? new Set(o2) : o2, function(t3, i2) {
      return A(n2, e2, o2, t3, i2, r2);
    }), x(n2, o2, false), r2 && n2.u && b("Patches").R(e2, r2, n2.u, n2.s);
  }
  return e2.o;
}
function A(e2, i2, o2, a2, c2, s2) {
  if (t$1(c2)) {
    var v2 = M(e2, c2, s2 && i2 && i2.i !== 3 && !u$1(i2.D, a2) ? s2.concat(a2) : void 0);
    if (f$1(o2, a2, v2), !t$1(v2))
      return;
    e2.m = false;
  }
  if (r$1(c2) && !y(c2)) {
    if (!e2.h.F && e2._ < 1)
      return;
    M(e2, c2), i2 && i2.A.l || x(e2, c2);
  }
}
function x(n2, t2, r2) {
  r2 === void 0 && (r2 = false), n2.h.F && n2.m && d(t2, r2);
}
function z(n2, t2) {
  var r2 = n2[Q];
  return (r2 ? p(r2) : n2)[t2];
}
function I(n2, t2) {
  if (t2 in n2)
    for (var r2 = Object.getPrototypeOf(n2); r2; ) {
      var e2 = Object.getOwnPropertyDescriptor(r2, t2);
      if (e2)
        return e2;
      r2 = Object.getPrototypeOf(r2);
    }
}
function k(n2) {
  n2.P || (n2.P = true, n2.l && k(n2.l));
}
function E(n2) {
  n2.o || (n2.o = l(n2.t));
}
function R(n2, t2, r2) {
  var e2 = s$1(t2) ? b("MapSet").N(t2, r2) : v$1(t2) ? b("MapSet").T(t2, r2) : n2.g ? function(n3, t3) {
    var r3 = Array.isArray(n3), e3 = { i: r3 ? 1 : 0, A: t3 ? t3.A : _$1(), P: false, I: false, D: {}, l: t3, t: n3, k: null, o: null, j: null, C: false }, i2 = e3, o2 = en;
    r3 && (i2 = [e3], o2 = on2);
    var u2 = Proxy.revocable(i2, o2), a2 = u2.revoke, f2 = u2.proxy;
    return e3.k = f2, e3.j = a2, f2;
  }(t2, r2) : b("ES5").J(t2, r2);
  return (r2 ? r2.A : _$1()).p.push(e2), e2;
}
function D(e2) {
  return t$1(e2) || n$1(22, e2), function n2(t2) {
    if (!r$1(t2))
      return t2;
    var e3, u2 = t2[Q], c2 = o$1(t2);
    if (u2) {
      if (!u2.P && (u2.i < 4 || !b("ES5").K(u2)))
        return u2.t;
      u2.I = true, e3 = F(t2, c2), u2.I = false;
    } else
      e3 = F(t2, c2);
    return i$1(e3, function(t3, r2) {
      u2 && a$1(u2.t, t3) === r2 || f$1(e3, t3, n2(r2));
    }), c2 === 3 ? new Set(e3) : e3;
  }(e2);
}
function F(n2, t2) {
  switch (t2) {
    case 2:
      return new Map(n2);
    case 3:
      return Array.from(n2);
  }
  return l(n2);
}
function N() {
  function r2(n2, t2) {
    var r3 = s2[n2];
    return r3 ? r3.enumerable = t2 : s2[n2] = r3 = { configurable: true, enumerable: t2, get: function() {
      var t3 = this[Q];
      return en.get(t3, n2);
    }, set: function(t3) {
      var r4 = this[Q];
      en.set(r4, n2, t3);
    } }, r3;
  }
  function e2(n2) {
    for (var t2 = n2.length - 1; t2 >= 0; t2--) {
      var r3 = n2[t2][Q];
      if (!r3.P)
        switch (r3.i) {
          case 5:
            a2(r3) && k(r3);
            break;
          case 4:
            o2(r3) && k(r3);
        }
    }
  }
  function o2(n2) {
    for (var t2 = n2.t, r3 = n2.k, e3 = nn(r3), i2 = e3.length - 1; i2 >= 0; i2--) {
      var o3 = e3[i2];
      if (o3 !== Q) {
        var a3 = t2[o3];
        if (a3 === void 0 && !u$1(t2, o3))
          return true;
        var f2 = r3[o3], s3 = f2 && f2[Q];
        if (s3 ? s3.t !== a3 : !c$1(f2, a3))
          return true;
      }
    }
    var v2 = !!t2[Q];
    return e3.length !== nn(t2).length + (v2 ? 0 : 1);
  }
  function a2(n2) {
    var t2 = n2.k;
    if (t2.length !== n2.t.length)
      return true;
    var r3 = Object.getOwnPropertyDescriptor(t2, t2.length - 1);
    return !(!r3 || r3.get);
  }
  var s2 = {};
  m$1("ES5", { J: function(n2, t2) {
    var e3 = Array.isArray(n2), i2 = function(n3, t3) {
      if (n3) {
        for (var e4 = Array(t3.length), i3 = 0; i3 < t3.length; i3++)
          Object.defineProperty(e4, "" + i3, r2(i3, true));
        return e4;
      }
      var o4 = tn(t3);
      delete o4[Q];
      for (var u2 = nn(o4), a3 = 0; a3 < u2.length; a3++) {
        var f2 = u2[a3];
        o4[f2] = r2(f2, n3 || !!o4[f2].enumerable);
      }
      return Object.create(Object.getPrototypeOf(t3), o4);
    }(e3, n2), o3 = { i: e3 ? 5 : 4, A: t2 ? t2.A : _$1(), P: false, I: false, D: {}, l: t2, t: n2, k: i2, o: null, O: false, C: false };
    return Object.defineProperty(i2, Q, { value: o3, writable: true }), i2;
  }, S: function(n2, r3, o3) {
    o3 ? t$1(r3) && r3[Q].A === n2 && e2(n2.p) : (n2.u && function n3(t2) {
      if (t2 && typeof t2 == "object") {
        var r4 = t2[Q];
        if (r4) {
          var e3 = r4.t, o4 = r4.k, f2 = r4.D, c2 = r4.i;
          if (c2 === 4)
            i$1(o4, function(t3) {
              t3 !== Q && (e3[t3] !== void 0 || u$1(e3, t3) ? f2[t3] || n3(o4[t3]) : (f2[t3] = true, k(r4)));
            }), i$1(e3, function(n4) {
              o4[n4] !== void 0 || u$1(o4, n4) || (f2[n4] = false, k(r4));
            });
          else if (c2 === 5) {
            if (a2(r4) && (k(r4), f2.length = true), o4.length < e3.length)
              for (var s3 = o4.length; s3 < e3.length; s3++)
                f2[s3] = false;
            else
              for (var v2 = e3.length; v2 < o4.length; v2++)
                f2[v2] = true;
            for (var p2 = Math.min(o4.length, e3.length), l2 = 0; l2 < p2; l2++)
              f2[l2] === void 0 && n3(o4[l2]);
          }
        }
      }
    }(n2.p[0]), e2(n2.p));
  }, K: function(n2) {
    return n2.i === 4 ? o2(n2) : a2(n2);
  } });
}
var G, U, W = typeof Symbol != "undefined" && typeof Symbol("x") == "symbol", X = typeof Map != "undefined", q = typeof Set != "undefined", B = typeof Proxy != "undefined" && Proxy.revocable !== void 0 && typeof Reflect != "undefined", H = W ? Symbol.for("immer-nothing") : ((G = {})["immer-nothing"] = true, G), L = W ? Symbol.for("immer-draftable") : "__$immer_draftable", Q = W ? Symbol.for("immer-state") : "__$immer_state", Z = "" + Object.prototype.constructor, nn = typeof Reflect != "undefined" && Reflect.ownKeys ? Reflect.ownKeys : Object.getOwnPropertySymbols !== void 0 ? function(n2) {
  return Object.getOwnPropertyNames(n2).concat(Object.getOwnPropertySymbols(n2));
} : Object.getOwnPropertyNames, tn = Object.getOwnPropertyDescriptors || function(n2) {
  var t2 = {};
  return nn(n2).forEach(function(r2) {
    t2[r2] = Object.getOwnPropertyDescriptor(n2, r2);
  }), t2;
}, rn = {}, en = { get: function(n2, t2) {
  if (t2 === Q)
    return n2;
  var e2 = p(n2);
  if (!u$1(e2, t2))
    return function(n3, t3, r2) {
      var e3, i3 = I(t3, r2);
      return i3 ? "value" in i3 ? i3.value : (e3 = i3.get) === null || e3 === void 0 ? void 0 : e3.call(n3.k) : void 0;
    }(n2, e2, t2);
  var i2 = e2[t2];
  return n2.I || !r$1(i2) ? i2 : i2 === z(n2.t, t2) ? (E(n2), n2.o[t2] = R(n2.A.h, i2, n2)) : i2;
}, has: function(n2, t2) {
  return t2 in p(n2);
}, ownKeys: function(n2) {
  return Reflect.ownKeys(p(n2));
}, set: function(n2, t2, r2) {
  var e2 = I(p(n2), t2);
  if (e2 == null ? void 0 : e2.set)
    return e2.set.call(n2.k, r2), true;
  if (!n2.P) {
    var i2 = z(p(n2), t2), o2 = i2 == null ? void 0 : i2[Q];
    if (o2 && o2.t === r2)
      return n2.o[t2] = r2, n2.D[t2] = false, true;
    if (c$1(r2, i2) && (r2 !== void 0 || u$1(n2.t, t2)))
      return true;
    E(n2), k(n2);
  }
  return n2.o[t2] === r2 && typeof r2 != "number" && (r2 !== void 0 || t2 in n2.o) || (n2.o[t2] = r2, n2.D[t2] = true, true);
}, deleteProperty: function(n2, t2) {
  return z(n2.t, t2) !== void 0 || t2 in n2.t ? (n2.D[t2] = false, E(n2), k(n2)) : delete n2.D[t2], n2.o && delete n2.o[t2], true;
}, getOwnPropertyDescriptor: function(n2, t2) {
  var r2 = p(n2), e2 = Reflect.getOwnPropertyDescriptor(r2, t2);
  return e2 ? { writable: true, configurable: n2.i !== 1 || t2 !== "length", enumerable: e2.enumerable, value: r2[t2] } : e2;
}, defineProperty: function() {
  n$1(11);
}, getPrototypeOf: function(n2) {
  return Object.getPrototypeOf(n2.t);
}, setPrototypeOf: function() {
  n$1(12);
} }, on2 = {};
i$1(en, function(n2, t2) {
  on2[n2] = function() {
    return arguments[0] = arguments[0][0], t2.apply(this, arguments);
  };
}), on2.deleteProperty = function(t2, r2) {
  return en.deleteProperty.call(this, t2[0], r2);
}, on2.set = function(t2, r2, e2) {
  return en.set.call(this, t2[0], r2, e2, t2[0]);
};
var un = function() {
  function e2(t2) {
    var e3 = this;
    this.g = B, this.F = true, this.produce = function(t3, i3, o2) {
      if (typeof t3 == "function" && typeof i3 != "function") {
        var u2 = i3;
        i3 = t3;
        var a2 = e3;
        return function(n2) {
          var t4 = this;
          n2 === void 0 && (n2 = u2);
          for (var r2 = arguments.length, e4 = Array(r2 > 1 ? r2 - 1 : 0), o3 = 1; o3 < r2; o3++)
            e4[o3 - 1] = arguments[o3];
          return a2.produce(n2, function(n3) {
            var r3;
            return (r3 = i3).call.apply(r3, [t4, n3].concat(e4));
          });
        };
      }
      var f2;
      if (typeof i3 != "function" && n$1(6), o2 !== void 0 && typeof o2 != "function" && n$1(7), r$1(t3)) {
        var c2 = w(e3), s2 = R(e3, t3, void 0), v2 = true;
        try {
          f2 = i3(s2), v2 = false;
        } finally {
          v2 ? O(c2) : g(c2);
        }
        return typeof Promise != "undefined" && f2 instanceof Promise ? f2.then(function(n2) {
          return j(c2, o2), P(n2, c2);
        }, function(n2) {
          throw O(c2), n2;
        }) : (j(c2, o2), P(f2, c2));
      }
      if (!t3 || typeof t3 != "object") {
        if ((f2 = i3(t3)) === H)
          return;
        return f2 === void 0 && (f2 = t3), e3.F && d(f2, true), f2;
      }
      n$1(21, t3);
    }, this.produceWithPatches = function(n2, t3) {
      return typeof n2 == "function" ? function(t4) {
        for (var r3 = arguments.length, i4 = Array(r3 > 1 ? r3 - 1 : 0), o2 = 1; o2 < r3; o2++)
          i4[o2 - 1] = arguments[o2];
        return e3.produceWithPatches(t4, function(t5) {
          return n2.apply(void 0, [t5].concat(i4));
        });
      } : [e3.produce(n2, t3, function(n3, t4) {
        r2 = n3, i3 = t4;
      }), r2, i3];
      var r2, i3;
    }, typeof (t2 == null ? void 0 : t2.useProxies) == "boolean" && this.setUseProxies(t2.useProxies), typeof (t2 == null ? void 0 : t2.autoFreeze) == "boolean" && this.setAutoFreeze(t2.autoFreeze);
  }
  var i2 = e2.prototype;
  return i2.createDraft = function(e3) {
    r$1(e3) || n$1(8), t$1(e3) && (e3 = D(e3));
    var i3 = w(this), o2 = R(this, e3, void 0);
    return o2[Q].C = true, g(i3), o2;
  }, i2.finishDraft = function(t2, r2) {
    var e3 = t2 && t2[Q];
    var i3 = e3.A;
    return j(i3, r2), P(void 0, i3);
  }, i2.setAutoFreeze = function(n2) {
    this.F = n2;
  }, i2.setUseProxies = function(t2) {
    t2 && !B && n$1(20), this.g = t2;
  }, i2.applyPatches = function(n2, r2) {
    var e3;
    for (e3 = r2.length - 1; e3 >= 0; e3--) {
      var i3 = r2[e3];
      if (i3.path.length === 0 && i3.op === "replace") {
        n2 = i3.value;
        break;
      }
    }
    var o2 = b("Patches").$;
    return t$1(n2) ? o2(n2, r2) : this.produce(n2, function(n3) {
      return o2(n3, r2.slice(e3 + 1));
    });
  }, e2;
}(), an = new un(), fn2 = an.produce;
an.produceWithPatches.bind(an);
an.setAutoFreeze.bind(an);
an.setUseProxies.bind(an);
an.applyPatches.bind(an);
an.createDraft.bind(an);
an.finishDraft.bind(an);
var createNextState2 = fn2;
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? arguments[i2] : {};
    i2 % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function formatProdErrorMessage(code) {
  return "Minified Redux error #" + code + "; visit https://redux.js.org/Errors?code=" + code + " for the full message or use the non-minified dev environment for full errors. ";
}
var $$observable = function() {
  return typeof Symbol === "function" && Symbol.observable || "@@observable";
}();
var randomString = function randomString2() {
  return Math.random().toString(36).substring(7).split("").join(".");
};
var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};
function isPlainObject$1(obj) {
  if (typeof obj !== "object" || obj === null)
    return false;
  var proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto;
}
function createStore(reducer2, preloadedState, enhancer) {
  var _ref2;
  if (typeof preloadedState === "function" && typeof enhancer === "function" || typeof enhancer === "function" && typeof arguments[3] === "function") {
    throw new Error(formatProdErrorMessage(0));
  }
  if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
    enhancer = preloadedState;
    preloadedState = void 0;
  }
  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error(formatProdErrorMessage(1));
    }
    return enhancer(createStore)(reducer2, preloadedState);
  }
  if (typeof reducer2 !== "function") {
    throw new Error(formatProdErrorMessage(2));
  }
  var currentReducer = reducer2;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  function getState() {
    if (isDispatching) {
      throw new Error(formatProdErrorMessage(3));
    }
    return currentState;
  }
  function subscribe(listener) {
    if (typeof listener !== "function") {
      throw new Error(formatProdErrorMessage(4));
    }
    if (isDispatching) {
      throw new Error(formatProdErrorMessage(5));
    }
    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }
      if (isDispatching) {
        throw new Error(formatProdErrorMessage(6));
      }
      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  function dispatch(action) {
    if (!isPlainObject$1(action)) {
      throw new Error(formatProdErrorMessage(7));
    }
    if (typeof action.type === "undefined") {
      throw new Error(formatProdErrorMessage(8));
    }
    if (isDispatching) {
      throw new Error(formatProdErrorMessage(9));
    }
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    var listeners = currentListeners = nextListeners;
    for (var i2 = 0; i2 < listeners.length; i2++) {
      var listener = listeners[i2];
      listener();
    }
    return action;
  }
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== "function") {
      throw new Error(formatProdErrorMessage(10));
    }
    currentReducer = nextReducer;
    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  function observable() {
    var _ref;
    var outerSubscribe = subscribe;
    return _ref = {
      subscribe: function subscribe2(observer) {
        if (typeof observer !== "object" || observer === null) {
          throw new Error(formatProdErrorMessage(11));
        }
        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }
        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe
        };
      }
    }, _ref[$$observable] = function() {
      return this;
    }, _ref;
  }
  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch,
    subscribe,
    getState,
    replaceReducer
  }, _ref2[$$observable] = observable, _ref2;
}
function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function(key) {
    var reducer2 = reducers[key];
    var initialState = reducer2(void 0, {
      type: ActionTypes.INIT
    });
    if (typeof initialState === "undefined") {
      throw new Error(formatProdErrorMessage(12));
    }
    if (typeof reducer2(void 0, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === "undefined") {
      throw new Error(formatProdErrorMessage(13));
    }
  });
}
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i2 = 0; i2 < reducerKeys.length; i2++) {
    var key = reducerKeys[i2];
    if (typeof reducers[key] === "function") {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);
  var shapeAssertionError;
  try {
    assertReducerShape(finalReducers);
  } catch (e2) {
    shapeAssertionError = e2;
  }
  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }
    if (shapeAssertionError) {
      throw shapeAssertionError;
    }
    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer2 = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer2(previousStateForKey, action);
      if (typeof nextStateForKey === "undefined") {
        action && action.type;
        throw new Error(formatProdErrorMessage(14));
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }
  if (funcs.length === 0) {
    return function(arg) {
      return arg;
    };
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce(function(a2, b2) {
    return function() {
      return a2(b2.apply(void 0, arguments));
    };
  });
}
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }
  return function(createStore2) {
    return function() {
      var store = createStore2.apply(void 0, arguments);
      var _dispatch = function dispatch() {
        throw new Error(formatProdErrorMessage(15));
      };
      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function(middleware2) {
        return middleware2(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread2(_objectSpread2({}, store), {}, {
        dispatch: _dispatch
      });
    };
  };
}
var NOT_FOUND = "NOT_FOUND";
function createSingletonCache(equals) {
  var entry;
  return {
    get: function get(key) {
      if (entry && equals(entry.key, key)) {
        return entry.value;
      }
      return NOT_FOUND;
    },
    put: function put(key, value) {
      entry = {
        key,
        value
      };
    },
    getEntries: function getEntries() {
      return entry ? [entry] : [];
    },
    clear: function clear() {
      entry = void 0;
    }
  };
}
function createLruCache(maxSize, equals) {
  var entries = [];
  function get(key) {
    var cacheIndex = entries.findIndex(function(entry2) {
      return equals(key, entry2.key);
    });
    if (cacheIndex > -1) {
      var entry = entries[cacheIndex];
      if (cacheIndex > 0) {
        entries.splice(cacheIndex, 1);
        entries.unshift(entry);
      }
      return entry.value;
    }
    return NOT_FOUND;
  }
  function put(key, value) {
    if (get(key) === NOT_FOUND) {
      entries.unshift({
        key,
        value
      });
      if (entries.length > maxSize) {
        entries.pop();
      }
    }
  }
  function getEntries() {
    return entries;
  }
  function clear() {
    entries = [];
  }
  return {
    get,
    put,
    getEntries,
    clear
  };
}
var defaultEqualityCheck = function defaultEqualityCheck2(a2, b2) {
  return a2 === b2;
};
function createCacheKeyComparator(equalityCheck) {
  return function areArgumentsShallowlyEqual(prev2, next2) {
    if (prev2 === null || next2 === null || prev2.length !== next2.length) {
      return false;
    }
    var length2 = prev2.length;
    for (var i2 = 0; i2 < length2; i2++) {
      if (!equalityCheck(prev2[i2], next2[i2])) {
        return false;
      }
    }
    return true;
  };
}
function defaultMemoize(func, equalityCheckOrOptions) {
  var providedOptions = typeof equalityCheckOrOptions === "object" ? equalityCheckOrOptions : {
    equalityCheck: equalityCheckOrOptions
  };
  var _providedOptions$equa = providedOptions.equalityCheck, equalityCheck = _providedOptions$equa === void 0 ? defaultEqualityCheck : _providedOptions$equa, _providedOptions$maxS = providedOptions.maxSize, maxSize = _providedOptions$maxS === void 0 ? 1 : _providedOptions$maxS, resultEqualityCheck = providedOptions.resultEqualityCheck;
  var comparator = createCacheKeyComparator(equalityCheck);
  var cache2 = maxSize === 1 ? createSingletonCache(comparator) : createLruCache(maxSize, comparator);
  function memoized() {
    var value = cache2.get(arguments);
    if (value === NOT_FOUND) {
      value = func.apply(null, arguments);
      if (resultEqualityCheck) {
        var entries = cache2.getEntries();
        var matchingEntry = entries.find(function(entry) {
          return resultEqualityCheck(entry.value, value);
        });
        if (matchingEntry) {
          value = matchingEntry.value;
        }
      }
      cache2.put(arguments, value);
    }
    return value;
  }
  memoized.clearCache = function() {
    return cache2.clear();
  };
  return memoized;
}
function getDependencies(funcs) {
  var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;
  if (!dependencies.every(function(dep) {
    return typeof dep === "function";
  })) {
    var dependencyTypes = dependencies.map(function(dep) {
      return typeof dep === "function" ? "function " + (dep.name || "unnamed") + "()" : typeof dep;
    }).join(", ");
    throw new Error("createSelector expects all input-selectors to be functions, but received the following types: [" + dependencyTypes + "]");
  }
  return dependencies;
}
function createSelectorCreator(memoize2) {
  for (var _len = arguments.length, memoizeOptionsFromArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    memoizeOptionsFromArgs[_key - 1] = arguments[_key];
  }
  var createSelector2 = function createSelector3() {
    for (var _len2 = arguments.length, funcs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      funcs[_key2] = arguments[_key2];
    }
    var _recomputations = 0;
    var _lastResult;
    var directlyPassedOptions = {
      memoizeOptions: void 0
    };
    var resultFunc = funcs.pop();
    if (typeof resultFunc === "object") {
      directlyPassedOptions = resultFunc;
      resultFunc = funcs.pop();
    }
    if (typeof resultFunc !== "function") {
      throw new Error("createSelector expects an output function after the inputs, but received: [" + typeof resultFunc + "]");
    }
    var _directlyPassedOption = directlyPassedOptions, _directlyPassedOption2 = _directlyPassedOption.memoizeOptions, memoizeOptions = _directlyPassedOption2 === void 0 ? memoizeOptionsFromArgs : _directlyPassedOption2;
    var finalMemoizeOptions = Array.isArray(memoizeOptions) ? memoizeOptions : [memoizeOptions];
    var dependencies = getDependencies(funcs);
    var memoizedResultFunc = memoize2.apply(void 0, [function() {
      _recomputations++;
      return resultFunc.apply(null, arguments);
    }].concat(finalMemoizeOptions));
    var selector = memoize2(function() {
      var params = [];
      var length2 = dependencies.length;
      for (var i2 = 0; i2 < length2; i2++) {
        params.push(dependencies[i2].apply(null, arguments));
      }
      _lastResult = memoizedResultFunc.apply(null, params);
      return _lastResult;
    });
    Object.assign(selector, {
      resultFunc,
      memoizedResultFunc,
      dependencies,
      lastResult: function lastResult() {
        return _lastResult;
      },
      recomputations: function recomputations() {
        return _recomputations;
      },
      resetRecomputations: function resetRecomputations() {
        return _recomputations = 0;
      }
    });
    return selector;
  };
  return createSelector2;
}
var createSelector = /* @__PURE__ */ createSelectorCreator(defaultMemoize);
function createThunkMiddleware(extraArgument) {
  var middleware2 = function middleware3(_ref) {
    var dispatch = _ref.dispatch, getState = _ref.getState;
    return function(next2) {
      return function(action) {
        if (typeof action === "function") {
          return action(dispatch, getState, extraArgument);
        }
        return next2(action);
      };
    };
  };
  return middleware2;
}
var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
var thunkMiddleware = thunk;
var __extends = globalThis && globalThis.__extends || function() {
  var extendStatics = function(d2, b2) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b3) {
      d3.__proto__ = b3;
    } || function(d3, b3) {
      for (var p2 in b3)
        if (Object.prototype.hasOwnProperty.call(b3, p2))
          d3[p2] = b3[p2];
    };
    return extendStatics(d2, b2);
  };
  return function(d2, b2) {
    if (typeof b2 !== "function" && b2 !== null)
      throw new TypeError("Class extends value " + String(b2) + " is not a constructor or null");
    extendStatics(d2, b2);
    function __() {
      this.constructor = d2;
    }
    d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
  };
}();
var __generator = globalThis && globalThis.__generator || function(thisArg, body) {
  var _2 = { label: 0, sent: function() {
    if (t2[0] & 1)
      throw t2[1];
    return t2[1];
  }, trys: [], ops: [] }, f2, y2, t2, g2;
  return g2 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
    return this;
  }), g2;
  function verb(n2) {
    return function(v2) {
      return step([n2, v2]);
    };
  }
  function step(op) {
    if (f2)
      throw new TypeError("Generator is already executing.");
    while (_2)
      try {
        if (f2 = 1, y2 && (t2 = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t2 = y2["return"]) && t2.call(y2), 0) : y2.next) && !(t2 = t2.call(y2, op[1])).done)
          return t2;
        if (y2 = 0, t2)
          op = [op[0] & 2, t2.value];
        switch (op[0]) {
          case 0:
          case 1:
            t2 = op;
            break;
          case 4:
            _2.label++;
            return { value: op[1], done: false };
          case 5:
            _2.label++;
            y2 = op[1];
            op = [0];
            continue;
          case 7:
            op = _2.ops.pop();
            _2.trys.pop();
            continue;
          default:
            if (!(t2 = _2.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _2 = 0;
              continue;
            }
            if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
              _2.label = op[1];
              break;
            }
            if (op[0] === 6 && _2.label < t2[1]) {
              _2.label = t2[1];
              t2 = op;
              break;
            }
            if (t2 && _2.label < t2[2]) {
              _2.label = t2[2];
              _2.ops.push(op);
              break;
            }
            if (t2[2])
              _2.ops.pop();
            _2.trys.pop();
            continue;
        }
        op = body.call(thisArg, _2);
      } catch (e2) {
        op = [6, e2];
        y2 = 0;
      } finally {
        f2 = t2 = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
};
var __spreadArray = globalThis && globalThis.__spreadArray || function(to, from2) {
  for (var i2 = 0, il2 = from2.length, j2 = to.length; i2 < il2; i2++, j2++)
    to[j2] = from2[i2];
  return to;
};
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = function(obj, key, value) {
  return key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
};
var __spreadValues = function(a2, b2) {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var _i = 0, _b = __getOwnPropSymbols(b2); _i < _b.length; _i++) {
      var prop = _b[_i];
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps = function(a2, b2) {
  return __defProps(a2, __getOwnPropDescs(b2));
};
var __async = function(__this, __arguments, generator) {
  return new Promise(function(resolve, reject) {
    var fulfilled = function(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    };
    var rejected = function(value) {
      try {
        step(generator.throw(value));
      } catch (e2) {
        reject(e2);
      }
    };
    var step = function(x2) {
      return x2.done ? resolve(x2.value) : Promise.resolve(x2.value).then(fulfilled, rejected);
    };
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var composeWithDevTools = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length === 0)
    return void 0;
  if (typeof arguments[0] === "object")
    return compose;
  return compose.apply(null, arguments);
};
function isPlainObject(value) {
  if (typeof value !== "object" || value === null)
    return false;
  var proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
}
var MiddlewareArray = function(_super) {
  __extends(MiddlewareArray2, _super);
  function MiddlewareArray2() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var _this = _super.apply(this, args) || this;
    Object.setPrototypeOf(_this, MiddlewareArray2.prototype);
    return _this;
  }
  Object.defineProperty(MiddlewareArray2, Symbol.species, {
    get: function() {
      return MiddlewareArray2;
    },
    enumerable: false,
    configurable: true
  });
  MiddlewareArray2.prototype.concat = function() {
    var arr = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      arr[_i] = arguments[_i];
    }
    return _super.prototype.concat.apply(this, arr);
  };
  MiddlewareArray2.prototype.prepend = function() {
    var arr = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      arr[_i] = arguments[_i];
    }
    if (arr.length === 1 && Array.isArray(arr[0])) {
      return new (MiddlewareArray2.bind.apply(MiddlewareArray2, __spreadArray([void 0], arr[0].concat(this))))();
    }
    return new (MiddlewareArray2.bind.apply(MiddlewareArray2, __spreadArray([void 0], arr.concat(this))))();
  };
  return MiddlewareArray2;
}(Array);
function isBoolean(x2) {
  return typeof x2 === "boolean";
}
function curryGetDefaultMiddleware() {
  return function curriedGetDefaultMiddleware(options) {
    return getDefaultMiddleware(options);
  };
}
function getDefaultMiddleware(options) {
  if (options === void 0) {
    options = {};
  }
  var _b = options.thunk, thunk2 = _b === void 0 ? true : _b;
  options.immutableCheck;
  options.serializableCheck;
  var middlewareArray = new MiddlewareArray();
  if (thunk2) {
    if (isBoolean(thunk2)) {
      middlewareArray.push(thunkMiddleware);
    } else {
      middlewareArray.push(thunkMiddleware.withExtraArgument(thunk2.extraArgument));
    }
  }
  return middlewareArray;
}
var IS_PRODUCTION = true;
function configureStore(options) {
  var curriedGetDefaultMiddleware = curryGetDefaultMiddleware();
  var _b = options || {}, _c = _b.reducer, reducer2 = _c === void 0 ? void 0 : _c, _d = _b.middleware, middleware2 = _d === void 0 ? curriedGetDefaultMiddleware() : _d, _e = _b.devTools, devTools = _e === void 0 ? true : _e, _f = _b.preloadedState, preloadedState = _f === void 0 ? void 0 : _f, _g = _b.enhancers, enhancers = _g === void 0 ? void 0 : _g;
  var rootReducer;
  if (typeof reducer2 === "function") {
    rootReducer = reducer2;
  } else if (isPlainObject(reducer2)) {
    rootReducer = combineReducers(reducer2);
  } else {
    throw new Error('"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers');
  }
  var finalMiddleware = middleware2;
  if (typeof finalMiddleware === "function") {
    finalMiddleware = finalMiddleware(curriedGetDefaultMiddleware);
  }
  var middlewareEnhancer = applyMiddleware.apply(void 0, finalMiddleware);
  var finalCompose = compose;
  if (devTools) {
    finalCompose = composeWithDevTools(__spreadValues({
      trace: !IS_PRODUCTION
    }, typeof devTools === "object" && devTools));
  }
  var storeEnhancers = [middlewareEnhancer];
  if (Array.isArray(enhancers)) {
    storeEnhancers = __spreadArray([middlewareEnhancer], enhancers);
  } else if (typeof enhancers === "function") {
    storeEnhancers = enhancers(storeEnhancers);
  }
  var composedEnhancer = finalCompose.apply(void 0, storeEnhancers);
  return createStore(rootReducer, preloadedState, composedEnhancer);
}
function createAction(type, prepareAction) {
  function actionCreator() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    if (prepareAction) {
      var prepared = prepareAction.apply(void 0, args);
      if (!prepared) {
        throw new Error("prepareAction did not return an object");
      }
      return __spreadValues(__spreadValues({
        type,
        payload: prepared.payload
      }, "meta" in prepared && { meta: prepared.meta }), "error" in prepared && { error: prepared.error });
    }
    return { type, payload: args[0] };
  }
  actionCreator.toString = function() {
    return "" + type;
  };
  actionCreator.type = type;
  actionCreator.match = function(action) {
    return action.type === type;
  };
  return actionCreator;
}
function executeReducerBuilderCallback(builderCallback) {
  var actionsMap = {};
  var actionMatchers = [];
  var defaultCaseReducer;
  var builder = {
    addCase: function(typeOrActionCreator, reducer2) {
      var type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
      if (type in actionsMap) {
        throw new Error("addCase cannot be called with two reducers for the same action type");
      }
      actionsMap[type] = reducer2;
      return builder;
    },
    addMatcher: function(matcher, reducer2) {
      actionMatchers.push({ matcher, reducer: reducer2 });
      return builder;
    },
    addDefaultCase: function(reducer2) {
      defaultCaseReducer = reducer2;
      return builder;
    }
  };
  builderCallback(builder);
  return [actionsMap, actionMatchers, defaultCaseReducer];
}
function createReducer(initialState, mapOrBuilderCallback, actionMatchers, defaultCaseReducer) {
  if (actionMatchers === void 0) {
    actionMatchers = [];
  }
  var _b = typeof mapOrBuilderCallback === "function" ? executeReducerBuilderCallback(mapOrBuilderCallback) : [mapOrBuilderCallback, actionMatchers, defaultCaseReducer], actionsMap = _b[0], finalActionMatchers = _b[1], finalDefaultCaseReducer = _b[2];
  var frozenInitialState = createNextState2(initialState, function() {
  });
  return function(state, action) {
    if (state === void 0) {
      state = frozenInitialState;
    }
    var caseReducers = __spreadArray([
      actionsMap[action.type]
    ], finalActionMatchers.filter(function(_b2) {
      var matcher = _b2.matcher;
      return matcher(action);
    }).map(function(_b2) {
      var reducer2 = _b2.reducer;
      return reducer2;
    }));
    if (caseReducers.filter(function(cr) {
      return !!cr;
    }).length === 0) {
      caseReducers = [finalDefaultCaseReducer];
    }
    return caseReducers.reduce(function(previousState, caseReducer) {
      if (caseReducer) {
        if (t$1(previousState)) {
          var draft = previousState;
          var result = caseReducer(draft, action);
          if (typeof result === "undefined") {
            return previousState;
          }
          return result;
        } else if (!r$1(previousState)) {
          var result = caseReducer(previousState, action);
          if (typeof result === "undefined") {
            if (previousState === null) {
              return previousState;
            }
            throw Error("A case reducer on a non-draftable value must not return undefined");
          }
          return result;
        } else {
          return createNextState2(previousState, function(draft2) {
            return caseReducer(draft2, action);
          });
        }
      }
      return previousState;
    }, state);
  };
}
function getType2(slice2, actionKey) {
  return slice2 + "/" + actionKey;
}
function createSlice(options) {
  var name = options.name, initialState = options.initialState;
  if (!name) {
    throw new Error("`name` is a required option for createSlice");
  }
  var reducers = options.reducers || {};
  var _b = typeof options.extraReducers === "function" ? executeReducerBuilderCallback(options.extraReducers) : [options.extraReducers], _c = _b[0], extraReducers = _c === void 0 ? {} : _c, _d = _b[1], actionMatchers = _d === void 0 ? [] : _d, _e = _b[2], defaultCaseReducer = _e === void 0 ? void 0 : _e;
  var reducerNames = Object.keys(reducers);
  var sliceCaseReducersByName = {};
  var sliceCaseReducersByType = {};
  var actionCreators = {};
  reducerNames.forEach(function(reducerName) {
    var maybeReducerWithPrepare = reducers[reducerName];
    var type = getType2(name, reducerName);
    var caseReducer;
    var prepareCallback;
    if ("reducer" in maybeReducerWithPrepare) {
      caseReducer = maybeReducerWithPrepare.reducer;
      prepareCallback = maybeReducerWithPrepare.prepare;
    } else {
      caseReducer = maybeReducerWithPrepare;
    }
    sliceCaseReducersByName[reducerName] = caseReducer;
    sliceCaseReducersByType[type] = caseReducer;
    actionCreators[reducerName] = prepareCallback ? createAction(type, prepareCallback) : createAction(type);
  });
  var finalCaseReducers = __spreadValues(__spreadValues({}, extraReducers), sliceCaseReducersByType);
  var reducer2 = createReducer(initialState, finalCaseReducers, actionMatchers, defaultCaseReducer);
  return {
    name,
    reducer: reducer2,
    actions: actionCreators,
    caseReducers: sliceCaseReducersByName
  };
}
var urlAlphabet = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW";
var nanoid = function(size) {
  if (size === void 0) {
    size = 21;
  }
  var id2 = "";
  var i2 = size;
  while (i2--) {
    id2 += urlAlphabet[Math.random() * 64 | 0];
  }
  return id2;
};
var commonProperties = [
  "name",
  "message",
  "stack",
  "code"
];
var RejectWithValue = function() {
  function RejectWithValue2(payload, meta) {
    this.payload = payload;
    this.meta = meta;
  }
  return RejectWithValue2;
}();
var FulfillWithMeta = function() {
  function FulfillWithMeta2(payload, meta) {
    this.payload = payload;
    this.meta = meta;
  }
  return FulfillWithMeta2;
}();
var miniSerializeError = function(value) {
  if (typeof value === "object" && value !== null) {
    var simpleError = {};
    for (var _i = 0, commonProperties_1 = commonProperties; _i < commonProperties_1.length; _i++) {
      var property = commonProperties_1[_i];
      if (typeof value[property] === "string") {
        simpleError[property] = value[property];
      }
    }
    return simpleError;
  }
  return { message: String(value) };
};
function createAsyncThunk(typePrefix, payloadCreator, options) {
  var fulfilled = createAction(typePrefix + "/fulfilled", function(payload, requestId, arg, meta) {
    return {
      payload,
      meta: __spreadProps(__spreadValues({}, meta || {}), {
        arg,
        requestId,
        requestStatus: "fulfilled"
      })
    };
  });
  var pending = createAction(typePrefix + "/pending", function(requestId, arg, meta) {
    return {
      payload: void 0,
      meta: __spreadProps(__spreadValues({}, meta || {}), {
        arg,
        requestId,
        requestStatus: "pending"
      })
    };
  });
  var rejected = createAction(typePrefix + "/rejected", function(error, requestId, arg, payload, meta) {
    return {
      payload,
      error: (options && options.serializeError || miniSerializeError)(error || "Rejected"),
      meta: __spreadProps(__spreadValues({}, meta || {}), {
        arg,
        requestId,
        rejectedWithValue: !!payload,
        requestStatus: "rejected",
        aborted: (error == null ? void 0 : error.name) === "AbortError",
        condition: (error == null ? void 0 : error.name) === "ConditionError"
      })
    };
  });
  var AC = typeof AbortController !== "undefined" ? AbortController : function() {
    function class_1() {
      this.signal = {
        aborted: false,
        addEventListener: function() {
        },
        dispatchEvent: function() {
          return false;
        },
        onabort: function() {
        },
        removeEventListener: function() {
        }
      };
    }
    class_1.prototype.abort = function() {
    };
    return class_1;
  }();
  function actionCreator(arg) {
    return function(dispatch, getState, extra) {
      var _a;
      var requestId = ((_a = options == null ? void 0 : options.idGenerator) != null ? _a : nanoid)();
      var abortController = new AC();
      var abortReason;
      var abortedPromise = new Promise(function(_2, reject) {
        return abortController.signal.addEventListener("abort", function() {
          return reject({ name: "AbortError", message: abortReason || "Aborted" });
        });
      });
      var started = false;
      function abort(reason) {
        if (started) {
          abortReason = reason;
          abortController.abort();
        }
      }
      var promise = function() {
        return __async(this, null, function() {
          var _a2, finalAction, err_1, skipDispatch;
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                _b.trys.push([0, 2, , 3]);
                if (options && options.condition && options.condition(arg, { getState, extra }) === false) {
                  throw {
                    name: "ConditionError",
                    message: "Aborted due to condition callback returning false."
                  };
                }
                started = true;
                dispatch(pending(requestId, arg, (_a2 = options == null ? void 0 : options.getPendingMeta) == null ? void 0 : _a2.call(options, { requestId, arg }, { getState, extra })));
                return [4, Promise.race([
                  abortedPromise,
                  Promise.resolve(payloadCreator(arg, {
                    dispatch,
                    getState,
                    extra,
                    requestId,
                    signal: abortController.signal,
                    rejectWithValue: function(value, meta) {
                      return new RejectWithValue(value, meta);
                    },
                    fulfillWithValue: function(value, meta) {
                      return new FulfillWithMeta(value, meta);
                    }
                  })).then(function(result) {
                    if (result instanceof RejectWithValue) {
                      throw result;
                    }
                    if (result instanceof FulfillWithMeta) {
                      return fulfilled(result.payload, requestId, arg, result.meta);
                    }
                    return fulfilled(result, requestId, arg);
                  })
                ])];
              case 1:
                finalAction = _b.sent();
                return [3, 3];
              case 2:
                err_1 = _b.sent();
                finalAction = err_1 instanceof RejectWithValue ? rejected(null, requestId, arg, err_1.payload, err_1.meta) : rejected(err_1, requestId, arg);
                return [3, 3];
              case 3:
                skipDispatch = options && !options.dispatchConditionRejection && rejected.match(finalAction) && finalAction.meta.condition;
                if (!skipDispatch) {
                  dispatch(finalAction);
                }
                return [2, finalAction];
            }
          });
        });
      }();
      return Object.assign(promise, {
        abort,
        requestId,
        arg,
        unwrap: function() {
          return promise.then(unwrapResult);
        }
      });
    };
  }
  return Object.assign(actionCreator, {
    pending,
    rejected,
    fulfilled,
    typePrefix
  });
}
function unwrapResult(action) {
  if (action.meta && action.meta.rejectedWithValue) {
    throw action.payload;
  }
  if (action.error) {
    throw action.error;
  }
  return action.payload;
}
N();
function isStringOrNumber(value) {
  return typeof value === "string" || typeof value === "number";
}
var FlatObjectCache = /* @__PURE__ */ function() {
  function FlatObjectCache2() {
    this._cache = {};
  }
  var _proto = FlatObjectCache2.prototype;
  _proto.set = function set(key, selectorFn) {
    this._cache[key] = selectorFn;
  };
  _proto.get = function get(key) {
    return this._cache[key];
  };
  _proto.remove = function remove(key) {
    delete this._cache[key];
  };
  _proto.clear = function clear() {
    this._cache = {};
  };
  _proto.isValidCacheKey = function isValidCacheKey(cacheKey) {
    return isStringOrNumber(cacheKey);
  };
  return FlatObjectCache2;
}();
var defaultCacheCreator = FlatObjectCache;
var defaultCacheKeyValidator = function defaultCacheKeyValidator2() {
  return true;
};
function createCachedSelector() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }
  return function(polymorphicOptions, legacyOptions) {
    if (legacyOptions) {
      throw new Error('[re-reselect] "options" as second argument is not supported anymore. Please provide an option object as single argument.');
    }
    var options = typeof polymorphicOptions === "function" ? {
      keySelector: polymorphicOptions
    } : Object.assign({}, polymorphicOptions);
    var recomputations = 0;
    var resultFunc = funcs.pop();
    var dependencies = Array.isArray(funcs[0]) ? funcs[0] : [].concat(funcs);
    var resultFuncWithRecomputations = function resultFuncWithRecomputations2() {
      recomputations++;
      return resultFunc.apply(void 0, arguments);
    };
    funcs.push(resultFuncWithRecomputations);
    var cache2 = options.cacheObject || new defaultCacheCreator();
    var selectorCreator = options.selectorCreator || createSelector;
    var isValidCacheKey = cache2.isValidCacheKey || defaultCacheKeyValidator;
    if (options.keySelectorCreator) {
      options.keySelector = options.keySelectorCreator({
        keySelector: options.keySelector,
        inputSelectors: dependencies,
        resultFunc
      });
    }
    var selector = function selector2() {
      var cacheKey = options.keySelector.apply(options, arguments);
      if (isValidCacheKey(cacheKey)) {
        var cacheResponse = cache2.get(cacheKey);
        if (cacheResponse === void 0) {
          cacheResponse = selectorCreator.apply(void 0, funcs);
          cache2.set(cacheKey, cacheResponse);
        }
        return cacheResponse.apply(void 0, arguments);
      }
      console.warn('[re-reselect] Invalid cache key "' + cacheKey + '" has been returned by keySelector function.');
      return void 0;
    };
    selector.getMatchingSelector = function() {
      var cacheKey = options.keySelector.apply(options, arguments);
      return cache2.get(cacheKey);
    };
    selector.removeMatchingSelector = function() {
      var cacheKey = options.keySelector.apply(options, arguments);
      cache2.remove(cacheKey);
    };
    selector.clearCache = function() {
      cache2.clear();
    };
    selector.resultFunc = resultFunc;
    selector.dependencies = dependencies;
    selector.cache = cache2;
    selector.recomputations = function() {
      return recomputations;
    };
    selector.resetRecomputations = function() {
      return recomputations = 0;
    };
    selector.keySelector = options.keySelector;
    return selector;
  };
}
var interopRequireDefault = { exports: {} };
(function(module) {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }
  module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(interopRequireDefault);
var ReactToastify = "";
var createRoot;
var m = reactDom.exports;
{
  createRoot = m.createRoot;
}
try {
  self["workbox:window:6.4.1"] && _();
} catch (n2) {
}
function n(n2, t2) {
  return new Promise(function(r2) {
    var e2 = new MessageChannel();
    e2.port1.onmessage = function(n3) {
      r2(n3.data);
    }, n2.postMessage(t2, [e2.port2]);
  });
}
function t(n2, t2) {
  for (var r2 = 0; r2 < t2.length; r2++) {
    var e2 = t2[r2];
    e2.enumerable = e2.enumerable || false, e2.configurable = true, "value" in e2 && (e2.writable = true), Object.defineProperty(n2, e2.key, e2);
  }
}
function r(n2, t2) {
  (t2 == null || t2 > n2.length) && (t2 = n2.length);
  for (var r2 = 0, e2 = new Array(t2); r2 < t2; r2++)
    e2[r2] = n2[r2];
  return e2;
}
function e(n2, t2) {
  var e2;
  if (typeof Symbol == "undefined" || n2[Symbol.iterator] == null) {
    if (Array.isArray(n2) || (e2 = function(n3, t3) {
      if (n3) {
        if (typeof n3 == "string")
          return r(n3, t3);
        var e3 = Object.prototype.toString.call(n3).slice(8, -1);
        return e3 === "Object" && n3.constructor && (e3 = n3.constructor.name), e3 === "Map" || e3 === "Set" ? Array.from(n3) : e3 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e3) ? r(n3, t3) : void 0;
      }
    }(n2)) || t2 && n2 && typeof n2.length == "number") {
      e2 && (n2 = e2);
      var i2 = 0;
      return function() {
        return i2 >= n2.length ? { done: true } : { done: false, value: n2[i2++] };
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  return (e2 = n2[Symbol.iterator]()).next.bind(e2);
}
try {
  self["workbox:core:6.4.1"] && _();
} catch (n2) {
}
var i = function() {
  var n2 = this;
  this.promise = new Promise(function(t2, r2) {
    n2.resolve = t2, n2.reject = r2;
  });
};
function o(n2, t2) {
  var r2 = location.href;
  return new URL(n2, r2).href === new URL(t2, r2).href;
}
var u = function(n2, t2) {
  this.type = n2, Object.assign(this, t2);
};
function a(n2, t2, r2) {
  return r2 ? t2 ? t2(n2) : n2 : (n2 && n2.then || (n2 = Promise.resolve(n2)), t2 ? n2.then(t2) : n2);
}
function c() {
}
var f = { type: "SKIP_WAITING" };
function s(n2, t2) {
  if (!t2)
    return n2 && n2.then ? n2.then(c) : Promise.resolve();
}
var v = function(r2) {
  var e2, c2;
  function v2(n2, t2) {
    var e3, c3;
    return t2 === void 0 && (t2 = {}), (e3 = r2.call(this) || this).nn = {}, e3.tn = 0, e3.rn = new i(), e3.en = new i(), e3.on = new i(), e3.un = 0, e3.an = /* @__PURE__ */ new Set(), e3.cn = function() {
      var n3 = e3.fn, t3 = n3.installing;
      e3.tn > 0 || !o(t3.scriptURL, e3.sn.toString()) || performance.now() > e3.un + 6e4 ? (e3.vn = t3, n3.removeEventListener("updatefound", e3.cn)) : (e3.hn = t3, e3.an.add(t3), e3.rn.resolve(t3)), ++e3.tn, t3.addEventListener("statechange", e3.ln);
    }, e3.ln = function(n3) {
      var t3 = e3.fn, r3 = n3.target, i2 = r3.state, o2 = r3 === e3.vn, a2 = { sw: r3, isExternal: o2, originalEvent: n3 };
      !o2 && e3.mn && (a2.isUpdate = true), e3.dispatchEvent(new u(i2, a2)), i2 === "installed" ? e3.wn = self.setTimeout(function() {
        i2 === "installed" && t3.waiting === r3 && e3.dispatchEvent(new u("waiting", a2));
      }, 200) : i2 === "activating" && (clearTimeout(e3.wn), o2 || e3.en.resolve(r3));
    }, e3.dn = function(n3) {
      var t3 = e3.hn, r3 = t3 !== navigator.serviceWorker.controller;
      e3.dispatchEvent(new u("controlling", { isExternal: r3, originalEvent: n3, sw: t3, isUpdate: e3.mn })), r3 || e3.on.resolve(t3);
    }, e3.gn = (c3 = function(n3) {
      var t3 = n3.data, r3 = n3.ports, i2 = n3.source;
      return a(e3.getSW(), function() {
        e3.an.has(i2) && e3.dispatchEvent(new u("message", { data: t3, originalEvent: n3, ports: r3, sw: i2 }));
      });
    }, function() {
      for (var n3 = [], t3 = 0; t3 < arguments.length; t3++)
        n3[t3] = arguments[t3];
      try {
        return Promise.resolve(c3.apply(this, n3));
      } catch (n4) {
        return Promise.reject(n4);
      }
    }), e3.sn = n2, e3.nn = t2, navigator.serviceWorker.addEventListener("message", e3.gn), e3;
  }
  c2 = r2, (e2 = v2).prototype = Object.create(c2.prototype), e2.prototype.constructor = e2, e2.__proto__ = c2;
  var h2, l2, w2 = v2.prototype;
  return w2.register = function(n2) {
    var t2 = (n2 === void 0 ? {} : n2).immediate, r3 = t2 !== void 0 && t2;
    try {
      var e3 = this;
      return function(n3, t3) {
        var r4 = n3();
        if (r4 && r4.then)
          return r4.then(t3);
        return t3(r4);
      }(function() {
        if (!r3 && document.readyState !== "complete")
          return s(new Promise(function(n3) {
            return window.addEventListener("load", n3);
          }));
      }, function() {
        return e3.mn = Boolean(navigator.serviceWorker.controller), e3.yn = e3.pn(), a(e3.bn(), function(n3) {
          e3.fn = n3, e3.yn && (e3.hn = e3.yn, e3.en.resolve(e3.yn), e3.on.resolve(e3.yn), e3.yn.addEventListener("statechange", e3.ln, { once: true }));
          var t3 = e3.fn.waiting;
          return t3 && o(t3.scriptURL, e3.sn.toString()) && (e3.hn = t3, Promise.resolve().then(function() {
            e3.dispatchEvent(new u("waiting", { sw: t3, wasWaitingBeforeRegister: true }));
          }).then(function() {
          })), e3.hn && (e3.rn.resolve(e3.hn), e3.an.add(e3.hn)), e3.fn.addEventListener("updatefound", e3.cn), navigator.serviceWorker.addEventListener("controllerchange", e3.dn), e3.fn;
        });
      });
    } catch (n3) {
      return Promise.reject(n3);
    }
  }, w2.update = function() {
    try {
      return this.fn ? s(this.fn.update()) : void 0;
    } catch (n2) {
      return Promise.reject(n2);
    }
  }, w2.getSW = function() {
    return this.hn !== void 0 ? Promise.resolve(this.hn) : this.rn.promise;
  }, w2.messageSW = function(t2) {
    try {
      return a(this.getSW(), function(r3) {
        return n(r3, t2);
      });
    } catch (n2) {
      return Promise.reject(n2);
    }
  }, w2.messageSkipWaiting = function() {
    this.fn && this.fn.waiting && n(this.fn.waiting, f);
  }, w2.pn = function() {
    var n2 = navigator.serviceWorker.controller;
    return n2 && o(n2.scriptURL, this.sn.toString()) ? n2 : void 0;
  }, w2.bn = function() {
    try {
      var n2 = this;
      return function(n3, t2) {
        try {
          var r3 = n3();
        } catch (n4) {
          return t2(n4);
        }
        if (r3 && r3.then)
          return r3.then(void 0, t2);
        return r3;
      }(function() {
        return a(navigator.serviceWorker.register(n2.sn, n2.nn), function(t2) {
          return n2.un = performance.now(), t2;
        });
      }, function(n3) {
        throw n3;
      });
    } catch (n3) {
      return Promise.reject(n3);
    }
  }, h2 = v2, (l2 = [{ key: "active", get: function() {
    return this.en.promise;
  } }, { key: "controlling", get: function() {
    return this.on.promise;
  } }]) && t(h2.prototype, l2), v2;
}(function() {
  function n2() {
    this.Pn = /* @__PURE__ */ new Map();
  }
  var t2 = n2.prototype;
  return t2.addEventListener = function(n3, t3) {
    this.Sn(n3).add(t3);
  }, t2.removeEventListener = function(n3, t3) {
    this.Sn(n3).delete(t3);
  }, t2.dispatchEvent = function(n3) {
    n3.target = this;
    for (var t3, r2 = e(this.Sn(n3.type)); !(t3 = r2()).done; ) {
      (0, t3.value)(n3);
    }
  }, t2.Sn = function(n3) {
    return this.Pn.has(n3) || this.Pn.set(n3, /* @__PURE__ */ new Set()), this.Pn.get(n3);
  }, n2;
}());
export { createCachedSelector as A, createSlice as B, createAsyncThunk as C, configureStore as D, useSelector as E, useDispatch as F, Global as G, ToastContainer as H, createRoot as I, v as J, n as K, Provider as P, React$1 as R, ThemeContext as T, _extends$1 as _, _objectWithoutPropertiesLoose$1 as a, reactDom as b, cx as c, createPopper as d, emStyled as e, TransitionGroup$1 as f, Transition$1 as g, getAugmentedNamespace as h, interopRequireDefault as i, jsxRuntime as j, keyframes as k, _createClass as l, _inherits as m, _getPrototypeOf as n, _possibleConstructorReturn as o, _classCallCheck as p, _assertThisInitialized as q, react as r, _typeof as s, _defineProperty as t, _toArray as u, React as v, _slicedToArray as w, tssReact as x, toast as y, createSelector as z };
