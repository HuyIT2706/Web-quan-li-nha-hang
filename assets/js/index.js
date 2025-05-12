
document.addEventListener('DOMContentLoaded', () => {
    
    const containerProduct = document.getElementById('container-product');
    const orderModalOverlay = document.getElementById('orderModalOverlay');
    const orderModalClose = document.getElementById('orderModalClose');
    const openCartProduct = document.querySelectorAll('.food-card__order-btn');
    openCartProduct.forEach(btn => {
        btn.addEventListener('click', () => {
            if (containerProduct) {
                
                containerProduct.style.opacity = '1';
                containerProduct.style.visibility = 'visible';
            }
            
        });
    });
    [orderModalOverlay, orderModalClose].forEach(el => {
        if (el) {
            el.addEventListener('click', () => {
                if (containerProduct){
                    containerProduct.style.opacity = '0';
                    containerProduct.style.visibility = 'hidden';   
                }
            });
        }
    });
    
});
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
const slideInterval = 2500; 
// Cập nhật slide
const updateSlider = ()  => {
    slider.style.transform = `translateX(-${currentSlide * 25}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}
// Chuyển từng slide
const nextSlide = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}
let slideTimer = setInterval(nextSlide, slideInterval);
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
        clearInterval(slideTimer);
        slideTimer = setInterval(nextSlide, slideInterval);
    });
});
// Mở giỏ hàng (bạn có thể gắn vào icon giỏ hàng)
const homeContainer = document.getElementById("home--container");
const cartModalDark = document.getElementById("cartModalDark");
const handleCart = () => {
    homeContainer.style.display = "none";
    cartModalDark.style.display = "block";
}
