import { writeFile } from 'fs';

export function saveBase64Image(base64String, name_img) {
    // Remova o cabeçalho de codificação do base64
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');

    // Decodifique a string base64 para um buffer
    const buffer = Buffer.from(base64Data, 'base64');

    // Escreva o buffer em um arquivo
    writeFile("./public/storage/"+name_img, buffer, err => {
        if (err) {
            console.error('Erro ao salvar a imagem:', err);
        } else {
            console.log('Imagem salva com sucesso em: storage/');
        }
    });
}


export function uniqid(prefix = '', moreEntropy = false) {
    let microtime = new Date().getTime() / 1000;
    let timeArray = microtime.toString().split('.');

    let sec = parseInt(timeArray[0]);
    let usec = timeArray[1] || 0;

    let str = '';
    if (moreEntropy) {
        str = Math.random().toString(16).substr(2);
    }

    return prefix + sec.toString(16) + usec + str;
}