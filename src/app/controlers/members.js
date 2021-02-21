const Member = require("../models/Member");
const { age, date } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    Member.all(function (members) {
      return res.render("members/index", { members });
    });
  },

  create(req, res) {
    Member.instructorsSelectOption((options) => {
      return res.render("members/create", { instructorOptions: options });
    });
  },

  post(req, res) {
    // estrutura de validação todos dados preenchidos
    // essa const pode ser qualquer nome, e o Object é um constructor, ele cria um array de keys para o loop
    const keys = Object.keys(req.body);

    for (key of keys) {
      // cod abaixo msm coisa de req.body.avatar_url || key
      if (req.body[key] == "") return res.send("Preencha todos os campos");
    }

    Member.create(req.body, function (member) {
      return res.redirect(`members/${member.id}`);
    });
  },

  show(req, res) {
    Member.find(req.params.id, function (member) {
      if (!member) return res.send("Member not found");

      member.birth = date(member.birth).birthDay;

      return res.render("members/show", { member });
    });
  },

  edit(req, res) {
    Member.find(req.params.id, (member) => {
      if (!member) return res.send("Member not found");

      member.birth = date(member.birth).iso;

      Member.instructorsSelectOption((options) => {
        return res.render("members/edit", { member, instructorOptions: options });
      });
    });
  },

  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      // cod abaixo msm coisa de req.body.avatar_url || key
      if (req.body[key] == "") return res.send("Preencha todos os campos");
    }

    Member.update(req.body, () => {
      return res.redirect(`members/${req.body.id}`);
    });
  },

  delete(req, res) {
    Member.delete(req.body.id, () => {
      return res.redirect("/members");
    });
  },
};
