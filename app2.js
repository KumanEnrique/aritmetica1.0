const contenedorOperaciones = document.getElementById('operaciones')
const formulario = document.getElementById('formu')
const btnEnviar = document.getElementById('repintar')

const cantidadOperandos = document.getElementById('operandos')
const inferior = document.getElementById('inferior')
const superior = document.getElementById('superior')
const operadores = ['+','-']
const longitudOperadores = operadores.length

//crear las formulas
class OPERACIONES {
    constructor(operandos,inferior,superior){
        this.operandos = operandos
        this.inferior = inferior
        this.superior = superior
        this.operadores = ['+','-']
        this.longitudOperadores = this.operadores.length
        this.actualizarLongitudOperadores();
    }
    cantidadOperandos(){
        const acumulados = []
        for(let i = 0;i < this.operandos;i++){
            const operando = Math.floor(Math.random()* this.superior ) + this.inferior
            acumulados.push(operando)
        }
        return acumulados
    }
    cantidadOperadores(){
        const acumulados = []
        for(let i = 0;i < this.operandos; i++){
            const operador = Math.floor(Math.random() * this.longitudOperadores )
            acumulados.push(operador)
        }
        return acumulados
    }
    conversorOperadores(){
        const acumulados = []
        const operadores = this.cantidadOperadores()
        // console.log(operadores );
        operadores.forEach((elemento)=>{
            acumulados.push(this.operadores[elemento] )
        })
        return acumulados
    }
    operacion(){
        const acumulados = []
        const operandos = this.cantidadOperandos()
        const operadores = this.conversorOperadores()
        operadores.forEach((value,index)=>{
            acumulados.push(operandos[index],value)
        })
        acumulados.pop()
        // console.log(acumulados,'23ee')
        return acumulados.join(' ')
    }
    set setoperadoresAcumulados(operador) {
        this.operadores.push(operador);
        this.actualizarLongitudOperadores(); // Actualizar la longitud al agregar un operador
    }

    actualizarLongitudOperadores() {
        this.longitudOperadores = this.operadores.length;
    }
}
const op = new OPERACIONES(2,1,10)
// console.log(op.operaci=on())
// op.setoperadoresAcumulados = '/'
// console.log(op.operacion())
// op.setoperadoresAcumulados = '*'
// console.log(op.operacion())

//pintar en DOM
class UI {
    constructor(){}
    dibujar(operandos,inferior,superior,e){
        // el parametro e es el estado del formularioo
        const fragment = document.createDocumentFragment()
        if (e){
            console.log('hi e',e.target)
            for(let i = 0;i < 18;i++){
                const operacion = new OPERACIONES(operandos,inferior,superior)
                if(e.target.children[3].children[0].checked){
                    operacion.setoperadoresAcumulados = '*'
                }
                if(e.target.children[4].children[0].checked){
                    operacion.setoperadoresAcumulados = '/'
                }

                const columna = this.crearEtiqueta('div',null,'col-sm-6 offset-sm-3 border border-primary mb-1 d-flex justify-content-between')
                const contenedorInterno = this.crearEtiqueta('div')
                const etiquetaH4 = this.crearEtiqueta('h4',operacion.operacion())
                contenedorInterno.appendChild(etiquetaH4)
                columna.appendChild(contenedorInterno)
                fragment.appendChild(columna)
            }
        }else{
            for(let i = 0;i < 18;i++){
                const operacion = new OPERACIONES(operandos,inferior,superior)
                const columna = this.crearEtiqueta('div',null,'col-sm-6 offset-sm-3 border border-primary mb-1 d-flex justify-content-between')
                const contenedorInterno = this.crearEtiqueta('div')
                const etiquetaH4 = this.crearEtiqueta('h4',operacion.operacion())
                contenedorInterno.appendChild(etiquetaH4)
                columna.appendChild(contenedorInterno)
                fragment.appendChild(columna)
            }
        }
        return fragment
    }
    leer(e){
        this.crearEtiqueta()
        console.log(e.target.innerText)
        console.log(eval(e.target.innerText) )
    }
    crearEtiqueta(etiqueta,texto = null,className = ''){
        const elementoHTML = document.createElement(etiqueta)
        elementoHTML.innerText = texto
        elementoHTML.className = className
        return elementoHTML
    }
    elementoResultado(e){
        const contenedor = this.crearEtiqueta('div')
            const elementoHijo = this.crearEtiqueta('h4',`= ${eval(e.target.innerText)}`)
            contenedor.appendChild(elementoHijo)
            e.target.appendChild(contenedor)
    }
}
const ui = new UI()

contenedorOperaciones.appendChild(ui.dibujar(Number(cantidadOperandos.value),Number(inferior.value),Number(superior.value) ) )
contenedorOperaciones.addEventListener('click',e =>{
    ui.leer(e)
    ui.elementoResultado(e)
})
formulario.addEventListener('submit',(e) =>{
    e.preventDefault()
    const operandos = Number(cantidadOperandos.value)
    const inf = Number(inferior.value)
    const sup = Number(superior.value)
    const oper = new OPERACIONES(operandos,inf,sup)
    if(e.target.children[3].children[0].checked){
        oper.setoperadoresAcumulados = '*'
    }
    if(e.target.children[4].children[0].checked){
        oper.setoperadoresAcumulados = '/'
    }
    contenedorOperaciones.innerHTML = ''
    contenedorOperaciones.appendChild(ui.dibujar(operandos,inf,sup,e) )
})