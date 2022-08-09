import React  from "react";
import MainBlock from "../../wrappers/MainBlock/MainBlock";
import SecMainChangePass from "../../wrappers/ChangePassword/SecMainChangePass";

const ChangePassword = () => {

  return ( <MainBlock titlepage={"เปลื่ยนรหัสผ่าน"}>
                <SecMainChangePass/>
            </MainBlock>
         )
}

export default ChangePassword