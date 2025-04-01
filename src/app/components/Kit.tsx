
import types from "./component-types"

export default function Kit( { kit } : { kit: types.Kit } ) {

  return (
        
    <>

      <span className="text-lg font-bold">{ kit.sku }</span>

      <span className="text-gray-600">{ kit.name }</span>

    </>
    
  )

}