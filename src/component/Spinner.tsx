import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import '../styles/spinner.css';

const Spinner = () => {
  return (

    <div className="spinner">
      <ClipLoader
        color="rgba(78, 75, 102, 0.7)"
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;