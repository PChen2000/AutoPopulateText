import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { ExampleComponent } from '../components';
import { Tree } from '../components/Tree';
import { useGlobalState } from '../context';

import style from './Example.module.css';

export default function Example() {
  const [counter, setCounter] = useState(1);
  const { dispatchGlobalState } = useGlobalState();

  return (
    <>
      <div className={style.header}>
        <div>Example: What property do we pass our child component?</div>
        <ExampleComponent counter={counter} />
        <Button onClick={() => setCounter(counter + 1)} type="primary">
          Up
        </Button>
        <Button onClick={() => setCounter(counter - 1)} type="danger">
          Down
        </Button>
      </div>
      <Tree />
    </>
  );
}
