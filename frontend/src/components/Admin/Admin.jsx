import React, { useState } from 'react'
import "./Admin.scss"
import { useSelector } from 'react-redux';
import useFetch from '../useFetch';
import AdminSub from '../AdminSub/AdminSub';




const Admin = () => {

    const [datas, setData] = useState([])
const [loadings, setLoading] = useState(true);



    const {data,loading,error,reFetch} = useFetch(`http://localhost:3003/api/hotels/admin/hotels`)




    const { user } = useSelector((state) => state.auth);

  return (
    <div className='admin'>
<div>
    <h3 className='hotelhead'>Hey {user.payload.username}, Your hotels are listed below</h3>
    <hr />
    <div className='heading'>
            <h5>Image</h5>
            <h5>Hotel Name</h5>
            <h5>Type</h5>
            <h5>City</h5>
        </div>
    <div>
        {
            data.map((datas)=>(

                <AdminSub data={datas} key={datas.id} />
            ))
        }

    </div>

</div>
    </div>
  )
}

export default Admin

