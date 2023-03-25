

// Tìm đến các phần tử HTML trong form
const form = document.querySelector('.form');
const emailInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');

// Xử lý khi form được submit
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Ngăn chặn form submit mặc định

    const email = emailInput.value;
    const password = passwordInput.value;

    // Kiểm tra thông tin đăng nhập
    if (email === 'admin' && password === 'admin') {
        // Nếu thông tin đúng, chuyển đến trang khác
        window.location.href = 'http://localhost:3000/home';
    } else {
        // Nếu thông tin sai, hiển thị thông báo lỗi
        alert('Invalid email or password');
    }
});
