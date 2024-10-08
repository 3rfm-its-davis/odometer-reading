import * as Inputs from "../inputs";

import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const InvitationObject = definePrismaObject('Invitation', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(InvitationIdFieldObject),
    createdAt: t.field(InvitationCreatedAtFieldObject),
    sentBy: t.relation('sentBy', InvitationSentByFieldObject),
    sentById: t.field(InvitationSentByIdFieldObject),
    sentTo: t.relation('sentTo', InvitationSentToFieldObject),
    sentToId: t.field(InvitationSentToIdFieldObject),
  }),
});

export const InvitationIdFieldObject = defineFieldObject('Invitation', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const InvitationCreatedAtFieldObject = defineFieldObject('Invitation', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.createdAt,
});

export const InvitationSentByFieldObject = defineRelationObject('Invitation', 'sentBy', {
  description: undefined,
  nullable: true,
  args: undefined,
  query: undefined,
});

export const InvitationSentByIdFieldObject = defineFieldObject('Invitation', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.sentById,
});

export const InvitationSentToFieldObject = defineRelationObject('Invitation', 'sentTo', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const InvitationSentToIdFieldObject = defineFieldObject('Invitation', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.sentToId,
});
