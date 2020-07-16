// Copyright 2017-2020 @polkadot/app-execute authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ContractABIFnArg } from '@polkadot/api-contract/types';
import { TypeDef } from '@polkadot/types/types';
import { RawParams } from '@polkadot/react-params/types';

import React, { useCallback, useEffect, useState } from 'react';
import UIParams from '@polkadot/react-params';

interface Props {
  isDisabled?: boolean;
  params?: ContractABIFnArg[];
  onChange: (values: any[]) => void;
  onEnter?: () => void;
}

interface ParamDef {
  name: string;
  type: TypeDef;
}

function CallParams ({ isDisabled, onChange, onEnter, params: propParams }: Props): React.ReactElement<Props> | null {
  const [params, setParams] = useState<ParamDef[]>([]);

  useEffect((): void => {
    propParams && setParams(propParams);
  }, [propParams]);

  const _onChange = useCallback(
    (values: RawParams) => onChange(values.map(({ value }): any => value)),
    [onChange]
  );

  if (!params.length) {
    return null;
  }

  return (
    <UIParams
      isDisabled={isDisabled}
      onChange={_onChange}
      onEnter={onEnter}
      params={params}
    />
  );
}

export default React.memo(CallParams);
