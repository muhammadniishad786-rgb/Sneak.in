import React, { useEffect, useState } from 'react'
import { getAddress } from '../services/addressApi'

function AddressPage() {
    const [address, setAddress] = useState([])

    useEffect(() => {
        fetchAddresses
    }, [])
    const fetchAddresses = async () => {
    try {
      const data = await getAddresses();
      setAddresses(data.addresses);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    } finally {
      setLoading(false);
    }
  };
    console.log(address);
    
  return (
    <div>
      
    </div>
  )
}

export default AddressPage
