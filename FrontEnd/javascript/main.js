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




