# Database
  * user
    * name
    * email
    * password
    * types: {
      customer: [
        {
          customer_id, customer_name
        },
      ],
      products: [
        {name, price}
      ],
      banks: [
        {bank_name}
      ],
      purchasing_firms: [
        {firm_name}
      ]
    }
  * customer_id
    * product []
    * quantity []
    * rate []
    * slip no []
    * date []
    * amount []
