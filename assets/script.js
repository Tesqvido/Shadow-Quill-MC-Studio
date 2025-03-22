// Packs-Daten simulieren (wird später dynamisch gemacht)
const packs = [
    { name: "Phoenix Family", tag: "Addon", description: "Introduces human NPCs.", img: "pack1.png" },
    { name: "Mob Girls Add-On", tag: "Addon", description: "Transforms mobs into human girls.", img: "pack2.png" },
    { name: "Simple Texture Pack", tag: "Texture Pack", description: "Minimalist textures.", img: "pack3.png" },
    { name: "Fantasy World", tag: "World", description: "Custom fantasy world map.", img: "pack4.png" }
];

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
        .forEach(pack => {
            const packElement = document.createElement("div");
            packElement.classList.add("pack");
            packElement.innerHTML = `
                <img src="${pack.img}" alt="${pack.name}" class="pack-icon">
                <div class="pack-info">
                    <h2>${pack.name}</h2>
                    <p>${pack.description}</p>
                    <div class="pack-actions">
                        <a href="#" class="download-btn">Download</a>
                        <div class="social-share">
                            <a href="#">🔗 Share</a>
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
        const tag = tab.innerText;
        renderPacks("", tag);
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active"); // Markiert aktives Tab
    });
});

// Packs initial rendern
renderPacks();
