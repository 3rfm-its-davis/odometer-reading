import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueLastQuatricsResponseRetrievalQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.LastQuatricsResponseRetrievalWhereUniqueInput, required: true }) }))

export const findUniqueLastQuatricsResponseRetrievalQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'LastQuatricsResponseRetrieval',
    nullable: true,
    args: findUniqueLastQuatricsResponseRetrievalQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.lastQuatricsResponseRetrieval.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueLastQuatricsResponseRetrievalQuery = defineQuery((t) => ({
  findUniqueLastQuatricsResponseRetrieval: t.prismaField(findUniqueLastQuatricsResponseRetrievalQueryObject(t)),
}));
