// Biến lưu trữ thông tin tài khoản đăng nhập
let isLoggedIn = false;
let users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'user1', password: 'user1pass', role: 'user' }
];
// Hàm mở popup Đăng Nhập
function openLoginPopup() {
    const popup = document.getElementById('loginPopup');
    popup.style.display = "flex";
    setTimeout(() => popup.style.opacity = 1, 10); // Hiệu ứng mờ dần

    // Điền tên đăng nhập đã lưu (nếu có) vào trường tên đăng nhập
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        document.getElementById('loginUsername').value = savedUsername;
    }
}

// Hàm mở popup Đăng Ký
function openRegisterPopup() {
    const popup = document.getElementById('registerPopup');
    popup.style.display = "flex";
    setTimeout(() => popup.style.opacity = 1, 10); // Hiệu ứng mờ dần
}

// Hàm mở popup Đăng Xuất
function openLogoutPopup() {
    const popup = document.getElementById('logoutPopup');
    popup.style.display = "flex";
    setTimeout(() => popup.style.opacity = 1, 10); // Hiệu ứng mờ dần
}

// Hàm đóng tất cả các popup
function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.style.opacity = 0;  // Đóng với hiệu ứng mờ dần
    setTimeout(() => {
        popup.style.display = "none"; // Ẩn sau khi hiệu ứng hoàn thành
        resetForm(popupId); // Reset các trường nhập liệu khi đóng popup
    }, 300);
}

// Hàm reset các trường nhập liệu
function resetForm(popupId) {
    const popup = document.getElementById(popupId);
    const inputs = popup.querySelectorAll('input');  // Lấy tất cả các input trong popup

    inputs.forEach(input => {
        input.value = '';  // Xóa giá trị của các input
    });

    const errorElement = popup.querySelector('.error');
    if (errorElement) {
        errorElement.style.display = "none";  // Ẩn thông báo lỗi khi đóng popup
    }
}
// Hàm đăng nhập
function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    if (!username || !password) {
        document.getElementById('loginError').textContent = "Tên đăng nhập và mật khẩu không thể để trống!";
        document.getElementById('loginError').style.display = "block";
        return;
    }

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        isLoggedIn = true;

        // Lưu trạng thái đăng nhập vào localStorage
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
        localStorage.setItem('username', username);

        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('rememberMe');
        }

        if (user.role === 'admin') {
            alert("Đăng nhập thành công! Chào mừng admin.");
            window.location.href = "admin.html";
        } else {
            alert("Đăng nhập thành công!");
            window.location.href = "index.html";
        }
    } else {
        document.getElementById('loginError').textContent = "Tên đăng nhập hoặc mật khẩu không đúng!";
        document.getElementById('loginError').style.display = "block";
    }
}

// Hàm đăng ký
function register() {
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!username || !email || !password || !confirmPassword) {
        alert("Tất cả các trường đều phải điền!");
        return;
    }

    if (password !== confirmPassword) {
        alert("Mật khẩu và xác nhận mật khẩu không khớp!");
        return;
    }

    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        alert("Tên đăng nhập đã tồn tại!");
        return;
    }

    // Lưu thông tin tài khoản mới
    const newUser = { username, password, role: 'user' }; // Bổ sung role mặc định là 'user'
    users.push(newUser);

    // Cập nhật mảng users vào localStorage
    localStorage.setItem('users', JSON.stringify(users));

    alert("Đăng ký thành công!");
    closePopup('registerPopup');
}
// Hàm kiểm tra trạng thái đăng nhập
function checkLoginStatus() {
    const storedUsername = localStorage.getItem('username'); // Lấy username từ localStorage
    const storedIsLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')); // Lấy trạng thái đăng nhập

    if (storedIsLoggedIn && storedUsername) {
        isLoggedIn = true;

        // Ẩn nút Đăng nhập và Đăng ký
        document.getElementById('loginButton').style.display = "none";
        document.getElementById('registerButton').style.display = "none";

        // Hiện nút Đăng xuất
        document.getElementById('logoutButton').style.display = "block";
    } else {
        isLoggedIn = false;

        // Hiện nút Đăng nhập và Đăng ký
        document.getElementById('loginButton').style.display = "block";
        document.getElementById('registerButton').style.display = "block";

        // Ẩn nút Đăng xuất
        document.getElementById('logoutButton').style.display = "none";
    }
}

// Hàm đăng xuất
function confirmLogout() {
    isLoggedIn = false;
    localStorage.removeItem('username');  
    checkLoginStatus(); // Cập nhật lại trạng thái đăng nhập
    alert("Đăng xuất thành công!");
    closePopup('logoutPopup');
}

// Gọi hàm kiểm tra trạng thái đăng nhập khi trang tải
window.onload = function() {
    checkLoginStatus();
};
// Hàm đóng popup
function closePopup(popupId) {
    document.getElementById(popupId).style.display = "none";
}
window.onload = function() {
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (storedUsers) {
        users = storedUsers; // Khởi tạo lại mảng users từ localStorage
    }
    checkLoginStatus();
};