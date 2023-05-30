import _ from '@lodash';

function TagModel(data) {
  data = data || {};

  return _.defaults(data, {
    title: '',
  });
}

export default TagModel;
