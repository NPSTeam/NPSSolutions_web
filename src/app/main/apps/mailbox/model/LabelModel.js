import _ from '@lodash';

function LabelModel(data) {
  data = data || {};

  return _.defaults(data, {
    title: '',
    slug: '',
    color: '#e75931',
  });
}

export default LabelModel;
