document.addEventListener("DOMContentLoaded", function() {
    const authLink = document.getElementById("authLink");
    
    // Vérifier si le token existe dans le localStorage
    const token = localStorage.getItem('api_token');
    
    if (token) {
        // Si le token est présent, modifier le lien "login" pour se déconnecter
        authLink.innerHTML = '<a href="index.html" id="logoutLink">logout</a>';
        
        // Ajouter un bouton pour le mode édition
        const editorMode = document.getElementById("editorMode");
        editorMode.style.display = 'block'; // Afficher le mode édition

        // Gérer la déconnexion
        const logoutLink = document.getElementById("logoutLink");
        logoutLink.addEventListener("click", function() {
            localStorage.removeItem('api_token'); // Supprimer le token
            window.location.href = 'login.html'; // Rediriger vers la page de connexion
        });
    } else {
        // Si pas de token, masquer le mode édition
        const editorMode = document.getElementById("editorMode");
        editorMode.style.display = 'none';
    }
});


function logout() {
    localStorage.removeItem('token'); // Suppression du token
    window.location.href = 'index.html'; // Redirection vers la page de connexion
}


document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem('token'); // Récupère le token depuis le localStorage
    const openModalIcon = document.getElementById('openModalIcon');
    const openModalBtn = document.getElementById('openModalBtn');

    if (token) {
        // Si le token est présent, affiche l'icône et le bouton
        openModalIcon.style.display = 'block';
        openModalBtn.style.display = 'block';
    } else {
        // Sinon, cache l'icône et le bouton
        openModalIcon.style.display = 'block';
        openModalBtn.style.display = 'block';   
    }
});



document.addEventListener("DOMContentLoaded", function() {
    const modalProjets = document.getElementById("myModal_projets");
    const modalAddProject = document.getElementById("myModal_addProject");
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const openModalIcon = document.getElementById("openModalIcon");
    const openModalBtn = document.getElementById("openModalBtn");
    const addPhotoBtn = document.getElementById("addPhotoBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const backToProjectsBtn = document.getElementById("backToProjectsBtn");
    const closeAddProjectModalBtn = document.getElementById("closeAddProjectModalBtn");

    

    // Fonction pour ouvrir un modal avec display block
    function openModal(modal) {
        modalBackdrop.classList.add('active');
        modal.style.display = "block";
    }

    // Fonction pour fermer un modal avec display none
    function closeModal(modal) {
        modal.style.display = "none";
        checkIfBackdropShouldClose();
    }

    // Vérifier si le fond sombre doit rester actif
    function checkIfBackdropShouldClose() {
        if (modalProjets.style.display === "none") {
            modalBackdrop.classList.remove('active');
        }
        if (modalAddProject.style.display === "none") {
            modalBackdrop.classList.remove('active');
        }
    }

    // Ouvrir le modal "Mes Projets"
    openModalBtn.addEventListener('click', () => openModal(modalProjets));
    openModalIcon.addEventListener('click', () => openModal(modalProjets));

    // Ouvrir le modal "Ajout de projet"
    addPhotoBtn.addEventListener('click', () => {
        closeModal(modalProjets);
        openModal(modalAddProject);
    });

    // Revenir au modal "Mes Projets" depuis "Ajout de projet"
    backToProjectsBtn.addEventListener('click', () => {
        closeModal(modalAddProject);
        openModal(modalProjets);
    });

    // Fermer les modales au clic sur la croix
    closeModalBtn.addEventListener('click', () => closeModal(modalProjets));
    closeAddProjectModalBtn.addEventListener('click', () => closeModal(modalAddProject));
   
});



