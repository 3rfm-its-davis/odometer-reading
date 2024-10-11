import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneLastQualtricsResponseRetrievalMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.LastQualtricsResponseRetrievalWhereUniqueInput, required: true }) }))

export const deleteOneLastQualtricsResponseRetrievalMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'LastQualtricsResponseRetrieval',
    nullable: true,
    args: deleteOneLastQualtricsResponseRetrievalMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.lastQualtricsResponseRetrieval.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneLastQualtricsResponseRetrievalMutation = defineMutation((t) => ({
  deleteOneLastQualtricsResponseRetrieval: t.prismaField(deleteOneLastQualtricsResponseRetrievalMutationObject(t)),
}));
