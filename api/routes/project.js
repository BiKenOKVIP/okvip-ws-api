const projectController = require("../controllers/projectController");
const middleware = require("../routes/middleware");

const router = require("express").Router();

router.get("/getAllProjects", projectController.getAllProjects);
router.post("/insert", projectController.insertProject);
router.delete("/delete/:id", projectController.deleteProject);
router.put("/update/:id", projectController.updateProject);

module.exports = router;
