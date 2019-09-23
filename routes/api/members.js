const uuid = require('uuid');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const newMemeberDebugger = require('debug')('app:newMember');
const express = require('express');
const router = express.Router();
const members = require('../../Members');



// Get All Members
router.get('/', (req, res, next) => {
    console.log('all members');
    dbDebugger('Connected to the database...');
    res.json(members);
    next();
});

// Get Single Member
router.get('/:id', (req, res, next) => {
    console.log('single member');
    startupDebugger('debug single memeber');
    const found = members.find(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({
            msg: `Member didn't found with the id of ${req.params.id}`
        });
    }
    next();
});

// Create member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        status: 'active'
    };
    newMemeberDebugger('new member sent', req.body);
    //res.send(req.body);
    if (!newMember.name) {
        return res.status(400).json({
            mes: "Please include name"
        });
    }
    members.push(newMember);
    res.json(members);
});

// Update Member
router.put('/:id', (req, res, next) => {
    console.log('single member updated');
    startupDebugger('debug single memeber updated');
    const found = members.find(member => member.id === parseInt(req.params.id));

    if (found) {
        const updMemeber = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updMemeber.name ? updMemeber.name : member.name;

                res.json({
                    msg: "Member updated",
                    member
                });
            }
        });
    } else {
        res.status(400).json({
            msg: `Member didn't found with the id of ${req.params.id}`
        });
    }
    next();
});

// Delete Member
router.delete('/:id', (req, res, next) => {
    console.log('delete member');
    startupDebugger('Delete memeber');
    const found = members.find(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json({
            msg: "Member deleted",
            members: members.filter(member => member.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({
            msg: `Member didn't found with the id of ${req.params.id}`
        });
    }
    next();
});


module.exports = router;