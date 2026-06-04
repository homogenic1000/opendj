document.addEventListener('DOMContentLoaded', () => {
    var app = document.getElementById('app');

    var typewriter = new Typewriter(app, {
        loop: true,
        delay: 75
    });

  typewriter
    .pauseFor(1200)
    .typeString('Pour une fête libre.')
    .pauseFor(1900)
    .deleteChars(7)
    .typeString(' accessible.')
    .pauseFor(1900)
    .deleteChars(11)
    .typeString(' meilleure.')
    .pauseFor(1900)
    .start();
});