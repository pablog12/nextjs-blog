export async function getHealth() {
    // Instead of the file system,
    // fetch data from an external API endpoint
    const res = await fetch('http://localhost/api/v1/utils/health');
    return res.json();
}
