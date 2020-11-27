

const express=require('express')
const bodyparser=require('body-parser')
const cors=require('cors')
const knex=require('knex')
//const bcrypt=require('bcrypt')


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


 return db.select('*').from('users').then(data=>{

    res.json(data)

  }).catch(err=>res.json(err))


})


// registering a new user or company
app.post("/register",(req,res)=>{


//const hash=bcrypt.hashSync(pass)

const {email,phoneNumber,password,displayName}=req.body

if (email==="" ||phoneNumber===""||password==="") {
    res.send("fields cannot be empty")


   } else {

    db.transaction(trx=>{

     trx.insert({
          phoneNumber:phoneNumber,
          email:email,
          password:password

     }).into('login')
     .returning('email')
     .then( logEmail=>{

         return trx('users').
         insert({

      displayName:displayName,
      phoneNumber:phoneNumber,
      location:"",
      image:"",
      email:email,
      accountType:true,
      join_at:new Date()
  
  }).then(response=>{


        db.select('*').from('users').where('id','=',response[0]).then(data=>{
    


       res.json(response[0])
        
        
    })
  }).
then(trx.commit)
.catch(trx.rollback)

}
      
    
        )


    })

}

})


// user login 
app.post("/signin",(req,res)=>{
const {email,password}=req.body

	if (email==="" || password==="") {

      res.json("failed")

	   }else{

     db.select('*').from('login').where('email','=',email).andWhere('password','=',password).then(data=>{


       if (data.length===0) {

         res.json("not found")
       } else {

         res.json(data)
       }
       

       }).catch(err=>res.json(err))
 
	  }   

})


//update user profile
app.post("/addEvent",(req,res)=>{
	const {userId,description,register,eventDate}=req.body

	if (userId===""|| description===""||register==="") {
		res.send("cannot update user")

	    } else {


        db('events').insert({
       
           userId :userId,
           description:description,
           register:register,
           eventDate:new Date()
              

        }).then(result=>{

          if(result.length===0){


          }else{

             res.json(result)
          }


        }).catch(err=>res.json(err))

		// return db.select('*').from('users').then(data=>{

       //   res.json(data)

       //  }).catch(err=>res.json(err))

	}


})



//update user profile
app.get("/getEvents",(req,res)=>{
    const {userId,address,country}=req.body

    if (UserId===""|| address===""||country==="") {
        res.send("cannot update user")

    } else {

      return db.select('*').from('events').then(data=>{

     res.json(data)

  }).catch(err=>res.json(err))

    }


})




//get user receipts from database
app.post("/addFinance",(req,res)=>{

	   // 6 digit pin

       const {name,surname,phoneNumber,amount,purpose,paymentMethod,income_payment,record_date,userId} =req.body 

       if (name==="" || surname===""||amount==="") {

	      res.send("some fields are empty")

       } else {

        db('finance').insert({


         userId:userId,
         name:name,
         surname:surname,
         phoneNumber:phoneNumber,
         amount:amount,
         purpose:purpose,
         paymentMethod:paymentMethod,
         income_payment:income_payment,
         record_date:record_date,
         date:new Date()

        }).then(result=>{
          console.log(new Date())

            if(result.length===0){

              res.json("")
            }else{

            res.json(result)

            }
           

        }).catch(err=>res.json("failed to insert data"))
       }

       

})



//get user receipts from database
app.get("/getFinance/:id",(req,res)=>{

       const {id} =req.params 
     
       if (id==="") {

          res.send("could not retrieve data ")

       } else {

             return db.select('*').from('finance').where("userId","=",id).then(data=>{

             res.json(data)

             }).catch(err=>res.json("failed to retrieve data"))
       }

})


app.post("/getFinanceByDate",(req,res)=>{

       // 6 digit pin

       const {start,end,input,userId} =req.body 


       if (input==="") {

       return db.select('*').from('finance').whereBetween("record_date",[start,end]).andWhere("userId","=",userId).then(data=>{

       res.json(data)

       }).catch(err=>res.json(err)) 

       }else{


      return db.select('*').from('finance').whereBetween("record_date",[start,end]).andWhere("name","like",`%${input}%`)
      .orWhere("surname","like",`%${input}%`)
      .orWhere("purpose","like",`%${input}%`).orWhere("paymentMethod","like",`%${input}%`).orWhere("phoneNumber","like",`%${input}%`).andWhere("userId","=",userId).then(data=>{

       res.json(data)

       }).catch(err=>res.json(err)) 


       }

})



app.post("/getFinanceByDescription",(req,res)=>{

       // 6 digit pin

             const {input,userId} =req.body 

             return db.select('*').from('finance').where("name","like",`%${input}%`).andWhere("userId","=",userId).then(data=>{

             res.json(data)


             }).catch(err=>res.json(err))

})


app.put("/updateFinance",(req,res)=>{


    const {userId} =req.body
    res.json(`its working ${userId}`)

})

app.post("/getMemberByDescription",(req,res)=>{

            // 6 digit pin

            const {input,userId} =req.body 


             return db.select('*').from('members').where("name","like",`%${input}%`).andWhere("userId","=",userId).then(data=>{

             res.json(data)

             }).catch(err=>res.json(err))
             
   

})



//create a new receipt 
app.post("/addMember",(req,res)=>{
        
    const {name, surname,ageCategory,phoneNumber,email, location,occupation,maritalStatus,userId} =req.body

     if (name===""||surname===""||userId==="") {
	    res.send("name or email is empty")
     } else {

	   db('members').insert({
       
         name:name,
         surname:surname,
         ageCategory:ageCategory,
         phoneNumber:phoneNumber,
         email:email,
         location:location,
         occupation:occupation,
         userId:userId,
         date:new Date()
              

        }).then(result=>{

            res.json(result)

        }).catch(err=>res.json(err))
       }

})

 
app.get("/getMembers/:id",(req,res)=>{
        
         const {id} =req.params
    
        db.select('*').from('members').where("userId","=",id).then(data=>{

        return res.json(data)

        }).catch(err=>res.json(err))
    
})



app.post("/addAudio",(req,res)=>{
    const {userId,description,audioUrl}=req.body

    if (userId===""|| description===""||audioUrl==="") {
        res.send("cannot update user")

    } else {

        db('audios').insert({
       
           userId :userId,
           description:description,
           audioUrl:audioUrl,
           date:new Date()
              

        }).then(result=>{

            res.json(result)

        }).catch(err=>res.json(err))
       }

    


})



//update user profile
app.get("/getAudios",(req,res)=>{
    const {id,userId,description,audioUrl}=req.body

    if (id==="") {
        res.send("cannot update user")

    } else {

         return db.select('*').from('audios').then(data=>{

        res.json(data)

        }).catch(err=>res.json(err))

    }


})


//add new video
app.post("/addVideo",(req,res)=>{
    const {userId,description,videoUrl}=req.body

    if (userId===""|| description===""||videoUrl==="") {
        res.send("cannot update user")

    } else {

       db('videos').insert({
       
           userId :userId,
           description:description,
           videoUrl:videoUrl,
           date:new Date()

        }).Where("id","=",userId).then(result=>{

            res.json(result)

        }).catch(err=>res.json(err))
       }
    


})



//update user profile
app.get("/getVideos",(req,res)=>{
    const {userId,description,videoUrl}=req.body

    if (id===""|| address===""||country==="") {
        res.send("cannot update user")

    } else {

        return db.select('*').from('videos').then(data=>{

        res.json(data)

        }).catch(err=>res.json(err))

    }


})


app.post("/following",(req,res)=>{

    const {followee,follower} =req.body

    db('following').insert({
       
            followee :followee,
            follower:follower,
           
        }).then(result=>{

            res.json(result)

        }).catch(err=>res.json(err))
       
})


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