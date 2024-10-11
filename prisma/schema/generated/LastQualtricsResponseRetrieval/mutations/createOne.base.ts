import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneLastQualtricsResponseRetrievalMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.LastQualtricsResponseRetrievalCreateInput, required: true }) }))

export const createOneLastQualtricsResponseRetrievalMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'LastQualtricsResponseRetrieval',
    nullable: false,
    args: createOneLastQualtricsResponseRetrievalMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.lastQualtricsResponseRetrieval.create({ data: args.data, ...query }),
  }),
);

export const createOneLastQualtricsResponseRetrievalMutation = defineMutation((t) => ({
  createOneLastQualtricsResponseRetrieval: t.prismaField(createOneLastQualtricsResponseRetrievalMutationObject(t)),
}));
