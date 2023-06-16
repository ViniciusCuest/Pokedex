export default async function About() {
    const data = await getData();
    return (
        <div>
            <h1>alura case</h1>
        </div>
    );
}

async function getData() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/charmander', {
        cache: 'no-store'
    });
    const data = await response.json();
    return {
        props: {
            pokemons: data
        }
    }
}