const Student = require('../api/students-model');

function handleError(err, req, res, next) { //eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    prodMessage: 'something went really wrong!',
    stack: err.stack,
  });
}

const checkStudentId = async (req, res, next) => {
    try {
        const student = await Student.getById(req.params.id);
        if (!student) {
            next({ status: 404, message: 'not found' });
        } else {
            req.student = student;
            next();
        }
    } catch (error) {
        next(error);
    }
};


function checkValidStudent (req, res, next) {
  if (!req.body.student_name || !req.body.student_name .trim()) {
    res.status(422).json({ message: "Provide a name"})
  } else {
    next();
  }
}

module.exports = {
  handleError,
  checkStudentId,
  checkValidStudent,
}