// Copyright 2017-2020 @canvas-ui/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Route } from './types';

import Component from '@canvas-ui/evmAccount';

export default function create (t: <T = string> (key: string, text: string, options: { ns: string }) => T): Route {
  return {
    Component,
    display: {
      needsAccounts: true,
      needsApi: []
    },
    name: 'evmAccount',
    text: t<string>('nav.evmAccount', 'Setup EVM Account', { ns: 'apps-routing' })
  };
}
