import * as Inputs from "../inputs";

import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const ParticipationObject = definePrismaObject('Participation', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(ParticipationIdFieldObject),
    createdAt: t.field(ParticipationCreatedAtFieldObject),
    updatedAt: t.field(ParticipationUpdatedAtFieldObject),
    totalIncentive: t.field(ParticipationTotalIncentiveFieldObject),
    user: t.relation('user', ParticipationUserFieldObject),
    userId: t.field(ParticipationUserIdFieldObject),
  }),
});

export const ParticipationIdFieldObject = defineFieldObject('Participation', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const ParticipationCreatedAtFieldObject = defineFieldObject('Participation', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.createdAt,
});

export const ParticipationUpdatedAtFieldObject = defineFieldObject('Participation', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.updatedAt,
});

export const ParticipationTotalIncentiveFieldObject = defineFieldObject('Participation', {
  type: "Float",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.totalIncentive,
});

export const ParticipationUserFieldObject = defineRelationObject('Participation', 'user', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const ParticipationUserIdFieldObject = defineFieldObject('Participation', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.userId,
});
