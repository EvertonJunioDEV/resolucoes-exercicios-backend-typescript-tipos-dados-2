const fs = require("fs")

const leitura = (): unknown =>{
    return JSON.parse(fs.readFileSync('./bd.json'))
}


const escrita = (dados: any): void =>{
    fs.writeFileSync('./bd.json', JSON.stringify(dados))
}

type Enderco = {
    cep: string,
    rua: string,
    complemento?: string,
    bairro: string,
    cidade: string
}

type Usuario = {
    nome: string,
    email: string,
    cpf: string,
    profissao?: string,
    enderco: Enderco | null,

}

const cadastrarUsuario = (dadosUsuario: Usuario): Usuario =>{
    const bd = leitura() as Usuario[]
    bd.push(dadosUsuario)
    escrita(bd)
    return dadosUsuario
}

const listarUsuarios = ():Usuario[] =>{
    return leitura() as Usuario[]
}

const detalharUsuario = (cpf: string):Usuario =>{
    const bd = leitura() as Usuario[]
    const usuarioEncontrado = bd.find((usuario)=>{
        return usuario.cpf === cpf	
    })

    if(!usuarioEncontrado)
        throw new Error("USUARIO NAO ENCONTRADO");

    return usuarioEncontrado
}
/*
cadastrarUsuario({
    nome: "ANAHUILA",
    email: "abcde",
    cpf: "33333333-33",
    enderco: {
        cep: "15515",
        rua: "151551",
        complemento: "151515",
        bairro: "165161",
        cidade: "156654"
    }

})*/

console.log(detalharUsuario("333333-33"));
