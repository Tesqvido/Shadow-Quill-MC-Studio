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
// Funktion zum Erstellen der Pack-Elemente und Rendern der Packs
// Event-Listener für den Share-Button
packElement.querySelector(".share-btn").addEventListener("click", (e) => {
    e.preventDefault();  // Verhindern, dass der Link im Browser geöffnet wird
    const link = e.target.dataset.shareLink;  // Hole den Link aus dem Data-Attribut
    
    // Link in die Zwischenablage kopieren
    navigator.clipboard.writeText(link).then(() => {
        console.log('Link copied to clipboard');  // Überprüfen, ob das Kopieren funktioniert
        
        // Überprüfen, ob der Browser Benachrichtigungen unterstützt
        if ("Notification" in window) {
            // Überprüfen, ob der Benutzer Benachrichtigungen erlaubt hat
            if (Notification.permission === "granted") {
                // Eine Benachrichtigung anzeigen
                new Notification("Link copied!", {
                    body: "Der Link wurde erfolgreich in die Zwischenablage kopiert.",
                    icon: "/path/to/icon.png", // Optional: Füge ein Symbol hinzu
                });
            } else if (Notification.permission !== "denied") {
                // Wenn die Berechtigung noch nicht erteilt wurde, frage nach
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        // Benachrichtigung anzeigen
                        new Notification("Link copied!", {
                            body: "Der Link wurde erfolgreich in die Zwischenablage kopiert.",
                            icon: "/path/to/icon.png", // Optional: Füge ein Symbol hinzu
                        });
                    }
                });
            }
        }
    }).catch((err) => {
        console.error('Fehler beim Kopieren des Links: ', err);  // Fehlerbehandlung für das Kopieren
    });
});

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
