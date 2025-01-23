// Get all superheroes
async function fetchSuperheroes() {
    try {
        const response = await fetch('http://localhost:3010/superheroes');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const container = document.getElementById('post-container');
        data.forEach(post => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `
        <p>${post.name.toUpperCase()}</p>
        <p>Power level: ${post.power}</p>
      `;
            container.appendChild(postElement);
        });

    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}
fetchSuperheroes();
