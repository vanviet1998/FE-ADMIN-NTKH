import React,{ useState } from "react";

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

export default function useCrudArray(intitData) {
    const [crudArray, setCrudArray] = useState(intitData);

    const handleDeleteArray=(id)=>{
        setCrudArray(crudArray.filter(v =>  v.id !==id))
    }

    const handleAddArray=(element)=>{
        setCrudArray([...crudArray,{
            ...element,
            id:guidGenerator()
        }])
    }

  return {
    crudArray,setCrudArray,handleDeleteArray,handleAddArray
  }
}
