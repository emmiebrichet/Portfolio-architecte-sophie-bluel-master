document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Empêche l'envoi par défaut du formulaire

        const email = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Envoyer la requête de connexion à l'API
        fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }), 
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errData => {
                    throw new Error(errData.message || 'Erreur dans l’identifiant ou le mot de passe');
                });
            }
            return response.json();
        })
        .then(data => {
            // Sauvegarder le token dans le localStorage
            localStorage.setItem('api_token', data.token);
            
            // Rediriger vers la page index.html
            window.location.href = 'index.html';
        })
        .catch(error => {
            // Afficher un message d'erreur
            const errorMessage = document.getElementById("errorMessage");
            errorMessage.textContent = 'Erreur dans l’identifiant ou le mot de passe';
            errorMessage.classList.add('error-message'); // Ajoute la classe d'erreur
            errorMessage.style.display = 'flex'; // Affiche le message
        });
    });
});
