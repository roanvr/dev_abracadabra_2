const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.listen(PORT, (req,res) => {
    console.log(`Iniciaste el servidor en el puerto http://localhost:${PORT}`)
})

app.use(express.static('public'));

const users = ['Juan','Jocelyn','Astrid','María','Ignacia','Javier','Brian'];

app.get('/', (req,res) => {
    res.sendFile(__dirname+'/public/index.html')
})

app.get('/abracadabra/usuarios', (req,res) => {
    res.json(users)
});

app.use('/abracadabra/juego/:users', (req,res,next) => {
    const nombreUser = req.params.users;
    const userReq = users.includes(nombreUser);
    userReq
    ? res.redirect('/abracadabra/xxx')
    : res.redirect(__dirname+'/public/assets/img/who.jpeg')
});

function numeroRandom() {
    return Math.floor(Math.random()*8)+1;
};

app.get('/abracadabra/conejo/:n', (req,res) => {
    const numParametro = parseInt(req.params.n);
    const numAleatorio = numeroRandom();
    if(numParametro===numAleatorio) {
        res.redirect(__dirname+'/public/assets/img/conejito.jpg')
    } else {
        res.redirect(__dirname+'/public/assets/img/voldemort.jpg')
    }
})

app.get('*', (req,res) => {
    res.send('<h1>Esta página no existe :/</h1>')
});
