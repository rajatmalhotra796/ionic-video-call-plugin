import { registerPlugin } from '@capacitor/core';

import type { SyntagiTwilioVideoPlugin } from './definitions';

const SyntagiTwilioVideo = registerPlugin<SyntagiTwilioVideoPlugin>(
  'SyntagiTwilioVideo',
  {
    web: () => import('./web').then(m => new m.SyntagiTwilioVideoWeb()),
  },
);

export * from './definitions';
export { SyntagiTwilioVideo };
