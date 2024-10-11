import * as Inputs from "../../inputs";

import { BatchPayload } from '../../objects';import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyLastQuatricsResponseRetrievalMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.LastQuatricsResponseRetrievalWhereInput, required: true }) }))

export const deleteManyLastQuatricsResponseRetrievalMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyLastQuatricsResponseRetrievalMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.lastQuatricsResponseRetrieval.deleteMany({ where: args.where }),
  }),
);

export const deleteManyLastQuatricsResponseRetrievalMutation = defineMutation((t) => ({
  deleteManyLastQuatricsResponseRetrieval: t.field(deleteManyLastQuatricsResponseRetrievalMutationObject(t)),
}));
