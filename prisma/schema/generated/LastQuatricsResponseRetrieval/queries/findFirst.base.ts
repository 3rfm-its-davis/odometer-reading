import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstLastQuatricsResponseRetrievalQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.LastQuatricsResponseRetrievalWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.LastQuatricsResponseRetrievalOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.LastQuatricsResponseRetrievalWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.LastQuatricsResponseRetrievalScalarFieldEnum], required: false }),
}))

export const findFirstLastQuatricsResponseRetrievalQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'LastQuatricsResponseRetrieval',
    nullable: true,
    args: findFirstLastQuatricsResponseRetrievalQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.lastQuatricsResponseRetrieval.findFirst({
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

export const findFirstLastQuatricsResponseRetrievalQuery = defineQuery((t) => ({
  findFirstLastQuatricsResponseRetrieval: t.prismaField(findFirstLastQuatricsResponseRetrievalQueryObject(t)),
}));
