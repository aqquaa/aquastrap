/**
   * Aquarequest
   * version: 1.0.9
   * 
   * Copyright (c) itsrav.dev
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */
function K(t, e) {
  return Object.prototype.hasOwnProperty.call(t, e);
}
function _e(t) {
  return t && Object.keys(t).length === 0;
}
function Jt(t) {
  return t instanceof File || t instanceof Blob || t instanceof FileList && t.length > 0 || t instanceof FormData && Array.from(t.values()).some((e) => Jt(e)) || typeof t == "object" && t !== null && Object.values(t).some((e) => Jt(e));
}
function Ie(t, e = new FormData(), n = null) {
  t = t || {};
  for (const r in t)
    Object.prototype.hasOwnProperty.call(t, r) && Me(e, He(n, r), t[r]);
  return e;
}
function He(t, e) {
  return t ? t + "[" + e + "]" : e;
}
function Me(t, e, n) {
  if (Array.isArray(n))
    return Array.from(n.keys()).forEach((r) => Me(t, He(e, r.toString()), n[r]));
  if (n instanceof Date)
    return t.append(e, n.toISOString());
  if (n instanceof File)
    return t.append(e, n, n.name);
  if (n instanceof Blob)
    return t.append(e, n);
  if (typeof n == "boolean")
    return t.append(e, n ? "1" : "0");
  if (typeof n == "string")
    return t.append(e, n);
  if (typeof n == "number")
    return t.append(e, `${n}`);
  if (n == null)
    return t.append(e, "");
  Ie(n, t, e);
}
function z(t, e = {}) {
  document.dispatchEvent(
    new CustomEvent(t, {
      detail: e,
      bubbles: !0,
      composed: !0,
      cancelable: !0
    })
  );
}
const $ = Object.freeze({
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete"
}), We = Object.freeze({
  busy: !1,
  response: null,
  result: null,
  cancelled: !1,
  statusCode: null,
  downloadProgress: 0,
  uploadProgress: 0
}), y = Object.freeze({
  BEFORE: "onBefore",
  START: "onStart",
  DOWNLOAD: "onDownload",
  UPLOAD: "onUpload",
  CANCEL: "onCancel",
  STATUS_CODE: "onStatusCode",
  SUCCESS: "onSuccess",
  ERROR: "onError",
  FINISH: "onFinish"
}), q = Object.freeze({
  BEFORE: "aquarequest:onBefore",
  START: "aquarequest:onStart",
  DOWNLOAD: "aquarequest:onDownload",
  UPLOAD: "aquarequest:onUpload",
  CANCEL: "aquarequest:onCancel",
  SUCCESS: "aquarequest:onSuccess",
  ERROR: "aquarequest:onError",
  FINISH: "aquarequest:onFinish"
});
class Vr {
  constructor() {
    this.state = Object.assign({}, We);
  }
  [y.BEFORE]() {
  }
  [y.START]() {
    this.state.busy = !0;
  }
  [y.STATUS_CODE](e) {
    this.state.statusCode = e;
  }
  [y.SUCCESS](e) {
    this.state.response = e, this.state.result = e.data;
  }
  [y.CANCEL](e) {
    this.state.cancelled = !0;
  }
  [y.UPLOAD](e) {
    let n = e == null ? void 0 : e.total, r = e == null ? void 0 : e.loaded;
    if (!n || !r)
      return;
    let i = Math.round(r / n * 100);
    this.state.uploadProgress = i;
  }
  [y.DOWNLOAD](e) {
    let n = e == null ? void 0 : e.total, r = e == null ? void 0 : e.loaded;
    if (!n || !r)
      return;
    let i = Math.round(r / n * 100);
    this.state.downloadProgress = i;
  }
  [y.ERROR](e) {
    this.state.response = e;
  }
  [y.FINISH]() {
    this.state.busy = !1;
  }
}
class $r {
  constructor(e) {
    this.mainContext = e, this.stateHub = new Vr();
  }
  [y.BEFORE](e) {
    z(q.BEFORE, e), this.stateHub[y.BEFORE].call(this.mainContext);
  }
  [y.START](e) {
    z(q.START, e), this.stateHub[y.START].call(this.mainContext, e);
  }
  [y.STATUS_CODE](e) {
    this.stateHub[y.STATUS_CODE].call(this.mainContext, e);
  }
  [y.SUCCESS](e) {
    z(q.SUCCESS, e), this.stateHub[y.SUCCESS].call(this.mainContext, e);
  }
  [y.CANCEL](e) {
    z(q.CANCEL, e), this.stateHub[y.CANCEL].call(this.mainContext, e);
  }
  [y.UPLOAD](e) {
    z(q.UPLOAD, e), this.stateHub[y.UPLOAD].call(this.mainContext, e);
  }
  [y.DOWNLOAD](e) {
    z(q.DOWNLOAD, e), this.stateHub[y.DOWNLOAD].call(this.mainContext, e);
  }
  [y.ERROR](e) {
    z(q.ERROR, e), this.stateHub[y.ERROR].call(this.mainContext, e);
  }
  [y.FINISH]() {
    z(q.FINISH, {}), this.mainContext._cancelToken = null, this.stateHub[y.FINISH].call(this.mainContext);
  }
}
class Kr {
  constructor(e) {
    this.hook = new $r(e), this.handlers = {};
  }
  registerInternalHooks() {
    const e = y;
    this.register(e.BEFORE, this.hook[e.BEFORE].bind(this.hook)), this.register(e.START, this.hook[e.START].bind(this.hook)), this.register(e.STATUS_CODE, this.hook[e.STATUS_CODE].bind(this.hook)), this.register(e.CANCEL, this.hook[e.CANCEL].bind(this.hook)), this.register(e.UPLOAD, this.hook[e.UPLOAD].bind(this.hook)), this.register(e.DOWNLOAD, this.hook[e.DOWNLOAD].bind(this.hook)), this.register(e.SUCCESS, this.hook[e.SUCCESS].bind(this.hook)), this.register(e.ERROR, this.hook[e.ERROR].bind(this.hook)), this.register(e.FINISH, this.hook[e.FINISH].bind(this.hook));
  }
  registerUserHooks(e) {
    const n = y, r = this;
    e.forEach((i) => {
      Object.values(y).forEach((a) => {
        K(i, a) || (i[a] = () => {
        });
      }), r.register(n.BEFORE, i[n.BEFORE]), r.register(n.START, i[n.START]), r.register(n.STATUS_CODE, i[n.STATUS_CODE]), r.register(n.CANCEL, i[n.CANCEL]), r.register(n.UPLOAD, i[n.UPLOAD]), r.register(n.DOWNLOAD, i[n.DOWNLOAD]), r.register(n.SUCCESS, i[n.SUCCESS]), r.register(n.ERROR, i[n.ERROR]), r.register(n.FINISH, i[n.FINISH]);
    });
  }
  register(e, n) {
    this.handlers || (this.handlers = {}), this.handlers[e] || (this.handlers[e] = []), this.handlers[e].push(n);
  }
  off(e, n) {
    var r;
    let i = (r = this.handlers) == null ? void 0 : r[e];
    if (i)
      for (let a = 0; a < i.length; a++)
        i[a] === n && i.splice(a--, 1);
  }
  run(e, ...n) {
    var r;
    (r = this.handlers) != null && r[e] && this.handlers[e].forEach((i) => i.apply(this, n));
  }
}
var bt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Gr(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var vt = { exports: {} };
vt.exports;
(function(t, e) {
  var n = 200, r = "__lodash_hash_undefined__", i = 800, a = 16, c = 9007199254740991, p = "[object Arguments]", f = "[object Array]", m = "[object AsyncFunction]", d = "[object Boolean]", O = "[object Date]", w = "[object Error]", g = "[object Function]", b = "[object GeneratorFunction]", k = "[object Map]", C = "[object Number]", Q = "[object Null]", at = "[object Object]", pn = "[object Proxy]", hn = "[object RegExp]", dn = "[object Set]", mn = "[object String]", bn = "[object Undefined]", gn = "[object WeakMap]", yn = "[object ArrayBuffer]", On = "[object DataView]", En = "[object Float32Array]", vn = "[object Float64Array]", Sn = "[object Int8Array]", wn = "[object Int16Array]", xn = "[object Int32Array]", An = "[object Uint8Array]", Rn = "[object Uint8ClampedArray]", _n = "[object Uint16Array]", jn = "[object Uint32Array]", Tn = /[\\^$.*+?()[\]{}|]/g, Cn = /^\[object .+?Constructor\]$/, Nn = /^(?:0|[1-9]\d*)$/, A = {};
  A[En] = A[vn] = A[Sn] = A[wn] = A[xn] = A[An] = A[Rn] = A[_n] = A[jn] = !0, A[p] = A[f] = A[yn] = A[d] = A[On] = A[O] = A[w] = A[g] = A[k] = A[C] = A[at] = A[hn] = A[dn] = A[mn] = A[gn] = !1;
  var re = typeof bt == "object" && bt && bt.Object === Object && bt, Un = typeof self == "object" && self && self.Object === Object && self, Z = re || Un || Function("return this")(), oe = e && !e.nodeType && e, Y = oe && !0 && t && !t.nodeType && t, ie = Y && Y.exports === oe, Tt = ie && re.process, se = function() {
    try {
      var o = Y && Y.require && Y.require("util").types;
      return o || Tt && Tt.binding && Tt.binding("util");
    } catch {
    }
  }(), ae = se && se.isTypedArray;
  function kn(o, s, u) {
    switch (u.length) {
      case 0:
        return o.call(s);
      case 1:
        return o.call(s, u[0]);
      case 2:
        return o.call(s, u[0], u[1]);
      case 3:
        return o.call(s, u[0], u[1], u[2]);
    }
    return o.apply(s, u);
  }
  function Dn(o, s) {
    for (var u = -1, h = Array(o); ++u < o; )
      h[u] = s(u);
    return h;
  }
  function Pn(o) {
    return function(s) {
      return o(s);
    };
  }
  function Ln(o, s) {
    return o == null ? void 0 : o[s];
  }
  function Fn(o, s) {
    return function(u) {
      return o(s(u));
    };
  }
  var qn = Array.prototype, Bn = Function.prototype, ct = Object.prototype, Ct = Z["__core-js_shared__"], ut = Bn.toString, L = ct.hasOwnProperty, ce = function() {
    var o = /[^.]+$/.exec(Ct && Ct.keys && Ct.keys.IE_PROTO || "");
    return o ? "Symbol(src)_1." + o : "";
  }(), ue = ct.toString, zn = ut.call(Object), In = RegExp(
    "^" + ut.call(L).replace(Tn, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), lt = ie ? Z.Buffer : void 0, le = Z.Symbol, fe = Z.Uint8Array, pe = lt ? lt.allocUnsafe : void 0, he = Fn(Object.getPrototypeOf, Object), de = Object.create, Hn = ct.propertyIsEnumerable, Mn = qn.splice, H = le ? le.toStringTag : void 0, ft = function() {
    try {
      var o = kt(Object, "defineProperty");
      return o({}, "", {}), o;
    } catch {
    }
  }(), Wn = lt ? lt.isBuffer : void 0, me = Math.max, Jn = Date.now, be = kt(Z, "Map"), tt = kt(Object, "create"), Vn = function() {
    function o() {
    }
    return function(s) {
      if (!W(s))
        return {};
      if (de)
        return de(s);
      o.prototype = s;
      var u = new o();
      return o.prototype = void 0, u;
    };
  }();
  function M(o) {
    var s = -1, u = o == null ? 0 : o.length;
    for (this.clear(); ++s < u; ) {
      var h = o[s];
      this.set(h[0], h[1]);
    }
  }
  function $n() {
    this.__data__ = tt ? tt(null) : {}, this.size = 0;
  }
  function Kn(o) {
    var s = this.has(o) && delete this.__data__[o];
    return this.size -= s ? 1 : 0, s;
  }
  function Gn(o) {
    var s = this.__data__;
    if (tt) {
      var u = s[o];
      return u === r ? void 0 : u;
    }
    return L.call(s, o) ? s[o] : void 0;
  }
  function Xn(o) {
    var s = this.__data__;
    return tt ? s[o] !== void 0 : L.call(s, o);
  }
  function Qn(o, s) {
    var u = this.__data__;
    return this.size += this.has(o) ? 0 : 1, u[o] = tt && s === void 0 ? r : s, this;
  }
  M.prototype.clear = $n, M.prototype.delete = Kn, M.prototype.get = Gn, M.prototype.has = Xn, M.prototype.set = Qn;
  function F(o) {
    var s = -1, u = o == null ? 0 : o.length;
    for (this.clear(); ++s < u; ) {
      var h = o[s];
      this.set(h[0], h[1]);
    }
  }
  function Zn() {
    this.__data__ = [], this.size = 0;
  }
  function Yn(o) {
    var s = this.__data__, u = pt(s, o);
    if (u < 0)
      return !1;
    var h = s.length - 1;
    return u == h ? s.pop() : Mn.call(s, u, 1), --this.size, !0;
  }
  function tr(o) {
    var s = this.__data__, u = pt(s, o);
    return u < 0 ? void 0 : s[u][1];
  }
  function er(o) {
    return pt(this.__data__, o) > -1;
  }
  function nr(o, s) {
    var u = this.__data__, h = pt(u, o);
    return h < 0 ? (++this.size, u.push([o, s])) : u[h][1] = s, this;
  }
  F.prototype.clear = Zn, F.prototype.delete = Yn, F.prototype.get = tr, F.prototype.has = er, F.prototype.set = nr;
  function J(o) {
    var s = -1, u = o == null ? 0 : o.length;
    for (this.clear(); ++s < u; ) {
      var h = o[s];
      this.set(h[0], h[1]);
    }
  }
  function rr() {
    this.size = 0, this.__data__ = {
      hash: new M(),
      map: new (be || F)(),
      string: new M()
    };
  }
  function or(o) {
    var s = dt(this, o).delete(o);
    return this.size -= s ? 1 : 0, s;
  }
  function ir(o) {
    return dt(this, o).get(o);
  }
  function sr(o) {
    return dt(this, o).has(o);
  }
  function ar(o, s) {
    var u = dt(this, o), h = u.size;
    return u.set(o, s), this.size += u.size == h ? 0 : 1, this;
  }
  J.prototype.clear = rr, J.prototype.delete = or, J.prototype.get = ir, J.prototype.has = sr, J.prototype.set = ar;
  function V(o) {
    var s = this.__data__ = new F(o);
    this.size = s.size;
  }
  function cr() {
    this.__data__ = new F(), this.size = 0;
  }
  function ur(o) {
    var s = this.__data__, u = s.delete(o);
    return this.size = s.size, u;
  }
  function lr(o) {
    return this.__data__.get(o);
  }
  function fr(o) {
    return this.__data__.has(o);
  }
  function pr(o, s) {
    var u = this.__data__;
    if (u instanceof F) {
      var h = u.__data__;
      if (!be || h.length < n - 1)
        return h.push([o, s]), this.size = ++u.size, this;
      u = this.__data__ = new J(h);
    }
    return u.set(o, s), this.size = u.size, this;
  }
  V.prototype.clear = cr, V.prototype.delete = ur, V.prototype.get = lr, V.prototype.has = fr, V.prototype.set = pr;
  function hr(o, s) {
    var u = Lt(o), h = !u && Pt(o), v = !u && !h && ve(o), x = !u && !h && !v && we(o), R = u || h || v || x, E = R ? Dn(o.length, String) : [], _ = E.length;
    for (var N in o)
      (s || L.call(o, N)) && !(R && // Safari 9 has enumerable `arguments.length` in strict mode.
      (N == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      v && (N == "offset" || N == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      x && (N == "buffer" || N == "byteLength" || N == "byteOffset") || // Skip index properties.
      Oe(N, _))) && E.push(N);
    return E;
  }
  function Nt(o, s, u) {
    (u !== void 0 && !mt(o[s], u) || u === void 0 && !(s in o)) && Ut(o, s, u);
  }
  function dr(o, s, u) {
    var h = o[s];
    (!(L.call(o, s) && mt(h, u)) || u === void 0 && !(s in o)) && Ut(o, s, u);
  }
  function pt(o, s) {
    for (var u = o.length; u--; )
      if (mt(o[u][0], s))
        return u;
    return -1;
  }
  function Ut(o, s, u) {
    s == "__proto__" && ft ? ft(o, s, {
      configurable: !0,
      enumerable: !0,
      value: u,
      writable: !0
    }) : o[s] = u;
  }
  var mr = jr();
  function ht(o) {
    return o == null ? o === void 0 ? bn : Q : H && H in Object(o) ? Tr(o) : Pr(o);
  }
  function ge(o) {
    return et(o) && ht(o) == p;
  }
  function br(o) {
    if (!W(o) || kr(o))
      return !1;
    var s = qt(o) ? In : Cn;
    return s.test(Br(o));
  }
  function gr(o) {
    return et(o) && Se(o.length) && !!A[ht(o)];
  }
  function yr(o) {
    if (!W(o))
      return Dr(o);
    var s = Ee(o), u = [];
    for (var h in o)
      h == "constructor" && (s || !L.call(o, h)) || u.push(h);
    return u;
  }
  function ye(o, s, u, h, v) {
    o !== s && mr(s, function(x, R) {
      if (v || (v = new V()), W(x))
        Or(o, s, R, u, ye, h, v);
      else {
        var E = h ? h(Dt(o, R), x, R + "", o, s, v) : void 0;
        E === void 0 && (E = x), Nt(o, R, E);
      }
    }, xe);
  }
  function Or(o, s, u, h, v, x, R) {
    var E = Dt(o, u), _ = Dt(s, u), N = R.get(_);
    if (N) {
      Nt(o, u, N);
      return;
    }
    var T = x ? x(E, _, u + "", o, s, R) : void 0, nt = T === void 0;
    if (nt) {
      var Bt = Lt(_), zt = !Bt && ve(_), Re = !Bt && !zt && we(_);
      T = _, Bt || zt || Re ? Lt(E) ? T = E : zr(E) ? T = Ar(E) : zt ? (nt = !1, T = Sr(_, !0)) : Re ? (nt = !1, T = xr(_, !0)) : T = [] : Ir(_) || Pt(_) ? (T = E, Pt(E) ? T = Hr(E) : (!W(E) || qt(E)) && (T = Cr(_))) : nt = !1;
    }
    nt && (R.set(_, T), v(T, _, h, x, R), R.delete(_)), Nt(o, u, T);
  }
  function Er(o, s) {
    return Fr(Lr(o, s, Ae), o + "");
  }
  var vr = ft ? function(o, s) {
    return ft(o, "toString", {
      configurable: !0,
      enumerable: !1,
      value: Wr(s),
      writable: !0
    });
  } : Ae;
  function Sr(o, s) {
    if (s)
      return o.slice();
    var u = o.length, h = pe ? pe(u) : new o.constructor(u);
    return o.copy(h), h;
  }
  function wr(o) {
    var s = new o.constructor(o.byteLength);
    return new fe(s).set(new fe(o)), s;
  }
  function xr(o, s) {
    var u = s ? wr(o.buffer) : o.buffer;
    return new o.constructor(u, o.byteOffset, o.length);
  }
  function Ar(o, s) {
    var u = -1, h = o.length;
    for (s || (s = Array(h)); ++u < h; )
      s[u] = o[u];
    return s;
  }
  function Rr(o, s, u, h) {
    var v = !u;
    u || (u = {});
    for (var x = -1, R = s.length; ++x < R; ) {
      var E = s[x], _ = h ? h(u[E], o[E], E, u, o) : void 0;
      _ === void 0 && (_ = o[E]), v ? Ut(u, E, _) : dr(u, E, _);
    }
    return u;
  }
  function _r(o) {
    return Er(function(s, u) {
      var h = -1, v = u.length, x = v > 1 ? u[v - 1] : void 0, R = v > 2 ? u[2] : void 0;
      for (x = o.length > 3 && typeof x == "function" ? (v--, x) : void 0, R && Nr(u[0], u[1], R) && (x = v < 3 ? void 0 : x, v = 1), s = Object(s); ++h < v; ) {
        var E = u[h];
        E && o(s, E, h, x);
      }
      return s;
    });
  }
  function jr(o) {
    return function(s, u, h) {
      for (var v = -1, x = Object(s), R = h(s), E = R.length; E--; ) {
        var _ = R[o ? E : ++v];
        if (u(x[_], _, x) === !1)
          break;
      }
      return s;
    };
  }
  function dt(o, s) {
    var u = o.__data__;
    return Ur(s) ? u[typeof s == "string" ? "string" : "hash"] : u.map;
  }
  function kt(o, s) {
    var u = Ln(o, s);
    return br(u) ? u : void 0;
  }
  function Tr(o) {
    var s = L.call(o, H), u = o[H];
    try {
      o[H] = void 0;
      var h = !0;
    } catch {
    }
    var v = ue.call(o);
    return h && (s ? o[H] = u : delete o[H]), v;
  }
  function Cr(o) {
    return typeof o.constructor == "function" && !Ee(o) ? Vn(he(o)) : {};
  }
  function Oe(o, s) {
    var u = typeof o;
    return s = s ?? c, !!s && (u == "number" || u != "symbol" && Nn.test(o)) && o > -1 && o % 1 == 0 && o < s;
  }
  function Nr(o, s, u) {
    if (!W(u))
      return !1;
    var h = typeof s;
    return (h == "number" ? Ft(u) && Oe(s, u.length) : h == "string" && s in u) ? mt(u[s], o) : !1;
  }
  function Ur(o) {
    var s = typeof o;
    return s == "string" || s == "number" || s == "symbol" || s == "boolean" ? o !== "__proto__" : o === null;
  }
  function kr(o) {
    return !!ce && ce in o;
  }
  function Ee(o) {
    var s = o && o.constructor, u = typeof s == "function" && s.prototype || ct;
    return o === u;
  }
  function Dr(o) {
    var s = [];
    if (o != null)
      for (var u in Object(o))
        s.push(u);
    return s;
  }
  function Pr(o) {
    return ue.call(o);
  }
  function Lr(o, s, u) {
    return s = me(s === void 0 ? o.length - 1 : s, 0), function() {
      for (var h = arguments, v = -1, x = me(h.length - s, 0), R = Array(x); ++v < x; )
        R[v] = h[s + v];
      v = -1;
      for (var E = Array(s + 1); ++v < s; )
        E[v] = h[v];
      return E[s] = u(R), kn(o, this, E);
    };
  }
  function Dt(o, s) {
    if (!(s === "constructor" && typeof o[s] == "function") && s != "__proto__")
      return o[s];
  }
  var Fr = qr(vr);
  function qr(o) {
    var s = 0, u = 0;
    return function() {
      var h = Jn(), v = a - (h - u);
      if (u = h, v > 0) {
        if (++s >= i)
          return arguments[0];
      } else
        s = 0;
      return o.apply(void 0, arguments);
    };
  }
  function Br(o) {
    if (o != null) {
      try {
        return ut.call(o);
      } catch {
      }
      try {
        return o + "";
      } catch {
      }
    }
    return "";
  }
  function mt(o, s) {
    return o === s || o !== o && s !== s;
  }
  var Pt = ge(function() {
    return arguments;
  }()) ? ge : function(o) {
    return et(o) && L.call(o, "callee") && !Hn.call(o, "callee");
  }, Lt = Array.isArray;
  function Ft(o) {
    return o != null && Se(o.length) && !qt(o);
  }
  function zr(o) {
    return et(o) && Ft(o);
  }
  var ve = Wn || Jr;
  function qt(o) {
    if (!W(o))
      return !1;
    var s = ht(o);
    return s == g || s == b || s == m || s == pn;
  }
  function Se(o) {
    return typeof o == "number" && o > -1 && o % 1 == 0 && o <= c;
  }
  function W(o) {
    var s = typeof o;
    return o != null && (s == "object" || s == "function");
  }
  function et(o) {
    return o != null && typeof o == "object";
  }
  function Ir(o) {
    if (!et(o) || ht(o) != at)
      return !1;
    var s = he(o);
    if (s === null)
      return !0;
    var u = L.call(s, "constructor") && s.constructor;
    return typeof u == "function" && u instanceof u && ut.call(u) == zn;
  }
  var we = ae ? Pn(ae) : gr;
  function Hr(o) {
    return Rr(o, xe(o));
  }
  function xe(o) {
    return Ft(o) ? hr(o, !0) : yr(o);
  }
  var Mr = _r(function(o, s, u) {
    ye(o, s, u);
  });
  function Wr(o) {
    return function() {
      return o;
    };
  }
  function Ae(o) {
    return o;
  }
  function Jr() {
    return !1;
  }
  t.exports = Mr;
})(vt, vt.exports);
var Xr = vt.exports;
const Vt = /* @__PURE__ */ Gr(Xr);
function Je(t, e) {
  return function() {
    return t.apply(e, arguments);
  };
}
const { toString: Qr } = Object.prototype, { getPrototypeOf: Zt } = Object, wt = ((t) => (e) => {
  const n = Qr.call(e);
  return t[n] || (t[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), P = (t) => (t = t.toLowerCase(), (e) => wt(e) === t), xt = (t) => (e) => typeof e === t, { isArray: X } = Array, ot = xt("undefined");
function Zr(t) {
  return t !== null && !ot(t) && t.constructor !== null && !ot(t.constructor) && U(t.constructor.isBuffer) && t.constructor.isBuffer(t);
}
const Ve = P("ArrayBuffer");
function Yr(t) {
  let e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(t) : e = t && t.buffer && Ve(t.buffer), e;
}
const to = xt("string"), U = xt("function"), $e = xt("number"), At = (t) => t !== null && typeof t == "object", eo = (t) => t === !0 || t === !1, gt = (t) => {
  if (wt(t) !== "object")
    return !1;
  const e = Zt(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}, no = P("Date"), ro = P("File"), oo = P("Blob"), io = P("FileList"), so = (t) => At(t) && U(t.pipe), ao = (t) => {
  let e;
  return t && (typeof FormData == "function" && t instanceof FormData || U(t.append) && ((e = wt(t)) === "formdata" || // detect form-data instance
  e === "object" && U(t.toString) && t.toString() === "[object FormData]"));
}, co = P("URLSearchParams"), uo = (t) => t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function it(t, e, { allOwnKeys: n = !1 } = {}) {
  if (t === null || typeof t > "u")
    return;
  let r, i;
  if (typeof t != "object" && (t = [t]), X(t))
    for (r = 0, i = t.length; r < i; r++)
      e.call(null, t[r], r, t);
  else {
    const a = n ? Object.getOwnPropertyNames(t) : Object.keys(t), c = a.length;
    let p;
    for (r = 0; r < c; r++)
      p = a[r], e.call(null, t[p], p, t);
  }
}
function Ke(t, e) {
  e = e.toLowerCase();
  const n = Object.keys(t);
  let r = n.length, i;
  for (; r-- > 0; )
    if (i = n[r], e === i.toLowerCase())
      return i;
  return null;
}
const Ge = (() => typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global)(), Xe = (t) => !ot(t) && t !== Ge;
function $t() {
  const { caseless: t } = Xe(this) && this || {}, e = {}, n = (r, i) => {
    const a = t && Ke(e, i) || i;
    gt(e[a]) && gt(r) ? e[a] = $t(e[a], r) : gt(r) ? e[a] = $t({}, r) : X(r) ? e[a] = r.slice() : e[a] = r;
  };
  for (let r = 0, i = arguments.length; r < i; r++)
    arguments[r] && it(arguments[r], n);
  return e;
}
const lo = (t, e, n, { allOwnKeys: r } = {}) => (it(e, (i, a) => {
  n && U(i) ? t[a] = Je(i, n) : t[a] = i;
}, { allOwnKeys: r }), t), fo = (t) => (t.charCodeAt(0) === 65279 && (t = t.slice(1)), t), po = (t, e, n, r) => {
  t.prototype = Object.create(e.prototype, r), t.prototype.constructor = t, Object.defineProperty(t, "super", {
    value: e.prototype
  }), n && Object.assign(t.prototype, n);
}, ho = (t, e, n, r) => {
  let i, a, c;
  const p = {};
  if (e = e || {}, t == null)
    return e;
  do {
    for (i = Object.getOwnPropertyNames(t), a = i.length; a-- > 0; )
      c = i[a], (!r || r(c, t, e)) && !p[c] && (e[c] = t[c], p[c] = !0);
    t = n !== !1 && Zt(t);
  } while (t && (!n || n(t, e)) && t !== Object.prototype);
  return e;
}, mo = (t, e, n) => {
  t = String(t), (n === void 0 || n > t.length) && (n = t.length), n -= e.length;
  const r = t.indexOf(e, n);
  return r !== -1 && r === n;
}, bo = (t) => {
  if (!t)
    return null;
  if (X(t))
    return t;
  let e = t.length;
  if (!$e(e))
    return null;
  const n = new Array(e);
  for (; e-- > 0; )
    n[e] = t[e];
  return n;
}, go = ((t) => (e) => t && e instanceof t)(typeof Uint8Array < "u" && Zt(Uint8Array)), yo = (t, e) => {
  const n = (t && t[Symbol.iterator]).call(t);
  let r;
  for (; (r = n.next()) && !r.done; ) {
    const i = r.value;
    e.call(t, i[0], i[1]);
  }
}, Oo = (t, e) => {
  let n;
  const r = [];
  for (; (n = t.exec(e)) !== null; )
    r.push(n);
  return r;
}, Eo = P("HTMLFormElement"), vo = (t) => t.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(e, n, r) {
    return n.toUpperCase() + r;
  }
), je = (({ hasOwnProperty: t }) => (e, n) => t.call(e, n))(Object.prototype), So = P("RegExp"), Qe = (t, e) => {
  const n = Object.getOwnPropertyDescriptors(t), r = {};
  it(n, (i, a) => {
    e(i, a, t) !== !1 && (r[a] = i);
  }), Object.defineProperties(t, r);
}, wo = (t) => {
  Qe(t, (e, n) => {
    if (U(t) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = t[n];
    if (U(r)) {
      if (e.enumerable = !1, "writable" in e) {
        e.writable = !1;
        return;
      }
      e.set || (e.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, xo = (t, e) => {
  const n = {}, r = (i) => {
    i.forEach((a) => {
      n[a] = !0;
    });
  };
  return X(t) ? r(t) : r(String(t).split(e)), n;
}, Ao = () => {
}, Ro = (t, e) => (t = +t, Number.isFinite(t) ? t : e), It = "abcdefghijklmnopqrstuvwxyz", Te = "0123456789", Ze = {
  DIGIT: Te,
  ALPHA: It,
  ALPHA_DIGIT: It + It.toUpperCase() + Te
}, _o = (t = 16, e = Ze.ALPHA_DIGIT) => {
  let n = "";
  const { length: r } = e;
  for (; t--; )
    n += e[Math.random() * r | 0];
  return n;
};
function jo(t) {
  return !!(t && U(t.append) && t[Symbol.toStringTag] === "FormData" && t[Symbol.iterator]);
}
const To = (t) => {
  const e = new Array(10), n = (r, i) => {
    if (At(r)) {
      if (e.indexOf(r) >= 0)
        return;
      if (!("toJSON" in r)) {
        e[i] = r;
        const a = X(r) ? [] : {};
        return it(r, (c, p) => {
          const f = n(c, i + 1);
          !ot(f) && (a[p] = f);
        }), e[i] = void 0, a;
      }
    }
    return r;
  };
  return n(t, 0);
}, Co = P("AsyncFunction"), No = (t) => t && (At(t) || U(t)) && U(t.then) && U(t.catch), l = {
  isArray: X,
  isArrayBuffer: Ve,
  isBuffer: Zr,
  isFormData: ao,
  isArrayBufferView: Yr,
  isString: to,
  isNumber: $e,
  isBoolean: eo,
  isObject: At,
  isPlainObject: gt,
  isUndefined: ot,
  isDate: no,
  isFile: ro,
  isBlob: oo,
  isRegExp: So,
  isFunction: U,
  isStream: so,
  isURLSearchParams: co,
  isTypedArray: go,
  isFileList: io,
  forEach: it,
  merge: $t,
  extend: lo,
  trim: uo,
  stripBOM: fo,
  inherits: po,
  toFlatObject: ho,
  kindOf: wt,
  kindOfTest: P,
  endsWith: mo,
  toArray: bo,
  forEachEntry: yo,
  matchAll: Oo,
  isHTMLForm: Eo,
  hasOwnProperty: je,
  hasOwnProp: je,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Qe,
  freezeMethods: wo,
  toObjectSet: xo,
  toCamelCase: vo,
  noop: Ao,
  toFiniteNumber: Ro,
  findKey: Ke,
  global: Ge,
  isContextDefined: Xe,
  ALPHABET: Ze,
  generateString: _o,
  isSpecCompliantForm: jo,
  toJSONObject: To,
  isAsyncFn: Co,
  isThenable: No
};
function S(t, e, n, r, i) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = t, this.name = "AxiosError", e && (this.code = e), n && (this.config = n), r && (this.request = r), i && (this.response = i);
}
l.inherits(S, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: l.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const Ye = S.prototype, tn = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((t) => {
  tn[t] = { value: t };
});
Object.defineProperties(S, tn);
Object.defineProperty(Ye, "isAxiosError", { value: !0 });
S.from = (t, e, n, r, i, a) => {
  const c = Object.create(Ye);
  return l.toFlatObject(t, c, function(p) {
    return p !== Error.prototype;
  }, (p) => p !== "isAxiosError"), S.call(c, t.message, e, n, r, i), c.cause = t, c.name = t.name, a && Object.assign(c, a), c;
};
const Uo = null;
function Kt(t) {
  return l.isPlainObject(t) || l.isArray(t);
}
function en(t) {
  return l.endsWith(t, "[]") ? t.slice(0, -2) : t;
}
function Ce(t, e, n) {
  return t ? t.concat(e).map(function(r, i) {
    return r = en(r), !n && i ? "[" + r + "]" : r;
  }).join(n ? "." : "") : e;
}
function ko(t) {
  return l.isArray(t) && !t.some(Kt);
}
const Do = l.toFlatObject(l, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Rt(t, e, n) {
  if (!l.isObject(t))
    throw new TypeError("target must be an object");
  e = e || new FormData(), n = l.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(g, b) {
    return !l.isUndefined(b[g]);
  });
  const r = n.metaTokens, i = n.visitor || m, a = n.dots, c = n.indexes, p = (n.Blob || typeof Blob < "u" && Blob) && l.isSpecCompliantForm(e);
  if (!l.isFunction(i))
    throw new TypeError("visitor must be a function");
  function f(g) {
    if (g === null)
      return "";
    if (l.isDate(g))
      return g.toISOString();
    if (!p && l.isBlob(g))
      throw new S("Blob is not supported. Use a Buffer instead.");
    return l.isArrayBuffer(g) || l.isTypedArray(g) ? p && typeof Blob == "function" ? new Blob([g]) : Buffer.from(g) : g;
  }
  function m(g, b, k) {
    let C = g;
    if (g && !k && typeof g == "object") {
      if (l.endsWith(b, "{}"))
        b = r ? b : b.slice(0, -2), g = JSON.stringify(g);
      else if (l.isArray(g) && ko(g) || (l.isFileList(g) || l.endsWith(b, "[]")) && (C = l.toArray(g)))
        return b = en(b), C.forEach(function(Q, at) {
          !(l.isUndefined(Q) || Q === null) && e.append(
            // eslint-disable-next-line no-nested-ternary
            c === !0 ? Ce([b], at, a) : c === null ? b : b + "[]",
            f(Q)
          );
        }), !1;
    }
    return Kt(g) ? !0 : (e.append(Ce(k, b, a), f(g)), !1);
  }
  const d = [], O = Object.assign(Do, {
    defaultVisitor: m,
    convertValue: f,
    isVisitable: Kt
  });
  function w(g, b) {
    if (!l.isUndefined(g)) {
      if (d.indexOf(g) !== -1)
        throw Error("Circular reference detected in " + b.join("."));
      d.push(g), l.forEach(g, function(k, C) {
        (!(l.isUndefined(k) || k === null) && i.call(
          e,
          k,
          l.isString(C) ? C.trim() : C,
          b,
          O
        )) === !0 && w(k, b ? b.concat(C) : [C]);
      }), d.pop();
    }
  }
  if (!l.isObject(t))
    throw new TypeError("data must be an object");
  return w(t), e;
}
function Ne(t) {
  const e = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g, function(n) {
    return e[n];
  });
}
function Yt(t, e) {
  this._pairs = [], t && Rt(t, this, e);
}
const nn = Yt.prototype;
nn.append = function(t, e) {
  this._pairs.push([t, e]);
};
nn.toString = function(t) {
  const e = t ? function(n) {
    return t.call(this, n, Ne);
  } : Ne;
  return this._pairs.map(function(n) {
    return e(n[0]) + "=" + e(n[1]);
  }, "").join("&");
};
function Po(t) {
  return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function rn(t, e, n) {
  if (!e)
    return t;
  const r = n && n.encode || Po, i = n && n.serialize;
  let a;
  if (i ? a = i(e, n) : a = l.isURLSearchParams(e) ? e.toString() : new Yt(e, n).toString(r), a) {
    const c = t.indexOf("#");
    c !== -1 && (t = t.slice(0, c)), t += (t.indexOf("?") === -1 ? "?" : "&") + a;
  }
  return t;
}
class Lo {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(e, n, r) {
    return this.handlers.push({
      fulfilled: e,
      rejected: n,
      synchronous: r ? r.synchronous : !1,
      runWhen: r ? r.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(e) {
    this.handlers[e] && (this.handlers[e] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(e) {
    l.forEach(this.handlers, function(n) {
      n !== null && e(n);
    });
  }
}
const Ue = Lo, on = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Fo = typeof URLSearchParams < "u" ? URLSearchParams : Yt, qo = typeof FormData < "u" ? FormData : null, Bo = typeof Blob < "u" ? Blob : null, zo = (() => {
  let t;
  return typeof navigator < "u" && ((t = navigator.product) === "ReactNative" || t === "NativeScript" || t === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), Io = (() => typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), D = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Fo,
    FormData: qo,
    Blob: Bo
  },
  isStandardBrowserEnv: zo,
  isStandardBrowserWebWorkerEnv: Io,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function Ho(t, e) {
  return Rt(t, new D.classes.URLSearchParams(), Object.assign({
    visitor: function(n, r, i, a) {
      return D.isNode && l.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : a.defaultVisitor.apply(this, arguments);
    }
  }, e));
}
function Mo(t) {
  return l.matchAll(/\w+|\[(\w*)]/g, t).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function Wo(t) {
  const e = {}, n = Object.keys(t);
  let r;
  const i = n.length;
  let a;
  for (r = 0; r < i; r++)
    a = n[r], e[a] = t[a];
  return e;
}
function sn(t) {
  function e(n, r, i, a) {
    let c = n[a++];
    const p = Number.isFinite(+c), f = a >= n.length;
    return c = !c && l.isArray(i) ? i.length : c, f ? (l.hasOwnProp(i, c) ? i[c] = [i[c], r] : i[c] = r, !p) : ((!i[c] || !l.isObject(i[c])) && (i[c] = []), e(n, r, i[c], a) && l.isArray(i[c]) && (i[c] = Wo(i[c])), !p);
  }
  if (l.isFormData(t) && l.isFunction(t.entries)) {
    const n = {};
    return l.forEachEntry(t, (r, i) => {
      e(Mo(r), i, n, 0);
    }), n;
  }
  return null;
}
const Jo = {
  "Content-Type": void 0
};
function Vo(t, e, n) {
  if (l.isString(t))
    try {
      return (e || JSON.parse)(t), l.trim(t);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (n || JSON.stringify)(t);
}
const _t = {
  transitional: on,
  adapter: ["xhr", "http"],
  transformRequest: [function(t, e) {
    const n = e.getContentType() || "", r = n.indexOf("application/json") > -1, i = l.isObject(t);
    if (i && l.isHTMLForm(t) && (t = new FormData(t)), l.isFormData(t))
      return r && r ? JSON.stringify(sn(t)) : t;
    if (l.isArrayBuffer(t) || l.isBuffer(t) || l.isStream(t) || l.isFile(t) || l.isBlob(t))
      return t;
    if (l.isArrayBufferView(t))
      return t.buffer;
    if (l.isURLSearchParams(t))
      return e.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let a;
    if (i) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return Ho(t, this.formSerializer).toString();
      if ((a = l.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
        const c = this.env && this.env.FormData;
        return Rt(
          a ? { "files[]": t } : t,
          c && new c(),
          this.formSerializer
        );
      }
    }
    return i || r ? (e.setContentType("application/json", !1), Vo(t)) : t;
  }],
  transformResponse: [function(t) {
    const e = this.transitional || _t.transitional, n = e && e.forcedJSONParsing, r = this.responseType === "json";
    if (t && l.isString(t) && (n && !this.responseType || r)) {
      const i = !(e && e.silentJSONParsing) && r;
      try {
        return JSON.parse(t);
      } catch (a) {
        if (i)
          throw a.name === "SyntaxError" ? S.from(a, S.ERR_BAD_RESPONSE, this, null, this.response) : a;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: D.classes.FormData,
    Blob: D.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*"
    }
  }
};
l.forEach(["delete", "get", "head"], function(t) {
  _t.headers[t] = {};
});
l.forEach(["post", "put", "patch"], function(t) {
  _t.headers[t] = l.merge(Jo);
});
const te = _t, $o = l.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), Ko = (t) => {
  const e = {};
  let n, r, i;
  return t && t.split(`
`).forEach(function(a) {
    i = a.indexOf(":"), n = a.substring(0, i).trim().toLowerCase(), r = a.substring(i + 1).trim(), !(!n || e[n] && $o[n]) && (n === "set-cookie" ? e[n] ? e[n].push(r) : e[n] = [r] : e[n] = e[n] ? e[n] + ", " + r : r);
  }), e;
}, ke = Symbol("internals");
function rt(t) {
  return t && String(t).trim().toLowerCase();
}
function yt(t) {
  return t === !1 || t == null ? t : l.isArray(t) ? t.map(yt) : String(t);
}
function Go(t) {
  const e = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(t); )
    e[r[1]] = r[2];
  return e;
}
const Xo = (t) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());
function Ht(t, e, n, r, i) {
  if (l.isFunction(r))
    return r.call(this, e, n);
  if (i && (e = n), !!l.isString(e)) {
    if (l.isString(r))
      return e.indexOf(r) !== -1;
    if (l.isRegExp(r))
      return r.test(e);
  }
}
function Qo(t) {
  return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, n, r) => n.toUpperCase() + r);
}
function Zo(t, e) {
  const n = l.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(t, r + n, {
      value: function(i, a, c) {
        return this[r].call(this, e, i, a, c);
      },
      configurable: !0
    });
  });
}
class jt {
  constructor(e) {
    e && this.set(e);
  }
  set(e, n, r) {
    const i = this;
    function a(p, f, m) {
      const d = rt(f);
      if (!d)
        throw new Error("header name must be a non-empty string");
      const O = l.findKey(i, d);
      (!O || i[O] === void 0 || m === !0 || m === void 0 && i[O] !== !1) && (i[O || f] = yt(p));
    }
    const c = (p, f) => l.forEach(p, (m, d) => a(m, d, f));
    return l.isPlainObject(e) || e instanceof this.constructor ? c(e, n) : l.isString(e) && (e = e.trim()) && !Xo(e) ? c(Ko(e), n) : e != null && a(n, e, r), this;
  }
  get(e, n) {
    if (e = rt(e), e) {
      const r = l.findKey(this, e);
      if (r) {
        const i = this[r];
        if (!n)
          return i;
        if (n === !0)
          return Go(i);
        if (l.isFunction(n))
          return n.call(this, i, r);
        if (l.isRegExp(n))
          return n.exec(i);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, n) {
    if (e = rt(e), e) {
      const r = l.findKey(this, e);
      return !!(r && this[r] !== void 0 && (!n || Ht(this, this[r], r, n)));
    }
    return !1;
  }
  delete(e, n) {
    const r = this;
    let i = !1;
    function a(c) {
      if (c = rt(c), c) {
        const p = l.findKey(r, c);
        p && (!n || Ht(r, r[p], p, n)) && (delete r[p], i = !0);
      }
    }
    return l.isArray(e) ? e.forEach(a) : a(e), i;
  }
  clear(e) {
    const n = Object.keys(this);
    let r = n.length, i = !1;
    for (; r--; ) {
      const a = n[r];
      (!e || Ht(this, this[a], a, e, !0)) && (delete this[a], i = !0);
    }
    return i;
  }
  normalize(e) {
    const n = this, r = {};
    return l.forEach(this, (i, a) => {
      const c = l.findKey(r, a);
      if (c) {
        n[c] = yt(i), delete n[a];
        return;
      }
      const p = e ? Qo(a) : String(a).trim();
      p !== a && delete n[a], n[p] = yt(i), r[p] = !0;
    }), this;
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const n = /* @__PURE__ */ Object.create(null);
    return l.forEach(this, (r, i) => {
      r != null && r !== !1 && (n[i] = e && l.isArray(r) ? r.join(", ") : r);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e, n]) => e + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  static concat(e, ...n) {
    const r = new this(e);
    return n.forEach((i) => r.set(i)), r;
  }
  static accessor(e) {
    const n = (this[ke] = this[ke] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function i(a) {
      const c = rt(a);
      n[c] || (Zo(r, a), n[c] = !0);
    }
    return l.isArray(e) ? e.forEach(i) : i(e), this;
  }
}
jt.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
l.freezeMethods(jt.prototype);
l.freezeMethods(jt);
const B = jt;
function Mt(t, e) {
  const n = this || te, r = e || n, i = B.from(r.headers);
  let a = r.data;
  return l.forEach(t, function(c) {
    a = c.call(n, a, i.normalize(), e ? e.status : void 0);
  }), i.normalize(), a;
}
function an(t) {
  return !!(t && t.__CANCEL__);
}
function st(t, e, n) {
  S.call(this, t ?? "canceled", S.ERR_CANCELED, e, n), this.name = "CanceledError";
}
l.inherits(st, S, {
  __CANCEL__: !0
});
function Yo(t, e, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? t(n) : e(new S(
    "Request failed with status code " + n.status,
    [S.ERR_BAD_REQUEST, S.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
const ti = D.isStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  function() {
    return {
      write: function(t, e, n, r, i, a) {
        const c = [];
        c.push(t + "=" + encodeURIComponent(e)), l.isNumber(n) && c.push("expires=" + new Date(n).toGMTString()), l.isString(r) && c.push("path=" + r), l.isString(i) && c.push("domain=" + i), a === !0 && c.push("secure"), document.cookie = c.join("; ");
      },
      read: function(t) {
        const e = document.cookie.match(new RegExp("(^|;\\s*)(" + t + ")=([^;]*)"));
        return e ? decodeURIComponent(e[3]) : null;
      },
      remove: function(t) {
        this.write(t, "", Date.now() - 864e5);
      }
    };
  }()
) : (
  // Non standard browser env (web workers, react-native) lack needed support.
  function() {
    return {
      write: function() {
      },
      read: function() {
        return null;
      },
      remove: function() {
      }
    };
  }()
);
function ei(t) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
}
function ni(t, e) {
  return e ? t.replace(/\/+$/, "") + "/" + e.replace(/^\/+/, "") : t;
}
function cn(t, e) {
  return t && !ei(e) ? ni(t, e) : e;
}
const ri = D.isStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const t = /(msie|trident)/i.test(navigator.userAgent), e = document.createElement("a");
    let n;
    function r(i) {
      let a = i;
      return t && (e.setAttribute("href", a), a = e.href), e.setAttribute("href", a), {
        href: e.href,
        protocol: e.protocol ? e.protocol.replace(/:$/, "") : "",
        host: e.host,
        search: e.search ? e.search.replace(/^\?/, "") : "",
        hash: e.hash ? e.hash.replace(/^#/, "") : "",
        hostname: e.hostname,
        port: e.port,
        pathname: e.pathname.charAt(0) === "/" ? e.pathname : "/" + e.pathname
      };
    }
    return n = r(window.location.href), function(i) {
      const a = l.isString(i) ? r(i) : i;
      return a.protocol === n.protocol && a.host === n.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  function() {
    return function() {
      return !0;
    };
  }()
);
function oi(t) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
  return e && e[1] || "";
}
function ii(t, e) {
  t = t || 10;
  const n = new Array(t), r = new Array(t);
  let i = 0, a = 0, c;
  return e = e !== void 0 ? e : 1e3, function(p) {
    const f = Date.now(), m = r[a];
    c || (c = f), n[i] = p, r[i] = f;
    let d = a, O = 0;
    for (; d !== i; )
      O += n[d++], d = d % t;
    if (i = (i + 1) % t, i === a && (a = (a + 1) % t), f - c < e)
      return;
    const w = m && f - m;
    return w ? Math.round(O * 1e3 / w) : void 0;
  };
}
function De(t, e) {
  let n = 0;
  const r = ii(50, 250);
  return (i) => {
    const a = i.loaded, c = i.lengthComputable ? i.total : void 0, p = a - n, f = r(p), m = a <= c;
    n = a;
    const d = {
      loaded: a,
      total: c,
      progress: c ? a / c : void 0,
      bytes: p,
      rate: f || void 0,
      estimated: f && c && m ? (c - a) / f : void 0,
      event: i
    };
    d[e ? "download" : "upload"] = !0, t(d);
  };
}
const si = typeof XMLHttpRequest < "u", ai = si && function(t) {
  return new Promise(function(e, n) {
    let r = t.data;
    const i = B.from(t.headers).normalize(), a = t.responseType;
    let c;
    function p() {
      t.cancelToken && t.cancelToken.unsubscribe(c), t.signal && t.signal.removeEventListener("abort", c);
    }
    l.isFormData(r) && (D.isStandardBrowserEnv || D.isStandardBrowserWebWorkerEnv ? i.setContentType(!1) : i.setContentType("multipart/form-data;", !1));
    let f = new XMLHttpRequest();
    if (t.auth) {
      const w = t.auth.username || "", g = t.auth.password ? unescape(encodeURIComponent(t.auth.password)) : "";
      i.set("Authorization", "Basic " + btoa(w + ":" + g));
    }
    const m = cn(t.baseURL, t.url);
    f.open(t.method.toUpperCase(), rn(m, t.params, t.paramsSerializer), !0), f.timeout = t.timeout;
    function d() {
      if (!f)
        return;
      const w = B.from(
        "getAllResponseHeaders" in f && f.getAllResponseHeaders()
      ), g = {
        data: !a || a === "text" || a === "json" ? f.responseText : f.response,
        status: f.status,
        statusText: f.statusText,
        headers: w,
        config: t,
        request: f
      };
      Yo(function(b) {
        e(b), p();
      }, function(b) {
        n(b), p();
      }, g), f = null;
    }
    if ("onloadend" in f ? f.onloadend = d : f.onreadystatechange = function() {
      !f || f.readyState !== 4 || f.status === 0 && !(f.responseURL && f.responseURL.indexOf("file:") === 0) || setTimeout(d);
    }, f.onabort = function() {
      f && (n(new S("Request aborted", S.ECONNABORTED, t, f)), f = null);
    }, f.onerror = function() {
      n(new S("Network Error", S.ERR_NETWORK, t, f)), f = null;
    }, f.ontimeout = function() {
      let w = t.timeout ? "timeout of " + t.timeout + "ms exceeded" : "timeout exceeded";
      const g = t.transitional || on;
      t.timeoutErrorMessage && (w = t.timeoutErrorMessage), n(new S(
        w,
        g.clarifyTimeoutError ? S.ETIMEDOUT : S.ECONNABORTED,
        t,
        f
      )), f = null;
    }, D.isStandardBrowserEnv) {
      const w = (t.withCredentials || ri(m)) && t.xsrfCookieName && ti.read(t.xsrfCookieName);
      w && i.set(t.xsrfHeaderName, w);
    }
    r === void 0 && i.setContentType(null), "setRequestHeader" in f && l.forEach(i.toJSON(), function(w, g) {
      f.setRequestHeader(g, w);
    }), l.isUndefined(t.withCredentials) || (f.withCredentials = !!t.withCredentials), a && a !== "json" && (f.responseType = t.responseType), typeof t.onDownloadProgress == "function" && f.addEventListener("progress", De(t.onDownloadProgress, !0)), typeof t.onUploadProgress == "function" && f.upload && f.upload.addEventListener("progress", De(t.onUploadProgress)), (t.cancelToken || t.signal) && (c = (w) => {
      f && (n(!w || w.type ? new st(null, t, f) : w), f.abort(), f = null);
    }, t.cancelToken && t.cancelToken.subscribe(c), t.signal && (t.signal.aborted ? c() : t.signal.addEventListener("abort", c)));
    const O = oi(m);
    if (O && D.protocols.indexOf(O) === -1) {
      n(new S("Unsupported protocol " + O + ":", S.ERR_BAD_REQUEST, t));
      return;
    }
    f.send(r || null);
  });
}, Ot = {
  http: Uo,
  xhr: ai
};
l.forEach(Ot, (t, e) => {
  if (t) {
    try {
      Object.defineProperty(t, "name", { value: e });
    } catch {
    }
    Object.defineProperty(t, "adapterName", { value: e });
  }
});
const ci = {
  getAdapter: (t) => {
    t = l.isArray(t) ? t : [t];
    const { length: e } = t;
    let n, r;
    for (let i = 0; i < e && (n = t[i], !(r = l.isString(n) ? Ot[n.toLowerCase()] : n)); i++)
      ;
    if (!r)
      throw r === !1 ? new S(
        `Adapter ${n} is not supported by the environment`,
        "ERR_NOT_SUPPORT"
      ) : new Error(
        l.hasOwnProp(Ot, n) ? `Adapter '${n}' is not available in the build` : `Unknown adapter '${n}'`
      );
    if (!l.isFunction(r))
      throw new TypeError("adapter is not a function");
    return r;
  },
  adapters: Ot
};
function Wt(t) {
  if (t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted)
    throw new st(null, t);
}
function Pe(t) {
  return Wt(t), t.headers = B.from(t.headers), t.data = Mt.call(
    t,
    t.transformRequest
  ), ["post", "put", "patch"].indexOf(t.method) !== -1 && t.headers.setContentType("application/x-www-form-urlencoded", !1), ci.getAdapter(t.adapter || te.adapter)(t).then(function(e) {
    return Wt(t), e.data = Mt.call(
      t,
      t.transformResponse,
      e
    ), e.headers = B.from(e.headers), e;
  }, function(e) {
    return an(e) || (Wt(t), e && e.response && (e.response.data = Mt.call(
      t,
      t.transformResponse,
      e.response
    ), e.response.headers = B.from(e.response.headers))), Promise.reject(e);
  });
}
const Le = (t) => t instanceof B ? t.toJSON() : t;
function G(t, e) {
  e = e || {};
  const n = {};
  function r(m, d, O) {
    return l.isPlainObject(m) && l.isPlainObject(d) ? l.merge.call({ caseless: O }, m, d) : l.isPlainObject(d) ? l.merge({}, d) : l.isArray(d) ? d.slice() : d;
  }
  function i(m, d, O) {
    if (l.isUndefined(d)) {
      if (!l.isUndefined(m))
        return r(void 0, m, O);
    } else
      return r(m, d, O);
  }
  function a(m, d) {
    if (!l.isUndefined(d))
      return r(void 0, d);
  }
  function c(m, d) {
    if (l.isUndefined(d)) {
      if (!l.isUndefined(m))
        return r(void 0, m);
    } else
      return r(void 0, d);
  }
  function p(m, d, O) {
    if (O in e)
      return r(m, d);
    if (O in t)
      return r(void 0, m);
  }
  const f = {
    url: a,
    method: a,
    data: a,
    baseURL: c,
    transformRequest: c,
    transformResponse: c,
    paramsSerializer: c,
    timeout: c,
    timeoutMessage: c,
    withCredentials: c,
    adapter: c,
    responseType: c,
    xsrfCookieName: c,
    xsrfHeaderName: c,
    onUploadProgress: c,
    onDownloadProgress: c,
    decompress: c,
    maxContentLength: c,
    maxBodyLength: c,
    beforeRedirect: c,
    transport: c,
    httpAgent: c,
    httpsAgent: c,
    cancelToken: c,
    socketPath: c,
    responseEncoding: c,
    validateStatus: p,
    headers: (m, d) => i(Le(m), Le(d), !0)
  };
  return l.forEach(Object.keys(Object.assign({}, t, e)), function(m) {
    const d = f[m] || i, O = d(t[m], e[m], m);
    l.isUndefined(O) && d !== p || (n[m] = O);
  }), n;
}
const un = "1.4.0", ee = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((t, e) => {
  ee[t] = function(n) {
    return typeof n === t || "a" + (e < 1 ? "n " : " ") + t;
  };
});
const Fe = {};
ee.transitional = function(t, e, n) {
  function r(i, a) {
    return "[Axios v" + un + "] Transitional option '" + i + "'" + a + (n ? ". " + n : "");
  }
  return (i, a, c) => {
    if (t === !1)
      throw new S(
        r(a, " has been removed" + (e ? " in " + e : "")),
        S.ERR_DEPRECATED
      );
    return e && !Fe[a] && (Fe[a] = !0, console.warn(
      r(
        a,
        " has been deprecated since v" + e + " and will be removed in the near future"
      )
    )), t ? t(i, a, c) : !0;
  };
};
function ui(t, e, n) {
  if (typeof t != "object")
    throw new S("options must be an object", S.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(t);
  let i = r.length;
  for (; i-- > 0; ) {
    const a = r[i], c = e[a];
    if (c) {
      const p = t[a], f = p === void 0 || c(p, a, t);
      if (f !== !0)
        throw new S("option " + a + " must be " + f, S.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new S("Unknown option " + a, S.ERR_BAD_OPTION);
  }
}
const Gt = {
  assertOptions: ui,
  validators: ee
}, I = Gt.validators;
class St {
  constructor(e) {
    this.defaults = e, this.interceptors = {
      request: new Ue(),
      response: new Ue()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  request(e, n) {
    typeof e == "string" ? (n = n || {}, n.url = e) : n = e || {}, n = G(this.defaults, n);
    const { transitional: r, paramsSerializer: i, headers: a } = n;
    r !== void 0 && Gt.assertOptions(r, {
      silentJSONParsing: I.transitional(I.boolean),
      forcedJSONParsing: I.transitional(I.boolean),
      clarifyTimeoutError: I.transitional(I.boolean)
    }, !1), i != null && (l.isFunction(i) ? n.paramsSerializer = {
      serialize: i
    } : Gt.assertOptions(i, {
      encode: I.function,
      serialize: I.function
    }, !0)), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let c;
    c = a && l.merge(
      a.common,
      a[n.method]
    ), c && l.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (b) => {
        delete a[b];
      }
    ), n.headers = B.concat(c, a);
    const p = [];
    let f = !0;
    this.interceptors.request.forEach(function(b) {
      typeof b.runWhen == "function" && b.runWhen(n) === !1 || (f = f && b.synchronous, p.unshift(b.fulfilled, b.rejected));
    });
    const m = [];
    this.interceptors.response.forEach(function(b) {
      m.push(b.fulfilled, b.rejected);
    });
    let d, O = 0, w;
    if (!f) {
      const b = [Pe.bind(this), void 0];
      for (b.unshift.apply(b, p), b.push.apply(b, m), w = b.length, d = Promise.resolve(n); O < w; )
        d = d.then(b[O++], b[O++]);
      return d;
    }
    w = p.length;
    let g = n;
    for (O = 0; O < w; ) {
      const b = p[O++], k = p[O++];
      try {
        g = b(g);
      } catch (C) {
        k.call(this, C);
        break;
      }
    }
    try {
      d = Pe.call(this, g);
    } catch (b) {
      return Promise.reject(b);
    }
    for (O = 0, w = m.length; O < w; )
      d = d.then(m[O++], m[O++]);
    return d;
  }
  getUri(e) {
    e = G(this.defaults, e);
    const n = cn(e.baseURL, e.url);
    return rn(n, e.params, e.paramsSerializer);
  }
}
l.forEach(["delete", "get", "head", "options"], function(t) {
  St.prototype[t] = function(e, n) {
    return this.request(G(n || {}, {
      method: t,
      url: e,
      data: (n || {}).data
    }));
  };
});
l.forEach(["post", "put", "patch"], function(t) {
  function e(n) {
    return function(r, i, a) {
      return this.request(G(a || {}, {
        method: t,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: r,
        data: i
      }));
    };
  }
  St.prototype[t] = e(), St.prototype[t + "Form"] = e(!0);
});
const Et = St;
class ne {
  constructor(e) {
    if (typeof e != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(i) {
      n = i;
    });
    const r = this;
    this.promise.then((i) => {
      if (!r._listeners)
        return;
      let a = r._listeners.length;
      for (; a-- > 0; )
        r._listeners[a](i);
      r._listeners = null;
    }), this.promise.then = (i) => {
      let a;
      const c = new Promise((p) => {
        r.subscribe(p), a = p;
      }).then(i);
      return c.cancel = function() {
        r.unsubscribe(a);
      }, c;
    }, e(function(i, a, c) {
      r.reason || (r.reason = new st(i, a, c), n(r.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(e) {
    if (this.reason) {
      e(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(e) : this._listeners = [e];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(e) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(e);
    n !== -1 && this._listeners.splice(n, 1);
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let e;
    return {
      token: new ne(function(n) {
        e = n;
      }),
      cancel: e
    };
  }
}
const li = ne;
function fi(t) {
  return function(e) {
    return t.apply(null, e);
  };
}
function pi(t) {
  return l.isObject(t) && t.isAxiosError === !0;
}
const Xt = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(Xt).forEach(([t, e]) => {
  Xt[e] = t;
});
const hi = Xt;
function ln(t) {
  const e = new Et(t), n = Je(Et.prototype.request, e);
  return l.extend(n, Et.prototype, e, { allOwnKeys: !0 }), l.extend(n, e, null, { allOwnKeys: !0 }), n.create = function(r) {
    return ln(G(t, r));
  }, n;
}
const j = ln(te);
j.Axios = Et;
j.CanceledError = st;
j.CancelToken = li;
j.isCancel = an;
j.VERSION = un;
j.toFormData = Rt;
j.AxiosError = S;
j.Cancel = j.CanceledError;
j.all = function(t) {
  return Promise.all(t);
};
j.spread = fi;
j.isAxiosError = pi;
j.mergeConfig = G;
j.AxiosHeaders = B;
j.formToJSON = (t) => sn(l.isHTMLForm(t) ? new FormData(t) : t);
j.HttpStatusCode = hi;
j.default = j;
const qe = j;
function di(t, e) {
  t.run(y.START, e), qe(e).then((n) => {
    t.run(y.STATUS_CODE, n.status), t.run(y.SUCCESS, n);
  }).catch((n) => {
    if (qe.isCancel(n)) {
      t.run(y.CANCEL, n.message);
      return;
    }
    if (n.response) {
      t.run(y.STATUS_CODE, n.response.status), t.run(y.ERROR, n.response);
      return;
    }
    t.run(y.ERROR, n);
  }).then((n) => t.run(y.FINISH, {}));
}
function mi(t) {
  const e = K(t, "cancelToken") ? t.cancelToken : null, n = !e && K(t, "signal") ? t.signal : null;
  let r = null;
  return !e && !n && (r = new AbortController(), t = Object.assign({}, t, { signal: r.signal })), {
    options: t,
    abortControllerInstance: r
  };
}
function bi(t, e, n = $.GET, r = {}, i = {}) {
  const a = gi(e, n, r), c = K(i, "cancelToken") ? i.cancelToken : null;
  let p = !c && K(i, "signal") ? i.signal : new AbortController().signal;
  const f = {
    method: n,
    url: a.url,
    data: n === $.GET ? {} : a.payload,
    ...c ? { cancelToken: c } : { signal: p },
    headers: {
      Accept: "*/*",
      // Accept: "application/json",
      "Content-Type": r instanceof FormData ? "multipart/form-data" : "application/json",
      "X-Requested-With": "XMLHttpRequest"
    },
    onUploadProgress: (m) => {
      a.payload instanceof FormData && t.run(y.UPLOAD, m);
    },
    onDownloadProgress: (m) => {
      t.run(y.DOWNLOAD, m);
    }
  };
  return Vt(f, i);
}
function gi(t, e, n, r) {
  if ((Jt(n) || r) && !(n instanceof FormData) && (n = Ie(n)), !(n instanceof FormData) && e === $.GET && Object.keys(n).length) {
    t = t.endsWith("/") ? t.slice(0, -1) : t;
    const i = new URLSearchParams({ ...n });
    t += "?" + i.toString();
  }
  return {
    url: t,
    payload: n
  };
}
class fn {
  constructor(e = "http://localhost", n = [], r = {}, i = {}) {
    this.requestURL = e, this.state = {}, this._userStates = n, this.requestConfig = r, this.hooks = _e(i) ? [] : [i], this._cancelToken = null, this.availableHooks = Array.from(Object.values(y)), this.availableEvents = Array.from(Object.values(q)), this.resetStates();
  }
  // expect userStates = [ [name, callback], ... ]
  _registerUserStates() {
    if (this._userStates.length === 0)
      return;
    const e = this, n = (r) => Array.isArray(r) || typeof r[0] < "u" || typeof r[1] == "function";
    Array.from(this._userStates).filter(n).forEach((r) => {
      let i = r[0], a = r[1];
      K(e.state, i) && delete e.state[i], Object.defineProperty(e.state, i, {
        get() {
          return a(e.state);
        },
        configurable: !0
      });
    });
  }
  url(e) {
    return this.requestURL = e, this;
  }
  registerStates(e) {
    return this._userStates = this._userStates.length === 0 ? e : [...this._userStates, ...e], this;
  }
  mergeRequestOptions(e = {}) {
    return this.requestConfig = Object.assign({}, Vt(this.requestConfig, e)), this;
  }
  // always overwrite all hooks callbacks
  setRequestHooks(e = {}) {
    return this.hooks = [Object.assign({}, e)], this;
  }
  mergeRequestHooks(e = {}) {
    return this.hooks = [...this.hooks, e], this;
  }
  submit(e = $.GET, n = {}, r = {}) {
    const { options: i = {}, hooks: a = {} } = r;
    this.resetStates();
    const c = mi(i);
    this._cancelToken = c.abortControllerInstance;
    const p = Object.assign({}, Vt(this.requestConfig, c.options)), f = _e(a) ? [...this.hooks] : [...this.hooks, a], m = new Kr(this), d = bi(m, this.requestURL, e, n, p);
    m.registerInternalHooks(), m.registerUserHooks(f), m.run(y.BEFORE, d), di(m, d);
  }
  get(e = {}, n = { options: {}, hooks: {} }) {
    return this.submit($.GET, e, n);
  }
  post(e = {}, n = { options: {}, hooks: {} }) {
    return this.submit($.POST, e, n);
  }
  cancel() {
    this.state.busy && this._cancelToken && (this._cancelToken.abort(), this._cancelToken = null);
  }
  resetStates() {
    this.state = Object.assign({}, We), this._registerUserStates();
  }
}
function Qt(t, e) {
  return Object.prototype.hasOwnProperty.call(t, e);
}
function yi(t) {
  return t && Object.keys(t).length === 0;
}
function Oi(t) {
  const n = [
    { ext: ".aac", mime: "audio/aac" },
    { ext: ".abw", mime: "application/x-abiword" },
    { ext: ".arc", mime: "application/x-freearc" },
    { ext: ".avi", mime: "video/x-msvideo" },
    { ext: ".azw", mime: "application/vnd.amazon.ebook" },
    { ext: ".bin", mime: "application/octet-stream" },
    { ext: ".bmp", mime: "image/bmp" },
    { ext: ".bz", mime: "application/x-bzip" },
    { ext: ".bz2", mime: "application/x-bzip2" },
    { ext: ".cda", mime: "application/x-cdf" },
    { ext: ".csh", mime: "application/x-csh" },
    { ext: ".css", mime: "text/css" },
    { ext: ".csv", mime: "text/csv" },
    { ext: ".doc", mime: "application/msword" },
    { ext: ".docx", mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
    { ext: ".eot", mime: "application/vnd.ms-fontobject" },
    { ext: ".epub", mime: "application/epub+zip" },
    { ext: ".gz", mime: "application/gzip" },
    { ext: ".gif", mime: "image/gif" },
    { ext: ".html", mime: "text/html" },
    { ext: ".ico", mime: "image/vnd.microsoft.icon" },
    { ext: ".ics", mime: "text/calendar" },
    { ext: ".jar", mime: "application/java-archive" },
    { ext: ".jpeg", mime: "image/jpeg" },
    { ext: ".jpg", mime: "image/jpg" },
    { ext: ".js", mime: "text/javascript" },
    { ext: ".json", mime: "application/json" },
    { ext: ".jsonld", mime: "application/ld+json" },
    { ext: ".midi", mime: "audio/midi" },
    { ext: ".midi", mime: "audio/x-midi" },
    { ext: ".mp3", mime: "audio/mpeg" },
    { ext: ".mp4", mime: "video/mp4" },
    { ext: ".mpeg", mime: "video/mpeg" },
    { ext: ".mpkg", mime: "application/vnd.apple.installer+xml" },
    { ext: ".odp", mime: "application/vnd.oasis.opendocument.presentation" },
    { ext: ".ods", mime: "application/vnd.oasis.opendocument.spreadsheet" },
    { ext: ".odt", mime: "application/vnd.oasis.opendocument.text" },
    { ext: ".oga", mime: "audio/ogg" },
    { ext: ".ogv", mime: "video/ogg" },
    { ext: ".ogx", mime: "application/ogg" },
    { ext: ".opus", mime: "audio/opus" },
    { ext: ".otf", mime: "font/otf" },
    { ext: ".png", mime: "image/png" },
    { ext: ".pdf", mime: "application/pdf" },
    { ext: ".php", mime: "application/x-httpd-php" },
    { ext: ".ppt", mime: "application/vnd.ms-powerpoint" },
    { ext: ".pptx", mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation" },
    { ext: ".rar", mime: "application/vnd.rar" },
    { ext: ".rtf", mime: "application/rtf" },
    { ext: ".sh", mime: "application/x-sh" },
    { ext: ".svg", mime: "image/svg+xml" },
    { ext: ".swf", mime: "application/x-shockwave-flash" },
    { ext: ".tar", mime: "application/x-tar" },
    { ext: ".tiff", mime: "image/tiff" },
    { ext: ".ts", mime: "video/mp2t" },
    { ext: ".ttf", mime: "font/ttf" },
    { ext: ".txt", mime: "text/plain" },
    { ext: ".vsd", mime: "application/vnd.visio" },
    { ext: ".wav", mime: "audio/wav" },
    { ext: ".weba", mime: "audio/webm" },
    { ext: ".webm", mime: "video/webm" },
    { ext: ".webp", mime: "image/webp" },
    { ext: ".woff", mime: "font/woff" },
    { ext: ".woff2", mime: "font/woff2" },
    { ext: ".xhtml", mime: "application/xhtml+xml" },
    { ext: ".xls", mime: "application/vnd.ms-excel" },
    { ext: ".xlsx", mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
    { ext: ".xml", mime: "application/xml" },
    { ext: ".xul", mime: "application/vnd.mozilla.xul+xml" },
    { ext: ".zip", mime: "application/zip" },
    { ext: ".3gp", mime: "video/3gpp" },
    { ext: ".7z", mime: "application/x-7z-compressed" }
  ].find((r) => r.mime === t);
  return n ? n.ext : ".txt";
}
function Ei(t, e = {}) {
  document.dispatchEvent(
    new CustomEvent(t, {
      detail: e,
      bubbles: !0,
      composed: !0,
      cancelable: !0
    })
  );
}
const Be = Object.freeze({
  errors: {},
  message: ""
});
class vi {
  constructor() {
    this.localState = Object.assign({}, Be), this.aquastrap = new fn(), this.aquastrap.mergeRequestOptions({
      headers: {
        ...document.querySelector('meta[name="csrf-token"]') && {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        }
      }
    }).setRequestHooks({
      onBefore: this.resetStates.bind(this),
      onSuccess: async (e) => {
        await ze(e, this.localState), wi(e);
      },
      onError: async (e) => {
        let n = await ze(e, this.localState);
        if (n && n != null && n.errors) {
          let r = {};
          Object.entries(n.errors).forEach(([i, a]) => r[i] = a[0]), this.localState.errors = r;
        }
      }
    }).registerStates([
      [
        "hasError",
        (e) => e.statusCode && Number(e.statusCode) >= 300 || e.response instanceof Error
      ]
    ]), this.availableHooks = this.aquastrap.availableHooks, this.availableEvents = [...this.aquastrap.availableEvents, "aquastrap:onNotification"];
  }
  get state() {
    return Object.assign({}, this.aquastrap.state, this.localState, {
      hasError: this.aquastrap.state.hasError ?? !1,
      isValidationError: this.aquastrap.state.statusCode === 422 && !this.aquastrap.state.busy && !yi(this.localState.errors)
    });
  }
  setFormError(e, n = null) {
    e instanceof Object && typeof e == "object" && (this.localState.errors = Object.assign({}, this.localState.errors, e)), typeof e == "string" && (this.localState.errors[e] = n);
  }
  clearFormError(...e) {
    if (!e.length) {
      this.localState.errors = {};
      return;
    }
    e.forEach((n) => {
      Qt(this.localState.errors, n) && delete this.localState.errors[n];
    });
  }
  resetStates() {
    this.localState = Object.assign({}, Be), this.aquastrap.resetStates();
  }
  url(e) {
    return this.aquastrap.url(e), this;
  }
  route(...e) {
    let n;
    try {
      n = route(...e);
    } catch {
      n = this.aquastrap.requestURL;
    }
    return this.aquastrap.url(n), this;
  }
  cancel() {
    this.aquastrap.cancel();
  }
  get(e = {}, n = { options: {}, hooks: {} }) {
    return this.aquastrap.get(e, n);
  }
  post(e = {}, n = { options: {}, hooks: {} }) {
    return this.aquastrap.post(e, n);
  }
  download(e = {}) {
    return this.aquastrap.post(e, { options: {
      responseType: "blob"
    }, hooks: {} });
  }
}
const Si = (t) => {
  const e = t.headers["content-type"];
  return !!(e && e.indexOf("application/json") !== -1);
};
function wi(t) {
  if (Si(t))
    return;
  const e = "application/octet-stream", n = t.headers["content-type"] || e, r = t.headers["content-disposition"], i = r ? r.split("filename=")[1] : "", a = i !== '""' ? i.replace(/\s+/g, "-").replace(/\"/g, "") : "download" + Oi(n.split(";")[0]), c = window.URL.createObjectURL(new Blob([t.data])), p = document.createElement("a");
  p.href = c, p.download = a, document.body.appendChild(p), p.click(), p.remove(), window.URL.revokeObjectURL(c);
}
async function ze(t, e) {
  const n = (a) => {
    const c = a == null ? void 0 : a.headers["x-aqua-notification"];
    if (!c)
      return;
    const p = JSON.parse(c);
    p && Qt(p, "type") && Qt(p, "message") && Ei("aquastrap:onNotification", p);
  }, r = async (a) => {
    if (!(a != null && a.data))
      return null;
    let c = a.data;
    if (c instanceof Blob && c.type === "application/json") {
      let p = await c.text();
      return c = JSON.parse(p), c;
    }
    return c;
  };
  if (n(t), t instanceof Error)
    return e.message = t.message, null;
  let i = await r(t);
  return i ? (e.message = i == null ? void 0 : i.message, e.message || (e.message = ""), i) : null;
}
window._Aquastrap = fn;
window._LaraAquastrap = vi;
/**
   * Aquastrap
   * version: 1.0.0
   * 
   * Copyright (c) itsrav.dev
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */
