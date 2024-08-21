import * as Inputs from "../inputs";

import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const ReadingObject = definePrismaObject('Reading', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(ReadingIdFieldObject),
    createdAt: t.field(ReadingCreatedAtFieldObject),
    reading: t.field(ReadingReadingFieldObject),
    readBy: t.relation('readBy', ReadingReadByFieldObject),
    readById: t.field(ReadingReadByIdFieldObject),
    Post: t.relation('Post', ReadingPostFieldObject),
    postId: t.field(ReadingPostIdFieldObject),
  }),
});

export const ReadingIdFieldObject = defineFieldObject('Reading', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const ReadingCreatedAtFieldObject = defineFieldObject('Reading', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.createdAt,
});

export const ReadingReadingFieldObject = defineFieldObject('Reading', {
  type: "Float",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.reading,
});

export const ReadingReadByFieldObject = defineRelationObject('Reading', 'readBy', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const ReadingReadByIdFieldObject = defineFieldObject('Reading', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.readById,
});

export const ReadingPostFieldObject = defineRelationObject('Reading', 'Post', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const ReadingPostIdFieldObject = defineFieldObject('Reading', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.postId,
});
