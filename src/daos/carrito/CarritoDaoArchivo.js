
import ContenedorArchivo from "../../classes/ContenedorArchivo"

class CarritoDaoArchivo extends ContenedorArchivo {

    constructor(archivo) {
        super(`DB/${this.archivo}.json`)
    }
}

export default CarritoDaoArchivo