import "./addRequire.js";
import {create} from 'ipfs-http-client'
import contract5ABI from '<----Absolute Path to your ABI File---->'; // Relative didnt work for some reason
import web3 from 'web3';
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const Provider = require('@truffle/hdwallet-provider');

const contract5Address = "0x71c2f8b9148c6Cebec30B15f4342D15A7b7511F5"; //Your Contract Address
const account = "0xbBE4231bF70F69F3Cbbd467752260637a92Ef4AF"; // Your ganache account address
const privateKey = 'aa51db6b116c39355dc02e6455e9f126b1982ab1ccf8744a847ac432ec7bf92b'; // Your private key for the ganache account

const addToMedHistory = async(walletAddress,presHash)=>{ 

    const provider = new Provider(privateKey,"HTTP://127.0.0.1:7545");
    const con3 = new web3(provider);
    var Contract5 =  new con3.eth.Contract(contract5ABI,contract5Address);
    const reciept = await Contract5.methods.addToMedHistory(walletAddress,presHash).send({from:account});
    console.log(reciept);
}
const addToAddressToDisease = async(walletAddress,diseaseName)=>{
    const provider = new Provider(privateKey,"HTTP://127.0.0.1:7545");
    const con3 = new web3(provider);
    var Contract5 =  new con3.eth.Contract(contract5ABI,contract5Address);
    const reciept2 = await Contract5.methods.addToAddressToDisease(walletAddress,diseaseName).send({from:account});
    console.log(reciept2);
}
const addToPresName = async(walletAddress,fileName)=>{
    const provider = new Provider(privateKey,"HTTP://127.0.0.1:7545");
    const con3 = new web3(provider);
    var Contract5 =  new con3.eth.Contract(contract5ABI,contract5Address);
    const reciept2 = await Contract5.methods.addToPresName(walletAddress,fileName).send({from:account});
    console.log(reciept2);
}

const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');

const projectId = '<------YOUR IPFS INFURA PROJECT ID------>';
const projectSecret = '<------YOUR SECRECT KEY------>';
const auth = 'Basic ' + Buffer.from(projectId+':'+projectSecret).toString('base64');
//console.log(auth);
const ipfs = await create({
    host:'ipfs.infura.io',
    port:5001,
    protocol:'https',
    headers:{
        authorization:auth,
    }
});
const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
    res.render('home')
});
app.post('/upload',async (req,res)=>{
    const file = req.files.file;
    const fileName = req.body.fileName;
    const filePath = 'files/'+fileName;
    const diseaseName = req.body.diseaseName;
    const walletAddress = req.body.walletAddress;
    // console.log(filePath);
    // console.log(diseaseName);
    // console.log(walletAddress);
    file.mv(filePath,async(err)=>{
        if(err){
            console.log("Error failed to download");
            return res.status(500).send(err);
        }
        
        const fileHash = await addFile(fileName,filePath);
        fs.unlink(filePath,(err)=>{
            if(err) console.log(err);
        });
        console.log(walletAddress);
        //console.log(fileHash.toString());
        var _presHash = fileHash.toString();
        console.log(_presHash);
        var reciept = await addToMedHistory(walletAddress,_presHash);
        var reciept2 = await addToAddressToDisease(walletAddress,diseaseName);
        var reciept3 = await addToPresName(walletAddress,fileName);
        //console.log(reciept);
        res.render('upload',{fileName,fileHash});
    });
});

const addFile = async(fileName,filePath)=>{
    const file = fs.readFileSync(filePath);
    const fileAdded = await ipfs.add({path:fileName,content:file});
    const fileHash = await fileAdded.cid;
    //console.log(file.toString); 
    return fileHash;
}
app.listen(4000,()=>{
    console.log("Server listening on port 4000");
});