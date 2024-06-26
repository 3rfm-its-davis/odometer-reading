import * as Inputs from "../inputs";

import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const PostStatusObject = definePrismaObject('PostStatus', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(PostStatusIdFieldObject),
    createdAt: t.field(PostStatusCreatedAtFieldObject),
    type: t.field(PostStatusTypeFieldObject),
    Post: t.relation('Post', PostStatusPostFieldObject(t)),
  }),
});

export const PostStatusIdFieldObject = defineFieldObject('PostStatus', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const PostStatusCreatedAtFieldObject = defineFieldObject('PostStatus', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.createdAt,
});

export const PostStatusTypeFieldObject = defineFieldObject('PostStatus', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.type,
});

export const PostStatusPostFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.PostWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.PostOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.PostWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.PostScalarFieldEnum], required: false }),
}))

export const PostStatusPostFieldObject = defineRelationFunction('PostStatus', (t) =>
  defineRelationObject('PostStatus', 'Post', {
    description: undefined,
    nullable: false,
    args: PostStatusPostFieldArgs,
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
