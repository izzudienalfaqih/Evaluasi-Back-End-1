const Category = require("../../API/v1/categories/model");
const { notFoundError } = require("../../error");

const getAllCategory = async (req) => {
  const result = await Category.find({ userid: req.user.userid }).select(
    "name"
  );
  return result;
};

const createCategories = async (req) => {
  const { name } = req.body;

  const result = await Category.create({ userid: req.user.userid, name });
  return result;
};

const getOneCategories = async (req) => {
  const { id } = req.params;
  const result = await Category.findOne({ _id: id, userid: req.user.userid });
  if (!result) throw new notFoundError("categories not found");
  return result;
};

const updateCategories = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  const result = await Category.findOneAndUpdate(
    { _id: id, userid: req.user.userid },
    { name }
  );
  if (!result) throw new notFoundError("categories not found");
  return result;
};

const deleteCategories = async (req) => {
  const { id } = req.params;

  const result = await Category.findOneAndDelete({
    _id: id,
    userid: req.user.userid,
  });
  if (!result) throw new notFoundError("categories not found");
  return result;
};

const checkingCategory = async (id, userid) => {
  const result = await Category.findOne({ _id: id, userid });
  if (!result) throw new notFoundError("category not found");
  return result;
};

module.exports = {
  getAllCategory,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
  checkingCategory,
};
