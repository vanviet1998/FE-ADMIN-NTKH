import { useState } from 'react';


function useModal(itntValue) {
  const [isShowing, setIsShowing] = useState(itntValue || false);
  const toggle=()=>{
    setIsShowing(!isShowing)
  }

  return {
    isShowing,
    toggle,
  }}
export default useModal