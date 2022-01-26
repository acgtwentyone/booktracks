import Realm from 'realm';
import {REALM_DEFAULT_PATH, REALM_APP_ID} from '../secrets';
import {BookSchema} from './Schemas';

const realmApp = new Realm.App({id: REALM_APP_ID});

const SCHEMA_NAMES = {
  book: 'Book',
};

const __initRealm = async () => {
  return await Realm.open({
    path: REALM_DEFAULT_PATH,
    schema: [BookSchema],
  });
};

export {__initRealm, SCHEMA_NAMES, realmApp};
