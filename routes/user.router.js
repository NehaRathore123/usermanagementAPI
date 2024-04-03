import express from 'express';

const router = express.Router();
//to link controller
import * as usercontroller from '../controller/user.controller.js';

router.post("/save",usercontroller.save);

router.post("/login",usercontroller.login);

router.get("/fetch",usercontroller.fetch);

router.delete("/delete",usercontroller.deleteuser);

router.patch("/update",usercontroller.updateUser);

export default router;


