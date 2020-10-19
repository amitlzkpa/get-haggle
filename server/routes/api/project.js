const router = require('express').Router();
const Project = require('../../models/Project');




/**
 * @swagger
 * path:
 *  /api/projects/id/{id}:
 *    get:
 *      summary: Get a project by id.
 *      tags: [Projects]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: Project id to search.
 *      responses:
 *        "200":
 *          description: Stored project entry.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Project'
 */
router.get('/id/:id', async (req, res) => {
  let id = req.params.id;
  let project = await Project.findOne({_id: id});
  return res.json(project);
});


/**
 * @swagger
 * path:
 *  /api/projects/all:
 *    get:
 *      summary: Get all public projects.
 *      tags: [Projects]
 *      responses:
 *        "200":
 *          description: List of public project entries.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Project'
 */
router.get('/all', async (req, res) => {
  let projects = await Project.find({});
  return res.json(projects);
});


/**
 * @swagger
 * path:
 *  /api/projects/current-user:
 *    get:
 *      summary: Get all projects for current user.
 *      tags: [Projects]
 *      responses:
 *        "200":
 *          description: Stored project entries.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Project'
 */
router.get('/current-user', async (req, res) => {
  let projects = await Project.find({user: req.dbUser});
  return res.json(projects);
});


/**
 * @swagger
 * path:
 *  /api/projects/:
 *    post:
 *      summary: Create a new project.
 *      tags: [Projects]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Project'
 *      responses:
 *        "200":
 *          description: Stored project entry.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Project'
 */
router.post('/', async (req, res) => {
  const p = req.body;
  if (!p || p === {}) {
    return res.status(400).send();
  }
  let project = new Project({
    user: req.dbUser,
    name: p.name,
    description: p.description
  });
  project = await project.save();
  return res.json(project);
});


/**
 * @swagger
 * path:
 *  /api/projects/:
 *    put:
 *      summary: Update a project. Returns updated project.
 *      tags: [Projects]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Project'
 *      responses:
 *        "200":
 *          description: Updated project entry.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Project'
 */
router.put('/', async (req, res) => {
  const p = req.body;
  if (!p || p === {} || !p.id) {
    return res.status(400).send();
  }
  let project = await Project.findOne({_id: p.id});
  project.name = p.name || project.name;
  project.description = p.description || project.description;
  project = await project.save();
  return res.json(project);
});


router.get('/test', function(req, res) {
  console.log('Test user route');
  return res.send('Test user route');
});



module.exports = router;