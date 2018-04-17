// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';
import { reactI18nextModule } from 'react-i18next';

const CONFIG = {
  fallbackLng: 'en',
  ns: ['portal'],
  defaultNS: 'portal',
  debug: true,
  interpolation: {
    escapeValue: false
  },
  react: {
    wait: true
  }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init(CONFIG);

export default i18n;
