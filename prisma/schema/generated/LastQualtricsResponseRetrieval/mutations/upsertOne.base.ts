import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneLastQualtricsResponseRetrievalMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.LastQualtricsResponseRetrievalWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.LastQualtricsResponseRetrievalCreateInput, required: true }),
      update: t.field({ type: Inputs.LastQualtricsResponseRetrievalUpdateInput, required: true }),
    }))

export const upsertOneLastQualtricsResponseRetrievalMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'LastQualtricsResponseRetrieval',
    nullable: false,
    args: upsertOneLastQualtricsResponseRetrievalMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.lastQualtricsResponseRetrieval.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneLastQualtricsResponseRetrievalMutation = defineMutation((t) => ({
  upsertOneLastQualtricsResponseRetrieval: t.prismaField(upsertOneLastQualtricsResponseRetrievalMutationObject(t)),
}));
