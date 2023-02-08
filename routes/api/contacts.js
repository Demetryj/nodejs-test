// ----Ділення на модулі--- //

const express = require("express");
const { contatsControllers } = require("../../controllers");
const { contactsValidation } = require("../../middlewares/contacts");
const { contactsSchema } = require("../../schemas");

const router = express.Router();

const validationAddContact = contactsValidation.addContactsValidation(
  contactsSchema.addContactsSchema
);
const validationUpdateContact = contactsValidation.updateContactValidation(
  contactsSchema.updateContactSchema
);

router.get("/", contatsControllers.getAllContacts);

router.get("/:contactId", contatsControllers.getContactById);

router.post("/", validationAddContact, contatsControllers.addContact);

router.delete("/:contactId", contatsControllers.deleteContact);

router.put(
  "/:contactId",
  validationUpdateContact,
  contatsControllers.changeContact
);

module.exports = router;

// ----В одному файлі---- //

// // const createError = require("http-errors");
// const Joi = require("joi");
// const express = require("express");
// const {
//   getListContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// } = require("../../models/contacts/contacts.js");

// const router = express.Router();

// const addContactsSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().email().required(),
//   phone: Joi.string().required(),
// });

// const updateContactSchema = Joi.object({
//   name: Joi.string(),
//   email: Joi.string().email(),
//   phone: Joi.string(),
// }).min(1);

// router.get("/", async (req, res, next) => {
//   try {
//     const allContacts = await getListContacts();
//     res.json({
//       status: "Success",
//       code: 200,
//       data: {
//         result: allContacts,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/:contactId", async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const contactById = await getContactById(contactId);

//     if (!contactById) {
//       // throw createError(404, `Contact with id=${contactId} not found.`);

//       // const error = new Error("Not found");
//       // error.status = 404;
//       // throw error;

//       res.status(404).json({
//         status: "Error",
//         code: 404,
//         message: "Not found",
//       });
//       return;
//     }

//     res.json({
//       status: "Success",
//       code: 200,
//       data: {
//         result: contactById,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const { error } = addContactsSchema.validate(req.body);
//     if (error) {
//       res.status(400).json({
//         status: "Error",
//         code: 400,
//         message: "Missing required name field",
//       });
//       return;
//     }

//     const newContact = await addContact(req.body);
//     res.status(201).json({
//       status: "Success",
//       code: 201,
//       data: {
//         result: newContact,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/:contactId", async (req, res, next) => {
//   const { contactId } = req.params;
//   const contactById = await removeContact(contactId);

//   if (!contactById) {
//     // throw createError(404, `Contact with id=${contactId} not found.`);

//     // const error = new Error("Not found");
//     // error.status = 404;
//     // throw error;

//     res.status(404).json({
//       status: "Error",
//       code: 404,
//       message: "Not found",
//     });
//     return;
//   }

//   res.json({
//     status: "Success",
//     code: 200,
//     message: "Contact deleted",
//   });
// });

// router.put("/:contactId", async (req, res, next) => {
//   try {
//     const { error } = updateContactSchema.validate(req.body);
//     if (error) {
//       res.status(400).json({
//         status: "Error",
//         code: 400,
//         message: "Missing fields",
//       });
//       return;
//     }

//     const { contactId } = req.params;
//     const contactById = await updateContact(contactId, req.body);
//     if (!contactById) {
//       // throw createError(404, `Contact with id=${contactId} not found.`);

//       // const error = new Error("Not found");
//       // error.status = 404;
//       // throw error;

//       res.status(404).json({
//         status: "Error",
//         code: 404,
//         message: "Not found",
//       });
//       return;
//     }

//     res.json({
//       status: "Success",
//       code: 200,
//       data: { result: contactById },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;
