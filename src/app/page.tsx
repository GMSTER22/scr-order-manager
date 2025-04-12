'use client';

import { useState, useEffect } from "react";

import Order from "./components/Order";

import { OrderType } from "./components/component-types";

const ENTER_KEY_CODE: number = 13;

const STORAGE_KEY: string = 'scr-pending-orders';

const HOUR_EQUIVALENT_IN_MILLISECONDS: number = 60 * 60 * 1000;

export default function Page() {

  const [ orders, setOrders ] = useState( [] );
  
  const [ filteredOrders, setFilteredOrders ] = useState( null );
  
  const [ metadata, setMetadata ] = useState( null );
  
  const [ targetedKits, setTargetedKits ] = useState( null );

  const [ isLoading, setLoading ] = useState( true );

  function handleInputChange( event ) {

    if ( event.target.value === '' ) {

      setFilteredOrders( null );

      setTargetedKits( null );

    }

  }

  function handleKeyUp( event ) {

    if ( event.keyCode === ENTER_KEY_CODE ) {

      const kits = event.target.value.split( ',' ).filter( kit => {

        if ( ! isNaN( kit ) ) return kit.trim();

      } );

      const result: Array<OrderType> = orders.filter( order => order.kits.some( kit => kits.includes( kit.sku ) ) );

      setFilteredOrders( result );

      setTargetedKits( kits );

    }

  }

  useEffect( () => {

    async function fetchOrders() {  
      
      try {
        
        const response = await fetch( '/api/orders' );

        const data = await response.json();

        setOrders( data.orders );

        setMetadata( data.metadata );

        localStorage.setItem( STORAGE_KEY, JSON.stringify( { 
          
          ...data,

          savedAt: new Date()
        
        } ) );

      } catch ( error ) {

        console.log( error );
        
      } finally {

        setLoading( false );

      }
    
    };

    const cachedOrders = JSON.parse( localStorage.getItem( STORAGE_KEY ) );
    
    const currentTime : Date = new Date();
    
    const savedAt: Date = new Date( cachedOrders?.savedAt );

    const isCachedOlderThanOneHour: number | boolean = savedAt ? ( currentTime.valueOf() - savedAt.valueOf() ) > HOUR_EQUIVALENT_IN_MILLISECONDS : true;

    if ( cachedOrders && ! isCachedOlderThanOneHour ) {

      setLoading( true );
      
      setOrders( cachedOrders.orders );
      
      setMetadata( cachedOrders.metadata );

      setLoading( false );

      console.log( '====> Cached data used. <====' );
      
    } else {

      fetchOrders();

      console.log( '====> Fetched data from API <====' );

    }

  }, [] );

  if ( isLoading ) return <div className="w-screen h-screen flex justify-center items-center">
    
    <svg className="w-16 h-16 animate-spin fill-green-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      {/* <!-- !Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --> */}
      <path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z"/>
    </svg>
    
    </div>

  if ( ! orders.length ) return <p>No Orders</p>
 
  return (

    <div className="max-w-6xl mx-auto">

      <h1 className="mt-10 mb-16 text-3xl text-center font-bold sm:text-4xl lg:text-5xl">Order Manager</h1>

      <div className="p-4 bg-white text-black">

        <div>

          <p className="text-right text-sm font-semibold text-gray-700">Orders Count: { orders.length === metadata.total && metadata.total }</p>
          
        </div>

        <search>

          <label className="block mt-10">

            <div>Filter orders by Kit SKU #</div>

            <input className="w-full p-2 border rounded-md" type="search" placeholder="Enter kit SKUS separated by comas eg=152,458" 
            
              onKeyUp={ handleKeyUp } 
              
              onInput={handleInputChange} />

          </label>

          <div className='ml-2 mt-1 mb-10 text-sm text-gray-700 sm:mb-20'>
            
            <p className={ ! filteredOrders?.length ? 'hidden' : '' }>
              
              { filteredOrders?.length } order(s) found.
              
            </p>
            
          </div>

          <ul className="sm:grid sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">

            {

              filteredOrders ?

                (
                  
                  filteredOrders.length ? 
                
                    filteredOrders.map( order => <Order key={order.id} targetedKits={targetedKits} order={order} /> ) 
                    
                    : 
                    
                    <p>
                      
                      No result found for: <span>{targetedKits.join(', ')}</span>
                      
                    </p>
                  
                )

                :

                orders.map( order => <Order key={order.id} order={order} /> )

            }

          </ul>

        </search>

      </div>

    </div>

  )

}