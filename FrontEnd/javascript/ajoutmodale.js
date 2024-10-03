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
