import * as Inputs from "../../inputs";

import { BatchPayload } from '../../objects';import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyLastQualtricsResponseRetrievalMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.LastQualtricsResponseRetrievalWhereInput, required: true }) }))

export const deleteManyLastQualtricsResponseRetrievalMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyLastQualtricsResponseRetrievalMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.lastQualtricsResponseRetrieval.deleteMany({ where: args.where }),
  }),
);

export const deleteManyLastQualtricsResponseRetrievalMutation = defineMutation((t) => ({
  deleteManyLastQualtricsResponseRetrieval: t.field(deleteManyLastQualtricsResponseRetrievalMutationObject(t)),
}));
