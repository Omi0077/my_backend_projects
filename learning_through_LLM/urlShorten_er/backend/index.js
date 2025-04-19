import express from 'express'
import cors from 'cors'

const PORT = 9000

let URLs = []
let code = 0

const app = express()

app.use(express.json())
// app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin: '*'
}))

// post route to make and send new short urls

app.post('/' , (req,res)=>{
    
    // console.log(typeof req.body.longURL);
    let incomingURL = req.body.longURL;
    let outgoingURL = `http://localhost:${PORT}/${++code}`

    let shortURL = {
        long : incomingURL,
        short : outgoingURL
    }
    URLs.push(shortURL)
    console.log(URLs);

    //sending short url
    res.send(outgoingURL)
    
})

// get route for checking incoming shorturl exist in URLs array if yes then redirect to its long version

app.get('/:cd',(req,res)=>{
    let incomingURL = `http://localhost:${PORT}/${req.params.cd}`
    // console.log(incomingURL);
    URLs.forEach( (obj)=>{
        if(obj.short == incomingURL){
            res.redirect(`https://${obj.long}`)
            return
        }
    } )
    
})

app.listen(PORT , ()=>{
    console.log('listening on port: ', PORT);
    
})
