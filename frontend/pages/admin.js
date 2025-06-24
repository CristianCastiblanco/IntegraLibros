document.addEventListener("DOMContentLoaded", () => {
    const libroForm = document.getElementById("libroForm");
    const libroId = document.getElementById("libroId");
    const nombreInput = document.getElementById("nombre");
    const categoriaInput = document.getElementById("categoria");
    const estadoSelect = document.getElementById("estado");
    const tablaLibros = document.getElementById("tablaLibros");

    const cargarLibros = async () => {
        const res = await fetch("http://localhost:3000/search");
        const libros = await res.json();

        tablaLibros.innerHTML = "";
        libros.forEach(libro => {
            const card = document.createElement("div");
            card.className = "border-b py-2 flex justify-between items-center";

            card.innerHTML = `
        <div>
          <strong>${libro.nombre}</strong> - ${libro.categoria} - ${libro.estado}
        </div>
        <div>
          <button class="bg-yellow-500 text-white px-2 py-1 rounded mr-2" onclick="editarLibro(${libro.id}, '${libro.nombre}', '${libro.categoria}', ${libro.estado === 'Disponible' ? 1 : 0})">Editar</button>
          <button class="bg-red-600 text-white px-2 py-1 rounded" onclick="eliminarLibro(${libro.id})">Eliminar</button>
        </div>
      `;
            tablaLibros.appendChild(card);
        });
    };

    libroForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombre = nombreInput.value;
        const categoria = categoriaInput.options[categoriaInput.selectedIndex].text;
        const estado = parseInt(estadoSelect.value);
        const id = libroId.value;

        const body = JSON.stringify({ nombre, categoria, estado });

        try {
            let res;
            if (id) {
                res = await fetch(`http://localhost:3000/update/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body
                });
            } else {
                res = await fetch("http://localhost:3000/create", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body
                });
            }

            if (res.ok) {
                alert("Libro guardado con éxito");
                libroForm.reset();
                libroId.value = "";
                window.location.href = "home.html";
            } else {
                alert("Error al guardar libro");
            }
        } catch (e) {
            console.error(e);
            alert("Error en la operación");
        }
    });

    window.editarLibro = (id, nombre, categoria, estado) => {
        libroId.value = id;
        nombreInput.value = nombre;
        categoriaInput.value = categoria;
        estadoSelect.value = estado;
    };

    window.eliminarLibro = async (id) => {
        if (confirm("¿Estás seguro de eliminar este libro?")) {
            const res = await fetch(`http://localhost:3000/delete/${id}`, { method: "DELETE" });
            if (res.ok) {
                alert("Libro eliminado");
                cargarLibros();
            } else {
                alert("No se pudo eliminar el libro");
            }
        }
    };
    const cargarCategorias = async () => {
        try {
            const res = await fetch("http://localhost:3000/categorias");
            const categorias = await res.json();
            const categoriaSelect = document.getElementById("categoria");


            categoriaSelect.innerHTML = `<option value="">Seleccione una categoría</option>`;

            categorias.forEach(cat => {
                const option = document.createElement("option");
                option.value = cat.id;
                option.textContent = cat.nombre;
                categoriaSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Error cargando categorías:", error);
        }
    };


    cargarLibros();
    cargarCategorias()
});
