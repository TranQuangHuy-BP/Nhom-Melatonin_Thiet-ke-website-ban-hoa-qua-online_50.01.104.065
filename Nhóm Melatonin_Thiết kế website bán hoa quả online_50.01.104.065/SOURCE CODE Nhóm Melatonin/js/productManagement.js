// Giả sử chúng ta lưu danh sách sản phẩm vào localStorage (hoặc sử dụng cơ sở dữ liệu thực tế)
const products = JSON.parse(localStorage.getItem('products')) || [];

function renderProductList() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';  // Xóa danh sách cũ trước khi hiển thị lại
    
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price} VND</td>
            <td>
                <button onclick="editProduct(${index})">Sửa</button>
                <button onclick="deleteProduct(${index})">Xóa</button>
            </td>
        `;
        productList.appendChild(row);
    });
}

function addProduct(event) {
    event.preventDefault();
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;

    if (name && price) {
        products.push({ name, price });
        localStorage.setItem('products', JSON.stringify(products));
        renderProductList(); // Hiển thị lại danh sách
    }
}

function editProduct(index) {
    const name = prompt('Nhập tên sản phẩm mới:', products[index].name);
    const price = prompt('Nhập giá mới:', products[index].price);

    if (name && price) {
        products[index].name = name;
        products[index].price = price;
        localStorage.setItem('products', JSON.stringify(products));
        renderProductList(); // Hiển thị lại danh sách
    }
}

function deleteProduct(index) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        renderProductList(); // Hiển thị lại danh sách
    }
}

// Lắng nghe sự kiện khi thêm sản phẩm mới
document.getElementById('addProductForm').addEventListener('submit', addProduct);

// Gọi hàm render khi trang được tải
renderProductList();