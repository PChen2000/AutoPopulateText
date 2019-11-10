import React from 'react';
import { Statistic } from 'antd';
import PropTypes from 'prop-types';

export default function ExampleComponent({ counter }) {
  return (
    <>
      <Statistic title="Active Count" value={counter} />
    </>
  );
}

ExampleComponent.propTypes = {
  counter: PropTypes.string,
};
