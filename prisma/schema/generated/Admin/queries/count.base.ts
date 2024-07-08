import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countAdminQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.AdminWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.AdminOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.AdminWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.AdminScalarFieldEnum], required: false }),
}))

export const countAdminQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countAdminQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.admin.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countAdminQuery = defineQuery((t) => ({
  countAdmin: t.field(countAdminQueryObject(t)),
}));
