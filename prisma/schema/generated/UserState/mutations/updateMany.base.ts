import * as Inputs from "../../inputs";

import { BatchPayload } from '../../objects';import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyUserStateMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.UserStateWhereInput, required: false }),
      data: t.field({ type: Inputs.UserStateUpdateManyMutationInput, required: true }),
    }))

export const updateManyUserStateMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyUserStateMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.userState.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyUserStateMutation = defineMutation((t) => ({
  updateManyUserState: t.field(updateManyUserStateMutationObject(t)),
}));
