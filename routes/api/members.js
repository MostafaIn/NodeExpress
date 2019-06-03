const express = require('express');
const router = express.Router();
const members = require('../../members');
const uuid = require('uuid');

// get all members
router.get('/', (req, res) => res.json(members));


// get single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `no member with the id of ${req.params.id}` });
    }
});

// create a new member
router.post('/', (req, res) => {
    // res.send(req.body)
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email
    }
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'please include a name and email.' });
    }
    members.push(newMember);
    res.json(members);
})

// update a member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        const updatedMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updatedMember.name ? updatedMember.name : member.name;
                member.email = updatedMember.email ? updatedMember.email : member.email;
                res.json({ msg: 'member is updated.', member });
            }
        })

    } else {
        res.status(400).json({ msg: `no member with the id of ${req.params.id}` });
    }
})

// delete member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json({
            msg: 'this member is deleted.', members:
                members.filter(member => member.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({ msg: `no member with the id of ${req.params.id}` });
    }
});



module.exports = router;