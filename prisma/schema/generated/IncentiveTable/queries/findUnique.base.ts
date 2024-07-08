import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueIncentiveTableQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.IncentiveTableWhereUniqueInput, required: true }) }))

export const findUniqueIncentiveTableQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'IncentiveTable',
    nullable: true,
    args: findUniqueIncentiveTableQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.incentiveTable.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueIncentiveTableQuery = defineQuery((t) => ({
  findUniqueIncentiveTable: t.prismaField(findUniqueIncentiveTableQueryObject(t)),
}));
