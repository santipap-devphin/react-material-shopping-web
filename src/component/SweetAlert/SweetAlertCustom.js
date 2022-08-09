import React from 'react';
import SweetAlert2 from 'react-sweetalert2';
import { useNavigate } from 'react-router-dom';

const SweetAlertCustom = ({swalProps , setSwalProps , setStatus = null}) => {


  let navicate = useNavigate();
 
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

                    if(setStatus === "chklogin"){

                        setSwalProps({...swalProps , show:false })
                        setTimeout(function() {navicate("/login-register")}, 1000);

                        

                    }else{

                        setSwalProps({...swalProps , show:false })
                    }
                    
                    //console.log(setStatus)

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