const express = require('express');

const app = express();

const router = require('./router/auth-router');

app.use("/api/auth", router)

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`app is running on: ${PORT}`)
})

