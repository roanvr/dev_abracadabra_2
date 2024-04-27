const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.listen(PORT, (req,res) => {
    console.log(`Iniciaste el servidor en el puerto http://localhost:${PORT}`)
})

app.use(express.static('public'));

const users = ['Juan','Jocelyn','Astrid','Maria','Ignacia','Javier','Brian'];

app.get('/', (req,res) => {
    res.sendFile(__dirname+'/public/index.html')
})

app.get('/abracadabra/usuarios', (req,res) => {
    res.json(users)
});

app.get('/abracadabra/juego/:users', (req,res,next) => {
    const nombreUser = req.params.users.toLocaleLowerCase();
    const userReq = users.map(user => user.toLowerCase()).includes(nombreUser);
    userReq
    ? res.redirect('/')
    : res.sendFile(__dirname+'/public/assets/img/who.jpeg')
});

function numeroRandom() {
    return Math.floor(Math.random()*4)+1;
};

app.get('/abracadabra/conejo/:n', (req,res) => {
    const numParametro = parseInt(req.params.n);
    const numAleatorio = numeroRandom();
    if(numParametro===numAleatorio) {
        res.sendFile(__dirname+'/public/assets/img/conejito.jpg')
    } else {
        res.sendFile(__dirname+'/public/assets/img/voldemort.jpg')
    }
})

app.get('*', (req,res) => {
    res.send('<h1>Esta página no existe :/</h1>')
});
