const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

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
app.get("/search", (req, res) => {
    res.json([
        {id:1,
         categoria: "Ciencias Naturales",
         nombre: "Fisica I",
         estado: "Disponible"
        },
        {id:2,
         categoria: "Ciencias Naturales",
         nombre: "Fisica II",
         estado: "No disponible"
        },
        {id:3,
         categoria: "Matematicas",
         nombre: "Algebra de Baldor",
         estado: "Disponible"
        },
        {id:4,
         categoria: "Ciencias Sociles",
         nombre: "Atlas",
         estado: "No disponible"
        }
    ])
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