import * as Inputs from "../../inputs";
import { prisma } from "../../../../../src/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyIncentiveTableQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.IncentiveTableWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.IncentiveTableOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.IncentiveTableWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.IncentiveTableScalarFieldEnum], required: false }),
}))

export const findManyIncentiveTableQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['IncentiveTable'],
    nullable: false,
    args: findManyIncentiveTableQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.incentiveTable.findMany({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        ...query,
      }),
  }),
);

export const findManyIncentiveTableQuery = defineQuery((t) => ({
  findManyIncentiveTable: t.prismaField(findManyIncentiveTableQueryObject(t)),
}));
