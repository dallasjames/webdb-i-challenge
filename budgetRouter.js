const express = require("express")
const db = require("./data/dbConfig")

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        if (!req.query.limit || !req.query.name || !req.query.order) {
            res.json(await db("accounts"))
        } else {
            res.json(await db("accounts")
            .orderBy(req.query.name.toString(), req.query.order.toString())
            .limit(req.query.limit))
        }
    } catch(err) {
        next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        res.json(await db("accounts").where("id", req.params.id))
    } catch(err) {
        next(err)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const payload = {
            id: req.body.id,
            name: req.body.name,
            budget: req.body.budget
        }
        const [id] = await db("accounts").insert(payload)
        res.json(id)
    } catch(err) {
        next(err)
    }
})

router.put("/:id", async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }
        await db("accounts").where("id", req.params.id).update(payload)
        res.json(await db("accounts").where("id", req.params.id).first())
    } catch(err) {
        next(err)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        await db("accounts").where({ id: req.params.id }).del()
        res.status(204).end()
    } catch(err) {
        next(err)
    }
})

module.exports = router