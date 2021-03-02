const Instructor = require("../models/Instructor");
const { age, date } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit || 2;
    let offset = limit * (page - 1);

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(instructors) {
        return res.render("instructors/index", { instructors, filter });
      },
    };

    Instructor.paginate(params);

    // if (filter) {
    //   Instructor.findby(filter, (instructors) => {
    //     return res.render("instructors/index", { instructors, filter });
    //   });
    // } else {
    //   Instructor.all(function (instructors) {
    //     return res.render("instructors/index", { instructors });
    //   });
    // }
  },

  create(req, res) {
    return res.render("instructors/create");
  },

  post(req, res) {
    // estrutura de validação todos dados preenchidos
    // essa const pode ser qualquer nome, e o Object é um constructor, ele cria um array de keys para o loop
    const keys = Object.keys(req.body);

    for (key of keys) {
      // cod abaixo msm coisa de req.body.avatar_url || key
      if (req.body[key] == "") return res.send("Preencha todos os campos");
    }

    Instructor.create(req.body, function (instructor) {
      return res.redirect(`instructors/${instructor.id}`);
    });
  },

  show(req, res) {
    Instructor.find(req.params.id, function (instructor) {
      if (!instructor) return res.send("Instructor not found");

      instructor.age = age(instructor.birth);
      instructor.services = instructor.services.split(",");

      instructor.created_at = date(instructor.created_at).format;

      return res.render("instructors/show", { instructor });
    });
  },

  edit(req, res) {
    Instructor.find(req.params.id, function (instructor) {
      if (!instructor) return res.send("Instructor not found");

      instructor.birth = date(instructor.birth).iso;

      return res.render("instructors/edit", { instructor });
    });
  },

  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      // cod abaixo msm coisa de req.body.avatar_url || key
      if (req.body[key] == "") return res.send("Preencha todos os campos");
    }

    Instructor.update(req.body, () => {
      return res.redirect(`instructors/${req.body.id}`);
    });
  },

  delete(req, res) {
    Instructor.delete(req.body.id, () => {
      return res.redirect("/instructors");
    });
  },
};
