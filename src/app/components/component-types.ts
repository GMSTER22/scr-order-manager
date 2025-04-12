
type KitType = {

  sku: number,

  quantity: number,

  name: string

}

type OrderType = {

  id: string,

  number: number,

  createdDate: Date,

  updatedDate: Date,

  paymentStatus: string,

  fulfillmentStatus: string,

  fullname: string,

  email: string,

  kits: Array<KitType>

}

export type { KitType, OrderType };
