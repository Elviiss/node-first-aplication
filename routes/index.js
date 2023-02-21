const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.post('/contact', (req, res) => {
  const { email , message} = req.body

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    scure: true,
    auth: {
      user: process.env.USER,
      pass: process.env.USERPASS
    },
  })

  const infomail = {
    from: process.env.USER,
    to: email,   
    subject: "MENSAJE DE PRUEBA",  
    text: `Hola ${email} aquí tienes el mensaje ${message}`, 
    html: `<h1>Hola ${email}</h1>
           <p>El siguiente texto es tu mensaje</p>
           <h2>${message}</h2>`, 
};
transporter.sendMail(infomail,(err,res)=>{
  if(err){
    console.log(err);
  }
  else {
    console.log('Mensaje enviado');
  }
});

  res.redirect("/contact")
})

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

module.exports = router;
