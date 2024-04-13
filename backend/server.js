// server.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Import cors

const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());
const storage = multer.diskStorage({
 destination: (req, file, cb) => {
    cb(null, 'uploads/');
 },
 filename: (req, file, cb) => {
    cb(null, file.originalname);
 }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
    const notes = req.body.notes;
    const imageName = req.file.filename;
    const location = req.body.location;
    const grade = req.body.grade;

    fs.readFile(path.join(__dirname, 'images.json'), 'utf8', (err, data) => {
        if (err) {
            console.error("Could not read the file.", err);
            return res.status(500).send("Unable to read the file.");
        }

        // Parse the JSON data
        const imagesData = JSON.parse(data);

        // Add the new image and its notes to the array
        imagesData.images.push({
            filename: imageName,
            notes: notes,
            location: location,
            grade: grade,
        });

        // Write the updated data back to the file
        fs.writeFile(path.join(__dirname, 'images.json'), JSON.stringify(imagesData), 'utf8', (err) => {
            if (err) {
                console.error("Could not write the file.", err);
                return res.status(500).send("Unable to write the file.");
            }

            // Send the response only once, after all operations are complete
            res.send('Image uploaded successfully');
        });
    });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/images', (req, res) => {
    const uploadsDir = path.join(__dirname, 'uploads');
    const imagesJsonPath = path.join(__dirname, 'images.json');

    fs.readFile(imagesJsonPath, 'utf8', (err, data) => {
        if (err) {
            console.error("Could not read the images.json file.", err);
            return res.status(500).send("Unable to read the images.json file.");
        }

        // Parse the JSON data
        const imagesData = JSON.parse(data);

        // Map the image filenames to their metadata, including notes and URLs
        const imagesWithNotesAndUrls = imagesData.images.map(image => ({
            filename: image.filename,
            notes: image.notes,
            location: image.location,
            grade: image.grade,
            url: `http://localhost:5000/uploads/${image.filename}` // Construct the URL to the image
        }));

        res.json(imagesWithNotesAndUrls);
    });
});

app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});