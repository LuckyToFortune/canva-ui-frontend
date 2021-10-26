// Copyright 2017-2020 @canvas-ui/react-api authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { CallState } from "../types";

import { Subscription, interval } from "rxjs";

const interval$ = interval(500);

export default function intervalObservable<Props, State extends CallState>(
  that: React.Component<Props, State>
): Subscription {
  return interval$.subscribe((): void => {
    const elapsed = Date.now() - ((that.state.callUpdatedAt as number) || 0);
    const callUpdated = elapsed <= 1500;

    if (callUpdated !== that.state.callUpdated) {
      that.setState({
        callUpdated,
      });
    }
  });
}
