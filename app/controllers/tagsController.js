const { Tag } = require("../models");

const tagsController = {
  async renderTagsPage(req, res) {
    try {
      const tags = await Tag.findAll({
        include: "quizzes"
      });
      res.render("tags", {tags});

    } catch(error) {
      console.error(error);
      res.status(500).render("500");
    }
  }
};

module.exports = tagsController;