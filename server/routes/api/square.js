const axios = require("axios");
const router = require("express").Router();
const { Client, Environment } = require("square");

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
