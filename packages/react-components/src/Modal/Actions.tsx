// Copyright 2017-2020 @polkadot/react-components authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ActionsProps } from './types';

import React from 'react';
import SUIModal from 'semantic-ui-react/dist/commonjs/modules/Modal/Modal';

import Button from '../Button';

import { useTranslation } from '../translate';

function Actions ({ children, className, onCancel }: ActionsProps): React.ReactElement<ActionsProps> {
  const { t } = useTranslation();

  return (
    <SUIModal.Actions>
      <Button.Group className={className}>
        <Button
          label={t('Cancel')}
          onClick={onCancel}
        />
        {children}
      </Button.Group>
    </SUIModal.Actions>
  );
}

export default React.memo(Actions);
