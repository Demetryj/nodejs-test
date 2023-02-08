const uniqid = require("uniqid");
const fs = require("fs").promises;
const path = require("path");

const { updateDataContacts } = require("./updateDataContacts");

const pathFileContacts = path.join(__dirname, "./dataContacts.json");

const getListContacts = async () => {
  const data = await fs.readFile(pathFileContacts, "utf8");
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const allContacts = await getListContacts();
  const contactById = allContacts.find((contact) => contact.id === contactId);

  if (!contactById) {
    return null;
  }

  return contactById;
};

const removeContact = async (contactId) => {
  const allContacts = await getListContacts();
  const idx = allContacts.findIndex((item) => item.id === contactId);

  if (idx === -1) {
    return null;
  }

  const [deleteContacts] = allContacts.splice(idx, 1);
  await updateDataContacts(allContacts);

  return deleteContacts;
};

const addContact = async (body) => {
  const allContacts = await getListContacts();

  const contactAdd = { id: uniqid(), ...body };
  allContacts.push(contactAdd);

  await updateDataContacts(allContacts);

  return contactAdd;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const allContacts = await getListContacts();

  const contactById = allContacts.find((contact) => contact.id === contactId);

  if (!contactById) {
    return null;
  }

  if (name) {
    contactById.name = name;
  } else if (email) {
    contactById.email = email;
  } else if (phone) {
    contactById.phone = phone;
  }

  await updateDataContacts(allContacts);

  return contactById;
};

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
