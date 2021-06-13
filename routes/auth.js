const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { check, validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')


// @route   POST /api/auth
// @desc    Auth user && return token
// @access  Public
router.post('/', 
[
  check('email', 'Please use a valid email').isEmail(),
  check('password', 'Please use password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })

  } else {
    const {email, password} = req.body

    try {
      const user = await User.findOne({ email })
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
          return res.status(400).json({
            msg: 'Invalid password'
          })
        }

        const payload = {
          user: {
            id: user.id,
          }
        }
  
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
          if (err) {
            throw err;
          } else {
            return res.json({
              token
            })
          }
        })

      } else {
        return res.status(400).json({
          mgs: 'Email has not been registered'
        })
      }

    } catch (err) {
      console.error(err.message)
      return res.status(500).send('server error')
    }
  }
  
})

// @route   GET /api/auth
// @desc    Get user info after login
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)

  } catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
})


module.exports = router;