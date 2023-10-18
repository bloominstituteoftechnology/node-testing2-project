const express = require("express");
const UserData = require("./users.model");
const { validateId, validatePost, validatePut } = require('./users.middleware');

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const result = await UserData.getAll()
        res.status(200).json(result);
    } catch (err) {
        next(err)
    }
})

router.get("/:id", validateId, async (req, res, next) => {
    try {
        const result = await UserData.getById(req.params.id)
        res.status(200).json(result);
    } catch (err) {
        next(err)
    }
})

router.post("/", validatePost, async (req, res, next) => {
    try {
        const result = await UserData.add(req.body);
        res.status(201).json(result)
    } catch (err) {
        next(err)
    }
})

router.put("/:id", validateId, validatePut, async (req, res, next) => {
    try {
        const result = await UserData.update(req.params.id, req.body)
        res.status(200).json(result);
    } catch (err) {
        next(err)
    }
})

router.delete("/:id", validateId, async (req, res, next) => {
    try {
        const result = await UserData.remove(req.params.id)
        res.status(200).json(result);
    } catch (err) {
        next(err)
    }
})

module.exports = router;