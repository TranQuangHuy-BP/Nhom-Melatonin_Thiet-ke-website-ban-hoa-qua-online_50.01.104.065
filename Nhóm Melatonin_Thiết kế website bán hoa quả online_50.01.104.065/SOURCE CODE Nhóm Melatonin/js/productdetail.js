function showProductDetail(title, imageSrc, description, origin, price) {
    document.getElementById('productTitle').innerText = title;
    document.getElementById('productImage').src = imageSrc;
    document.getElementById('productDescription').innerText = description;
    document.getElementById('productOrigin').innerText = "Xuất xứ: " + origin;
    document.getElementById('productPrice').innerText = "Giá: " + price;
    document.getElementById('productDetailPopup').style.display = 'block';
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}
