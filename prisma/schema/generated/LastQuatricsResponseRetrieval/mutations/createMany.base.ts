import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyLastQuatricsResponseRetrievalMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.LastQuatricsResponseRetrievalCreateInput], required: true }) }))

export const createManyLastQuatricsResponseRetrievalMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['LastQuatricsResponseRetrieval'],
    nullable: false,
    args: createManyLastQuatricsResponseRetrievalMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.lastQuatricsResponseRetrieval.create({ data }))),
  }),
);

export const createManyLastQuatricsResponseRetrievalMutation = defineMutation((t) => ({
  createManyLastQuatricsResponseRetrieval: t.prismaField(createManyLastQuatricsResponseRetrievalMutationObject(t)),
}));
