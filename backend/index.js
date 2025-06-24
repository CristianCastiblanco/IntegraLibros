const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require('./db');


// Configuración inicial
const app = express();
const port = 3000
app.use(express.json());

// Middlewares
app.use(morgan("dev"))

app.use(cors({
    origin: "*" //["http://127.0.0.1:8081", "http://127.0.0.1:80", "http://127.0.0.1:8080"]
}))

app.get("/", (req, res) => {
    res.send("Respuesta desde el backend")
});



app.get("/search", async (req, res) => {
    console.log("Consultando libros");
    try {
        const [rows] = await db.query(
            "SELECT l.id, c.nombre AS categoria, l.nombre, " +
            "CASE WHEN l.estado= 1 THEN 'Disponible' " +
            "ELSE 'No Disponible' END AS estado" +
            " FROM libros l JOIN categorias c ON l.categoria= c.id");
        res.json(rows);
    } catch (err) {
        console.error('Error consultando libros:', err);
        res.status(500).json({error: 'Error al obtener libros'});
    }
})


app.post("/create", async (req, res) => {
    console.log("Creando nuevo libro");

    const { nombre, categoria, estado } = req.body;
    console.log(req.body);

    if (!nombre || !categoria || typeof estado === 'undefined') {
        return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    try {
        const [catRows] = await db.query(
            "SELECT id FROM categorias WHERE nombre = ? ",
            [categoria]
        );

        if (catRows.length === 0) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }

        const categoriaId = parseInt(catRows[0].id);
        const [result] = await db.query(
            "INSERT INTO libros (categoria,nombre,estado) VALUES (?, ?, ?)",
            [categoriaId, nombre, estado]
        );

        res.status(201).json({
            message: "Libro creado exitosamente",
            id: result.insertId
        });
    } catch (err) {
        console.error("Error creando libro:", err);
        res.status(500).json({ error: "Error al crear libro" });
    }
});




app.put("/update/:id", async (req, res) => {
    console.log("Actualizando libro", req.body);
    const { nombre, categoria, estado } = req.body;
    const id = req.params.id;

    if (!nombre || !categoria || typeof estado === 'undefined') {
        return res.status(400).json({ error: "Faltan campos requeridos para actualizar el libro" });
    }

    try {
        const [catRows] = await db.query(
            "SELECT id FROM categorias WHERE nombre = ? ",
            [categoria]
        );

        if (catRows.length === 0) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }

        const categoriaId = catRows[0].id;

        const [result] = await db.query(
            "UPDATE libros " +
            "SET nombre = ?, categoria = ?, estado = ? "+
            " WHERE id = ? ",
            [nombre, categoriaId, estado, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Libro no encontrado" });
        }

        res.json({ mensaje: "Libro actualizado con éxito" });
    } catch (err) {
        console.error("Error al actualizar libro:", err);
        res.status(500).json({ error: "Error al actualizar el libro" });
    }
})


app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    console.log(`Eliminando libro con ID: ${id}`);

    try {
        const [result] = await db.query(
            "DELETE FROM libros WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Libro no encontrado" });
        }

        res.json({ message: "Libro eliminado exitosamente" });
    } catch (err) {
        console.error("Error eliminando libro:", err);
        res.status(500).json({ error: "Error al eliminar libro" });
    }
});

app.get("/libros/:id", async (req, res) => {
    console.log("Consultando libro");
    try {
        const [rows] = await db.query(
            "SELECT l.id, c.nombre AS categoria, l.nombre, " +
            "CASE WHEN l.estado= 1 THEN 'Disponible' " +
            "ELSE 'No Disponible' END AS estado " +
            " FROM libros l JOIN categorias c ON l.categoria= c.id " +
            "WHERE l.id = ?", [req.params.id]);
        res.json(rows[0]);
    } catch (err) {
        console.error('Error consultando libros:', err);
        res.status(500).json({error: 'Error al obtener libros'});
    }
})

app.get("/categorias", async (req, res) => {
    console.log("Consultando categorías...");
    try {
        const [rows] = await db.query("SELECT id, nombre FROM categorias");
        res.json(rows);
    } catch (err) {
        console.error("Error consultando categorías:", err);
        res.status(500).json({ error: "Error al obtener categorías" });
    }
});

app.listen(port, () => {
    console.log(`servidor escuchando desde http://localhost:${port}`);
})


