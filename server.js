
const express=require('express')
const bodyparser=require('body-parser')
const cors=require('cors')
const knex=require('knex')
const bcrypt=require('bcrypt')
const register=require("./controllers/register")
const signin=require("./controllers/signin")
const events=require("./controllers/events")
const finance=require("./controllers/finance")
const member=require("./controllers/member")
const audio=require("./controllers/audio")
const video=require("./controllers/video")


const db=knex({

client:'sqlite3',
connection:{
    filename:"./houseofprayer.sqlite"
}

})

const app=express();
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(cors())



app.get("/",(req,res)=>{


  res.json("its working")

/*
 return db.select('*').from('users').then(data=>{

    res.json(data)

  }).catch(err=>res.json(err))
  */


})

// registering a new user or company
app.post("/register",(req,res)=>{register.handleRegister(req,res,db)
//const hash=bcrypt.hashSync(pass)
})
app.post("/signin",(req,res)=>{signin.handleSignin(req,res,db)})
app.post("/addEvent",(req,res)=>{events.handleEventAdd(req,res,db)})
app.get("/getEvents",(req,res)=>{events.handleEventGet(req,res,db)})
app.post("/addFinance",(req,res)=>{finance.handleFinance(req,res,db)})
app.get("/getFinance/:id",(req,res)=>{finance.handleFinanceGet(req,res,db)})
app.post("/getFinanceByDate",(req,res)=>{finance.handleFinanceByDate(req,res,db)})
app.post("/getFinanceByDescription",(req,res)=>{finance.handleFinanceByDescription(req,res,db)})
app.put("/updateFinance",(req,res)=>{finance.handleFinanceUpdate(req,res,db)})
app.delete("/deleteFinance",(req,res)=>{finance.handleFinanceDelete(req,res,db)})
app.post("/getMemberByDescription",(req,res)=>{member.handleMemberByDescription(req,res,db)})
app.post("/addMember",(req,res)=>{member.handleMemberAdd(req,res,db)})
app.get("/getMembers/:id",(req,res)=>{member.handleMemberGet(req,res,db)})
app.post("/addAudio",(req,res)=>{audio.handleAudioAdd(req,res,db)})
app.get("/getAudios",(req,res)=>{audio.handleAudioGet(req,res,db)})
app.post("/addVideo",(req,res)=>{video.handleVideoAdd(req,res,db)})
app.get("/getVideos",(req,res)=>{video.handleVideoGet(req,res,db)})
app.post("/following",(req,res)=>{follow.handleFollow(req,res,db)})



app.post("/eventReg",(req,res)=>{

    const {eventId,userId,name,surname} =req.body

    db('eventRegistration').insert({
       
            eventId :eventId,
            userId:userId,
            name :name,
            surname:surname,
            date:new Date()
           
        }).then(result=>{

            res.json(result)

        }).catch(err=>res.json(err))
       
})


app.get("/getEventRegisteredUsers",(req,res)=>{

    const {eventId,userId} =req.body

     return db.select('*').from('eventRegistration').where('eventId','=',eventId).then(data=>{

        res.json(data)

        }).catch(err=>res.json(err))
       
})
        


//
// returning receipt 
app.post("/financeSearch",(req,res)=>{
	const {userId } =req.body

 return db.select('*').from('users').then(data=>{

        res.json(data)

        }).catch(err=>res.json(err))

})


// should be inside each method(trunsaction of every successful action))
// system history
app.get("/history",(req,res)=>{
	const {userId}=req.body

 return db.select('*').from('users').then(data=>{

        res.json(data)

        }).catch(err=>res.json(err))

})



// give users rights to use your id and profile for the company bt u have the right to remove thm
app.post("/companyright",(req,res)=>{
	const {userId , rightsTo}=req.body

 return db.select('*').from('users').then(data=>{

        res.json(data)

        }).catch(err=>res.json(err))

})

app.listen(3001); 