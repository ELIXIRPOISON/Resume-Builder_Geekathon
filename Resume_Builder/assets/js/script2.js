
const githubUrl = 'https://api.github.com/users/elixirpoison';

async function fetchData() {
    try {
        const response = await fetch(githubUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

fetchData();

