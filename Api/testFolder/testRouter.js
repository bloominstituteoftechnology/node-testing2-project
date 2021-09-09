const express = require('express');
const router = express.Router();
const Member = require('./testModel')

router.delete('/:id', async (req,res) =>{
    const id = req.params.id
    const deleteMember = Member.delMember(id)
    res.status(200).json(deleteMember)
})

module.exports = router