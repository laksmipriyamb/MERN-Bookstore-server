//import express
const express = require('express')
const userController = require('../controller/userController')
const bookController = require('../controller/bookController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')

//create Router Object
const router = new express.Router()

//define path for client api request
//register
router.post('/register',userController.registerController)

//login
router.post('/login',userController.loginController)

//google login
router.post('/google/sign-in',userController.googleLoginController)

//get home books
router.get('/books/home',bookController.getHomePageBooksController)



//-----------------authorised user--------------------

//add book - request body content is form data
router.post('/user/book/add',jwtMiddleware,multerMiddleware.array('uploadImages',3),bookController.addBookController)

//get all books page
router.get('/books/all',jwtMiddleware,bookController.getUserAllBooksPageController)

//get all user uploaded books
router.get('/user-books/all',jwtMiddleware,bookController.getUserUploadBookProfilePageController)

//get all user bought books
router.get('/user-books/bought',jwtMiddleware,bookController.getUserBoughtBookProfilePageController)

//get book details by id
router.get('/book/:id/view',jwtMiddleware,bookController.getBookDetailsByIdController)


module.exports = router