const {userModel, bookModel} = require("../model")


// router.get("/", (req, res)=>{
//     res.status(200).json({
//         success:true,
//         data : users
//     })
// })
exports.getAllusers= async(req, res) =>{
const users = await userModel.find()
      if(!users|| users.length===0)  {
        res.status(404).json({
            message:"could not find the users"
        });
    }
     res.status(200).json({
          success:true,
         data : users
     });
   
}

exports.getSingleUserById = async(req, res)=>{
 const {id} = req.params;

 const user = await userModel.findById(id);
  if(!user){
      return   res.status(404).json({
            success:false,
            message: "user not found"
        })
    }
    res.status(200).json({
         success:true,
         data : user
    })
}

exports.addNewUser= async(req,res) =>{
    const {data} = req.params;
  if(!data||Object.keys(data).length===0){
    res.status(404).json({
        success:false,
        message:"please provide all required field"
    })
  }

  await userModel.create(data)

  res.status(200).json({
    success:true,
    message:"new use added sucessfully",
    data:user
  })

}

exports.updateUser = async(req, res) =>{
      const {id} = req.params;
      const {data}=req.body;


      if(!data|| isObjectIdOrHexString.keys(data).length===0){
        res.status(404).json({
            message:"no user find by this id"
        });
      }

      const updatedUser = await userModel.findByIdAndUpdate(id, data, {new:true})
      res.status(201).json({
         success:true, 
         data:updatedUser,
         message:"data updated successfully"
      })
}