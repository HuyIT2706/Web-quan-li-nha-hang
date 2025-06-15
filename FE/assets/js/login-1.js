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

// Đăng kí 
document.querySelector('.sign-up form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
        // Lấy response trả về từ register.php
        const response = await fetch('../BE/register.php', {
            method: 'POST',
            body: formData
        });
        const { status, message } = await response.json();
        if (status === 'success') {
            toast({
                title: 'Thành công',
                message: message,
                type: 'success',
                duration: 3000
            });
            e.target.reset();
            setTimeout(() => login.click(), 1500);
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

// login submit
document.querySelector('.sign-in form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
        const response = await fetch('../BE/login.php', {
            method: 'POST',
            body: formData
        });

        const { status, message, redirect, user_id, rank_name, discount } = await response.json();

        if (status === 'success') {
            toast({
                title: 'Thành công',
                message: message,
                type: 'success',
                duration: 3000
            });
            if (user_id !== undefined && user_id !== null) {
                localStorage.setItem('user_id', user_id);
                localStorage.setItem('rank_name', rank_name);
                localStorage.setItem('discount', discount);
            }
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
const phoneInputs = document.querySelectorAll('.phone-input');
const errorMessages = document.querySelectorAll('.sign-in__error');
const forms = [document.getElementById('signinForm'), document.getElementById('signupForm')];
phoneInputs.forEach((input, index) => {
    input.addEventListener('input', function () {
        const phoneNumber = this.value.replace(/\D/g, '');
        if (phoneNumber.length !== 10) {
            errorMessages[index].style.display = 'block';
            this.style.borderColor = 'red';
        } else {
            errorMessages[index].style.display = 'none';
            this.style.borderColor = '';
        }
    });
});
forms.forEach((form, index) => {
    form.addEventListener('submit', function (e) {
        const phoneNumber = phoneInputs[index].value.replace(/\D/g, '');
        if (phoneNumber.length !== 10) {
            e.preventDefault();
            errorMessages[index].style.display = 'block';
            phoneInputs[index].style.borderColor = 'red';
        }
    });
});