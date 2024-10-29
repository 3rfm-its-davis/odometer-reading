import * as Inputs from "../../inputs";

import { BatchPayload } from '../../objects';import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyRejectionReasonMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.RejectionReasonWhereInput, required: true }) }))

export const deleteManyRejectionReasonMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyRejectionReasonMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.rejectionReason.deleteMany({ where: args.where }),
  }),
);

export const deleteManyRejectionReasonMutation = defineMutation((t) => ({
  deleteManyRejectionReason: t.field(deleteManyRejectionReasonMutationObject(t)),
}));
