import * as Inputs from "../../inputs";

import { BatchPayload } from '../../objects';import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyRejectionReasonMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.RejectionReasonWhereInput, required: false }),
      data: t.field({ type: Inputs.RejectionReasonUpdateManyMutationInput, required: true }),
    }))

export const updateManyRejectionReasonMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyRejectionReasonMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.rejectionReason.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyRejectionReasonMutation = defineMutation((t) => ({
  updateManyRejectionReason: t.field(updateManyRejectionReasonMutationObject(t)),
}));
