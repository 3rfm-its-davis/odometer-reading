import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneLastQuatricsResponseRetrievalMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.LastQuatricsResponseRetrievalWhereUniqueInput, required: true }) }))

export const deleteOneLastQuatricsResponseRetrievalMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'LastQuatricsResponseRetrieval',
    nullable: true,
    args: deleteOneLastQuatricsResponseRetrievalMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.lastQuatricsResponseRetrieval.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneLastQuatricsResponseRetrievalMutation = defineMutation((t) => ({
  deleteOneLastQuatricsResponseRetrieval: t.prismaField(deleteOneLastQuatricsResponseRetrievalMutationObject(t)),
}));
