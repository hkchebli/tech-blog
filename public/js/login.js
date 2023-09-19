async function loginFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const formElement = document.querySelector('.login-form');
    if(formElement) {
      formElement.addEventListener('submit', loginFormHandler);
    } else {
      console.error('Cannot find .login-form element.');
    }
});
