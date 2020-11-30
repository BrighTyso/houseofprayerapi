const handleVideoAdd=(req,res,db)=>{
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
    

}


const handleVideoGet=(req,res,db)=>{
    const {userId,description,videoUrl}=req.body

    if (id===""|| address===""||country==="") {
        res.send("cannot update user")

    } else {

        return db.select('*').from('videos').then(data=>{

        res.json(data)

        }).catch(err=>res.json(err))

    }


}

module.exports={

  handleVideoAdd,
  handleVideoGet
}