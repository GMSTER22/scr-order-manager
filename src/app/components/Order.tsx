
import { OrderType } from "./component-types";

import Kit from "./Kit";

export default function Order( { order, targetedKits } : { order: OrderType, targetedKits?: Array<number>  } ) {

  const formatDate = ( date: Date ) => {

    const options = {

      // weekday: "long",

      year: "numeric",

      month: "long",

      day: "numeric",

    } as const;

    return new Date( date ).toLocaleDateString( 'en-US', options );

  }

  return (
  
    <li className="relative px-6 py-14 border border-neutral-200 rounded-md list-none shadow-md">

      <div className="absolute top-2 right-2 text-[8px] text-white">

        <span className="px-2 py-1 mr-1 bg-gray-500 rounded-full">{ order.paymentStatus }</span>

        <span className="px-2 py-1 bg-gray-500 rounded-full">{ order.fulfillmentStatus }</span>

      </div>

      <h2 className="mb-5 text-3xl font-bold text-center sm:text-4xl lg:text-5xl">

        #{ order.number }

      </h2>

      <div>

        <h3 className="mb-2 text-lg font-bold sm:text-xl sm:mb-4">User Info</h3>

        <div className="grid grid-cols-[80px_1fr] gap-x-5">
          
          <span className="">Created</span>

          <span>{ formatDate( order.createdDate ) }</span>

          <span className="">Name</span>
          
          <span className="text-black">{ order.fullname }</span>

          <span className="">Email</span>
          
          <span className="break-all">{ order.email }</span>
          
        </div>

      </div>

      <div className="mt-5">

        <h3 className="mb-2 text-lg font-bold sm:text-xl sm:mb-4">Scrapbook Kits</h3>
        
        <ul className="space-y-1">

          { 
          
            order.kits.map( ( kit, index ) => 
            
              <li key={`${kit.sku}-${index}`} className={`grid grid-cols-[80px_1fr] gap-x-5 items-top px-1 ${ targetedKits?.includes( kit.sku ) && 'bg-yellow-100' }`}>
                
                <Kit kit={kit} />
                
              </li> 
              
            )
            
          }

        </ul>
        
      </div>

    </li>
    
  )

}