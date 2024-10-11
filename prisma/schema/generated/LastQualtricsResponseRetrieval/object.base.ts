import * as Inputs from "../inputs";

import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const LastQualtricsResponseRetrievalObject = definePrismaObject('LastQualtricsResponseRetrieval', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(LastQualtricsResponseRetrievalIdFieldObject),
  }),
});

export const LastQualtricsResponseRetrievalIdFieldObject = defineFieldObject('LastQualtricsResponseRetrieval', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});
