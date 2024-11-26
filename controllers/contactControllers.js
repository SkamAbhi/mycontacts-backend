const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel.js");

//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async (req, res) => {
  try {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
});

//@desc Create New contact
//@route POST /api/contacts
//@access private

const createContact = asyncHandler(async (req, res) => {
  console.log("Request body:", req.body);

  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  try {
    console.log("Before creating contact");

    const contact = await Contact.create({
      name,
      email,
      phone,
      user_id: req.user.id,
    });

    console.log("Created contact:", contact);

    res.status(201).json(contact);
  } catch (err) {
    console.error("Error creating contact:", err);
    res.status(500).json({ message: "Error creating contact" });
  }
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(" User dont have permission to update other user contact ");
  }
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).json({ message: "Contact deleted successfully", contact });
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access private

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error(" Contact not found ");
  }

  res.status(200).json(contact);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error(" Contact not found ");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(" User dont have permission to update other user contact ");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

module.exports = {
  getContact,
  getContacts,
  createContact,
  deleteContact,
  updateContact,
};
