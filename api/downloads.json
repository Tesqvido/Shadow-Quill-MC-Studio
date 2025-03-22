async function updateGlobalDownloads(packName, index) {
    try {
        const response = await fetch("/api/downloads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ packName })
        });
        const data = await response.json();
        document.getElementById(`downloads-${index}`).innerText = data.downloads;
    } catch (error) {
        console.error("Error updating downloads:", error);
    }
}

// Download-Button anpassen
document.querySelectorAll(".download-btn").forEach(button => {
    button.addEventListener("click", () => {
        const index = button.getAttribute("data-index");
        const packName = packs[index].name;

        updateGlobalDownloads(packName, index);
    });
});
