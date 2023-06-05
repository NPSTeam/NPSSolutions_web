import _ from '@lodash';

function CardModel(data) {
  data = data || {};

  return _.defaults(data, {
    name: '',
    boardId: '',
    listId: '',
    title: '',
    description: '',
    labels: [],
    dueDate: '',
    attachmentCoverId: '',
    memberIds: [],
    attachments: [],
    subscribed: true,
    checklists: [],
    activities: [],

    reviewed: 0,
    status: 0,
    priority: 0,
  });
}
export default CardModel;
