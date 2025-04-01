
type Kit = {

  sku: number,

  name: string

}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Kit( { kit, targetedKits } : { kit: Kit, targetedKits?: Array<number> } ) {

  return (
        
    <>

      <span className="text-lg font-bold">{ kit.sku }</span>

      <span className="text-gray-600">{ kit.name }</span>

    </>
    
  )

}