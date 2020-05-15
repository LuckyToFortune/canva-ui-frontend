// Copyright 2017-2020 @polkadot/app-staking authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BondInfo, SessionInfo, ValidateInfo } from './partials/types';

import React, { useCallback, useState } from 'react';
import { Button, Modal, TxButton } from '@polkadot/react-components';
import { useToggle } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';
import BondPartial from './partials/Bond';
import SessionKeyPartial from './partials/SessionKey';
import ValidatePartial from './partials/Validate';

interface Props {
  isInElection?: boolean;
}

const NUM_STEPS = 2;

function NewValidator ({ isInElection }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const [isVisible, toggleVisible] = useToggle();
  const [{ bondOwnTx, bondTx, controllerId, controllerTx, stashId }, setBondInfo] = useState<BondInfo>({});
  const [{ sessionTx }, setSessionInfo] = useState<SessionInfo>({});
  const [{ validateTx }, setValidateInfo] = useState<ValidateInfo>({});

  const [step, setStep] = useState(1);

  const _nextStep = useCallback(
    () => setStep((step) => step + 1),
    []
  );

  const _prevStep = useCallback(
    () => setStep((step) => step - 1),
    []
  );

  const _toggle = useCallback(
    (): void => {
      setBondInfo({});
      setSessionInfo({});
      setValidateInfo({});
      setStep(1);
      toggleVisible();
    },
    [toggleVisible]
  );

  return (
    <>
      <Button
        icon='add'
        isDisabled={isInElection}
        key='new-validator'
        label={t('Validator')}
        onClick={_toggle}
      />
      {isVisible && (
        <Modal
          header={t('Setup Validator {{step}}/{{NUM_STEPS}}', {
            replace: {
              NUM_STEPS,
              step
            }
          })}
          size='large'
        >
          <Modal.Content>
            {step === 1 && (
              <BondPartial onChange={setBondInfo} />
            )}
            {controllerId && stashId && step === 2 && (
              <>
                <SessionKeyPartial
                  controllerId={controllerId}
                  onChange={setSessionInfo}
                  stashId={stashId}
                />
                <ValidatePartial
                  controllerId={controllerId}
                  onChange={setValidateInfo}
                  stashId={stashId}
                />
              </>
            )}
          </Modal.Content>
          <Modal.Actions onCancel={_toggle}>
            <Button
              icon='step backward'
              isDisabled={step === 1}
              label={t('prev')}
              onClick={_prevStep}
            />
            {step === NUM_STEPS
              ? (
                <TxButton
                  accountId={stashId}
                  icon='sign-in'
                  isDisabled={!bondTx || !sessionTx || !validateTx}
                  isPrimary
                  label={t('Bond & Validate')}
                  onStart={_toggle}
                  params={[
                    controllerId === stashId
                      ? [bondTx, sessionTx, validateTx]
                      : [bondOwnTx, sessionTx, validateTx, controllerTx]
                  ]}
                  tx='utility.batch'
                />
              )
              : (
                <Button
                  icon='step forward'
                  isDisabled={!bondTx}
                  isPrimary
                  label={t('next')}
                  onClick={_nextStep}
                />
              )}
          </Modal.Actions>
        </Modal>
      )}
    </>
  );
}

export default React.memo(NewValidator);
