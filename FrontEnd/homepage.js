document.addEventListener("DOMContentLoaded", function() {
    const modalProjets = document.getElementById("myModal_projets");
    const modalAddProject = document.getElementById("myModal_addProject");
    const modalBackdrop = document.querySelector('.modal-backdrop');
    
    const openModalBtn = document.getElementById("openModalBtn");
    const addPhotoBtn = document.getElementById("addPhotoBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const backToProjectsBtn = document.getElementById("backToProjectsBtn");
    const closeAddProjectModalBtn = document.getElementById("closeAddProjectModalBtn");

    // Fonction pour ouvrir un modal
    function openModal(modal) {
        modalBackdrop.classList.add('active');
        modal.style.display = "block";
    }

    // Fonction pour fermer un modal
    function closeModal(modal) {
        modal.style.display = "none";
        checkIfBackdropShouldClose();
    }

    // Vérifier si le fond sombre doit être désactivé
    function checkIfBackdropShouldClose() {
        if (modalProjets.style.display === "none" && modalAddProject.style.display === "none") {
            modalBackdrop.classList.remove('active');
        }
    }

    // Ouvrir le modal "Mes Projets"
    openModalBtn.addEventListener('click', () => openModal(modalProjets));

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

    // Fermer le modal en cliquant sur le fond sombre
    modalBackdrop.addEventListener('click', () => {
        if (modalProjets.style.display === "block") closeModal(modalProjets);
        if (modalAddProject.style.display === "block") closeModal(modalAddProject);
    });

    // Assurer que le modal "Ajout de projet" est caché dès le chargement
    modalAddProject.style.display = "none";
});





