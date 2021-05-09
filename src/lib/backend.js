export async function getData() {
    // Instead of the file system,
    // fetch data from an external API endpoint
    const res = await fetch('..');
    return res.json();
}
