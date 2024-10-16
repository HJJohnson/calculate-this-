const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Serve static files (images and sounds) from the /assets folder
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// this is our calculator logic boom!!
app.get('/calculate', (req, res) => {
    const { expression } = req.query; 

    try {
        const result = eval(expression); 
        const lastDigit = result.toString().slice(-1); 
        res.json({ result, lastDigit });
    } catch (error) {
        res.status(400).json({ error: 'Invalid calculation' });
    }
});


app.get('/meme', (req, res) => {
    const { digit } = req.query;

    
    const memes = {
        '0': { image: '/assets/images/meme0.png', sound: '/assets/sounds/meme0.mp3' },
        '1': { image: '/assets/images/meme1.png', sound: '/assets/sounds/meme1.mp3' },
        '2': { image: '/assets/images/meme2.png', sound: '/assets/sounds/meme2.mp3' },
        '3': { image: '/assets/images/meme3.png', sound: '/assets/sounds/meme3.mp3' },
        '4': { image: '/assets/images/meme4.png', sound: '/assets/sounds/meme4.mp3' },
        '5': { image: '/assets/images/meme5.png', sound: '/assets/sounds/meme5.mp3' },
        '6': { image: '/assets/images/meme6.png', sound: '/assets/sounds/meme6.mp3' },
        '7': { image: '/assets/images/meme7.png', sound: '/assets/sounds/meme7.mp3' },
        '8': { image: '/assets/images/meme8.png', sound: '/assets/sounds/meme8.mp3' },
        '9': { image: '/assets/images/meme9.png', sound: '/assets/sounds/meme9.mp3' },
    };

    const meme = memes[digit] || memes['0']; 
    res.json(meme);
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});