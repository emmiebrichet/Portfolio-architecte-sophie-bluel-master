document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("myModal_projets");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
  
    // Ouvrir le modal au clic sur le bouton "Modifier"
    openModalBtn.addEventListener("click", function() {
        modal.style.display = "block";
    });
  
    // Fermer le modal au clic sur la croix
    closeModalBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });
  
  });
  
  
  document.addEventListener("DOMContentLoaded", function() {
    const modalProjets = document.getElementById("myModal_projets");
    const modalAddProject = document.getElementById("myModal_addProject");
    const openAddPhotoBtn = document.getElementById("addPhotoBtn");
    const closeAddProjectModalBtn = document.getElementById("closeAddProjectModalBtn");
  
    // Ouvrir le modal "Ajout de projet" au clic sur "Ajouter une photo"
    openAddPhotoBtn.addEventListener("click", function() {
        modalProjets.style.display = "none";  // Fermer le modal projets
        modalAddProject.style.display = "block";  // Ouvrir le modal ajout projet
    });
  
    // Fermer le modal "Ajout de projet" au clic sur la croix
    closeAddProjectModalBtn.addEventListener("click", function() {
        modalAddProject.style.display = "none";
    });
  
    
  });




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
        modal.showModal();
    }

    // Fonction pour fermer un modal
    function closeModal(modal) {
        modal.close();
        checkIfBackdropShouldClose();
    }

    // Fonction pour vérifier si le fond sombre doit être fermé
    function checkIfBackdropShouldClose() {
        if (!modalProjets.open && !modalAddProject.open) {
            modalBackdrop.classList.remove('active');
        }
    }

    // Ouvrir le modal "Projets"
    openModalBtn.addEventListener('click', () => openModal(modalProjets));

    // Ouvrir le modal "Ajouter un projet"
    addPhotoBtn.addEventListener('click', () => {
        closeModal(modalProjets); // Fermer le modal projets
        openModal(modalAddProject); // Ouvrir le modal ajout projet
    });

    // Revenir au modal "Projets" depuis "Ajouter un projet"
    backToProjectsBtn.addEventListener('click', () => {
        closeModal(modalAddProject); // Fermer le modal ajout projet
        openModal(modalProjets); // Ouvrir le modal projets
    });

    // Fermer les modales au clic sur la croix
    closeModalBtn.addEventListener('click', () => closeModal(modalProjets));
    closeAddProjectModalBtn.addEventListener('click', () => closeModal(modalAddProject));


});

document.addEventListener("DOMContentLoaded", function() {
  const modalProjets = document.getElementById("myModal_projets");
  const modalAddProject = document.getElementById("myModal_addProject");
  const backToProjectsBtn = document.getElementById("backToProjectsBtn");
  const closeAddProjectModalBtn = document.getElementById("closeAddProjectModalBtn");

  // Revenir au modal "Mes Projets" en cliquant sur la flèche gauche
  backToProjectsBtn.addEventListener("click", function() {
      modalAddProject.style.display = "none";  // Fermer le modal "Ajout de projet"
      modalProjets.style.display = "block";  // Ouvrir le modal "Mes Projets"
  });



});

document.addEventListener("DOMContentLoaded", function() {
    const modalAddProject = document.getElementById("myModal_addProject");
  
    // Assurer que le modal ajout projet est caché dès le chargement
    modalAddProject.style.display = "none";
    
   
  });
  
  

 




