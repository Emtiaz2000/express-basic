const express = require('express')
const path = require('path')
const app =  express();
const morgan = require('morgan')




// middleWereFunction
// app.use((req,res,next)=>{
//     req.massage = "hello"
//     // res.send("hello from block server") ====> block every server request or finish the request;
//     next() //===>allow to access the value and don't end the request 
// })

const middeleWere = (req,res,next)=>{  //===> only abailable in paticular function where i use it after the path 
    req.massage = 'hello'                 
    next()                     
}

//creating server
app.get('/',middeleWere,(req,res)=>{
    const absolutePath = path.resolve('view','welcome.html')
    console.log(req.massage)
    res.sendFile(absolutePath,(err)=>{
        console.log(err)
    })
})
// app.get('/home',(req,res)=>{
//     console.log(req.query)
//     const name = req.params.name;
//     res.send(`welcome ${name}`)
// })
app.get('/home',(req,res)=>{
    console.log(req.query)
    const name = req.query.firstName || 'emon';
    res.send(`welcome ${name}`)
})
//req.query value is after(?value)  and req.params value is after the website like(www.---- .con/value)
app.get('/greet/:name',(req,res)=>{
    const name = req.params.name ;
    const massage = {
        fr:"Bunjour",
        span:'Hola'
    }
    const greet = req.query.ln ? massage[req.query.ln] : "Hello"
    res.send(`${greet} ${name}`)
})



//not found

app.get('*',(req,res)=>{
    res.status(404).send('404 No Page Found!')
})

app.listen(3000,()=>{
    console.log('server is lisening')
})
