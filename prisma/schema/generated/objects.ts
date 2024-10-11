import { Prisma } from "@prisma/client";
export {
  UserObject,
  UserIdFieldObject,
  UserEmailFieldObject,
  UserCreatedAtFieldObject,
  UserUpdatedAtFieldObject,
  UserActivatedAtFieldObject,
  UserDeletedAtFieldObject,
  UserPhoneNumberFieldObject,
  UserAccessCodeFieldObject,
  UserPostsFieldObject,
  UserParticipationFieldObject,
  UserUserStatusFieldObject,
  UserUserStatusIdFieldObject,
  UserInvitationsFieldObject,
  UserMessagesFieldObject,
  createManyUserMutation,
  createOneUserMutation,
  deleteManyUserMutation,
  deleteOneUserMutation,
  updateManyUserMutation,
  updateOneUserMutation,
  upsertOneUserMutation,
  createManyUserMutationObject,
  createOneUserMutationObject,
  deleteManyUserMutationObject,
  deleteOneUserMutationObject,
  updateManyUserMutationObject,
  updateOneUserMutationObject,
  upsertOneUserMutationObject,
  findFirstUserQuery,
  findManyUserQuery,
  countUserQuery,
  findUniqueUserQuery,
  findFirstUserQueryObject,
  findManyUserQueryObject,
  countUserQueryObject,
  findUniqueUserQueryObject
} from './User';
export {
  UserStatusObject,
  UserStatusIdFieldObject,
  UserStatusCreatedAtFieldObject,
  UserStatusUserFieldObject,
  createManyUserStatusMutation,
  createOneUserStatusMutation,
  deleteManyUserStatusMutation,
  deleteOneUserStatusMutation,
  updateManyUserStatusMutation,
  updateOneUserStatusMutation,
  upsertOneUserStatusMutation,
  createManyUserStatusMutationObject,
  createOneUserStatusMutationObject,
  deleteManyUserStatusMutationObject,
  deleteOneUserStatusMutationObject,
  updateManyUserStatusMutationObject,
  updateOneUserStatusMutationObject,
  upsertOneUserStatusMutationObject,
  findFirstUserStatusQuery,
  findManyUserStatusQuery,
  countUserStatusQuery,
  findUniqueUserStatusQuery,
  findFirstUserStatusQueryObject,
  findManyUserStatusQueryObject,
  countUserStatusQueryObject,
  findUniqueUserStatusQueryObject
} from './UserStatus';
export {
  AdminObject,
  AdminIdFieldObject,
  AdminEmailFieldObject,
  AdminPasswordFieldObject,
  AdminPostFieldObject,
  AdminInvitationFieldObject,
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
  upsertOneAdminMutationObject,
  findFirstAdminQuery,
  findManyAdminQuery,
  countAdminQuery,
  findUniqueAdminQuery,
  findFirstAdminQueryObject,
  findManyAdminQueryObject,
  countAdminQueryObject,
  findUniqueAdminQueryObject
} from './Admin';
export {
  PostObject,
  PostIdFieldObject,
  PostCreatedAtFieldObject,
  PostImageFieldObject,
  PostReadingFieldObject,
  PostPostStatusFieldObject,
  PostPostStatusIdFieldObject,
  PostStatusChangedByFieldObject,
  PostStatusChangedByIdFieldObject,
  PostPostedByFieldObject,
  PostPostedByIdFieldObject,
  PostNotesFieldObject,
  PostSizeFieldObject,
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
  upsertOnePostMutationObject,
  findFirstPostQuery,
  findManyPostQuery,
  countPostQuery,
  findUniquePostQuery,
  findFirstPostQueryObject,
  findManyPostQueryObject,
  countPostQueryObject,
  findUniquePostQueryObject
} from './Post';
export {
  PostStatusObject,
  PostStatusIdFieldObject,
  PostStatusCreatedAtFieldObject,
  PostStatusPostFieldObject,
  createManyPostStatusMutation,
  createOnePostStatusMutation,
  deleteManyPostStatusMutation,
  deleteOnePostStatusMutation,
  updateManyPostStatusMutation,
  updateOnePostStatusMutation,
  upsertOnePostStatusMutation,
  createManyPostStatusMutationObject,
  createOnePostStatusMutationObject,
  deleteManyPostStatusMutationObject,
  deleteOnePostStatusMutationObject,
  updateManyPostStatusMutationObject,
  updateOnePostStatusMutationObject,
  upsertOnePostStatusMutationObject,
  findFirstPostStatusQuery,
  findManyPostStatusQuery,
  countPostStatusQuery,
  findUniquePostStatusQuery,
  findFirstPostStatusQueryObject,
  findManyPostStatusQueryObject,
  countPostStatusQueryObject,
  findUniquePostStatusQueryObject
} from './PostStatus';
export {
  MessageObject,
  MessageIdFieldObject,
  MessageCreatedAtFieldObject,
  MessageMessageFieldObject,
  MessageSentByFieldObject,
  MessageSentByIdFieldObject,
  createManyMessageMutation,
  createOneMessageMutation,
  deleteManyMessageMutation,
  deleteOneMessageMutation,
  updateManyMessageMutation,
  updateOneMessageMutation,
  upsertOneMessageMutation,
  createManyMessageMutationObject,
  createOneMessageMutationObject,
  deleteManyMessageMutationObject,
  deleteOneMessageMutationObject,
  updateManyMessageMutationObject,
  updateOneMessageMutationObject,
  upsertOneMessageMutationObject,
  findFirstMessageQuery,
  findManyMessageQuery,
  countMessageQuery,
  findUniqueMessageQuery,
  findFirstMessageQueryObject,
  findManyMessageQueryObject,
  countMessageQueryObject,
  findUniqueMessageQueryObject
} from './Message';
export {
  ParticipationObject,
  ParticipationIdFieldObject,
  ParticipationCreatedAtFieldObject,
  ParticipationUpdatedAtFieldObject,
  ParticipationTotalIncentiveFieldObject,
  ParticipationUserFieldObject,
  ParticipationUserIdFieldObject,
  createManyParticipationMutation,
  createOneParticipationMutation,
  deleteManyParticipationMutation,
  deleteOneParticipationMutation,
  updateManyParticipationMutation,
  updateOneParticipationMutation,
  upsertOneParticipationMutation,
  createManyParticipationMutationObject,
  createOneParticipationMutationObject,
  deleteManyParticipationMutationObject,
  deleteOneParticipationMutationObject,
  updateManyParticipationMutationObject,
  updateOneParticipationMutationObject,
  upsertOneParticipationMutationObject,
  findFirstParticipationQuery,
  findManyParticipationQuery,
  countParticipationQuery,
  findUniqueParticipationQuery,
  findFirstParticipationQueryObject,
  findManyParticipationQueryObject,
  countParticipationQueryObject,
  findUniqueParticipationQueryObject
} from './Participation';
export {
  IncentiveTableObject,
  IncentiveTableIdFieldObject,
  IncentiveTableIndexFieldObject,
  IncentiveTableIncentiveFieldObject,
  createManyIncentiveTableMutation,
  createOneIncentiveTableMutation,
  deleteManyIncentiveTableMutation,
  deleteOneIncentiveTableMutation,
  updateManyIncentiveTableMutation,
  updateOneIncentiveTableMutation,
  upsertOneIncentiveTableMutation,
  createManyIncentiveTableMutationObject,
  createOneIncentiveTableMutationObject,
  deleteManyIncentiveTableMutationObject,
  deleteOneIncentiveTableMutationObject,
  updateManyIncentiveTableMutationObject,
  updateOneIncentiveTableMutationObject,
  upsertOneIncentiveTableMutationObject,
  findFirstIncentiveTableQuery,
  findManyIncentiveTableQuery,
  countIncentiveTableQuery,
  findUniqueIncentiveTableQuery,
  findFirstIncentiveTableQueryObject,
  findManyIncentiveTableQueryObject,
  countIncentiveTableQueryObject,
  findUniqueIncentiveTableQueryObject
} from './IncentiveTable';
export {
  InvitationObject,
  InvitationIdFieldObject,
  InvitationCreatedAtFieldObject,
  InvitationSentByFieldObject,
  InvitationSentByIdFieldObject,
  InvitationSentToFieldObject,
  InvitationSentToIdFieldObject,
  createManyInvitationMutation,
  createOneInvitationMutation,
  deleteManyInvitationMutation,
  deleteOneInvitationMutation,
  updateManyInvitationMutation,
  updateOneInvitationMutation,
  upsertOneInvitationMutation,
  createManyInvitationMutationObject,
  createOneInvitationMutationObject,
  deleteManyInvitationMutationObject,
  deleteOneInvitationMutationObject,
  updateManyInvitationMutationObject,
  updateOneInvitationMutationObject,
  upsertOneInvitationMutationObject,
  findFirstInvitationQuery,
  findManyInvitationQuery,
  countInvitationQuery,
  findUniqueInvitationQuery,
  findFirstInvitationQueryObject,
  findManyInvitationQueryObject,
  countInvitationQueryObject,
  findUniqueInvitationQueryObject
} from './Invitation';
export {
  LastQualtricsResponseRetrievalObject,
  LastQualtricsResponseRetrievalIdFieldObject,
  createManyLastQualtricsResponseRetrievalMutation,
  createOneLastQualtricsResponseRetrievalMutation,
  deleteManyLastQualtricsResponseRetrievalMutation,
  deleteOneLastQualtricsResponseRetrievalMutation,
  updateManyLastQualtricsResponseRetrievalMutation,
  updateOneLastQualtricsResponseRetrievalMutation,
  upsertOneLastQualtricsResponseRetrievalMutation,
  createManyLastQualtricsResponseRetrievalMutationObject,
  createOneLastQualtricsResponseRetrievalMutationObject,
  deleteManyLastQualtricsResponseRetrievalMutationObject,
  deleteOneLastQualtricsResponseRetrievalMutationObject,
  updateManyLastQualtricsResponseRetrievalMutationObject,
  updateOneLastQualtricsResponseRetrievalMutationObject,
  upsertOneLastQualtricsResponseRetrievalMutationObject,
  findFirstLastQualtricsResponseRetrievalQuery,
  findManyLastQualtricsResponseRetrievalQuery,
  countLastQualtricsResponseRetrievalQuery,
  findUniqueLastQualtricsResponseRetrievalQuery,
  findFirstLastQualtricsResponseRetrievalQueryObject,
  findManyLastQualtricsResponseRetrievalQueryObject,
  countLastQualtricsResponseRetrievalQueryObject,
  findUniqueLastQualtricsResponseRetrievalQueryObject
} from './LastQualtricsResponseRetrieval';
import { builder } from '../builder';

export const BatchPayload = builder.objectType(builder.objectRef<Prisma.BatchPayload>('BatchPayload'), {
  description: 'Batch payloads from prisma.',
  fields: (t) => ({
    count: t.exposeInt('count', { description: 'Prisma Batch Payload', nullable: false }),
  }),
});

export const modelNames = [
  'User',
  'UserStatus',
  'Admin',
  'Post',
  'PostStatus',
  'Message',
  'Participation',
  'IncentiveTable',
  'Invitation',
  'LastQualtricsResponseRetrieval',
] as const;

export type Model = typeof modelNames[number];
