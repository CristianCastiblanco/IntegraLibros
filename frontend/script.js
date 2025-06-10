const basePath = window.location.pathname.includes('/IntegralLibros') ? '/IntegralLibros/' : '/';

document.addEventListener("DOMContentLoaded", () => {
    const btnRegister = document.getElementById("btnRegister");
    const btnLogin = document.getElementById("btnLogin");
    const register = document.getElementById("register");
    const login = document.getElementById("login");
    const createAccount = document.getElementById("createAccount");
    const loginS = document.getElementById("loginS");

    // Cambiar entre pestañas de Register/Login
    btnRegister.addEventListener("click", () => {
        register.classList.remove("hidden");
        login.classList.add("hidden");
        btnRegister.classList.add("bg-blue-600", "text-white");
        btnLogin.classList.remove("bg-blue-600", "text-white");
    });

    btnLogin.addEventListener("click", () => {
        login.classList.remove("hidden");
        register.classList.add("hidden");
        btnLogin.classList.add("bg-blue-600", "text-white");
        btnRegister.classList.remove("bg-blue-600", "text-white");
    });

    // Crear cuenta
    createAccount.addEventListener("click", () => {
        const name = document.getElementById("nameRegister").value;
        const email = document.getElementById("emailRegister").value;
        const password = document.getElementById("passwordRegister").value;

        if (name && email && password) {
            const user = { name, email, password };
            localStorage.setItem("user", JSON.stringify(user));
            alert("Cuenta creada exitosamente. Ahora puedes iniciar sesión.");
        } else {
            alert("Por favor, completa todos los campos.");
        }
    });

    // Iniciar sesión validando contra el archivo users.json
    loginS.addEventListener("click", async () => {
        const email = document.getElementById("emailLogin").value;
        const password = document.getElementById("passwordLogin").value;

        try {
            const response = await fetch(`${basePath}data/users.json`);
            const users = await response.json();

            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                alert(`Bienvenido, ${user.name} (${user.role})`);
                localStorage.setItem("userLogin", JSON.stringify(user));
                window.location.href = "pages/home.html";
            } else {
                alert("Correo o contraseña incorrectos.");
            }
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
            alert("Hubo un problema al intentar iniciar sesión.");
        }
    });
});
