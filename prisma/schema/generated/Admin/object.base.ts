import * as Inputs from "../inputs";

import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const AdminObject = definePrismaObject('Admin', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(AdminIdFieldObject),
    email: t.field(AdminEmailFieldObject),
    password: t.field(AdminPasswordFieldObject),
  }),
});

export const AdminIdFieldObject = defineFieldObject('Admin', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const AdminEmailFieldObject = defineFieldObject('Admin', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.email,
});

export const AdminPasswordFieldObject = defineFieldObject('Admin', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.password,
});
