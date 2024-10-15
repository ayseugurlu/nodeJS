'use strict'
/*
    OOP Classes
*/

//?Class Expression
/*
const PascalCaseName=class{
    ... 
} 
*/
//? Class Decleration (tercih edeceğimiz)
/*
class PascalCaseName{
    
    //propertyName // değer vermek zorunlu değil undefined
    propertyName='value'

    // method başına funciton yazılmaz
    methodName() {
        return ' this is method '
       
    }
}
// class dan bir obje üretiseniz ismi "instance" 
const NewInstance=new PascalCaseName() // yeni instance üretme
console.log(NewInstance);
console.log(NewInstance.methodName());
*/
//? CONSTRUCTOR
/*
class Car{
    
    isRunning=false
    // brand='noname'
    constructor(brand='noname',model,year=1900){
       this.brand=brand
       this.model=model
       this.year=year 
    }
    runEngine(){
        this.isRunning=true
        return this.isRunning
    }
}
const Opel =new Car('Opel','Corsa',2020)
console.log(Opel);
console.log(Opel.runEngine());

const Mercedes =new Car('Mersedes','E200',2023)
console.log(Mercedes);
console.log(Mercedes.runEngine());
*/
//? INHERITANCE=Miras Alma
// Başka bir class ın sahip oldukları herşeyi alıyor + kendi sahip oldukları
/*
class Vehicle{
    
    isActive=false
    seatCount=5
    hp
    constructor(vehicleType){ 
        this.vehicleType=vehicleType
    }
}

class Car extends Vehicle {
    
    isRunning=false   
    
    // brand='noname'
    constructor(brand='noname',model,year=1900,vehicleType){
       super(vehicleType) 
       this.brand=brand
       this.model=model
       this.year=year 
    }
    runEngine(){
        this.isRunning=true
        return this.isRunning
    }
}
const Mercedes =new Car('Mersedes','E200',2023,'Car')
// console.log(Mercedes);
// console.log(Mercedes.runEngine());
class Track extends Vehicle {
    
    isRunning=false
    maxCapacity
    // brand='noname'
    constructor(brand='noname',model,year=1900,vehicleType){
       super(vehicleType) 
       this.brand=brand
       this.model=model
       this.year=year 
    }
    runEngine(){
        this.isRunning=true
        return this.isRunning
    }
}
class Accessory extends Car{

    constructor(accessoryName,brand,model,year,vehicleType){
        super(brand,model,year,vehicleType)
        this.accessoryName=accessoryName
    }

}
const Seat=new Accessory('Leader','Auidi','Q8',2000,'Car')
console.log(Seat);
*/
//? POLYMORPHISM 
/*
// Override 
// Overload js desteklemez
class Vehicle{
    
    isActive=false
    seatCount=5
    hp
    constructor(vehicleType){ 
        this.vehicleType=vehicleType
    }
    getDetail(){
        console.log(' this detail about Vehicle');
    }
}
const newVehicle=new Vehicle('Bus')
console.log(newVehicle.getDetail());

class Car extends Vehicle {
    
    isRunning=false       
    // brand='noname'
    constructor(brand='noname',model,year=1900,vehicleType){
       super(vehicleType) 
       this.brand=brand
       this.model=model
       this.year=year 
    }
    runEngine(){
        this.isRunning=true
        return this.isRunning
    }
    // Overload
    getDetail(){ // parent class daki funksiyon override edildi
        console.log(' this detail about car');
    }
    getDetail(x){ // parent class daki funksiyon override edildi
        console.log(x);
    }
}
const Mercedes =new Car('Mersedes','E200',2023,'Car')
console.log(Mercedes.getDetail());
console.log(Mercedes.getDetail('test'));
*/

//?  access modifier
//? ENCAPSULATION
//? PUBLIC          Parent=YES, Child=YES, Instance=YES
//? #PRIVATE        Parent=YES, Chield=NO, Instance=NO
//? _PROTECTED      Parent=YES, Chield=YES, Instance=NO 
//! protected JS desteklemez 
/*
class Vehicle{

    publicProp='this is public property'
    #privateProp='this is PRIVATE property'
    _protectedProp='this is PROTECTED property'

    isActive=false
    seatCount=5
    hp
    constructor(vehicleType){ 
        this.vehicleType=vehicleType
    }
    getDetail(){
        console.log(this.publicProp);
        console.log(this.#privateProp);
        console.log(this._protectedProp);
    }
}
const newVehicle=new Vehicle('Bus')
console.log(newVehicle.getDetail());

class Car extends Vehicle {
    
    isRunning=false       
    // brand='noname'
    constructor(brand='noname',model,year=1900,vehicleType){
       super(vehicleType) 
       this.brand=brand
       this.model=model
       this.year=year 
    }
    runEngine(){
        this.isRunning=true
        return this.isRunning
    }
    getDetail(){
        console.log(this.publicProp);
        // console.log(this.#privateProp);
        console.log(this._protectedProp);
    }    
 
}
const Mercedes =new Car('Mersedes','E200',2023,'Car')
console.log(Mercedes.publicProp);
// console.log(Mercedes.#privateProp);
console.log(Mercedes._protectedProp);//! protected JS desteklemez  normalde bu satır hata vermeliydi
//! eğer bir propert / variable _ ile başlıyor ise yani protected ise ona dokunma
//! eğer bir değişken tamamen büyük harflerden oluşuyorsa CONST yani sabittir silme/değiştirme
*/
//? GETTER & SETTER methods
//? STATIC keyword class dan erişebilir instance dan erişilmez
class Car {
    
    isRunning=false
    #price=1000       
    constructor(brand='noname',model,year=1900){
       this.brand=brand
       this.model=model
       this.year=year 
    }
    runEngine(){
        this.isRunning=true
        return this.isRunning
    }
    // getPrice(){
    //     return this.#price
    // }
    get getPrice(){
        return this.#price
    }
    set setPrice(price){ 
        this.#price=price
        return this.#price
    }
    
    static staticProp='static deger'
    static staticMethod(){
        return 'this is static method'
    }

}
const Mercedes =new Car('Mersedes','E200',2023)
// console.log(Mercedes.getPrice());
// console.log(Mercedes.getPrice);
// //console.log(Mercedes.setPrice(2000));// get ve set ifadeli methodlar property gibi işlem görür
// console.log(Mercedes.setPrice=2000);

// console.log(Mercedes.staticProp);
console.log(Car.staticProp);
console.log(Car.staticMethod());