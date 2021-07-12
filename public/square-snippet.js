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

// ------------------------------------
// EXT LIB FEATURES
// ------------------------------------

let jsLibs = ["https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.js"];

// ref: https://gist.github.com/james2doyle/28a59f8692cec6f334773007b31a1523
function loadScript(src) {
  return new Promise(function(resolve, reject) {
    const s = document.createElement("script");
    let r = false;
    s.type = "text/javascript";
    s.src = src;
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

async function loadJsLibs() {
  for (let jsLibUrl of jsLibs) {
    await loadScript(jsLibUrl);
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
  font-family: 'Roboto';
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

let containerHtml = `
  Hi there!
  <p style="font-size: 24px; margin-bottom: 8px">
    Work towards <b>30% discount</b>
  </p>
  <div>
    <div style="height:6px; width:300px; background-color: green; border-radius:2px; margin-bottom: 10px;">
    </div>
  </div>
  <p>
    <b>14</b> have already signed up
    <br />
    Be the <b>6th</b>
    <br />
    <span style="color: blue; cursor: pointer" onclick="enterPool()">Click here</span> to join
    <br />
    <span style="color: red; cursor: pointer" onclick="exitPool()">Exit</span>
    <br />
    <span style="color: #dedede; cursor: pointer">More info</span>
  </p>
`;

async function main() {
  await loadJsLibs();
  syncCookie();

  // await onEnter();
  // window.addEventListener("beforeunload", onExit);

  await render();
}

async function render() {
  let div = document.createElement("div");
  div.id = "container";
  div.innerHTML = containerHtml;
  div.setAttribute("style", containerCss);
  await wait(0);
  document.body.appendChild(div);
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

async function enterPool() {
  let fullPath = `${BASE_PATH}/api/pool-enter`;
  let postBody = {
    cookie: haggleCookieVal,
    storePath: `${window.location.origin}${window.location.pathname}`,
  };
  let res = await axios.post(fullPath, postBody);
  console.log(res.data);
}

async function exitPool() {
  let fullPath = `${BASE_PATH}/api/pool-exit`;
  let postBody = {
    cookie: haggleCookieVal,
    storePath: `${window.location.origin}${window.location.pathname}`,
  };
  let res = await axios.post(fullPath, postBody);
  console.log(res.data);
}

main();
