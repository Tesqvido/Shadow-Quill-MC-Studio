// Packs-Daten simulieren (wird später dynamisch gemacht)
const packs = [
    { name: "Chat Ranks", tag: ["Addon"], description: "Add chat ranks to your server.", img: "./assets/chatranks.png", file: "./downloads/chatranks.zip" },
    { name: "Custom join message", tag: ["Addon", "Texture Pack"], description: "Select between different join messages in-game.", img: "./assets/join-msg.png", file: "./downloads/joinmsg.zip" },
    { name: "Placeholder Addon", tag: ["Addon"], description: "This pack is under development. (For Addon)", img: "./assets/pack2.png", file: "./downloads/servergui.zip" },
    { name: "Placeholder Addon", tag: ["Addon"], description: "This pack is under development. (For Addon)", img: "./assets/pack2.png", file: "./downloads/servergui.zip" },
    { name: "Placeholder World", tag: ["World"], description: "This pack is under development. (For World)", img: "./assets/pack4.png", file: "./downloads/fantasyworld.zip" },
    { name: "Placeholder World", tag: ["World"], description: "This pack is under development. (For World)", img: "./assets/pack4.png", file: "./downloads/fantasyworld.zip" },
    { name: "Placeholder World", tag: ["World"], description: "This pack is under development. (For World)", img: "./assets/pack4.png", file: "./downloads/fantasyworld.zip" },
    { name: "Placeholder World", tag: ["World"], description: "This pack is under development. (For World)", img: "./assets/pack4.png", file: "./downloads/fantasyworld.zip" },
    { name: "Placeholder RP", tag: ["Texture Pack"], description: "This pack is under development. (For Texture Pack)", img: "./assets/pack4.png", file: "./downloads/fantasyworld.zip" },
    { name: "Placeholder RP", tag: ["Texture Pack"], description: "This pack is under development. (For Texture Pack)", img: "./assets/pack4.png", file: "./downloads/fantasyworld.zip" },
    { name: "Placeholder RP", tag: ["Texture Pack"], description: "This pack is under development. (For Texture Pack)", img: "./assets/pack4.png", file: "./downloads/fantasyworld.zip" },
    { name: "Placeholder RP", tag: ["Texture Pack"], description: "This pack is under development. (For Texture Pack)", img: "./assets/pack4.png", file: "./downloads/fantasyworld.zip" }
];


const packContainer = document.querySelector(".pack-list");
const searchInput = document.querySelector(".search-bar");
const tabs = document.querySelectorAll("nav ul li a");

const tabToTagMap = {
    "Addons": "Addon",
    "Worlds": "World",
    "Texture Packs": "Texture Pack",
    "Favorites": "Favorites",  // Mapping für den Favoriten-Tab
    "All": "All"
};

// Favorites aus localStorage laden oder leeres Array
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];  // Korrektur: 'favorites' statt 'favortiten'

// Funktion zum Favorisieren eines Packs
function toggleFavorite(packName) {
    if (favorites.includes(packName)) {
        favorites = favorites.filter(fav => fav !== packName);  // Entfernen
    } else {
        favorites.push(packName);  // Hinzufügen
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));  // Speichern
}

// Funktion zum Rendern der Packs nach Filter (Suchbegriff, Tab oder Favorites)
function renderPacks(filter = "", tagFilter = "All") {
    packContainer.innerHTML = ""; // Alte Packs entfernen

    packs
        .filter(pack =>
            pack.name.toLowerCase().includes(filter.toLowerCase()) &&
            (tagFilter === "All" || (tagFilter === "Favorites" ? favorites.includes(pack.name) : pack.tag.includes(tagFilter)))
        )
        .forEach(pack => {
            const packElement = document.createElement("div");
            packElement.classList.add("pack");

            const isFavorite = favorites.includes(pack.name);  // Favoriten überprüfen
            const encodedPackName = encodeURIComponent(pack.name); // Encode für URL
            const shareLink = `${window.location.origin}${window.location.pathname}?pack=${encodedPackName}`;

           packElement.innerHTML = `
    <img src="${pack.img}" alt="${pack.name}" class="pack-icon">
    <div class="pack-info">
        <h2>${pack.name}</h2>
        <p>${pack.description}</p>
        <div class="pack-actions">
            <a href="${pack.file}" download class="download-btn">Download</a>  
            <button class="favorite-btn ${isFavorite ? 'favorited' : ''}" data-pack-name="${pack.name}">
                <i class="star-icon"></i> 
            </button>
            <div class="social-share">
                <a href="${shareLink}" target="_blank">🔗 Share</a>
            </div>
        </div>
    </div>
`;

            packContainer.appendChild(packElement);

            // Event-Listener für den Favorite-Button
            packElement.querySelector(".favorite-btn").addEventListener("click", () => {
                toggleFavorite(pack.name);  // Favoritenstatus toggeln
                renderPacks(filter, tagFilter);  // Neu rendern, um den Sternstatus zu aktualisieren
            });
        });
}

// Event für die Suche
searchInput.addEventListener("input", e => {
    renderPacks(e.target.value);
});

// Event für Tabs (Filter nach Tag)
tabs.forEach(tab => {
    tab.addEventListener("click", e => {
        e.preventDefault();
        const tabText = tab.innerText;
        const tag = tabToTagMap[tabText] || "All";
        renderPacks("", tag);
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
    });
});

// Wenn es einen "pack" URL-Parameter gibt, wird das entsprechende Pack automatisch gefiltert
function handlePackParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const packParam = urlParams.get("pack");

    if (packParam) {
        renderPacks(packParam, "All");  // Filtert den Namen korrekt mit "All"
    } else {
        renderPacks(); // Render alle Packs, wenn kein Parameter vorhanden ist
    }
}

// Packs initial rendern (inklusive Überprüfung auf "pack" URL-Parameter)
handlePackParam();
