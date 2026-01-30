const home = async (req, res) => {

  try {
    res
    .status(200)
    .send("Wellcome out of content controllers js")

  } catch (error) {
    console.log(error)
  }
}

const register = async (req, res) => {

  try {
    res
    .status(200)
    .send("Wellcome out of content register by controller js")
} catch (error) {
  console.log(error)

  }

}

module.exports = { home, register }