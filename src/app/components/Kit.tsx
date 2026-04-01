
import { KitType } from "./component-types";

export default function Kit( { kit } : { kit: KitType } ) {

  return (
        
    <>

      <div className="self-start flex gap-x-1 items-center font-bold">
        
        <span className="text-lg">{ kit.sku ?? 'n/a' }</span>

        <span className={`flex justify-center items-center w-5 h-5 text-xs bg-gray-500 text-white rounded-full ${kit.quantity < 2 && 'hidden'}`}>{ kit.quantity }</span>
        
      </div>

      <span>{ kit.name }</span>

    </>
    
  )

}