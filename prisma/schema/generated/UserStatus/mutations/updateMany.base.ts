import * as Inputs from "../../inputs";

import { BatchPayload } from '../../objects';import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyUserStatusMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.UserStatusWhereInput, required: false }),
      data: t.field({ type: Inputs.UserStatusUpdateManyMutationInput, required: true }),
    }))

export const updateManyUserStatusMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyUserStatusMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.userStatus.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyUserStatusMutation = defineMutation((t) => ({
  updateManyUserStatus: t.field(updateManyUserStatusMutationObject(t)),
}));
