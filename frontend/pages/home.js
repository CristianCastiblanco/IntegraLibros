document.addEventListener("DOMContentLoaded", () => {
    const btnSearch = document.getElementById("booksList");
    const userData = localStorage.getItem("userLogin");
    if (userData) {
        const user = JSON.parse(userData);
        if (user.role === "admin") {
            const adminLink = document.getElementById("adminLink");
            if (adminLink) {
                adminLink.classList.remove("hidden");
            }
        }
    }

    // Función que pinta los libros
    const cargarLibros = async () => {
        console.log("Cargando libros...");
        try {
            const res = await fetch("http://localhost:3000/search");
            const libros = await res.json();

            booksList.innerHTML = "";

            libros.forEach(libro => {
                console.log(libro);
                const card = document.createElement("div");
                card.className = "bg-white shadow-md rounded-lg p-4 w-64 text-center";

                card.innerHTML = `
          <h4 class="text-lg font-semibold">${libro.nombre}</h4>
          <p class="text-sm text-gray-600 mb-2">${libro.categoria}</p>
          <span class="inline-block px-2 py-1 rounded-full text-white text-xs font-bold ${libro.estado === 'Disponible' ? 'bg-green-500' : 'bg-red-500'}">
            ${libro.estado}
          </span>
          <br>
           <a href="detalle.html?id=${libro.id}" class="mt-3 inline-block bg-blue-500 hover:bg-blue-700 text-white text-xs font-semibold py-2 px-4 rounded">
             Ver más </a>
        `;

                booksList.appendChild(card);
            });
        } catch (error) {
            console.error("Error al cargar libros:", error);
            booksList.innerHTML = `<p class="text-red-600">Hubo un problema al cargar los libros.</p>`;
        }
    };

    cargarLibros();
})
