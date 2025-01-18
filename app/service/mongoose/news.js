const News = require("../../API/v1/news/model");
const { notFoundError } = require("../../error");
const { checkingCategory } = require("./categories");

const getAllNews = async (req) => {
  const { page, limit, keyword, category, author, status } = req.query;
  const condition = { userid: req.pengguna.userid };

  // untuk searching
  if (keyword) condition["title"] = { $regex: keyword, $options: "i" };
  if (category) condition["category"] = category;
  if (author) condition["author"] = { $regex: author, $options: "i" };
  if (status) condition["status"] = { $regex: status, $options: "i" };

  const news = await News.find(condition)
    .limit(limit)
    .skip(limit * (page - 1))
    .populate({
      path: "category",
      select: "name",
    });

  const count = await News.countDocuments(condition);
  return { news, page: Math.ceil(count / limit), Total: count };
};

const createNews = async (req) => {
  if (req.pengguna.role !== "admin") {
    throw new notFoundError("Kamu tidak memiliki izin untuk membuat berita");
  }
  const { category, title, content, author, image, source, status } = req.body;

  const result = await News.create({
    userid: req.pengguna.userid,
    category,
    title,
    content,
    author,
    image,
    source,
    status,
  });
  return result;
};

const getOneNews = async (req) => {
  const { id } = req.params;
  const result = await News.findOne({
    _id: id,
    userid: req.pengguna.userid,
  }).populate({
    path: "category",
    select: "name",
  });
  if (!result) throw new notFoundError("News not found");
  return result;
};

const updateNews = async (req) => {
  if (req.pengguna.role !== "admin") {
    throw new notFoundError("Kamu tidak memiliki izin untuk mengedit berita");
  }
  const { id } = req.params;
  const { category, title, content, author, image, source, status } = req.body;
  // await checkingCategory(category);
  const result = await News.findOneAndUpdate(
    { _id: id, userid: req.pengguna.userid },
    { category, title, content, author, image, source, status }
  );
  if (!result) throw new notFoundError("News not found");
  return result;
};

const deleteNews = async (req) => {
  if (req.pengguna.role !== "admin") {
    throw new notFoundError("Kamu tidak memiliki izin untuk menghapus berita");
  }
  const { id } = req.params;
  const result = await News.findOneAndDelete({
    _id: id,
    userid: req.pengguna.userid,
  });
  if (!result) throw new notFoundError("News not found");
  return result;
};

module.exports = { getAllNews, createNews, getOneNews, updateNews, deleteNews };
