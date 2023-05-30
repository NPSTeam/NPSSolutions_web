import _ from '@lodash';

function BoardModel(data, targetWorkspace) {
  data = data || {};

  return _.defaults(data, {
    title: 'Untitled Board1',
    description: '...',
    icon: 'heroicons-outline:template',
    lastActivity: new Date(),
    members: [],
    settings: {
      subscribed: true,
      cardCoverImages: true,
    },
    lists: [],
    workspaceId: targetWorkspace,
  });
}

export default BoardModel;
