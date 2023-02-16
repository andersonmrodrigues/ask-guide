const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
//Models
const Ask = require("./database/scripts/Ask");
const Answer = require("./database/scripts/Answer");

connection
  .authenticate()
  .then(() => {
    console.log("Database connected!");
  })
  .catch((error) => {
    console.log(error);
  });

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  Ask.findAll({
    raw: true,
    order: [["id", "DESC"]],
  }).then((questions) => {
    res.render("index", { questions: questions });
  });
});

app.get("/ask", (req, res) => {
  res.render("ask");
});

app.post("/save-question", (req, res) => {
  var title = req.body.title;
  var description = req.body.description;
  Ask.create({
    title: title,
    description: description,
  }).then(() => {
    res.redirect("/");
  });
});

app.get("/ask/:id", (req, res) => {
  var id = req.params.id;
  Ask.findOne({
    where: {
      id: id,
    },
  }).then((question) => {
    if (question == undefined) {
      res.redirect("/");
    }

    Answer.findAll({
      where: {
        askId: question.id,
      },
      order: [["id", "DESC"]],
    }).then((replies) => {
      if (replies == undefined) {
        res.redirect("/");
      }
      res.render("reply", {
        question: question,
        replies: replies,
      });
    });
  });
});

app.post("/reply", (req, res) => {
  var content = req.body.content;
  var askId = req.body.askId;
  Answer.create({
    content: content,
    askId: askId,
  }).then(() => {
    res.redirect("/ask/" + askId);
  });
});

app.listen(8080, () => {
  console.log("Server UP!");
});
