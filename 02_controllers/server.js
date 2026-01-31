const express = require('express');

const app = express();

// routing
const router = require('./router/auth-router');

const connectDb = require("./utils/db")

app.use(express.json());

// middleware
app.use("/api/auth", router)

const PORT = 3000;

connectDb().then(() => {

  app.listen(PORT, () => {
    console.log(`app is running ongoing: ${PORT}`)
  })
})


