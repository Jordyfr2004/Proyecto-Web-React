import { Opciones } from './opciones'
import '../src/estilos/estilo_ini.css'
export function Inicio(){
    return <body>
        <header className="header">
            <div >
                <h1>Sistema de Gestion de Inventario de Equipos Informáticos</h1>
            </div>
        </header>
        {Opciones()}
    </body>
}
