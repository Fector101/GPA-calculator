const express= require('express')
const nodemailer=require('nodemailer')
const formParser=require('body-parser')
const cors=require('cors')
const { set,update } =require ('@vercel/edge-config')
const app = express()
const port =3000
const email_html=(user_name) =>`
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <p>${user_name}</p>
</body>
`

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
    sent_bool?  res.json({ message: 'Data Sent'}): res.json({ message: 'Failed to send'})
})


app.get('/', (req,res)=>{
  res.sendFile(__dirname+'/public/index.html')
})

app.get('/s', async(req,res)=>{
  // Store data with key 'user-data'
  await update({ name: 'Fabian', age: 25 })
  res.status(200).json({ message: 'Data stored' })
})

app.get('/g',async(req,res)=>{
  try {
  const createReadAccessToken = await fetch(
    'https://edge-config.vercel.com/ecfg_xdtfidgchdeevdmwwj4bc8ytbatm?token=873ff4bf-a399-40ef-9341-e234fd009369',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer 873ff4bf-a399-40ef-9341-e234fd009369`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        label: 'my edge config token label',
      }),
    },
  );
  const result = await createReadAccessToken.json();
  res.write(result)
    res.end()
} catch (error) {
  console.log(error);
}
})
app.use((req,res)=>{
  res.status(404).send('Page Sinked')
})

// export the app for vercel serverless functions
module.exports = app;
