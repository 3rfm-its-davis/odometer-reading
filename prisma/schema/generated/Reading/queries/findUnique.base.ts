import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueReadingQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.ReadingWhereUniqueInput, required: true }) }))

export const findUniqueReadingQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Reading',
    nullable: true,
    args: findUniqueReadingQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.reading.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueReadingQuery = defineQuery((t) => ({
  findUniqueReading: t.prismaField(findUniqueReadingQueryObject(t)),
}));
