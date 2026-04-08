import express from "express"
import { usersData } from "../data/user.js"

const router = express.Router();

router.get("/", (req,res) => {
    res.json(usersData)
}  )

router.get("/:id", (req, res) => {
    const user = usersData.find(u => u.id == req.params.id)
    res.json(user)
})

router.post("/", (req, res) => {
    const newUser= {
        id: Date.now(),
        ...req.body
    };
    usersData.push(newUser)
    res.json(newUser)
})

router.delete("/:id", (req,res) => {
    const index = usersData.findIndex(u => u.id == req.params.id );
   if (index === -1) {
    return res.status(404).json({ message: "User not found" });
}
    usersData.splice(index , 1);
    res.json({message: "Deleted"})
});

export default router;