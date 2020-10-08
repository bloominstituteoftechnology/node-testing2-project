  const validateSpell = () => {
      return (req, res, next) => {
          if (!req.body.name || !req.body.level || !req.body.school || !req.body.class) {
              res.status(400).json({message: 'Must include a spell name, level, school, and class.'})
          } else {
              next();
          }
      };
  };

  module.exports = validateSpell;   