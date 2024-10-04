// Récupérer le token depuis le localStorage
const token = localStorage.getItem('api_token');

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
            fetchProjects()
        } else {
            console.error('Erreur lors de la suppression du projet :', response.statusText);
            alert('Une erreur est survenue lors de la suppression du projet.'); // Afficher une alerte
        }
    })
}


// Appeler loadProjects pour récupérer et afficher les projets lorsque le modal s'ouvre
loadProjects();