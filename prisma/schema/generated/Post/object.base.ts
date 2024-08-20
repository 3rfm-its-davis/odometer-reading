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
    name: t.field(PostNameFieldObject),
    createdAt: t.field(PostCreatedAtFieldObject),
    image: t.field(PostImageFieldObject),
    reading: t.field(PostReadingFieldObject),
    postStatus: t.relation('postStatus', PostPostStatusFieldObject),
    postStatusId: t.field(PostPostStatusIdFieldObject),
    postedBy: t.relation('postedBy', PostPostedByFieldObject),
    postedById: t.field(PostPostedByIdFieldObject),
    notes: t.field(PostNotesFieldObject),
    size: t.field(PostSizeFieldObject),
  }),
});

export const PostIdFieldObject = defineFieldObject('Post', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const PostNameFieldObject = defineFieldObject('Post', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.name,
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

export const PostPostStatusIdFieldObject = defineFieldObject('Post', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.postStatusId,
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

export const PostNotesFieldObject = defineFieldObject('Post', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.notes,
});

export const PostSizeFieldObject = defineFieldObject('Post', {
  type: "Float",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.size,
});
