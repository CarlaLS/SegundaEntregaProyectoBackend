
import fs from 'fs'

const firestoreKey =JSON.parse (fs.readFileSync("C:\Users\Carla\OneDrive\Escritorio\Curso Backend\SegundaEntregaProyectoFinal\DB\proyectobackendfirebase-firebase-adminsdk-4qy28-c45c668a90.json", 'utf8'));
const mongoConectionStr=JSON.parse (fs.readFileSync("", 'utf8'));


const config = {

    dbPath: './DB',
    firestore: firestoreKey,
    mongodb: mongoConectionStr,
    env: 'firebase',
}


export default config