// Packs-Daten simulieren (wird später dynamisch gemacht)
const packs = [
    { name: "Chat Ranks", tag: "Addon", description: "Add chat ranks to your server.", img: "./assets/chatranks.png" },
    { name: "Server GUI", tag: "Addon", description: "Transforms mobs into human girls.", img: "pack2.png" },
    { name: "Simple Texture Pack", tag: "Texture Pack", description: "Minimalist textures.", img: "pack3.png" },
    { name: "Fantasy World", tag: "World", description: "Custom fantasy world map.", img: "pack4.png" }
];

const packContainer = document.querySelector(".pack-list");
const searchInput = document.querySelector(".search-bar");
const tabs = document.querySelectorAll("nav ul li a");

const tabToTagMap = {
    "Addons": "Addon",
    "Worlds": "World",
    "Texture Packs": "Texture Pack",
    "Kontakt": "All",
    "All": "All"
};

// Funktion zum Rendern der Packs nach Filter (Suchbegriff oder Tab)
function renderPacks(filter = "", tagFilter = "All") {
    packContainer.innerHTML = ""; // Alte Packs entfernen

    packs
        .filter(pack =>
            pack.name.toLowerCase().includes(filter.toLowerCase()) &&
            (tagFilter === "All" || pack.tag === tagFilter)
        )
        .forEach(pack => {
            const packElement = document.createElement("div");
            packElement.classList.add("pack");
            const encodedPackName = encodeURIComponent(pack.name); // Encode für URL
            const shareLink = `${window.location.origin}${window.location.pathname}?pack=${encodedPackName}`;

            packElement.innerHTML = `
                <img src="${pack.img}" alt="${pack.name}" class="pack-icon">
                <div class="pack-info">
                    <h2>${pack.name}</h2>
                    <p>${pack.description}</p>
                    <div class="pack-actions">
                        <button class="download-btn">Download</button>
                        <div class="social-share">
                            <a href="${shareLink}" target="_blank">🔗 Share</a>
                        </div>
                    </div>
                </div>
            `;
            packContainer.appendChild(packElement);
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
        renderPacks(packParam);
    } else {
        renderPacks(); // Render alle Packs, wenn kein Parameter vorhanden ist
    }
}

// Packs initial rendern (inklusive Überprüfung auf "pack" URL-Parameter)
handlePackParam();
