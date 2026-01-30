const express = require('express');

const app = express();

// routing
const router = require('./router/auth-router');


// middleware
app.use("/api/auth", router)

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`app is running ongoing: ${PORT}`)
})

