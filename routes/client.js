const express = require('express');
const router = express.Router();

const clientRoutes = require('../controllers/client');
const isAuthRoute = require('../middlewares/is-auth');

router.get('/new-entry', isAuthRoute, clientRoutes.getNewEntry);

router.post('/new-entry', isAuthRoute, clientRoutes.postNewEntry);

router.get('/dashboard', isAuthRoute, clientRoutes.getDashboard);

router.get('/features',clientRoutes.getFeatures);

router.get('/new-product', isAuthRoute, clientRoutes.getNewProduct);

router.post('/new-product', isAuthRoute, clientRoutes.postNewProduct);

router.get('/new-customer', isAuthRoute, clientRoutes.getNewCustomer);

router.post('/new-customer', isAuthRoute, clientRoutes.postNewCustomer);

router.get('/customers', isAuthRoute, clientRoutes.getCustomers);

router.post('/customers', isAuthRoute, clientRoutes.postCustomers);

router.get('/update-price', isAuthRoute, clientRoutes.getUpdatePrice);

router.post('/update-price', isAuthRoute, clientRoutes.postUpdatePrice);

router.get('/payment', isAuthRoute, clientRoutes.getPayment);

router.post('/payment', isAuthRoute, clientRoutes.postPayment);

router.get('/bill', isAuthRoute, clientRoutes.getBills);

router.post('/bill', isAuthRoute, clientRoutes.postBills);

router.get('/new-bank', isAuthRoute, clientRoutes.getNewBank);

router.post('/new-bank', isAuthRoute, clientRoutes.postNewBank);

router.get('/general-customer', isAuthRoute, clientRoutes.getGeneralCustomer);

router.post('/general-customer', isAuthRoute, clientRoutes.postGeneralCustomer);

router.get('/add-firm', isAuthRoute, clientRoutes.getAddFirm);

router.post('/add-firm', isAuthRoute, clientRoutes.postAddFirm);

router.get('/general-firm', isAuthRoute, clientRoutes.getGeneralFirm);

router.post('/general-firm', isAuthRoute, clientRoutes.postGeneralFirm);

router.get('/purchase', isAuthRoute, clientRoutes.getPurchase);

router.post('/purchase', isAuthRoute, clientRoutes.postPurchase);

router.get('/daybook', isAuthRoute, clientRoutes.getDaybook);

router.post('/daybook', isAuthRoute, clientRoutes.postDaybook);

router.get('/slips', isAuthRoute, clientRoutes.getSlips);

router.get('/vehicles', isAuthRoute, clientRoutes.getVehicles);

router.get('/add-vehicle', isAuthRoute, clientRoutes.getAddvehicle);

router.post('/add-vehicle', isAuthRoute, clientRoutes.postAddvehicle);

router.get('/bill-vehicle', isAuthRoute, clientRoutes.getPrintVehicleWise);

router.post('/bill-vehicle', isAuthRoute, clientRoutes.postPrintVehicleWise);

router.post('/delete', isAuthRoute, clientRoutes.postDeletionEntry);

module.exports = router;