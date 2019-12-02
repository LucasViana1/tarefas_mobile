export default class NotesSchemas {
  static schema = {
    name: 'Notes',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      name: 'string',
      text: 'string',
      createdAt: 'string',
    },
  };
}
