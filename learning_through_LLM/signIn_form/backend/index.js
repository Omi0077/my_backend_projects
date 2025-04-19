import express from 'express'
import cors from 'cors'

const PORT = 8000

const app = express()


app.use(cors({
    origin: 'http://localhost:5500',
    // credentials: false
}))

app.use(express.urlencoded({extended:true}))

let users = []

app.post('/reg' , (req,res)=>{
    const userName = req.body.uName
    const password = req.body.password
    const user = {
        uName : userName,
        pword : password
    }
    users.push(user)
    console.log(users);

    res.send('user registered')
})

app.listen(PORT , ()=>{
    console.log('listening on port:' , PORT);
})
