export default async function POST(request) {
    try {
        const { email, password } = await request.json();
        //TO DO validate email and password
    } catch (e) {
        console.log({ e });
    }
}