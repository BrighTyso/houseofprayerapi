const handleEventAdd=(req,res,db)=>{
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


}


const handleEventGet=(req,res,db)=>{
    const {userId,address,country}=req.body

    if (UserId===""|| address===""||country==="") {
        res.send("cannot update user")

    } else {

      return db.select('*').from('events').then(data=>{

     res.json(data)

  }).catch(err=>res.json(err))

    }


}

module.exports={

  handleEventAdd,
  handleEventGet
}