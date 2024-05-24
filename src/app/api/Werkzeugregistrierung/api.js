const express = require('express');
const multer = require('multer');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
const upload = multer({ dest: 'uploads/' });

// Route zum Abrufen von Kategorien
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Fehler beim Abrufen der Kategorien' });
    }
});

// Route zum Registrieren eines Werkzeugs
app.post('/api/tools', upload.single('photo'), async (req, res) => {
    try {
        const { name, description, categoryId, ownerId } = req.body;
        const photo = req.file ? req.file.filename : null;

        const tool = await prisma.tool.create({
            data: {
                name,
                description,
                photo,
                categoryId: parseInt(categoryId),
                ownerId: parseInt(ownerId),
            },
        });

        res.json(tool);
    } catch (error) {
        res.status(500).json({ error: 'Fehler beim Erstellen des Tools' });
    }
});

// Statische Dateien bereitstellen
app.use('/images', express.static(path.join(__dirname, 'uploads')));

// Server starten
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
