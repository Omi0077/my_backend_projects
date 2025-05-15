import express from 'express'
import cors from 'cors'
import connectDB from './DB/index.js'
import dotenv from 'dotenv'
import { Url } from './models/url.model.js'

dotenv.config({
    path: 'backend/.env'
})

await connectDB()
// console.log(process.env.MONGODB_URI); // look into this 


const PORT = 9000

let URLs = await Url.find() // this return array of all url objects in db use findone instead
let code = 0

const app = express()

app.use(express.json())
// app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin: '*'
}))

// post route to make and send new short urls

app.post('/' , async (req,res)=>{
    
    // console.log(typeof req.body.longURL);
    let incomingURL = req.body.longURL;
    let outgoingURL = `http://localhost:${PORT}/${++code}`

    // implementing mongoose
    let url = await Url.create(
        {
            orignalUrl: incomingURL,
            shortUrl: outgoingURL
        })

    // let shortURL = {
    //     long : incomingURL,
    //     short : outgoingURL
    // }
    // URLs.push(shortURL)
    console.log(URLs);

    //sending short url
    res.send(outgoingURL)
    
})

// get route for checking incoming shorturl exist in URLs array if yes then redirect to its long version

app.get('/:cd',(req,res)=>{
    let incomingURL = `http://localhost:${PORT}/${req.params.cd}`
    // console.log(incomingURL);
    URLs.forEach( (obj)=>{
        if(obj.shortUrl == incomingURL){
            res.redirect(`https://${obj.orignalUrl}`)
            return
        }
    } )
    
})

app.listen(PORT , ()=>{
    console.log('listening on port: ', PORT);
    
})
