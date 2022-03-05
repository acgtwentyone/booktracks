export const ItemStatus = {
  active: 1,
  inactive: 0,
  deleted: -1,
};

const BookSchema = {
  name: 'Book',
  properties: {
    _id: 'objectId',
    title: 'string',
    author: 'string',
    year: 'int',
    isbn: 'string?',
    created_at: 'date',
    updated_at: 'date',
    status: 'int',
    favourity: 'bool',
  },
  primaryKey: '_id',
};

export {BookSchema};
