// Quảng cáo tự động chạy
let currentIndex = 0;
const images = document.querySelectorAll('.carousel-container img');
const totalImages = images.length;

function carousel() {
    images.forEach(img => img.style.display = 'none');
    images[currentIndex].style.display = 'block';
    currentIndex = (currentIndex + 1) % totalImages;
}

setInterval(carousel, 3000); // 3 giây chuyển slide một lần

carousel(); // Khởi chạy carousel ngay lập tức

//Thêm sản phẩm vào
