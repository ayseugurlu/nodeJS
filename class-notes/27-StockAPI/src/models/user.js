"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
const passwordEncrypt = require("../helpers/passwordEncrypt");
/* ------------------------------------------------------- */

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    isStaff: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

/*--------------------------------------------*/

userSchema.pre(["save", "updateOne"], function (next) {
  //database e kaydetmeden hemen önce calisir

  // console.log("Pre-save run !");

  const data = this?._update ?? this; //database e kaydedilecek veri datat degil this dir kaydetmek isteyecegimiz yerde yine de this kullanmaliyiz

  // email control
  const isEmailValidated = data.email
    ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)
    : true;

  if (!isEmailValidated) {
    next(new Error("Email is not validated")); // Error Handler middleware ine yönlendirmek icin kullaniyoruz
  }

  const isPasswordValidated = data.password
    ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.]).{8,}$/.test(
        data.password
      )
    : true;

  if (!isPasswordValidated) {
    next(
      new Error(
        "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character."
      )
    );
  }

  if (data.password) {
    if (this?._update) {
      //update
      this._update.password = passwordEncrypt(data.password);
    } else {
      //create
      this.password = passwordEncrypt(data.password);
    }
  }

  console.log(this);

  next();
});

module.exports = mongoose.model("User", userSchema);
