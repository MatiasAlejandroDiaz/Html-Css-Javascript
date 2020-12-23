//      UTILIDADES CON MATRIZES     //
//      AUTOR : MATIAS DIAZ         //
//      Version: 1.0                //

// VARIABLES //
const string1TextArea = document.getElementById("string-input1");
const string2TextArea = document.getElementById("string-input2");

const botonActualizar = document.getElementById("boton-asignar");

const stringContarLM = document.getElementById("string-contar-lM");
const stringContarLNM = document.getElementById("string-contar-lNM");
const stringContarP = document.getElementById("string-contar-p");
const stringContarS = document.getElementById("string-contar-S");
const stringEliminarS = document.getElementById("string-eliminar-s");
const stringMostrarP = document.getElementById("string-mostrar-p");
const stringPM = document.getElementById("string-a-m");

let string1;
let string2;


// EVENTOS //
botonActualizar.addEventListener("click",
    () => {
    
        string1 = string1TextArea.value;
        string2 = string2TextArea.value;

        stringContarLM.textContent = stringContarLetraSensitivo(string1);
        stringContarLNM.textContent = stringContarLetraNoSensitivo(string1);
        stringContarP.textContent = CantidadDePalabras(string1).toString();
        stringContarS.textContent = CantidadDeAparacionesDeString2(string1,string2);
        stringMostrarP.textContent = MostrarPalabras(string1);
        stringEliminarS.textContent = EliminarCaracteresDeString2AlString1(string1,string2);
        stringPM.textContent = PrimeraLetrasAMayuscula(string1);
    
    }
);

// Clases //
let Palabra = class {
    constructor(indexMin) {
        this.indexMinimo = indexMin;
        this.indexMaximo = -1;
    }

    get IndexMinimo() {
        return this.indexMinimo;
    }

    get IndexMaximo() {
        return this.indexMaximo;
    }

    set IndexMaximo(value) {
        if (this.IndexMinimo > value)
            return;

        this.indexMaximo = value;
    }
}

// Funciones Strings //

/*
====== Funcion =========

Nombre: stringsSonIguales.
Descripcion: Funcion que compara dos strings para comprobar si son identicos.

====== Parametros ======

<str1>
Tipo=String
<str2>
Tipo=String

====== Resultado =======

<True>,<False>
Tipo = Boolean

====== Observaciones ===

La funcion Diferencia Mayusculas y minusculas.

*/

function stringsSonIguales(str1 = String, str2 = String) {

    let index = 0;

    if (str1 == undefined || str2 == undefined)
        return false;

    if (str1.length != str2.length || str1.length < 1)
        return false;

    do {
        if (str1[index] != str2[index])
            return false;
    }
    while (++index < str1.length)

    return true;
}

/*
====== Funcion =========

Nombre: stringContarLetraNoSensitivo.
Descripcion: Funcion que Cuenta la cantidad de letras que aparecen en un string y Muestra el resultado.

====== Parametros ======

<str1>
Tipo=String

====== Resultado =======

<stringRes>
Tipo = String

====== Observaciones ===

La funcion No Diferencia Mayusculas y minusculas.

*/

function stringContarLetraNoSensitivo(str1 = String) {

    let letras = {};
    let stringRes = ` `;
    let str = str1.toUpperCase();

    if(str1.length < 1)
    {
        return "[Ø]";
    }

    for (let i = 0; i < str.length; i++) {

        if (letras[str[i].toString()] == undefined)
            letras[str[i].toString()] = 1;
        else
            letras[str[i].toString()]++;

    }

    for (var letra in letras) {
        stringRes = stringRes + "\n" + letra + " = " + letras[letra];
    }

    return stringRes;
}

/*
====== Funcion =========

Nombre: stringContarLetraSensitivo.
Descripcion: Funcion que Cuenta la cantidad de letras que aparecen en un string y Muestra el resultado.

====== Parametros ======

<str1>
Tipo=String

====== Resultado =======

<stringRes>
Tipo = String

====== Observaciones ===

La funcion Diferencia Mayusculas y minusculas.

*/

function stringContarLetraSensitivo(str1 = String) {
    let letras = {};
    let stringRes = ` `;
    let str = str1;

    if(str1.length < 1)
    {
        return "[Ø]";
    }

    for (let i = 0; i < str.length; i++) {

        if (letras[str[i].toString()] == undefined)
            letras[str[i].toString()] = 1;
        else
            letras[str[i].toString()]++;

    }

    for (var letra in letras) {
        stringRes = stringRes + "\n" + letra + " = " + letras[letra];
    }

    return stringRes;
}

/*
====== Funcion =========

Nombre: obtenerPalabrasDeString.
Descripcion: Funcion que diferencia cada palabra que contiene una cadena.

====== Parametros ======

<str1>
Tipo=String

====== Resultado =======

<palabras>
Tipo = Array
Contenido = Palabra::Clase

====== Observaciones ===

Requiere la Clase Palabra.

*/

function obtenerPalabrasDeString(str1 = String) {

    let index = 0;
    let palabras = new Array();


    while (index < str1.length) {

        let pal = Palabra;

        while (str1[index] == ' ' && index < str1.length)
            index++;

        if (index < str1.length) {

            pal = new Palabra(index);

            while (str1[index] != ' ' && index < str1.length)
                index++;

            pal.IndexMaximo = (index - 1);
            palabras.push(pal);

        }

    }

    return palabras;
}

/*
====== Funcion =========

Nombre: CantidadDePalabras.
Descripcion: Funcion que cuenta la cantidad de palabras de un string.

====== Parametros ======

<str1>
Tipo=String

====== Resultado =======

<cantidad de palabras>
Tipo = int

====== Observaciones ===

Requiere la funcion obtenerPalabrasDeString y la Clase palabra.

*/

function CantidadDePalabras(str1=String)
{
    return obtenerPalabrasDeString(str1).length;
}

/*
====== Funcion =========

Nombre: MostrarPalabras.
Descripcion: Funcion que Muestra las palabras de un string.

====== Parametros ======

<str1>
Tipo=String

====== Resultado =======

<strPal>
Tipo = String
Descripcion = String Resultado.

====== Observaciones ===

Requiere la funcion obtenerPalabrasDeString y la Clase palabra.

*/

function MostrarPalabras(str1) {
    let palabras = obtenerPalabrasDeString(str1);
    let strPal = "\n { ";

    if(str1.length < 1)
    {
        return "[Ø]";
    }
    
    palabras.forEach(element => {
        strPal = strPal + "[ ";

        for (let i = element.IndexMinimo; i <= element.IndexMaximo; i++)
            strPal = strPal + escape(str1[i]);

        strPal = strPal + " ] ";
    });

    strPal = strPal + "}";
    return strPal;
}

/*
====== Funcion =========

Nombre: CantidadDeAparacionesDeString2.
Descripcion: Funcion que Cuenta la cantidad de veces que el string 2 aparece en el string 1.

====== Parametros ======

<str1>
Tipo=String
<str2>
Tipo=String

====== Resultado =======

<count>
Tipo = int

====== Observaciones ===


*/

function CantidadDeAparacionesDeString2(str1, str2) {

    let e = 0;
    let count = 0;

    for (let i = 0; i < str1.length; i++) {
        if (str1[i] == str2[e++]) {
            if (e >= str2.length) {
                count++;
                e = 0;
            }

        }
        else
            e = 0;

    }

    return count;

}

/*
====== Funcion =========

Nombre: EliminarCaracteresDeString2AlString1.
Descripcion: Funcion que elimina los caracteres del string 2 al string 1.

====== Parametros ======

<str1>
Tipo=String
<str2>
Tipo=String

====== Resultado =======

<strRes>
Tipo = String
Descripcion = String Resultado.

====== Observaciones ===


*/

function EliminarCaracteresDeString2AlString1(str1, str2) {

    let insertarChar = true;
    let e = 0;
    let strRes = "";

    for (let i = 0; i < str1.length; i++) 
    {
        insertarChar = true;
        e = 0;

        while(e < str2.length){
            
            if(str1[i] == str2[e])
            {
                insertarChar = false;
                e = str2.length;
            }

            e++;
        }

        if(insertarChar == true)
            strRes = strRes + str1[i];

    }

    return strRes;
}

/*
====== Funcion =========

Nombre: PrimeraLetrasAMayuscula.
Descripcion: Funcion que transforma la primera letra de cada palabra en mayuscula.

====== Parametros ======

<string1>
Tipo=String

====== Resultado =======

<strPal>
Tipo = String
Descripcion = String Resultado.

====== Observaciones ===

Requiere la funcion obtenerPalabrasDeString y la clase Palabra.

*/

function PrimeraLetrasAMayuscula(string1)
{
    let Palabras = obtenerPalabrasDeString(string1);
    let strPal = "";

    Palabras.forEach(element => {
        
        strPal = strPal + " " + string1[element.IndexMinimo].toUpperCase();

        for(let i = element.indexMinimo+1; i <= element.indexMaximo;i++)
            strPal = strPal + string1[i];
        
    });

    return strPal;
}