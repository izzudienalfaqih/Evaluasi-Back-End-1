const { notFoundError } = require("../../error");
const Todo = require("./../../API/v1/todos/model");
const { checkingCategory } = require("./categories");

const getAllTodo = async (req) => {
  const { page, limit, keyword, category, priority, isDone } = req.query;
  const condition = { userid: req.user.userid };

  // untuk searching
  if (keyword) condition["title"] = { $regex: keyword, $options: "i" };
  if (category) condition["category"] = category;
  if (priority) condition["priority"] = priority;
  if (isDone) condition["isDone"] = isDone;

  const todos = await Todo.find(condition)
    .limit(limit)
    .skip(limit * (page - 1));

  const count = await Todo.countDocuments(condition);
  return { todos, page: Math.ceil(count / limit), Total: count };
};

const createTodos = async (req) => {
  const { category, title, desc, priority } = req.body;
  await checkingCategory(category, req.user.userid);
  const result = await Todo.create({
    userid: req.user.userid,
    category,
    title,
    desc,
    priority,
  });
  return result;
};

const getOneTodo = async (req) => {
  const { id } = req.params;

  //populate buat ngambil data, select buat milih data yg mau diambil
  const result = await Todo.findOne({
    _id: id,
    userid: req.user.userid,
  }).populate({
    path: "category",
    select: "name",
  });
  if (!result) throw new notFoundError("todo not found");
  return result;
};

const updateTodo = async (req) => {
  const { id } = req.params;
  const { category, title, desc, priority } = req.body;
  await checkingCategory(category, req.user.userid);
  const result = await Todo.findOneAndUpdate(
    { _id: id, userid: req.user.userid },
    { category, title, desc, priority }
  );
  if (!result) throw new notFoundError("todo not found");
  return result;
};

const deleteTodo = async (req) => {
  const { id } = req.params;
  const result = await Todo.findOneAndDelete({
    _id: id,
    userid: req.user.userid,
  });
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
