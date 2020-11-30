const handleFinance=(req,res,db)=>{

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

}



const handleFinanceGet=(req,res,db)=>{

       const {id} =req.params 
     
       if (id==="") {

          res.send("could not retrieve data ")

       } else {

             return db.select('*').from('finance').where("userId","=",id).then(data=>{

             res.json(data)

             }).catch(err=>res.json("failed to retrieve data"))
       }

}


const handleFinanceByDate=(req,res,db)=>{

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

}

const handleFinanceByDescription=(req,res,db)=>{

       // 6 digit pin

     const {input,userId} =req.body 

     return db.select('*').from('finance').where("name","like",`%${input}%`).andWhere("userId","=",userId).then(data=>{

     res.json(data)


     }).catch(err=>res.json(err))

}



const handleFinanceUpdate=(req,res,db)=>{

   const {id,name,surname,phoneNumber,amount,purpose,paymentMethod,income_payment,record_date,userId} =req.body 
   
    db("finance").where("id","=",id).andWhere("userId","=",userId).update({

         userId:userId,
         name:name,
         surname:surname,
         phoneNumber:phoneNumber,
         amount:amount,
         purpose:purpose,
         paymentMethod:paymentMethod,
         income_payment:income_payment,
         record_date:record_date

    }).then(response=>{

      console.log(response)

       //res.json(`its working ${userId}`)

    })

}



const handleFinanceDelete=(req,res,db)=>{

  const {id}=req.body

   db("finance")
  .where("id","=",id)
  .del().then(response=>{

    res.json(response)

   console.log(response)

  }).
  catch(err=>{
    console.log(err)
  });


}

module.exports={

  handleFinance,
  handleFinanceGet,
  handleFinanceByDate,
  handleFinanceByDescription,
  handleFinanceUpdate,
  handleFinanceDelete
}