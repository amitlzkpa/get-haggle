const axios = require("axios");
const router = require("express").Router();
const { Client, Environment } = require("square");

router.post("/connect", async (req, res) => {
  let tokenURL = "https://connect.squareup.com/oauth2/token";
  let postData = {
    client_id: process.env.SQUARE_CLIENT_ID,
    client_secret: process.env.SQUARE_CLIENT_SECRET,
    code: req.body.authCode,
    grant_type: "authorization_code",
  };
  let r = await axios.post(tokenURL, postData);
  let u = req.dbUser;
  u.squareToken = r.data;
  u = await u.save();
  return res.json(u);
});

router.post("/get-store-details", async function(req, res) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${req.dbUser.squareToken.token_type} ${req.dbUser.squareToken.access_token}`,
  };
  let apiEndPt = "https://connect.squareup.com/v2/sites";
  let resp = await axios.get(apiEndPt, { headers });
  return res.json(resp.data);
});

router.post("/get-my-stores", async function(req, res) {
  let client = new Client({
    accessToken: req.dbUser.squareToken.access_token,
  });
  let stores = await client.sitesApi.listSites();
  return res.json(stores);
});

router.use("/test", function(req, res) {
  console.log("Test square route");
  return res.send("Test square route");
});

module.exports = router;
