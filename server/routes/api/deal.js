const router = require("express").Router();
const Deal = require("../../models/Deal");

router.get("/id/:id", async (req, res) => {
  let id = req.params.id;
  let deal = await Deal.findOne({ _id: id });
  return res.json(deal);
});

router.delete("/id/:id", async (req, res) => {
  let id = req.params.id;
  let deal = await Deal.findOne({ _id: id });
  let del = await deal.delete();
  return res.json(del);
});

router.get("/all", async (req, res) => {
  let deals = await Deal.find({ public: true });
  return res.json(deals);
});

router.get("/current-user", async (req, res) => {
  let deals = await Deal.find({ user: req.dbUser });
  return res.json(deals);
});

router.post("/", async (req, res) => {
  const p = req.body;
  if (!p || p === {}) {
    return res.status(400).send();
  }
  let deal = new Deal({
    user: req.dbUser,
    name: p.name,
    description: p.description,
  });
  deal = await deal.save();
  return res.json(deal);
});

router.put("/", async (req, res) => {
  const p = req.body;
  if (!p || p === {} || !p._id) {
    return res.status(400).send();
  }
  let deal = await Deal.findOne({ _id: p._id });
  deal.name = p.name || deal.name;
  deal.description = p.description || deal.description;
  deal = await deal.save();
  return res.json(deal);
});

router.get("/test", function(req, res) {
  console.log("Test user route");
  return res.send("Test user route");
});

module.exports = router;
