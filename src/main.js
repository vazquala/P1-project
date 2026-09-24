import { loadPokemon, describeError } from "./api.js";
import { renderList, renderLoading, renderError } from "./render.js";

// PART 1: getting output from html.
const output = document.querySelector("#output");

async function show() {
    // PART 3: Output set to renderLoading when loading.
    renderLoading(output);
    try {
        // PART 2: If successful, renders the list in output.
        const pokeData = await loadPokemon();
        renderList(output, pokeData);
    } catch (err) {
        // PART 3: Output set to renderError when something goes wrong.
        renderError(output, describeError(err));
        document.querySelector("#retry")?.addEventListener("click", show);
    }
}

show();