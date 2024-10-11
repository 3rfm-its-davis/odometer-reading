import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countLastQualtricsResponseRetrievalQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.LastQualtricsResponseRetrievalWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.LastQualtricsResponseRetrievalOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.LastQualtricsResponseRetrievalWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.LastQualtricsResponseRetrievalScalarFieldEnum], required: false }),
}))

export const countLastQualtricsResponseRetrievalQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countLastQualtricsResponseRetrievalQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.lastQualtricsResponseRetrieval.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countLastQualtricsResponseRetrievalQuery = defineQuery((t) => ({
  countLastQualtricsResponseRetrieval: t.field(countLastQualtricsResponseRetrievalQueryObject(t)),
}));
