document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem('api_token');
    const editorMode = document.getElementById("editorMode");
    const modifierSection = document.getElementById("modifierSection");
    const openModalIcon = document.getElementById("openModalIcon");
    const authLink = document.getElementById("authLink");
    const filterButtons = document.getElementById("filter-buttons"); 

    if (token) {
        // Afficher le mode édition
        editorMode.style.display = 'flex'; // Utilisez 'flex' pour conserver le centrage
        modifierSection.style.display = 'flex'; // Afficher la section "Modifier"
        openModalIcon.style.display = 'flex'; // Afficher l'icône de modification
        filterButtons.style.display = 'none'; // Masquer les filtres si le token est présent

        authLink.innerHTML = '<a href="index.html" id="logoutLink">Logout</a>';
        
        // Gérer la déconnexion
        const logoutLink = document.getElementById("logoutLink");
        logoutLink.addEventListener("click", function() {
            localStorage.removeItem('api_token'); // Supprimer le token
            window.location.href = 'index.html'; // Rediriger vers la page de connexion
        });
    } else {
        // Masquer le mode édition et autres éléments
        editorMode.style.display = 'none'; 
        modifierSection.style.display = 'none'; 
        openModalIcon.style.display = 'none'; 
        filterButtons.style.display = 'flex'; // Afficher les filtres s'il n'y a pas de token
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
        if (modalProjets.style.display === "none" && modalAddProject.style.display === "none") {
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

    // Fermer les modales en cliquant à l'extérieur du contenu du modal
    modalBackdrop.addEventListener('click', (event) => {
        // Vérifier si le clic s'est produit en dehors du contenu du modal
        if (event.target === modalBackdrop) {
            closeModal(modalProjets);
            closeModal(modalAddProject);
        }
    });
});
