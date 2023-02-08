// const createError = require("http-errors");
const { removeContact } = require("../../models/contacts/contacts.js");

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await removeContact(contactId);

  if (!contactById) {
    // throw createError(404, `Contact with id=${contactId} not found.`);

    // const error = new Error("Not found");
    // error.status = 404;
    // throw error;

    res.status(404).json({
      status: "Error",
      code: 404,
      message: "Not found",
    });
    return;
  }

  res.json({
    status: "Success",
    code: 200,
    message: "Contact deleted",
  });
};

module.exports = deleteContact;
