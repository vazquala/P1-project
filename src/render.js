// PART 3: Retry button for errors.
export function renderError(el, message) {
    el.innerHTML = `<p class="state error">${message}</p>
    <button id="retry" type="button">Try again</button>`;
}

// PART 3: Empty.
export function renderEmpty(el) {
    el.innerHTML = `<p>Nothing has loaded.</p>`;
}

// PART 3: Loading.
export function renderLoading(el) {
    el.innerHTML = `<p>Loading your Pokémon list...</p>`;
}

// PART 2: renderList, shapes the JSON File.
export function renderList(el, items) {
    // PART 2: Empty case handling.
    if (items.length === 0) return renderEmpty(el);
    el.innerHTML = `<ul>` + items.map((q) => `
    <li>
        <p>${q.name}</p>
        <p>id: ${q.id}</p>
        <p>weight: ${q.weight}</p>
        <p>height: ${q.height}</p>
        <p>types: ${q.types}</p>
    </li>`
    ).join('') + `</ul>`
};