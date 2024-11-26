const express = require("express");
const router = express.Router();
const {
  getContact,
  getContacts,
  createContact,
  deleteContact,
  updateContact,
} = require("../controllers/contactControllers");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
