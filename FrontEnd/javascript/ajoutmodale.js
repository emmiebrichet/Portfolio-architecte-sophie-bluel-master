// Écouteur d'événement pour le bouton qui déclenche l'input de fichier
document.getElementById('triggerFileInput').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) fileInput.click();
});

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

// Fonction pour vérifier si tous les champs sont remplis
function verifierChampsFormulaire() {
    const fileInput = document.getElementById('fileInput').files[0];
    const title = document.getElementById('titleInput').value;
    const category = document.getElementById('categorySelect').value;
    const validerButton = document.getElementById('validateButton');

    // Vérification des champs
    if (fileInput && title && category) {
        validerButton.style.backgroundColor = '#1D6154';
        validerButton.disabled = false; // On active le bouton
    } else {
        validerButton.style.backgroundColor = 'grey';
        validerButton.disabled = true; // On désactive le bouton
    }
}

// Ajout d'événements pour détecter les changements dans les champs
document.getElementById('fileInput').addEventListener('change', verifierChampsFormulaire);
document.getElementById('titleInput').addEventListener('input', verifierChampsFormulaire);
document.getElementById('categorySelect').addEventListener('change', verifierChampsFormulaire);

// Fonction pour soumettre un nouveau projet via l'API
async function soumettreProjet(event) {
    event.preventDefault();

    const token = localStorage.getItem('api_token');
    if (!token) {
        afficherErreur('Veuillez vous connecter d\'abord.');
        return;
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
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.ok) {
            const nouveauProjet = await response.json();
            fermerModalProjet();
            // ajouterProjetALaGalerie(nouveauProjet);
            // rechargerGalerie();
            loadProjects()
            fetchProjects()


        } else {
            afficherErreur('Erreur lors de l\'ajout du projet.');
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

// Fonction pour fermer le modal après l'ajout d'un projet
function fermerModalProjet() {
    const modal = document.getElementById('myModal_addProject');
    if (modal) {
        modal.style.display = 'none'; // Fermer le modal en masquant son affichage
    }
}

