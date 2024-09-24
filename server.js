const express= require('express')
const nodemailer=require('nodemailer')
const formParser=require('body-parser')
const cors=require('cors')
const app = express()
const port =3000
const email_html=(user_name) =>`
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <div style="background-color: #ffffff; padding: 20px; margin: 30px auto; max-width: 600px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <div style="text-align: center; padding: 20px 20px 10px; background-color: #007bff; color: white; border-top-left-radius: 10px; border-top-right-radius: 10px;">
      <h1 style="line-height: 40px;color: #ffffff;">${user_name} <br>Welcome to Apex Nexus!</h1>
    </div>
    <div style="padding: 20px; text-align: center; background-color: #daebfdf2;">
      <p style="color: #555; line-height: 1.6;">Your registration has been confirmed.</p>
    </div>
    <div style="text-align: center; padding: 20px; background-color: #d3d7dc; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
      <p>Follow us on social media for the latest updates!</p>
      <div style="margin-top: 30px;">
        <a style="box-sizing:border-box;display: inline-block;" href="https://wa.me/2348112321825?text=Hi%20Fabian%2c%20I%27d%20like%20to%20">
          <img src="https://my-ver-express-form.vercel.app/whatsapp" style="width: 36px; height: 36px; margin: 0 10px;" alt="WhatsApp Logo">
        </a>
        <a style="display: inline-block;" href="https://github.com/Fector101" alt="github profile">
          <img src="https://my-ver-express-form.vercel.app/github" style="width: 36px; height: 36px; margin: 0 10px;" alt="GitHub Logo">
        </a>
        <a style="display: inline-block;" href="https://x.com/OPieMonarch">
          <img src="https://my-ver-express-form.vercel.app/twitter" style="width: 36px; height: 36px; margin: 0 10px;" alt="X Logo">
        </a>
      </div>
      <p>If you have any questions, feel free to <a href="https://wa.me/2348112321825?text=Hi%20Fabian%2c%20I%27d%20like%20to%20">contact me</a>.</p>
    </div>
  </div>
</body>
`
app.get('/twitter', (req, res) => {
    res.sendFile(__dirname + '/public/img/X-logo.png'); // Serve the image file
});

app.get('/whatsapp', (req, res) => {
    res.sendFile(__dirname + '/public/img/WhatsApp.png'); // Serve the image file
});

app.get('/github', (req, res) => {
    res.sendFile(__dirname + '/public/img/github.png'); // Serve the image file
});
async function sendMail(send_to,user_name) {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    let mailOptions = {
      to: send_to,
      from: 'fabianjoseph063@gmail.com',
      subject: 'Apex Nexus Registration Complete',
      html: email_html(user_name.split('@')[0])
      //text: 'Hello, this is a test email sent from Node.js!'
    };

    // Send the email
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    // return { message: 'No error'+info.response };
    return true
 
  } catch (error) {
    console.error('Error sending email:', error);
    return false
 
  }
}
app.use(express.static('public'))
app.use(express.json())
app.use(formParser.urlencoded({extended:true})) //extended:true allows to accepts nested objects {user1:{name:'fabian'}}

app.use(cors({
            origin: 'https://my-simple-form.vercel.app',
            methods:['GET','POST']
            })
       )  // CORS is enable for all routes for protection from unauthorized access

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})

app.post("/submit", async(req, res) => {
    const sent_bool = await sendMail(req.body.email,req.body['user-name'])
    sent_bool? res.redirect('/good'): res.redirect('/fail')
});

app.get('/submit', (req, res) => {
  // Redirect to home page
  res.redirect('/')
})

app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/public/index.html')
})
app.get('/good',(req,res)=>{
  res.sendFile(__dirname+'/public/successful.html')
})
app.get('/fail',(req,res)=>{
  res.sendFile(__dirname+'/public/failure.html')
})
app.use((req,res)=>{
  res.status(404).send('Page Sinked')
})

// export the app for vercel serverless functions
module.exports = app;
