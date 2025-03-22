// api/downloads.js - Vercel Serverless Function
const fs = require("fs");
const path = require("path");

// Pfad zu JSON-Datei, die die Downloads speichert
const filePath = path.join(__dirname, "downloads.json");

module.exports = async (req, res) => {
    if (req.method === "POST") {
        const { packName } = req.body;
        
        // JSON-Datei lesen und aktualisieren
        let downloads = JSON.parse(fs.readFileSync(filePath, "utf8"));
        downloads[packName] = (downloads[packName] || 0) + 1;

        // Datei speichern
        fs.writeFileSync(filePath, JSON.stringify(downloads, null, 2));
        return res.status(200).json({ downloads: downloads[packName] });
    }

    // Bei GET Anfrage: Aktuelle Download-Zahlen zurückgeben
    const downloads = JSON.parse(fs.readFileSync(filePath, "utf8"));
    res.status(200).json(downloads);
};
