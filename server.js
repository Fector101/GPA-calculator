const express= require('express')
const nodemailer=require('nodemailer')
const formParser=require('body-parser')
const cors=require('cors')
const app = express()
const port =3000
const email_html=(user_name) =>`
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <p>${user_name}</p>
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
async function sendMail(data) {
  const str=JSON.stringify(data)
  console.log(str,process.env.EMAIL_USER)
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    let mailOptions = {
      to: 'fabianjoseph063@gmail.com',
      from: 'fabianjoseph063@gmail.com',
      subject: 'Apex Nexus Registration Complete',
      html: str
      //text: 'Hello, this is a test email sent from Node.js!'
    }
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

app.post("/traffic", async(req, res) => {
    const sent_bool = await sendMail(req.body)
    sent_bool?  res.json({ message: 'Data Sent'}): res.json({ message: 'Failed to send'})});

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
