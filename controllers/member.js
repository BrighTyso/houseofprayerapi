

const handleMemberByDescription=(req,res,db)=>{
            // 6 digit pin
            const {input,userId} =req.body 


             return db.select('*').from('members').where("name","like",`%${input}%`).andWhere("userId","=",userId).then(data=>{

             res.json(data)

             }).catch(err=>res.json(err))
            
}


const handleMemberAdd=(req,res,db)=>{
        
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

}


const handleMemberGet=(req,res,db)=>{
        
         const {id} =req.params
    
        db.select('*').from('members').where("userId","=",id).then(data=>{

        return res.json(data)

        }).catch(err=>res.json(err))
    
}

module.exports={


	handleMemberByDescription,
	handleMemberAdd,
	handleMemberGet
}