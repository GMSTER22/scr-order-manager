
export async function GET() {

  const API_URL: string = "https://www.wixapis.com/ecom/v1/orders/search";
  const API_KEY: string = process.env.WIX_API_KEY;
  // const ACCOUNT_ID: string = process.env.WIX_ACCOUNT_ID;
  const SITE_ID: string = process.env.WIX_SITE_ID;

  const getRequestBody = ( cursorPaging ) => ( {

    search: {

      filter: {

        paymentStatus: "PAID",

        fulfillmentStatus: "NOT_FULFILLED",

        // archived: true

      },

      sort: [

        {

          "fieldName": "createdDate", 

          "order":"ASC"

        }

      ],

      cursorPaging

    }

  } );

  let allOrders = [];

  let metadata;

  async function fetchOrders( cursorPaging ) {

    const response = await fetch( API_URL, {

      method: "POST",

      headers: {

        "Authorization": `Bearer ${API_KEY}`,

        "Content-Type": "application/json",

        'wix-site-id': SITE_ID

      },

      body: JSON.stringify( getRequestBody( cursorPaging ) ) // Forward request body from frontend

    } );

    const ordersData = await response.json();

    const formattedOrdersData = ordersData.orders.map( order => {

      const { id, number, createdDate, updatedDate, paymentStatus, fulfillmentStatus, billingInfo, buyerInfo, lineItems } = order;

      return {

        id, number, createdDate, updatedDate, paymentStatus, fulfillmentStatus,

        fullname: `${billingInfo.contactDetails.firstName} ${billingInfo.contactDetails.lastName}`,

        email: buyerInfo.email,

        kits: lineItems.map( item => ( {

          sku: item.physicalProperties.sku,

          name: item.productName.original

        } ) )

      }

    } );

    return { 
      
      orders: formattedOrdersData,

      cursorData: ordersData.metadata
    
    };

  }

  do {

    let cursorPaging = ! metadata?.cursors?.next ? { limit: 100 } : {
        
        cursor: metadata?.cursors?.next, 
        
        limit: 100 
        
      };
    
    const { orders, cursorData } = await fetchOrders( cursorPaging );

    allOrders = [ ...allOrders, ...orders ];

    metadata = cursorData;

  } while ( metadata?.hasNext );

  return Response.json( { 

    metadata,
    
    orders: allOrders 
  
  } );

}