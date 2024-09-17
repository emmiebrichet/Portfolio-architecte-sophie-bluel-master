document.addEventListener('DOMContentLoaded', function() { 
    const categorySelect = document.getElementById('categorySelect');
    
    if (categorySelect) {
        fetch('http://localhost:5678/api/categories')
            .then(response => response.json())
            .then(data => {
                data.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.id;
                    option.textContent = category.name;
                    categorySelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erreur lors de la récupération des catégories :', error));
    } else {
        console.error('Élément categorySelect introuvable');
    }
});

const fileInput = document.getElementById('fileInput');
if (fileInput) {
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const validateButton = document.getElementById('validateButton');
        const icon = document.querySelector('.icone');
        const uploadButton = document.querySelector('.bouton');
        const fileInfo = document.querySelector('.file-info');
        
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imagePreviewContainer = document.getElementById('imagePreviewContainer');
                imagePreviewContainer.innerHTML = `<img src="${e.target.result}" alt="Aperçu de l'image" class="preview-image">`;

                // Masquer les éléments
                fileInput.style.display = 'none';
                icon && (icon.style.display = 'none');
                uploadButton && (uploadButton.style.display = 'none');
                fileInfo && (fileInfo.style.display = 'none');

                // Changer la couleur du bouton Valider
                validateButton.style.backgroundColor = '#1D6154';
            };
            reader.readAsDataURL(file);
        }
    });
} else {
    console.error('Élément fileInput introuvable');
}

const addProjectForm = document.getElementById('addProjectForm');
if (addProjectForm) {
    addProjectForm.addEventListener('submit', async function(event) {
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
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyNjU2NjI0NSwiZXhwIjoxNzI2NjUyNjQ1fQ.ysVYWCKuAM7NV7CdxRLE7-W94KR3Bg97sp5qewlKrTs' 
                    },
                    body: formData
                });

                if (response.ok) {
                    const newProject = await response.json();
                    const modal = document.getElementById('myModal_addProject');
                    
                    if (modal && typeof modal.close === 'function') {
                        modal.close(); // Assurez-vous que c'est bien un dialog
                    }

                    // Appeler des fonctions supplémentaires
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
} else {
    console.error('Élément addProjectForm introuvable');
}

document.getElementById('triggerFileInput').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.click();
    } else {
        console.error('Élément fileInput introuvable');
    }
});
