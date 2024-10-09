import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyMessageQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.MessageWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.MessageOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.MessageWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.MessageScalarFieldEnum], required: false }),
}))

export const findManyMessageQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['Message'],
    nullable: false,
    args: findManyMessageQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.message.findMany({
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

export const findManyMessageQuery = defineQuery((t) => ({
  findManyMessage: t.prismaField(findManyMessageQueryObject(t)),
}));