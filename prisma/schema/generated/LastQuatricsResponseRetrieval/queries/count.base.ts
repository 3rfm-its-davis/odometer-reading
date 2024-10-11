import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countLastQuatricsResponseRetrievalQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.LastQuatricsResponseRetrievalWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.LastQuatricsResponseRetrievalOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.LastQuatricsResponseRetrievalWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.LastQuatricsResponseRetrievalScalarFieldEnum], required: false }),
}))

export const countLastQuatricsResponseRetrievalQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countLastQuatricsResponseRetrievalQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.lastQuatricsResponseRetrieval.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countLastQuatricsResponseRetrievalQuery = defineQuery((t) => ({
  countLastQuatricsResponseRetrieval: t.field(countLastQuatricsResponseRetrievalQueryObject(t)),
}));
