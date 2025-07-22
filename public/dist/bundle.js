// node_modules/preact/dist/preact.module.js
var n;
var l;
var u;
var t;
var i;
var r;
var o;
var e;
var f;
var c;
var s;
var a;
var h;
var p = {};
var v = [];
var y = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
var w = Array.isArray;
function d(n2, l2) {
  for (var u3 in l2) n2[u3] = l2[u3];
  return n2;
}
function g(n2) {
  n2 && n2.parentNode && n2.parentNode.removeChild(n2);
}
function _(l2, u3, t2) {
  var i3, r2, o2, e2 = {};
  for (o2 in u3) "key" == o2 ? i3 = u3[o2] : "ref" == o2 ? r2 = u3[o2] : e2[o2] = u3[o2];
  if (arguments.length > 2 && (e2.children = arguments.length > 3 ? n.call(arguments, 2) : t2), "function" == typeof l2 && null != l2.defaultProps) for (o2 in l2.defaultProps) void 0 === e2[o2] && (e2[o2] = l2.defaultProps[o2]);
  return m(l2, e2, i3, r2, null);
}
function m(n2, t2, i3, r2, o2) {
  var e2 = { type: n2, props: t2, key: i3, ref: r2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o2 ? ++u : o2, __i: -1, __u: 0 };
  return null == o2 && null != l.vnode && l.vnode(e2), e2;
}
function k(n2) {
  return n2.children;
}
function x(n2, l2) {
  this.props = n2, this.context = l2;
}
function S(n2, l2) {
  if (null == l2) return n2.__ ? S(n2.__, n2.__i + 1) : null;
  for (var u3; l2 < n2.__k.length; l2++) if (null != (u3 = n2.__k[l2]) && null != u3.__e) return u3.__e;
  return "function" == typeof n2.type ? S(n2) : null;
}
function C(n2) {
  var l2, u3;
  if (null != (n2 = n2.__) && null != n2.__c) {
    for (n2.__e = n2.__c.base = null, l2 = 0; l2 < n2.__k.length; l2++) if (null != (u3 = n2.__k[l2]) && null != u3.__e) {
      n2.__e = n2.__c.base = u3.__e;
      break;
    }
    return C(n2);
  }
}
function M(n2) {
  (!n2.__d && (n2.__d = true) && i.push(n2) && !$.__r++ || r != l.debounceRendering) && ((r = l.debounceRendering) || o)($);
}
function $() {
  for (var n2, u3, t2, r2, o2, f3, c2, s2 = 1; i.length; ) i.length > s2 && i.sort(e), n2 = i.shift(), s2 = i.length, n2.__d && (t2 = void 0, o2 = (r2 = (u3 = n2).__v).__e, f3 = [], c2 = [], u3.__P && ((t2 = d({}, r2)).__v = r2.__v + 1, l.vnode && l.vnode(t2), O(u3.__P, t2, r2, u3.__n, u3.__P.namespaceURI, 32 & r2.__u ? [o2] : null, f3, null == o2 ? S(r2) : o2, !!(32 & r2.__u), c2), t2.__v = r2.__v, t2.__.__k[t2.__i] = t2, z(f3, t2, c2), t2.__e != o2 && C(t2)));
  $.__r = 0;
}
function I(n2, l2, u3, t2, i3, r2, o2, e2, f3, c2, s2) {
  var a2, h4, y2, w2, d2, g2, _2 = t2 && t2.__k || v, m2 = l2.length;
  for (f3 = P(u3, l2, _2, f3, m2), a2 = 0; a2 < m2; a2++) null != (y2 = u3.__k[a2]) && (h4 = -1 == y2.__i ? p : _2[y2.__i] || p, y2.__i = a2, g2 = O(n2, y2, h4, i3, r2, o2, e2, f3, c2, s2), w2 = y2.__e, y2.ref && h4.ref != y2.ref && (h4.ref && q(h4.ref, null, y2), s2.push(y2.ref, y2.__c || w2, y2)), null == d2 && null != w2 && (d2 = w2), 4 & y2.__u || h4.__k === y2.__k ? f3 = A(y2, f3, n2) : "function" == typeof y2.type && void 0 !== g2 ? f3 = g2 : w2 && (f3 = w2.nextSibling), y2.__u &= -7);
  return u3.__e = d2, f3;
}
function P(n2, l2, u3, t2, i3) {
  var r2, o2, e2, f3, c2, s2 = u3.length, a2 = s2, h4 = 0;
  for (n2.__k = new Array(i3), r2 = 0; r2 < i3; r2++) null != (o2 = l2[r2]) && "boolean" != typeof o2 && "function" != typeof o2 ? (f3 = r2 + h4, (o2 = n2.__k[r2] = "string" == typeof o2 || "number" == typeof o2 || "bigint" == typeof o2 || o2.constructor == String ? m(null, o2, null, null, null) : w(o2) ? m(k, { children: o2 }, null, null, null) : null == o2.constructor && o2.__b > 0 ? m(o2.type, o2.props, o2.key, o2.ref ? o2.ref : null, o2.__v) : o2).__ = n2, o2.__b = n2.__b + 1, e2 = null, -1 != (c2 = o2.__i = L(o2, u3, f3, a2)) && (a2--, (e2 = u3[c2]) && (e2.__u |= 2)), null == e2 || null == e2.__v ? (-1 == c2 && (i3 > s2 ? h4-- : i3 < s2 && h4++), "function" != typeof o2.type && (o2.__u |= 4)) : c2 != f3 && (c2 == f3 - 1 ? h4-- : c2 == f3 + 1 ? h4++ : (c2 > f3 ? h4-- : h4++, o2.__u |= 4))) : n2.__k[r2] = null;
  if (a2) for (r2 = 0; r2 < s2; r2++) null != (e2 = u3[r2]) && 0 == (2 & e2.__u) && (e2.__e == t2 && (t2 = S(e2)), B(e2, e2));
  return t2;
}
function A(n2, l2, u3) {
  var t2, i3;
  if ("function" == typeof n2.type) {
    for (t2 = n2.__k, i3 = 0; t2 && i3 < t2.length; i3++) t2[i3] && (t2[i3].__ = n2, l2 = A(t2[i3], l2, u3));
    return l2;
  }
  n2.__e != l2 && (l2 && n2.type && !u3.contains(l2) && (l2 = S(n2)), u3.insertBefore(n2.__e, l2 || null), l2 = n2.__e);
  do {
    l2 = l2 && l2.nextSibling;
  } while (null != l2 && 8 == l2.nodeType);
  return l2;
}
function L(n2, l2, u3, t2) {
  var i3, r2, o2 = n2.key, e2 = n2.type, f3 = l2[u3];
  if (null === f3 && null == n2.key || f3 && o2 == f3.key && e2 == f3.type && 0 == (2 & f3.__u)) return u3;
  if (t2 > (null != f3 && 0 == (2 & f3.__u) ? 1 : 0)) for (i3 = u3 - 1, r2 = u3 + 1; i3 >= 0 || r2 < l2.length; ) {
    if (i3 >= 0) {
      if ((f3 = l2[i3]) && 0 == (2 & f3.__u) && o2 == f3.key && e2 == f3.type) return i3;
      i3--;
    }
    if (r2 < l2.length) {
      if ((f3 = l2[r2]) && 0 == (2 & f3.__u) && o2 == f3.key && e2 == f3.type) return r2;
      r2++;
    }
  }
  return -1;
}
function T(n2, l2, u3) {
  "-" == l2[0] ? n2.setProperty(l2, null == u3 ? "" : u3) : n2[l2] = null == u3 ? "" : "number" != typeof u3 || y.test(l2) ? u3 : u3 + "px";
}
function j(n2, l2, u3, t2, i3) {
  var r2, o2;
  n: if ("style" == l2) if ("string" == typeof u3) n2.style.cssText = u3;
  else {
    if ("string" == typeof t2 && (n2.style.cssText = t2 = ""), t2) for (l2 in t2) u3 && l2 in u3 || T(n2.style, l2, "");
    if (u3) for (l2 in u3) t2 && u3[l2] == t2[l2] || T(n2.style, l2, u3[l2]);
  }
  else if ("o" == l2[0] && "n" == l2[1]) r2 = l2 != (l2 = l2.replace(f, "$1")), o2 = l2.toLowerCase(), l2 = o2 in n2 || "onFocusOut" == l2 || "onFocusIn" == l2 ? o2.slice(2) : l2.slice(2), n2.l || (n2.l = {}), n2.l[l2 + r2] = u3, u3 ? t2 ? u3.u = t2.u : (u3.u = c, n2.addEventListener(l2, r2 ? a : s, r2)) : n2.removeEventListener(l2, r2 ? a : s, r2);
  else {
    if ("http://www.w3.org/2000/svg" == i3) l2 = l2.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if ("width" != l2 && "height" != l2 && "href" != l2 && "list" != l2 && "form" != l2 && "tabIndex" != l2 && "download" != l2 && "rowSpan" != l2 && "colSpan" != l2 && "role" != l2 && "popover" != l2 && l2 in n2) try {
      n2[l2] = null == u3 ? "" : u3;
      break n;
    } catch (n3) {
    }
    "function" == typeof u3 || (null == u3 || false === u3 && "-" != l2[4] ? n2.removeAttribute(l2) : n2.setAttribute(l2, "popover" == l2 && 1 == u3 ? "" : u3));
  }
}
function F(n2) {
  return function(u3) {
    if (this.l) {
      var t2 = this.l[u3.type + n2];
      if (null == u3.t) u3.t = c++;
      else if (u3.t < t2.u) return;
      return t2(l.event ? l.event(u3) : u3);
    }
  };
}
function O(n2, u3, t2, i3, r2, o2, e2, f3, c2, s2) {
  var a2, h4, p2, v2, y2, _2, m2, b, S2, C2, M2, $2, P2, A2, H, L2, T2, j2 = u3.type;
  if (null != u3.constructor) return null;
  128 & t2.__u && (c2 = !!(32 & t2.__u), o2 = [f3 = u3.__e = t2.__e]), (a2 = l.__b) && a2(u3);
  n: if ("function" == typeof j2) try {
    if (b = u3.props, S2 = "prototype" in j2 && j2.prototype.render, C2 = (a2 = j2.contextType) && i3[a2.__c], M2 = a2 ? C2 ? C2.props.value : a2.__ : i3, t2.__c ? m2 = (h4 = u3.__c = t2.__c).__ = h4.__E : (S2 ? u3.__c = h4 = new j2(b, M2) : (u3.__c = h4 = new x(b, M2), h4.constructor = j2, h4.render = D), C2 && C2.sub(h4), h4.props = b, h4.state || (h4.state = {}), h4.context = M2, h4.__n = i3, p2 = h4.__d = true, h4.__h = [], h4._sb = []), S2 && null == h4.__s && (h4.__s = h4.state), S2 && null != j2.getDerivedStateFromProps && (h4.__s == h4.state && (h4.__s = d({}, h4.__s)), d(h4.__s, j2.getDerivedStateFromProps(b, h4.__s))), v2 = h4.props, y2 = h4.state, h4.__v = u3, p2) S2 && null == j2.getDerivedStateFromProps && null != h4.componentWillMount && h4.componentWillMount(), S2 && null != h4.componentDidMount && h4.__h.push(h4.componentDidMount);
    else {
      if (S2 && null == j2.getDerivedStateFromProps && b !== v2 && null != h4.componentWillReceiveProps && h4.componentWillReceiveProps(b, M2), !h4.__e && null != h4.shouldComponentUpdate && false === h4.shouldComponentUpdate(b, h4.__s, M2) || u3.__v == t2.__v) {
        for (u3.__v != t2.__v && (h4.props = b, h4.state = h4.__s, h4.__d = false), u3.__e = t2.__e, u3.__k = t2.__k, u3.__k.some(function(n3) {
          n3 && (n3.__ = u3);
        }), $2 = 0; $2 < h4._sb.length; $2++) h4.__h.push(h4._sb[$2]);
        h4._sb = [], h4.__h.length && e2.push(h4);
        break n;
      }
      null != h4.componentWillUpdate && h4.componentWillUpdate(b, h4.__s, M2), S2 && null != h4.componentDidUpdate && h4.__h.push(function() {
        h4.componentDidUpdate(v2, y2, _2);
      });
    }
    if (h4.context = M2, h4.props = b, h4.__P = n2, h4.__e = false, P2 = l.__r, A2 = 0, S2) {
      for (h4.state = h4.__s, h4.__d = false, P2 && P2(u3), a2 = h4.render(h4.props, h4.state, h4.context), H = 0; H < h4._sb.length; H++) h4.__h.push(h4._sb[H]);
      h4._sb = [];
    } else do {
      h4.__d = false, P2 && P2(u3), a2 = h4.render(h4.props, h4.state, h4.context), h4.state = h4.__s;
    } while (h4.__d && ++A2 < 25);
    h4.state = h4.__s, null != h4.getChildContext && (i3 = d(d({}, i3), h4.getChildContext())), S2 && !p2 && null != h4.getSnapshotBeforeUpdate && (_2 = h4.getSnapshotBeforeUpdate(v2, y2)), L2 = a2, null != a2 && a2.type === k && null == a2.key && (L2 = N(a2.props.children)), f3 = I(n2, w(L2) ? L2 : [L2], u3, t2, i3, r2, o2, e2, f3, c2, s2), h4.base = u3.__e, u3.__u &= -161, h4.__h.length && e2.push(h4), m2 && (h4.__E = h4.__ = null);
  } catch (n3) {
    if (u3.__v = null, c2 || null != o2) if (n3.then) {
      for (u3.__u |= c2 ? 160 : 128; f3 && 8 == f3.nodeType && f3.nextSibling; ) f3 = f3.nextSibling;
      o2[o2.indexOf(f3)] = null, u3.__e = f3;
    } else for (T2 = o2.length; T2--; ) g(o2[T2]);
    else u3.__e = t2.__e, u3.__k = t2.__k;
    l.__e(n3, u3, t2);
  }
  else null == o2 && u3.__v == t2.__v ? (u3.__k = t2.__k, u3.__e = t2.__e) : f3 = u3.__e = V(t2.__e, u3, t2, i3, r2, o2, e2, c2, s2);
  return (a2 = l.diffed) && a2(u3), 128 & u3.__u ? void 0 : f3;
}
function z(n2, u3, t2) {
  for (var i3 = 0; i3 < t2.length; i3++) q(t2[i3], t2[++i3], t2[++i3]);
  l.__c && l.__c(u3, n2), n2.some(function(u4) {
    try {
      n2 = u4.__h, u4.__h = [], n2.some(function(n3) {
        n3.call(u4);
      });
    } catch (n3) {
      l.__e(n3, u4.__v);
    }
  });
}
function N(n2) {
  return "object" != typeof n2 || null == n2 || n2.__b && n2.__b > 0 ? n2 : w(n2) ? n2.map(N) : d({}, n2);
}
function V(u3, t2, i3, r2, o2, e2, f3, c2, s2) {
  var a2, h4, v2, y2, d2, _2, m2, b = i3.props, k2 = t2.props, x2 = t2.type;
  if ("svg" == x2 ? o2 = "http://www.w3.org/2000/svg" : "math" == x2 ? o2 = "http://www.w3.org/1998/Math/MathML" : o2 || (o2 = "http://www.w3.org/1999/xhtml"), null != e2) {
    for (a2 = 0; a2 < e2.length; a2++) if ((d2 = e2[a2]) && "setAttribute" in d2 == !!x2 && (x2 ? d2.localName == x2 : 3 == d2.nodeType)) {
      u3 = d2, e2[a2] = null;
      break;
    }
  }
  if (null == u3) {
    if (null == x2) return document.createTextNode(k2);
    u3 = document.createElementNS(o2, x2, k2.is && k2), c2 && (l.__m && l.__m(t2, e2), c2 = false), e2 = null;
  }
  if (null == x2) b === k2 || c2 && u3.data == k2 || (u3.data = k2);
  else {
    if (e2 = e2 && n.call(u3.childNodes), b = i3.props || p, !c2 && null != e2) for (b = {}, a2 = 0; a2 < u3.attributes.length; a2++) b[(d2 = u3.attributes[a2]).name] = d2.value;
    for (a2 in b) if (d2 = b[a2], "children" == a2) ;
    else if ("dangerouslySetInnerHTML" == a2) v2 = d2;
    else if (!(a2 in k2)) {
      if ("value" == a2 && "defaultValue" in k2 || "checked" == a2 && "defaultChecked" in k2) continue;
      j(u3, a2, null, d2, o2);
    }
    for (a2 in k2) d2 = k2[a2], "children" == a2 ? y2 = d2 : "dangerouslySetInnerHTML" == a2 ? h4 = d2 : "value" == a2 ? _2 = d2 : "checked" == a2 ? m2 = d2 : c2 && "function" != typeof d2 || b[a2] === d2 || j(u3, a2, d2, b[a2], o2);
    if (h4) c2 || v2 && (h4.__html == v2.__html || h4.__html == u3.innerHTML) || (u3.innerHTML = h4.__html), t2.__k = [];
    else if (v2 && (u3.innerHTML = ""), I("template" == t2.type ? u3.content : u3, w(y2) ? y2 : [y2], t2, i3, r2, "foreignObject" == x2 ? "http://www.w3.org/1999/xhtml" : o2, e2, f3, e2 ? e2[0] : i3.__k && S(i3, 0), c2, s2), null != e2) for (a2 = e2.length; a2--; ) g(e2[a2]);
    c2 || (a2 = "value", "progress" == x2 && null == _2 ? u3.removeAttribute("value") : null != _2 && (_2 !== u3[a2] || "progress" == x2 && !_2 || "option" == x2 && _2 != b[a2]) && j(u3, a2, _2, b[a2], o2), a2 = "checked", null != m2 && m2 != u3[a2] && j(u3, a2, m2, b[a2], o2));
  }
  return u3;
}
function q(n2, u3, t2) {
  try {
    if ("function" == typeof n2) {
      var i3 = "function" == typeof n2.__u;
      i3 && n2.__u(), i3 && null == u3 || (n2.__u = n2(u3));
    } else n2.current = u3;
  } catch (n3) {
    l.__e(n3, t2);
  }
}
function B(n2, u3, t2) {
  var i3, r2;
  if (l.unmount && l.unmount(n2), (i3 = n2.ref) && (i3.current && i3.current != n2.__e || q(i3, null, u3)), null != (i3 = n2.__c)) {
    if (i3.componentWillUnmount) try {
      i3.componentWillUnmount();
    } catch (n3) {
      l.__e(n3, u3);
    }
    i3.base = i3.__P = null;
  }
  if (i3 = n2.__k) for (r2 = 0; r2 < i3.length; r2++) i3[r2] && B(i3[r2], u3, t2 || "function" != typeof n2.type);
  t2 || g(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
}
function D(n2, l2, u3) {
  return this.constructor(n2, u3);
}
function E(u3, t2, i3) {
  var r2, o2, e2, f3;
  t2 == document && (t2 = document.documentElement), l.__ && l.__(u3, t2), o2 = (r2 = "function" == typeof i3) ? null : i3 && i3.__k || t2.__k, e2 = [], f3 = [], O(t2, u3 = (!r2 && i3 || t2).__k = _(k, null, [u3]), o2 || p, p, t2.namespaceURI, !r2 && i3 ? [i3] : o2 ? null : t2.firstChild ? n.call(t2.childNodes) : null, e2, !r2 && i3 ? i3 : o2 ? o2.__e : t2.firstChild, r2, f3), z(e2, u3, f3);
}
n = v.slice, l = { __e: function(n2, l2, u3, t2) {
  for (var i3, r2, o2; l2 = l2.__; ) if ((i3 = l2.__c) && !i3.__) try {
    if ((r2 = i3.constructor) && null != r2.getDerivedStateFromError && (i3.setState(r2.getDerivedStateFromError(n2)), o2 = i3.__d), null != i3.componentDidCatch && (i3.componentDidCatch(n2, t2 || {}), o2 = i3.__d), o2) return i3.__E = i3;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, u = 0, t = function(n2) {
  return null != n2 && null == n2.constructor;
}, x.prototype.setState = function(n2, l2) {
  var u3;
  u3 = null != this.__s && this.__s != this.state ? this.__s : this.__s = d({}, this.state), "function" == typeof n2 && (n2 = n2(d({}, u3), this.props)), n2 && d(u3, n2), null != n2 && this.__v && (l2 && this._sb.push(l2), M(this));
}, x.prototype.forceUpdate = function(n2) {
  this.__v && (this.__e = true, n2 && this.__h.push(n2), M(this));
}, x.prototype.render = k, i = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n2, l2) {
  return n2.__v.__b - l2.__v.__b;
}, $.__r = 0, f = /(PointerCapture)$|Capture$/i, c = 0, s = F(false), a = F(true), h = 0;

// src/proxy.ts
var isIP = (address) => /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(address);
var isDomain = (name) => /localhost/.test(name) || /^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/.test(
  name
);
var isLocalHost = (name) => /\w+/.test(name);
var isProxy = (proxy) => /^SOCKS/.test(proxy);
var removeComment = (str) => str.replace(/#.+/gm, "");
var splitLines = (content) => {
  return removeComment(content).split("\n").filter((line) => line.trim() !== "").map((line) => line.trim().split(/\s/)).map((hosts) => {
    return hosts.filter((host) => {
      return host.trim() !== "";
    });
  });
};
var getHosts = (lines) => {
  return lines.filter(
    (host) => isIP(
      host[0].indexOf(":") > 0 ? host[0].substr(0, host[0].indexOf(":")) : host[0]
    )
  );
};
var getProxies = (lines) => {
  return lines.filter((proxy) => isProxy(proxy[0]));
};
var parseRules = (content) => {
  const lines = splitLines(content);
  const hosts = getHosts(lines);
  const proxies = getProxies(lines);
  let results = [];
  hosts.forEach(([ip, ...hosts2]) => {
    hosts2.forEach((host) => {
      results.push([host, ip]);
    });
  });
  const hostContent = results.map(([host, address]) => {
    return `      if (host == "${host}") return "PROXY ${address}; DIRECT";`;
  }).join("\n");
  const getProxyContent = (arr) => {
    let method = arr.slice();
    let address = method.shift();
    let result = "";
    method.forEach((add) => {
      result += `${address} ${add}; `;
    });
    return result;
  };
  let proxyContent = proxies.reduce(
    (sum, value) => sum += getProxyContent(value),
    ""
  );
  return { hostContent, proxyContent };
};
function setProxy(content) {
  let code = "\n";
  const result = parseRules(content);
  const defaultMethod = localStorage.getItem("AWESOME_HOST_otherProxies") || "DIRECT";
  let pacContent = `
  function FindProxyForURL(url, host) {
    if (shExpMatch(url, "http:*") || shExpMatch(url, "https:*")) {
${result.hostContent}
      return "${result.proxyContent ? result.proxyContent + " " + defaultMethod : defaultMethod}";
    }
    
    return "DIRECT";
  }`;
  console.log("proxy to:\n" + pacContent);
  if (typeof chrome.proxy === "undefined") return false;
  if (result.hostContent !== "" || result.proxyContent !== "") {
    clearProxy(function() {
      chrome.proxy.settings.set(
        {
          value: {
            mode: "pac_script",
            pacScript: {
              data: pacContent
            }
          },
          scope: "regular"
        },
        function() {
        }
      );
    });
  } else {
    clearProxy();
  }
}
function clearProxy(cb) {
  cb = cb || function() {
  };
  console.log("clear.");
  if (typeof chrome.proxy === "undefined") {
    console.log("chrome.proxy is not supported");
    return false;
  }
  chrome.proxy.settings.clear({ scope: "regular" }, cb);
}

// node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
var f2 = 0;
var i2 = Array.isArray;
function u2(e2, t2, n2, o2, i3, u3) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f2, __i: -1, __u: 0, __source: i3, __self: u3 };
  if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
  return l.vnode && l.vnode(l2), l2;
}

// src/Svg.tsx
function getHtmlByName(name) {
  switch (name) {
    case "add":
      return '<svg width="16" height="16" viewBox="0 0 448 512" fill="currentColor"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>';
    case "trash":
      return '<svg width="16" height="16" viewBox="0 0 448 512" fill="currentColor"><path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>';
    case "on":
      return '<svg width="24" height="24" viewBox="0 0 576 512" fill="currentColor"><path d="M192 64C86 64 0 150 0 256S86 448 192 448l192 0c106 0 192-86 192-192s-86-192-192-192L192 64zm192 96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>';
    case "off":
      return '<svg width="24" height="24" viewBox="0 0 576 512" fill="currentColor"><path d="M384 128c70.7 0 128 57.3 128 128s-57.3 128-128 128l-192 0c-70.7 0-128-57.3-128-128s57.3-128 128-128l192 0zM576 256c0-106-86-192-192-192L192 64C86 64 0 150 0 256S86 448 192 448l192 0c106 0 192-86 192-192zM192 352a96 96 0 1 0 0-192 96 96 0 1 0 0 192z"/></svg>';
    case "save":
      return '<svg width="16" height="16" viewBox="0 0 448 512" fill="currentColor"><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l316 0c35.3 0 64-28.7 64-64l0-242.7c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32L64 32zm0 96c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32L96 224c-17.7 0-32-14.3-32-32l0-64zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>';
    case "setting":
      return '<svg width="16" height="16" viewBox="0 0 512 512" fill="currentColor"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg>';
    case "edit":
      return '<svg width="16" height="16" viewBox="0 0 512 512" fill="currentColor"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>';
    default:
      return "";
  }
}
function SvgIcon({ name, ...rest }) {
  const html = getHtmlByName(name);
  return /* @__PURE__ */ u2("span", { className: "icon", "data-name": name, ...rest, dangerouslySetInnerHTML: { __html: html } });
}

// src/uuid.ts
function isFunction(s2) {
  return typeof s2 === "function";
}
function isUndefined(s2) {
  return typeof s2 === "undefined";
}
function uuid_v4() {
  if (!isUndefined(window.crypto)) {
    if (isFunction(crypto.randomUUID)) {
      return crypto.randomUUID();
    }
    if (isFunction(crypto.getRandomValues)) {
      return "10000000-1000-4000-8000-100000000000".replace(
        /[018]/g,
        (c2) => (+c2 ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c2 / 4).toString(16)
      );
    }
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c2) {
    var r2 = Math.random() * 16 | 0, v2 = c2 === "x" ? r2 : r2 & 3 | 8;
    return v2.toString(16);
  });
}
function shortUuid() {
  return uuid_v4().substring(0, 8);
}

// src/App.tsx
var App = class extends x {
  constructor() {
    super();
    this.DB_PREFIX = "AWESOME_HOST_";
    this.inputRefs = {};
    this.textarea = null;
    this.onToggleEnableAll = () => {
      this.setState(
        (s2) => ({ enabled: !s2.enabled }),
        () => this.updateProxy()
      );
    };
    this.toggleEnable = (id) => {
      this.setState(
        (s2) => ({
          categories: s2.categories.map(
            (c2) => c2.id === id ? { ...c2, enabled: !c2.enabled } : c2
          )
        }),
        () => {
          this.setCurrentContent(this.state.selected);
          this.updateProxy();
        }
      );
    };
    this.editCategory = (id, name) => {
      this.setState((s2) => ({
        categories: s2.categories.map((c2) => c2.id === id ? { ...c2, name } : c2)
      }));
    };
    this.addCategory = (name) => {
      const id = shortUuid();
      this.setState((s2) => ({
        categories: [...s2.categories, { id, name, enabled: true }]
      }));
    };
    this.removeCategory = (id) => {
      if (!id) return this.notice("error", "\u8BF7\u9009\u62E9\u5206\u7EC4");
      const idx = this.state.categories.findIndex((c2) => c2.id === id);
      const targetIdx = idx + 1 === this.state.categories.length ? idx - 1 : Math.min(this.state.categories.length - 1, idx + 1);
      const selected = this.state.categories[targetIdx]?.id;
      this.setState(
        (s2) => ({
          categories: s2.categories.filter((c2) => c2.id !== id),
          hosts: s2.hosts.filter((h4) => h4.cid !== id),
          selected
        }),
        () => {
          this.updateProxy();
        }
      );
    };
    // host
    this.loadAllHost = (categories, hosts) => {
      const cMap = this.getCategoryMap(categories);
      let content = "";
      hosts.forEach((h4) => {
        if (cMap[h4.cid] && cMap[h4.cid].enabled) {
          content += `# ${cMap[h4.cid].name}
${h4.content}
`;
        }
      });
      this.setState({ selected: null, content });
      this.saveData("selected", null);
    };
    this.handleLoadHost = (id) => {
      this.setState({ selected: id, content: this.getHostContentById(id) });
      this.saveData("selected", id);
      setTimeout(() => {
        document.getElementById("textarea")?.focus();
      }, 100);
    };
    this.editHost = (content) => {
      if (content) {
        this.setState({ content });
      } else {
        console.warn("content is missing");
      }
    };
    this.handleSave = (e2) => {
      if (e2.altKey) {
        this.copyHost();
      } else {
        this.saveHost();
      }
    };
    this.saveHost = () => {
      const { selected, content, hosts } = this.state;
      if (!selected) return this.notice("\u8BF7\u5148\u9009\u62E9\u5206\u7EC4");
      const error = this.validate(content);
      if (error) return this.notice(error);
      let found = false;
      const newHosts = hosts.map((h4) => {
        if (h4.cid === selected) {
          found = true;
          return { ...h4, content };
        }
        return h4;
      });
      if (!found) newHosts.push({ cid: selected, content });
      this.setState({ hosts: newHosts }, () => this.updateProxy());
    };
    this.copyHost = () => {
      this.notice("Host content is copied.");
      this.copy(this.state.content);
    };
    this.state = {
      categories: [],
      hosts: [],
      enabled: true,
      selected: null,
      content: "",
      editing: "",
      notice: { type: "error", content: "", active: false }
    };
  }
  componentDidMount() {
    const categories = this.getData("categories") || [];
    const hosts = this.getData("hosts") || [];
    const enabled = this.getData("enabled");
    const selected = this.getData("selected");
    this.setState({ categories, hosts, enabled: enabled ?? true }, () => {
      if (hosts.length) {
        setTimeout(() => {
          if (selected) {
            this.handleLoadHost(selected);
          } else {
            this.loadAllHost(categories, hosts);
          }
        }, 300);
      }
    });
  }
  componentDidUpdate() {
    this.saveData("categories");
    this.saveData("hosts");
    this.saveData("enabled");
  }
  // storage
  saveData(key, value) {
    localStorage.setItem(
      `${this.DB_PREFIX}${key}`,
      value !== void 0 ? JSON.stringify(value) : JSON.stringify(this.state[key])
    );
  }
  getData(key) {
    const value = localStorage.getItem(`${this.DB_PREFIX}${key}`);
    try {
      return value ? JSON.parse(value) : null;
    } catch {
      return value;
    }
  }
  // category
  getCategoryMap(categories) {
    return categories.reduce((map, c2) => {
      map[c2.id] = { name: c2.name, enabled: c2.enabled };
      return map;
    }, {});
  }
  updateProxy() {
    setTimeout(() => {
      const content = this.getHostContent(this.state.hosts);
      if (this.state.enabled) setProxy(content);
      else clearProxy();
    }, 300);
  }
  getHostContent(hosts) {
    let result = "";
    const cMap = this.getCategoryMap(this.state.categories);
    hosts.filter((h4) => cMap[h4.cid] && cMap[h4.cid].enabled).forEach((h4) => result += h4.content + "\n");
    return result;
  }
  setCurrentContent(id) {
    this.setState({ content: this.getHostContentById(id) });
  }
  getHostContentById(id) {
    if (!id) return "";
    const host = this.state.hosts.find((h4) => h4.cid === id);
    return host ? host.content : "";
  }
  removeComment(content) {
    return content.replace(/#.+/gm, "");
  }
  validate(value) {
    const rules = removeComment(value.trim()).split("\n");
    let ipRE = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?::(6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]|[1-5]?\d{1,4}))?$/;
    let error = null;
    rules.forEach((rule) => {
      let r2 = rule.split(/\s+/);
      if (isProxy(r2[0])) {
        if (!ipRE.test(r2[1])) {
          return this.notice("IP \u5730\u5740\u4E0D\u6B63\u786E");
        }
        return;
      }
      if (!ipRE.test(r2[0])) {
        return this.notice("IP \u5730\u5740\u4E0D\u6B63\u786E");
      }
      if (!r2[1] || r2[1].trim() === "") {
        return this.notice("Host \u5730\u5740\u4E0D\u80FD\u4E3A\u7A7A");
      }
      r2.shift();
      if (r2.length) {
        r2.filter((h4) => h4.trim() !== "").forEach((h4) => {
          let isValidHost = isDomain(h4) || isLocalHost(h4);
          if (!isValidHost) error = `host name[${r2}] maybe not valid.`;
        });
      }
    });
    return error;
  }
  notice(content) {
    toastMessage(content);
  }
  copy(text) {
    const input = document.createElement("textarea");
    document.body.appendChild(input);
    input.value = text;
    input.focus();
    input.select();
    document.execCommand("Copy");
    input.remove();
  }
  render() {
    const { categories, enabled, selected, content, hosts, notice, editing } = this.state;
    return /* @__PURE__ */ u2("div", { className: "app flex", children: [
      /* @__PURE__ */ u2("div", { className: "left", children: [
        /* @__PURE__ */ u2("div", { class: "op salign valign", children: [
          /* @__PURE__ */ u2(SvgIcon, { name: "add", onClick: () => this.addCategory("unnamed") }),
          /* @__PURE__ */ u2(SvgIcon, { name: "trash", onClick: () => this.removeCategory(selected) })
        ] }),
        /* @__PURE__ */ u2("div", { class: "cnt", children: /* @__PURE__ */ u2("ul", { className: `menu-list${enabled ? "" : " disabled"}`, children: [
          /* @__PURE__ */ u2("li", { className: "flex valign gap-10 all-hosts is-active", onClick: () => this.loadAllHost(categories, hosts), children: [
            enabled ? /* @__PURE__ */ u2(SvgIcon, { name: "on", onClick: this.onToggleEnableAll }) : /* @__PURE__ */ u2(SvgIcon, { name: "off", onClick: this.onToggleEnableAll }),
            /* @__PURE__ */ u2("span", { className: "text", children: "All Hosts" })
          ] }),
          categories.map((category, index) => /* @__PURE__ */ u2(
            "li",
            {
              "data-id": category.id,
              className: `flex gap-10 valign salign ${category.enabled ? "" : "disabled"} ${selected === category.id ? " is-active" : ""}`,
              onDblClick: () => this.handleEdit(category.id),
              onClick: () => this.handleLoadHost(category.id),
              children: /* @__PURE__ */ u2("div", { className: "flex grow-1 gap-10 valign", children: [
                category.enabled ? /* @__PURE__ */ u2(SvgIcon, { name: "on", onClick: () => this.toggleEnable(category.id) }) : /* @__PURE__ */ u2(SvgIcon, { name: "off", onClick: () => this.toggleEnable(category.id) }),
                /* @__PURE__ */ u2("span", { className: category.id === editing ? "is-hidden" : "text", children: category.name }),
                /* @__PURE__ */ u2("span", { className: category.id === editing ? "text name-input" : "is-hidden", children: /* @__PURE__ */ u2(
                  "input",
                  {
                    class: "update-input",
                    ref: (el) => {
                      if (el) this.inputRefs[category.id] = el;
                    },
                    type: "text",
                    value: category.name,
                    onBlur: () => {
                      this.handleBlur(category.id);
                    },
                    onKeyDown: (e2) => {
                      if (e2.key === "Enter") {
                        this.handleBlur(category.id);
                        this.focusTextarea();
                        this.handleChange(category.id, e2);
                        e2.preventDefault();
                      }
                    },
                    onClick: (e2) => {
                      e2.stopPropagation();
                    },
                    onChange: (e2) => this.handleChange(category.id, e2)
                  }
                ) })
              ] })
            },
            category.id
          )),
          /* @__PURE__ */ u2("li", { className: "error-msg", children: notice.active && /* @__PURE__ */ u2("div", { children: notice.content }) })
        ] }) })
      ] }),
      /* @__PURE__ */ u2("div", { className: "right", children: [
        /* @__PURE__ */ u2("div", { className: "op salign valign", children: [
          /* @__PURE__ */ u2(SvgIcon, { name: "save", onClick: this.handleSave }),
          /* @__PURE__ */ u2("a", { href: "options.html", target: "_blank", children: /* @__PURE__ */ u2(SvgIcon, { name: "setting" }) })
        ] }),
        /* @__PURE__ */ u2("div", { className: "cnt", children: /* @__PURE__ */ u2(
          "textarea",
          {
            ref: (el) => this.textarea = el,
            autoComplete: "off",
            autoCorrect: "off",
            autoCapitalize: "off",
            name: "host",
            value: content,
            className: "hero is-fullheight",
            onChange: (e2) => this.editHost(e2.target?.value),
            readOnly: !selected,
            placeholder: "127.0.0.1 localhost"
          }
        ) })
      ] })
    ] });
  }
  handleChange(id, e2) {
    this.editCategory(id, e2.target.value);
  }
  handleBlur(id) {
    this.setState({ ...this.state, editing: "" });
  }
  handleEdit(id) {
    this.setState({ ...this.state, editing: id }, () => {
      this.inputRefs[id]?.select();
    });
  }
  focusTextarea() {
    if (this.textarea) {
      this.textarea.focus();
    }
  }
};
function toastMessage(text) {
  console.error(text);
  if (window.Toastify) {
    var toast = window.Toastify({
      text,
      duration: 3e3,
      position: "center",
      onClick: function() {
        toast.hideToast();
      }
    }).showToast();
  }
}

// src/index.tsx
E(/* @__PURE__ */ u2(App, {}), document.getElementById("root"));
