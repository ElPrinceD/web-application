import { Route } from "react-router-dom";
import { ModalRoute } from "react-router-modal";
import React from "react";
import PropTypes from "prop-types";
import "react-router-modal/css/react-router-modal.css";
import EmailAccountLoginBlock from "../../../blocks/email-account-login/src/EmailAccountLoginBlock.web";

function Wrapper({ element, history, match, routeMap, closeModal }) {
  const navigate = (to, params) => {
    let url = routeMap[to].path;
    // replace params ids in the url with actual values
    if (params && Object.keys(params).length > 0) {
      Object.keys(params).forEach(param => {
        const re = RegExp(`\:${param}\\??`); // eslint-disable-line no-useless-escape
        url = url.replace(re, escape(params[param]));
      });
    }
    // removing empty params from url - every string between /: and ?
    url = url.replace(/\/:(.*?)(?=\/|$)/g, "");
    // if the route is not a modal
    if (!routeMap[to].modal) {
      history.push(url);
      // if the route is a modal
    } else {
      // checking if the url ends with a slash or not
      const slash = /\/$/.test(match.url) ? "" : "/";
      // current url in the browser + slash + modal url with parameters
      url = match.url + slash + url;
      // removing the */ from the url
      url = url.replace(/\*\/?/g, "");
      history.push(url);
    }
  };

  const getParam = (param, alternative) => {
    return match.params[param] || alternative;
  };

  const goBack = () => {
    history.goBack();
  };

  return React.cloneElement(element, {
    navigation: { navigate, getParam, goBack },
    closeModal
  });
}

Wrapper.propTypes = {
  element: PropTypes.element,
  history: PropTypes.object,
  routeMap: PropTypes.object,
  closeModal: PropTypes.func,
  match: PropTypes.object
};
const publicRoute = [
  '/', '/Services', '/Aboutus', '/Contactus', '/Faq', '/EmailAccountLoginBlock',
  '/OnboardingPageWeb', '/EmailAccountRegistrationWeb', '/EmailAccountIamNotaryRegWeb',
  '/ForgotPasswordWeb', '/ForgotPasswordOTPWeb','/OtpVerification','/NotaryServices','/NewPasswordWeb','/Termsandconditions','/Privacypolicy',"/Dashboard"
];

const AuthRoute = ({ Component, props, routeMap }) => {                                                                 
  const token = localStorage.getItem('token');
  const currentPath = (props?.location?.pathname ?? '').toLowerCase();
  
  const isPublicRoute = publicRoute.find(route => route.toLowerCase() === currentPath);

  if (token) {
    
    return <Wrapper element={<Component />} {...props} routeMap={routeMap} />;
  }

  else if (isPublicRoute) {
    return <Wrapper element={<Component />} {...props} routeMap={routeMap} />;
  }
 else {
    return  window.location.href="/EmailAccountLoginBlock"
  }
};
const WebRoutesGenerator = ({ routeMap }) => {
  return Object.keys(routeMap).map(route => {
    const currentRoute = routeMap[route];
    const Component = currentRoute.component;
    if (currentRoute.modal) {
      return (
        <ModalRoute
          key={currentRoute.path}
          path={currentRoute.path}
          component={props => (
            <Wrapper element={<Component />} {...props} routeMap={routeMap} />
          )}
        />
      );
    } else {
      return (
        <Route
          key={currentRoute.path}
          path={currentRoute.path}
          exact={currentRoute.exact}
          render={props => <AuthRoute Component={Component} props={props} routeMap={routeMap} />}
        />
      );
    }
  });
};

WebRoutesGenerator.propTypes = {
  routeMap: PropTypes.object
};

export default WebRoutesGenerator;
