export {
  PostObject,
  PostIdFieldObject,
  PostCreatedAtFieldObject,
  PostImageFieldObject,
  PostReadingFieldObject,
  PostPostStatusFieldObject,
  PostPostStatusIdFieldObject,
  PostPostedByFieldObject,
  PostPostedByIdFieldObject
} from './object.base';
export {
  createManyPostMutation,
  createOnePostMutation,
  deleteManyPostMutation,
  deleteOnePostMutation,
  updateManyPostMutation,
  updateOnePostMutation,
  upsertOnePostMutation,
  createManyPostMutationObject,
  createOnePostMutationObject,
  deleteManyPostMutationObject,
  deleteOnePostMutationObject,
  updateManyPostMutationObject,
  updateOnePostMutationObject,
  upsertOnePostMutationObject
} from './mutations';
export {
  findFirstPostQuery,
  findManyPostQuery,
  countPostQuery,
  findUniquePostQuery,
  findFirstPostQueryObject,
  findManyPostQueryObject,
  countPostQueryObject,
  findUniquePostQueryObject
} from './queries';
