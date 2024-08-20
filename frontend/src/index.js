import express from 'express' 
import path from 'path'
const app = express();
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

app.use(express.static(path.join(__dirname, '../dist')));
// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
