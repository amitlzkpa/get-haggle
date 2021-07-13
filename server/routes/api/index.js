const router = require("express").Router();

const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const User = require("../../models/User");

const AUTH0_JWKS_URI = `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`;
const AUTH0_TOKEN_ISSUER = `https://${process.env.AUTH0_DOMAIN}/`;
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: AUTH0_JWKS_URI,
  }),
  audience: AUTH0_CLIENT_ID,
  issuer: AUTH0_TOKEN_ISSUER,
  algorithms: ["RS256"],
});

const errHandler = async function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    return res.status(403).json({
      success: false,
      message: err.message || "Failed to authenticate token.",
    });
  }
  next();
};

const addUserToReq = async function(req, res, next) {
  let dbUser = await User.findOne({ username: req.user.nickname });
  req.dbUser = dbUser;
  req.auth0User = req.user;
  next();
};

// protected routes
router.use("/users", [checkJwt, errHandler, addUserToReq], require("./user"));
router.use(
  "/square",
  [checkJwt, errHandler, addUserToReq],
  require("./square")
);
router.use(
  "/projects",
  [checkJwt, errHandler, addUserToReq],
  require("./project")
);

// PUBLIC

// public routes
router.use("/test", function(req, res) {
  console.log("Test route");
  return res.send("Test route");
});

// ------------------------------------
// ROOMS
// ------------------------------------

let currRooms = {};

// public routes for rooms
router.post("/room-enter", function(req, res) {
  let { storePath = "", cookie = "" } = req.body;
  let cookieArr = currRooms[storePath];
  if (!cookieArr) {
    currRooms[storePath] = [];
    cookieArr = currRooms[storePath];
  }
  if (!cookieArr.includes(cookie)) {
    cookieArr.push(cookie);
    console.log(`${cookie} entered room: ${storePath}`);
  }
  return res.send(cookieArr);
});

router.post("/room-exit", function(req, res) {
  let { storePath = "", cookie = "" } = req.body;
  let hasARoom = currRooms[storePath];
  if (hasARoom) {
    currRooms[storePath] = currRooms[storePath].filter((i) => i !== cookie);
    console.log(`${cookie} exited room: ${storePath}`);
  }
  return res.json({ message: "SUCCESS!" });
});

// ------------------------------------
// POOLS
// ------------------------------------

let currPools = {};

router.post("/pool-stats", function(req, res) {
  let { storePath = "", cookie = "" } = req.body;
  let cookieArr = currPools[storePath];
  if (!cookieArr) {
    currPools[storePath] = [];
    cookieArr = currPools[storePath];
  }

  let TARGET_COUNT = 20;
  let CURR_MEMBER_COUNT = cookieArr.length + 16;
  let HAS_JOINED_POOL = cookieArr.includes(cookie);
  let IS_DONE = CURR_MEMBER_COUNT >= TARGET_COUNT;

  let stats = {
    pool: {
      TARGET_COUNT,
      CURR_MEMBER_COUNT,
      HAS_JOINED_POOL,
      IS_DONE,
    },
  };
  return res.send(stats);
});

router.post("/pool-enter", function(req, res) {
  let { storePath = "", cookie = "" } = req.body;
  let cookieArr = currPools[storePath];
  if (!cookieArr) {
    currPools[storePath] = [];
    cookieArr = currPools[storePath];
  }
  if (!cookieArr.includes(cookie)) cookieArr.push(cookie);
  return res.send(cookieArr);
});

router.post("/pool-exit", function(req, res) {
  let { storePath = "", cookie = "" } = req.body;
  let hasAPool = currPools[storePath];
  if (hasAPool) {
    currPools[storePath] = currPools[storePath].filter((i) => i !== cookie);
    console.log(`${cookie} exited pool: ${storePath}`);
  }
  return res.json({ message: "SUCCESS!" });
});

module.exports = router;
