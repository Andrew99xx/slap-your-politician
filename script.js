document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('cursor-sound'); // Get the audio element
    const whooshAudio=document.getElementById('whoosh-sound');
    const customCursor = document.getElementById('custom-cursor'); // Get the custom cursor element

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
            handleCursorChange(event);
        });
    });

    // Function to handle cursor change, play audio, and revert after 1 second
    function handleCursorChange(event, body) {
        const pic1 = "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAB+FBMVEVHcExcSkK1kYXdtq2LbmC1l4iLalfFtqm4mYrz3NKgbVuAZFPBn4vFqJXEpJC4k4NhTkaJZlZQPTSdeGdNOTBGMypQOi9YRT1POzPVtKWwjn6kgnCdfGmfemmifm2xiHrUrKLowrinfGnSpqCid2iof2y4jX+/kYfAoIxUQTqIa1uAYU98Xky5loFQOTBfQzjKqJWbeWpfTUVhS0JDLiWbfG6MaldKNy+dfW6admSTcF+WdmRiS0GgfG3GnYtXQjeabl5fSD5BLiXKoJTNo53cs6m1hHuuh3KrhnLRoZm1jX68k4ewg3O2gXWmeWnNo5qthHa1jn6pgXHpwrz/qnShZ3rAnoyhe2mMZ1Sui3rGoo+vjn+8moqthnN/WkmGZVR1WEjCoI60lISZcWGHY1C/nImUbFm2k3+5l4W0j3usg2+LZVBXPTGPa1eDZFNxU0R5XU2QZ1RELCFUOCy8nYyed2amfXCDXkuGYU+Sb12JbFxpTD2kg3I9KB99YlOhe2WzkYCsh3eNX0ynfmqCYU6Yc1+ObV3HppOgfGx4VUR6WUiNb1+ZdmdgRTfBl4PDm4aVcmOsjn6hdGG7k4GkfWqTZVZLNCiFaFh/YE+sgGuPYk9nRjjOqZjJqZnBopSxg3a+kI2aZltvSjp1Tz+7jHbCmI2KbWFHcEzHTUpWAAAAqHRSTlMAGhIfPRb+AggE/Y71PaJULtGWkcLW0j12/IYtVSHgxVQ1p6L19LTYrFxP9c/z3+HsxiRI9lvigPLspnHRudXp92rlm9lZ0PNrvudiZY75uPvx5Gqs/////////////////////////////////////////////////////////////////v///////////////////////////v///////////////wCB6+mxAAACLElEQVQ4y52T1XfiYBDFC8XrrlvZ2rq7u/ueEyUhCRDcXQrBiju01Nu1v3PZt4SFfdjv9fedmXtn5nZ1/e+Tiv+JJW8/fuU/X+zIT5z8dLi2evRa0oHPzLvqxzLQ/b59G/HsnB6LxuC6bKm7jTap+NVKTFepaeX146OFVipcWHo6/VKPxcIYsLzjXutulfZg6qcew2q0Xlf9/CXy4V2LtTt05bBaLMB0jaEiK4x8dVHK+XA3YYvKfuwhmJ4pK5Ug+ubFM06L2dugy7ZTKRSLyAEK6mD3snuez+KCGwkwYbPRse3C3r5WQ8Eg+GiAXaBH5fOZIBFkiOpJRIvmlJHICHuQ/HMqkUKlMkN4WlklAcrlUt4XsqcnOKuKewyQyZNpmLbVSa3ONTTDsdDj9eB/OG7OfMNBJpKaE3C4cMhgaHJVQ+RNWyyQO3XrOndIZ0Q0bbJ5ccWGokEEvivRae4ixSNgOBxOQN6430xYrWn8spCzo77+8xqdDgMh3Gr2+7cI40W2AElf/yVErdVomJSZILayCovxwlUWHzjViyQRgIJhqpwNWa1EwDg+wa7fq1YDCEICpJNylrNE3rg5OsjRBzQfSQLq5JQTRf2BzWvDPK5BNUACTrkWhvcPSqWQY+x06yXL5U45hQZ98RL1K/9w+MpfV8owKBzMKQKO3dC9ycE2dx4M5nxNZ3b7+GNe2xRsKDK7Dvv62CSvQ4os+SZ+cpPXMYZNvD460TnGvwFgUK7T4xVj6AAAAABJRU5ErkJggg=="
        const pic2 = "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABSlBMVEVHcEzappPhvKvNpJHhwrbOrJzcuq3eppLmyb3hva7auajgrZy8lIPTtae/no7au6rBn47i2M7emYfEnovVppHDppbbpI/MoY3irZe/mIPgqZbTrZ3ZnYnZp5PLn47or5rZsqG9npHbuKjbrprVqpe+nIvippTdn4rcs6HhopDPr57Tq5fZrpTaopLdtKHAknzaqY/jrJfSnoLlsp3fpZTYsZ7DnYrKmYbpu6jmxbXqvavbqZDNno+3hnPkvazlwbC8iXPn4Mr//9zesJLhqZHespnlsJfWppLNoY7ZsZnZpo3dq5fSpJLGnIfXrJbSpYzDmYLZrJHaq5nKnordnorcsJzWqZPNpZLcq4/Rq5nsuaTswa/Vo4/ZqZXWoovdsZ7JmoLhrpTrtp3DjHLcsKLitJ7SnYfntJrNl3/Vo4XElHnlwLHjt6BHcEy+nhkIAAAAbnRSTlMAcWZBChYc/gYPKE78Wck/TAHz/NGZZpDh9Tkw6JpTi7mJhfjr6URax/O2j/XkwIa1vPOcWdai5N+EvPbWqqKlt7ei////////////////////////////////////////////////////////AN+tJM4AAAEnSURBVDjLzVJFe8JQEAxN0pcQPFCgWN3dvT3E3QgkuNf+/7n3luXcvc58uyOLYf9t6F1yMWElEyEW4UzZy+zAMHGVRd7+KkyIIEXhCssgXjpGA+SdgxrSFVUQhOElvKCAOE4Il2CH3EAYhndR0MJZs8mFrQdQAn7xoSj81wt44dA0ffu7dU8xtRpD/cXJrG0b9qz1WkEcKs8JK3nEyzI/Ex6no7cqTs9JscnL/GSiqtPn+X3mu3VD7o3H6hMQdf7dNBtBIN1WAROno0+9EbA3JchlqmhZln4AfwuVs9x+/xruGsOLmqF04KowMuH6vHpCw4wc26j3NuMwIc5KRt3Zg1VEt13NcTobaejjiISu+R1xKwmuWI9Jmii210CdqZgrae2u+MvqD0UqM09Fj6c9AAAAAElFTkSuQmCC"

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 800;
        if (!body) {

            audio.currentTime = 0; // Reset audio to start
            audio.play(); // Play the audio
        }else{
            whooshAudio.currentTime = 0;
            whooshAudio.play()
        }
        document.body.classList.add('custom-cursor-click'); // Add custom cursor class to body
        if (isMobile) {

            customCursor.style.display = 'block';
            customCursor.style.backgroundImage = `url('${pic1}')`;

            customCursor.style.left = `${event.clientX - 15}px`; // Center the cursor
            customCursor.style.top = `${event.clientY - 15}px`;  // Center the cursor
        }

        setTimeout(() => {
            document.body.classList.remove('custom-cursor-click'); // Remove custom cursor class from body after 1 second
            if (isMobile) {
                customCursor.style.backgroundImage = `url('${pic2}')`;
                setTimeout(() => {

                    customCursor.style.display = 'none'; // Hide the custom cursor
                }, 500)

            }

        }, 500);
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
    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('touchmove', updateCursorPosition);

    function updateCursorPosition(event) {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 800;

        let clientX, clientY;

        if (event.touches) {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        } else {
            clientX = event.clientX;
            clientY = event.clientY;
        }
        if (isMobile) {

            customCursor.style.left = `${clientX - 15}px`; // Adjust for cursor size
            customCursor.style.top = `${clientY - 15}px`;
        }
    }


    // Add click event listener to the body for handling clicks outside the balls
    document.body.addEventListener('click', (event) => {
        if (!event.target.classList.contains('ball')) {
            handleCursorChange(event,true);
        }
    });
});
