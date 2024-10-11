import * as Inputs from "../../inputs";

import { BatchPayload } from '../../objects';import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyLastQuatricsResponseRetrievalMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.LastQuatricsResponseRetrievalWhereInput, required: false }),
      data: t.field({ type: Inputs.LastQuatricsResponseRetrievalUpdateManyMutationInput, required: true }),
    }))

export const updateManyLastQuatricsResponseRetrievalMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyLastQuatricsResponseRetrievalMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.lastQuatricsResponseRetrieval.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyLastQuatricsResponseRetrievalMutation = defineMutation((t) => ({
  updateManyLastQuatricsResponseRetrieval: t.field(updateManyLastQuatricsResponseRetrievalMutationObject(t)),
}));
