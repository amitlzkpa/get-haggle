const router = require("express").Router();
const Project = require("../../models/Project");

router.get("/id/:id", async (req, res) => {
  let id = req.params.id;
  let project = await Project.findOne({ _id: id });
  return res.json(project);
});

router.delete("/id/:id", async (req, res) => {
  let id = req.params.id;
  let project = await Project.findOne({ _id: id });
  let del = await project.delete();
  return res.json(del);
});

router.get("/all", async (req, res) => {
  let projects = await Project.find({ public: true });
  return res.json(projects);
});

router.get("/current-user", async (req, res) => {
  let projects = await Project.find({ user: req.dbUser });
  return res.json(projects);
});

router.post("/", async (req, res) => {
  const p = req.body;
  if (!p || p === {}) {
    return res.status(400).send();
  }
  let project = new Project({
    user: req.dbUser,
    name: p.name,
    description: p.description,
  });
  project = await project.save();
  return res.json(project);
});

router.put("/", async (req, res) => {
  const p = req.body;
  if (!p || p === {} || !p._id) {
    return res.status(400).send();
  }
  let project = await Project.findOne({ _id: p._id });
  project.name = p.name || project.name;
  project.description = p.description || project.description;
  project = await project.save();
  return res.json(project);
});

router.get("/test", function(req, res) {
  console.log("Test user route");
  return res.send("Test user route");
});

module.exports = router;
