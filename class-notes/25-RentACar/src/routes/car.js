"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
const car = require('../controllers/car')
const permissions =  require('../middlewares/permissions')
/* ------------------------------------------------------- */
// routes/car:


router
  .route("/")
  .get(car.list)
  .post(permissions.isStaffOrisAdmin,car.create);

router
  .route("/:id")
  .get(permissions.isLogin, car.read)
  .put(permissions.isStaffOrisAdmin, car.update)
  .patch(permissions.isStaffOrisAdmin, car.update)
  .delete(permissions.isAdmin, car.delete);
module.exports = router;
