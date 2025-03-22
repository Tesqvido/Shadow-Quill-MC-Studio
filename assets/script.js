// Packs-Daten simulieren (wird später dynamisch gemacht)
const packs = [
    { name: "Chat Ranks", tag: "Addon", description: "Introduces human NPCs.", img: "pack1.png", downloads: 0 },
    { name: "Server GUI", tag: "Addon", description: "Transforms mobs into human girls.", img: "pack2.png", downloads: 0 },
    { name: "Simple Texture Pack", tag: "Texture Pack", description: "Minimalist textures.", img: "pack3.png", downloads: 0 },
    { name: "Fantasy World", tag: "World", description: "Custom fantasy world map.", img: "pack4.png", downloads: 0 }
];

// Downloads aus LocalStorage wiederherstellen
function loadDownloads() {
    const storedDownloads = JSON.parse(localStorage.getItem("packDownloads")) || {};
    packs.forEach((pack, index) => {
        pack.downloads = storedDownloads[pack.name] || 0;
    });
}

// Downloads in LocalStorage speichern
function saveDownloads() {
    const downloadsToStore = {};
    packs.forEach(pack => {
        downloadsToStore[pack.name] = pack.downloads;
    });
    localStorage.setItem("packDownloads", JSON.stringify(downloadsToStore));
}

const packContainer = document.querySelector(".pack-list");
const searchInput = document.querySelector(".search-bar");
const tabs = document.querySelectorAll("nav ul li a");

// Funktion zum Rendern der Packs nach Filter (Suchbegriff oder Tab)
function renderPacks(filter = "", tagFilter = "All") {
    packContainer.innerHTML = ""; // Alte Packs entfernen

    packs
        .filter(pack =>
            pack.name.toLowerCase().includes(filter.toLowerCase()) &&
            (tagFilter === "All" || pack.tag === tagFilter)
        )
        .forEach((pack, index) => {
            const packElement = document.createElement("div");
            packElement.classList.add("pack");
            packElement.innerHTML = `
                <img src="${pack.img}" alt="${pack.name}" class="pack-icon">
                <div class="pack-info">
                    <h2>${pack.name}</h2>
                    <p>${pack.description}</p>
                    <p class="download-count">Downloads: <span id="downloads-${index}">${pack.downloads}</span></p>
                    <div class="pack-actions">
                        <button class="download-btn" data-index="${index}">Download</button>
                        <div class="social-share">
                            <a href="#">🔗 Share</a>
                        </div>
                    </div>
                </div>
            `;
            packContainer.appendChild(packElement);
        });

    // Download-Button-Funktionalität aktivieren
    document.querySelectorAll(".download-btn").forEach(button => {
        button.addEventListener("click", () => {
            const index = button.getAttribute("data-index");
            packs[index].downloads += 1;
            document.getElementById(`downloads-${index}`).innerText = packs[index].downloads;
            saveDownloads(); // Speicher die Downloads nach jeder Aktion
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
        const tag = tab.innerText;
        renderPacks("", tag);
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active"); // Markiert aktives Tab
    });
});

// Downloads laden und Packs initial rendern
loadDownloads();
renderPacks();
