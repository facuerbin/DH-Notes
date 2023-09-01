const bcrypt = require("bcrypt");
const uuid = require("uuid");
const { getUsers, writeUsers } = require("../data/model");

module.exports = {
  login: (req, res) => {
    res.render("login");
  },
  processLogin: (req, res) => {
    const { email, password } = req.body;

    const users = getUsers();
    const requiredUser = users.find((user) => user.email === email);

    if (!requiredUser) return res.send("Usuario no encontrado");
    if (!bcrypt.compareSync(password, requiredUser.password))
      return res.send("Contraseña incorrecta...");

    req.session.user = {
      email: requiredUser.email,
      fName: requiredUser.fName,
      lName: requiredUser.lName,
      id: requiredUser.id,
    };

    if (req.body.session) {
      res.cookie("session", req.session.user, { maxAge: 86400000 }); // 1 day
    }

    return res.redirect("/");
  },
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("session");
    res.redirect("/");
  },
  register: (req, res) => {
    res.render("register");
  },
  processRegister: (req, res) => {
    const user = {
      id: uuid.v4(),
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      fName: req.body.fName,
      lName: req.body.lName,
      image: req.file ? req.file.filename : "default.jpg",
    };

    const users = getUsers();
    users.push(user);

    writeUsers(users);
    res.redirect("/login");
  },
  listUsers: (req, res) => {
    const users = getUsers();
    res.json(users);
  },
  userDetail: (req, res) => {
    const users = getUsers();
    const detail = users.find((user) => user.id == req.session.user.id);
    res.render("profile", { user: detail });
  },
  userEdit: (req, res) => {
    const users = getUsers();
    const editedUser = {
      id: req.params.id,
      email: req.body.email,
      password: req.body.password,
      fName: req.body.fName,
      lName: req.body.lName,
    };

    const newUsers = users.map((user) => {
      if (user.id == editedUser.id) {
        return editedUser;
      }
      return user;
    });

    writeUsers(newUsers);
    res.redirect("/users/" + req.params.id);
  },
};
