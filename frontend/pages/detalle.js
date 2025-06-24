document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const contenedor = document.getElementById("detalleLibro");

    if (!id) {
        contenedor.innerHTML = `<p class="text-red-600">No se encontró el libro. ID no proporcionado.</p>`;
        return;
    }

    try {
        const res = await fetch(`http://localhost:3000/libros/${id}`);
        if (!res.ok) throw new Error("Libro no encontrado");

        const libro = await res.json();

        contenedor.innerHTML = `
      <h2 class="text-xl font-semibold mb-2">${libro.nombre}</h2>
      <p class="text-gray-600 mb-1"><strong>Categoría:</strong> ${libro.categoria}</p>
      <p class="text-gray-600 mb-4">
        <strong>Estado:</strong>
        <span class="${libro.estado === 'Disponible' ? 'text-green-600' : 'text-red-600'}">
          ${libro.estado}
        </span>
      </p>
      ${
            libro.estado === 'Disponible'
                ? `<button id="btnPrestar" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Prestar libro
            </button>` : `<p class="text-sm text-red-500">Este libro no está disponible para préstamo.</p>`
        }
    `;
        if (libro.estado === 'Disponible') {
            console.log("Libro disponible para préstamo", libro);
            const btn = document.getElementById("btnPrestar");
            btn.addEventListener("click", async () => {
                const libroActualizado = {
                    nombre: libro.nombre,
                    categoria: libro.categoria,
                    estado: 0
                };
                try {

                    const r = await fetch(`http://localhost:3000/update/${id}`, { method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(libroActualizado)
                    });
                    if (r.ok) {
                        alert("¡Libro prestado con éxito!");
                        window.location.href = "home.html";
                    } else {
                        alert("No se pudo prestar el libro.");
                    }
                } catch (e) {
                    console.error("Error al prestar libro:", e);
                    alert("Hubo un error al procesar la solicitud.");
                }
            });
        }

    } catch (error) {
        console.error("Error cargando el libro:", error);
        contenedor.innerHTML = `<p class="text-red-600">Error al cargar detalles del libro.</p>`;
    }
});
