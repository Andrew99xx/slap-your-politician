document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('cursor-sound'); // Get the audio element

    // Initialize balls with different speeds
    const balls = [
        { element: document.getElementById('ball1'), speedX: 1, speedY: 1, velocity: 1 }, // Slow
        { element: document.getElementById('ball2'), speedX: 2, speedY: 2, velocity: 2 }, // Medium
        { element: document.getElementById('ball3'), speedX: 3, speedY: 3, velocity: 3 }  // Fast
    ];

    balls.forEach(ball => {
        // Set initial random position ensuring balls don't go out of viewport
        ball.element.style.left = Math.random() * (window.innerWidth - ball.element.offsetWidth) + 'px';
        ball.element.style.top = Math.random() * (window.innerHeight - ball.element.offsetHeight) + 'px';

        // Add click event listener to each ball
        ball.element.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevents the click from bubbling to the body
            handleCursorChange();
        });
    });

    // Function to handle cursor change, play audio, and revert after 1 second
    function handleCursorChange() {
        audio.currentTime = 0; // Reset audio to start
        audio.play(); // Play the audio
        document.body.classList.add('custom-cursor-click'); // Add custom cursor class to body

        setTimeout(() => {
            document.body.classList.remove('custom-cursor-click'); // Remove custom cursor class from body after 1 second
        }, 1000);
    }

    // Function to move the balls
    function moveBalls() {
        balls.forEach(ball => {
            let rect = ball.element.getBoundingClientRect();

            // Update position
            let newX = rect.left + ball.speedX * ball.velocity;
            let newY = rect.top + ball.speedY * ball.velocity;

            // Check boundaries and reverse direction if needed
            if (newX <= 0 || newX >= window.innerWidth - ball.element.offsetWidth) ball.speedX *= -1;
            if (newY <= 0 || newY >= window.innerHeight - ball.element.offsetHeight) ball.speedY *= -1;

            ball.element.style.left = (rect.left + ball.speedX * ball.velocity) + 'px';
            ball.element.style.top = (rect.top + ball.speedY * ball.velocity) + 'px';
        });

        requestAnimationFrame(moveBalls);
    }

    moveBalls();

    // Add click event listener to the body for handling clicks outside the balls
    document.body.addEventListener('click', (event) => {
        if (!event.target.classList.contains('ball')) {
            handleCursorChange();
        }
    });
});
