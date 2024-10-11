import * as Inputs from "../inputs";

import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const LastQuatricsResponseRetrievalObject = definePrismaObject('LastQuatricsResponseRetrieval', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(LastQuatricsResponseRetrievalIdFieldObject),
    updatedAt: t.field(LastQuatricsResponseRetrievalUpdatedAtFieldObject),
  }),
});

export const LastQuatricsResponseRetrievalIdFieldObject = defineFieldObject('LastQuatricsResponseRetrieval', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const LastQuatricsResponseRetrievalUpdatedAtFieldObject = defineFieldObject('LastQuatricsResponseRetrieval', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.updatedAt,
});
