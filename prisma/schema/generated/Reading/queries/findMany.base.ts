import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyReadingQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.ReadingWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.ReadingOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.ReadingWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.ReadingScalarFieldEnum], required: false }),
}))

export const findManyReadingQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['Reading'],
    nullable: false,
    args: findManyReadingQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.reading.findMany({
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

export const findManyReadingQuery = defineQuery((t) => ({
  findManyReading: t.prismaField(findManyReadingQueryObject(t)),
}));
