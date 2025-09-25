document.addEventListener('DOMContentLoaded', () => {
    // Get all the elements needed from the HTML
    const authModal = document.getElementById('authModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const startQuestBtn = document.getElementById('startQuestBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const showLoginBtn = document.getElementById('showLoginBtn');
    const showRegisterBtn = document.getElementById('showRegisterBtn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginMessage = document.getElementById('loginMessage');
    const registerMessage = document.getElementById('registerMessage');

    // Functions to show and hide the modal
    const openModal = () => authModal.classList.remove('hidden');
    const closeModal = () => authModal.classList.add('hidden');

    // --- Attach Event Listeners ---
    // These lines make the buttons clickable. If an ID is wrong, this is where it fails.
    openModalBtn.addEventListener('click', openModal);
    startQuestBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    authModal.addEventListener('click', (e) => {
        if (e.target === authModal) {
            closeModal();
        }
    });

    // Logic to switch between Login and Register forms
    showLoginBtn.addEventListener('click', () => {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        showLoginBtn.classList.add('active');
        showRegisterBtn.classList.remove('active');
    });
    showRegisterBtn.addEventListener('click', () => {
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        showRegisterBtn.classList.add('active');
        showLoginBtn.classList.remove('active');
    });

    // --- API Communication ---
    const API_URL = '/api';

    // Register Form submission logic
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        registerMessage.textContent = '';
        registerMessage.className = 'message';
        try {
            const response = await fetch(`${API_URL}/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }
            registerMessage.textContent = 'Registration successful! Please login.';
            registerMessage.classList.add('success');
            registerForm.reset();
        } catch (error) {
            registerMessage.textContent = error.message;
            registerMessage.classList.add('error');
        }
    });

    // Login Form submission logic
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        loginMessage.textContent = '';
        loginMessage.className = 'message';
        try {
            const response = await fetch(`${API_URL}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }
            loginMessage.textContent = 'Login successful!';
            loginMessage.classList.add('success');
            localStorage.setItem('token', data.token);
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } catch (error) {
            loginMessage.textContent = error.message;
            loginMessage.classList.add('error');
        }
    });
});