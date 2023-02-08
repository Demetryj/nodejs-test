const { addContact } = require("../../models/contacts/contacts");

const add = async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    res.status(201).json({
      status: "Success",
      code: 201,
      data: {
        result: newContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
