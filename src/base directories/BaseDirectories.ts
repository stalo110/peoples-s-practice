const BaseDirectories = {
    /**
     ** The base URL of the application
     */
    BASE_URL: process.env.REACT_APP_BASEURL,
  
    APP_ENV: process.env.REACT_APP_ENV,
  
    /**
     * The base URL of the Server API
     */
    API_BASE_URL: process.env.REACT_APP_API_BASEURL,
  
    TOKEN: window.sessionStorage.getItem('accessToken'),
  
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
  
   
  };
  
  export default BaseDirectories;
  