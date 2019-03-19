const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')
const Joi = require('joi')
const cors = require('cors')

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const app = express();
app.use(bodyParser.json());
app.use(cors())

const db = require('./models/index').sequelize

const College = require('./models').College
const Student = require('./models').Student
const University = require('./models').University

const Sequelize = require('sequelize')
const Op = Sequelize.Op;

app.get('/', (req, res) => {
    res.end('yash')
})

app.get('/get-college', (req, res) => {
    College.findAll({
        where: []
    }).then(clg => {
        res.send(clg)
    })
})

app.post('/add-college', (req, res) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        city: Joi.string().required(),
        rating: Joi.number().positive().max(10)
    })
    const {value, error} = Joi.validate(req.body, schema)
    if(error){
        return res.send({error:error})
    }
    College.build({
        name: req.body.name,
        city: req.body.city,
        rating: req.body.rating
    })
    .save()
    .then(() => console.log('worked!'))
    res.send(req.body)
})

app.get('/get-college/:clgid', (req, res) => {
    console.log(req.params.clgid)
    College.findOne({
        where: {
            id : req.params.clgid
        }
    }).then(person => {
        console.log(person)
        res.send(person)
    })
})

app.get('/get-p-clgs', (req, res) => {
    College.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        where: {
            rating: {
                [Op.gt]: 9
            }
        }
    }).then(clg => {
        res.send(clg)
    })
})

app.post('/add-student', (req, res) => {
    console.log(req.body.collegeId)
    Student.build({
        name: req.body.name,
        age: req.body.age,
        phone: req.body.phone,
        collegeId: req.body.collegeId
    })
    .save()
    .then(() => {
        res.send({success: 'success'})
    })
    .catch(err => {
        res.send({err: err})
    })
})

app.get('/get-c-s/:clgid', (req, res) => {
    Student.findAll({
        where: {
            collegeId: req.params.clgid
        },
        include: [
            {
                model: College, 
                as: "College",
                attributes: ['name', 'city'],
                include: [
                    {
                        model: University,
                        as: "University"
                    }
                ]
            }
        ]
    })
    .then(clg => res.send(clg))
    .catch(err=> res.send({err:err}))
})

app.post('/add-uni', (req, res) => {
    University.build({
        name: req.body.name,
        region: req.body.region
    })
    .save()
    .then(()=> res.send({success: 'success'}))
    .catch(err => res.send({err: err}))
})

app.post('/add-uni-clg', (req, res) => {
    University.create({
        name: 'Thane Uni',
        region: 'Thane'
    })
    .then(uni => {
        uni.createCollege({
            name: 'TU',
            city: 'Thane',
            rating: 7
        })
        .then(clg => {
            clg.createStudent({
                name: 'Raj',
                age: 19,
                phone: 9090909,
            })
        })
    })
    .then(()=> res.send({success: 'success'}))
    .catch(err => res.send({err: err}))
})

app.put('/update-student-name', (req, res) => {
    Student.update({
        name: req.body.name,
    },{
        where : {
            id: req.body.id
        }
    })
    .then(()=> res.send({success: 'success'}))
    .catch(err => res.send({err: err}))
})

app.get('/get-raw-students', (req, res) => {
    db.query('SELECT * FROM `Students`', {type: Sequelize.QueryTypes.SELECT})
    .then(students => res.send(students))
    .catch(err => res.send({err: err}))
})

app.test = () => {
    return 'Hello'
}

app.put('/update-uni-name', (req,res) => {
    University.update({
        name: req.body.name
    },{
        where: {
            id: req.body.id
        }
    })
    .then(() => res.send({success: 'success'}))
    .catch(err => res.send({err:err}))
})


const port = 5003;

app.listen(port, () => {
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument)),
    `Server started on port ${port}`
})

module.exports = app