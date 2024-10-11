import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneLastQualtricsResponseRetrievalMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.LastQualtricsResponseRetrievalWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.LastQualtricsResponseRetrievalUpdateInput, required: true }),
    }))

export const updateOneLastQualtricsResponseRetrievalMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'LastQualtricsResponseRetrieval',
    nullable: true,
    args: updateOneLastQualtricsResponseRetrievalMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.lastQualtricsResponseRetrieval.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneLastQualtricsResponseRetrievalMutation = defineMutation((t) => ({
  updateOneLastQualtricsResponseRetrieval: t.prismaField(updateOneLastQualtricsResponseRetrievalMutationObject(t)),
}));
