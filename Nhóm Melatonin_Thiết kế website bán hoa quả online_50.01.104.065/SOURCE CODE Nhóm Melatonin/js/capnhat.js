        function loadProducts() {
            const products = JSON.parse(localStorage.getItem('products')) || [];
            const productList = document.getElementById('productList');
            productList.innerHTML = '';

            products.forEach((product, index) => {
                const productHTML = `
                    <div class="product">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p><strong>${product.price} VND</strong></p>
                        <p>Xuất xứ: ${product.origin}</p>
                        <button class="add-to-cart" data-index="${index}">Thêm vào giỏ</button>
                    </div>
                `;
                productList.insertAdjacentHTML('beforeend', productHTML);
            });

            // Gắn sự kiện cho các nút "Thêm vào giỏ"
            const buttons = document.querySelectorAll('.add-to-cart');
            buttons.forEach(button => {
                button.addEventListener('click', function() {
                    const productIndex = button.getAttribute('data-index');
                    addToCart(products[productIndex]);
                });
            });
        }

        function addToCart(product) {
            alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
        }

        loadProducts();