const toast = ({
    title = 'Success',
    message = 'Tạo tài khoản thành công',
    type = 'success', 
    duration = 3000
}) => {
    const main = document.getElementById('toast');
    if (main) {
        const toast = document.createElement('div');
        const toastId = `toast-${Date.now()}`;
        toast.setAttribute('id', toastId);

        // Auto remove toast
        const autoRemove = setTimeout(() => {
            if (main.contains(toast)) {
                main.removeChild(toast);
            }
        }, duration + 1000);

        // Remove toast when click btn close
        toast.onclick = (e) => {
            if (e.target.closest('.fa-regular')) {
                clearTimeout(autoRemove);
                if (main.contains(toast)) {
                    main.removeChild(toast);
                }
            }
        };

        const colors = {
            success: '#47d864',
            warning: '#ffc021',
            error: '#ff6243'
        };
        const icons = {
            success: 'fa fa-check',
            warning: 'fa fa-exclamation-triangle',
            error: 'fa fa-times'
        };

        const color = colors[type];
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);
        toast.classList.add('toast', `toast--${type}`);
        toast.style.animation = `slideInLeft ease 0.3s, fadeOut linear 1s ${delay}s forwards`;

        toast.innerHTML = `
            <div class="toast__private">
                <div class="toast__icon">
                    <i class="${icon}"></i>
                </div>
                <div class="toast__body">
                    <h3 class="toast__title">${title}</h3>
                    <p class="toast__msg">${message}</p>
                </div>
                <div class="toast__close">
                    <i class="fa-regular fa-circle-xmark"></i>
                </div>
            </div>
            <div class="toast__background" style="background-color: ${color};"></div>
        `;
        main.appendChild(toast);
    }
};