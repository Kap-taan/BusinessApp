const User = require("../models/user");
const Entry = require('../models/entry');
const Generalcustomer = require('../models/generalcustomer');
const Generalfirm = require('../models/generalfirm');
const Purchase = require('../models/purchase');
const Vehicle = require('../models/vehicle');

const mongoose = require('mongoose');

exports.getDashboard = (req, res, next) => {
  res.render("clients/dashboard.ejs", {
    path: "/dashboard",
    title: "Dashboard",
    user_name: req.user.name
  });
};

exports.getFeatures = (req, res, next) => {
  res.render("clients/features.ejs", {
    path: "/features",
    title: "Features",
    user_name: req.user.name
  });
};

exports.getNewEntry = (req, res, next) => {
  const products = req.user.type.products;
  const customers = req.user.type.customers;
  const user = req.user._id;
  Vehicle.find({user_id: user}).then(vehicles => {

    console

    res.render("clients/new-entry.ejs", {
      path: "/new-entry",
      title: "New Entry",
      products: products,
      customers: customers,
      vehicles: vehicles
    });

  }).catch(err => {
    console.log(err);
  })

  
};

exports.postNewEntry = (req, res, next) => {
  const givenDate = req.body.date;
  let date;
  if (!givenDate) {
    date = new Date();
  } else {
    date = new Date(givenDate);
  }

  const customer = req.body.customer;
  const product = req.body.productName;
  const rate = req.body.rate;
  const quantity = req.body.quantity;
  const slip = req.body.slip;
  const amount = req.body.amount;
  const customer_name = req.body.customerName;
  const vehicle = req.body.vehicles;


  console.log(date);
  console.log(
    customer,
    product,
    rate,
    quantity,
    slip,
    amount,
    customer_name
  );

  const entry = new Entry ({
    product: product,
    rate: parseFloat(rate),
    quantity: parseFloat(quantity),
    amount: parseFloat(amount).toFixed(2),
    slip: slip,
    customer_id: customer,
    customer_name : customer_name,
    user_id: req.user._id,
    date: date,
    vehicle: vehicle
  });

  entry.save().then(result => {
    const user = req.user;
    const updatedSlips = [...user.type.slips, slip];
    user.type.slips = updatedSlips;
    user.save().then(result => {
      res.redirect('/new-entry');
    }).catch(err => {
      console.log(err);
    })
    
  }).catch(err => {
    console.log(err);
  })


  // mongoose
  //   .connection(customer)
  //   .insert(entry)
  //   .then(() => {
  //     res.redirect("/new-entry");
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });

  // res.redirect("/new-entry");
};

exports.getNewProduct = (req, res, next) => {
  res.render("clients/new-products.ejs", {
    path: "/new-product",
    title: "New Product",
  });
};

exports.postNewProduct = (req, res, next) => {
  const name = req.body.name;
  const price = parseFloat(req.body.price);

  User.findById(req.user._id)
    .then((user) => {
      const updatedProducts = [
        ...user.type.products,
        {
          name: name,
          price: price,
        },
      ];
      user.type.products = updatedProducts;
      return user.save();
    })
    .then((result) => {
      console.log("New Product is added");
      res.redirect("/new-product");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getNewCustomer = (req, res, next) => {
  res.render("clients/new-customer.ejs", {
    path: "/new-customer",
    title: "New Customer",
  });
};

exports.postNewCustomer = (req, res, next) => {
  const customer_name = req.body.name;

  User.findById(req.user._id)
    .then((user) => {
      let updatedCustomers = [
        ...user.type.customers,
        {
          customer_name: customer_name,
        },
      ];
      user.type.customers = updatedCustomers;
      return user.save();
    })
    .then((result) => {
      console.log("New Customer Added");
      res.redirect("/new-customer");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCustomers = (req, res, next) => {

  const customers = req.user.type.customers;

  res.render('clients/customer.ejs', {
    path: '/customers',
    title: 'Customers',
    customers: customers
  })

}

exports.postCustomers = async (req, res, next) => {

  if(req.body.delete === 'delete') {
    const id = req.body.entry_id;
    await Entry.deleteOne({_id: id});
  }

  const customer_id = req.body.customer;
  const user_id = req.user._id.toString();

  const startDate = req.body.startingDate;
  const endDate = req.body.endingDate;

  // console.log(startingDate, endingDate);
  // console.log(new Date(startingDate), new Date(endingDate));

  // console.log(customer_id, 'i m here');
  // console.log(user_id, 'i m here');

  if(startDate !== '' && endDate !== '') {
  Entry.find({customer_id: customer_id, user_id: user_id,date : { 
    $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
    $lt: new Date(new Date(endDate).setHours(23, 59, 59))}}).sort({date: 1}).then(entries => {
    // console.log(entries);
    
      if(entries[0] === undefined) {
        console.log(req.user.type.customers);
        const customer = req.user.type.customers.filter(customeR => customeR._id.toString() === customer_id);
        entries = customer
      }
      res.render('clients/entry.ejs', {
        entries: entries,
        title: 'Entry',
        path: '/entry',
        startDate: startDate,
        endDate: endDate
      });
  }).catch(err => {
    console.log(err);
  })
} else {
  Entry.find({customer_id: customer_id, user_id: user_id}).sort({date: 1}).then(entries => {
      // console.log(entries);
      if(entries[0] === undefined) {
        console.log(req.user.type.customers);
        const customer = req.user.type.customers.filter(customeR => customeR._id.toString() === customer_id);
        entries = customer
      }
      res.render('clients/entry.ejs', {
        entries: entries,
        title: 'Entry',
        path: '/entry',
        startDate: null,
        endDate: null
      });
  }).catch(err => {
    console.log(err);
  })
}
}

exports.getUpdatePrice = (req, res, next) => {

  const products = req.user.type.products;

  res.render('clients/update-price.ejs', {
    path: '/update-price',
    title: 'Update Price',
    products: products
  })

}

exports.postUpdatePrice = (req, res, next) => {

  const product_id = req.body.products;
  const price = req.body.price;

  console.log(product_id, price);

  const productIndex = req.user.type.products.findIndex(cp => {
    return cp._id.toString() === product_id;
  });

  req.user.type.products[productIndex].price = price;
  req.user.save().then(result => {
    res.redirect('/update-price');
  }).catch(err => {
    console.log(err);
  })

  // User.findById(req.user._id).then(user => {
  //   user.
  // }).catch(err => {
  //   console.log(err);
  // })
}

exports.getPayment = (req, res, next) => {

  const customers = req.user.type.customers;

  res.render('clients/payment.ejs', {
    path: '/payment',
    title: 'Payment',
    customers: customers
  });

}

exports.postPayment = (req, res, next) => {

  const givenDate = req.body.date;
  let date;
  if (!givenDate) {
    date = new Date();
  } else {
    date = new Date(givenDate);
  }

  const customer_id = req.body.customer;
  const amount = -1 * (req.body.amount);
  const user_id = req.user._id;
  const customerName = req.body.customerName;
  const mode = req.body.mode;

  console.log(customer_id, amount, customerName);
  const entry = new Entry({
    customer_id: customer_id,
    user_id: user_id,
    amount: amount,
    customer_name : customerName,
    date: date,
    mode: mode
  });
  entry.save().then(result => {
    res.redirect('payment');
  }).catch(err => {
    console.log(err);
  })
  
  // res.redirect('/payment');

}

exports.getBills = (req, res, next) => {

  const customers = req.user.type.customers;

  res.render('clients/bill.ejs', {
    path: '/customers',
    title: 'Customers',
    customers: customers
  })

}

exports.postBills = (req, res, next) => {

  const customer_id = req.body.customer;
  const user_id = req.user._id.toString();

  const startDate = req.body.startingDate;
  const endDate = req.body.endingDate;

  // console.log(startingDate, endingDate);
  // console.log(new Date(startingDate), new Date(endingDate));

  // console.log(customer_id, 'i m here');
  // console.log(user_id, 'i m here');

  if(startDate !== '' && endDate !== '') {
  Entry.find({customer_id: customer_id, user_id: user_id,date : { 
    $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
    $lt: new Date(new Date(endDate).setHours(23, 59, 59))}}).sort({date: 1}).then(entries => {
    // console.log(entries);
    
      if(entries[0] === undefined) {
        console.log(req.user.type.customers);
        const customer = req.user.type.customers.filter(customeR => customeR._id.toString() === customer_id);
        entries = customer
      }
      res.render('clients/print-bill.ejs', {
        entries: entries,
        title: 'Entry',
        path: '/entry',
        startDate: startDate,
        endDate: endDate,
        user_name: req.user.name
      });
  }).catch(err => {
    console.log(err);
  })
} else {
  Entry.find({customer_id: customer_id, user_id: user_id}).sort({date: 1}).then(entries => {
      // console.log(entries);
      if(entries.length < 0) {
        console.log(req.user.type.customers);
        const customer = req.user.type.customers.filter(customeR => customeR._id.toString() === customer_id);
        entries = customer
      }
      // const customerIndex = req.user.type.customers.forEach(customer => {
      //   if(customer_id.toString() === customer_id.toString()) {
      //     return customer.customer_name;
      //   }
      // })
      res.render('clients/print-bill.ejs', {
        entries: entries,
        title: 'Entry',
        path: '/entry',
        startDate: null,
        endDate: null,
        user_name: req.user.name
      });
  }).catch(err => {
    console.log(err);
  })
}
}

exports.getNewBank = (req, res, next) => {

  res.render('clients/add-bank.ejs', {
    path: '/new-bank',
    title: 'Add a Bank'
  })

}

exports.postNewBank = (req, res, next) => {

  const bankName = req.body.bank;
  console.log(bankName);

  const user = req.user;
  const updatedBanks = [...user.type.banks, {
    name: bankName
  }];
  user.type.banks = updatedBanks;
  user.save()

  .then(result => {
    console.log(result);  
    res.redirect('/new-bank');
  })
  .catch(err => {
    console.log(err);
  });

}

exports.getGeneralCustomer = (req, res, next) => {

  const customers = req.user.type.customers;
  const banks = req.user.type.banks;

  res.render('clients/general-customer.ejs', {
    path: '/general-customer',
    title: 'Customer to Bank',
    banks: banks,
    customers: customers

  })

}

exports.postGeneralCustomer = (req, res, next) => {

  const givenDate = req.body.date;
  let date;
  if (!givenDate) {
    date = new Date();
  } else {
    date = new Date(givenDate);
  }

  const customer = req.body.customer;
  const bank = req.body.bank;
  const amount = parseFloat(req.body.amount);

  const bankName = req.body.bankName;
  const customerName = req.body.customerName;


  console.log(customer, bank, amount, date, bankName, customerName);

  const generalcustomer = new Generalcustomer({
    customer_name: customerName,
    bank_name: bankName,
    customer_id: customer,
    bank_id: bank,
    amount: amount,
    date: date,
    user_id: req.user._id
  });

  generalcustomer.save().then(result => {
    const entry = new Entry({
      customer_id: customer,
      user_id: req.user._id,
      amount: (-1 * amount),
      customer_name : customerName,
      date: date,
      mode: 'Cheque'
    });
    return entry.save();
  })
  .then(result => {
    res.redirect('/general-customer');
  })
  .catch(err => {
    console.log(err);
  })


}

exports.getAddFirm = (req, res, next) => {

  res.render('clients/add-firm', {
    path: '/add-firm',
    title: 'Add Firm'
  });

}

exports.postAddFirm = (req, res, next) => {

  const user = req.user;
  const firm = req.body.firm;
  console.log(firm);

  const updatedFirms = [...user.type.firms, {
    firm_name: firm
  }];

  user.type.firms = updatedFirms;
  user.save().then(result => {
    res.redirect('/add-firm');
  }).catch(err => {
    console.log(err);
  })

}

exports.getGeneralFirm = (req, res, next) => {

  const firms = req.user.type.firms;
  const banks = req.user.type.banks;

  res.render('clients/general-firm.ejs', {
    path: '/general-firm',
    title: 'Bank to Firm',
    banks: banks,
    firms: firms

  })

}

exports.postGeneralFirm = (req, res, next) => {

  const givenDate = req.body.date;
  let date;
  if (!givenDate) {
    date = new Date();
  } else {
    date = new Date(givenDate);
  }

  const firm = req.body.firm;
  const bank = req.body.bank;
  const amount = parseFloat(req.body.amount);

  const firmName = req.body.firmName;
  const bankName = req.body.bankName;


  // console.log(customer, bank, amount, date, bankName, customerName);

  const generalfirm = new Generalfirm({
    firm_name: firmName,
    bank_name: bankName,
    firm_id: firm,
    bank_id: bank,
    amount: amount,
    date: date,
    user_id: req.user._id
  });

  generalfirm.save()
  .then(result => {
    res.redirect('/general-firm');
  })
  .catch(err => {
    console.log(err);
  })


}

exports.getPurchase = (req, res, next) => {

  const products = req.user.type.products;

  res.render('clients/purchases.ejs', {
    path: '/purchase',
    title: 'Purchase',
    products: products
  });

}

exports.postPurchase = (req ,res, next) => {

  const givenDate = req.body.date;
  let date;
  if (!givenDate) {
    date = new Date();
  } else {
    date = new Date(givenDate);
  }

  const product = req.body.product;
  const productName = req.body.productName;
  const user_id = req.user._id;
  const quantity = parseFloat(req.body.quantity);

  console.log(product, productName);

  const purchase = new Purchase({
    user_id: user_id,
    product: productName,
    product_id: product,
    quantity: quantity,
    date: date
  })

  purchase.save().then(result => {
    res.redirect('/purchase');
  }).catch(err => {
    console.log(err);
  })

}

exports.getDaybook = (req, res, next) => {
  
  res.render('clients/day-book.ejs', {
    path: '/daybook',
    title: 'Day Book'
  })

}

exports.postDaybook = async (req, res, next) => {

  const date = req.body.date;
  const type = req.body.type;
  const _id = req.user._id;

  console.log(date, type, _id);

  if(date === '') {
    res.redirect('/daybook');
  }

  if(type === 'Credit Sale') {

    if(req.body.delete === 'delete') {
      await Entry.deleteOne({_id: req.body.entry_id})
    }

    Entry.find({
      user_id: _id,date : { 
        $gte: new Date(new Date(date).setHours(00, 00, 00)),
        $lt: new Date(new Date(date).setHours(23, 59, 59))}}).sort({date: 1}).then(entries => {
      res.render('clients/daybook.ejs', {
        path: '/daybook',
        title: 'DayBook',
        type: type,
        data: entries,
        givenDate: date
      })
    }).catch(err => {
      console.log(err);
    })
  } else if (type === 'Payments') {

    if(req.body.delete === 'delete') {
      await Entry.deleteOne({_id: req.body.entry_id})
    }

    Entry.find({user_id: _id,date : { 
      $gte: new Date(new Date(date).setHours(00, 00, 00)),
      $lt: new Date(new Date(date).setHours(23, 59, 59))}}).sort({date: 1}).then(entries => {
      res.render('clients/daybook.ejs', {
        path: '/daybook',
        title: 'DayBook',
        type: type,
        data: entries,
        givenDate: date
      })
    }).catch(err => {
      console.log(err);
    })
  } else if (type === 'Customer to Bank') {

    if(req.body.delete === 'delete') {
      await Generalcustomer.deleteOne({_id: req.body.entry_id})
    }

    Generalcustomer.find({
      user_id: _id,date : { 
        $gte: new Date(new Date(date).setHours(00, 00, 00)),
        $lt: new Date(new Date(date).setHours(23, 59, 59))}}).sort({date: 1}).then(entries => {
      res.render('clients/daybook.ejs', {
        path: '/daybook',
        title: 'DayBook',
        type: type,
        data: entries,
        givenDate: date
      })
    }).catch(err => {
      console.log(err);
    })

  } else if (type === 'Bank to Firm') {

    if(req.body.delete === 'delete') {
      await Generalfirm.deleteOne({_id: req.body.entry_id})
    }

    Generalfirm.find({
      user_id: _id,date : { 
        $gte: new Date(new Date(date).setHours(00, 00, 00)),
        $lt: new Date(new Date(date).setHours(23, 59, 59))}}).sort({date: 1}).then(entries => {
      res.render('clients/daybook.ejs', {
        path: '/daybook',
        title: 'DayBook',
        type: type,
        data: entries,
        givenDate: date
      })
    }).catch(err => {
      console.log(err);
    })

  } else if (type === 'Purchases') {

    if(req.body.delete === 'delete') {
      await Purchase.deleteOne({_id: req.body.entry_id})
    }

    Purchase.find({
      user_id: _id,date : { 
        $gte: new Date(new Date(date).setHours(00, 00, 00)),
        $lt: new Date(new Date(date).setHours(23, 59, 59))}}).sort({date: 1}).then(entries => {
      res.render('clients/daybook.ejs', {
        path: '/daybook',
        title: 'DayBook',
        type: type,
        data: entries,
        givenDate: date
      })
    }).catch(err => {
      console.log(err);
    })

  }


}

exports.getSlips = (req, res, next) => {

  const slips = req.user.type.slips;
  res.json(slips);

}

exports.getVehicles = (req, res, next) => {

  Vehicle.find({user_id: req.user._id}).then(vehicles => {
    res.json(vehicles);
  })

}


exports.getAddvehicle = (req, res, next) => {

  const customers = req.user.type.customers;

  res.render('clients/add-vehicle', {
    path: '/add-vehicle',
    title: 'Add Vehicle',
    customers: customers
  })

}

exports.postAddvehicle = (req, res, next) => {

  const vehicleNo = req.body.vehicle;
  const customer = req.body.customer;
  const user = req.user._id;

  console.log(customer);

  const vehicle = new Vehicle({
    user_id: user,
    vehicle_no: vehicleNo,
    customer_id: customer
  });

  vehicle.save().then(result => {
    res.redirect('/add-vehicle');
  }).catch(err => {
    console.log(err);
  })

}

// exports.getPrintVehicleWise = (req ,res, next) => {



// }

// exports.postPrintVehicleWise = (req ,res, next) => {

  

// }

exports.getPrintVehicleWise = (req, res, next) => {

  const customers = req.user.type.customers;

  res.render('clients/bill-vehicle.ejs', {
    path: '/bill-vehicle',
    title: 'Customers',
    customers: customers
  })

}

exports.postPrintVehicleWise = (req, res, next) => {

  const customer_id = req.body.customer;
  const user_id = req.user._id.toString();
  const customer_name = req.body.customerName;

  const startDate = req.body.startingDate;
  const endDate = req.body.endingDate;

  console.log(customer_name);

  let entriess;

  if(startDate !== '' && endDate !== '') {
  Entry.find({customer_id: customer_id, user_id: user_id,date : { 
    $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
    $lt: new Date(new Date(endDate).setHours(23, 59, 59))}}).sort({date: 1}).then(entries => {
    // console.log(entries);
    
      if(entries[0] === undefined) {
        console.log(req.user.type.customers);
        const customer = req.user.type.customers.filter(customeR => customeR._id.toString() === customer_id);
        entries = customer
      }
      entriess = entries;
      return Vehicle.find({customer_id: customer_id, user_id: user_id})
  })
  .then(vehicles => {
    // console.log(vehicles);


    res.render('clients/print-vehicle.ejs', {
      entries: entriess,
      title: 'Print Bill',
      path: '/entry',
      startDate: startDate,
      endDate: endDate,
      user_name: req.user.name,
      vehicles: vehicles
    });
  })
  .catch(err => {
    console.log(err);
  })
} else {
  Entry.find({customer_id: customer_id, user_id: user_id}).sort({date: 1}).then(entries => {
      
      entriess = entries;
      return Vehicle.find({customer_id: customer_id, user_id: user_id})
      

  })
  .then(vehicles => {
    console.log(entriess);
    res.render('clients/print-vehicle.ejs', {
      entries: entriess,
      title: 'Print Bill',
      path: '/entry',
      startDate: null,
      endDate: null,
      user_name: req.user.name,
      vehicles: vehicles
    });
  })
  .catch(err => {
    console.log(err);
  })
}
}

exports.postDeletionEntry = (req, res, next) => {

  

}