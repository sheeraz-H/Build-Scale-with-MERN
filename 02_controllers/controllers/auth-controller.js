const home = async (req, res) => {
  try {
    res.status(200).send("Wellcome out of content controllers j again s");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    console.log(req.body);
    // Only send JSON response (remove .send)
    res.status(200).json({ message: req.body });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { home, register };
