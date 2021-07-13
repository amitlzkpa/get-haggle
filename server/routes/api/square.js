const axios = require("axios");
const router = require("express").Router();
const { Client, Environment } = require("square");

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
    environment: Environment.Sandbox,
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
