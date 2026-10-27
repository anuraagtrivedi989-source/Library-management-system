const express = require("express")

const {userModel} = require("../model")

const {getAllusers, getSingleUserById, addNewUser,updateUser} = require("../controllers/user_controllers")

const router = express.Router();


// router.get("/", (req, res)=>{
//     res.status(200).json({
//         success:true,
//         data : users
//     })
// })
router.get("/", getAllusers);
/**
 * Route : /users/:id
 * Method: GET
 * Description: Find a user by ID
 * Scope: public
 * params: id
 */


// router.get("/:id", (req, res)=>{

//     const {id} = req.params;
//     const user = users.find((each)=> each.id===id);

//     if(!user){
//       return   res.status(404).json({
//             success:false,
//             message: "user not found"
//         })
//     }
//     res.status(200).json({
//          success:true,
//          data : user
//     })

   
// })
router.get("/:id", getSingleUserById);



/**
 * Route : /users
 * Method: POST
 * Description:crete/register a new user
 * Scope: public
 * params: None
 */

router.use(express.json());
// router.post("/", (req, res)=>{
      

//     const {id, name, email, subscriptionType, subscriptionDate} = req.body;

//     if(!id || !name || !email || !subscriptionType || !subscriptionDate){
//         res.status(404).json({
//             success:false,
//             message:"please provide all the required field"
//         })
//     }
//     const user = users.find((each)=> each.id === id)
//     if(user){
//         res.status(409).json({
//             success:false,
//            message: "User Already Exist"
//         })
//     }
//     user.push({
//         id, 
//         name,
//         email,
//         subscriptionType, 
//         subscriptionDate
//     })
//     res.status(201).json({
//         success:true,
//         message:"user created successfully"
//     })
// })
router.post("/", addNewUser);



/**
 * Route : /users/:id
 * Method: PUT
 * Description:update some data
 * Scope: public
 * params: None
 */

// router.put("/:id", (req, res)=>{
//     const {id} = req.params;
//     const {data} = req.body;

//     const user = users.find((each) =>each.id === id)
//     if(!user){
//         return res.status(404).json({
//             success:false,
//             message: "User not found"
//         })
//     }
//     const updatedUser = users.map((each)=>{
//         if(each.id===id){
//             return {
//                 ...each,
//                 ...data,
//             }
//         }
//         return each
//     })
//     // Object.assign(user, data)
//     res.status(200).json({
//         success: true,
//         data:updatedUser,
//         message: "user updated successfully",
     
//     })
// })

router.put("/:id", updateUser)


/**
 * Route : /users/:id
 * Method: DELETE
 * Description:deleting a user by its id
 * Scope: public
 * params: None
 */

router.delete("/:id", (req, res)=>{
    const {id} = req.params;

    const user = users.find((each)=> each.id===id)
    if(!users){
        res.status(404).json({
            success: false,
            message: "User not found"
        })
    }

    const updatedUser = users.filter((each)=> each.id !==id)
    res.status(200).json({
        success:true,
        data: updatedUser,
        message: "user deleted successfully"
    })
});

router.get("/subscription-details/:id", (req, res)=>{
    const {id} = req.params;

    const user = users.find((each)=> each.id===id)
    if(!user){
        return res.status(404).json({
            success: false,
            message: "user not found"
        })
    }
    const getDateInDays = (data = " ") =>{
        let date;
        if(data){
            date = new Date(data);
        }
        else {
            date = new Date();
        }
        let days = Math.floor(Date/(1000*60*60*24));
        return days;
    }

    const subscriptionType= (date) =>{
        if(user.subscriptionType === "Basic"){
            date = date+ 90
        }
        else if(user.subscriptionType=== "Standard"){
            date = date+ 180
        }
        else if(user.subscriptionType === "Premium"){
            date = date+ 365
        }
        return date;
    }

    let returnDate = getDateInDays(user.returnDate)
    let currDate = getDateInDays()
    let subscriptionDate = getDateInDays(user.subscriptionDate)
    let subscriptionExpiration = subscriptionType(subscriptionDate)

    const data = {
        ...user,
        subscriptionExpired: subscriptionExpiration < currDate,
        subscriptionLeft: subscriptionExpiration - currDate,
        daysLeftForExpiration: returnDate - currDate,
        returnDate: returnDate < currDate ? "book is overdue" : returnDate,
        fine :  returnDate < currDate ? subscriptionEcpiration <= currDate ? 200:100:0
    }

    res.status(200).json({
        success: true,
        data: data
    })
})

module.exports = router;