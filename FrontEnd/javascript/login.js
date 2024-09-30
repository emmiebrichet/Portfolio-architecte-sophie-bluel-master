document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Empêche la soumission par défaut du formulaire

  const email = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('errorMessage');

  if (email === 'sophie.bluel@test.tld' && password === 'S0phie') {
      // Redirection vers la page d'accueil
      window.location.href = 'homepage-login.html';
  } else {
      // Affiche le message d'erreur si l'email ou le mot de passe est incorrect
      errorMessage.style.display = 'block'; 
      errorMessage.textContent = 'Erreur dans l’identifiant ou le mot de passe';
  }
});
