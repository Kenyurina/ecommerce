'use strict'

const
    homeModels = require('../models/homeModels.js'),
    homeControllers = () => {}

homeControllers.getall = (req, res, next) => {
    res.render('home')
}

module.exports = homeControllers