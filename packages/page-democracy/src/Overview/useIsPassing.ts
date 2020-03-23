// Copyright 2017-2020 @polkadot/app-democracy authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { DerivedReferendum } from '@polkadot/api-derive/types';
import { ReferendumStatus } from '@polkadot/types/interfaces';

import BN from 'bn.js';
import { useState, useEffect } from 'react';
import { useApi, useCall } from '@polkadot/react-hooks';

function compareRationals (n1: BN, d1: BN, n2: BN, d2: BN): boolean {
  while (true) {
    const q1 = n1.div(d1);
    const q2 = n2.div(d2);

    if (q1.lt(q2)) {
      return true;
    } else if (q2.lt(q1)) {
      return false;
    }

    const r1 = n1.mod(d1);
    const r2 = n2.mod(d2);

    if (r2.isZero()) {
      return false;
    } else if (r1.isZero()) {
      return true;
    }

    n1 = d2;
    n2 = d1;
    d1 = r2;
    d2 = r1;
  }
}

export default function useIsPassing (referendum: DerivedReferendum): boolean | undefined {
  const { api } = useApi();
  const totalIssuance = useCall<BN>(api.query.balances.totalIssuance, []);
  const [isPassing, setIsPassing] = useState<boolean | undefined>(undefined);

  useEffect((): void => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const { tally, threshold } = (referendum.status as ReferendumStatus);

      if (totalIssuance?.gtn(0) && tally?.turnout.gtn(0)) {
        const sqrtVoters = tally.turnout.toRed(BN.red('k256')).redSqrt().fromRed();
        const sqrtElectorate = totalIssuance.toRed(BN.red('k256')).redSqrt().fromRed();

        setIsPassing(
          sqrtVoters.isZero()
            ? false
            : threshold.isSimplemajority
              ? tally.ayes.gt(tally.nays)
              : threshold.isSupermajorityapproval
                ? compareRationals(tally.nays, sqrtVoters, tally.ayes, sqrtElectorate)
                : compareRationals(tally.nays, sqrtElectorate, tally.ayes, sqrtVoters)
        );
      }
    } catch (error) {
      console.error(error);
    }
  }, [referendum, totalIssuance]);

  return isPassing;
}
