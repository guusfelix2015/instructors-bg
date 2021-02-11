const { age, date } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    return res.render("members/index");
  },

  create(req, res) {
    return res.render("members/create");
  },

  post(req, res) {
    // estrutura de validação todos dados preenchidos
    // essa const pode ser qualquer nome, e o Object é um constructor, ele cria um array de keys para o loop
    const keys = Object.keys(req.body);

    for (key of keys) {
      // cod abaixo msm coisa de req.body.avatar_url || key
      if (req.body[key] == "") return res.send("Preencha todos os campos");
    }

    return;
  },

  show(req, res) {
    return;
  },

  edit(req, res) {
    return;
  },

  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      // cod abaixo msm coisa de req.body.avatar_url || key
      if (req.body[key] == "") return res.send("Preencha todos os campos");
    }
    return;
  },

  delete(req, res) {
    return;
  },
};
