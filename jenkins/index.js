const express = require("express");
const app = express();
const port = 5000

app.get("/jenkins", (req, res) => {
    res.send("Respuesta desde jenkins")
});

app.listen(port, () => {
    console.log("servidor escuchando desde http://localhost:${port}");
})