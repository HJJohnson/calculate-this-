const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// SERVER IMAGE/SOUND STATIC FILES
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// THIS IS OUR CALCULATOR LOGIC!!! BOOM!!
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

// REQUEST AND RESPONSE FOR MEME/ SOUND
app.get('/meme', (req, res) => {
    const { digit } = req.query;

    
    const memes = {
        '0': { image: '/assets/images/meme05.png', sound: '/assets/sounds/black.mp3' },
        '1': { image: '/assets/images/meme16.jpeg', sound: '/assets/sounds/fuck.mp3' },
        '2': { image: '/assets/images/meme27.jpeg', sound: '/assets/sounds/monkey.mp3' },
        '3': { image: '/assets/images/meme38.webp', sound: '/assets/sounds/rickroll.mp3' },
        '4': { image: '/assets/images/meme49.jpeg', sound: '/assets/sounds/tit.mp3' },
        '5': { image: '/assets/images/meme05.png', sound: '/assets/sounds/black.mp3' },
        '6': { image: '/assets/images/meme16.jpeg', sound: '/assets/sounds/fuck.mp3' },
        '7': { image: '/assets/images/meme27.jpeg', sound: '/assets/sounds/monkey.mp3' },
        '8': { image: '/assets/images/meme38.webp', sound: '/assets/sounds/rickroll.mp3' },
        '9': { image: '/assets/images/meme49.jpeg', sound: '/assets/sounds/tit.mp3' },
    };

    const meme = memes[digit] || memes['0']; 
    res.json(meme);
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});