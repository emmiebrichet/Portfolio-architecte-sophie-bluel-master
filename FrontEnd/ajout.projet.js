document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5678/api/categories')
        .then(response => response.json())
        .then(data => {
            const categorySelect = document.getElementById('categorySelect');
            data.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des catégories :', error));
});
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const validateButton = document.getElementById('validateButton');
    const fileInput = document.getElementById('fileInput');
    const icon = document.querySelector('.icone');
    const uploadButton = document.querySelector('.bouton');
    const fileInfo = document.querySelector('.file-info');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imagePreviewContainer = document.getElementById('imagePreviewContainer');
            imagePreviewContainer.innerHTML = `<img src="${e.target.result}" alt="Aperçu de l'image" class="preview-image">`;

            // Masquer l'élément input, l'icône, le bouton et les informations du fichier
            fileInput.style.display = 'none';
            icon.style.display = 'none';
            uploadButton.style.display = 'none';
            fileInfo.style.display = 'none';

            // Changer la couleur du bouton Valider
            validateButton.style.backgroundColor = '#1D6154';
        };
        reader.readAsDataURL(file);
    }
});
document.getElementById('addProjectForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput').files[0];
    const title = document.getElementById('titleInput').value;
    const category = document.getElementById('categorySelect').value;

    if (fileInput && title && category) {
        const formData = new FormData();
        formData.append('image', fileInput);
        formData.append('title', title);
        formData.append('category', category);

        try {
            const response = await fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyNjQ3ODQzOCwiZXhwIjoxNzI2NTY0ODM4fQ.2wiHnaULlAzsxXYlQDHzguHCuJMT8_kxjmgxXrL7iEw'
                },
                body: formData
            });

            
            if (response.ok) {
                const newProject = await response.json();
            
            document.getElementById('myModal_addProject').close();

                ajouterProjetALaGalerie(newProject);
                   rechargerGalerie();
               
            } else {
                alert('Erreur lors de l\'ajout du projet');
            }
        } catch (error) {
            console.error('Erreur lors de la requête', error);
        }
    }
});

// Écouteur d'événement pour la sélection de fichier
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const validateButton = document.getElementById('validateButton'); // Récupérer le bouton Valider

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imagePreviewContainer = document.getElementById('imagePreviewContainer');
            imagePreviewContainer.innerHTML = `<img src="${e.target.result}" alt="Aperçu de l'image" class="preview-image">`;
            validateButton.style.backgroundColor = '#1D6154'; // Changer la couleur du bouton
        };
        reader.readAsDataURL(file);
    }
});

// Écouteur d'événement pour le clic sur le bouton + Ajouter photo
document.getElementById('triggerFileInput').addEventListener('click', function() {
    document.getElementById('fileInput').click();
});

C

