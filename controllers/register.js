

 const handleRegister=(req,res,db)=>{

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

}

module.exports={

handleRegister

}