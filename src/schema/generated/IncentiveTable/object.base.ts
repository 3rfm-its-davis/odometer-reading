import * as Inputs from "../inputs";

import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const IncentiveTableObject = definePrismaObject('IncentiveTable', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(IncentiveTableIdFieldObject),
    index: t.field(IncentiveTableIndexFieldObject),
    incentive: t.field(IncentiveTableIncentiveFieldObject),
  }),
});

export const IncentiveTableIdFieldObject = defineFieldObject('IncentiveTable', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const IncentiveTableIndexFieldObject = defineFieldObject('IncentiveTable', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.index,
});

export const IncentiveTableIncentiveFieldObject = defineFieldObject('IncentiveTable', {
  type: "Float",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.incentive,
});
