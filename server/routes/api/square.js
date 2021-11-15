const axios = require("axios");
const router = require("express").Router();
const { Client } = require("square");

let defaultSquareReqHeaders = {
  "Content-Type": "application/json",
  "Square-Version": "2021-10-20",
};

router.post("/connect", async (req, res) => {
  let tokenURL = `https://connect.${process.env.SQUARE_API_ENDPT}.com/oauth2/token`;
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
    ...defaultSquareReqHeaders,
    Authorization: `${req.dbUser.squareToken.token_type} ${req.dbUser.squareToken.access_token}`,
  };
  let apiEndPt = `https://connect.${process.env.SQUARE_API_ENDPT}.com/v2/catalog/list?types=ITEM`;
  let resp = await axios.get(apiEndPt, { headers });
  let storeItems = resp.data.objects.filter(
    (i) =>
      !i.is_deleted &&
      i.item_data.ecom_visibility.toLowerCase() === "visible" &&
      i.item_data.ecom_available &&
      i.item_data.ecom_uri.includes(req.body.storeDomain)
  );
  let retVal = {
    storeItems,
  };
  return res.json(retVal);
});

router.post("/get-my-stores", async function(req, res) {
  const headers = {
    ...defaultSquareReqHeaders,
    Authorization: `${req.dbUser.squareToken.token_type} ${req.dbUser.squareToken.access_token}`,
  };
  let apiEndPt = `https://connect.${process.env.SQUARE_API_ENDPT}.com/v2/sites`;
  let resp = await axios.get(apiEndPt, { headers });
  return res.json(resp.data);
});

router.post("/add-snippet-to-store", async function(req, res) {
  let siteId = req.body.siteId;
  const headers = {
    ...defaultSquareReqHeaders,
    Authorization: `${req.dbUser.squareToken.token_type} ${req.dbUser.squareToken.access_token}`,
  };
  let postBody = {
    snippet: {
      content:
        '<script src="https://get-haggle.herokuapp.com/square-snippet.js"></script>',
    },
  };
  let apiEndPt = `https://connect.${process.env.SQUARE_API_ENDPT}.com/v2/sites/${siteId}/snippet`;
  let resp = await axios.post(apiEndPt, postBody, { headers });
  return res.json(resp.data);
});

router.post("/retrieve-snippet-for-store", async function(req, res) {
  let siteId = req.body.siteId;
  const headers = {
    ...defaultSquareReqHeaders,
    Authorization: `${req.dbUser.squareToken.token_type} ${req.dbUser.squareToken.access_token}`,
  };
  let apiEndPt = `https://connect.${process.env.SQUARE_API_ENDPT}.com/v2/sites/${siteId}/snippet`;
  try {
    let resp = await axios.get(apiEndPt, { headers });
    return res.json(resp.data);
  } catch {
    return res.json({});
  }
});

router.post("/remove-snippet-from-store", async function(req, res) {
  let siteId = req.body.siteId;
  const headers = {
    ...defaultSquareReqHeaders,
    Authorization: `${req.dbUser.squareToken.token_type} ${req.dbUser.squareToken.access_token}`,
  };
  let apiEndPt = `https://connect.${process.env.SQUARE_API_ENDPT}.com/v2/sites/${siteId}/snippet`;
  let resp = await axios.delete(apiEndPt, { headers });
  return res.json(resp.data);
});

router.use("/test", function(req, res) {
  console.log("Test square route");
  return res.send("Test square route");
});

module.exports = router;
