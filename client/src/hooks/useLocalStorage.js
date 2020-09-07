import { useEffect, useState } from 'react';

const PREFIX = 'whatsapp-clone-';

export default function useLocalStorage(key, initValue) {
    const prefixedKey = PREFIX + key;

    const [value, setValue] = useState(() => {
        //Grab the json stored in local storage under the name whatsapp-clone-contacts for example
        const jsonValue = localStorage.getItem(prefixedKey);
        //If it's not empty return that data and set value to the data 
        if(jsonValue != null) return JSON.parse(jsonValue);
        //If it is then call the function that was passed if it's a function, if not then return the info
        if(typeof initValue === 'function') {
            return initValue();
        } else {
            return initValue;
        }
    })

    //Set in the localStorage an item with the prefixed name, with the data of the stringifid version of the value, set above.
    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value));
    }, [prefixedKey, value])

    //Return the value and the function used to set it
    return [value, setValue];
}
