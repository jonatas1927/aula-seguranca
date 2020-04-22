const fs = require('fs');
var CryptoJSsha1 = require("crypto-js/sha1");
const commandLineArgs = require('command-line-args')
const bcrypt = require('bcrypt');


const optionDefinitions = [
    { name: 'alg', type: String, alias: "a", },
    { name: 'user', type: String, alias: "u", },
    { name: 'pass', type: String, alias: "p", },
]
const options = commandLineArgs(optionDefinitions)

console.log(options)

let users = { usuarios: [] };

if (fs.existsSync('users.json')) {
    let rawdata = fs.readFileSync('users.json');
    users = JSON.parse(rawdata);
}

var usuario = { usuario: options.user, alg: options.alg };

const escreveJson = function () {
    fs.writeFile('users.json', JSON.stringify(users), (error) => {
        if (error)
            console.log('deu erro meu parceiro')
    })
}


switch (options.alg) {
    case 'sha1':
        const salt = new Date().toISOString()
        usuario.salt = salt;
        usuario.hash = CryptoJSsha1(options.pass, salt).toString();
        console.log(usuario)
        users.usuarios.push(usuario)
        escreveJson()
        break;
    case 'bcrypt':
        const saltRounds = 15;
        for (let i = 0; i < 1; i++) {
            let usuario = { usuario: options.user, alg: options.alg };

            let tInicial = new Date()
            let salt = bcrypt.genSaltSync(saltRounds);
            let hash = bcrypt.hashSync(options.pass, salt);
            usuario.salt = salt;
            usuario.hash = hash
            usuario.rodadas = saltRounds
            let tFinal = new Date()
            usuario.tempo = (tFinal - tInicial) / 1000
            users.usuarios.push(usuario)
        }
        escreveJson()
        break;
    default:
        break;
}

