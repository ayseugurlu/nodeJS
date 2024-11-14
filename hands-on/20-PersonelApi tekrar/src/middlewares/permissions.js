"use strict";

module.exports = {
  isLogin: (req, res, next) => {
    if (req.user && req.user.isActive) next();
    else {
      res.errorStatusCode = 403;
      throw new Error("No permission: You must login");
    }
  },
  isAdmin: (req, res, next) => {
    if (req.user && req.user.isActive && req.user.isAdmin) next();
    else {
      res.errorStatusCode = 403;
      throw new Error("No permission: You must login");
    }
  },
  isAdminOrLead: (req, res, next) => {
    const departmentId = req.params?.id;

    if (
      req.user &&
      req.user.isActive &&
      (req.user.isAdmin ||
        (req.user.isLead && req.user.departmentId == departmentId))
    )
      next();
    else {
      res.errorStatusCode = 403;
      throw new Error('No permission : you must login and to be Admin or Department Lead (own)')
    }
  },
};
