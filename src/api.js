// PART 1: The pokeapi I picked for this project.
const FEED = "https://pokeapi.co/api/v2/pokemon";

// PART 3: Error describers
export function describeError(err) {
    if (err instanceof TypeError) return "Could not reach the server. Check your connection.";
    if (err.status === 404) return "That feed does not exist any more.";
    if (err.status >= 500) return "Server is down, come again later.";
    if (err.status) return `The server refused the request (${err.status}).`;
    return "Something went wrong loading the data.";
}

// PART 1: Async function that returns raw data from the API.
export async function loadPokemon(doFetch = fetch) {
    // PART 1: Fetches data, and that data is turned into a JSON (after error handling).
    const response = await doFetch(FEED);

    // PART 3: Another check for errors.
    if (!response.ok) {
        const err = new Error(`HTTP ${response.status}`);
        err.status = response.status;
        throw err;
    }

    const listData = await response.json();

    // PART 1: Getting the results was painful.
    const detailPromises = listData.results.map(async (pokemon) => {
        const detailResponse = await doFetch(pokemon.url);
        // PART 1: Returns the pokemon's URL JSON.
        return detailResponse.json();
    });

    const fullDetailsList = await Promise.all(detailPromises);

    // PART 2: Data organized.
    return pokemonList(fullDetailsList);
}

// PART 2: Gets put in loadPokemon(), organizes.
export function pokemonList(detailedPokemons) {
    return detailedPokemons.map((p) => ({
        id: p.id,
        name: p.name,
        weight: p.weight,
        height: p.height,
        types: p.types.map(t => t.type.name),
    }))
};