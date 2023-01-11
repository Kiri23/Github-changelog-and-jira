const parseChangelog = require('changelog-parser')

const parse = async (changelog) => {
    if (isPath(changelog)){
        return await parseChangelog(changelog)
    }else {
        return await parseChangelog({text: changelog})
    }
}

const getTicketNumber = (parsedChangelog, targetVersion) => {
    const features = getFeaturesForVersion(parsedChangelog, targetVersion)
    return {parsedTicketNumbers: parsedFeatures(features._), features}
}

// utils 
const getVersion = (parsedChangelog, targetVersion) =>{
    return parsedChangelog.versions.find((version) => version.version === targetVersion)
}

const getDate = (parsedChangelog, targetDate) =>{
    return parsedChangelog.versions.find((version) => version.date === targetDate)
}

const getFeaturesForVersion = (parsedChangelog, targetVersion) =>{
    return (parsedChangelog.versions.find((version) => version.version === targetVersion)).parsed
}

const parsedFeatures = (features) => {
    return features.map(filterOutTicketNumber).filter((ticketNumber) => ticketNumber)
}

const filterOutTicketNumber = (featureString) => {
    return usingRegex(featureString);
}

const usingRegex = (str) => {
    // Inicia y finaliza el patrón buscado
    const startPattern = "(";
    const endPattern = ")";

    // Grupo de captura para letras mayúsculas seguidas de un guión y números
    const captureGroup = "[A-Z]+-[0-9]+";

    const regex = startPattern + captureGroup + endPattern;

    const match = str.match(regex);
    return match && match[1]; 
}

const isPath = (string) => {
    return string[0] === "/" || string[0] === "."
}


/*
 quiero la ultima version
 y quiero el parsed
 cuando obtenga el parsed utilizare un regex expresion para extraer el numero del ticket

 El parsed objeto es un objeto de string, analizarias string una por una buscando (PROJECTNAME-NUMBER)
 Tambien pudiera contar cuantos features tiene una version y cuanto de esos features pudimos extraer el project number. 

 A los que no pudimos extraer project number se tiene que analizar mas a fondo 
    1. (usando github y leyendo el description del PR) ahy pudieran tener el numero
    2. leyendo el branch name
    3. Recuerda que lo que haremos es crear una lista de algoritmo para buscar ticket number. (Comit name, description PR, branch name)

Cuando tengas el project number, (si consigues todos los project number de los features, si no se tiene que notificar), creas un arreglo con los
ticket number. Ese arreglo luego se pasa a JIRA para que transactiones los ticket a done. 
*/
 



(async () => {
    const data = await parse("./CHANGELOG.md")
    const {parsedTicketNumbers, features} = getTicketNumber(data, "3.1.26")
    console.log(parsedTicketNumbers)
    console.log(parsedTicketNumbers.length)
    console.log(features._.length)
})();

module.exports = {getTicketNumber}
