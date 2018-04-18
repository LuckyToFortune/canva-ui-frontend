// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { BaseProps } from '@polkadot/portal/types';

import './App.css';

import React from 'react';

import CallDisplay from '../CallDisplay';
import CallSelect from '../CallSelect';
import Sender from '../Sender';

type Props = BaseProps & {};

export default function App ({ className, style }: Props) {
  return (
    <div
      className={['testing--App', className].join(' ')}
      style={style}
    >
      <Sender />
      <CallSelect />
      <CallDisplay />
    </div>
  );
}
