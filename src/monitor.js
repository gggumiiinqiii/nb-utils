// 报错start
export const on = function (event, fn, remove) {
  console.log("on156", window.addEventListener);
  window.addEventListener
    ? window.addEventListener(
        event,
        function a(i) {
            console.log('123132')
          remove && window.removeEventListener(event, a, true),
            fn.call(this, i);
        },
        true
      )
    : "";
};
export const Config = {
    appVersion: '1.0.0',
    token: 'sfaf',
    environment: 'production',
    useragent: window.navigator.userAgent.toLowerCase(),
  }
export function getCommonMsg() {
  let u = navigator.connection;
  let data = {
    t: "",
    page: getPage(),
    times: 1,
    v: Config.appVersion,
    token: Config.token,
    e: Config.environment,
    useragent: Config.useragent,
    begin: new Date().getTime(),
    uid: getUid(),
    sr: screen.width + "x" + screen.height,
    vp: getScreen(),
    ct: u ? u.effectiveType : "",
    ul: getLang(),
    _v: "{{VERSION}}",
    o: location.href,
  };
  return data;
}
// 获取页面
function getPage() {
  return location.pathname.toLowerCase();
}
// 获取浏览器默认语言
function getLang() {
  var lang = navigator.language || navigator.userLanguage; //常规浏览器语言和IE浏览器
  lang = lang.substr(0, 2); //截取lang前2位字符
  return lang;
}
//获取屏幕
function getScreen() {
  let w = document.documentElement.clientWidth || document.body.clientWidth;
  let h = document.documentElement.clientHeight || document.body.clientHeight;
  return w + "x" + h;
}
// 获取uid
function getUid() {
  let uid = localStorage.getItem("bombay_uid") || "";
  if (!uid) {
    uid = randomString();
    localStorage.setItem("bombay_uid", uid);
  }
  return uid;
}
export function randomString() {
  for (var e, t, n = 20, r = new Array(n), a = Date.now().toString(36).split(''); n-- > 0; )
    (t = (e = (36 * Math.random()) | 0).toString(36)), (r[n] = e % 3 ? t : t.toUpperCase())
  for (var i = 0; i < 8; i++) r.splice(3 * i + 2, 0, a[i])
  return r.join('')
}
// 报错end

export function handleErr(error) {
  console.log("error11", error);
  switch (error.type) {
    case "error":
      error instanceof ErrorEvent
        ? reportCaughtError(error)
        : reportResourceError(error);
      break;
    case "unhandledrejection":
      reportPromiseError(error);
      break;
  }
  //setGlobalHealth('error')
}
//防抖处理报错开始
// 防抖函数
function debounce(fn, delay) {
  let lastTime = 0;
  return function (...args) {
    console.log("aa", args);
    const now = Date.now();
    if (now - lastTime >= delay) {
      lastTime = now;
      // apply是数组把数组的第一个传递给函数的第一个参数
      // call是传a,b,c在传递给对应函数的入参
      fn.apply(this, args);
    }
  };
}
// 使用防抖机制包装错误处理函数，设置处理间隔为 2 秒（2000 毫秒）
export const debouncedHandleErr = debounce(handleErr, 2000);
// 设置处理间隔为 30 分钟（1800000 毫秒）
//防抖处理报错结束

// 缓存已处理的错误信息
const errorCache = {};
// 错误处理包装函数
function errorThrottle(fn, interval) {
  return function (event) {
    const errorKey = getErrorKey(event);
    const now = Date.now();
    // 1-undefined: NaN
    // NaN > 1:false
    if (!errorCache[errorKey] || now - errorCache[errorKey] > interval) {
      errorCache[errorKey] = now;
      fn(event);
    }
  };
}
// 生成错误的唯一键
export function getErrorKey(event) {
  if (event instanceof ErrorEvent) {
    return `${event.message}-${event.filename}-${event.lineno}-${event.colno}`;
  } else if (event instanceof PromiseRejectionEvent) {
    return `promise-${event.reason}`;
  }
  return "unknown-error";
}
// 设置处理间隔为 30 分钟（1800000 毫秒）,相同的报错30分钟进行一次报错
export const throttledHandleErr = errorThrottle(handleErr, 1800000);

function report(msg) {
  //这里可以调用接口去发参数
  console.log("reportmsggg", msg);
  fetch("http://127.0.0.1:7777/postContent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(msg),
  })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (err) {
      console.log(err);
    });
}
// 捕获js异常
function reportCaughtError(error) {
  let commonMsg = getCommonMsg();
  let n = error.name || "CustomError",
    a = error.message || "",
    i = error.error.stack || "";
  let msg = {
    ...commonMsg,
    ...{
      t: "error",
      st: "caughterror",
      cate: n, // 类别
      msg: a && a.substring(0, 1e3), // 信息
      detail: i && i.substring(0, 1e3), // 错误栈
      file: error.filename || "", // 出错文件
      line: error.lineno || "", // 行
      col: error.colno || "", // 列
    },
  };
  report(msg);
}

// 捕获资源异常
function reportResourceError(error) {
  let commonMsg = getCommonMsg();
  let target = error.target;
  let msg = {
    ...commonMsg,
    ...{
      t: "error",
      st: "resource",
      msg: target.outerHTML,
      file: target.src,
      stack: target.localName.toUpperCase(),
    },
  };
  report(msg);
}

// 捕获promise异常
function reportPromiseError(error) {
  let commonMsg = getCommonMsg();
  let msg = {
    ...commonMsg,
    ...{
      t: "error",
      st: "promise",
      msg: error.reason,
    },
  };
  report(msg);
}

//错误开始
on("error", handleErr);
// promise错误
on("unhandledrejection", handleErr);
