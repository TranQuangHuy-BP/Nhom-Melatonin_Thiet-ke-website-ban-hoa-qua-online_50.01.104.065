// Lấy lịch sử đơn hàng từ LocalStorage
const history = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
const historyContainer = document.getElementById('purchaseHistory');

// Tính tổng số lượng và tổng giá trị từ lịch sử đơn hàng
let totalItems = 0;
let totalPrice = 0;

if (history.length > 0) {
    history.forEach(order => {
        totalItems += parseInt(order.totalItems);  // Dùng totalItems của từng đơn hàng
        totalPrice += parseInt(order.totalPrice);  // Dùng totalPrice của từng đơn hàng

        // Hiển thị chi tiết từng đơn hàng
        historyContainer.innerHTML += `
            <div class="order">
                <p><strong>Ngày:</strong> ${order.date}</p>
                <p><strong>Số lượng sản phẩm:</strong> ${order.totalItems}</p>
                <p><strong>Tổng giá trị:</strong> ${parseInt(order.totalPrice).toLocaleString()} VND</p>
                <hr>
            </div>
        `;
    });
} else {
    historyContainer.innerHTML = '<p>Chưa có đơn hàng nào.</p>';
}

// Hiển thị tổng số lượng và tổng giá trị đơn hàng
document.getElementById('totalItems').innerText = totalItems;
document.getElementById('totalPrice').innerText = totalPrice.toLocaleString();