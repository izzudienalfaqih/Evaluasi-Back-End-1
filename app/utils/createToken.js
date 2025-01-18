const createTokenUser = (user) => {
  return {
    userid: user._id,
    username: user.username,
    role: user.role,
  };
};

module.exports = { createTokenUser };
