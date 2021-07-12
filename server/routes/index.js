const router = require("express").Router();

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const SQUARE_CLIENT_ID = process.env.SQUARE_CLIENT_ID;

// these aren't really secrets
router.get("/api/env", function(req, res) {
  const creds = {
    AUTH0_DOMAIN: AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: AUTH0_CLIENT_ID,
    SQUARE_CLIENT_ID: SQUARE_CLIENT_ID,
  };
  return res.json(creds);
});

router.use("/api", require("./api"));

module.exports = router;
