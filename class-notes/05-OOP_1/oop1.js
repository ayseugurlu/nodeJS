'use strict'

/*
    OOP
        */


    /*

//obje isimlendirmede pascalCase /camelCase
const sampleObject = {
    // property/ attribute / field

    propertyName : 'value',
    propertyArray : [],
    propertyObject : {},

    //function = method
    methodName: function(){
        return 'this is method'
    },
    // or

    methodName2 () {
        return 'this is method'
    }
}

//obje property cagirma

console.log(sampleObject.propertyName);
console.log(sampleObject.methodName());

// example object

const Car = {
    brand: 'Toyota',
    model: 'Camry',
    year: 2020,
    isAutoGear: true,
    colors: ['Blue', 'Black'],
    engine:{
        cylinderCount:5,
        hp:100,
        
    },
    startEngine: function(){
        return 'engine started'
    },
    stopEngine: function(){
        return 'engine stopped'
    }

}

// . (dot) notation
console.log(Car.brand);
console.log(Car.colors[0]);
console.log(Car.colors);
console.log(Car.engine);
console.log(Car.engine.hp);
console.log(Car.startEngine());

//alternative

console.log(Car['brand']);
console.log(Car['colors'][0]);
console.log(Car['stopEngine']());

*/

//! This keyword

//icinde bulundugu objeyi ifade eder

const Car = {
    brand: 'Toyota',
    model: 'Camry',
    year: 2020,
    isAutoGear: true,
    colors: ['Blue', 'Black'],
    engine:{
        cylinderCount:5,
        hp:100,
        
    },
    startEngine: function(){
        return 'engine started'
    },
    stopEngine: function(){
        return 'engine stopped'
    },
    detailFunction: function(){
        return this.brand;
    },
    //! arrow functions global scope tur. this burada kullanilmaz.
    arrowMethod: () => {
        return this
    }

}

// console.log(Car.detailFunction());
// console.log(Car.arrowMethod());

//? Array Destructuring

const sampleArray = ['val1','val2','val3','val4','var5'];

/*
const v1=sampleArray[0]
const v2=sampleArray[1]
const v3=sampleArray[2]
const v4=sampleArray.slice(2,3)

console.log(v4);

*/



const [v1,v2,...vOthers] = sampleArray

// rest operator esitligin solunda olacak

console.log(vOthers);

//spread operator esitligin saginda olacak

const newArray = ['valx',...sampleArray,'valy']

console.log(newArray);

//? Obje Destructing

//^ rest

// const {brand,year,model, ...others} = Car

// console.log(year,brand,model,others);

// console.log('****************');

// console.log(Car);


// const {year,brand:marka,model, ...others} = Car

// console.log(year,marka,model,others);

// const newCar = {
//     ...Car,
//     oiltype:'gas',

// }

// console.log(newCar);

//? Object to json

const jsonCar = JSON.stringify(Car)

console.log(jsonCar);
console.log(typeof jsonCar);
console.log(typeof Car);



//? json to Object 

const objCar = JSON.parse(jsonCar)

console.log(objCar);

//obj to Array

const arrayKeys = Object.keys(Car)
console.log(arrayKeys);

const arrayValues = Object.values(Car)
console.log(arrayValues);

const arrayAll = Object.entries(Car)
console.log(arrayAll);


//Construction

const constructionFunction = function(){
    this.property = 'value'
}

const carConstruction = function (brand,model,year,){
    this.brand = brand,
    this.model = model,
    this.year = year,
    this.startEngine = function(param){
        return (`${param} started`)
    }
}

// new keyword
const newCar1 = new carConstruction('Volkswagen', 'passat',2024)

console.log(newCar1);  

console.log(newCar1.startEngine('Tesla'))

const newCar2 = new carConstruction('Audi', 'A4', 2023)

console.log(newCar2.startEngine('Alfaromeo'));

console.log(typeof carConstruction);





