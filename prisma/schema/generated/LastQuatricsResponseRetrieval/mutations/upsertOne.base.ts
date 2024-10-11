import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneLastQuatricsResponseRetrievalMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.LastQuatricsResponseRetrievalWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.LastQuatricsResponseRetrievalCreateInput, required: true }),
      update: t.field({ type: Inputs.LastQuatricsResponseRetrievalUpdateInput, required: true }),
    }))

export const upsertOneLastQuatricsResponseRetrievalMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'LastQuatricsResponseRetrieval',
    nullable: false,
    args: upsertOneLastQuatricsResponseRetrievalMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.lastQuatricsResponseRetrieval.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneLastQuatricsResponseRetrievalMutation = defineMutation((t) => ({
  upsertOneLastQuatricsResponseRetrieval: t.prismaField(upsertOneLastQuatricsResponseRetrievalMutationObject(t)),
}));
