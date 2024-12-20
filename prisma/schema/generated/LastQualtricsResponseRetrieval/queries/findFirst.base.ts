import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstLastQualtricsResponseRetrievalQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.LastQualtricsResponseRetrievalWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.LastQualtricsResponseRetrievalOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.LastQualtricsResponseRetrievalWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.LastQualtricsResponseRetrievalScalarFieldEnum], required: false }),
}))

export const findFirstLastQualtricsResponseRetrievalQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'LastQualtricsResponseRetrieval',
    nullable: true,
    args: findFirstLastQualtricsResponseRetrievalQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.lastQualtricsResponseRetrieval.findFirst({
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

export const findFirstLastQualtricsResponseRetrievalQuery = defineQuery((t) => ({
  findFirstLastQualtricsResponseRetrieval: t.prismaField(findFirstLastQualtricsResponseRetrievalQueryObject(t)),
}));
