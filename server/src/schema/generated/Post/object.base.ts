import * as Inputs from "../inputs";

import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const PostObject = definePrismaObject('Post', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(PostIdFieldObject),
    createdAt: t.field(PostCreatedAtFieldObject),
    image: t.field(PostImageFieldObject),
    reading: t.field(PostReadingFieldObject),
    postStatus: t.relation('postStatus', PostPostStatusFieldObject),
    statusId: t.field(PostStatusIdFieldObject),
    postedBy: t.relation('postedBy', PostPostedByFieldObject),
    postedById: t.field(PostPostedByIdFieldObject),
  }),
});

export const PostIdFieldObject = defineFieldObject('Post', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const PostCreatedAtFieldObject = defineFieldObject('Post', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.createdAt,
});

export const PostImageFieldObject = defineFieldObject('Post', {
  type: Inputs.Bytes,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.image,
});

export const PostReadingFieldObject = defineFieldObject('Post', {
  type: "Float",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.reading,
});

export const PostPostStatusFieldObject = defineRelationObject('Post', 'postStatus', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const PostStatusIdFieldObject = defineFieldObject('Post', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.statusId,
});

export const PostPostedByFieldObject = defineRelationObject('Post', 'postedBy', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const PostPostedByIdFieldObject = defineFieldObject('Post', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.postedById,
});
