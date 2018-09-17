const express = require('express');
const storeController = require('../controllers/storeController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

const router = express.Router();

router.get('/', catchErrors(storeController.getStores));

router.get('/account', authController.isLoggedIn, userController.account);

router.get('/add', authController.isLoggedIn, storeController.addStore);

router.get('/login', userController.loginForm);

router.get('/logout', authController.logout);

router.get('/register', userController.registerForm);

router.get('/stores', catchErrors(storeController.getStores));

router.get('/stores/:id/edit', catchErrors(storeController.editStore));

router.get('/store/:slug', catchErrors(storeController.getStoreBySlug));

router.get('/tags', catchErrors(storeController.getStoresByTag));

router.get('/tags/:tag', catchErrors(storeController.getStoresByTag));

router.post('/account', catchErrors(userController.updateAccount));

router.post('/add',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.createStore));

router.post('/add/:id',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.updateStore));

router.post('/register',
  userController.validateRegister,
  userController.register,
  authController.login);

router.post('/login', authController.login);

module.exports = router;
