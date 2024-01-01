const fs = require('fs/promises');
const path = require('path');


function getFilesInDirectory() {
    console.log("\nFiles present in directory:");
    let files = fs.readdirSync(__dirname);
    files.forEach(file => {
        console.log(file);
    });
}
async function deleteImage(filename) {
    // getFilesInDirectory();
    try {
        // console.log(__dirname, __dirname + filename)
        const filePath = path.join(__dirname + filename);

        // Check if the file exists before attempting to delete
        await fs.access(filePath);

        // Delete the file
        await fs.unlink(filePath);

        console.log(`File ${filename} deleted successfully.`);
    } catch (error) {
        // Handle errors, log, or throw as needed
        if (error.code === 'ENOENT') {
            console.error(`File ${filename} not found.`);
        } else {
            console.error(`Error deleting file ${filename}:`, error);
        }
    }
}

module.exports = deleteImage;
