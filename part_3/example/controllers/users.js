const router = require('express').Router()
const {tokenExtractor} = require('../utils/middleware')

const { User, Note, Team } = require('../models')

router.get('/', async (req, res) => {
  let users 

  if (req.query.admin) {
    users = await User.scope('admin').findAll()
  } else if (req.query.disabled) {
    users = await User.scope('disabled').findAll()
  } else if (req.query.name) {
    users = await User.scope({ method: ['name', '%' + req.query.name + '%'] }).findAll()
  } else if (req.query.limit) {
    users = await User.with_notes(parseInt(req.query.limit))
  } else {
    users = await User.findAll({
      include: [
          {
            model: Note,
            attributes: { exclude: ['userId'] }
        },
        {
          model: Team,
          attributes: ['name', 'id'],
          through: {
            attributes: []
          }
        }
      ]
    })
  }

  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: [''] } ,
    include:[{
        model: Note,
        attributes: { exclude: ['userId'] }
      },
      {
        model: Note,
        as: 'marked_notes',
        attributes: { exclude: ['userId']},
        through: {
          attributes: []
        },
        include: {
          model: User,
          attributes: ['name']
        }
      },
      // {
      //   model: Team,
      //   attributes: ['name', 'id'],
      //   through: {
      //     attributes: []
      //   }
      // },
    ]
  })

  // if (user) {
  //   // res.json({
  //   //   username: user.username,
  //   //   name: user.name,
  //   //   note_count: user.notes.length
  //   // })
  //   res.json(user)
  // } else {
  //   res.status(404).end()
  // }

  if (!user) {
    return res.status(404).end()
  }

  let teams = undefined
  if (req.query.teams) {
    teams = await user.getTeams({
      attributes: ['name'],
      joinTableAttributes: []  
    })
  }

  let notes_count = undefined
  if (req.query.count) {
    notes_count = await user.number_of_notes()
  }

  res.json({ ...user.toJSON(), notes_count, teams })
})

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id, {
    include: {
      model: Note
    }
  })
  if (!user.admin) {
    return res.status(401).json({ error: 'operation not allowed' })
  }
  next()
}

router.put('/:username', tokenExtractor, isAdmin, async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username
    }
  })

  if (user) {
    user.disabled = req.body.disabled
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router