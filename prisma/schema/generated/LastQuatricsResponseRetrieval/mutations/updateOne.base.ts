import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneLastQuatricsResponseRetrievalMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.LastQuatricsResponseRetrievalWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.LastQuatricsResponseRetrievalUpdateInput, required: true }),
    }))

export const updateOneLastQuatricsResponseRetrievalMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'LastQuatricsResponseRetrieval',
    nullable: true,
    args: updateOneLastQuatricsResponseRetrievalMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.lastQuatricsResponseRetrieval.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneLastQuatricsResponseRetrievalMutation = defineMutation((t) => ({
  updateOneLastQuatricsResponseRetrieval: t.prismaField(updateOneLastQuatricsResponseRetrievalMutationObject(t)),
}));
