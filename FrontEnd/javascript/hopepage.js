document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem('api_token');
    const editorMode = document.getElementById("editorMode");
    const modifierSection = document.getElementById("modifierSection");
    const openModalIcon = document.getElementById("openModalIcon");
    const authLink = document.getElementById("authLink");

    if (token) {
        // Afficher le mode édition
        editorMode.style.display = 'flex'; // Utilisez 'flex' pour conserver le centrage
        modifierSection.style.display = 'flex'; // Afficher la section "Modifier"
        openModalIcon.style.display = 'flex'; // Afficher l'icône de modification

        authLink.innerHTML = '<a href="index.html" id="logoutLink">Logout</a>';
        
        // Gérer la déconnexion
        const logoutLink = document.getElementById("logoutLink");
        logoutLink.addEventListener("click", function() {
            localStorage.removeItem('api_token'); // Supprimer le token
            window.location.href = 'login.html'; // Rediriger vers la page de connexion
        });
    } else {
        // Masquer le mode édition et autres éléments
        editorMode.style.display = 'none'; 
        modifierSection.style.display = 'none'; 
        openModalIcon.style.display = 'none'; 
    }
});


// Fonction pour afficher et centrer le conteneur
function showEditorMode() {

    const editorMode = document.getElementById('editorMode');
    editorMode.style.display = 'flex';
    editorMode.style.position = 'absolute';
    
   
    
    
   
    editorMode.style.alignItems = 'center'; // Centre verticalement
    editorMode.style.justifyContent = 'center'; // Centre horizontalement
}

// Appel de la fonction pour tester (vous pouvez l'appeler selon vos besoins)
showEditorMode();



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



