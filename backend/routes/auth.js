import express from "express";
import { usersData } from "../data/user.js";
import jwt from "jsonwebtoken"
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
const JWT_SECRET = "MY_SECRET_KEY" 

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = usersData.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Sai email hoặc mật khẩu" });
  }

  const token = jwt.sign(
   {
      id: user.id,
      role: user.role
   },
   JWT_SECRET,
   {
    expiresIn: "1h"
   }
  );


  res.json({
    token,
    user: {
     id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
    }
   
  });
});

router.post("/register", (req, res) => {
  const {email, password, name} = req.body

  const exists = usersData.find((u) => u.email === email )
  if(exists) {
    return res.status(409).json({message: "Email đã tồn tại"})
   }  
   const newUser = {
    id: usersData.length + 1,
    name,
    email,
    password,
    role: "user"
   }

   const token = jwt.sign(
    {id:newUser.id},
    JWT_SECRET, 
    {expiresIn: "1h"}
   )


   usersData.push(newUser);

   res.status(201).json({
    token,
    message: "Đăng ký thành công",
     user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: "user"
     }
      
   })
} )

router.post("/logout", (req,res) => {
  res.json({message: "Đã đăng xuất"})

}  ) 

router.get("/me", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});



export default router;
