import { useState, useEffect, useRef } from 'react';


function useConstructor(callBack = () => {}) {
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    if (hasBeenCalled) return;
    callBack();
    setHasBeenCalled(true);
}
export default useConstructor