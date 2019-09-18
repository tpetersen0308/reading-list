import React from "react";
import { GoogleLogin } from "react-google-login";
import { Button } from "react-bootstrap";
import { LoginProps } from "./LoginProps";
import config from '../../config.json';
import "./Login.css";
import { IApiResponse } from "../../types/IApiResponse";

const Login: React.FC<LoginProps> = ({ setUser, setErrors, apiHandler }) => {
  const onFailure = (error: string): void => {
    setErrors([{ message: error }]);
  }

  const googleResponse = async (googleResponse: any): Promise<IApiResponse["readingList"]> => {
    const { user, error } = await apiHandler.getUser(googleResponse.tokenId);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setErrors(null);
    } else if (error) {
      setErrors([error]);
    }
    return { user: user };
  }

  return (
    <div id='google-login'>
      <GoogleLogin
        clientId={config.GOOGLE_CLIENT_ID}
        render={renderProps => (
          <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>Google Login</Button>
        )}
        buttonText="Google Login"
        onSuccess={googleResponse}
        onFailure={onFailure}
      />
    </div>
  )
}

export default Login; 