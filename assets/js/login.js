// ================ Login ===========================

const container = document.getElementById('container');
const login = document.getElementById("login");
const register = document.getElementById("register");

register.addEventListener('click', () => {
    container.classList.add("active");
});

login.addEventListener('click', () => {
    container.classList.remove("active");
});

