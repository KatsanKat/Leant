import LocalForage from 'localforage';

LocalForage.config({
  name: 'Leant-bdd',
  storeName: 'leant-store',
  version: 1.0,
});

export default LocalForage;
export const leantStore = LocalForage.createInstance({ name: 'leant' });
