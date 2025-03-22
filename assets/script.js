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

// Elemente für das Popup
const sharePopup = document.getElementById("share-popup");
const shareLinkInput = document.getElementById("share-link");
const closePopupButton = document.getElementById("close-popup");

// Funktion zum Anzeigen und automatischen Kopieren des Links
function showSharePopup(link) {
    shareLinkInput.value = link; // Link in das Textfeld einfügen
    sharePopup.classList.remove("hidden"); // Popup anzeigen

    // Link automatisch in die Zwischenablage kopieren
    shareLinkInput.select();
    document.execCommand("copy");
}

// Popup schließen, wenn auf den "Schließen"-Button geklickt wird
closePopupButton.addEventListener("click", () => {
    sharePopup.classList.add("hidden");
});

// Funktion zum Rendern der Packs nach Filter (Suchbegriff oder Tag)
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
                            <button class="copy-btn" data-link="${shareLink}">🔗 Copy Link</button>
                        </div>
                    </div>
                </div>
            `;
            packContainer.appendChild(packElement);
        });

    // Eventlistener für die Copy-Buttons hinzufügen
    document.querySelectorAll(".copy-btn").forEach(button => {
        button.addEventListener("click", () => {
            const link = button.getAttribute("data-link");
            showSharePopup(link); // Link anzeigen und kopieren
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
        renderPacks("", tabText);
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
    });
});

// Packs initial rendern
renderPacks();
