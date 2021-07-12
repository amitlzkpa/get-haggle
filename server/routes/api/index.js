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

// ROOMS

let currRooms = {};

// public routes for rooms
router.post("/room-enter", function(req, res) {
  let { roomUrl = "", cookie = "" } = req.body;
  let pplArr = currRooms[roomUrl];
  if (!pplArr) {
    currRooms[roomUrl] = [];
    pplArr = currRooms[roomUrl];
  }
  pplArr.push(cookie);
  console.log(JSON.stringify(currRooms, null, 2));
  return res.send(currRooms);
});

module.exports = router;
