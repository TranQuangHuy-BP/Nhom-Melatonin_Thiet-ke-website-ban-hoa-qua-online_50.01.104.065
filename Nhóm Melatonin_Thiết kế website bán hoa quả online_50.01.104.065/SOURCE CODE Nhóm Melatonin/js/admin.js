// Biến để lưu trữ dữ liệu
let customers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
let salesData = JSON.parse(localStorage.getItem('purchaseHistory')) || [];

// Hàm chuyển đổi giữa các phần trong Admin
function showSection(sectionId) {
    document.querySelectorAll('.admin-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';

    // Nếu là phần dashboard, hiển thị biểu đồ
    if (sectionId === 'dashboard') {
        renderSalesChart();
    }

    // Nếu là phần khách hàng, hiển thị danh sách khách hàng
    if (sectionId === 'customers') {
        renderCustomerList();
    }

    // Nếu là phần đơn hàng, hiển thị thống kê đơn hàng
    if (sectionId === 'orders') {
        renderOrderStats();
    }
}

// Hiển thị danh sách khách hàng
function renderCustomerList() {
    const customerList = document.getElementById('customerList');
    customerList.innerHTML = '';

    if (customers.length === 0) {
        customerList.innerHTML = '<p>Không có khách hàng nào đã đăng ký.</p>';
        return;
    }

    customers.forEach(customer => {
        const li = document.createElement('li');
        li.textContent = `Tên: ${customer.username}, Email: ${customer.email}`;
        customerList.appendChild(li);
    });
}

// Hiển thị thống kê đơn hàng
function renderOrderStats() {
    const totalSold = salesData.reduce((sum, item) => sum + item.totalItems, 0);
    const totalRevenue = salesData.reduce((sum, item) => sum + item.totalPrice, 0);

    document.getElementById('totalSold').textContent = totalSold;
    document.getElementById('totalRevenue').textContent = totalRevenue.toLocaleString();
}

// Hiển thị biểu đồ doanh số
function renderSalesChart() {
    const ctx = document.getElementById('salesChart').getContext('2d');

    // Tạo dữ liệu sản phẩm đã bán
    const productSales = {};
    salesData.forEach(item => {
        item.products.forEach(product => {
            if (!productSales[product.name]) {
                productSales[product.name] = 0;
            }
            productSales[product.name] += product.quantity;
        });
    });

    const productNames = Object.keys(productSales);
    const productQuantities = Object.values(productSales);

    // Tạo biểu đồ
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productNames,
            datasets: [{
                label: 'Số lượng đã bán',
                data: productQuantities,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Hàm lấy dữ liệu sản phẩm đã bán từ localStorage
function getSalesData() {
    const purchaseHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
    const productSales = {};

    // Lấy số lượng sản phẩm đã bán từ lịch sử mua hàng
    purchaseHistory.forEach((order) => {
        order.items.forEach((item) => {
            if (productSales[item.name]) {
                productSales[item.name] += item.quantity;
            } else {
                productSales[item.name] = item.quantity;
            }
        });
    });

    return productSales;
}

// Hàm vẽ biểu đồ
function drawSalesChart() {
    const salesData = getSalesData();

    // Lấy tên sản phẩm và số lượng
    const productNames = Object.keys(salesData);
    const productQuantities = Object.values(salesData);

    // Kiểm tra nếu không có dữ liệu
    if (productNames.length === 0) {
        document.getElementById("dashboard").innerHTML = "<p>Không có dữ liệu bán hàng.</p>";
        return;
    }

    // Vẽ biểu đồ
    const ctx = document.getElementById("salesChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: productNames,
            datasets: [
                {
                    label: "Số lượng sản phẩm đã bán",
                    data: productQuantities,
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Số lượng",
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: "Sản phẩm",
                    },
                },
            },
        },
    });
}

// Gọi hàm khi tải trang
if (document.getElementById("salesChart")) {
    drawSalesChart();
}