const handleFollow=(req,res,db)=>{

    const {followee,follower} =req.body

    db('following').insert({
       
            followee :followee,
            follower:follower,
           
        }).then(result=>{

            res.json(result)

        }).catch(err=>res.json(err))
       
}

module.exports={


	handleFollow
}