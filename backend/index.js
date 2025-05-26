const express = require("express");
const app = express();
const port = 3000

app.get("/backend", (req, res) => {
    res.send("Respuesta desde el backend")
});

app.listen(port, () => {
    console.log("servidor escuchando desde http://localhost:${port}");
})