//      UTILIDADES CON MATRIZES     //
//      AUTOR : MATIAS DIAZ         //
//      Version: 1.0                //

const CANTIDADDEELEMENTOSENMATRIZ = 10;
const ELEMENTOVALORMINIMO = 0;
const ELEMENTOVALORMAXIMO = 100;

// Elementos De La Pagina //
const BotonesQueGeneranArrays = document.querySelectorAll(".boton-generador");
const CANTIDADDEARRAYSENLAPAGINA = BotonesQueGeneranArrays.length;
const ComponentesDeLosArrays = document.querySelectorAll(".array-visor");
let arrays = new Array();
const BotonActualizar = document.getElementById("boton-actualizar");
const mostrarArraySD = document.getElementById("mostrar-array-SD");
const mostrarArrayDO = document.getElementById("mostrar-array-DO");
const mostrarArraySDO = document.getElementById("mostrar-array-SDO");
const mostarArrayUnion = document.getElementById("mostrar-array-Union");
const mostarArrayInt = document.getElementById("mostrar-array-Int");
const mostarArrayDif = document.getElementById("mostrar-array-Dif");
const mostarArrayDifSim = document.getElementById("mostrar-array-DifSim");

// Clases //

let ArrayContainer = class {
    constructor(visorDelArray = HTMLHeadingElement, inputDuplicado = Boolean) {
        this.array = new Array();
        this.aceptaDuplicados = inputDuplicado;
        this.visorDelArray = visorDelArray;
    }

    get AceptaDuplicados() {
        return this.aceptaDuplicados;
    }

    set AceptaDuplicados(value = Boolean) {
        this.aceptaDuplicados = value;
    }

    get Array() {
        return this.array;
    }

    GenerarArray() {
        this.array = CrearArray(this.aceptaDuplicados);
    }

    get Visor() {
        return this.visorDelArray;
    }

    ActualizarVisor() {
        this.visorDelArray.textContent = ArrayATexto(this.array);
    }
}

// MAIN //

if (CANTIDADDEELEMENTOSENMATRIZ < ComponentesDeLosArrays.length) {
    console.error("No Hay Suficientes array-visor en la pagina.");
    window.stop();
    throw "No Hay Suficientes array-visor en la pagina para contener los Arrays a Generar.";
}

for (let i = 0; i < CANTIDADDEARRAYSENLAPAGINA; i++) {
    let visor = document.getElementById("visor-" + (i + 1));
    let dupbool = BotonesQueGeneranArrays[i].nextElementSibling.nextElementSibling;
    let newindex = arrays.push(new ArrayContainer(visor, dupbool.checked));

    dupbool.addEventListener("click", () => { arrays[newindex - 1].AceptaDuplicados = dupbool.checked; });

    BotonesQueGeneranArrays[i].addEventListener("click", () => { arrays[newindex - 1].GenerarArray(); arrays[newindex - 1].ActualizarVisor(); });
}

BotonActualizar.addEventListener("click",
    () => {
        if (arrays[0].Array.length > 0) {
            mostrarArraySD.textContent = ArrayATexto(EliminarDuplicados(arrays[0].Array));
            mostrarArrayDO.textContent = ArrayATexto(OrdenarArrayAscendentemente(arrays[0].Array));
            mostrarArraySDO.textContent = ArrayATexto(EliminarDuplicadosYOrdenarlo(arrays[0].Array));
            if (arrays[1].Array.length > 0) {
                mostarArrayUnion.textContent = ArrayATexto(UnionDeArrays(arrays[0].Array, arrays[1].Array));
                mostarArrayInt.textContent = ArrayATexto(InterseccionDeArrays(arrays[0].Array, arrays[1].Array));
                mostarArrayDif.textContent = ArrayATexto(DiferenciaDeArrays(arrays[0].Array, arrays[1].Array));
                mostarArrayDifSim.textContent = ArrayATexto(DiferenciaSimetricaDeArrays(arrays[0].Array, arrays[1].Array));
            }
        }

    }
);


// Utilidades Para la Pagina //
function CrearArray(conDuplicados = Boolean) {

    let arr = new Array();

    for (let index = 0; index < CANTIDADDEELEMENTOSENMATRIZ; index++) {

        let number = getRandomInt(ELEMENTOVALORMINIMO, ELEMENTOVALORMAXIMO);

        // Sigue Mostrando Duplicados Por Ahi no es Error de esta funcion
        while (conDuplicados == false && EstaEnArray(number, arr) == true) {
            number = getRandomInt(ELEMENTOVALORMINIMO, ELEMENTOVALORMAXIMO);
        }

        arr.push(number);

    }

    return arr;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Arrays //

/*
====== Funcion =========

Nombre: EliminarDuplicados.
Descripcion: Funcion que borra los elementos duplicados de un array.

====== Parametros ======

<str1>
Tipo=Array

====== Resultado =======

<Arr>
Tipo = Array

====== Observaciones ===

El elemento dentro del array debe poder ser comparable.

*/

function EliminarDuplicados(array = Array) {
    let index = 0;
    let arr = new Array();

    if (array == undefined) {
        return undefined;
    }
    if (array.length < 2) {
        return arr;
    }

    for (index = 0; index < array.length; index++) {
        if (!EstaEnArray(array[index], arr)) {
            arr.push(array[index]);
        }
    }

    return arr;
}

/*
====== Funcion =========

Nombre: EliminarDuplicadosYOrdenarlo.
Descripcion: Funcion que borra los elementos duplicados de un array y lo ordena Ascendentemente.

====== Parametros ======

<array>
Tipo=Array

====== Resultado =======

<arr>
Tipo = Array

====== Observaciones ===

El elemento dentro del array debe poder ser comparable.
Requiere la funcion OrdenarArrayAscendentemente.

*/

function EliminarDuplicadosYOrdenarlo(array = Array) {
    let index = 0;
    let indexRep = 1;
    let arr = new Array();

    if (array == undefined) {
        return undefined;
    }
    if (array.length < 2) {
        return arr;
    }

    array = OrdenarArrayAscendentemente(array);

    while (index < array.length) {
        indexRep = index + 1;

        while (indexRep < array.length && array[index] == array[indexRep]) {
            indexRep++;
        }

        arr.push(array[index]);
        index = indexRep;

    }

    return arr;

}

/*
====== Funcion =========

Nombre: OrdenarArrayAscendentemente.
Descripcion: Funcion que ordena Ascendentemente un array.

====== Parametros ======

<array>
Tipo=Array

====== Resultado =======

<arr>
Tipo = Array

====== Observaciones ===

El array debe poder ser Ordenable.
El elemento dentro del array debe poder ser comparable.

*/

function OrdenarArrayAscendentemente(array = Array) {
    let indexRec = 0;
    let indexCom = 1;
    let arr = new Array();

    array.forEach(element=>{arr.push(element)});

    while (indexRec < arr.length - 1) {

        indexCom = indexRec + 1;

        while (indexCom < arr.length) {

            if (arr[indexRec] > arr[indexCom]) {
                let aux = arr[indexRec];
                arr[indexRec] = arr[indexCom];
                arr[indexCom] = aux;
            }

            indexCom++;
        }

        indexRec++;
    }

    return arr;
}

/*
====== Funcion =========

Nombre: EstaEnArray.
Descripcion: Funcion que comprueba si un valor esta contenido en un array.

====== Parametros ======

<value>
Tipo=valor
<array>
Tipo=Array

====== Resultado =======

<True , False>
Tipo = Boolean

====== Observaciones ===

El elemento dentro del array debe poder ser comparable.

*/

function EstaEnArray(value, array = Array) {
    let index = 0;

    if (array == undefined)
        return false;

    if (array.length < 1)
        return false;

    while (index < array.length) {
        if (array[index] == value) {
            return true;
        }

        index++;
    }

    return false;
}

/*
====== Funcion =========

Nombre: EstaEnParteDeArray.
Descripcion: Funcion que comprueba si un valor esta contenido en una parte del array.

====== Parametros ======

<value>
Tipo=valor
<minIndex>
Tipo=int
<maxIndex>
Tipo=int
<array>
Tipo=Array

====== Resultado =======

<True , False>
Tipo = Boolean

====== Observaciones ===

El elemento dentro del array debe poder ser comparable.

*/

function EstaEnParteDeArray(value, minIndex, maxIndex, array = Array) {
    let index = minIndex;
    
    if (array == undefined)
        return false;

    if (array.length < 1)
        return false;

    if (minIndex < 0 || minIndex >= array.length || minIndex > maxIndex) {
        console.error("Valor Incorrecto De Min Index, Es el index minimo a buscar en el array el valor.");
    }

    if (maxIndex < 0 || maxIndex >= array.length || maxIndex < minIndex) {
        console.error("Valor Incorrecto De Max Index, Es el index Maximo a buscar en el array el valor.");
    }

    while (index <= maxIndex)
        if (array[++index] == value)
            return true;

    return false;

}

/*
====== Funcion =========

Nombre: UnionDeArrays.
Descripcion: Funcion que une dos arrays en uno solo.

====== Parametros ======

<array1>
Tipo=Array
<array2>
Tipo=Array

====== Resultado =======

<arrRes>
Tipo = Array

====== Observaciones ===

*/

function UnionDeArrays(array1 = Array, array2 = Array) {
    let arrRes = new Array();

    if (array1 == undefined || array2 == undefined)
    {
        return undefined;
    }

    if (array1.length < 1)
    {
        array2.forEach(element=>{arrRes.push(element)});
        return arrRes;
    }

    array1.forEach(element=>{arrRes.push(element)});

    if(array2.length < 1)
    {
        return arrRes;    
    }

    for (let index = 0; index < array2.length; index++) {
        arrRes.push(array2[index]);
    }

    return arrRes;
}

/*
====== Funcion =========

Nombre: InterseccionDeArrays.
Descripcion: Funcion que retorna los elementos que se encuentren en los dos arrays simultaneamente.

====== Parametros ======

<array1>
Tipo=Array
<array2>
Tipo=Array

====== Resultado =======

<arrRes>
Tipo = Array

====== Observaciones ===

Requiere las funcion OrdenarArrayAscendentemente.
*/

function InterseccionDeArrays(array1 = Array, array2 = Array) {
    let index1 = 0;
    let index2 = 0;
    let arrayRes = new Array();

    if (array1 == undefined || array2 == undefined)
    {
        return undefined;
    }
    
    if (array1.length < 1 || array2.length < 1)
    {
        return undefined;
    }

    let array1Aux = OrdenarArrayAscendentemente(array1);
    let array2Aux = OrdenarArrayAscendentemente(array2);

    while (index1 < array1Aux.length && index2 < array2Aux.length) {
        if (array1Aux[index1] == array2Aux[index2]) {
            arrayRes.push(array1Aux[index1]);
            index1++;
            index2++;
        }
        else if (array1Aux[index1] < array2Aux[index2]) {
            index1++;
        }
        else {
            index2++;
        }
    }

    return arrayRes;
}

/*
====== Funcion =========

Nombre: DiferenciaDeArrays.
Descripcion: Funcion que retorna los elementos que no se encuentren en los dos arrays simultaneamente.

====== Parametros ======

<array1>
Tipo=Array
<array2>
Tipo=Array

====== Resultado =======

<arrayRes>
Tipo = Array

====== Observaciones ===

Requiere las funcion EstaEnArray.
*/

function DiferenciaDeArrays(array1 = Array, array2 = Array) {
    let arrayRes = new Array();

    if (array1 == undefined || array2 == undefined)
    {
        return undefined;
    }

    for (let i = 0; i < array1.length; i++) {
        if (!EstaEnArray(array1[i], array2)) {
            arrayRes.push(array1[i]);
        }
    }

    return arrayRes;
}

/*
====== Funcion =========

Nombre: DiferenciaSimetricaDeArrays.
Descripcion: Funcion que retorna los elementos no comunes en ambos arrays.

====== Parametros ======

<array1>
Tipo=Array
<array2>
Tipo=Array

====== Resultado =======

<array>
Tipo = Array

====== Observaciones ===

Requiere las funciones UnionDeArrays y InterseccionDeArrays.
*/

function DiferenciaSimetricaDeArrays(array1 = Array, array2 = Array) {
    
    if (array1 == undefined || array2 == undefined)
    {
        return undefined;
    }

    return DiferenciaDeArrays(UnionDeArrays(array1, array2), InterseccionDeArrays(array1, array2));
}

/*
====== Funcion =========

Nombre: ArrayATexto.
Descripcion: Funcion que Muestra el contenido de un array.

====== Parametros ======

<array>
Tipo=Array

====== Resultado =======

<txt>
Tipo = Array

====== Observaciones ===

*/
function ArrayATexto(array = Array) {

    let txt = "[ ";

    if(array.length < 1)
    {
        return "[Ø]";
    }

    array.forEach(element => {
        txt = txt.concat(element.toString() + ", ");
    }
    );

    txt = txt.substring(0, txt.lastIndexOf(",")) + " ]";

    return txt;
}