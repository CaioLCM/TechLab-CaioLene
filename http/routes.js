import { Router } from "express";

const router = Router();

router.post('/filmesPopulares', (req, res) => {
    console.log(req.body)
})

export default router;