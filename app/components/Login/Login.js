import React from 'react';

const handleLoginWithSocial = (link) => {
  window.location.href = link;
};

const Login = () => (
  <div>
    <span>Click to login</span>
    <div
      onClick={() => handleLoginWithSocial('api/auth/login/facebook')}
    >
      Login with Facebook
    </div>
  </div>
);

export default Login;
