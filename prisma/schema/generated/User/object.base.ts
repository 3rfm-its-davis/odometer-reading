import * as Inputs from "../inputs";

import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const UserObject = definePrismaObject('User', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(UserIdFieldObject),
    createdAt: t.field(UserCreatedAtFieldObject),
    updatedAt: t.field(UserUpdatedAtFieldObject),
    activatedAt: t.field(UserActivatedAtFieldObject),
    deletedAt: t.field(UserDeletedAtFieldObject),
    phoneNumber: t.field(UserPhoneNumberFieldObject),
    accessCode: t.field(UserAccessCodeFieldObject),
    posts: t.relation('posts', UserPostsFieldObject(t)),
    participation: t.relation('participation', UserParticipationFieldObject),
    userStatus: t.relation('userStatus', UserUserStatusFieldObject),
    userStatusId: t.field(UserUserStatusIdFieldObject),
  }),
});

export const UserIdFieldObject = defineFieldObject('User', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const UserCreatedAtFieldObject = defineFieldObject('User', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.createdAt,
});

export const UserUpdatedAtFieldObject = defineFieldObject('User', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.updatedAt,
});

export const UserActivatedAtFieldObject = defineFieldObject('User', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.activatedAt,
});

export const UserDeletedAtFieldObject = defineFieldObject('User', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.deletedAt,
});

export const UserPhoneNumberFieldObject = defineFieldObject('User', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.phoneNumber,
});

export const UserAccessCodeFieldObject = defineFieldObject('User', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.accessCode,
});

export const UserPostsFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.PostWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.PostOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.PostWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.PostScalarFieldEnum], required: false }),
}))

export const UserPostsFieldObject = defineRelationFunction('User', (t) =>
  defineRelationObject('User', 'posts', {
    description: undefined,
    nullable: false,
    args: UserPostsFieldArgs,
    query: (args) => ({
      where: args.where || undefined,
      cursor: args.cursor || undefined,
      take: args.take || undefined,
      distinct: args.distinct || undefined,
      skip: args.skip || undefined,
      orderBy: args.orderBy || undefined,
    }),
  }),
);

export const UserParticipationFieldObject = defineRelationObject('User', 'participation', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const UserUserStatusFieldObject = defineRelationObject('User', 'userStatus', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const UserUserStatusIdFieldObject = defineFieldObject('User', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.userStatusId,
});
