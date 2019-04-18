if (process.env.NODE_ENV !== "production") {
    //require('dotenv').load();
    require("dotenv").config();
}

console.log("Node Env = " + process.env.NODE_ENV);

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const fs = require("fs");
const Email = require("email-templates");
const mailer = require("nodemailer");

const app = express();

const routes = ["about", "contact", "resume"];
const frontEnd = [
    "Javascript",
    "AngularJS",
    "Bootstrap",
    "Angular Material",
    "HTML",
    "CSS",
    "Typescript",
    "NPM",
    "Swift",
    "Cocoapods"
];
const backEnd = [
    "NodeJS/Express",
    "MongoDB/Mongoose",
    "PostgreSQL",
    "Firebase",
    "JSON",
    "EJS",
    "Java",
    "C++"
];
const frameworks = ["MEAN Stack", " Express", "jQuery", "Swift"];
const sourceControl = [
    "GitHub",
    "Visual Studio Code",
    "VirtualBox",
    "Xcode",
    "Agile",
    "Terminal/Linux",
    "Windows",
    "MacOSX"
];
const failMessage = "Your message failed to send. Please try again. Thank you!";
const successMessage =
    "Your message was successfully sent! I will respond to you as soon as I can. Thank you!";
const aboutMeP1 = "I was born in Texas and lived there till I was 18. After high school I moved to Phoenix, AZ, got a job at a movie theater, and soon after at Converse. I also worked at Apple, Best Buy, UPS, security at a music venue, and Sun Devil Marketplace Tech shop. While I enjoyed my experiences at the movie theater and past work places, I was never truly satisfied with myself at those positions. I longed for something more and was not quite sure what it was. As a child I was always interested in technology such as video games, computers, cell phones, televisions, etc. I was the one who loved setting up devices and using them.";
const aboutMeP2 = "My early years in college were ones of confusion. I kept switching majors because I was never really sure of what I wanted to do in life. Nothing seemed to attain my passion and attention the way I thought a career should. It was not until I took an into to programming elective when I realized that coding was something I really enjoyed. The feeling of accomplishment and satisfaction when I would see, what seemed to be, an impossible programming task compile and run correctly, was incredible and unlike anything else I had experienced. It gave me a feeling that no past job or task had.";
const aboutMeP3 = "I soon started doing my research as to what software development was all about and immediately made the decision to change my major to computer science (software engineering). I pursued a career in software development and am now on the verge of graduation.  I love building/creating different projects, seeing applications come to life, and solving real world problems using the skills I have acquired. My name is Omar Lozoya and developing software has become one of my passions in life.";
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index", {
        about: routes[0],
        contact: routes[1],
        resume: routes[2],
        front: frontEnd,
        back: backEnd,
        frame: frameworks,
        source: sourceControl
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        about: routes[0],
        contact: routes[1],
        resume: routes[2],
        aboutP1: aboutMeP1,
        aboutP2: aboutMeP2,
        aboutP3: aboutMeP3
    });
});

app.get("/resume", (req, res) => {
    var file = fs.createReadStream("docs/Omar J Lozoya Resume.pdf");
    var stat = fs.statSync("docs/Omar J Lozoya Resume.pdf");
    res.setHeader("Content-Length", stat.size);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        "attachment; filename=OmarJLozoyaResume.pdf"
    );
    file.pipe(res);
});

app.get("/contact", (req, res) => {
    res.render("contact", {
        about: routes[0],
        contact: routes[1],
        resume: routes[2]
    });
});

app.post("/contact", (req, response) => {
    var mailOptions = {
        to: process.env.USER_EMAIL,
        from: req.body.email,
        subject: req.body.subject,
        text: req.body.name + " (" + req.body.email + ") says: " + req.body.message
    };

    var smtpTransport = mailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
        }
    });

    smtpTransport.sendMail(mailOptions, (err, res) => {
        if (err) {
            response.render("fail", {
                about: routes[0],
                contact: routes[1],
                resume: routes[2],
                msg: failMessage
            });
        } else {
            response.render("success", {
                about: routes[0],
                contact: routes[1],
                resume: routes[2],
                msg: successMessage
            });
        }
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started on port 3000");
});
