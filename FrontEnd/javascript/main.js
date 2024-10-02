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
    }

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
    }

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
    }



    // Appeler les fonctions pour récupérer les projets et les catégories au chargement de la page
    fetchProjects();
    fetchCategories();
});


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


document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem('api_token');
    const editorMode = document.getElementById("editorMode");
    const modifierSection = document.getElementById("modifierSection");
    const openModalIcon = document.getElementById("openModalIcon");
    const authLink = document.getElementById("authLink");
    const filterButtons = document.getElementById("filter-buttons"); // Récupérer le bouton filter

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
            window.location.href = 'login.html'; // Rediriger vers la page de connexion
        });
    } else {
        // Masquer le mode édition et autres éléments
        editorMode.style.display = 'none'; 
        modifierSection.style.display = 'none'; 
        openModalIcon.style.display = 'none'; 
        filterButtons.style.display = 'flex'; // Afficher les filtres s'il n'y a pas de token
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


// Récupérer le token depuis le localStorage
const token = localStorage.getItem('api_token');

// Fonction pour supprimer un projet
function deleteProject(projectId) {
    // Vérifier si le token est présent
    if (!token) {
        console.error('Erreur : Token d\'authentification manquant.');
        alert('Vous devez être connecté pour supprimer un projet.'); // Alerte si le token est manquant
        return; // Sortir de la fonction si le token est manquant
    }

    const deleteUrl = `http://localhost:5678/api/works/${projectId}`;
    
    fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Supprimer le projet du DOM
            const projectDiv = document.getElementById(`project-${projectId}`);
            if (projectDiv) {
                projectDiv.remove(); // Supprime l'élément du DOM
               
            }
        } else {
            console.error('Erreur lors de la suppression du projet :', response.statusText);
            alert('Une erreur est survenue lors de la suppression du projet.'); // Afficher une alerte
        }
    })
    .catch(error => {
        console.error('Erreur lors de la suppression du projet:', error);
        alert('Erreur réseau ou problème serveur.');
    });
}

// Fonction pour charger les projets depuis l'API et ajouter une icône de poubelle
function loadProjects() {
    const projectContainer = document.getElementById('projectContainer');
    projectContainer.innerHTML = '<p>Chargement des projets...</p>'; // Message de chargement

    fetch('http://localhost:5678/api/works')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur: ${response.status}`);
            }
            return response.json();
        })
        .then(works => {
            projectContainer.innerHTML = ''; // Vider le conteneur avant d'ajouter les projets

            works.forEach(work => {
                const projectDiv = document.createElement('div');
                projectDiv.id = `project-${work.id}`;
                projectDiv.classList.add('project-item');

                // Image du projet
                const img = document.createElement('img');
                img.src = work.imageUrl;
                img.alt = `Image du projet ${work.title}`;
                img.classList.add('project-image'); // Utilisez une classe CSS pour le style

                // Icône de poubelle
                const trashIcon = document.createElement('i');
                trashIcon.classList.add('fa', 'fa-trash-can');
                trashIcon.setAttribute('data-project-id', work.id);

                // Écouteur d'événement pour supprimer le projet sans confirmation
                trashIcon.addEventListener('click', () => {
                    deleteProject(work.id);
                });

                // Ajouter les éléments au projectDiv
                projectDiv.appendChild(img);
                projectDiv.appendChild(trashIcon);

                // Ajouter le projectDiv au conteneur
                projectContainer.appendChild(projectDiv);
            });

            if (works.length === 0) {
                projectContainer.innerHTML = '<p>Aucun projet disponible pour le moment.</p>'; // Message si aucun projet
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des projets:', error);
            projectContainer.innerHTML = '<p>Erreur lors du chargement des projets.</p>'; // Message d'erreur
        });
}

// Appeler loadProjects pour récupérer et afficher les projets lorsque le modal s'ouvre
loadProjects();


// Écouteur d'événement pour le bouton qui déclenche l'input de fichier
document.getElementById('triggerFileInput').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) fileInput.click();
});

// Fonction pour afficher les erreurs utilisateur
function afficherErreur(message) {
    alert(message); // Vous pouvez améliorer cette partie avec des éléments visuels plus élégants dans l'UI
}

// Fonction pour récupérer les catégories via l'API
function recupererCategories() {
    const categorySelect = document.getElementById('categorySelect');
    if (!categorySelect) {
        console.error('Élément categorySelect introuvable');
        return;
    }
    
    fetch('http://localhost:5678/api/categories')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des catégories : ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            categorySelect.innerHTML = ''; // Vider les options avant d'ajouter les nouvelles
            data.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        })
        .catch(error => console.error(error));
}

// Appel de la fonction pour récupérer les catégories lors du chargement du document
document.addEventListener('DOMContentLoaded', recupererCategories);

// Gestion de l'aperçu de l'image après sélection du fichier
function gererApercuImage(event) {
    const file = event.target.files[0];
    const validateButton = document.getElementById('validateButton');
    const icon = document.querySelector('.icone');
    const uploadButton = document.querySelector('.bouton');
    const fileInfo = document.querySelector('.file-info');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imagePreviewContainer = document.getElementById('imagePreviewContainer');
            if (imagePreviewContainer) {
                imagePreviewContainer.innerHTML = `<img src="${e.target.result}" alt="Aperçu de l'image" class="preview-image">`;

                // Masquer les éléments une fois l'image chargée
                [fileInput, icon, uploadButton, fileInfo].forEach(elem => {
                    if (elem) elem.style.display = 'none';
                });

                // Changer la couleur du bouton Valider
                if (validateButton) {
                    validateButton.style.backgroundColor = '#1D6154';
                }
            }
        };
        reader.readAsDataURL(file);
    }
}

// Gestionnaire d'événement pour l'input file
const fileInput = document.getElementById('fileInput');
if (fileInput) {
    fileInput.addEventListener('change', gererApercuImage);
} else {
    console.error('Élément fileInput introuvable');
}

// Fonction pour soumettre un nouveau projet via l'API
async function soumettreProjet(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput').files[0];
    const title = document.getElementById('titleInput').value;
    const category = document.getElementById('categorySelect').value;

    if (!fileInput || !title || !category) {
        afficherErreur('Veuillez remplir tous les champs avant de soumettre le formulaire.');
        return;
    }

    // Vérifier si le token est présent dans le localStorage
const token = localStorage.getItem('api_token');

// Fonction pour soumettre un nouveau projet via l'API
async function soumettreProjet(event) {
    event.preventDefault();

    // Vérifier la présence du token
    if (!token) {
        afficherErreur('Veuillez vous connecter d\'abord.');
        return; // Stopper l'envoi si pas de token
    }

    const fileInput = document.getElementById('fileInput').files[0];
    const title = document.getElementById('titleInput').value;
    const category = document.getElementById('categorySelect').value;

    if (!fileInput || !title || !category) {
        afficherErreur('Veuillez remplir tous les champs avant de soumettre le formulaire.');
        return;
    }

    const formData = new FormData();
    formData.append('image', fileInput);
    formData.append('title', title);
    formData.append('category', category);

    try {
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Ajout du token dans les headers
            },
            body: formData,
        });

        if (response.ok) {
            const newProject = await response.json();
            fermerModalProjet();
            ajouterProjetALaGalerie(newProject);
            rechargerGalerie();           
        } else {
            const errorMessage = await response.json();
            afficherErreur('Erreur lors de l\'ajout du projet : ' + errorMessage.message);
        }
    } catch (error) {
        console.error('Erreur lors de la requête', error);
        afficherErreur('Une erreur est survenue lors de l\'ajout du projet.');
    }
}

// Gestionnaire d'événement pour la soumission du formulaire
const addProjectForm = document.getElementById('addProjectForm');
if (addProjectForm) {
    addProjectForm.addEventListener('submit', soumettreProjet);
} else {
    console.error('Élément addProjectForm introuvable');
}

}

// Écouteur d'événement pour la soumission du formulaire
const addProjectForm = document.getElementById('addProjectForm');
if (addProjectForm) {
    addProjectForm.addEventListener('submit', soumettreProjet);
} else {
    console.error('Élément addProjectForm introuvable');
}

// Fonction pour fermer le modal après l'ajout d'un projet
function fermerModalProjet() {
    const modal = document.getElementById('myModal_addProject');
    if (modal) {
        modal.style.display = 'none'; // Fermer le modal en masquant son affichage
    }
}

// Fonction pour ajouter un projet à la galerie
function ajouterProjetALaGalerie(projet) {
    // Implémentez ici la logique pour ajouter le projet à votre galerie
    console.log('Projet ajouté à la galerie:', projet);
}

// Fonction pour recharger la galerie
function rechargerGalerie() {
    // Implémentez ici la logique pour recharger la galerie après l'ajout
    console.log('Galerie rechargée');
}
