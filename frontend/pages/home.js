document.addEventListener("DOMContentLoaded", () => {
    const btnSearch = document.getElementById("btnSearch");

    // Cambiar entre pestañas de Register/Login
    btnSearch.addEventListener("click", async() => {
        try{
            const res = await fetch("http://localhost:3000/search")

            if (res) {
                alert(`${res}`);
            }
        }catch (e) {
            console.error("Error al consultar la función search en el backend:", e);
            alert("Hubo un problema al intentar listar los libros.");
        }
        
    })
})
