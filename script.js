document.addEventListener('DOMContentLoaded', function() {
    console.log("JavaScript interactions loaded!");
    // Exemple simple de scroll animé (à développer pour le TP)
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});