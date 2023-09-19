async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username').value.trim();  
  const password = document.querySelector('#password').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/signup', {   // Updated this line
      method: 'post',
      body: JSON.stringify({
        username,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    // check the response status
    if (response.ok) {
      console.log('success');
      alert('New user created. You can now log in.');
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }  
}

document.addEventListener("DOMContentLoaded", function() {
  const formElement = document.querySelector('.signup-form');
  if(formElement) {
    formElement.addEventListener('submit', signupFormHandler);
  } else {
    console.error('Cannot find .signup-form element.');
  }
});
