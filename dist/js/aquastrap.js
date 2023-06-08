function ee(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function yr(e) {
  return e && Object.keys(e).length === 0;
}
function vr(e) {
  return e instanceof File || e instanceof Blob || e instanceof FileList && e.length > 0 || e instanceof FormData && Array.from(e.values()).some((t) => vr(t)) || typeof e == "object" && e !== null && Object.values(e).some((t) => vr(t));
}
function Si(e, t = new FormData(), r = null) {
  e = e || {};
  for (const n in e)
    Object.prototype.hasOwnProperty.call(e, n) && Ti(t, Ri(r, n), e[n]);
  return t;
}
function Ri(e, t) {
  return e ? e + "[" + t + "]" : t;
}
function Ti(e, t, r) {
  if (Array.isArray(r))
    return Array.from(r.keys()).forEach((n) => Ti(e, Ri(t, n.toString()), r[n]));
  if (r instanceof Date)
    return e.append(t, r.toISOString());
  if (r instanceof File)
    return e.append(t, r, r.name);
  if (r instanceof Blob)
    return e.append(t, r);
  if (typeof r == "boolean")
    return e.append(t, r ? "1" : "0");
  if (typeof r == "string")
    return e.append(t, r);
  if (typeof r == "number")
    return e.append(t, `${r}`);
  if (r == null)
    return e.append(t, "");
  Si(r, e, t);
}
function no(e) {
  const r = [
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
  ].find((n) => n.mime === e);
  return r ? r.ext : ".txt";
}
function X(e, t = {}) {
  document.dispatchEvent(
    new CustomEvent(e, {
      detail: t,
      bubbles: !0,
      composed: !0,
      cancelable: !0
    })
  );
}
const oe = Object.freeze({
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete"
}), wi = Object.freeze({
  busy: !1,
  response: null,
  result: null,
  cancelled: !1,
  statusCode: null,
  downloadProgress: 0,
  uploadProgress: 0
}), $ = Object.freeze({
  BEFORE: "onBefore",
  START: "onStart",
  DOWNLOAD: "onDownload",
  UPLOAD: "onUpload",
  CANCEL: "onCancel",
  STATUS_CODE: "onStatusCode",
  SUCCESS: "onSuccess",
  ERROR: "onError",
  FINISH: "onFinish"
}), Z = Object.freeze({
  BEFORE: "aquastrap:onBefore",
  START: "aquastrap:onStart",
  DOWNLOAD: "aquastrap:onDownload",
  UPLOAD: "aquastrap:onUpload",
  CANCEL: "aquastrap:onCancel",
  SUCCESS: "aquastrap:onSuccess",
  ERROR: "aquastrap:onError",
  FINISH: "aquastrap:onFinish"
});
class ao {
  constructor() {
    this.state = Object.assign({}, wi);
  }
  [$.BEFORE]() {
  }
  [$.START]() {
    this.state.busy = !0;
  }
  [$.STATUS_CODE](t) {
    this.state.statusCode = t;
  }
  [$.SUCCESS](t) {
    this.state.response = t, this.state.result = t.data;
  }
  [$.CANCEL](t) {
    this.state.cancelled = !0;
  }
  [$.UPLOAD](t) {
    let r = t == null ? void 0 : t.total, n = t == null ? void 0 : t.loaded;
    if (!r || !n)
      return;
    let a = Math.round(n / r * 100);
    this.state.uploadProgress = a;
  }
  [$.DOWNLOAD](t) {
    let r = t == null ? void 0 : t.total, n = t == null ? void 0 : t.loaded;
    if (!r || !n)
      return;
    let a = Math.round(n / r * 100);
    this.state.downloadProgress = a;
  }
  [$.ERROR](t) {
    this.state.response = t;
  }
  [$.FINISH]() {
    this.state.busy = !1;
  }
}
class io {
  constructor(t) {
    this.mainContext = t, this.stateHub = new ao();
  }
  [$.BEFORE](t) {
    X(Z.BEFORE, t), this.stateHub[$.BEFORE].call(this.mainContext);
  }
  [$.START](t) {
    X(Z.START, t), this.stateHub[$.START].call(this.mainContext, t);
  }
  [$.STATUS_CODE](t) {
    this.stateHub[$.STATUS_CODE].call(this.mainContext, t);
  }
  [$.SUCCESS](t) {
    X(Z.SUCCESS, t), this.stateHub[$.SUCCESS].call(this.mainContext, t);
  }
  [$.CANCEL](t) {
    X(Z.CANCEL, t), this.stateHub[$.CANCEL].call(this.mainContext, t);
  }
  [$.UPLOAD](t) {
    X(Z.UPLOAD, t), this.stateHub[$.UPLOAD].call(this.mainContext, t);
  }
  [$.DOWNLOAD](t) {
    X(Z.DOWNLOAD, t), this.stateHub[$.DOWNLOAD].call(this.mainContext, t);
  }
  [$.ERROR](t) {
    X(Z.ERROR, t), this.stateHub[$.ERROR].call(this.mainContext, t);
  }
  [$.FINISH]() {
    X(Z.FINISH, {}), this.mainContext._cancelToken = null, this.stateHub[$.FINISH].call(this.mainContext);
  }
}
class so {
  constructor(t) {
    this.hook = new io(t), this.handlers = {};
  }
  registerInternalHooks() {
    const t = $;
    this.register(t.BEFORE, this.hook[t.BEFORE].bind(this.hook)), this.register(t.START, this.hook[t.START].bind(this.hook)), this.register(t.STATUS_CODE, this.hook[t.STATUS_CODE].bind(this.hook)), this.register(t.CANCEL, this.hook[t.CANCEL].bind(this.hook)), this.register(t.UPLOAD, this.hook[t.UPLOAD].bind(this.hook)), this.register(t.DOWNLOAD, this.hook[t.DOWNLOAD].bind(this.hook)), this.register(t.SUCCESS, this.hook[t.SUCCESS].bind(this.hook)), this.register(t.ERROR, this.hook[t.ERROR].bind(this.hook)), this.register(t.FINISH, this.hook[t.FINISH].bind(this.hook));
  }
  registerUserHooks(t) {
    const r = $, n = this;
    t.forEach((a) => {
      Object.values($).forEach((i) => {
        ee(a, i) || (a[i] = () => {
        });
      }), n.register(r.BEFORE, a[r.BEFORE]), n.register(r.START, a[r.START]), n.register(r.STATUS_CODE, a[r.STATUS_CODE]), n.register(r.CANCEL, a[r.CANCEL]), n.register(r.UPLOAD, a[r.UPLOAD]), n.register(r.DOWNLOAD, a[r.DOWNLOAD]), n.register(r.SUCCESS, a[r.SUCCESS]), n.register(r.ERROR, a[r.ERROR]), n.register(r.FINISH, a[r.FINISH]);
    });
  }
  register(t, r) {
    this.handlers || (this.handlers = {}), this.handlers[t] || (this.handlers[t] = []), this.handlers[t].push(r);
  }
  off(t, r) {
    var a;
    let n = (a = this.handlers) == null ? void 0 : a[t];
    if (n)
      for (let i = 0; i < n.length; i++)
        n[i] === r && n.splice(i--, 1);
  }
  run(t, ...r) {
    var n;
    (n = this.handlers) != null && n[t] && this.handlers[t].forEach((a) => a.apply(this, r));
  }
}
var we = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function oo(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ei = {};
(function(e) {
  e.aliasToReal = {
    // Lodash aliases.
    each: "forEach",
    eachRight: "forEachRight",
    entries: "toPairs",
    entriesIn: "toPairsIn",
    extend: "assignIn",
    extendAll: "assignInAll",
    extendAllWith: "assignInAllWith",
    extendWith: "assignInWith",
    first: "head",
    // Methods that are curried variants of others.
    conforms: "conformsTo",
    matches: "isMatch",
    property: "get",
    // Ramda aliases.
    __: "placeholder",
    F: "stubFalse",
    T: "stubTrue",
    all: "every",
    allPass: "overEvery",
    always: "constant",
    any: "some",
    anyPass: "overSome",
    apply: "spread",
    assoc: "set",
    assocPath: "set",
    complement: "negate",
    compose: "flowRight",
    contains: "includes",
    dissoc: "unset",
    dissocPath: "unset",
    dropLast: "dropRight",
    dropLastWhile: "dropRightWhile",
    equals: "isEqual",
    identical: "eq",
    indexBy: "keyBy",
    init: "initial",
    invertObj: "invert",
    juxt: "over",
    omitAll: "omit",
    nAry: "ary",
    path: "get",
    pathEq: "matchesProperty",
    pathOr: "getOr",
    paths: "at",
    pickAll: "pick",
    pipe: "flow",
    pluck: "map",
    prop: "get",
    propEq: "matchesProperty",
    propOr: "getOr",
    props: "at",
    symmetricDifference: "xor",
    symmetricDifferenceBy: "xorBy",
    symmetricDifferenceWith: "xorWith",
    takeLast: "takeRight",
    takeLastWhile: "takeRightWhile",
    unapply: "rest",
    unnest: "flatten",
    useWith: "overArgs",
    where: "conformsTo",
    whereEq: "isMatch",
    zipObj: "zipObject"
  }, e.aryMethod = {
    1: [
      "assignAll",
      "assignInAll",
      "attempt",
      "castArray",
      "ceil",
      "create",
      "curry",
      "curryRight",
      "defaultsAll",
      "defaultsDeepAll",
      "floor",
      "flow",
      "flowRight",
      "fromPairs",
      "invert",
      "iteratee",
      "memoize",
      "method",
      "mergeAll",
      "methodOf",
      "mixin",
      "nthArg",
      "over",
      "overEvery",
      "overSome",
      "rest",
      "reverse",
      "round",
      "runInContext",
      "spread",
      "template",
      "trim",
      "trimEnd",
      "trimStart",
      "uniqueId",
      "words",
      "zipAll"
    ],
    2: [
      "add",
      "after",
      "ary",
      "assign",
      "assignAllWith",
      "assignIn",
      "assignInAllWith",
      "at",
      "before",
      "bind",
      "bindAll",
      "bindKey",
      "chunk",
      "cloneDeepWith",
      "cloneWith",
      "concat",
      "conformsTo",
      "countBy",
      "curryN",
      "curryRightN",
      "debounce",
      "defaults",
      "defaultsDeep",
      "defaultTo",
      "delay",
      "difference",
      "divide",
      "drop",
      "dropRight",
      "dropRightWhile",
      "dropWhile",
      "endsWith",
      "eq",
      "every",
      "filter",
      "find",
      "findIndex",
      "findKey",
      "findLast",
      "findLastIndex",
      "findLastKey",
      "flatMap",
      "flatMapDeep",
      "flattenDepth",
      "forEach",
      "forEachRight",
      "forIn",
      "forInRight",
      "forOwn",
      "forOwnRight",
      "get",
      "groupBy",
      "gt",
      "gte",
      "has",
      "hasIn",
      "includes",
      "indexOf",
      "intersection",
      "invertBy",
      "invoke",
      "invokeMap",
      "isEqual",
      "isMatch",
      "join",
      "keyBy",
      "lastIndexOf",
      "lt",
      "lte",
      "map",
      "mapKeys",
      "mapValues",
      "matchesProperty",
      "maxBy",
      "meanBy",
      "merge",
      "mergeAllWith",
      "minBy",
      "multiply",
      "nth",
      "omit",
      "omitBy",
      "overArgs",
      "pad",
      "padEnd",
      "padStart",
      "parseInt",
      "partial",
      "partialRight",
      "partition",
      "pick",
      "pickBy",
      "propertyOf",
      "pull",
      "pullAll",
      "pullAt",
      "random",
      "range",
      "rangeRight",
      "rearg",
      "reject",
      "remove",
      "repeat",
      "restFrom",
      "result",
      "sampleSize",
      "some",
      "sortBy",
      "sortedIndex",
      "sortedIndexOf",
      "sortedLastIndex",
      "sortedLastIndexOf",
      "sortedUniqBy",
      "split",
      "spreadFrom",
      "startsWith",
      "subtract",
      "sumBy",
      "take",
      "takeRight",
      "takeRightWhile",
      "takeWhile",
      "tap",
      "throttle",
      "thru",
      "times",
      "trimChars",
      "trimCharsEnd",
      "trimCharsStart",
      "truncate",
      "union",
      "uniqBy",
      "uniqWith",
      "unset",
      "unzipWith",
      "without",
      "wrap",
      "xor",
      "zip",
      "zipObject",
      "zipObjectDeep"
    ],
    3: [
      "assignInWith",
      "assignWith",
      "clamp",
      "differenceBy",
      "differenceWith",
      "findFrom",
      "findIndexFrom",
      "findLastFrom",
      "findLastIndexFrom",
      "getOr",
      "includesFrom",
      "indexOfFrom",
      "inRange",
      "intersectionBy",
      "intersectionWith",
      "invokeArgs",
      "invokeArgsMap",
      "isEqualWith",
      "isMatchWith",
      "flatMapDepth",
      "lastIndexOfFrom",
      "mergeWith",
      "orderBy",
      "padChars",
      "padCharsEnd",
      "padCharsStart",
      "pullAllBy",
      "pullAllWith",
      "rangeStep",
      "rangeStepRight",
      "reduce",
      "reduceRight",
      "replace",
      "set",
      "slice",
      "sortedIndexBy",
      "sortedLastIndexBy",
      "transform",
      "unionBy",
      "unionWith",
      "update",
      "xorBy",
      "xorWith",
      "zipWith"
    ],
    4: [
      "fill",
      "setWith",
      "updateWith"
    ]
  }, e.aryRearg = {
    2: [1, 0],
    3: [2, 0, 1],
    4: [3, 2, 0, 1]
  }, e.iterateeAry = {
    dropRightWhile: 1,
    dropWhile: 1,
    every: 1,
    filter: 1,
    find: 1,
    findFrom: 1,
    findIndex: 1,
    findIndexFrom: 1,
    findKey: 1,
    findLast: 1,
    findLastFrom: 1,
    findLastIndex: 1,
    findLastIndexFrom: 1,
    findLastKey: 1,
    flatMap: 1,
    flatMapDeep: 1,
    flatMapDepth: 1,
    forEach: 1,
    forEachRight: 1,
    forIn: 1,
    forInRight: 1,
    forOwn: 1,
    forOwnRight: 1,
    map: 1,
    mapKeys: 1,
    mapValues: 1,
    partition: 1,
    reduce: 2,
    reduceRight: 2,
    reject: 1,
    remove: 1,
    some: 1,
    takeRightWhile: 1,
    takeWhile: 1,
    times: 1,
    transform: 2
  }, e.iterateeRearg = {
    mapKeys: [1],
    reduceRight: [1, 0]
  }, e.methodRearg = {
    assignInAllWith: [1, 0],
    assignInWith: [1, 2, 0],
    assignAllWith: [1, 0],
    assignWith: [1, 2, 0],
    differenceBy: [1, 2, 0],
    differenceWith: [1, 2, 0],
    getOr: [2, 1, 0],
    intersectionBy: [1, 2, 0],
    intersectionWith: [1, 2, 0],
    isEqualWith: [1, 2, 0],
    isMatchWith: [2, 1, 0],
    mergeAllWith: [1, 0],
    mergeWith: [1, 2, 0],
    padChars: [2, 1, 0],
    padCharsEnd: [2, 1, 0],
    padCharsStart: [2, 1, 0],
    pullAllBy: [2, 1, 0],
    pullAllWith: [2, 1, 0],
    rangeStep: [1, 2, 0],
    rangeStepRight: [1, 2, 0],
    setWith: [3, 1, 2, 0],
    sortedIndexBy: [2, 1, 0],
    sortedLastIndexBy: [2, 1, 0],
    unionBy: [1, 2, 0],
    unionWith: [1, 2, 0],
    updateWith: [3, 1, 2, 0],
    xorBy: [1, 2, 0],
    xorWith: [1, 2, 0],
    zipWith: [1, 2, 0]
  }, e.methodSpread = {
    assignAll: { start: 0 },
    assignAllWith: { start: 0 },
    assignInAll: { start: 0 },
    assignInAllWith: { start: 0 },
    defaultsAll: { start: 0 },
    defaultsDeepAll: { start: 0 },
    invokeArgs: { start: 2 },
    invokeArgsMap: { start: 2 },
    mergeAll: { start: 0 },
    mergeAllWith: { start: 0 },
    partial: { start: 1 },
    partialRight: { start: 1 },
    without: { start: 1 },
    zipAll: { start: 0 }
  }, e.mutate = {
    array: {
      fill: !0,
      pull: !0,
      pullAll: !0,
      pullAllBy: !0,
      pullAllWith: !0,
      pullAt: !0,
      remove: !0,
      reverse: !0
    },
    object: {
      assign: !0,
      assignAll: !0,
      assignAllWith: !0,
      assignIn: !0,
      assignInAll: !0,
      assignInAllWith: !0,
      assignInWith: !0,
      assignWith: !0,
      defaults: !0,
      defaultsAll: !0,
      defaultsDeep: !0,
      defaultsDeepAll: !0,
      merge: !0,
      mergeAll: !0,
      mergeAllWith: !0,
      mergeWith: !0
    },
    set: {
      set: !0,
      setWith: !0,
      unset: !0,
      update: !0,
      updateWith: !0
    }
  }, e.realToAlias = function() {
    var t = Object.prototype.hasOwnProperty, r = e.aliasToReal, n = {};
    for (var a in r) {
      var i = r[a];
      t.call(n, i) ? n[i].push(a) : n[i] = [a];
    }
    return n;
  }(), e.remap = {
    assignAll: "assign",
    assignAllWith: "assignWith",
    assignInAll: "assignIn",
    assignInAllWith: "assignInWith",
    curryN: "curry",
    curryRightN: "curryRight",
    defaultsAll: "defaults",
    defaultsDeepAll: "defaultsDeep",
    findFrom: "find",
    findIndexFrom: "findIndex",
    findLastFrom: "findLast",
    findLastIndexFrom: "findLastIndex",
    getOr: "get",
    includesFrom: "includes",
    indexOfFrom: "indexOf",
    invokeArgs: "invoke",
    invokeArgsMap: "invokeMap",
    lastIndexOfFrom: "lastIndexOf",
    mergeAll: "merge",
    mergeAllWith: "mergeWith",
    padChars: "pad",
    padCharsEnd: "padEnd",
    padCharsStart: "padStart",
    propertyOf: "get",
    rangeStep: "range",
    rangeStepRight: "rangeRight",
    restFrom: "rest",
    spreadFrom: "spread",
    trimChars: "trim",
    trimCharsEnd: "trimEnd",
    trimCharsStart: "trimStart",
    zipAll: "zip"
  }, e.skipFixed = {
    castArray: !0,
    flow: !0,
    flowRight: !0,
    iteratee: !0,
    mixin: !0,
    rearg: !0,
    runInContext: !0
  }, e.skipRearg = {
    add: !0,
    assign: !0,
    assignIn: !0,
    bind: !0,
    bindKey: !0,
    concat: !0,
    difference: !0,
    divide: !0,
    eq: !0,
    gt: !0,
    gte: !0,
    isEqual: !0,
    lt: !0,
    lte: !0,
    matchesProperty: !0,
    merge: !0,
    multiply: !0,
    overArgs: !0,
    partial: !0,
    partialRight: !0,
    propertyOf: !0,
    random: !0,
    range: !0,
    rangeRight: !0,
    subtract: !0,
    zip: !0,
    zipObject: !0,
    zipObjectDeep: !0
  };
})(Ei);
var ut, cn;
function Ci() {
  return cn || (cn = 1, ut = {}), ut;
}
var x = Ei, uo = Ci(), ln = Array.prototype.push;
function co(e, t) {
  return t == 2 ? function(r, n) {
    return e.apply(void 0, arguments);
  } : function(r) {
    return e.apply(void 0, arguments);
  };
}
function ct(e, t) {
  return t == 2 ? function(r, n) {
    return e(r, n);
  } : function(r) {
    return e(r);
  };
}
function fn(e) {
  for (var t = e ? e.length : 0, r = Array(t); t--; )
    r[t] = e[t];
  return r;
}
function lo(e) {
  return function(t) {
    return e({}, t);
  };
}
function fo(e, t) {
  return function() {
    for (var r = arguments.length, n = r - 1, a = Array(r); r--; )
      a[r] = arguments[r];
    var i = a[t], s = a.slice(0, t);
    return i && ln.apply(s, i), t != n && ln.apply(s, a.slice(t + 1)), e.apply(this, s);
  };
}
function lt(e, t) {
  return function() {
    var r = arguments.length;
    if (r) {
      for (var n = Array(r); r--; )
        n[r] = arguments[r];
      var a = n[0] = t.apply(void 0, n);
      return e.apply(void 0, n), a;
    }
  };
}
function _r(e, t, r, n) {
  var a = typeof t == "function", i = t === Object(t);
  if (i && (n = r, r = t, t = void 0), r == null)
    throw new TypeError();
  n || (n = {});
  var s = {
    cap: "cap" in n ? n.cap : !0,
    curry: "curry" in n ? n.curry : !0,
    fixed: "fixed" in n ? n.fixed : !0,
    immutable: "immutable" in n ? n.immutable : !0,
    rearg: "rearg" in n ? n.rearg : !0
  }, o = a ? r : uo, c = "curry" in n && n.curry, u = "fixed" in n && n.fixed, f = "rearg" in n && n.rearg, p = a ? r.runInContext() : void 0, d = a ? r : {
    ary: e.ary,
    assign: e.assign,
    clone: e.clone,
    curry: e.curry,
    forEach: e.forEach,
    isArray: e.isArray,
    isError: e.isError,
    isFunction: e.isFunction,
    isWeakMap: e.isWeakMap,
    iteratee: e.iteratee,
    keys: e.keys,
    rearg: e.rearg,
    toInteger: e.toInteger,
    toPath: e.toPath
  }, g = d.ary, h = d.assign, m = d.clone, A = d.curry, b = d.forEach, S = d.isArray, D = d.isError, P = d.isFunction, N = d.isWeakMap, q = d.keys, L = d.rearg, C = d.toInteger, se = d.toPath, F = q(x.aryMethod), T = {
    castArray: function(_) {
      return function() {
        var y = arguments[0];
        return S(y) ? _(fn(y)) : _.apply(void 0, arguments);
      };
    },
    iteratee: function(_) {
      return function() {
        var y = arguments[0], v = arguments[1], O = _(y, v), R = O.length;
        return s.cap && typeof v == "number" ? (v = v > 2 ? v - 2 : 1, R && R <= v ? O : ct(O, v)) : O;
      };
    },
    mixin: function(_) {
      return function(y) {
        var v = this;
        if (!P(v))
          return _(v, Object(y));
        var O = [];
        return b(q(y), function(R) {
          P(y[R]) && O.push([R, v.prototype[R]]);
        }), _(v, Object(y)), b(O, function(R) {
          var j = R[1];
          P(j) ? v.prototype[R[0]] = j : delete v.prototype[R[0]];
        }), v;
      };
    },
    nthArg: function(_) {
      return function(y) {
        var v = y < 0 ? 1 : C(y) + 1;
        return A(_(y), v);
      };
    },
    rearg: function(_) {
      return function(y, v) {
        var O = v ? v.length : 0;
        return A(_(y, v), O);
      };
    },
    runInContext: function(_) {
      return function(y) {
        return _r(e, _(y), n);
      };
    }
  };
  function re(_, y) {
    if (s.cap) {
      var v = x.iterateeRearg[_];
      if (v)
        return to(y, v);
      var O = !a && x.iterateeAry[_];
      if (O)
        return eo(y, O);
    }
    return y;
  }
  function Y(_, y, v) {
    return c || s.curry && v > 1 ? A(y, v) : y;
  }
  function pe(_, y, v) {
    if (s.fixed && (u || !x.skipFixed[_])) {
      var O = x.methodSpread[_], R = O && O.start;
      return R === void 0 ? g(y, v) : fo(y, R);
    }
    return y;
  }
  function nn(_, y, v) {
    return s.rearg && v > 1 && (f || !x.skipRearg[_]) ? L(y, x.methodRearg[_] || x.aryRearg[v]) : y;
  }
  function Zs(_, y) {
    y = se(y);
    for (var v = -1, O = y.length, R = O - 1, j = m(Object(_)), z = j; z != null && ++v < O; ) {
      var U = y[v], K = z[U];
      K != null && !(P(K) || D(K) || N(K)) && (z[U] = m(v == R ? K : Object(K))), z = z[U];
    }
    return j;
  }
  function Qs(_) {
    return W.runInContext.convert(_)(void 0);
  }
  function an(_, y) {
    var v = x.aliasToReal[_] || _, O = x.remap[v] || v, R = n;
    return function(j) {
      var z = a ? p : d, U = a ? p[O] : y, K = h(h({}, R), j);
      return _r(z, v, U, K);
    };
  }
  function eo(_, y) {
    return sn(_, function(v) {
      return typeof v == "function" ? ct(v, y) : v;
    });
  }
  function to(_, y) {
    return sn(_, function(v) {
      var O = y.length;
      return co(L(ct(v, O), y), O);
    });
  }
  function sn(_, y) {
    return function() {
      var v = arguments.length;
      if (!v)
        return _();
      for (var O = Array(v); v--; )
        O[v] = arguments[v];
      var R = s.rearg ? 0 : v - 1;
      return O[R] = y(O[R]), _.apply(void 0, O);
    };
  }
  function on(_, y, v) {
    var O, R = x.aliasToReal[_] || _, j = y, z = T[R];
    return z ? j = z(y) : s.immutable && (x.mutate.array[R] ? j = lt(y, fn) : x.mutate.object[R] ? j = lt(y, lo(y)) : x.mutate.set[R] && (j = lt(y, Zs))), b(F, function(U) {
      return b(x.aryMethod[U], function(K) {
        if (R == K) {
          var un = x.methodSpread[R], ro = un && un.afterRearg;
          return O = ro ? pe(R, nn(R, j, U), U) : nn(R, pe(R, j, U), U), O = re(R, O), O = Y(R, O, U), !1;
        }
      }), !O;
    }), O || (O = j), O == y && (O = c ? A(O, 1) : function() {
      return y.apply(this, arguments);
    }), O.convert = an(R, y), O.placeholder = y.placeholder = v, O;
  }
  if (!i)
    return on(t, r, o);
  var W = r, he = [];
  return b(F, function(_) {
    b(x.aryMethod[_], function(y) {
      var v = W[x.remap[y] || y];
      v && he.push([y, on(y, v, W)]);
    });
  }), b(q(W), function(_) {
    var y = W[_];
    if (typeof y == "function") {
      for (var v = he.length; v--; )
        if (he[v][0] == _)
          return;
      y.convert = an(_, y), he.push([_, y]);
    }
  }), b(he, function(_) {
    W[_[0]] = _[1];
  }), W.convert = Qs, W.placeholder = W, b(q(W), function(_) {
    b(x.realToAlias[_] || [], function(y) {
      W[y] = W[_];
    });
  }), W;
}
var po = _r;
function ho(e) {
  return e;
}
var Ue = ho, go = typeof we == "object" && we && we.Object === Object && we, xi = go, mo = xi, yo = typeof self == "object" && self && self.Object === Object && self, vo = mo || yo || Function("return this")(), B = vo, _o = B, bo = _o.Symbol, ce = bo, pn = ce, Ii = Object.prototype, Ao = Ii.hasOwnProperty, Oo = Ii.toString, de = pn ? pn.toStringTag : void 0;
function $o(e) {
  var t = Ao.call(e, de), r = e[de];
  try {
    e[de] = void 0;
    var n = !0;
  } catch {
  }
  var a = Oo.call(e);
  return n && (t ? e[de] = r : delete e[de]), a;
}
var So = $o, Ro = Object.prototype, To = Ro.toString;
function wo(e) {
  return To.call(e);
}
var Eo = wo, hn = ce, Co = So, xo = Eo, Io = "[object Null]", Po = "[object Undefined]", dn = hn ? hn.toStringTag : void 0;
function Lo(e) {
  return e == null ? e === void 0 ? Po : Io : dn && dn in Object(e) ? Co(e) : xo(e);
}
var ae = Lo;
function Fo(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var k = Fo, Do = ae, jo = k, No = "[object AsyncFunction]", qo = "[object Function]", Bo = "[object GeneratorFunction]", Mo = "[object Proxy]";
function Wo(e) {
  if (!jo(e))
    return !1;
  var t = Do(e);
  return t == qo || t == Bo || t == No || t == Mo;
}
var He = Wo, Uo = B, Ho = Uo["__core-js_shared__"], Go = Ho, ft = Go, gn = function() {
  var e = /[^.]+$/.exec(ft && ft.keys && ft.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function ko(e) {
  return !!gn && gn in e;
}
var zo = ko, Ko = Function.prototype, Jo = Ko.toString;
function Vo(e) {
  if (e != null) {
    try {
      return Jo.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Pi = Vo, Yo = He, Xo = zo, Zo = k, Qo = Pi, eu = /[\\^$.*+?()[\]{}|]/g, tu = /^\[object .+?Constructor\]$/, ru = Function.prototype, nu = Object.prototype, au = ru.toString, iu = nu.hasOwnProperty, su = RegExp(
  "^" + au.call(iu).replace(eu, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function ou(e) {
  if (!Zo(e) || Xo(e))
    return !1;
  var t = Yo(e) ? su : tu;
  return t.test(Qo(e));
}
var uu = ou;
function cu(e, t) {
  return e == null ? void 0 : e[t];
}
var lu = cu, fu = uu, pu = lu;
function hu(e, t) {
  var r = pu(e, t);
  return fu(r) ? r : void 0;
}
var ie = hu, du = ie, gu = B, mu = du(gu, "WeakMap"), Li = mu, mn = Li, yu = mn && new mn(), Fi = yu, vu = Ue, yn = Fi, _u = yn ? function(e, t) {
  return yn.set(e, t), e;
} : vu, Di = _u, bu = k, vn = Object.create, Au = function() {
  function e() {
  }
  return function(t) {
    if (!bu(t))
      return {};
    if (vn)
      return vn(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}(), Ge = Au, Ou = Ge, $u = k;
function Su(e) {
  return function() {
    var t = arguments;
    switch (t.length) {
      case 0:
        return new e();
      case 1:
        return new e(t[0]);
      case 2:
        return new e(t[0], t[1]);
      case 3:
        return new e(t[0], t[1], t[2]);
      case 4:
        return new e(t[0], t[1], t[2], t[3]);
      case 5:
        return new e(t[0], t[1], t[2], t[3], t[4]);
      case 6:
        return new e(t[0], t[1], t[2], t[3], t[4], t[5]);
      case 7:
        return new e(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
    }
    var r = Ou(e.prototype), n = e.apply(r, t);
    return $u(n) ? n : r;
  };
}
var ke = Su, Ru = ke, Tu = B, wu = 1;
function Eu(e, t, r) {
  var n = t & wu, a = Ru(e);
  function i() {
    var s = this && this !== Tu && this instanceof i ? a : e;
    return s.apply(n ? r : this, arguments);
  }
  return i;
}
var Cu = Eu;
function xu(e, t, r) {
  switch (r.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, r[0]);
    case 2:
      return e.call(t, r[0], r[1]);
    case 3:
      return e.call(t, r[0], r[1], r[2]);
  }
  return e.apply(t, r);
}
var xr = xu, Iu = Math.max;
function Pu(e, t, r, n) {
  for (var a = -1, i = e.length, s = r.length, o = -1, c = t.length, u = Iu(i - s, 0), f = Array(c + u), p = !n; ++o < c; )
    f[o] = t[o];
  for (; ++a < s; )
    (p || a < i) && (f[r[a]] = e[a]);
  for (; u--; )
    f[o++] = e[a++];
  return f;
}
var ji = Pu, Lu = Math.max;
function Fu(e, t, r, n) {
  for (var a = -1, i = e.length, s = -1, o = r.length, c = -1, u = t.length, f = Lu(i - o, 0), p = Array(f + u), d = !n; ++a < f; )
    p[a] = e[a];
  for (var g = a; ++c < u; )
    p[g + c] = t[c];
  for (; ++s < o; )
    (d || a < i) && (p[g + r[s]] = e[a++]);
  return p;
}
var Ni = Fu;
function Du(e, t) {
  for (var r = e.length, n = 0; r--; )
    e[r] === t && ++n;
  return n;
}
var ju = Du;
function Nu() {
}
var Ir = Nu, qu = Ge, Bu = Ir, Mu = 4294967295;
function Fe(e) {
  this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = Mu, this.__views__ = [];
}
Fe.prototype = qu(Bu.prototype);
Fe.prototype.constructor = Fe;
var Pr = Fe;
function Wu() {
}
var Uu = Wu, _n = Fi, Hu = Uu, Gu = _n ? function(e) {
  return _n.get(e);
} : Hu, qi = Gu, ku = {}, zu = ku, bn = zu, Ku = Object.prototype, Ju = Ku.hasOwnProperty;
function Vu(e) {
  for (var t = e.name + "", r = bn[t], n = Ju.call(bn, t) ? r.length : 0; n--; ) {
    var a = r[n], i = a.func;
    if (i == null || i == e)
      return a.name;
  }
  return t;
}
var Yu = Vu, Xu = Ge, Zu = Ir;
function De(e, t) {
  this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = void 0;
}
De.prototype = Xu(Zu.prototype);
De.prototype.constructor = De;
var Bi = De, Qu = Array.isArray, M = Qu;
function ec(e) {
  return e != null && typeof e == "object";
}
var G = ec;
function tc(e, t) {
  var r = -1, n = e.length;
  for (t || (t = Array(n)); ++r < n; )
    t[r] = e[r];
  return t;
}
var ve = tc, rc = Pr, nc = Bi, ac = ve;
function ic(e) {
  if (e instanceof rc)
    return e.clone();
  var t = new nc(e.__wrapped__, e.__chain__);
  return t.__actions__ = ac(e.__actions__), t.__index__ = e.__index__, t.__values__ = e.__values__, t;
}
var sc = ic, oc = Pr, An = Bi, uc = Ir, cc = M, lc = G, fc = sc, pc = Object.prototype, hc = pc.hasOwnProperty;
function je(e) {
  if (lc(e) && !cc(e) && !(e instanceof oc)) {
    if (e instanceof An)
      return e;
    if (hc.call(e, "__wrapped__"))
      return fc(e);
  }
  return new An(e);
}
je.prototype = uc.prototype;
je.prototype.constructor = je;
var dc = je, gc = Pr, mc = qi, yc = Yu, vc = dc;
function _c(e) {
  var t = yc(e), r = vc[t];
  if (typeof r != "function" || !(t in gc.prototype))
    return !1;
  if (e === r)
    return !0;
  var n = mc(r);
  return !!n && e === n[0];
}
var bc = _c, Ac = 800, Oc = 16, $c = Date.now;
function Sc(e) {
  var t = 0, r = 0;
  return function() {
    var n = $c(), a = Oc - (n - r);
    if (r = n, a > 0) {
      if (++t >= Ac)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
var Mi = Sc, Rc = Di, Tc = Mi, wc = Tc(Rc), Wi = wc, Ec = /\{\n\/\* \[wrapped with (.+)\] \*/, Cc = /,? & /;
function xc(e) {
  var t = e.match(Ec);
  return t ? t[1].split(Cc) : [];
}
var Ic = xc, Pc = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;
function Lc(e, t) {
  var r = t.length;
  if (!r)
    return e;
  var n = r - 1;
  return t[n] = (r > 1 ? "& " : "") + t[n], t = t.join(r > 2 ? ", " : " "), e.replace(Pc, `{
/* [wrapped with ` + t + `] */
`);
}
var Fc = Lc;
function Dc(e) {
  return function() {
    return e;
  };
}
var jc = Dc, Nc = ie, qc = function() {
  try {
    var e = Nc(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), Ui = qc, Bc = jc, On = Ui, Mc = Ue, Wc = On ? function(e, t) {
  return On(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Bc(t),
    writable: !0
  });
} : Mc, Uc = Wc, Hc = Uc, Gc = Mi, kc = Gc(Hc), Lr = kc;
function zc(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var Fr = zc;
function Kc(e, t, r, n) {
  for (var a = e.length, i = r + (n ? 1 : -1); n ? i-- : ++i < a; )
    if (t(e[i], i, e))
      return i;
  return -1;
}
var Jc = Kc;
function Vc(e) {
  return e !== e;
}
var Yc = Vc;
function Xc(e, t, r) {
  for (var n = r - 1, a = e.length; ++n < a; )
    if (e[n] === t)
      return n;
  return -1;
}
var Zc = Xc, Qc = Jc, el = Yc, tl = Zc;
function rl(e, t, r) {
  return t === t ? tl(e, t, r) : Qc(e, el, r);
}
var nl = rl, al = nl;
function il(e, t) {
  var r = e == null ? 0 : e.length;
  return !!r && al(e, t, 0) > -1;
}
var sl = il, ol = Fr, ul = sl, cl = 1, ll = 2, fl = 8, pl = 16, hl = 32, dl = 64, gl = 128, ml = 256, yl = 512, vl = [
  ["ary", gl],
  ["bind", cl],
  ["bindKey", ll],
  ["curry", fl],
  ["curryRight", pl],
  ["flip", yl],
  ["partial", hl],
  ["partialRight", dl],
  ["rearg", ml]
];
function _l(e, t) {
  return ol(vl, function(r) {
    var n = "_." + r[0];
    t & r[1] && !ul(e, n) && e.push(n);
  }), e.sort();
}
var bl = _l, Al = Ic, Ol = Fc, $l = Lr, Sl = bl;
function Rl(e, t, r) {
  var n = t + "";
  return $l(e, Ol(n, Sl(Al(n), r)));
}
var Hi = Rl, Tl = bc, wl = Wi, El = Hi, Cl = 1, xl = 2, Il = 4, Pl = 8, $n = 32, Sn = 64;
function Ll(e, t, r, n, a, i, s, o, c, u) {
  var f = t & Pl, p = f ? s : void 0, d = f ? void 0 : s, g = f ? i : void 0, h = f ? void 0 : i;
  t |= f ? $n : Sn, t &= ~(f ? Sn : $n), t & Il || (t &= ~(Cl | xl));
  var m = [
    e,
    t,
    a,
    g,
    p,
    h,
    d,
    o,
    c,
    u
  ], A = r.apply(void 0, m);
  return Tl(e) && wl(A, m), A.placeholder = n, El(A, e, t);
}
var Gi = Ll;
function Fl(e) {
  var t = e;
  return t.placeholder;
}
var ki = Fl, Dl = 9007199254740991, jl = /^(?:0|[1-9]\d*)$/;
function Nl(e, t) {
  var r = typeof e;
  return t = t ?? Dl, !!t && (r == "number" || r != "symbol" && jl.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var ze = Nl, ql = ve, Bl = ze, Ml = Math.min;
function Wl(e, t) {
  for (var r = e.length, n = Ml(t.length, r), a = ql(e); n--; ) {
    var i = t[n];
    e[n] = Bl(i, r) ? a[i] : void 0;
  }
  return e;
}
var Ul = Wl, Rn = "__lodash_placeholder__";
function Hl(e, t) {
  for (var r = -1, n = e.length, a = 0, i = []; ++r < n; ) {
    var s = e[r];
    (s === t || s === Rn) && (e[r] = Rn, i[a++] = r);
  }
  return i;
}
var Dr = Hl, Gl = ji, kl = Ni, zl = ju, Tn = ke, Kl = Gi, Jl = ki, Vl = Ul, Yl = Dr, Xl = B, Zl = 1, Ql = 2, ef = 8, tf = 16, rf = 128, nf = 512;
function zi(e, t, r, n, a, i, s, o, c, u) {
  var f = t & rf, p = t & Zl, d = t & Ql, g = t & (ef | tf), h = t & nf, m = d ? void 0 : Tn(e);
  function A() {
    for (var b = arguments.length, S = Array(b), D = b; D--; )
      S[D] = arguments[D];
    if (g)
      var P = Jl(A), N = zl(S, P);
    if (n && (S = Gl(S, n, a, g)), i && (S = kl(S, i, s, g)), b -= N, g && b < u) {
      var q = Yl(S, P);
      return Kl(
        e,
        t,
        zi,
        A.placeholder,
        r,
        S,
        q,
        o,
        c,
        u - b
      );
    }
    var L = p ? r : this, C = d ? L[e] : e;
    return b = S.length, o ? S = Vl(S, o) : h && b > 1 && S.reverse(), f && c < b && (S.length = c), this && this !== Xl && this instanceof A && (C = m || Tn(C)), C.apply(L, S);
  }
  return A;
}
var Ki = zi, af = xr, sf = ke, of = Ki, uf = Gi, cf = ki, lf = Dr, ff = B;
function pf(e, t, r) {
  var n = sf(e);
  function a() {
    for (var i = arguments.length, s = Array(i), o = i, c = cf(a); o--; )
      s[o] = arguments[o];
    var u = i < 3 && s[0] !== c && s[i - 1] !== c ? [] : lf(s, c);
    if (i -= u.length, i < r)
      return uf(
        e,
        t,
        of,
        a.placeholder,
        void 0,
        s,
        u,
        void 0,
        void 0,
        r - i
      );
    var f = this && this !== ff && this instanceof a ? n : e;
    return af(f, this, s);
  }
  return a;
}
var hf = pf, df = xr, gf = ke, mf = B, yf = 1;
function vf(e, t, r, n) {
  var a = t & yf, i = gf(e);
  function s() {
    for (var o = -1, c = arguments.length, u = -1, f = n.length, p = Array(f + c), d = this && this !== mf && this instanceof s ? i : e; ++u < f; )
      p[u] = n[u];
    for (; c--; )
      p[u++] = arguments[++o];
    return df(d, a ? r : this, p);
  }
  return s;
}
var _f = vf, bf = ji, Af = Ni, wn = Dr, En = "__lodash_placeholder__", pt = 1, Of = 2, $f = 4, Cn = 8, ge = 128, xn = 256, Sf = Math.min;
function Rf(e, t) {
  var r = e[1], n = t[1], a = r | n, i = a < (pt | Of | ge), s = n == ge && r == Cn || n == ge && r == xn && e[7].length <= t[8] || n == (ge | xn) && t[7].length <= t[8] && r == Cn;
  if (!(i || s))
    return e;
  n & pt && (e[2] = t[2], a |= r & pt ? 0 : $f);
  var o = t[3];
  if (o) {
    var c = e[3];
    e[3] = c ? bf(c, o, t[4]) : o, e[4] = c ? wn(e[3], En) : t[4];
  }
  return o = t[5], o && (c = e[5], e[5] = c ? Af(c, o, t[6]) : o, e[6] = c ? wn(e[5], En) : t[6]), o = t[7], o && (e[7] = o), n & ge && (e[8] = e[8] == null ? t[8] : Sf(e[8], t[8])), e[9] == null && (e[9] = t[9]), e[0] = t[0], e[1] = a, e;
}
var Tf = Rf, wf = /\s/;
function Ef(e) {
  for (var t = e.length; t-- && wf.test(e.charAt(t)); )
    ;
  return t;
}
var Cf = Ef, xf = Cf, If = /^\s+/;
function Pf(e) {
  return e && e.slice(0, xf(e) + 1).replace(If, "");
}
var Lf = Pf, Ff = ae, Df = G, jf = "[object Symbol]";
function Nf(e) {
  return typeof e == "symbol" || Df(e) && Ff(e) == jf;
}
var _e = Nf, qf = Lf, In = k, Bf = _e, Pn = 0 / 0, Mf = /^[-+]0x[0-9a-f]+$/i, Wf = /^0b[01]+$/i, Uf = /^0o[0-7]+$/i, Hf = parseInt;
function Gf(e) {
  if (typeof e == "number")
    return e;
  if (Bf(e))
    return Pn;
  if (In(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = In(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = qf(e);
  var r = Wf.test(e);
  return r || Uf.test(e) ? Hf(e.slice(2), r ? 2 : 8) : Mf.test(e) ? Pn : +e;
}
var kf = Gf, zf = kf, Ln = 1 / 0, Kf = 17976931348623157e292;
function Jf(e) {
  if (!e)
    return e === 0 ? e : 0;
  if (e = zf(e), e === Ln || e === -Ln) {
    var t = e < 0 ? -1 : 1;
    return t * Kf;
  }
  return e === e ? e : 0;
}
var Vf = Jf, Yf = Vf;
function Xf(e) {
  var t = Yf(e), r = t % 1;
  return t === t ? r ? t - r : t : 0;
}
var Ji = Xf, Zf = Di, Qf = Cu, ep = hf, tp = Ki, rp = _f, np = qi, ap = Tf, ip = Wi, sp = Hi, Fn = Ji, op = "Expected a function", Dn = 1, up = 2, ht = 8, dt = 16, gt = 32, jn = 64, Nn = Math.max;
function cp(e, t, r, n, a, i, s, o) {
  var c = t & up;
  if (!c && typeof e != "function")
    throw new TypeError(op);
  var u = n ? n.length : 0;
  if (u || (t &= ~(gt | jn), n = a = void 0), s = s === void 0 ? s : Nn(Fn(s), 0), o = o === void 0 ? o : Fn(o), u -= a ? a.length : 0, t & jn) {
    var f = n, p = a;
    n = a = void 0;
  }
  var d = c ? void 0 : np(e), g = [
    e,
    t,
    r,
    n,
    a,
    f,
    p,
    i,
    s,
    o
  ];
  if (d && ap(g, d), e = g[0], t = g[1], r = g[2], n = g[3], a = g[4], o = g[9] = g[9] === void 0 ? c ? 0 : e.length : Nn(g[9] - u, 0), !o && t & (ht | dt) && (t &= ~(ht | dt)), !t || t == Dn)
    var h = Qf(e, t, r);
  else
    t == ht || t == dt ? h = ep(e, t, o) : (t == gt || t == (Dn | gt)) && !a.length ? h = rp(e, t, r, n) : h = tp.apply(void 0, g);
  var m = d ? Zf : ip;
  return sp(m(h, g), e, t);
}
var jr = cp, lp = jr, fp = 128;
function pp(e, t, r) {
  return t = r ? void 0 : t, t = e && t == null ? e.length : t, lp(e, fp, void 0, void 0, void 0, void 0, t);
}
var hp = pp, qn = Ui;
function dp(e, t, r) {
  t == "__proto__" && qn ? qn(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var Nr = dp, mt, Bn;
function be() {
  if (Bn)
    return mt;
  Bn = 1;
  function e(t, r) {
    return t === r || t !== t && r !== r;
  }
  return mt = e, mt;
}
var gp = Nr, mp = be(), yp = Object.prototype, vp = yp.hasOwnProperty;
function _p(e, t, r) {
  var n = e[t];
  (!(vp.call(e, t) && mp(n, r)) || r === void 0 && !(t in e)) && gp(e, t, r);
}
var Vi = _p, bp = Vi, Ap = Nr;
function Op(e, t, r, n) {
  var a = !r;
  r || (r = {});
  for (var i = -1, s = t.length; ++i < s; ) {
    var o = t[i], c = n ? n(r[o], e[o], o, r, e) : void 0;
    c === void 0 && (c = e[o]), a ? Ap(r, o, c) : bp(r, o, c);
  }
  return r;
}
var Ae = Op;
function $p(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var Sp = $p, yt, Mn;
function Rp() {
  if (Mn)
    return yt;
  Mn = 1;
  var e = ae, t = G, r = "[object Arguments]";
  function n(a) {
    return t(a) && e(a) == r;
  }
  return yt = n, yt;
}
var vt, Wn;
function Ke() {
  if (Wn)
    return vt;
  Wn = 1;
  var e = Rp(), t = G, r = Object.prototype, n = r.hasOwnProperty, a = r.propertyIsEnumerable, i = e(function() {
    return arguments;
  }()) ? e : function(s) {
    return t(s) && n.call(s, "callee") && !a.call(s, "callee");
  };
  return vt = i, vt;
}
var Ne = { exports: {} };
function Tp() {
  return !1;
}
var wp = Tp;
Ne.exports;
(function(e, t) {
  var r = B, n = wp, a = t && !t.nodeType && t, i = a && !0 && e && !e.nodeType && e, s = i && i.exports === a, o = s ? r.Buffer : void 0, c = o ? o.isBuffer : void 0, u = c || n;
  e.exports = u;
})(Ne, Ne.exports);
var Je = Ne.exports, Ep = 9007199254740991;
function Cp(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Ep;
}
var qr = Cp, _t, Un;
function xp() {
  if (Un)
    return _t;
  Un = 1;
  var e = ae, t = qr, r = G, n = "[object Arguments]", a = "[object Array]", i = "[object Boolean]", s = "[object Date]", o = "[object Error]", c = "[object Function]", u = "[object Map]", f = "[object Number]", p = "[object Object]", d = "[object RegExp]", g = "[object Set]", h = "[object String]", m = "[object WeakMap]", A = "[object ArrayBuffer]", b = "[object DataView]", S = "[object Float32Array]", D = "[object Float64Array]", P = "[object Int8Array]", N = "[object Int16Array]", q = "[object Int32Array]", L = "[object Uint8Array]", C = "[object Uint8ClampedArray]", se = "[object Uint16Array]", F = "[object Uint32Array]", T = {};
  T[S] = T[D] = T[P] = T[N] = T[q] = T[L] = T[C] = T[se] = T[F] = !0, T[n] = T[a] = T[A] = T[i] = T[b] = T[s] = T[o] = T[c] = T[u] = T[f] = T[p] = T[d] = T[g] = T[h] = T[m] = !1;
  function re(Y) {
    return r(Y) && t(Y.length) && !!T[e(Y)];
  }
  return _t = re, _t;
}
function Ip(e) {
  return function(t) {
    return e(t);
  };
}
var Br = Ip, qe = { exports: {} };
qe.exports;
(function(e, t) {
  var r = xi, n = t && !t.nodeType && t, a = n && !0 && e && !e.nodeType && e, i = a && a.exports === n, s = i && r.process, o = function() {
    try {
      var c = a && a.require && a.require("util").types;
      return c || s && s.binding && s.binding("util");
    } catch {
    }
  }();
  e.exports = o;
})(qe, qe.exports);
var Mr = qe.exports, bt, Hn;
function Wr() {
  if (Hn)
    return bt;
  Hn = 1;
  var e = xp(), t = Br, r = Mr, n = r && r.isTypedArray, a = n ? t(n) : e;
  return bt = a, bt;
}
var Pp = Sp, Lp = Ke(), Fp = M, Dp = Je, jp = ze, Np = Wr(), qp = Object.prototype, Bp = qp.hasOwnProperty;
function Mp(e, t) {
  var r = Fp(e), n = !r && Lp(e), a = !r && !n && Dp(e), i = !r && !n && !a && Np(e), s = r || n || a || i, o = s ? Pp(e.length, String) : [], c = o.length;
  for (var u in e)
    (t || Bp.call(e, u)) && !(s && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    a && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    jp(u, c))) && o.push(u);
  return o;
}
var Yi = Mp, Wp = Object.prototype;
function Up(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || Wp;
  return e === r;
}
var Ur = Up;
function Hp(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var Xi = Hp, Gp = Xi, kp = Gp(Object.keys, Object), zp = kp, Kp = Ur, Jp = zp, Vp = Object.prototype, Yp = Vp.hasOwnProperty;
function Xp(e) {
  if (!Kp(e))
    return Jp(e);
  var t = [];
  for (var r in Object(e))
    Yp.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
var Zi = Xp, Zp = He, Qp = qr;
function eh(e) {
  return e != null && Qp(e.length) && !Zp(e);
}
var Ve = eh, th = Yi, rh = Zi, nh = Ve;
function ah(e) {
  return nh(e) ? th(e) : rh(e);
}
var Ye = ah, ih = Ae, sh = Ye;
function oh(e, t) {
  return e && ih(t, sh(t), e);
}
var Qi = oh, At, Gn;
function uh() {
  if (Gn)
    return At;
  Gn = 1;
  function e() {
    this.__data__ = [], this.size = 0;
  }
  return At = e, At;
}
var Ot, kn;
function Xe() {
  if (kn)
    return Ot;
  kn = 1;
  var e = be();
  function t(r, n) {
    for (var a = r.length; a--; )
      if (e(r[a][0], n))
        return a;
    return -1;
  }
  return Ot = t, Ot;
}
var $t, zn;
function ch() {
  if (zn)
    return $t;
  zn = 1;
  var e = Xe(), t = Array.prototype, r = t.splice;
  function n(a) {
    var i = this.__data__, s = e(i, a);
    if (s < 0)
      return !1;
    var o = i.length - 1;
    return s == o ? i.pop() : r.call(i, s, 1), --this.size, !0;
  }
  return $t = n, $t;
}
var St, Kn;
function lh() {
  if (Kn)
    return St;
  Kn = 1;
  var e = Xe();
  function t(r) {
    var n = this.__data__, a = e(n, r);
    return a < 0 ? void 0 : n[a][1];
  }
  return St = t, St;
}
var Rt, Jn;
function fh() {
  if (Jn)
    return Rt;
  Jn = 1;
  var e = Xe();
  function t(r) {
    return e(this.__data__, r) > -1;
  }
  return Rt = t, Rt;
}
var Tt, Vn;
function ph() {
  if (Vn)
    return Tt;
  Vn = 1;
  var e = Xe();
  function t(r, n) {
    var a = this.__data__, i = e(a, r);
    return i < 0 ? (++this.size, a.push([r, n])) : a[i][1] = n, this;
  }
  return Tt = t, Tt;
}
var wt, Yn;
function Ze() {
  if (Yn)
    return wt;
  Yn = 1;
  var e = uh(), t = ch(), r = lh(), n = fh(), a = ph();
  function i(s) {
    var o = -1, c = s == null ? 0 : s.length;
    for (this.clear(); ++o < c; ) {
      var u = s[o];
      this.set(u[0], u[1]);
    }
  }
  return i.prototype.clear = e, i.prototype.delete = t, i.prototype.get = r, i.prototype.has = n, i.prototype.set = a, wt = i, wt;
}
var Et, Xn;
function hh() {
  if (Xn)
    return Et;
  Xn = 1;
  var e = Ze();
  function t() {
    this.__data__ = new e(), this.size = 0;
  }
  return Et = t, Et;
}
var Ct, Zn;
function dh() {
  if (Zn)
    return Ct;
  Zn = 1;
  function e(t) {
    var r = this.__data__, n = r.delete(t);
    return this.size = r.size, n;
  }
  return Ct = e, Ct;
}
var xt, Qn;
function gh() {
  if (Qn)
    return xt;
  Qn = 1;
  function e(t) {
    return this.__data__.get(t);
  }
  return xt = e, xt;
}
var It, ea;
function mh() {
  if (ea)
    return It;
  ea = 1;
  function e(t) {
    return this.__data__.has(t);
  }
  return It = e, It;
}
var yh = ie, vh = B, _h = yh(vh, "Map"), Hr = _h, Pt, ta;
function Qe() {
  if (ta)
    return Pt;
  ta = 1;
  var e = ie, t = e(Object, "create");
  return Pt = t, Pt;
}
var Lt, ra;
function bh() {
  if (ra)
    return Lt;
  ra = 1;
  var e = Qe();
  function t() {
    this.__data__ = e ? e(null) : {}, this.size = 0;
  }
  return Lt = t, Lt;
}
var Ft, na;
function Ah() {
  if (na)
    return Ft;
  na = 1;
  function e(t) {
    var r = this.has(t) && delete this.__data__[t];
    return this.size -= r ? 1 : 0, r;
  }
  return Ft = e, Ft;
}
var Dt, aa;
function Oh() {
  if (aa)
    return Dt;
  aa = 1;
  var e = Qe(), t = "__lodash_hash_undefined__", r = Object.prototype, n = r.hasOwnProperty;
  function a(i) {
    var s = this.__data__;
    if (e) {
      var o = s[i];
      return o === t ? void 0 : o;
    }
    return n.call(s, i) ? s[i] : void 0;
  }
  return Dt = a, Dt;
}
var jt, ia;
function $h() {
  if (ia)
    return jt;
  ia = 1;
  var e = Qe(), t = Object.prototype, r = t.hasOwnProperty;
  function n(a) {
    var i = this.__data__;
    return e ? i[a] !== void 0 : r.call(i, a);
  }
  return jt = n, jt;
}
var Nt, sa;
function Sh() {
  if (sa)
    return Nt;
  sa = 1;
  var e = Qe(), t = "__lodash_hash_undefined__";
  function r(n, a) {
    var i = this.__data__;
    return this.size += this.has(n) ? 0 : 1, i[n] = e && a === void 0 ? t : a, this;
  }
  return Nt = r, Nt;
}
var qt, oa;
function Rh() {
  if (oa)
    return qt;
  oa = 1;
  var e = bh(), t = Ah(), r = Oh(), n = $h(), a = Sh();
  function i(s) {
    var o = -1, c = s == null ? 0 : s.length;
    for (this.clear(); ++o < c; ) {
      var u = s[o];
      this.set(u[0], u[1]);
    }
  }
  return i.prototype.clear = e, i.prototype.delete = t, i.prototype.get = r, i.prototype.has = n, i.prototype.set = a, qt = i, qt;
}
var Bt, ua;
function Th() {
  if (ua)
    return Bt;
  ua = 1;
  var e = Rh(), t = Ze(), r = Hr;
  function n() {
    this.size = 0, this.__data__ = {
      hash: new e(),
      map: new (r || t)(),
      string: new e()
    };
  }
  return Bt = n, Bt;
}
var Mt, ca;
function wh() {
  if (ca)
    return Mt;
  ca = 1;
  function e(t) {
    var r = typeof t;
    return r == "string" || r == "number" || r == "symbol" || r == "boolean" ? t !== "__proto__" : t === null;
  }
  return Mt = e, Mt;
}
var Wt, la;
function et() {
  if (la)
    return Wt;
  la = 1;
  var e = wh();
  function t(r, n) {
    var a = r.__data__;
    return e(n) ? a[typeof n == "string" ? "string" : "hash"] : a.map;
  }
  return Wt = t, Wt;
}
var Ut, fa;
function Eh() {
  if (fa)
    return Ut;
  fa = 1;
  var e = et();
  function t(r) {
    var n = e(this, r).delete(r);
    return this.size -= n ? 1 : 0, n;
  }
  return Ut = t, Ut;
}
var Ht, pa;
function Ch() {
  if (pa)
    return Ht;
  pa = 1;
  var e = et();
  function t(r) {
    return e(this, r).get(r);
  }
  return Ht = t, Ht;
}
var Gt, ha;
function xh() {
  if (ha)
    return Gt;
  ha = 1;
  var e = et();
  function t(r) {
    return e(this, r).has(r);
  }
  return Gt = t, Gt;
}
var kt, da;
function Ih() {
  if (da)
    return kt;
  da = 1;
  var e = et();
  function t(r, n) {
    var a = e(this, r), i = a.size;
    return a.set(r, n), this.size += a.size == i ? 0 : 1, this;
  }
  return kt = t, kt;
}
var zt, ga;
function Gr() {
  if (ga)
    return zt;
  ga = 1;
  var e = Th(), t = Eh(), r = Ch(), n = xh(), a = Ih();
  function i(s) {
    var o = -1, c = s == null ? 0 : s.length;
    for (this.clear(); ++o < c; ) {
      var u = s[o];
      this.set(u[0], u[1]);
    }
  }
  return i.prototype.clear = e, i.prototype.delete = t, i.prototype.get = r, i.prototype.has = n, i.prototype.set = a, zt = i, zt;
}
var Kt, ma;
function Ph() {
  if (ma)
    return Kt;
  ma = 1;
  var e = Ze(), t = Hr, r = Gr(), n = 200;
  function a(i, s) {
    var o = this.__data__;
    if (o instanceof e) {
      var c = o.__data__;
      if (!t || c.length < n - 1)
        return c.push([i, s]), this.size = ++o.size, this;
      o = this.__data__ = new r(c);
    }
    return o.set(i, s), this.size = o.size, this;
  }
  return Kt = a, Kt;
}
var Jt, ya;
function tt() {
  if (ya)
    return Jt;
  ya = 1;
  var e = Ze(), t = hh(), r = dh(), n = gh(), a = mh(), i = Ph();
  function s(o) {
    var c = this.__data__ = new e(o);
    this.size = c.size;
  }
  return s.prototype.clear = t, s.prototype.delete = r, s.prototype.get = n, s.prototype.has = a, s.prototype.set = i, Jt = s, Jt;
}
var Vt, va;
function Lh() {
  if (va)
    return Vt;
  va = 1;
  function e(t) {
    var r = [];
    if (t != null)
      for (var n in Object(t))
        r.push(n);
    return r;
  }
  return Vt = e, Vt;
}
var Yt, _a;
function Fh() {
  if (_a)
    return Yt;
  _a = 1;
  var e = k, t = Ur, r = Lh(), n = Object.prototype, a = n.hasOwnProperty;
  function i(s) {
    if (!e(s))
      return r(s);
    var o = t(s), c = [];
    for (var u in s)
      u == "constructor" && (o || !a.call(s, u)) || c.push(u);
    return c;
  }
  return Yt = i, Yt;
}
var Xt, ba;
function Oe() {
  if (ba)
    return Xt;
  ba = 1;
  var e = Yi, t = Fh(), r = Ve;
  function n(a) {
    return r(a) ? e(a, !0) : t(a);
  }
  return Xt = n, Xt;
}
var Dh = Ae, jh = Oe();
function Nh(e, t) {
  return e && Dh(t, jh(t), e);
}
var qh = Nh, Be = { exports: {} };
Be.exports;
(function(e, t) {
  var r = B, n = t && !t.nodeType && t, a = n && !0 && e && !e.nodeType && e, i = a && a.exports === n, s = i ? r.Buffer : void 0, o = s ? s.allocUnsafe : void 0;
  function c(u, f) {
    if (f)
      return u.slice();
    var p = u.length, d = o ? o(p) : new u.constructor(p);
    return u.copy(d), d;
  }
  e.exports = c;
})(Be, Be.exports);
var es = Be.exports;
function Bh(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, a = 0, i = []; ++r < n; ) {
    var s = e[r];
    t(s, r, e) && (i[a++] = s);
  }
  return i;
}
var Mh = Bh;
function Wh() {
  return [];
}
var ts = Wh, Uh = Mh, Hh = ts, Gh = Object.prototype, kh = Gh.propertyIsEnumerable, Aa = Object.getOwnPropertySymbols, zh = Aa ? function(e) {
  return e == null ? [] : (e = Object(e), Uh(Aa(e), function(t) {
    return kh.call(e, t);
  }));
} : Hh, kr = zh, Kh = Ae, Jh = kr;
function Vh(e, t) {
  return Kh(e, Jh(e), t);
}
var Yh = Vh;
function Xh(e, t) {
  for (var r = -1, n = t.length, a = e.length; ++r < n; )
    e[a + r] = t[r];
  return e;
}
var zr = Xh, Zh = Xi, Qh = Zh(Object.getPrototypeOf, Object), Kr = Qh, ed = zr, td = Kr, rd = kr, nd = ts, ad = Object.getOwnPropertySymbols, id = ad ? function(e) {
  for (var t = []; e; )
    ed(t, rd(e)), e = td(e);
  return t;
} : nd, rs = id, sd = Ae, od = rs;
function ud(e, t) {
  return sd(e, od(e), t);
}
var cd = ud, ld = zr, fd = M;
function pd(e, t, r) {
  var n = t(e);
  return fd(e) ? n : ld(n, r(e));
}
var ns = pd, hd = ns, dd = kr, gd = Ye;
function md(e) {
  return hd(e, gd, dd);
}
var as = md, yd = ns, vd = rs, _d = Oe();
function bd(e) {
  return yd(e, _d, vd);
}
var Ad = bd, Od = ie, $d = B, Sd = Od($d, "DataView"), Rd = Sd, Td = ie, wd = B, Ed = Td(wd, "Promise"), Cd = Ed, xd = ie, Id = B, Pd = xd(Id, "Set"), Ld = Pd, br = Rd, Ar = Hr, Or = Cd, $r = Ld, Sr = Li, is = ae, le = Pi, Oa = "[object Map]", Fd = "[object Object]", $a = "[object Promise]", Sa = "[object Set]", Ra = "[object WeakMap]", Ta = "[object DataView]", Dd = le(br), jd = le(Ar), Nd = le(Or), qd = le($r), Bd = le(Sr), ne = is;
(br && ne(new br(new ArrayBuffer(1))) != Ta || Ar && ne(new Ar()) != Oa || Or && ne(Or.resolve()) != $a || $r && ne(new $r()) != Sa || Sr && ne(new Sr()) != Ra) && (ne = function(e) {
  var t = is(e), r = t == Fd ? e.constructor : void 0, n = r ? le(r) : "";
  if (n)
    switch (n) {
      case Dd:
        return Ta;
      case jd:
        return Oa;
      case Nd:
        return $a;
      case qd:
        return Sa;
      case Bd:
        return Ra;
    }
  return t;
});
var $e = ne, Md = Object.prototype, Wd = Md.hasOwnProperty;
function Ud(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && Wd.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
var Hd = Ud, Gd = B, kd = Gd.Uint8Array, ss = kd, wa = ss;
function zd(e) {
  var t = new e.constructor(e.byteLength);
  return new wa(t).set(new wa(e)), t;
}
var Jr = zd, Kd = Jr;
function Jd(e, t) {
  var r = t ? Kd(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var Vd = Jd, Yd = /\w*$/;
function Xd(e) {
  var t = new e.constructor(e.source, Yd.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var Zd = Xd, Ea = ce, Ca = Ea ? Ea.prototype : void 0, xa = Ca ? Ca.valueOf : void 0;
function Qd(e) {
  return xa ? Object(xa.call(e)) : {};
}
var eg = Qd, Zt, Ia;
function os() {
  if (Ia)
    return Zt;
  Ia = 1;
  var e = Jr;
  function t(r, n) {
    var a = n ? e(r.buffer) : r.buffer;
    return new r.constructor(a, r.byteOffset, r.length);
  }
  return Zt = t, Zt;
}
var tg = Jr, rg = Vd, ng = Zd, ag = eg, ig = os(), sg = "[object Boolean]", og = "[object Date]", ug = "[object Map]", cg = "[object Number]", lg = "[object RegExp]", fg = "[object Set]", pg = "[object String]", hg = "[object Symbol]", dg = "[object ArrayBuffer]", gg = "[object DataView]", mg = "[object Float32Array]", yg = "[object Float64Array]", vg = "[object Int8Array]", _g = "[object Int16Array]", bg = "[object Int32Array]", Ag = "[object Uint8Array]", Og = "[object Uint8ClampedArray]", $g = "[object Uint16Array]", Sg = "[object Uint32Array]";
function Rg(e, t, r) {
  var n = e.constructor;
  switch (t) {
    case dg:
      return tg(e);
    case sg:
    case og:
      return new n(+e);
    case gg:
      return rg(e, r);
    case mg:
    case yg:
    case vg:
    case _g:
    case bg:
    case Ag:
    case Og:
    case $g:
    case Sg:
      return ig(e, r);
    case ug:
      return new n();
    case cg:
    case pg:
      return new n(e);
    case lg:
      return ng(e);
    case fg:
      return new n();
    case hg:
      return ag(e);
  }
}
var Tg = Rg, wg = Ge, Eg = Kr, Cg = Ur;
function xg(e) {
  return typeof e.constructor == "function" && !Cg(e) ? wg(Eg(e)) : {};
}
var us = xg, Ig = $e, Pg = G, Lg = "[object Map]";
function Fg(e) {
  return Pg(e) && Ig(e) == Lg;
}
var Dg = Fg, jg = Dg, Ng = Br, Pa = Mr, La = Pa && Pa.isMap, qg = La ? Ng(La) : jg, Bg = qg, Mg = $e, Wg = G, Ug = "[object Set]";
function Hg(e) {
  return Wg(e) && Mg(e) == Ug;
}
var Gg = Hg, kg = Gg, zg = Br, Fa = Mr, Da = Fa && Fa.isSet, Kg = Da ? zg(Da) : kg, Jg = Kg, Vg = tt(), Yg = Fr, Xg = Vi, Zg = Qi, Qg = qh, em = es, tm = ve, rm = Yh, nm = cd, am = as, im = Ad, sm = $e, om = Hd, um = Tg, cm = us, lm = M, fm = Je, pm = Bg, hm = k, dm = Jg, gm = Ye, mm = Oe(), ym = 1, vm = 2, _m = 4, cs = "[object Arguments]", bm = "[object Array]", Am = "[object Boolean]", Om = "[object Date]", $m = "[object Error]", ls = "[object Function]", Sm = "[object GeneratorFunction]", Rm = "[object Map]", Tm = "[object Number]", fs = "[object Object]", wm = "[object RegExp]", Em = "[object Set]", Cm = "[object String]", xm = "[object Symbol]", Im = "[object WeakMap]", Pm = "[object ArrayBuffer]", Lm = "[object DataView]", Fm = "[object Float32Array]", Dm = "[object Float64Array]", jm = "[object Int8Array]", Nm = "[object Int16Array]", qm = "[object Int32Array]", Bm = "[object Uint8Array]", Mm = "[object Uint8ClampedArray]", Wm = "[object Uint16Array]", Um = "[object Uint32Array]", E = {};
E[cs] = E[bm] = E[Pm] = E[Lm] = E[Am] = E[Om] = E[Fm] = E[Dm] = E[jm] = E[Nm] = E[qm] = E[Rm] = E[Tm] = E[fs] = E[wm] = E[Em] = E[Cm] = E[xm] = E[Bm] = E[Mm] = E[Wm] = E[Um] = !0;
E[$m] = E[ls] = E[Im] = !1;
function Ce(e, t, r, n, a, i) {
  var s, o = t & ym, c = t & vm, u = t & _m;
  if (r && (s = a ? r(e, n, a, i) : r(e)), s !== void 0)
    return s;
  if (!hm(e))
    return e;
  var f = lm(e);
  if (f) {
    if (s = om(e), !o)
      return tm(e, s);
  } else {
    var p = sm(e), d = p == ls || p == Sm;
    if (fm(e))
      return em(e, o);
    if (p == fs || p == cs || d && !a) {
      if (s = c || d ? {} : cm(e), !o)
        return c ? nm(e, Qg(s, e)) : rm(e, Zg(s, e));
    } else {
      if (!E[p])
        return a ? e : {};
      s = um(e, p, o);
    }
  }
  i || (i = new Vg());
  var g = i.get(e);
  if (g)
    return g;
  i.set(e, s), dm(e) ? e.forEach(function(A) {
    s.add(Ce(A, t, r, A, e, i));
  }) : pm(e) && e.forEach(function(A, b) {
    s.set(b, Ce(A, t, r, b, e, i));
  });
  var h = u ? c ? im : am : c ? mm : gm, m = f ? void 0 : h(e);
  return Yg(m || e, function(A, b) {
    m && (b = A, A = e[b]), Xg(s, b, Ce(A, t, r, b, e, i));
  }), s;
}
var ps = Ce, Hm = ps, Gm = 4;
function km(e) {
  return Hm(e, Gm);
}
var zm = km, Km = jr, Jm = 8;
function Vr(e, t, r) {
  t = r ? void 0 : t;
  var n = Km(e, Jm, void 0, void 0, void 0, void 0, void 0, t);
  return n.placeholder = Vr.placeholder, n;
}
Vr.placeholder = {};
var Vm = Vr, Ym = ae, Xm = Kr, Zm = G, Qm = "[object Object]", ey = Function.prototype, ty = Object.prototype, hs = ey.toString, ry = ty.hasOwnProperty, ny = hs.call(Object);
function ay(e) {
  if (!Zm(e) || Ym(e) != Qm)
    return !1;
  var t = Xm(e);
  if (t === null)
    return !0;
  var r = ry.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r instanceof r && hs.call(r) == ny;
}
var ds = ay, iy = ae, sy = G, oy = ds, uy = "[object DOMException]", cy = "[object Error]";
function ly(e) {
  if (!sy(e))
    return !1;
  var t = iy(e);
  return t == cy || t == uy || typeof e.message == "string" && typeof e.name == "string" && !oy(e);
}
var fy = ly, py = $e, hy = G, dy = "[object WeakMap]";
function gy(e) {
  return hy(e) && py(e) == dy;
}
var my = gy, yy = "__lodash_hash_undefined__";
function vy(e) {
  return this.__data__.set(e, yy), this;
}
var _y = vy;
function by(e) {
  return this.__data__.has(e);
}
var Ay = by, Oy = Gr(), $y = _y, Sy = Ay;
function Me(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.__data__ = new Oy(); ++t < r; )
    this.add(e[t]);
}
Me.prototype.add = Me.prototype.push = $y;
Me.prototype.has = Sy;
var Ry = Me;
function Ty(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (t(e[r], r, e))
      return !0;
  return !1;
}
var wy = Ty;
function Ey(e, t) {
  return e.has(t);
}
var Cy = Ey, xy = Ry, Iy = wy, Py = Cy, Ly = 1, Fy = 2;
function Dy(e, t, r, n, a, i) {
  var s = r & Ly, o = e.length, c = t.length;
  if (o != c && !(s && c > o))
    return !1;
  var u = i.get(e), f = i.get(t);
  if (u && f)
    return u == t && f == e;
  var p = -1, d = !0, g = r & Fy ? new xy() : void 0;
  for (i.set(e, t), i.set(t, e); ++p < o; ) {
    var h = e[p], m = t[p];
    if (n)
      var A = s ? n(m, h, p, t, e, i) : n(h, m, p, e, t, i);
    if (A !== void 0) {
      if (A)
        continue;
      d = !1;
      break;
    }
    if (g) {
      if (!Iy(t, function(b, S) {
        if (!Py(g, S) && (h === b || a(h, b, r, n, i)))
          return g.push(S);
      })) {
        d = !1;
        break;
      }
    } else if (!(h === m || a(h, m, r, n, i))) {
      d = !1;
      break;
    }
  }
  return i.delete(e), i.delete(t), d;
}
var gs = Dy;
function jy(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n, a) {
    r[++t] = [a, n];
  }), r;
}
var Ny = jy;
function qy(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n) {
    r[++t] = n;
  }), r;
}
var By = qy, ja = ce, Na = ss, My = be(), Wy = gs, Uy = Ny, Hy = By, Gy = 1, ky = 2, zy = "[object Boolean]", Ky = "[object Date]", Jy = "[object Error]", Vy = "[object Map]", Yy = "[object Number]", Xy = "[object RegExp]", Zy = "[object Set]", Qy = "[object String]", ev = "[object Symbol]", tv = "[object ArrayBuffer]", rv = "[object DataView]", qa = ja ? ja.prototype : void 0, Qt = qa ? qa.valueOf : void 0;
function nv(e, t, r, n, a, i, s) {
  switch (r) {
    case rv:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case tv:
      return !(e.byteLength != t.byteLength || !i(new Na(e), new Na(t)));
    case zy:
    case Ky:
    case Yy:
      return My(+e, +t);
    case Jy:
      return e.name == t.name && e.message == t.message;
    case Xy:
    case Qy:
      return e == t + "";
    case Vy:
      var o = Uy;
    case Zy:
      var c = n & Gy;
      if (o || (o = Hy), e.size != t.size && !c)
        return !1;
      var u = s.get(e);
      if (u)
        return u == t;
      n |= ky, s.set(e, t);
      var f = Wy(o(e), o(t), n, a, i, s);
      return s.delete(e), f;
    case ev:
      if (Qt)
        return Qt.call(e) == Qt.call(t);
  }
  return !1;
}
var av = nv, Ba = as, iv = 1, sv = Object.prototype, ov = sv.hasOwnProperty;
function uv(e, t, r, n, a, i) {
  var s = r & iv, o = Ba(e), c = o.length, u = Ba(t), f = u.length;
  if (c != f && !s)
    return !1;
  for (var p = c; p--; ) {
    var d = o[p];
    if (!(s ? d in t : ov.call(t, d)))
      return !1;
  }
  var g = i.get(e), h = i.get(t);
  if (g && h)
    return g == t && h == e;
  var m = !0;
  i.set(e, t), i.set(t, e);
  for (var A = s; ++p < c; ) {
    d = o[p];
    var b = e[d], S = t[d];
    if (n)
      var D = s ? n(S, b, d, t, e, i) : n(b, S, d, e, t, i);
    if (!(D === void 0 ? b === S || a(b, S, r, n, i) : D)) {
      m = !1;
      break;
    }
    A || (A = d == "constructor");
  }
  if (m && !A) {
    var P = e.constructor, N = t.constructor;
    P != N && "constructor" in e && "constructor" in t && !(typeof P == "function" && P instanceof P && typeof N == "function" && N instanceof N) && (m = !1);
  }
  return i.delete(e), i.delete(t), m;
}
var cv = uv, er = tt(), lv = gs, fv = av, pv = cv, Ma = $e, Wa = M, Ua = Je, hv = Wr(), dv = 1, Ha = "[object Arguments]", Ga = "[object Array]", Ee = "[object Object]", gv = Object.prototype, ka = gv.hasOwnProperty;
function mv(e, t, r, n, a, i) {
  var s = Wa(e), o = Wa(t), c = s ? Ga : Ma(e), u = o ? Ga : Ma(t);
  c = c == Ha ? Ee : c, u = u == Ha ? Ee : u;
  var f = c == Ee, p = u == Ee, d = c == u;
  if (d && Ua(e)) {
    if (!Ua(t))
      return !1;
    s = !0, f = !1;
  }
  if (d && !f)
    return i || (i = new er()), s || hv(e) ? lv(e, t, r, n, a, i) : fv(e, t, c, r, n, a, i);
  if (!(r & dv)) {
    var g = f && ka.call(e, "__wrapped__"), h = p && ka.call(t, "__wrapped__");
    if (g || h) {
      var m = g ? e.value() : e, A = h ? t.value() : t;
      return i || (i = new er()), a(m, A, r, n, i);
    }
  }
  return d ? (i || (i = new er()), pv(e, t, r, n, a, i)) : !1;
}
var yv = mv, vv = yv, za = G;
function ms(e, t, r, n, a) {
  return e === t ? !0 : e == null || t == null || !za(e) && !za(t) ? e !== e && t !== t : vv(e, t, r, n, ms, a);
}
var ys = ms, _v = tt(), bv = ys, Av = 1, Ov = 2;
function $v(e, t, r, n) {
  var a = r.length, i = a, s = !n;
  if (e == null)
    return !i;
  for (e = Object(e); a--; ) {
    var o = r[a];
    if (s && o[2] ? o[1] !== e[o[0]] : !(o[0] in e))
      return !1;
  }
  for (; ++a < i; ) {
    o = r[a];
    var c = o[0], u = e[c], f = o[1];
    if (s && o[2]) {
      if (u === void 0 && !(c in e))
        return !1;
    } else {
      var p = new _v();
      if (n)
        var d = n(u, f, c, e, t, p);
      if (!(d === void 0 ? bv(f, u, Av | Ov, n, p) : d))
        return !1;
    }
  }
  return !0;
}
var Sv = $v, Rv = k;
function Tv(e) {
  return e === e && !Rv(e);
}
var vs = Tv, wv = vs, Ev = Ye;
function Cv(e) {
  for (var t = Ev(e), r = t.length; r--; ) {
    var n = t[r], a = e[n];
    t[r] = [n, a, wv(a)];
  }
  return t;
}
var xv = Cv;
function Iv(e, t) {
  return function(r) {
    return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
  };
}
var _s = Iv, Pv = Sv, Lv = xv, Fv = _s;
function Dv(e) {
  var t = Lv(e);
  return t.length == 1 && t[0][2] ? Fv(t[0][0], t[0][1]) : function(r) {
    return r === e || Pv(r, e, t);
  };
}
var jv = Dv, Nv = M, qv = _e, Bv = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Mv = /^\w*$/;
function Wv(e, t) {
  if (Nv(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || qv(e) ? !0 : Mv.test(e) || !Bv.test(e) || t != null && e in Object(t);
}
var Yr = Wv, bs = Gr(), Uv = "Expected a function";
function Xr(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Uv);
  var r = function() {
    var n = arguments, a = t ? t.apply(this, n) : n[0], i = r.cache;
    if (i.has(a))
      return i.get(a);
    var s = e.apply(this, n);
    return r.cache = i.set(a, s) || i, s;
  };
  return r.cache = new (Xr.Cache || bs)(), r;
}
Xr.Cache = bs;
var Hv = Xr, Gv = Hv, kv = 500;
function zv(e) {
  var t = Gv(e, function(n) {
    return r.size === kv && r.clear(), n;
  }), r = t.cache;
  return t;
}
var Kv = zv, Jv = Kv, Vv = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Yv = /\\(\\)?/g, Xv = Jv(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(Vv, function(r, n, a, i) {
    t.push(a ? i.replace(Yv, "$1") : n || r);
  }), t;
}), As = Xv;
function Zv(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, a = Array(n); ++r < n; )
    a[r] = t(e[r], r, e);
  return a;
}
var Os = Zv, Ka = ce, Qv = Os, e_ = M, t_ = _e, r_ = 1 / 0, Ja = Ka ? Ka.prototype : void 0, Va = Ja ? Ja.toString : void 0;
function $s(e) {
  if (typeof e == "string")
    return e;
  if (e_(e))
    return Qv(e, $s) + "";
  if (t_(e))
    return Va ? Va.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -r_ ? "-0" : t;
}
var n_ = $s, a_ = n_;
function i_(e) {
  return e == null ? "" : a_(e);
}
var Ss = i_, s_ = M, o_ = Yr, u_ = As, c_ = Ss;
function l_(e, t) {
  return s_(e) ? e : o_(e, t) ? [e] : u_(c_(e));
}
var Rs = l_, f_ = _e, p_ = 1 / 0;
function h_(e) {
  if (typeof e == "string" || f_(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -p_ ? "-0" : t;
}
var Se = h_, d_ = Rs, g_ = Se;
function m_(e, t) {
  t = d_(t, e);
  for (var r = 0, n = t.length; e != null && r < n; )
    e = e[g_(t[r++])];
  return r && r == n ? e : void 0;
}
var Ts = m_, y_ = Ts;
function v_(e, t, r) {
  var n = e == null ? void 0 : y_(e, t);
  return n === void 0 ? r : n;
}
var __ = v_;
function b_(e, t) {
  return e != null && t in Object(e);
}
var A_ = b_, O_ = Rs, $_ = Ke(), S_ = M, R_ = ze, T_ = qr, w_ = Se;
function E_(e, t, r) {
  t = O_(t, e);
  for (var n = -1, a = t.length, i = !1; ++n < a; ) {
    var s = w_(t[n]);
    if (!(i = e != null && r(e, s)))
      break;
    e = e[s];
  }
  return i || ++n != a ? i : (a = e == null ? 0 : e.length, !!a && T_(a) && R_(s, a) && (S_(e) || $_(e)));
}
var C_ = E_, x_ = A_, I_ = C_;
function P_(e, t) {
  return e != null && I_(e, t, x_);
}
var L_ = P_, F_ = ys, D_ = __, j_ = L_, N_ = Yr, q_ = vs, B_ = _s, M_ = Se, W_ = 1, U_ = 2;
function H_(e, t) {
  return N_(e) && q_(t) ? B_(M_(e), t) : function(r) {
    var n = D_(r, e);
    return n === void 0 && n === t ? j_(r, e) : F_(t, n, W_ | U_);
  };
}
var G_ = H_;
function k_(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
var z_ = k_, K_ = Ts;
function J_(e) {
  return function(t) {
    return K_(t, e);
  };
}
var V_ = J_, Y_ = z_, X_ = V_, Z_ = Yr, Q_ = Se;
function eb(e) {
  return Z_(e) ? Y_(Q_(e)) : X_(e);
}
var tb = eb, rb = jv, nb = G_, ab = Ue, ib = M, sb = tb;
function ob(e) {
  return typeof e == "function" ? e : e == null ? ab : typeof e == "object" ? ib(e) ? nb(e[0], e[1]) : rb(e) : sb(e);
}
var ub = ob, cb = ps, lb = ub, fb = 1;
function pb(e) {
  return lb(typeof e == "function" ? e : cb(e, fb));
}
var hb = pb, Ya = ce, db = Ke(), gb = M, Xa = Ya ? Ya.isConcatSpreadable : void 0;
function mb(e) {
  return gb(e) || db(e) || !!(Xa && e && e[Xa]);
}
var yb = mb, vb = zr, _b = yb;
function ws(e, t, r, n, a) {
  var i = -1, s = e.length;
  for (r || (r = _b), a || (a = []); ++i < s; ) {
    var o = e[i];
    t > 0 && r(o) ? t > 1 ? ws(o, t - 1, r, n, a) : vb(a, o) : n || (a[a.length] = o);
  }
  return a;
}
var bb = ws, Ab = bb;
function Ob(e) {
  var t = e == null ? 0 : e.length;
  return t ? Ab(e, 1) : [];
}
var $b = Ob, Sb = xr, Za = Math.max;
function Rb(e, t, r) {
  return t = Za(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var n = arguments, a = -1, i = Za(n.length - t, 0), s = Array(i); ++a < i; )
      s[a] = n[t + a];
    a = -1;
    for (var o = Array(t + 1); ++a < t; )
      o[a] = n[a];
    return o[t] = r(s), Sb(e, this, o);
  };
}
var Es = Rb, Tb = $b, wb = Es, Eb = Lr;
function Cb(e) {
  return Eb(wb(e, void 0, Tb), e + "");
}
var xb = Cb, Ib = jr, Pb = xb, Lb = 256, Fb = Pb(function(e, t) {
  return Ib(e, Lb, void 0, void 0, void 0, t);
}), Db = Fb, jb = Os, Nb = ve, qb = M, Bb = _e, Mb = As, Wb = Se, Ub = Ss;
function Hb(e) {
  return qb(e) ? jb(e, Wb) : Bb(e) ? [e] : Nb(Mb(Ub(e)));
}
var Gb = Hb, kb = {
  ary: hp,
  assign: Qi,
  clone: zm,
  curry: Vm,
  forEach: Fr,
  isArray: M,
  isError: fy,
  isFunction: He,
  isWeakMap: my,
  iteratee: hb,
  keys: Zi,
  rearg: Db,
  toInteger: Ji,
  toPath: Gb
}, zb = po, Kb = kb;
function Jb(e, t, r) {
  return zb(Kb, e, t, r);
}
var Vb = Jb, tr, Qa;
function Cs() {
  if (Qa)
    return tr;
  Qa = 1;
  var e = Nr, t = be();
  function r(n, a, i) {
    (i !== void 0 && !t(n[a], i) || i === void 0 && !(a in n)) && e(n, a, i);
  }
  return tr = r, tr;
}
var rr, ei;
function Yb() {
  if (ei)
    return rr;
  ei = 1;
  function e(t) {
    return function(r, n, a) {
      for (var i = -1, s = Object(r), o = a(r), c = o.length; c--; ) {
        var u = o[t ? c : ++i];
        if (n(s[u], u, s) === !1)
          break;
      }
      return r;
    };
  }
  return rr = e, rr;
}
var nr, ti;
function Xb() {
  if (ti)
    return nr;
  ti = 1;
  var e = Yb(), t = e();
  return nr = t, nr;
}
var ar, ri;
function Zb() {
  if (ri)
    return ar;
  ri = 1;
  var e = Ve, t = G;
  function r(n) {
    return t(n) && e(n);
  }
  return ar = r, ar;
}
var ir, ni;
function xs() {
  if (ni)
    return ir;
  ni = 1;
  function e(t, r) {
    if (!(r === "constructor" && typeof t[r] == "function") && r != "__proto__")
      return t[r];
  }
  return ir = e, ir;
}
var sr, ai;
function Qb() {
  if (ai)
    return sr;
  ai = 1;
  var e = Ae, t = Oe();
  function r(n) {
    return e(n, t(n));
  }
  return sr = r, sr;
}
var or, ii;
function eA() {
  if (ii)
    return or;
  ii = 1;
  var e = Cs(), t = es, r = os(), n = ve, a = us, i = Ke(), s = M, o = Zb(), c = Je, u = He, f = k, p = ds, d = Wr(), g = xs(), h = Qb();
  function m(A, b, S, D, P, N, q) {
    var L = g(A, S), C = g(b, S), se = q.get(C);
    if (se) {
      e(A, S, se);
      return;
    }
    var F = N ? N(L, C, S + "", A, b, q) : void 0, T = F === void 0;
    if (T) {
      var re = s(C), Y = !re && c(C), pe = !re && !Y && d(C);
      F = C, re || Y || pe ? s(L) ? F = L : o(L) ? F = n(L) : Y ? (T = !1, F = t(C, !0)) : pe ? (T = !1, F = r(C, !0)) : F = [] : p(C) || i(C) ? (F = L, i(L) ? F = h(L) : (!f(L) || u(L)) && (F = a(C))) : T = !1;
    }
    T && (q.set(C, F), P(F, C, D, N, q), q.delete(C)), e(A, S, F);
  }
  return or = m, or;
}
var ur, si;
function tA() {
  if (si)
    return ur;
  si = 1;
  var e = tt(), t = Cs(), r = Xb(), n = eA(), a = k, i = Oe(), s = xs();
  function o(c, u, f, p, d) {
    c !== u && r(u, function(g, h) {
      if (d || (d = new e()), a(g))
        n(c, u, h, f, o, p, d);
      else {
        var m = p ? p(s(c, h), g, h + "", c, u, d) : void 0;
        m === void 0 && (m = g), t(c, h, m);
      }
    }, i);
  }
  return ur = o, ur;
}
var cr, oi;
function rA() {
  if (oi)
    return cr;
  oi = 1;
  var e = Ue, t = Es, r = Lr;
  function n(a, i) {
    return r(t(a, i, e), a + "");
  }
  return cr = n, cr;
}
var lr, ui;
function nA() {
  if (ui)
    return lr;
  ui = 1;
  var e = be(), t = Ve, r = ze, n = k;
  function a(i, s, o) {
    if (!n(o))
      return !1;
    var c = typeof s;
    return (c == "number" ? t(o) && r(s, o.length) : c == "string" && s in o) ? e(o[s], i) : !1;
  }
  return lr = a, lr;
}
var fr, ci;
function aA() {
  if (ci)
    return fr;
  ci = 1;
  var e = rA(), t = nA();
  function r(n) {
    return e(function(a, i) {
      var s = -1, o = i.length, c = o > 1 ? i[o - 1] : void 0, u = o > 2 ? i[2] : void 0;
      for (c = n.length > 3 && typeof c == "function" ? (o--, c) : void 0, u && t(i[0], i[1], u) && (c = o < 3 ? void 0 : c, o = 1), a = Object(a); ++s < o; ) {
        var f = i[s];
        f && n(a, f, s, c);
      }
      return a;
    });
  }
  return fr = r, fr;
}
var pr, li;
function iA() {
  if (li)
    return pr;
  li = 1;
  var e = tA(), t = aA(), r = t(function(n, a, i) {
    e(n, a, i);
  });
  return pr = r, pr;
}
var sA = Vb, Is = sA("merge", iA());
Is.placeholder = Ci();
var oA = Is;
const Rr = /* @__PURE__ */ oo(oA);
function Ps(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: uA } = Object.prototype, { getPrototypeOf: Zr } = Object, rt = ((e) => (t) => {
  const r = uA.call(t);
  return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), V = (e) => (e = e.toLowerCase(), (t) => rt(t) === e), nt = (e) => (t) => typeof t === e, { isArray: fe } = Array, ye = nt("undefined");
function cA(e) {
  return e !== null && !ye(e) && e.constructor !== null && !ye(e.constructor) && H(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Ls = V("ArrayBuffer");
function lA(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Ls(e.buffer), t;
}
const fA = nt("string"), H = nt("function"), Fs = nt("number"), at = (e) => e !== null && typeof e == "object", pA = (e) => e === !0 || e === !1, xe = (e) => {
  if (rt(e) !== "object")
    return !1;
  const t = Zr(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, hA = V("Date"), dA = V("File"), gA = V("Blob"), mA = V("FileList"), yA = (e) => at(e) && H(e.pipe), vA = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || H(e.append) && ((t = rt(e)) === "formdata" || // detect form-data instance
  t === "object" && H(e.toString) && e.toString() === "[object FormData]"));
}, _A = V("URLSearchParams"), bA = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Re(e, t, { allOwnKeys: r = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let n, a;
  if (typeof e != "object" && (e = [e]), fe(e))
    for (n = 0, a = e.length; n < a; n++)
      t.call(null, e[n], n, e);
  else {
    const i = r ? Object.getOwnPropertyNames(e) : Object.keys(e), s = i.length;
    let o;
    for (n = 0; n < s; n++)
      o = i[n], t.call(null, e[o], o, e);
  }
}
function Ds(e, t) {
  t = t.toLowerCase();
  const r = Object.keys(e);
  let n = r.length, a;
  for (; n-- > 0; )
    if (a = r[n], t === a.toLowerCase())
      return a;
  return null;
}
const js = (() => typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global)(), Ns = (e) => !ye(e) && e !== js;
function Tr() {
  const { caseless: e } = Ns(this) && this || {}, t = {}, r = (n, a) => {
    const i = e && Ds(t, a) || a;
    xe(t[i]) && xe(n) ? t[i] = Tr(t[i], n) : xe(n) ? t[i] = Tr({}, n) : fe(n) ? t[i] = n.slice() : t[i] = n;
  };
  for (let n = 0, a = arguments.length; n < a; n++)
    arguments[n] && Re(arguments[n], r);
  return t;
}
const AA = (e, t, r, { allOwnKeys: n } = {}) => (Re(t, (a, i) => {
  r && H(a) ? e[i] = Ps(a, r) : e[i] = a;
}, { allOwnKeys: n }), e), OA = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), $A = (e, t, r, n) => {
  e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), r && Object.assign(e.prototype, r);
}, SA = (e, t, r, n) => {
  let a, i, s;
  const o = {};
  if (t = t || {}, e == null)
    return t;
  do {
    for (a = Object.getOwnPropertyNames(e), i = a.length; i-- > 0; )
      s = a[i], (!n || n(s, e, t)) && !o[s] && (t[s] = e[s], o[s] = !0);
    e = r !== !1 && Zr(e);
  } while (e && (!r || r(e, t)) && e !== Object.prototype);
  return t;
}, RA = (e, t, r) => {
  e = String(e), (r === void 0 || r > e.length) && (r = e.length), r -= t.length;
  const n = e.indexOf(t, r);
  return n !== -1 && n === r;
}, TA = (e) => {
  if (!e)
    return null;
  if (fe(e))
    return e;
  let t = e.length;
  if (!Fs(t))
    return null;
  const r = new Array(t);
  for (; t-- > 0; )
    r[t] = e[t];
  return r;
}, wA = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Zr(Uint8Array)), EA = (e, t) => {
  const n = (e && e[Symbol.iterator]).call(e);
  let a;
  for (; (a = n.next()) && !a.done; ) {
    const i = a.value;
    t.call(e, i[0], i[1]);
  }
}, CA = (e, t) => {
  let r;
  const n = [];
  for (; (r = e.exec(t)) !== null; )
    n.push(r);
  return n;
}, xA = V("HTMLFormElement"), IA = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(r, n, a) {
    return n.toUpperCase() + a;
  }
), fi = (({ hasOwnProperty: e }) => (t, r) => e.call(t, r))(Object.prototype), PA = V("RegExp"), qs = (e, t) => {
  const r = Object.getOwnPropertyDescriptors(e), n = {};
  Re(r, (a, i) => {
    t(a, i, e) !== !1 && (n[i] = a);
  }), Object.defineProperties(e, n);
}, LA = (e) => {
  qs(e, (t, r) => {
    if (H(e) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
      return !1;
    const n = e[r];
    if (H(n)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, FA = (e, t) => {
  const r = {}, n = (a) => {
    a.forEach((i) => {
      r[i] = !0;
    });
  };
  return fe(e) ? n(e) : n(String(e).split(t)), r;
}, DA = () => {
}, jA = (e, t) => (e = +e, Number.isFinite(e) ? e : t), hr = "abcdefghijklmnopqrstuvwxyz", pi = "0123456789", Bs = {
  DIGIT: pi,
  ALPHA: hr,
  ALPHA_DIGIT: hr + hr.toUpperCase() + pi
}, NA = (e = 16, t = Bs.ALPHA_DIGIT) => {
  let r = "";
  const { length: n } = t;
  for (; e--; )
    r += t[Math.random() * n | 0];
  return r;
};
function qA(e) {
  return !!(e && H(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const BA = (e) => {
  const t = new Array(10), r = (n, a) => {
    if (at(n)) {
      if (t.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        t[a] = n;
        const i = fe(n) ? [] : {};
        return Re(n, (s, o) => {
          const c = r(s, a + 1);
          !ye(c) && (i[o] = c);
        }), t[a] = void 0, i;
      }
    }
    return n;
  };
  return r(e, 0);
}, MA = V("AsyncFunction"), WA = (e) => e && (at(e) || H(e)) && H(e.then) && H(e.catch), l = {
  isArray: fe,
  isArrayBuffer: Ls,
  isBuffer: cA,
  isFormData: vA,
  isArrayBufferView: lA,
  isString: fA,
  isNumber: Fs,
  isBoolean: pA,
  isObject: at,
  isPlainObject: xe,
  isUndefined: ye,
  isDate: hA,
  isFile: dA,
  isBlob: gA,
  isRegExp: PA,
  isFunction: H,
  isStream: yA,
  isURLSearchParams: _A,
  isTypedArray: wA,
  isFileList: mA,
  forEach: Re,
  merge: Tr,
  extend: AA,
  trim: bA,
  stripBOM: OA,
  inherits: $A,
  toFlatObject: SA,
  kindOf: rt,
  kindOfTest: V,
  endsWith: RA,
  toArray: TA,
  forEachEntry: EA,
  matchAll: CA,
  isHTMLForm: xA,
  hasOwnProperty: fi,
  hasOwnProp: fi,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: qs,
  freezeMethods: LA,
  toObjectSet: FA,
  toCamelCase: IA,
  noop: DA,
  toFiniteNumber: jA,
  findKey: Ds,
  global: js,
  isContextDefined: Ns,
  ALPHABET: Bs,
  generateString: NA,
  isSpecCompliantForm: qA,
  toJSONObject: BA,
  isAsyncFn: MA,
  isThenable: WA
};
function w(e, t, r, n, a) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), r && (this.config = r), n && (this.request = n), a && (this.response = a);
}
l.inherits(w, Error, {
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
const Ms = w.prototype, Ws = {};
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
].forEach((e) => {
  Ws[e] = { value: e };
});
Object.defineProperties(w, Ws);
Object.defineProperty(Ms, "isAxiosError", { value: !0 });
w.from = (e, t, r, n, a, i) => {
  const s = Object.create(Ms);
  return l.toFlatObject(e, s, function(c) {
    return c !== Error.prototype;
  }, (o) => o !== "isAxiosError"), w.call(s, e.message, t, r, n, a), s.cause = e, s.name = e.name, i && Object.assign(s, i), s;
};
const UA = null;
function wr(e) {
  return l.isPlainObject(e) || l.isArray(e);
}
function Us(e) {
  return l.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function hi(e, t, r) {
  return e ? e.concat(t).map(function(a, i) {
    return a = Us(a), !r && i ? "[" + a + "]" : a;
  }).join(r ? "." : "") : t;
}
function HA(e) {
  return l.isArray(e) && !e.some(wr);
}
const GA = l.toFlatObject(l, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function it(e, t, r) {
  if (!l.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), r = l.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(m, A) {
    return !l.isUndefined(A[m]);
  });
  const n = r.metaTokens, a = r.visitor || f, i = r.dots, s = r.indexes, c = (r.Blob || typeof Blob < "u" && Blob) && l.isSpecCompliantForm(t);
  if (!l.isFunction(a))
    throw new TypeError("visitor must be a function");
  function u(h) {
    if (h === null)
      return "";
    if (l.isDate(h))
      return h.toISOString();
    if (!c && l.isBlob(h))
      throw new w("Blob is not supported. Use a Buffer instead.");
    return l.isArrayBuffer(h) || l.isTypedArray(h) ? c && typeof Blob == "function" ? new Blob([h]) : Buffer.from(h) : h;
  }
  function f(h, m, A) {
    let b = h;
    if (h && !A && typeof h == "object") {
      if (l.endsWith(m, "{}"))
        m = n ? m : m.slice(0, -2), h = JSON.stringify(h);
      else if (l.isArray(h) && HA(h) || (l.isFileList(h) || l.endsWith(m, "[]")) && (b = l.toArray(h)))
        return m = Us(m), b.forEach(function(D, P) {
          !(l.isUndefined(D) || D === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            s === !0 ? hi([m], P, i) : s === null ? m : m + "[]",
            u(D)
          );
        }), !1;
    }
    return wr(h) ? !0 : (t.append(hi(A, m, i), u(h)), !1);
  }
  const p = [], d = Object.assign(GA, {
    defaultVisitor: f,
    convertValue: u,
    isVisitable: wr
  });
  function g(h, m) {
    if (!l.isUndefined(h)) {
      if (p.indexOf(h) !== -1)
        throw Error("Circular reference detected in " + m.join("."));
      p.push(h), l.forEach(h, function(b, S) {
        (!(l.isUndefined(b) || b === null) && a.call(
          t,
          b,
          l.isString(S) ? S.trim() : S,
          m,
          d
        )) === !0 && g(b, m ? m.concat(S) : [S]);
      }), p.pop();
    }
  }
  if (!l.isObject(e))
    throw new TypeError("data must be an object");
  return g(e), t;
}
function di(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(n) {
    return t[n];
  });
}
function Qr(e, t) {
  this._pairs = [], e && it(e, this, t);
}
const Hs = Qr.prototype;
Hs.append = function(t, r) {
  this._pairs.push([t, r]);
};
Hs.toString = function(t) {
  const r = t ? function(n) {
    return t.call(this, n, di);
  } : di;
  return this._pairs.map(function(a) {
    return r(a[0]) + "=" + r(a[1]);
  }, "").join("&");
};
function kA(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Gs(e, t, r) {
  if (!t)
    return e;
  const n = r && r.encode || kA, a = r && r.serialize;
  let i;
  if (a ? i = a(t, r) : i = l.isURLSearchParams(t) ? t.toString() : new Qr(t, r).toString(n), i) {
    const s = e.indexOf("#");
    s !== -1 && (e = e.slice(0, s)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class zA {
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
  use(t, r, n) {
    return this.handlers.push({
      fulfilled: t,
      rejected: r,
      synchronous: n ? n.synchronous : !1,
      runWhen: n ? n.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
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
  forEach(t) {
    l.forEach(this.handlers, function(n) {
      n !== null && t(n);
    });
  }
}
const gi = zA, ks = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, KA = typeof URLSearchParams < "u" ? URLSearchParams : Qr, JA = typeof FormData < "u" ? FormData : null, VA = typeof Blob < "u" ? Blob : null, YA = (() => {
  let e;
  return typeof navigator < "u" && ((e = navigator.product) === "ReactNative" || e === "NativeScript" || e === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), XA = (() => typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), J = {
  isBrowser: !0,
  classes: {
    URLSearchParams: KA,
    FormData: JA,
    Blob: VA
  },
  isStandardBrowserEnv: YA,
  isStandardBrowserWebWorkerEnv: XA,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function ZA(e, t) {
  return it(e, new J.classes.URLSearchParams(), Object.assign({
    visitor: function(r, n, a, i) {
      return J.isNode && l.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function QA(e) {
  return l.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function e1(e) {
  const t = {}, r = Object.keys(e);
  let n;
  const a = r.length;
  let i;
  for (n = 0; n < a; n++)
    i = r[n], t[i] = e[i];
  return t;
}
function zs(e) {
  function t(r, n, a, i) {
    let s = r[i++];
    const o = Number.isFinite(+s), c = i >= r.length;
    return s = !s && l.isArray(a) ? a.length : s, c ? (l.hasOwnProp(a, s) ? a[s] = [a[s], n] : a[s] = n, !o) : ((!a[s] || !l.isObject(a[s])) && (a[s] = []), t(r, n, a[s], i) && l.isArray(a[s]) && (a[s] = e1(a[s])), !o);
  }
  if (l.isFormData(e) && l.isFunction(e.entries)) {
    const r = {};
    return l.forEachEntry(e, (n, a) => {
      t(QA(n), a, r, 0);
    }), r;
  }
  return null;
}
const t1 = {
  "Content-Type": void 0
};
function r1(e, t, r) {
  if (l.isString(e))
    try {
      return (t || JSON.parse)(e), l.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(e);
}
const st = {
  transitional: ks,
  adapter: ["xhr", "http"],
  transformRequest: [function(t, r) {
    const n = r.getContentType() || "", a = n.indexOf("application/json") > -1, i = l.isObject(t);
    if (i && l.isHTMLForm(t) && (t = new FormData(t)), l.isFormData(t))
      return a && a ? JSON.stringify(zs(t)) : t;
    if (l.isArrayBuffer(t) || l.isBuffer(t) || l.isStream(t) || l.isFile(t) || l.isBlob(t))
      return t;
    if (l.isArrayBufferView(t))
      return t.buffer;
    if (l.isURLSearchParams(t))
      return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let o;
    if (i) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return ZA(t, this.formSerializer).toString();
      if ((o = l.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
        const c = this.env && this.env.FormData;
        return it(
          o ? { "files[]": t } : t,
          c && new c(),
          this.formSerializer
        );
      }
    }
    return i || a ? (r.setContentType("application/json", !1), r1(t)) : t;
  }],
  transformResponse: [function(t) {
    const r = this.transitional || st.transitional, n = r && r.forcedJSONParsing, a = this.responseType === "json";
    if (t && l.isString(t) && (n && !this.responseType || a)) {
      const s = !(r && r.silentJSONParsing) && a;
      try {
        return JSON.parse(t);
      } catch (o) {
        if (s)
          throw o.name === "SyntaxError" ? w.from(o, w.ERR_BAD_RESPONSE, this, null, this.response) : o;
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
    FormData: J.classes.FormData,
    Blob: J.classes.Blob
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
  st.headers[t] = {};
});
l.forEach(["post", "put", "patch"], function(t) {
  st.headers[t] = l.merge(t1);
});
const en = st, n1 = l.toObjectSet([
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
]), a1 = (e) => {
  const t = {};
  let r, n, a;
  return e && e.split(`
`).forEach(function(s) {
    a = s.indexOf(":"), r = s.substring(0, a).trim().toLowerCase(), n = s.substring(a + 1).trim(), !(!r || t[r] && n1[r]) && (r === "set-cookie" ? t[r] ? t[r].push(n) : t[r] = [n] : t[r] = t[r] ? t[r] + ", " + n : n);
  }), t;
}, mi = Symbol("internals");
function me(e) {
  return e && String(e).trim().toLowerCase();
}
function Ie(e) {
  return e === !1 || e == null ? e : l.isArray(e) ? e.map(Ie) : String(e);
}
function i1(e) {
  const t = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(e); )
    t[n[1]] = n[2];
  return t;
}
const s1 = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function dr(e, t, r, n, a) {
  if (l.isFunction(n))
    return n.call(this, t, r);
  if (a && (t = r), !!l.isString(t)) {
    if (l.isString(n))
      return t.indexOf(n) !== -1;
    if (l.isRegExp(n))
      return n.test(t);
  }
}
function o1(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n);
}
function u1(e, t) {
  const r = l.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + r, {
      value: function(a, i, s) {
        return this[n].call(this, t, a, i, s);
      },
      configurable: !0
    });
  });
}
class ot {
  constructor(t) {
    t && this.set(t);
  }
  set(t, r, n) {
    const a = this;
    function i(o, c, u) {
      const f = me(c);
      if (!f)
        throw new Error("header name must be a non-empty string");
      const p = l.findKey(a, f);
      (!p || a[p] === void 0 || u === !0 || u === void 0 && a[p] !== !1) && (a[p || c] = Ie(o));
    }
    const s = (o, c) => l.forEach(o, (u, f) => i(u, f, c));
    return l.isPlainObject(t) || t instanceof this.constructor ? s(t, r) : l.isString(t) && (t = t.trim()) && !s1(t) ? s(a1(t), r) : t != null && i(r, t, n), this;
  }
  get(t, r) {
    if (t = me(t), t) {
      const n = l.findKey(this, t);
      if (n) {
        const a = this[n];
        if (!r)
          return a;
        if (r === !0)
          return i1(a);
        if (l.isFunction(r))
          return r.call(this, a, n);
        if (l.isRegExp(r))
          return r.exec(a);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, r) {
    if (t = me(t), t) {
      const n = l.findKey(this, t);
      return !!(n && this[n] !== void 0 && (!r || dr(this, this[n], n, r)));
    }
    return !1;
  }
  delete(t, r) {
    const n = this;
    let a = !1;
    function i(s) {
      if (s = me(s), s) {
        const o = l.findKey(n, s);
        o && (!r || dr(n, n[o], o, r)) && (delete n[o], a = !0);
      }
    }
    return l.isArray(t) ? t.forEach(i) : i(t), a;
  }
  clear(t) {
    const r = Object.keys(this);
    let n = r.length, a = !1;
    for (; n--; ) {
      const i = r[n];
      (!t || dr(this, this[i], i, t, !0)) && (delete this[i], a = !0);
    }
    return a;
  }
  normalize(t) {
    const r = this, n = {};
    return l.forEach(this, (a, i) => {
      const s = l.findKey(n, i);
      if (s) {
        r[s] = Ie(a), delete r[i];
        return;
      }
      const o = t ? o1(i) : String(i).trim();
      o !== i && delete r[i], r[o] = Ie(a), n[o] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const r = /* @__PURE__ */ Object.create(null);
    return l.forEach(this, (n, a) => {
      n != null && n !== !1 && (r[a] = t && l.isArray(n) ? n.join(", ") : n);
    }), r;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, r]) => t + ": " + r).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...r) {
    const n = new this(t);
    return r.forEach((a) => n.set(a)), n;
  }
  static accessor(t) {
    const n = (this[mi] = this[mi] = {
      accessors: {}
    }).accessors, a = this.prototype;
    function i(s) {
      const o = me(s);
      n[o] || (u1(a, s), n[o] = !0);
    }
    return l.isArray(t) ? t.forEach(i) : i(t), this;
  }
}
ot.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
l.freezeMethods(ot.prototype);
l.freezeMethods(ot);
const Q = ot;
function gr(e, t) {
  const r = this || en, n = t || r, a = Q.from(n.headers);
  let i = n.data;
  return l.forEach(e, function(o) {
    i = o.call(r, i, a.normalize(), t ? t.status : void 0);
  }), a.normalize(), i;
}
function Ks(e) {
  return !!(e && e.__CANCEL__);
}
function Te(e, t, r) {
  w.call(this, e ?? "canceled", w.ERR_CANCELED, t, r), this.name = "CanceledError";
}
l.inherits(Te, w, {
  __CANCEL__: !0
});
function c1(e, t, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? e(r) : t(new w(
    "Request failed with status code " + r.status,
    [w.ERR_BAD_REQUEST, w.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
const l1 = J.isStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  function() {
    return {
      write: function(r, n, a, i, s, o) {
        const c = [];
        c.push(r + "=" + encodeURIComponent(n)), l.isNumber(a) && c.push("expires=" + new Date(a).toGMTString()), l.isString(i) && c.push("path=" + i), l.isString(s) && c.push("domain=" + s), o === !0 && c.push("secure"), document.cookie = c.join("; ");
      },
      read: function(r) {
        const n = document.cookie.match(new RegExp("(^|;\\s*)(" + r + ")=([^;]*)"));
        return n ? decodeURIComponent(n[3]) : null;
      },
      remove: function(r) {
        this.write(r, "", Date.now() - 864e5);
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
function f1(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function p1(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Js(e, t) {
  return e && !f1(t) ? p1(e, t) : t;
}
const h1 = J.isStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const t = /(msie|trident)/i.test(navigator.userAgent), r = document.createElement("a");
    let n;
    function a(i) {
      let s = i;
      return t && (r.setAttribute("href", s), s = r.href), r.setAttribute("href", s), {
        href: r.href,
        protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
        host: r.host,
        search: r.search ? r.search.replace(/^\?/, "") : "",
        hash: r.hash ? r.hash.replace(/^#/, "") : "",
        hostname: r.hostname,
        port: r.port,
        pathname: r.pathname.charAt(0) === "/" ? r.pathname : "/" + r.pathname
      };
    }
    return n = a(window.location.href), function(s) {
      const o = l.isString(s) ? a(s) : s;
      return o.protocol === n.protocol && o.host === n.host;
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
function d1(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function g1(e, t) {
  e = e || 10;
  const r = new Array(e), n = new Array(e);
  let a = 0, i = 0, s;
  return t = t !== void 0 ? t : 1e3, function(c) {
    const u = Date.now(), f = n[i];
    s || (s = u), r[a] = c, n[a] = u;
    let p = i, d = 0;
    for (; p !== a; )
      d += r[p++], p = p % e;
    if (a = (a + 1) % e, a === i && (i = (i + 1) % e), u - s < t)
      return;
    const g = f && u - f;
    return g ? Math.round(d * 1e3 / g) : void 0;
  };
}
function yi(e, t) {
  let r = 0;
  const n = g1(50, 250);
  return (a) => {
    const i = a.loaded, s = a.lengthComputable ? a.total : void 0, o = i - r, c = n(o), u = i <= s;
    r = i;
    const f = {
      loaded: i,
      total: s,
      progress: s ? i / s : void 0,
      bytes: o,
      rate: c || void 0,
      estimated: c && s && u ? (s - i) / c : void 0,
      event: a
    };
    f[t ? "download" : "upload"] = !0, e(f);
  };
}
const m1 = typeof XMLHttpRequest < "u", y1 = m1 && function(e) {
  return new Promise(function(r, n) {
    let a = e.data;
    const i = Q.from(e.headers).normalize(), s = e.responseType;
    let o;
    function c() {
      e.cancelToken && e.cancelToken.unsubscribe(o), e.signal && e.signal.removeEventListener("abort", o);
    }
    l.isFormData(a) && (J.isStandardBrowserEnv || J.isStandardBrowserWebWorkerEnv ? i.setContentType(!1) : i.setContentType("multipart/form-data;", !1));
    let u = new XMLHttpRequest();
    if (e.auth) {
      const g = e.auth.username || "", h = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
      i.set("Authorization", "Basic " + btoa(g + ":" + h));
    }
    const f = Js(e.baseURL, e.url);
    u.open(e.method.toUpperCase(), Gs(f, e.params, e.paramsSerializer), !0), u.timeout = e.timeout;
    function p() {
      if (!u)
        return;
      const g = Q.from(
        "getAllResponseHeaders" in u && u.getAllResponseHeaders()
      ), m = {
        data: !s || s === "text" || s === "json" ? u.responseText : u.response,
        status: u.status,
        statusText: u.statusText,
        headers: g,
        config: e,
        request: u
      };
      c1(function(b) {
        r(b), c();
      }, function(b) {
        n(b), c();
      }, m), u = null;
    }
    if ("onloadend" in u ? u.onloadend = p : u.onreadystatechange = function() {
      !u || u.readyState !== 4 || u.status === 0 && !(u.responseURL && u.responseURL.indexOf("file:") === 0) || setTimeout(p);
    }, u.onabort = function() {
      u && (n(new w("Request aborted", w.ECONNABORTED, e, u)), u = null);
    }, u.onerror = function() {
      n(new w("Network Error", w.ERR_NETWORK, e, u)), u = null;
    }, u.ontimeout = function() {
      let h = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
      const m = e.transitional || ks;
      e.timeoutErrorMessage && (h = e.timeoutErrorMessage), n(new w(
        h,
        m.clarifyTimeoutError ? w.ETIMEDOUT : w.ECONNABORTED,
        e,
        u
      )), u = null;
    }, J.isStandardBrowserEnv) {
      const g = (e.withCredentials || h1(f)) && e.xsrfCookieName && l1.read(e.xsrfCookieName);
      g && i.set(e.xsrfHeaderName, g);
    }
    a === void 0 && i.setContentType(null), "setRequestHeader" in u && l.forEach(i.toJSON(), function(h, m) {
      u.setRequestHeader(m, h);
    }), l.isUndefined(e.withCredentials) || (u.withCredentials = !!e.withCredentials), s && s !== "json" && (u.responseType = e.responseType), typeof e.onDownloadProgress == "function" && u.addEventListener("progress", yi(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && u.upload && u.upload.addEventListener("progress", yi(e.onUploadProgress)), (e.cancelToken || e.signal) && (o = (g) => {
      u && (n(!g || g.type ? new Te(null, e, u) : g), u.abort(), u = null);
    }, e.cancelToken && e.cancelToken.subscribe(o), e.signal && (e.signal.aborted ? o() : e.signal.addEventListener("abort", o)));
    const d = d1(f);
    if (d && J.protocols.indexOf(d) === -1) {
      n(new w("Unsupported protocol " + d + ":", w.ERR_BAD_REQUEST, e));
      return;
    }
    u.send(a || null);
  });
}, Pe = {
  http: UA,
  xhr: y1
};
l.forEach(Pe, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const v1 = {
  getAdapter: (e) => {
    e = l.isArray(e) ? e : [e];
    const { length: t } = e;
    let r, n;
    for (let a = 0; a < t && (r = e[a], !(n = l.isString(r) ? Pe[r.toLowerCase()] : r)); a++)
      ;
    if (!n)
      throw n === !1 ? new w(
        `Adapter ${r} is not supported by the environment`,
        "ERR_NOT_SUPPORT"
      ) : new Error(
        l.hasOwnProp(Pe, r) ? `Adapter '${r}' is not available in the build` : `Unknown adapter '${r}'`
      );
    if (!l.isFunction(n))
      throw new TypeError("adapter is not a function");
    return n;
  },
  adapters: Pe
};
function mr(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Te(null, e);
}
function vi(e) {
  return mr(e), e.headers = Q.from(e.headers), e.data = gr.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), v1.getAdapter(e.adapter || en.adapter)(e).then(function(n) {
    return mr(e), n.data = gr.call(
      e,
      e.transformResponse,
      n
    ), n.headers = Q.from(n.headers), n;
  }, function(n) {
    return Ks(n) || (mr(e), n && n.response && (n.response.data = gr.call(
      e,
      e.transformResponse,
      n.response
    ), n.response.headers = Q.from(n.response.headers))), Promise.reject(n);
  });
}
const _i = (e) => e instanceof Q ? e.toJSON() : e;
function ue(e, t) {
  t = t || {};
  const r = {};
  function n(u, f, p) {
    return l.isPlainObject(u) && l.isPlainObject(f) ? l.merge.call({ caseless: p }, u, f) : l.isPlainObject(f) ? l.merge({}, f) : l.isArray(f) ? f.slice() : f;
  }
  function a(u, f, p) {
    if (l.isUndefined(f)) {
      if (!l.isUndefined(u))
        return n(void 0, u, p);
    } else
      return n(u, f, p);
  }
  function i(u, f) {
    if (!l.isUndefined(f))
      return n(void 0, f);
  }
  function s(u, f) {
    if (l.isUndefined(f)) {
      if (!l.isUndefined(u))
        return n(void 0, u);
    } else
      return n(void 0, f);
  }
  function o(u, f, p) {
    if (p in t)
      return n(u, f);
    if (p in e)
      return n(void 0, u);
  }
  const c = {
    url: i,
    method: i,
    data: i,
    baseURL: s,
    transformRequest: s,
    transformResponse: s,
    paramsSerializer: s,
    timeout: s,
    timeoutMessage: s,
    withCredentials: s,
    adapter: s,
    responseType: s,
    xsrfCookieName: s,
    xsrfHeaderName: s,
    onUploadProgress: s,
    onDownloadProgress: s,
    decompress: s,
    maxContentLength: s,
    maxBodyLength: s,
    beforeRedirect: s,
    transport: s,
    httpAgent: s,
    httpsAgent: s,
    cancelToken: s,
    socketPath: s,
    responseEncoding: s,
    validateStatus: o,
    headers: (u, f) => a(_i(u), _i(f), !0)
  };
  return l.forEach(Object.keys(Object.assign({}, e, t)), function(f) {
    const p = c[f] || a, d = p(e[f], t[f], f);
    l.isUndefined(d) && p !== o || (r[f] = d);
  }), r;
}
const Vs = "1.4.0", tn = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  tn[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const bi = {};
tn.transitional = function(t, r, n) {
  function a(i, s) {
    return "[Axios v" + Vs + "] Transitional option '" + i + "'" + s + (n ? ". " + n : "");
  }
  return (i, s, o) => {
    if (t === !1)
      throw new w(
        a(s, " has been removed" + (r ? " in " + r : "")),
        w.ERR_DEPRECATED
      );
    return r && !bi[s] && (bi[s] = !0, console.warn(
      a(
        s,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), t ? t(i, s, o) : !0;
  };
};
function _1(e, t, r) {
  if (typeof e != "object")
    throw new w("options must be an object", w.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let a = n.length;
  for (; a-- > 0; ) {
    const i = n[a], s = t[i];
    if (s) {
      const o = e[i], c = o === void 0 || s(o, i, e);
      if (c !== !0)
        throw new w("option " + i + " must be " + c, w.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new w("Unknown option " + i, w.ERR_BAD_OPTION);
  }
}
const Er = {
  assertOptions: _1,
  validators: tn
}, te = Er.validators;
class We {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new gi(),
      response: new gi()
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
  request(t, r) {
    typeof t == "string" ? (r = r || {}, r.url = t) : r = t || {}, r = ue(this.defaults, r);
    const { transitional: n, paramsSerializer: a, headers: i } = r;
    n !== void 0 && Er.assertOptions(n, {
      silentJSONParsing: te.transitional(te.boolean),
      forcedJSONParsing: te.transitional(te.boolean),
      clarifyTimeoutError: te.transitional(te.boolean)
    }, !1), a != null && (l.isFunction(a) ? r.paramsSerializer = {
      serialize: a
    } : Er.assertOptions(a, {
      encode: te.function,
      serialize: te.function
    }, !0)), r.method = (r.method || this.defaults.method || "get").toLowerCase();
    let s;
    s = i && l.merge(
      i.common,
      i[r.method]
    ), s && l.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (h) => {
        delete i[h];
      }
    ), r.headers = Q.concat(s, i);
    const o = [];
    let c = !0;
    this.interceptors.request.forEach(function(m) {
      typeof m.runWhen == "function" && m.runWhen(r) === !1 || (c = c && m.synchronous, o.unshift(m.fulfilled, m.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(m) {
      u.push(m.fulfilled, m.rejected);
    });
    let f, p = 0, d;
    if (!c) {
      const h = [vi.bind(this), void 0];
      for (h.unshift.apply(h, o), h.push.apply(h, u), d = h.length, f = Promise.resolve(r); p < d; )
        f = f.then(h[p++], h[p++]);
      return f;
    }
    d = o.length;
    let g = r;
    for (p = 0; p < d; ) {
      const h = o[p++], m = o[p++];
      try {
        g = h(g);
      } catch (A) {
        m.call(this, A);
        break;
      }
    }
    try {
      f = vi.call(this, g);
    } catch (h) {
      return Promise.reject(h);
    }
    for (p = 0, d = u.length; p < d; )
      f = f.then(u[p++], u[p++]);
    return f;
  }
  getUri(t) {
    t = ue(this.defaults, t);
    const r = Js(t.baseURL, t.url);
    return Gs(r, t.params, t.paramsSerializer);
  }
}
l.forEach(["delete", "get", "head", "options"], function(t) {
  We.prototype[t] = function(r, n) {
    return this.request(ue(n || {}, {
      method: t,
      url: r,
      data: (n || {}).data
    }));
  };
});
l.forEach(["post", "put", "patch"], function(t) {
  function r(n) {
    return function(i, s, o) {
      return this.request(ue(o || {}, {
        method: t,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: i,
        data: s
      }));
    };
  }
  We.prototype[t] = r(), We.prototype[t + "Form"] = r(!0);
});
const Le = We;
class rn {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function(i) {
      r = i;
    });
    const n = this;
    this.promise.then((a) => {
      if (!n._listeners)
        return;
      let i = n._listeners.length;
      for (; i-- > 0; )
        n._listeners[i](a);
      n._listeners = null;
    }), this.promise.then = (a) => {
      let i;
      const s = new Promise((o) => {
        n.subscribe(o), i = o;
      }).then(a);
      return s.cancel = function() {
        n.unsubscribe(i);
      }, s;
    }, t(function(i, s, o) {
      n.reason || (n.reason = new Te(i, s, o), r(n.reason));
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
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const r = this._listeners.indexOf(t);
    r !== -1 && this._listeners.splice(r, 1);
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new rn(function(a) {
        t = a;
      }),
      cancel: t
    };
  }
}
const b1 = rn;
function A1(e) {
  return function(r) {
    return e.apply(null, r);
  };
}
function O1(e) {
  return l.isObject(e) && e.isAxiosError === !0;
}
const Cr = {
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
Object.entries(Cr).forEach(([e, t]) => {
  Cr[t] = e;
});
const $1 = Cr;
function Ys(e) {
  const t = new Le(e), r = Ps(Le.prototype.request, t);
  return l.extend(r, Le.prototype, t, { allOwnKeys: !0 }), l.extend(r, t, null, { allOwnKeys: !0 }), r.create = function(a) {
    return Ys(ue(e, a));
  }, r;
}
const I = Ys(en);
I.Axios = Le;
I.CanceledError = Te;
I.CancelToken = b1;
I.isCancel = Ks;
I.VERSION = Vs;
I.toFormData = it;
I.AxiosError = w;
I.Cancel = I.CanceledError;
I.all = function(t) {
  return Promise.all(t);
};
I.spread = A1;
I.isAxiosError = O1;
I.mergeConfig = ue;
I.AxiosHeaders = Q;
I.formToJSON = (e) => zs(l.isHTMLForm(e) ? new FormData(e) : e);
I.HttpStatusCode = $1;
I.default = I;
const Ai = I;
function S1(e, t) {
  e.run($.START, t), Ai(t).then((r) => {
    e.run($.STATUS_CODE, r.status), e.run($.SUCCESS, r);
  }).catch((r) => {
    if (Ai.isCancel(r)) {
      e.run($.CANCEL, r.message);
      return;
    }
    if (r.response) {
      e.run($.STATUS_CODE, r.response.status), e.run($.ERROR, r.response);
      return;
    }
    e.run($.ERROR, r);
  }).then((r) => e.run($.FINISH, {}));
}
function R1(e) {
  const t = ee(e, "cancelToken") ? e.cancelToken : null, r = !t && ee(e, "signal") ? e.signal : null;
  let n = null;
  return !t && !r && (n = new AbortController(), e = Object.assign({}, e, { signal: n.signal })), {
    options: e,
    abortControllerInstance: n
  };
}
function T1(e, t, r = oe.GET, n = {}, a = {}) {
  const i = w1(t, r, n), s = ee(a, "cancelToken") ? a.cancelToken : null;
  let o = !s && ee(a, "signal") ? a.signal : new AbortController().signal;
  const c = {
    method: r,
    url: i.url,
    data: r === oe.GET ? {} : i.payload,
    ...s ? { cancelToken: s } : { signal: o },
    headers: {
      Accept: "*/*",
      // Accept: "application/json",
      "Content-Type": n instanceof FormData ? "multipart/form-data" : "application/json",
      "X-Requested-With": "XMLHttpRequest"
    },
    onUploadProgress: (u) => {
      i.payload instanceof FormData && e.run($.UPLOAD, u);
    },
    onDownloadProgress: (u) => {
      e.run($.DOWNLOAD, u);
    }
  };
  return Rr(c, a);
}
function w1(e, t, r, n) {
  if ((vr(r) || n) && !(r instanceof FormData) && (r = Si(r)), !(r instanceof FormData) && t === oe.GET && Object.keys(r).length) {
    e = e.endsWith("/") ? e.slice(0, -1) : e;
    const a = new URLSearchParams({ ...r });
    e += "?" + a.toString();
  }
  return {
    url: e,
    payload: r
  };
}
class Xs {
  constructor(t = "http://localhost", r = [], n = {}, a = {}) {
    this.requestURL = t, this.state = {}, this._userStates = r, this.requestConfig = n, this.hooks = yr(a) ? [] : [a], this._cancelToken = null, this.availableHooks = Array.from(Object.values($)), this.availableEvents = Array.from(Object.values(Z)), this.resetStates();
  }
  // expect userStates = [ [name, callback], ... ]
  _registerUserStates() {
    if (this._userStates.length === 0)
      return;
    const t = this, r = (n) => Array.isArray(n) || typeof n[0] < "u" || typeof n[1] == "function";
    Array.from(this._userStates).filter(r).forEach((n) => {
      let a = n[0], i = n[1];
      ee(t.state, a) && delete t.state[a], Object.defineProperty(t.state, a, {
        get() {
          return i(t.state);
        },
        configurable: !0
      });
    });
  }
  url(t) {
    return this.requestURL = t, this;
  }
  registerStates(t) {
    return this._userStates = this._userStates.length === 0 ? t : [...this._userStates, ...t], this;
  }
  mergeRequestOptions(t = {}) {
    return this.requestConfig = Object.assign({}, Rr(this.requestConfig, t)), this;
  }
  // always overwrite all hooks callbacks
  setRequestHooks(t = {}) {
    return this.hooks = [Object.assign({}, t)], this;
  }
  mergeRequestHooks(t = {}) {
    return this.hooks = [...this.hooks, t], this;
  }
  submit(t = oe.GET, r = {}, n = {}) {
    const { options: a = {}, hooks: i = {} } = n;
    this.resetStates();
    const s = R1(a);
    this._cancelToken = s.abortControllerInstance;
    const o = Object.assign({}, Rr(this.requestConfig, s.options)), c = yr(i) ? [...this.hooks] : [...this.hooks, i], u = new so(this), f = T1(u, this.requestURL, t, r, o);
    u.registerInternalHooks(), u.registerUserHooks(c), u.run($.BEFORE, f), S1(u, f);
  }
  get(t = {}, r = { options: {}, hooks: {} }) {
    return this.submit(oe.GET, t, r);
  }
  post(t = {}, r = { options: {}, hooks: {} }) {
    return this.submit(oe.POST, t, r);
  }
  cancel() {
    this.state.busy && this._cancelToken && (this._cancelToken.abort(), this._cancelToken = null);
  }
  resetStates() {
    this.state = Object.assign({}, wi), this._registerUserStates();
  }
}
const Oi = Object.freeze({
  errors: {},
  message: ""
});
class E1 {
  constructor() {
    this.localState = Object.assign({}, Oi), this.aquastrap = new Xs(), this.aquastrap.mergeRequestOptions({
      headers: {
        ...document.querySelector('meta[name="csrf-token"]') && {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        }
      }
    }).setRequestHooks({
      onBefore: this.resetStates.bind(this),
      onSuccess: async (t) => {
        await $i(t, this.localState), x1(t);
      },
      onError: async (t) => {
        let r = await $i(t, this.localState);
        if (r && r != null && r.errors) {
          let n = {};
          Object.entries(r.errors).forEach(([a, i]) => n[a] = i[0]), this.localState.errors = n;
        }
      }
    }).registerStates([
      [
        "hasError",
        (t) => t.statusCode && Number(t.statusCode) >= 300 || t.response instanceof Error
      ]
    ]), this.availableHooks = this.aquastrap.availableHooks, this.availableEvents = [...this.aquastrap.availableEvents, "aquastrap:onNotification"];
  }
  get state() {
    return Object.assign({}, this.aquastrap.state, this.localState, {
      hasError: this.aquastrap.state.hasError ?? !1,
      isValidationError: this.aquastrap.state.statusCode === 422 && !this.aquastrap.state.busy && !yr(this.localState.errors)
    });
  }
  setFormError(t, r = null) {
    t instanceof Object && typeof t == "object" && (this.localState.errors = Object.assign({}, this.localState.errors, t)), typeof t == "string" && (this.localState.errors[t] = r);
  }
  clearFormError(...t) {
    if (!t.length) {
      this.localState.errors = {};
      return;
    }
    t.forEach((r) => {
      ee(this.localState.errors, r) && delete this.localState.errors[r];
    });
  }
  resetStates() {
    this.localState = Object.assign({}, Oi), this.aquastrap.resetStates();
  }
  url(t) {
    return this.aquastrap.url(t), this;
  }
  route(...t) {
    let r;
    try {
      r = route(...t);
    } catch {
      r = this.aquastrap.requestURL;
    }
    return this.aquastrap.url(r), this;
  }
  cancel() {
    this.aquastrap.cancel();
  }
  get(t = {}, r = { options: {}, hooks: {} }) {
    return this.aquastrap.get(t, r);
  }
  post(t = {}, r = { options: {}, hooks: {} }) {
    return this.aquastrap.post(t, r);
  }
  download(t = {}) {
    return this.aquastrap.post(t, { options: {
      responseType: "blob"
    }, hooks: {} });
  }
}
const C1 = (e) => {
  const t = e.headers["content-type"];
  return !!(t && t.indexOf("application/json") !== -1);
};
function x1(e) {
  if (C1(e))
    return;
  const t = "application/octet-stream", r = e.headers["content-type"] || t, n = e.headers["content-disposition"], a = n ? n.split("filename=")[1] : "", i = a !== '""' ? a.replace(/\s+/g, "-").replace(/\"/g, "") : "download" + no(r.split(";")[0]), s = window.URL.createObjectURL(new Blob([e.data])), o = document.createElement("a");
  o.href = s, o.download = i, document.body.appendChild(o), o.click(), o.remove(), window.URL.revokeObjectURL(s);
}
async function $i(e, t) {
  const r = (i) => {
    const s = i == null ? void 0 : i.headers["x-aqua-notification"];
    if (!s)
      return;
    const o = JSON.parse(s);
    o && ee(o, "type") && ee(o, "message") && X("aquastrap:onNotification", o);
  }, n = async (i) => {
    if (!(i != null && i.data))
      return null;
    let s = i.data;
    if (s instanceof Blob && s.type === "application/json") {
      let o = await s.text();
      return s = JSON.parse(o), s;
    }
    return s;
  };
  if (r(e), e instanceof Error)
    return t.message = e.message, null;
  let a = await n(e);
  return a ? (t.message = a == null ? void 0 : a.message, t.message || (t.message = ""), a) : null;
}
window._Aquastrap = Xs;
window._LaraAquastrap = E1;
