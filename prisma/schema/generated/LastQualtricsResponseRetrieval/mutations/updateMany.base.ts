import * as Inputs from "../../inputs";

import { BatchPayload } from '../../objects';import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyLastQualtricsResponseRetrievalMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.LastQualtricsResponseRetrievalWhereInput, required: false }),
      data: t.field({ type: Inputs.LastQualtricsResponseRetrievalUpdateManyMutationInput, required: true }),
    }))

export const updateManyLastQualtricsResponseRetrievalMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyLastQualtricsResponseRetrievalMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.lastQualtricsResponseRetrieval.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyLastQualtricsResponseRetrievalMutation = defineMutation((t) => ({
  updateManyLastQualtricsResponseRetrieval: t.field(updateManyLastQualtricsResponseRetrievalMutationObject(t)),
}));
