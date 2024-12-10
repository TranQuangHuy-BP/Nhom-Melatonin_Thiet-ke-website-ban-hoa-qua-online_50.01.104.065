document.addEventListener("DOMContentLoaded", function () {
    const priceFilter = document.getElementById("price");
    const sortFilter = document.getElementById("sort");
    const discountFilter = document.getElementById("discount");
    const resetButton = document.getElementById("resetFilters");

    // Hàm lọc sản phẩm
    function filterProducts() {
        const products = document.querySelectorAll(".product");
        const priceValue = priceFilter.value;
        const sortValue = sortFilter.value;
        const discountValue = discountFilter.value;

        // Lọc theo giá
        products.forEach(product => {
            const price = parseInt(product.getAttribute("data-price"));
            const hasDiscount = product.getAttribute("data-discount") === "true";
            let priceMatch = false;

            // Kiểm tra giá theo từng phạm vi
            if (priceValue === "under50k" && price < 50000) priceMatch = true;
            else if (priceValue === "50k-100k" && price >= 50000 && price <= 100000) priceMatch = true;
            else if (priceValue === "100k-200k" && price >= 100000 && price <= 200000) priceMatch = true;
            else if (priceValue === "over200k" && price > 200000) priceMatch = true;
            else if (priceValue === "all") priceMatch = true;

            // Kiểm tra khuyến mãi
            const discountMatch = 
            discountValue === "all" || 
            (discountValue === "discounted" && hasDiscount) || 
            (discountValue === "no-discount" && !hasDiscount);

            // Hiển thị sản phẩm nếu thỏa mãn điều kiện lọc
            if (priceMatch && discountMatch) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });

        // Sắp xếp sản phẩm
        const visibleProducts = Array.from(products).filter(product => product.style.display !== "none");

        if (sortValue === "price-asc") {
            visibleProducts.sort((a, b) => {
                return parseInt(a.getAttribute("data-price")) - parseInt(b.getAttribute("data-price"));
            });
        } else if (sortValue === "price-desc") {
            visibleProducts.sort((a, b) => {
                return parseInt(b.getAttribute("data-price")) - parseInt(a.getAttribute("data-price"));
            });
        }

        // Thêm lại sản phẩm đã sắp xếp
        visibleProducts.forEach(product => {
            product.parentElement.appendChild(product);
        });
    }

    // Gắn sự kiện thay đổi cho các bộ lọc
    priceFilter.addEventListener("change", filterProducts);
    sortFilter.addEventListener("change", filterProducts);
    discountFilter.addEventListener("change", filterProducts);

    // Gắn sự kiện cho nút "Đặt lại"
    resetButton.addEventListener("click", function () {
        // Đặt lại tất cả các bộ lọc về mặc định
        priceFilter.value = "all";
        sortFilter.value = "default";
        discountFilter.value = "all";
        
        // Gọi lại hàm lọc để hiển thị lại tất cả sản phẩm
        filterProducts();
    });

    // Lọc sản phẩm khi tải trang
    filterProducts();
});

//Tìm kiếm
// Lấy tất cả các sản phẩm
const products = document.querySelectorAll('.product');

// Hàm xử lý tìm kiếm sản phẩm
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase(); // Lấy từ khóa tìm kiếm và chuyển thành chữ thường
    let foundProducts = 0;
    let firstFoundProduct = null;  // Biến lưu sản phẩm tìm thấy đầu tiên

    // Duyệt qua tất cả các sản phẩm và kiểm tra tên sản phẩm có khớp với từ khóa tìm kiếm hay không
    products.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase(); // Lấy tên sản phẩm
        if (productName.includes(searchTerm)) {
            product.style.display = 'block'; // Hiển thị sản phẩm nếu có khớp
            foundProducts++;
            if (!firstFoundProduct) {
                firstFoundProduct = product;  // Lưu sản phẩm đầu tiên tìm thấy
            }
        } else {
            product.style.display = 'none'; // Ẩn sản phẩm nếu không khớp
        }
    });

    // Nếu không tìm thấy sản phẩm nào, hiển thị thông báo
    if (foundProducts === 0) {
        alert('Không tìm thấy sản phẩm phù hợp!');
    } else if (firstFoundProduct) {
        // Cuộn trang đến sản phẩm đầu tiên tìm thấy
        firstFoundProduct.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Thêm sự kiện khi nhấn phím Enter trong ô tìm kiếm
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {  // Kiểm tra nếu phím Enter được nhấn
        searchProducts();  // Gọi hàm tìm kiếm
    }
});