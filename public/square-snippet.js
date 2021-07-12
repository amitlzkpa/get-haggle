// ------------------------------------
// UTILS FEATURES
// ------------------------------------

async function wait(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

//ref: https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function getOrdinal(num) {
  return num.toString().slice(-1) === "1"
    ? "st"
    : num.toString().slice(-1) === "2"
    ? "nd"
    : num.toString().slice(-1) === "3"
    ? "rd"
    : "th";
}

// ------------------------------------
// EXT LIB FEATURES
// ------------------------------------

let jsLibs = ["https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.js"];
let styleLibs = [
  "https://fonts.googleapis.com/css?family=Lato:100,200,300,400,500,600,700,800",
];

// ref: https://gist.github.com/james2doyle/28a59f8692cec6f334773007b31a1523
function loadScript(src, idx) {
  return new Promise(function(resolve, reject) {
    let scrElId = `script_${idx}`;
    const s = document.createElement("script");
    let r = false;
    s.setAttribute("id", scrElId);
    s.setAttribute("type", "text/javascript");
    s.setAttribute("src", src);
    s.async = true;
    s.onerror = function(err) {
      reject(err, s);
    };
    s.onload = s.onreadystatechange = function() {
      // console.log(this.readyState); // uncomment this line to see which ready states are called.
      if (!r && (!this.readyState || this.readyState == "complete")) {
        r = true;
        resolve();
      }
    };
    const t = document.getElementsByTagName("script")[0];
    t.parentElement.insertBefore(s, t);
  });
}

// ref: https://gist.github.com/james2doyle/28a59f8692cec6f334773007b31a1523
function loadStyle(href, idx = 0) {
  return new Promise(function(resolve, reject) {
    let linkElId = `stylesheet_${idx}`;
    const s = document.createElement("link");
    s.setAttribute("id", linkElId);
    s.setAttribute("rel", "stylesheet");
    s.setAttribute("type", "text/css");
    s.setAttribute("href", href);
    s.setAttribute("media", "all");
    let r = false;
    s.onerror = function(err) {
      reject(err, s);
    };
    s.onload = s.onreadystatechange = function() {
      // console.log(this.readyState); // uncomment this line to see which ready states are called.
      if (!r && (!this.readyState || this.readyState == "complete")) {
        r = true;
        resolve();
      }
    };
    const t = document.getElementsByTagName("link")[0];
    t.parentElement.insertBefore(s, t);
  });
}

async function loadLibs() {
  for (let idx in styleLibs) {
    let cssLibUrl = styleLibs[idx];
    console.log(cssLibUrl);
    await loadStyle(cssLibUrl, idx);
  }
  for (let idx in jsLibs) {
    let jsLibUrl = jsLibs[idx];
    await loadScript(jsLibUrl, idx);
  }
}

// ------------------------------------
// COOKIE FEATURES
// ------------------------------------

let HAGGLE_COOKIE_KEY = "haggle-cookie";
let COOKIE_EXPIRY_DURATION_DAYS = 30;
let haggleCookieVal = null;

// ref: https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function eraseCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

function syncCookie() {
  haggleCookieVal = getCookie(HAGGLE_COOKIE_KEY);
  console.log(`Found cookie: ${haggleCookieVal}`);

  if (!haggleCookieVal) {
    let cookieVal = uuidv4();
    setCookie("haggle-cookie", cookieVal, COOKIE_EXPIRY_DURATION_DAYS);
    haggleCookieVal = getCookie(HAGGLE_COOKIE_KEY);
    console.log(`Issued cookie: ${haggleCookieVal}`);
  }
}

// ------------------------------------
// APP
// ------------------------------------

let devMode = window.location.origin.toLowerCase().includes("localhost");

let BASE_PATH = devMode ? "" : "https://get-haggle.herokuapp.com";

let containerCss = `
  font-family: 'Lato';
  bottom: 20px;
  left: 20px;
  width: 420px;
  height: 200px;
  background-color: white;
  font-size: 18px;
  border-radius: 30px;
  border: 3px solid black;
  position: fixed;
  z-index: 9999;
  padding: 18px;
`;

let containerHtmlTemplate = `
  Hi there!
  <p style="font-size: 24px; margin-bottom: 8px">
    Work towards <b>30% discount</b>
  </p>
  <div>
    <div style="width: 100%; height: 4px; position: relative; margin-bottom: 10px;">
      <div
        style="
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background-color: #dedede;
          border-radius: 2px;
        "
      ></div>
      <div
        style="
          width: {POOL_COMPLETED_PERCENTAGE}%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background-color: green;
          border-radius: 2px;
        "
      ></div>
    </div>
  </div>
  <p>
    <div style="display:{DISP_HAS_NOT_JOINED_POOL}">
      You'll be the <b>{NEXT_MEMBER_COUNT}{NEXT_MEMBER_COUNT_ORDINAL}</b>!
      <br />
      <b>{CURR_MEMBER_COUNT}</b> have already signed up. We need {REM_MEMBER_COUNT} more
    </div>
    <div style="display:{DISP_HAS_JOINED_POOL}">
      You're in! We need <b>{REM_MEMBER_COUNT}</b> more
    </div>
    <div>
      <span style="color: blue; cursor: pointer; display:{DISP_HAS_NOT_JOINED_POOL}" onclick="enterPool()">Click here</span> to join
      <br />
      <span style="cursor: pointer;  display:{DISP_HAS_JOINED_POOL}" onclick="exitPool()">Leave the pool</span>
    </div>
    <a
      href="{MAIN_URL}"
      target="_blank"
      style="color: #666666; cursor: pointer; text-decoration: none"
    >More info</a>
    <div style="display:{DISP_SHOW_REFRESH}">
      <span style="color: #666666; cursor: pointer" onclick="refresh()">Refresh</span>
    </div>
  </p>
`;

async function main() {
  await loadLibs();
  syncCookie();

  // await onEnter();
  // window.addEventListener("beforeunload", onExit);

  await refresh();
}

async function render() {
  let d = document.getElementById("square-snippet-container");
  if (d) {
    d.remove();
  }

  let getDispProp = (bool) => (bool ? "content" : "none");

  let TARGET_COUNT = stats.pool.TARGET_COUNT;
  let NEXT_MEMBER_COUNT = stats.pool.CURR_MEMBER_COUNT + 1;
  let NEXT_MEMBER_COUNT_ORDINAL = getOrdinal(stats.pool.CURR_MEMBER_COUNT + 1);
  let CURR_MEMBER_COUNT = stats.pool.CURR_MEMBER_COUNT;
  let REM_MEMBER_COUNT = TARGET_COUNT - CURR_MEMBER_COUNT;
  let POOL_COMPLETED_PERCENTAGE = (CURR_MEMBER_COUNT * 100) / TARGET_COUNT;
  let DISP_SHOW_REFRESH = getDispProp(showRefresh);
  let DISP_HAS_JOINED_POOL = getDispProp(stats.pool.HAS_JOINED_POOL);
  let DISP_HAS_NOT_JOINED_POOL = getDispProp(!stats.pool.HAS_JOINED_POOL);
  let MAIN_URL = BASE_PATH;

  let containerHtmlContent = containerHtmlTemplate
    .replace(/{NEXT_MEMBER_COUNT}/g, NEXT_MEMBER_COUNT)
    .replace(/{NEXT_MEMBER_COUNT_ORDINAL}/g, NEXT_MEMBER_COUNT_ORDINAL)
    .replace(/{CURR_MEMBER_COUNT}/g, CURR_MEMBER_COUNT)
    .replace(/{REM_MEMBER_COUNT}/g, REM_MEMBER_COUNT)
    .replace(/{POOL_COMPLETED_PERCENTAGE}/g, POOL_COMPLETED_PERCENTAGE)
    .replace(/{DISP_SHOW_REFRESH}/g, DISP_SHOW_REFRESH)
    .replace(/{DISP_HAS_JOINED_POOL}/g, DISP_HAS_JOINED_POOL)
    .replace(/{DISP_HAS_NOT_JOINED_POOL}/g, DISP_HAS_NOT_JOINED_POOL)
    .replace(/{MAIN_URL}/g, MAIN_URL);

  let div = document.createElement("div");
  div.id = "square-snippet-container";
  div.innerHTML = containerHtmlContent;
  div.setAttribute("style", containerCss);
  await wait(0);
  document.body.appendChild(div);
}

async function refresh() {
  await updateStats();
  await render();
}

// ------------------------------------
// ROOM FEATURES
// ------------------------------------

async function onEnter() {
  let fullPath = `${BASE_PATH}/api/room-enter`;
  let postBody = {
    cookie: haggleCookieVal,
    storePath: `${window.location.origin}${window.location.pathname}`,
  };
  let res = await axios.post(fullPath, postBody);
  console.log(res.data);
  console.log("-------------------");
}

async function onExit() {
  console.log("exit");
  let fullPath = `${BASE_PATH}/api/room-exit`;
  let postBody = {
    cookie: haggleCookieVal,
    storePath: `${window.location.origin}${window.location.pathname}`,
  };
  let res = await axios.post(fullPath, postBody);
  console.log(res.data);
  console.log("-------------------");
}

// ------------------------------------
// POOL FEATURES
// ------------------------------------

let showRefresh = false;
let hasJoinedPool = false;

let stats = {
  pool: {
    TARGET_COUNT: 20,
    CURR_MEMBER_COUNT: 16,
    HAS_JOINED_POOL: false,
  },
};

async function updateStats() {
  let fullPath = `${BASE_PATH}/api/pool-stats`;
  let postBody = {
    cookie: haggleCookieVal,
    storePath: `${window.location.origin}${window.location.pathname}`,
  };
  let res = await axios.post(fullPath, postBody);
  stats = res.data;
  console.log("STATS UPDATED");
  console.log(stats);
}

async function enterPool() {
  let fullPath = `${BASE_PATH}/api/pool-enter`;
  let postBody = {
    cookie: haggleCookieVal,
    storePath: `${window.location.origin}${window.location.pathname}`,
  };
  let res = await axios.post(fullPath, postBody);
  console.log("ENTER-POOL");
  console.log(res.data);
  await refresh();
}

async function exitPool() {
  let fullPath = `${BASE_PATH}/api/pool-exit`;
  let postBody = {
    cookie: haggleCookieVal,
    storePath: `${window.location.origin}${window.location.pathname}`,
  };
  let res = await axios.post(fullPath, postBody);
  console.log("EXIT-POOL");
  console.log(res.data);
  await refresh();
}

main();
