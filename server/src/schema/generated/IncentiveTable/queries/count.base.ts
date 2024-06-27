import * as Inputs from "../../inputs";
import { prisma } from "../../../../../src/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countIncentiveTableQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.IncentiveTableWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.IncentiveTableOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.IncentiveTableWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.IncentiveTableScalarFieldEnum], required: false }),
}))

export const countIncentiveTableQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countIncentiveTableQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.incentiveTable.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countIncentiveTableQuery = defineQuery((t) => ({
  countIncentiveTable: t.field(countIncentiveTableQueryObject(t)),
}));
