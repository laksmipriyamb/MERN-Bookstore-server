//import express
const express = require('express')
const userController = require('../controller/userController')
const bookController = require('../controller/bookController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')

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

//user edit - request body content is formdata
router.put('/user/:id/edit',jwtMiddleware,multerMiddleware.single('picture'),userController.updateUserProfileController)

//delete books 
router.delete('/books/:id',jwtMiddleware,bookController.deleteBookController)

//make payment
router.put('/books/:id/buy',jwtMiddleware,bookController.bookPaymentController)


//-----------------authorised admin--------------------
//get all books page
router.get('/admin-books/all',adminMiddleware,bookController.getAllBooksController)

//get all users - admin
router.get('/admin-users/all',adminMiddleware,userController.getAllUsersController)
//update book status
router.put('/books/:id/update',adminMiddleware,bookController.updateBookStatusController)


module.exports = router