const express = require('express');
const dot = require("dotenv/config");
const { default: router } = require('./http/routes');

const app = express();

app.use(express.json())
app.use(router)

app.listen(process.env.PORT, () => {
    console.log("Server on!")
})