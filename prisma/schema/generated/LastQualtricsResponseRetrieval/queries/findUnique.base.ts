import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueLastQualtricsResponseRetrievalQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.LastQualtricsResponseRetrievalWhereUniqueInput, required: true }) }))

export const findUniqueLastQualtricsResponseRetrievalQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'LastQualtricsResponseRetrieval',
    nullable: true,
    args: findUniqueLastQualtricsResponseRetrievalQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.lastQualtricsResponseRetrieval.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueLastQualtricsResponseRetrievalQuery = defineQuery((t) => ({
  findUniqueLastQualtricsResponseRetrieval: t.prismaField(findUniqueLastQualtricsResponseRetrievalQueryObject(t)),
}));
