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
    Post: t.relation('Post', AdminPostFieldObject(t)),
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

export const AdminPostFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.PostWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.PostOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.PostWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.PostScalarFieldEnum], required: false }),
}))

export const AdminPostFieldObject = defineRelationFunction('Admin', (t) =>
  defineRelationObject('Admin', 'Post', {
    description: undefined,
    nullable: false,
    args: AdminPostFieldArgs,
    query: (args) => ({
      where: args.where || undefined,
      cursor: args.cursor || undefined,
      take: args.take || undefined,
      distinct: args.distinct || undefined,
      skip: args.skip || undefined,
      orderBy: args.orderBy || undefined,
    }),
  }),
);
