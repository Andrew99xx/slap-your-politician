document.addEventListener('DOMContentLoaded', function () {
    // Initialize balls with different speeds
    const balls = [
        { element: document.getElementById('ball1'), speedX: 1, speedY: 1, velocity: 1 }, // Slow
        { element: document.getElementById('ball2'), speedX: 2, speedY: 2, velocity: 2 }, // Medium
        { element: document.getElementById('ball3'), speedX: 3, speedY: 3, velocity: 3 }  // Fast
    ];

    balls.forEach(ball => {
        // Set initial random position
        ball.element.style.left = Math.random() * (window.innerWidth - 50) + 'px';
        ball.element.style.top = Math.random() * (window.innerHeight - 50) + 'px';

        // Add click event listener
        ball.element.addEventListener('click', () => {
            const audio = document.getElementById('cursor-sound'); 
            console.log(`Ball clicked: ${ball.element.id}`);
            event.stopPropagation(); // Prevents the click from bubbling to the body
            audio.currentTime = 0; // Reset audio to start
            audio.play(); // Play the audio
            document.documentElement.classList.add('custom-cursor-click'); // Add custom cursor class
            ball.element.classList.add('custom-cursor-click'); // Add custom cursor class

            setTimeout(() => {
                document.documentElement.classList.remove('custom-cursor-click'); // Remove custom cursor class after 1 second
                ball.element.classList.remove('custom-cursor-click'); // Remove custom cursor class after 1 second

            }, 500);
        });
    });

    function moveBalls() {
        balls.forEach(ball => {
            let rect = ball.element.getBoundingClientRect();

            // Update position
            let newX = rect.left + ball.speedX * ball.velocity;
            let newY = rect.top + ball.speedY * ball.velocity;

            // Check boundaries and reverse direction if needed
            if (newX <= 0 || newX >= window.innerWidth - 50) ball.speedX *= -1;
            if (newY <= 0 || newY >= window.innerHeight - 50) ball.speedY *= -1;

            ball.element.style.left = (rect.left + ball.speedX * ball.velocity) + 'px';
            ball.element.style.top = (rect.top + ball.speedY * ball.velocity) + 'px';
        });

        requestAnimationFrame(moveBalls);
    }

    moveBalls();
});
document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('cursor-sound'); // Get the audio element

    document.body.addEventListener('click', function () {
        audio.currentTime = 0; // Reset audio to start
        audio.play(); // Play the audio
        document.documentElement.classList.add('custom-cursor-click'); // Apply to <html>
        setTimeout(() => {
            document.documentElement.classList.remove('custom-cursor-click');
        }, 1000);
    });
});

