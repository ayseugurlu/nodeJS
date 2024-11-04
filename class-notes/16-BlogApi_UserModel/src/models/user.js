'use strict'

const {Schema,model} = require('mongoose')

/*---------------------------*/
const crypto = require('node:crypto')



//parameters : 
const keyCode = 'xfdcj76567rftfdghkfjmvg' // secretKey 
const loopCount = 10_000 // number of loops
const charCount = 32 //write 32 for 64
const encType = 'sha512' // type of algorithm


const passwordEncrypte = (password) => {
    return crypto.pbkdf2Sync(password, keyCode, loopCount, charCount, encType ).toString('hex')
}


/*--------------------------------------*/
const UserSchema = new Schema({
    email:{
        type:String,
        trim:true,
        unique:true,
        required:true,
        // validate: (email) => {
        //     if(email.includes('@') && email.includes('.')){
        //     return true
        //     }else{
        //         return false
        //     }
        // }

        // validate: (email)=> (email.includes('@') && email.includes('.'))

        validate: [
            (email)=> (email.includes('@') && email.includes('.')),
            "Email type is incorrect"
        ]
    },
    password:{
        type:String,
        trim:true,
        required:true,
        /*-----------------------------------*/
        // set:(password) => {
        //     return 'custom password'
        // } 
        /*----------------------------------------------*/
        //!bu sekilde calismaz
        // set:(password) => {
        //    return passwordEncrypte(password)  
        // } ,//set runs before validate. bu yüzden validate calismaz 5 ten kücük olsa da

        // validate: (password)=> {
        //     if(password.length < 5)return false
        //     else true
        // }

        /*------------------------------------------------------*/
        // set: (password) => { // set runs before validate
        //     if (password.length < 5) {
        //         // throw new Error('Invalid Password!') // Syntax Error
        //         return 'InvalidPassword'

        //     } else {
        //         return passwordEncrypte(password)
        //     }

        // }, 
        // validate: (password) => {
        //     if (password === 'InvalidPassword') {
        //         return false
        //     } else {
        //         return true
        //     }
        // }

        /*-----------------------------------------*/
        //*yukardakinin daha kisasi
        set: (password) => (password.length > 5  ? passwordEncrypte(password) : 'InvalidPasssword' ),
        validate: (password) => password != 'InvalidPassword' 
    },
    userName:{
        type:String,
        trim:true,
        required:true

    },
    firstName:String,
    lastName:String,
   
},{
    collection:'users',
    timestamps:true
})


module.exports = model('User', UserSchema)