// Importiere Prisma Client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Die Hauptfunktion, die die Seed-Daten einfügt
async function main() { 
    // Füge einige Benutzer hinzu
    const user1 = await prisma.user.create({
        data: {
            name: 'Alice Smith',
            email: 'alice.smith@example.com',
            street: 'Eckernförder Straße',
            houseNumber: '11',
            postalCode: '24148',
            placeOfResidence: 'Kiel',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            name: 'Bob Johnson',
            email: 'bob.johnson@example.com',
            street: 'Kronshagener Weg',
            houseNumber: '7',
            postalCode: '24148',
            placeOfResidence: 'Kiel',
        },
    });

    const user3 = await prisma.user.create({
        data: {
            name: 'Charlie Brown',
            email: 'charlie.brown@example.com',
            street: 'Schützenwall',
            houseNumber: '19',
            postalCode: '24148',
            placeOfResidence: 'Kiel',        
        },
    });

    const user4 = await prisma.user.create({
        data: {
            name: 'Dave Williams',
            email: 'dave.williams@example.com',
            street: 'Ringstraße',
            houseNumber: '9',
            postalCode: '24148',
            placeOfResidence: 'Kiel',       
        },
    });

    const user5 = await prisma.user.create({
        data: {
            name: 'Eve Adams',
            email: 'eve.adams@example.com',
            street: 'Hopfenstraße',
            houseNumber: '72',
            postalCode: '24148',
            placeOfResidence: 'Kiel',       
        },
    });

    const user6 = await prisma.user.create({
        data: {
            name: 'Fiona White',
            email: 'fiona.white@example.com',
            street: 'Fockstraße',
            houseNumber: '64',
            postalCode: '24148',
            placeOfResidence: 'Kiel',        
        },
    });

    const user7 = await prisma.user.create({
        data: {
            name: 'George Martin',
            email: 'george.martin@example.com',
            street: 'Weberstraße',
            houseNumber: '4',
            postalCode: '24148',
            placeOfResidence: 'Kiel', 
        },
    });

    const user8 = await prisma.user.create({
        data: {
            name: 'Hannah Wilson',
            email: 'hannah.wilson@example.com',
            street: 'Werfststraße',
            houseNumber: '27',
            postalCode: '24148',
            placeOfResidence: 'Kiel',
        },
    });

    // Füge einige Kategorien hinzu
    const category1 = await prisma.category.create({
        data: {
            name: 'Renovierung',
        },
    });

    const category2 = await prisma.category.create({
        data: {
            name: 'Garten- und Landschaftsbau',
        },
    });

    const category3 = await prisma.category.create({
        data: {
            name: 'Reinigung',
        },
    });

    const category4 = await prisma.category.create({
        data: {
            name: 'Leitern, Lifte, Anhänger',
        },
    });

    // Füge einige Tools hinzu
    const tool1 = await prisma.tool.create({
        data: {
            name: 'Fliesenschneider',
            description: 'Der Fliesenschneider schneidet alle Mosaik-, Wand- und Bodenfliesen.',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Fliesenschneider-HighLine.jpg',
            categoryId: category1.id,
            ownerId: user1.id,
        },
    });

    const tool2 = await prisma.tool.create({
        data: {
            name: 'Tapeziertisch',
            description: 'Höhenverstellbarer Tapeziertisch.',
            photo: 'https://cdn.pixabay.com/photo/2013/07/06/10/01/wallpaper-143587_1280.jpg',
            categoryId: category1.id,
            ownerId: user1.id,
        },
    });

    const tool3 = await prisma.tool.create({
        data: {
            name: 'Handkreissäge',
            description: 'Handkreissäge für Schnitte in Holz und anderen Werkstoffen.',
            photo: 'https://cdn.pixabay.com/photo/2019/11/13/10/17/skilsaw-5166-4623181_1280.jpg',
            categoryId: category1.id,
            ownerId: user2.id,
        },
    });

    const tool4 = await prisma.tool.create({
        data: {
            name: 'Schlagbohrmaschine',
            description: 'Schlagbohrmaschine für Bohr- und Schraubarbeiten.',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Hilti_TE70ATC_Schlagbohrmaschine_Netzanschluss.jpg',
            categoryId: category1.id,
            ownerId: user2.id,
        },
    });

    const tool5 = await prisma.tool.create({
        data: {
            name: 'Heckenschere',
            description: 'Heckenschere für mittlere und mittelstarke Hecken.',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Makita_UH200DW_10.8V_Cordless_Hedge_Trimmer_%284887706398%29.jpg',
            categoryId: category2.id,
            ownerId: user3.id,
        },
    });

    const tool6 = await prisma.tool.create({
        data: {
            name: 'Rasenmäher',
            description: 'Rasenmäher mit Schnittbreite von 40 cm.',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Electric_lawn_mower_IMG_5496.JPG',
            categoryId: category2.id,
            ownerId: user3.id,
        },
    });

    const tool7 = await prisma.tool.create({
        data: {
            name: 'Schubkarre',
            description: 'Luftbereifte Schubkarre mit einem Fassungsvermögen von 85 l.',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Wheelbarrow_1.jpg',
            categoryId: category2.id,
            ownerId: user4.id,
        },
    });

    const tool8 = await prisma.tool.create({
        data: {
            name: 'Aufsitzrasenmäher',
            description: 'Aufsitzrasenmäher mit 80 cm Schnittbreite.',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Zitmaaier.JPG',
            categoryId: category2.id,
            ownerId: user4.id,
        },
    });

    const tool9 = await prisma.tool.create({
        data: {
            name: 'Hochdruckreiniger',
            description: 'Hochdruckreiniger stufenlos einstellbar.',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Kawasaki_Pressure_Washer_HPW_302.jpg',
            categoryId: category3.id,
            ownerId: user5.id,
        },
    });

    const tool10 = await prisma.tool.create({
        data: {
            name: 'Industriestaubsauger',
            description: 'Industriesauger zum Aufsaugen von Holz und Staub.',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Ruton_vacuum_cleaner_pic2.JPG',
            categoryId: category3.id,
            ownerId: user5.id,
        },
    });

    const tool11 = await prisma.tool.create({
        data: {
            name: 'Laubsauger',
            description: 'Laubsauger zum Sammeln von Laub.',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/LeafBlowerVac.jpg',
            categoryId: category3.id,
            ownerId: user6.id,
        },
    });

    const tool12 = await prisma.tool.create({
        data: {
            name: 'Kehrmaschine',
            description: 'Handbetriebene Kehrmaschine mit Doppelwalzen.',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Nilfisk_Park_Ranger_2150_street_sweeper_1.jpg',
            categoryId: category3.id,
            ownerId: user6.id,
        },
    });

    const tool13 = await prisma.tool.create({
        data: {
            name: 'Anhänger',
            description: 'Anhänger mit maximal 400 kg Nutzlast.',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Vehicle_-_Diergaarde_Blijdorp_-_Rotterdam_-_Service_trailer_-_with_bamboo.jpg',
            categoryId: category4.id,
            ownerId: user7.id,
        },
    });

    const tool14 = await prisma.tool.create({
        data: {
            name: 'Mehrzweckleiter',
            description: 'Leiter kann als Anlegeleiter, Schiebeleiter und Stehleiter eingesetzt werden.',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Leiter_ladder.jpg',
            categoryId: category4.id,
            ownerId: user7.id,
        },
    });

    const tool15 = await prisma.tool.create({
        data: {
            name: 'Gabelhubwagen',
            description: 'Gabelhubwagen für den Transport bis zu einem Gewicht von 2,5 Tonnen.',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Hubwagen.jpg',
            categoryId: category4.id,
            ownerId: user8.id,
        },
    });

    const tool16 = await prisma.tool.create({
        data: {
            name: 'Sackkarre',
            description: 'Luftbereifte Sackkarre für Lasten bis 200 kg.',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Hand-truck.jpg',
            categoryId: category4.id,
            ownerId: user8.id,
        },
    });

    // Füge einige Reservierungen hinzu
    const reservation1 = await prisma.reservation.create({
        data: {
            userId: user1.id,
            toolId: tool1.id,
            startDate: new Date(),
            endDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Eine Reservierung für 24 Stunden
            confirmed: true,
        },
    });

    const reservation2 = await prisma.reservation.create({
        data: {
            userId: user2.id,
            toolId: tool2.id,
            startDate: new Date(),
            endDate: new Date(Date.now() + 48 * 60 * 60 * 1000), // Eine Reservierung für 48 Stunden
            confirmed: true,
        },
    });

    // Füge einige Benachrichtigungen hinzu
    await prisma.notification.create({
        data: {
            userId: user1.id,
            reservationId: reservation1.id,
            type: 'Reservierung bestätigt',
            message: 'Ihre Reservierung für den Rasenmäher wurde bestätigt.',
            createdAt: new Date(),
        },
    });

    await prisma.notification.create({
        data: {
            userId: user2.id,
            reservationId: reservation2.id,
            type: 'Reservierung bestätigt',
            message: 'Ihre Reservierung für die Bohrmaschine wurde bestätigt.',
            createdAt: new Date(),
        },
    });

    // Füge einige Ausleihen hinzu
    await prisma.loan.create({
        data: {
            reservationId: reservation1.id,
            borrowDate: new Date(),
            returnDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Ausleihe für 24 Stunden
        },
    });

    await prisma.loan.create({
        data: {
            reservationId: reservation2.id,
            borrowDate: new Date(),
            returnDate: new Date(Date.now() + 48 * 60 * 60 * 1000), // Ausleihe für 48 Stunden
        },
    });

    // Füge einige Favoriten hinzu
    await prisma.favorite.create({
        data: {
            userId: user1.id,
            toolId: tool1.id,
        },
    });

    await prisma.favorite.create({
        data: {
            userId: user2.id,
            toolId: tool2.id,
        },
    });

    console.log('Seed-Daten erfolgreich eingefügt.');
}

// Hauptfunktion ausführen
main()
    .catch((error) => {
        console.error('Fehler beim Einfügen von Seed-Daten:', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
