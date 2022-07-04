import React , {useContext , useEffect, useState} from 'react';
import SweetAlert2 from 'react-sweetalert2';
import DataContext from '../../context/DataContext';
const SweetAlertCustom = ({swalProps , setSwalProps , setStatus = null}) => {

 const {userLogin , setUserLogin} = useContext(DataContext);

 
 /*const handleLogout = () => {
     ขั้นตอนการ update object กรณี ต้องการ show sweetalert
    setSwalProps({...swalProps , show:true })
 }*/

 // ประกาศ property สำหรับเรียกใช้ sweetalert
 /*const [swalProps, setSwalProps] = useState({
    show: false,
    title: 'ยืนยันการ ออกจากระบบ',
    text: 'กด Ok เพื่อยืนยันการออกจากระบบ',
    icon:"warning",
    showCancelButton: true,
    confirmButtonText:"OK",
    cancelButtonText:"Cancel"
   });*/

 



 return (   <SweetAlert2 {...swalProps}
            didOpen={() => {
                // run when swal is opened...
            }}
            didClose={() => {

                setSwalProps({...swalProps , show:false })
                // run when swal is closed...
            }}
            onConfirm={result =>  {

                console.log(result)

                if(result.isConfirmed){

                    setSwalProps({...swalProps , show:false })

                }
                
                
                

                // run when clieked in confirm and promise is resolved...
            }}
            onError={error => {
                // run when promise rejected...
            }}
            onResolve={result => {
                // run when promise is resolved...
            }}
/>
        )
}

export default SweetAlertCustom