const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const database = require("./database")

// Configuración inicial
const app = express();
const port = 3000

app.get("/", (req, res) => {
    res.send("Respuesta desde el backend")
});

app.listen(port, () => {
    console.log(`servidor escuchando desde http://localhost:${port}`);
})


// Middlewares
app.use(morgan("dev"))

app.use(cors({
    origin: "*" //["http://127.0.0.1:8081", "http://127.0.0.1:80", "http://127.0.0.1:8080"]
}))

//Rutas
app.get("/search", async (req, res) => {
    const connection = await database.getconnection();
    const response = await connection.query("select * from LIBROS")
    console.log(response)
    
    //res.json()
})


app.get("/insert", (req, res) => {
    res.json()
})



app.get("/update", (req, res) => {
    res.json()
})


app.get("/delete", (req, res) => {
    res.json()
})