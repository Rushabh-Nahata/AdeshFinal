import { useState } from "react";
import "./verify.css";
import OtpInput from 'react-otp-input';
import { useNavigate } from "react-router";
import axios from "axios";

const Verify = () => {
  const navigateTo = useNavigate();

  const [otp, setOtp] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

const data = {
    otp: otp
}
    const config = { headers: { "Content-Type": "application/json" } };

    const createUser = await axios.post(
        "http://localhost:4000/api/v1/otp-verification",
        data,
        config
      );
      if(createUser){
        navigateTo("/login");
        window.location.reload(true);
      }
   
  };


  return (
    <>

        <>
          <div className="resetPasswordContainer ">
            <div className="resetPasswordBox otpContainer">
              <h2 className="resetPasswordHeading">Verify Email</h2>

              <form
                className="otpForm"
                onSubmit={handleSubmit}
              >
                <div>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    inputStyle={"otpInput"}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                  />
                </div>
                <input
                  type="submit"
                  value="Verify"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </>

    </>
  );
};

export default Verify;
