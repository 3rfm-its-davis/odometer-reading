import * as Inputs from "../inputs";

import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const MessageObject = definePrismaObject('Message', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(MessageIdFieldObject),
    createdAt: t.field(MessageCreatedAtFieldObject),
    message: t.field(MessageMessageFieldObject),
    sentBy: t.relation('sentBy', MessageSentByFieldObject),
    sentById: t.field(MessageSentByIdFieldObject),
  }),
});

export const MessageIdFieldObject = defineFieldObject('Message', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const MessageCreatedAtFieldObject = defineFieldObject('Message', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.createdAt,
});

export const MessageMessageFieldObject = defineFieldObject('Message', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.message,
});

export const MessageSentByFieldObject = defineRelationObject('Message', 'sentBy', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const MessageSentByIdFieldObject = defineFieldObject('Message', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.sentById,
});
