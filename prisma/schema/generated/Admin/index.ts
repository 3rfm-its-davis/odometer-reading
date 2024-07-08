export {
  AdminObject,
  AdminIdFieldObject,
  AdminEmailFieldObject,
  AdminPasswordFieldObject
} from './object.base';
export {
  createManyAdminMutation,
  createOneAdminMutation,
  deleteManyAdminMutation,
  deleteOneAdminMutation,
  updateManyAdminMutation,
  updateOneAdminMutation,
  upsertOneAdminMutation,
  createManyAdminMutationObject,
  createOneAdminMutationObject,
  deleteManyAdminMutationObject,
  deleteOneAdminMutationObject,
  updateManyAdminMutationObject,
  updateOneAdminMutationObject,
  upsertOneAdminMutationObject
} from './mutations';
export {
  findFirstAdminQuery,
  findManyAdminQuery,
  countAdminQuery,
  findUniqueAdminQuery,
  findFirstAdminQueryObject,
  findManyAdminQueryObject,
  countAdminQueryObject,
  findUniqueAdminQueryObject
} from './queries';
