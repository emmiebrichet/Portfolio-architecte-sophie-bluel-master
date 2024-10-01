document.addEventListener("DOMContentLoaded", function() {
    const apiUrlWorks = "http://localhost:5678/api/works"; // URL de l'API pour récupérer les projets
    const apiUrlCategories = "http://localhost:5678/api/categories"; // URL de l'API pour récupérer les catégories
    const projectsContainer = document.getElementById("projects-container"); // Sélection du conteneur pour les projets
    const filterButtonsContainer = document.getElementById("filter-buttons"); // Conteneur des boutons de filtre
    let allProjects = [];

    // Fonction pour "sanitiser" le nom des catégories pour en faire une classe CSS valide
    function sanitizeCategoryName(name) {
        return name.toLowerCase().replace(/[^a-z0-9-]/g, '-'); 
    }

    // Fonction pour récupérer et afficher les projets
    async function fetchProjects() {
        try {
            const response = await fetch(apiUrlWorks);
            if (!response.ok) {
                throw new Error(`Erreur HTTP! statut: ${response.status}`);
            }
            const projects = await response.json();
            allProjects = projects;
            showProjects(); 
        } catch (error) {
            console.error("Erreur lors de la récupération des projets :", error);
        }
    };

    // Fonction pour récupérer et afficher les catégories
    async function fetchCategories() {
        try {
            const response = await fetch(apiUrlCategories);
            if (!response.ok) {
                throw new Error(`Erreur HTTP! statut: ${response.status}`);
            }
            const categories = await response.json();
            
            // Ajouter un bouton "Tous" pour afficher tous les projets
            const allButton = document.createElement('button');
            allButton.textContent = 'Tous';
            allButton.classList.add('btn-Tous');
            allButton.addEventListener('click', function() {
                showProjects('all'); 
            });
            filterButtonsContainer.appendChild(allButton);

            // Itérer sur les catégories et créer un bouton pour chacune
            categories.forEach(category => {
                const sanitizedCategoryName = sanitizeCategoryName(category.name);
                const categoryButton = document.createElement('button');
                categoryButton.textContent = category.name;
                categoryButton.classList.add(`btn-${sanitizedCategoryName}`);
                categoryButton.addEventListener('click', function() {
                    showProjects(category.id); // Afficher les projets de cette catégorie
                });
                filterButtonsContainer.appendChild(categoryButton);
            });
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories :", error);
        }
    };

    // Fonction pour afficher les projets selon la catégorie
    function showProjects(categoryId = 'all') {
        // Vider le conteneur des projets
        projectsContainer.innerHTML = '';

        // Filtrer les projets selon la catégorie sélectionnée
        const filteredProjects = allProjects.filter(project => {
            return categoryId === 'all' || project.categoryId === categoryId;
        });

        // Afficher les projets filtrés
        filteredProjects.forEach(project => {
            const projectFigure = document.createElement("figure");
            projectFigure.innerHTML = `
                <img src="${project.imageUrl}" alt="${project.title}">
                <figcaption>${project.title}</figcaption>
            `;
            projectsContainer.appendChild(projectFigure);
        });
    };

    // Appeler les fonctions pour récupérer les projets et les catégories au chargement de la page
    fetchProjects();
    fetchCategories();
});


document.addEventListener("DOMContentLoaded", function() {
    // Vérifie si le token est présent dans localStorage (ou sessionStorage selon votre préférence)
    const token = localStorage.getItem('token');

    // Si le token est présent, on affiche l'élément
    if (token) {
        document.getElementById('editorMode').style.display = 'block';
    } else {
        document.getElementById('editorMode').style.display = 'none';
    }
});




// Exemple de stockage du token après login réussi
localStorage.setItem('token'); 
// Supprimer le token lors de la déconnexion
localStorage.removeItem('token');

// Vérifie si le token existe dans le localStorage
const token = localStorage.getItem('token');

// Sélectionne l'élément <li> contenant le lien
const authLink = document.getElementById('authLink');
const authAnchor = authLink.querySelector('a');

if (token) {
    // Si le token existe, on change le texte en 'logout' et le lien en '#'
    authAnchor.textContent = 'logout';
    authAnchor.href = '#';

    // Ajoute un event listener pour gérer la déconnexion
    authAnchor.addEventListener('click', function() {
        // Supprime le token du localStorage
        localStorage.removeItem('token');
        // Recharge la page ou redirige vers la page de login
        window.location.href = 'login.html';
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem('token'); // Récupère le token depuis le localStorage
    const openModalIcon = document.getElementById('openModalIcon');
    const openModalBtn = document.getElementById('openModalBtn');

    if (token) {
        // Si le token est présent, affiche l'icône et le bouton
        openModalIcon.style.display = 'inline-block';
        openModalBtn.style.display = 'inline-block';
    } else {
        // Sinon, cache l'icône et le bouton
        openModalIcon.style.display = 'none';
        openModalBtn.style.display = 'none';
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
    };

    // Fonction pour fermer un modal avec display none
    function closeModal(modal) {
        modal.style.display = "none";
        checkIfBackdropShouldClose();
    };

    
    // Vérifier si le fond sombre doit rester actif
    function checkIfBackdropShouldClose() {
        if (modalProjets.style.display === "none") {
            modalBackdrop.classList.remove('active');
        }
        if (modalAddProject.style.display === "none") {
            modalBackdrop.classList.remove('active');
        }
    };

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

   modalBackdrop.addEventListener('click', (event) => {
  // Vérifie si l'utilisateur a cliqué sur l'arrière-plan et non sur le contenu du modal
  if (event.target === modalBackdrop) {
    closeModal(modalProjets); 
  }
  if (event.target === modalBackdrop) {
    closeModal(modalAddProject); 
  }
  closeModalBtn.addEventListener('click', () => closeModal(modalProjets));
closeAddProjectModalBtn.addEventListener('click', () => closeModal(modalAddProject));

});
});



