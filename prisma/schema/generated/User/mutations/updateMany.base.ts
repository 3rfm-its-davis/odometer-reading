import * as Inputs from "../../inputs";

import { BatchPayload } from '../../objects';import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyUserMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.UserWhereInput, required: false }),
      data: t.field({ type: Inputs.UserUpdateManyMutationInput, required: true }),
    }))

export const updateManyUserMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyUserMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.user.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyUserMutation = defineMutation((t) => ({
  updateManyUser: t.field(updateManyUserMutationObject(t)),
}));
