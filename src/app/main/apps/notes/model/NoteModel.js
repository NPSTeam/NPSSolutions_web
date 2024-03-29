import _ from '@lodash';

function NoteModel(data) {
  data = data || {};

  return _.defaults(data, {
    title: '',
    content: '',
    tasks: [],
    image: '',
    reminder: null,
    labels: [],
    archived: false,
    createdAt: new Date().toISOString(),
    updatedAt: null,
  });
}

export default NoteModel;
