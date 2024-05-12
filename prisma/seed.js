// Importiere Prisma Client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Die Hauptfunktion, die die Seed-Daten einfügt
async function main() { 
    // Füge einige Benutzer hinzu
    const user1 = await prisma.userdata.create({
        data: {
            first_name: 'Alice',
            last_name: 'Smith',
            street: 'Eckernförder Straße',
            house_number: '11',
            postal_code: '24148',
            place_of_residence: 'Kiel',
            isAdmin: false,
        },
    });

    const user2 = await prisma.userdata.create({
        data: {
            first_name: 'Bob',
            last_name: 'Johnson',
            street: 'Kronshagener Weg',
            house_number: '7',
            postal_code: '24148',
            place_of_residence: 'Kiel',
            isAdmin: false,
        },
    });

    const user3 = await prisma.userdata.create({
        data: {
            first_name: 'Charlie',
            last_name: 'Brown',
            street: 'Schützenwall',
            house_number: '19',
            postal_code: '24148',
            place_of_residence: 'Kiel',
            isAdmin: false,
        },
    });

    const user4 = await prisma.userdata.create({
        data: {
            first_name: 'Dave',
            last_name: 'Williams',
            street: 'Ringstraße',
            house_number: '9',
            postal_code: '24148',
            place_of_residence: 'Kiel',
            isAdmin: false,
        },
    });

    const user5 = await prisma.userdata.create({
        data: {
            first_name: 'Eve',
            last_name: 'Adams',
            street: 'Hopfenstraße',
            house_number: '72',
            postal_code: '24148',
            place_of_residence: 'Kiel',
            isAdmin: false,
        },
    });

    const user6 = await prisma.userdata.create({
        data: {
            first_name: 'Fiona',
            last_name: 'White',
            street: 'Fockstraße',
            house_number: '64',
            postal_code: '24148',
            place_of_residence: 'Kiel',
            isAdmin: false,
        },
    });

    const user7 = await prisma.userdata.create({
        data: {
            first_name: 'George',
            last_name: 'Martin',
            street: 'Weberstraße',
            house_number: '4',
            postal_code: '24148',
            place_of_residence: 'Kiel',
            isAdmin: false,
        },
    });

    const user8 = await prisma.userdata.create({
        data: {
            first_name: 'Hannah',
            last_name: 'Wilson',
            street: 'Werfststraße',
            house_number: '27',
            postal_code: '24148',
            place_of_residence: 'Kiel',
            isAdmin: false,
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
            photo: 'fliesenschneider.jpg',
            categoryId: category1.id,
            ownerId: user1.id,
        },
    });

    const tool2 = await prisma.tool.create({
        data: {
            name: 'Tapeziertisch',
            description: 'Höhenverstellbarer Tapeziertisch.',
            photo: 'tapeziertisch.jpg',
            categoryId: category1.id,
            ownerId: user1.id,
        },
    });

    const tool3 = await prisma.tool.create({
        data: {
            name: 'Handkreissäge',
            description: 'Handkreissäge für Schnitte in Holz und anderen Werkstoffen.',
            photo: 'handkreissäge.jpg',
            categoryId: category1.id,
            ownerId: user2.id,
        },
    });

    const tool4 = await prisma.tool.create({
        data: {
            name: 'Schlagbohrmaschine',
            description: 'Schlagbohrmaschine für Bohr- und Schraubarbeiten.',
            photo: 'schlagbohrmaschine.jpg',
            categoryId: category1.id,
            ownerId: user2.id,
        },
    });

    const tool5 = await prisma.tool.create({
        data: {
            name: 'Heckenschere',
            description: 'Heckenschere für mittlere und mittelstarke Hecken.',
            photo: 'heckenschere.jpg',
            categoryId: category2.id,
            ownerId: user3.id,
        },
    });

    const tool6 = await prisma.tool.create({
        data: {
            name: 'Rasenmäher',
            description: 'Rasenmäher mit Schnittbreite von 40 cm.',
            photo: 'rasenmäher.jpg',
            categoryId: category2.id,
            ownerId: user3.id,
        },
    });

    const tool7 = await prisma.tool.create({
        data: {
            name: 'Häcksler',
            description: 'Häcksler bis 3 cm Aststärke.',
            photo: 'häcksler.jpg',
            categoryId: category2.id,
            ownerId: user4.id,
        },
    });

    const tool8 = await prisma.tool.create({
        data: {
            name: 'Gartenfräse',
            description: 'Gartenfräse zum Aufarbeiten von leichten Böden.',
            photo: 'gartenfräse.jpg',
            categoryId: category2.id,
            ownerId: user4.id,
        },
    });

    const tool9 = await prisma.tool.create({
        data: {
            name: 'Hochdruckreiniger',
            description: 'Hochdruckreiniger stufenlos einstellbar.',
            photo: 'hochdruckreiniger.jpg',
            categoryId: category3.id,
            ownerId: user5.id,
        },
    });

    const tool10 = await prisma.tool.create({
        data: {
            name: 'Industriestaubsauger',
            description: 'Industriesauger zum Aufsaugen von Holz und Staub.',
            photo: 'industriestaubsauger.jpg',
            categoryId: category3.id,
            ownerId: user5.id,
        },
    });

    const tool11 = await prisma.tool.create({
        data: {
            name: 'Laubsauger',
            description: 'Laubsauger zum Sammeln von Laub.',
            photo: 'laubsauger.jpg',
            categoryId: category3.id,
            ownerId: user6.id,
        },
    });

    const tool12 = await prisma.tool.create({
        data: {
            name: 'Kehrmaschine',
            description: 'Handbetriebene Kehrmaschine mit Doppelwalzen.',
            photo: 'kehrmaschine.jpg',
            categoryId: category3.id,
            ownerId: user6.id,
        },
    });

    const tool13 = await prisma.tool.create({
        data: {
            name: 'Anhänger',
            description: 'Anhänger mit maximal 400 kg Nutzlast.',
            photo: 'anhänger.jpg',
            categoryId: category4.id,
            ownerId: user7.id,
        },
    });

    const tool14 = await prisma.tool.create({
        data: {
            name: 'Mehrzweckleiter',
            description: 'Leiter kann als Anlegeleiter, Schiebeleiter und Stehleiter eingesetzt werden.',
            photo: 'mehrzweckleiter.jpg',
            categoryId: category4.id,
            ownerId: user7.id,
        },
    });

    const tool15 = await prisma.tool.create({
        data: {
            name: 'Gabelhubwagen',
            description: 'Gabelhubwagen für den Transport bis zu einem Gewicht von 2,5 Tonnen.',
            photo: 'gabelhubwagen.jpg',
            categoryId: category4.id,
            ownerId: user8.id,
        },
    });

    const tool16 = await prisma.tool.create({
        data: {
            name: 'Sackkarre',
            description: 'Luftbereifte Sackkarre für Lasten bis 200 kg.',
            photo: 'sackkarre.jpg',
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