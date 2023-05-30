import getUnixTime from 'date-fns/getUnixTime';
import _ from '@lodash';

function CommentModel(data, userId) {
  data = data || {};

  return _.defaults(data, {
    // id: null,
    type: 'comment',
    idMember: userId,
    message: '',
    time: getUnixTime(new Date()),
  });
}

export default CommentModel;
