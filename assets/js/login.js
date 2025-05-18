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

// Chức năng đăng kí
document.querySelector('.sign-up form').addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
        const response = await fetch('../BE/register.php', {
            method: "POST",
            body: formData
        });
        const { status, message } = await response.json();
        if (status === "success") {
            toast({
                title: "Thành công",
                message: message,
                type: "success",
                duration: 3000
            });
            e.target.reset();
            setTimeout(() => login.click(), 1500);
        }
        else {
            toast({
                title: "Lỗi",
                message: message,
                type: "error",
                duration: 3000
            });
        }

    } catch (error) {
        toast({
            title: 'Lỗi',
            message: 'Có lỗi xảy ra. Vui lòng thử lại sau.',
            type: 'error',
            duration: 3000
        });
    }
});
// Chức năng đăng nhập
document.querySelector('.sign-in form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
        const response = await fetch('../BE/login.php', {
            method: 'POST',
            body: formData
        });
        
        const { status, message, redirect } = await response.json();
        
        if (status === 'success') {
            toast({
                title: 'Thành công',
                message: message,
                type: 'success',
                duration: 3000
            });
            setTimeout(() => {
                window.location.href = redirect;
            }, 1500);
        } else {
            toast({
                title: 'Lỗi',
                message: message,
                type: 'error',
                duration: 3000
            });
        }
    } catch (error) {
        toast({
            title: 'Lỗi',
            message: 'Có lỗi xảy ra. Vui lòng thử lại sau.',
            type: 'error',
            duration: 3000
        });
    }
});

