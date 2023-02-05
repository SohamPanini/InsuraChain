const express = require('express');
const mongoose = require('mongoose');
const Web3 = require('web3');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const Crypto = require('crypto'); //for adhar encryption

const web3 = new Web3('https://cloudflare-eth.com');
const jwtSecret = 'secret';


const app = express();

const patientModel = require('./models/patient');


app.use(express.json())
app.use(cors())

// connection
mongoose.connect("<----Your MongoDB URI---->",
{
    useNewUrlParser: true,
});

app.get('/', (req, res) => {
    res.send("server is running");
});

//route call
app.post('/insert', async(req, res) => {
    
    const patientName = req.body.patientName;
    const patientAdhar = Crypto.createHash('sha256').update(req.body.patientAdhar).digest('hex');
    const patientWalletAdress = req.body.patientWalletAdress;
    
    const patient = new patientModel({patientName: patientName, patientAdhar: patientAdhar, patientWalletAdress: patientWalletAdress});

    try{
        await patient.save();
        console.log("inserted data")
        res.send({
            "message": "Patient Added Successfully",
            "success": true,
            "data": patient
        });
    } catch (err) {
        res.send({
            "message": "Failed To Add Patient",
            "success": false,
        });
        console.log(err);
    }
});

//to get patients name
// app.get("/getData", function (req, res, next) {
//     const address = req.query.address
//     patientModel.find({ patientWalletAdress: { $in: [ "sas" ] } }).then(function (patient) {
//         res.send(patient);
//         console.log(patient);
//     });

// });

// for signing the metamask address
app.get('/nonce', async(req, res) => {
    const nonce = new Date().getTime()
    const address = req.query.address

    const tempToken = jwt.sign({ nonce, address }, jwtSecret, { expiresIn: '60s' });
    // console.log(tempToken)
    const message = getSignMessage(address, nonce);

    res.json({ tempToken, message })
});



app.post('/verify', async(req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token === null) return res.sendStatus(403)

    const userData = await jwt.verify(token, jwtSecret)
    const message = getSignMessage(userData.address, userData.nonce)

    const verifiedAddress = await web3.eth.accounts.recover(message, req.query.signature)

    if (verifiedAddress.toLowerCase() === userData.address.toLowerCase()) {
        const token = jwt.sign({ verifiedAddress }, jwtSecret, { expiresIn: '1d' });
        res.json({ token })
    } else {
        res.sendStatus(403)
    }

});

app.get('/secret', authenticateToken, async (req, res) => {
    res.send(`Welcome Wallet: ${req.authData.verifiedAddress}`)
})

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, jwtSecret, (err, authData) => {
    //   console.log(err)  // this was giving the null thing
  
      if (err) return res.sendStatus(403)
  
      req.authData = authData
  
      next()
    })
  }

const getSignMessage = (address, nonce) => {
    return `Please sign this message to prove ownership of your address: ${address}\n\n nonce: ${nonce}`
}

app.listen(3001, () => {
    console.log('Server is running on port 3001...');
});
