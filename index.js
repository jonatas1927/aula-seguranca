const fs = require('fs');
var CryptoJSsha1 = require("crypto-js/sha1");
const commandLineArgs = require('command-line-args')


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

switch (options.alg) {
    case 'sha1':
        const salt = new Date().toISOString()
        usuario.salt = salt;
        usuario.hash = CryptoJSsha1(options.pass, salt).toString();
        console.log(usuario)
        users.usuarios.push(usuario)
        break;
    default:
        break;
}

fs.writeFile('users.json', JSON.stringify(users), (error) => {
    if (error)
        console.log('deu erro meu parceiro')
})

