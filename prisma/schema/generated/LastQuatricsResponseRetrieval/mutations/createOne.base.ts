import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneLastQuatricsResponseRetrievalMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.LastQuatricsResponseRetrievalCreateInput, required: true }) }))

export const createOneLastQuatricsResponseRetrievalMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'LastQuatricsResponseRetrieval',
    nullable: false,
    args: createOneLastQuatricsResponseRetrievalMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.lastQuatricsResponseRetrieval.create({ data: args.data, ...query }),
  }),
);

export const createOneLastQuatricsResponseRetrievalMutation = defineMutation((t) => ({
  createOneLastQuatricsResponseRetrieval: t.prismaField(createOneLastQuatricsResponseRetrievalMutationObject(t)),
}));
