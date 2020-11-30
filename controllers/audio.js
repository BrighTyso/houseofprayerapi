const handleAudioAdd=(req,res)=>{
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

}



const handleAudioGet=(req,res)=>{
    const {id,userId,description,audioUrl}=req.body

    if (id==="") {
        res.send("cannot update user")

    } else {

         return db.select('*').from('audios').then(data=>{

        res.json(data)

        }).catch(err=>res.json(err))

    }


}

module.exports={

  handleAudioAdd,
  handleAudioGet

}