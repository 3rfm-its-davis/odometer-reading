import * as Inputs from "../../inputs";

import { BatchPayload } from '../../objects';import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyPostStatusMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.PostStatusWhereInput, required: false }),
      data: t.field({ type: Inputs.PostStatusUpdateManyMutationInput, required: true }),
    }))

export const updateManyPostStatusMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyPostStatusMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.postStatus.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyPostStatusMutation = defineMutation((t) => ({
  updateManyPostStatus: t.field(updateManyPostStatusMutationObject(t)),
}));
