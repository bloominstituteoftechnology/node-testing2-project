const router = require("express").Router();
const Student = require("./students-model");

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const dStudent = await Student.deleteStudent(id);
    res.status(200).json(dStudent);
   
  } catch (err) {
    next(err);
  }
});

module.exports = router;
