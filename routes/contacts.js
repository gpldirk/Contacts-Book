const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator/check')
const Contact = require('../models/Contact')

// @route   GET /api/contacts
// @desc    Get all contacts for one user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // find all contacts of one user and sort by date
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 }) 
    res.json(contacts)

  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})


// @route   POST /api/contacts
// @desc    Create one contact for one user
// @access  Private
router.post('/', auth, [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Email is required').isEmail(),

], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    })
  }

  const {name, email, phone, type} = req.body
  try {
    const newContact = new Contact({
      name, email, phone, type, user: req.user.id  // user -> id
    })

    const contact = await newContact.save()
    res.json(contact)

  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }

})

// @route   DELETE /api/contacts/:id
// @desc    Delete one contact for one user
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  const id = req.params.id

  try {
    await Contact.findOneAndDelete({_id: id, user: req.user.id})
    res.json({
      msg: 'Contact deleted'
    })
    
  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')

  }
})


// @route   PUT /api/contacts/:id
// @desc    Update one contact for one user
// @access  Private
router.put('/:id', auth, [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Email is required').isEmail(),

], async (req, res) => {
  const id = req.params.id
  const {name, email, phone, type} = req.body
  const updatedContact = {}

  updatedContact.name = name
  updatedContact.email = email
  if (phone) updatedContact.phone = phone
  if (type) updatedContact.type = type

  try {
    let contact = await Contact.find({_id: id, user: req.user.id})
    if (contact) {
      contact = await Contact.findByIdAndUpdate(id, { $set: updatedContact }, { new: true })
      res.json(contact)

    } else {
      res.status(400).json({
        msg: "Contact does not exist"
      })
    }

  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})


module.exports = router;