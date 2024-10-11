import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyLastQualtricsResponseRetrievalMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.LastQualtricsResponseRetrievalCreateInput], required: true }) }))

export const createManyLastQualtricsResponseRetrievalMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['LastQualtricsResponseRetrieval'],
    nullable: false,
    args: createManyLastQualtricsResponseRetrievalMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.lastQualtricsResponseRetrieval.create({ data }))),
  }),
);

export const createManyLastQualtricsResponseRetrievalMutation = defineMutation((t) => ({
  createManyLastQualtricsResponseRetrieval: t.prismaField(createManyLastQualtricsResponseRetrievalMutationObject(t)),
}));
