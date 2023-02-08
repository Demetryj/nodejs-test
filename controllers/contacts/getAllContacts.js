const { getListContacts } = require("../../models/contacts/contacts.js");

const getAll = async (req, res, next) => {
  try {
    const allContacts = await getListContacts();
    res.json({
      status: "Success",
      code: 200,
      data: {
        result: allContacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
