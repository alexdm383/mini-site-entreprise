document.addEventListener('DOMContentLoaded', function() {
    console.log("JavaScript des interactions chargé !");

    // --- 1. Fonctionnalité de défilement fluide (Smooth Scroll) ---
    // Cette partie gère l'animation de défilement doux lorsque l'utilisateur
    // clique sur un lien de navigation qui pointe vers une section (via son ID).
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Empêche le comportement de lien par défaut (saut direct)

            // Récupère l'ID de la section cible depuis l'attribut href du lien (ex: "#collections")
            const targetId = this.getAttribute('href');
            // Trouve l'élément HTML correspondant à cet ID
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Utilise scrollIntoView pour faire défiler la page jusqu'à l'élément cible
                // 'behavior: "smooth"' assure l'animation de défilement.
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Si le menu burger est ouvert sur mobile, on le ferme après avoir cliqué sur un lien
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // --- 2. Fonctionnalité de menu burger (pour mobile) ---
    // Cette partie gère l'ouverture et la fermeture du menu de navigation
    // lorsque l'utilisateur clique sur l'icône du menu burger sur les petits écrans.
    const menuToggle = document.querySelector('.menu-toggle'); // Le bouton du menu burger
    const navMenu = document.querySelector('.nav-menu');       // Le conteneur du menu de navigation

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            // La méthode toggle bascule la classe 'active':
            // si elle est présente, elle l'enlève; si elle est absente, elle l'ajoute.
            // Le CSS (dans style.css) gère l'affichage/masquage du menu en fonction de cette classe.
            navMenu.classList.toggle('active');
        });
    }

    // --- 3. Fonctionnalité de Carrousel simple (pour la section Nouveautés) ---
    // Cette partie gère le défilement des images dans le carrousel de la section "Nouveautés".
    const carouselSlides = document.querySelector('.carousel-slides'); // Conteneur des images du carrousel
    const prevButton = document.querySelector('.carousel-nav.prev'); // Bouton "Précédent"
    const nextButton = document.querySelector('.carousel-nav.next'); // Bouton "Suivant"

    if (carouselSlides && prevButton && nextButton) {
        const slides = carouselSlides.children; // Récupère toutes les images (slides) dans le carrousel
        let currentIndex = 0; // Index de la diapositive actuellement affichée
        const totalSlides = slides.length; // Nombre total de diapositives
        let slideWidth = slides[0].clientWidth; // Largeur d'une diapositive (assumant que toutes ont la même largeur)

        // Fonction pour mettre à jour la largeur de la diapositive et la position du carrousel
        // Ceci est important pour la réactivité: si la taille de la fenêtre change, la largeur des images aussi.
        function updateSlideWidth() {
            if (slides.length > 0) {
                slideWidth = slides[0].clientWidth; // Récupère la nouvelle largeur de la première diapositive
                // Applique la transformation pour afficher la diapositive courante avec la nouvelle largeur
                carouselSlides.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
            }
        }

        // Écoute l'événement de redimensionnement de la fenêtre pour ajuster la largeur des diapositives
        window.addEventListener('resize', updateSlideWidth);

        // Fonction principale pour afficher une diapositive spécifique
        function showSlide(index) {
            // Logique pour boucler le carrousel:
            // Si l'index dépasse la dernière diapositive, revient à la première (0).
            if (index >= totalSlides) {
                currentIndex = 0;
            // Si l'index est inférieur à 0 (avant la première), passe à la dernière diapositive.
            } else if (index < 0) {
                currentIndex = totalSlides - 1;
            // Sinon, l'index est valide, on le met à jour.
            } else {
                currentIndex = index;
            }
            // Applique une transformation CSS pour déplacer le conteneur des diapositives
            // Le décalage est la largeur d'une diapositive multipliée par l'index courant (négatif pour se déplacer à gauche).
            carouselSlides.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
        }

        // Gère le clic sur le bouton "Précédent" : affiche la diapositive précédente
        prevButton.addEventListener('click', function() {
            showSlide(currentIndex - 1);
        });

        // Gère le clic sur le bouton "D'après" : affiche la diapositive suivante
        nextButton.addEventListener('click', function() {
            showSlide(currentIndex + 1);
        });

        // Afficher la première diapositive au chargement initial de la page
        showSlide(currentIndex);
    }
});
