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
const aboutMeMessage = "My first job ever was at a retail store called Aeropostale. It was my first high school job when I used to live in Texas. I moved to Phoenix AZ and soon got a job at a movie theater and a while after that at converse. I've also worked at a music venue as a security guard, a helper at the Phoenix convention center during the time when the super-bowl was hosted in Phoenix, the school tech shop at ASU Marketplace, a Home Specialist for Apple and was a seasonal worker for UPS and BestBuy. You might be asking yourself why on earth would I be listing out all my past work experience? Well the answer to that is simple, while I enjoyed my experiences at those place, I was never truly satisfied with myself at those positions. I longed for something more and was not quite sure what that was. As a child I always loved technology. Whether it was video games, computers, cell phones, televisions, etc., I was always the one who loved setting up devices and learn how to use them. My early years in college were ones of confusion. I keep switching majors because I was never really sure of what I wanted to do in life. Nothing seemed to attain my passion and attention the way I thought a career should. It was not until I took an intro to programming elective when I realized that coding was something I really enjoyed doing. The feeling of accomplishment and satisfaction, when I would see what seemed to be an impossible programming assignment compile and run correctly, was incredible and unlike anything else I had experienced. It gave me a feeling that no past job experience or task had. I soon started doing my research as to what software development was all about and immediately made the decision to change my major to computer science (software engineering) and purse a career in software development. Now I am on the verge of graduation and I know I made the correct choice in selecting this field as my career. I love building/creating different projects, seeing applications come to life, and solving real world problems using the skills I have acquired. My name is Omar Lozoya and developing software has become one of my passions in life."
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
        aboutMe: aboutMeMessage
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
