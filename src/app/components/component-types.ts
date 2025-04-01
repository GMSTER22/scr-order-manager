
export type Kit = {

  sku: number,

  name: string

}

export type Order = {

  id: string,

  number: number,

  createdDate: Date,

  updatedDate: Date,

  paymentStatus: string,

  fulfillmentStatus: string,

  fullname: string,

  email: string,

  kits: Array<Kit>

}