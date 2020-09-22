{
  customer: {
    <customer-id>: {
      overallDue: <double>, // +ve sign represents customer has to give and -ve sign represents company has to give
      name: <string>,
      primaryAddress: <string>,
      vehicleNumber: <string>,
      driverName: <string>,
      phoneNumber: <string>, //unique name
    }
  }
  ledger: {
    <ledger-id>: {
      createdAt: <server_time>,
      customerId: <customer-id>,
      staffId: <user-id>,
      netTotal: <number>, //with tax
      billId: <bill-id>,
      paymentType: <CASH: 0, CREDIT: 1>
      paidFor: <MATERIALS: 0, DUE: 1>
    }
  },
  billing: {
    <bill-id>: { // for credit billing data will be created in DB for order reference but bill won't be generated
      customerId: <customer-id>,
      name: <string>,
      address: <string>,
      vehicleNumber: <string>,
      createdAt: <timestamp>,
      orders: [
        {
          particular: {
            id: <product-id>,
            uniqueName: <string>,
            billingPrice: <string>,
            govtPrice: <string>,
            sgstPercent: <number>,
            cgstPercent: <number>,
          },
          quantity: <number>,
        },
      ],
      subTotal: <number>, 
      sgstCost: <number>,
      cgstCost: <number>,
      grandTotal: <number>,
    },
  },
  productPricing: {
    <product-id>: {
      id: <product-id>,
      uniqueName: <string>,
      billingPrice: <string>,
      govtPrice: <string>,
      sgstPercent: <number>,
      cgstPercent: <number>,
    }
  }
}