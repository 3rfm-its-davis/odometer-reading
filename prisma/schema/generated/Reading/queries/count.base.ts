import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countReadingQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.ReadingWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.ReadingOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.ReadingWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.ReadingScalarFieldEnum], required: false }),
}))

export const countReadingQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countReadingQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.reading.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countReadingQuery = defineQuery((t) => ({
  countReading: t.field(countReadingQueryObject(t)),
}));
