const handleSignin=(req,res,db)=>{
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

}

module.exports={
  handleSignin
}