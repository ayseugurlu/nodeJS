"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// Reservation Controller:
const Reservation = require("../models/reservation");
const dateValidation = require("../helpers/dateValidation");
const CustomError = require("../errors/customError");
const Car = require("../models/car");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "List Reservations"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

    let customFilter = {};

    if (!(req.user.isAdmin && req.user.isStaff)) {
      customFilter = { userId: req.user._id };
    }

    const data = await res.getModelList(Reservation, customFilter);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Reservation),
      data,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Create Reservation"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                   $ref:"#/definitions/Reservation"
                }
            }
        */

    //if user is not admin or not staff
    if (!req.user.isAdmin || !req.user.isStaff) {
      req.body.userId = req.user._id;
    } else if (!req.body.userId) {
      req.body.userId = req.user._id;
    }

    const [start, end, reservedDays] = dateValidation(
      req.body?.startDate,
      req.body?.endDate
    );

    const isReserved = await Reservation.find({
      carId: req.body.carId,
      startDate: { $lte: req.body?.endDate },
      endDate: { $gte: req.body?.startDate },
    });

    // check if car reserved in requested dates
    if (isReserved) {
      throw new CustomError(
        "The Car is alread reserved for the given dates",
        400
      );
    }

    //check if user reserved any car in requested dates
    const userReservationInDates = await Reservation.find({
      userId: req.body.userId,
      startDate: { $lte: req.body?.endDate },
      endDate: { $gte: req.body?.startDate },
    });

    //dont allow to make another reservation under same user
    if (userReservationInDates) {
      throw new CustomError(
        "You have already reserved a car for the given dates",
        400
      );
    }

    const dailyCost = await Car.findOne(
      { _id: req.body?.carId },
      { _id: 0, pricePerDay: 1 }
    ).then((car) => Number(car.pricePerDay));

    req.body.amount = reservedDays * dailyCost;

    const data = await Reservation.create(req.body);

    //todo -> send mail to user

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Get Single Reservation"
        */

    let customFilter = {};

    if (!(req.user.isAdmin && req.user.isStaff)) {
      customFilter = { userId: req.user._id };
    }

    const data = await Reservation.findOne({
      _id: req.params.id,
      ...customFilter,
    });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Update Reservation"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                   $ref:"#/definitions/Reservation"
                }
            }
        */

    const data = await Reservation.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Reservation.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Delete Reservation"
        */

    const data = await Reservation.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
