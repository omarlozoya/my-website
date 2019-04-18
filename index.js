const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const fs = require('fs');

const app = express();

const routes = ['about', 'contact', 'resume'];
const frontEnd = ['Javascript', 'AngularJS', 'Bootstrap', 'Angular Material', 'HTML', 'CSS', 'Typescript', 'NPM', 'Swift', 'Cocoapods'];
const backEnd = ['NodeJS/Express', 'MongoDB/Mongoose', 'PostgreSQL', 'Firebase', 'JSON', 'EJS', 'Java', 'C++'];
const frameworks = ['MEAN Stack', ' Express', 'jQuery', 'Swift'];
const sourceControl = ['GitHub', 'Visual Studio Code', 'VirtualBox', 'Xcode', 'Agile', 'Terminal/Linux', 'Windows', 'MacOSX'];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', {about: routes[0], contact: routes[1], resume: routes[2], front: frontEnd, back: backEnd, frame: frameworks, source: sourceControl});
});

app.get('/about', (req, res) => {
    res.render('about', {about: routes[0], contact: routes[1], resume: routes[2]});
});

app.get('/resume', (req, res) => {
    var file = fs.createReadStream('docs/Omar J Lozoya Resume.pdf');
    var stat = fs.statSync('docs/Omar J Lozoya Resume.pdf');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=OmarJLozoyaResume.pdf');
    file.pipe(res);
});

app.get('/contact', (req, res) => {
    res.render('contact', {about: routes[0], contact: routes[1], resume: routes[2]});
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started on port 3000");
}); 