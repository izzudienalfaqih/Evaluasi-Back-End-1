const { notFoundError } = require("../../error");
const Todo = require("./../../API/v1/todos/model");

const getAllTodo = async () => {
  const result = await Todo.find();
  return result;
};

const createTodos = async (req) => {
  const { category, title, desc, priority } = req.body;
  const result = await Todo.create({ category, title, desc, priority });
  return result;
};

const getOneTodo = async (req) => {
  const { id } = req.params;

  //populate buat ngambil data, select buat milih data yg mau diambil
  const result = await Todo.findOne({ _id: id }).populate({
    path: "category",
    select: "name",
  });
  if (!result) throw new notFoundError("todo not found");
  return result;
};

const updateTodo = async (req) => {
  const { id } = req.params;
  const { category, title, desc, priority } = req.body;
  const result = await Todo.findOneAndUpdate(
    { _id: id },
    { category, title, desc, priority }
  );
  if (!result) throw new notFoundError("todo not found");
  return result;
};

const deleteTodo = async (req) => {
  const { id } = req.params;
  const result = await Todo.findOneAndDelete({ _id: id });
  if (!result) throw new notFoundError("todo not found");
  return result;
};
module.exports = {
  getAllTodo,
  createTodos,
  getOneTodo,
  updateTodo,
  deleteTodo,
};
