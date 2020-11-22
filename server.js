

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




const user={

	name:'bright',
	surname:'kaponda'

   }


  const database={
     users: [{

         id:"1",
         displayName:"Bright kaponda",
         phoneNumber:"0784428797",
         email:"brightkaponda96@gmail.com",
         accountType:"" , // 1 for admin 0 for ordinary user
         joined:new Date()

     }],

      login: [{

         id:"1",
         phoneNumber:"0784428797",
         email:"brightkaponda96@gmail.com",
         password:"bright", 
         loggedIn:"",// int 
         numberofLoggedDevices:"" ,// int 
         // 1 for admin 0 for ordinary user
         joined:new Date()

     }]
     ,events:[{

         id:"1",
         userId:"",
         description:"",
         register:"",
         edate:"",
         day:"",
         month:"",
         year:"",
         date:new Date()
         
     }],

       finance:[{

         id:"1",
         userId:"",
         name:"",
         surname:"1",
         phoneNumber:"",
         amount:"",
         purpose:"",
         pay_method:"1",
         income_payment:"",
         date:new Date()

     }],
     history:[{

         id:"1",
         userId:"1",
         description:"",
         actionBy:"",
         date:new Date()

     }]
     ,
     following:[{

         id:"1",
         followee:"",
         follower:"",
         date:new Date()

     }]
     ,
     audios:[{

         id:"1",
         userId:"",
         audioUrl:"",
         description:"",
         date:new Date()

     }]
     ,
     videos:[{

         id:"1",
         userId:"",
         audioUrl:"",
         description:"",
         date:new Date()

     }]

      ,
     members:[{

         id:"1",
         name:"",
         surname:"",
         ageCategory:"",
         phoneNumber:"",
         email:"",
         houseNumberlocation:"",
         workStatus:"",
         maritalStatus:"",
         date:new Date()

     }]

}



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

       res.json("success")



        db.select('*').from('users').where('id','=',response[0]).then(data=>{
        console.log(data[0])
        
        
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


       console.log(data)

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
	const {userId,description,register,eventDate,userId}=req.body

	if (userId===""|| description===""||register==="") {
		res.send("cannot update user")

	} else {


        db('events').insert({
       
           userId :userId,
           description:description,
           register:register,
           eventDate:new Date()
              

        }).then(result=>{

            res.json(result)

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

       if (phoneNumber==="") {

	      res.send("receipt")

       } else {

        db('finance').insert({

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

            res.json(result)

        }).catch(err=>res.json(err))
       }

       

})



//get user receipts from database
app.get("/getFinance",(req,res)=>{

       // 6 digit pin

       const {phoneNumber,pin,userId} =req.body 

       if (phoneNumber===""|| pin==="") {

          res.send("receipt")

       } else {

         //   fetch("http:localhost:3001/generateReceipt")
         //   .then(result=>{
           //     result.json()
            //}).then( r=>console.log());

             return db.select('*').from('finance').then(data=>{

             res.json(data)

             }).catch(err=>res.json(err))

       }

       

})


app.post("/getFinanceByDate",(req,res)=>{

       // 6 digit pin

       const {start,end,userId} =req.body 

    

             return db.select('*').from('finance').whereBetween("record_date",[start,end]).then(data=>{

             res.json(data)

             console.log(data)

             }).catch(err=>res.json(err))

           

})



app.post("/getFinanceByDescription",(req,res)=>{

       // 6 digit pin

       const {input,userId} =req.body 

    

             return db.select('*').from('finance').where("name","like",`%${input}%`).then(data=>{

             res.json(data)

             console.log(data)

             }).catch(err=>res.json(err))

           

})



app.post("/getMemberByDescription",(req,res)=>{

            // 6 digit pin

            const {input,userId} =req.body 


             return db.select('*').from('members').where("name","like",`%${input}%`).then(data=>{

             res.json(data)

             console.log(data)

             }).catch(err=>res.json(err))
             
   

})



//create a new receipt 
app.post("/addMember",(req,res)=>{
        
    const {name, surname,ageCategory,phoneNumber,email, location,occupation,maritalStatus,userId} =req.body

     if (name===""||surname==="") {
	    res.send("receipt cannot be genarated")
     } else {

	   db('members').insert({
       
         name:name,
         surname:surname,
         ageCategory:ageCategory,
         phoneNumber:phoneNumber,
         email:email,
         location:location,
         occupation:occupation,
         date:new Date()
              

        }).then(result=>{

            res.json(result)

        }).catch(err=>res.json(err))
       }

})




//create a new receipt 
app.get("/getMembers",(req,res)=>{
        
    const {userId, phoneNumber,receiptNumber,descr_items, amount, pay_method,tax} =req.body

     if (userId===""||phoneNumber===""||amount===""||pay_method==="") {
        res.send("cannot process")
     } else {
       return db.select('*').from('members').then(data=>{

        res.json(data)

        }).catch(err=>res.json(err))
     }



})



//update user profile
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

    if (id===""|| address===""||country==="") {
        res.send("cannot update user")

    } else {

         return db.select('*').from('audios').then(data=>{

        res.json(data)

        }).catch(err=>res.json(err))

    }


})


//update user profile
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

        }).then(result=>{

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
	const {userId , rightsTo}

 return db.select('*').from('users').then(data=>{

        res.json(data)

        }).catch(err=>res.json(err))

})

app.listen(3001); 