let cart = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.getAttribute('data-product');
        const price = parseInt(this.getAttribute('data-price'));
        addToCart(product, price);
    });
});

function addToCart(product, price) {
    const existingProduct = cart.find(item => item.name === product);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name: product, price: price, quantity: 1 });
    }
    updateCartCount();
    updateCartPopup();
}
document.addEventListener('DOMContentLoaded', () => {
    const cartButtons = document.querySelectorAll('.add-to-cart'); // Chọn các nút "Thêm vào giỏ"
    const notification = document.getElementById('cart-notification'); // Chọn thông báo

    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Thêm lớp "show" để hiển thị thông báo
            notification.classList.add('show');

            // Tự động ẩn thông báo sau 2 giây
            setTimeout(() => {
                notification.classList.remove('show');
            }, 2000);
        });
    });
});

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = count;
}

function updateCartPopup() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartItems.innerHTML += `
            <div>
                ${item.name} x ${item.quantity} = ${itemTotal.toLocaleString()} VND
                <button onclick="removeFromCart('${item.name}')">Xóa</button>
            </div>
        `;
    });

    totalPrice.innerText = total.toLocaleString();
}

function removeFromCart(product) {
    cart = cart.filter(item => item.name !== product);
    updateCartCount();
    updateCartPopup();
}

function viewCart() {
    updateCartPopup();
    document.getElementById('cartPopup').style.display = 'block';
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

function purchase() {
    if (!isLoggedIn) {
        alert("Vui lòng đăng nhập để thanh toán!");
        openLoginPopup(); // Mở popup đăng nhập
        return;
    }
    const address = document.getElementById('shippingAddress').value.trim();
    if (cart.length === 0) {
        alert("Giỏ hàng trống!");
        return;
    }

    if (address === "") {
        alert("Vui lòng nhập địa chỉ nhận hàng!");
        return;
    }

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Lưu lịch sử mua hàng (gồm tên sản phẩm, số lượng, giá trị, địa chỉ)
    const history = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
    const orderDetails = {
        date: new Date().toLocaleString(),
        items: cart.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
        })),
        totalItems: totalItems,
        totalPrice: totalPrice,
        address: address,  // Lưu địa chỉ nhận hàng
    };
    history.push(orderDetails);
    localStorage.setItem("purchaseHistory", JSON.stringify(history));

    // Xóa giỏ hàng và cập nhật lại giao diện
    alert("Cảm ơn bạn đã mua hàng!");
    cart = [];
    updateCartCount();
    updateCartPopup();

    // Chuyển hướng hoặc thông báo
    window.location.href = "stats.html";
}