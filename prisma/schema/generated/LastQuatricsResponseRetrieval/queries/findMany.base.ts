import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyLastQuatricsResponseRetrievalQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.LastQuatricsResponseRetrievalWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.LastQuatricsResponseRetrievalOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.LastQuatricsResponseRetrievalWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.LastQuatricsResponseRetrievalScalarFieldEnum], required: false }),
}))

export const findManyLastQuatricsResponseRetrievalQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['LastQuatricsResponseRetrieval'],
    nullable: false,
    args: findManyLastQuatricsResponseRetrievalQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.lastQuatricsResponseRetrieval.findMany({
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

export const findManyLastQuatricsResponseRetrievalQuery = defineQuery((t) => ({
  findManyLastQuatricsResponseRetrieval: t.prismaField(findManyLastQuatricsResponseRetrievalQueryObject(t)),
}));
