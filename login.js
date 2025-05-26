document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('senha');
    const rememberCheckbox = document.getElementById('remember');

   
    loadSavedCredentials();

    
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
    });

    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();

        let isValid = true;

        
        const email = document.getElementById('email');
        if (!validateEmail(email.value)) {
            showError(email, 'Por favor, insira um e-mail válido');
            isValid = false;
        }

       
        const senha = document.getElementById('senha');
        if (senha.value.length < 6) {
            showError(senha, 'A senha deve ter pelo menos 6 caracteres');
            isValid = false;
        }

        if (isValid) {
          
            simulateLogin({
                email: email.value,
                senha: senha.value,
                remember: rememberCheckbox.checked
            });
        }
    });

   
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');
        
        const errorMessage = formGroup.querySelector('.error-message');
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    function clearErrors() {
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
            group.querySelector('.error-message').style.display = 'none';
        });
    }

    function simulateLogin(credentials) {
        
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Autenticando...';
        submitBtn.disabled = true;

       
        setTimeout(() => {
            
            if (credentials.remember) {
                localStorage.setItem('siga_remember_email', credentials.email);
                localStorage.setItem('siga_remember_password', credentials.senha);
            } else {
                localStorage.removeItem('siga_remember_email');
                localStorage.removeItem('siga_remember_password');
            }

           
            alert('Login realizado com sucesso!');
            window.location.href = 'dashboard.html'; 
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }

    function loadSavedCredentials() {
        const savedEmail = localStorage.getItem('siga_remember_email');
        const savedPassword = localStorage.getItem('siga_remember_password');
        
        if (savedEmail && savedPassword) {
            document.getElementById('email').value = savedEmail;
            document.getElementById('senha').value = savedPassword;
            document.getElementById('remember').checked = true;
        }
    }
});