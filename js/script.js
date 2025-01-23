// Submit form
document.querySelector('#postForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const powerLevel = document.querySelector('#powerLevel').value.trim();
    const name = document.querySelector('#name').value.trim();

    if (!name || powerLevel === '') {
        alert('Both Power level and Superhero name are required!');
        return;
    }

    const body = {
        name: name,
        power: parseInt(powerLevel, 10),
    };

    try {
        const res = await fetch('http://localhost:3010/superheroes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        window.location.reload();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
});
