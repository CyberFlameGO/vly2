const { Action } = require('../../services/abilities/ability.constants')

const StoryRoutes = {
  [Action.READ]: 'api/stories/:id'
}

const StoryStatus = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  CANCELLED: 'cancelled',
  DELETED: 'deleted'
}

const StoryFields = {
  ID: '_id',
  NAME: 'name',
  BODY: 'body',
  IMG_URL: 'imgUrl',
  AUTHOR: 'author',
  STATUS: 'status',
  DATE_ADDED: 'dateAdded',
  DATE_PUBLISHED: 'datePublished',
  ALLOW_COMMENTS: 'allowComments',
  PARENT: 'parent',
  TAGS: 'tags'
}

module.exports = {
  SchemaName: 'Story',
  StoryStatus,
  StoryFields,
  StoryRoutes
}
