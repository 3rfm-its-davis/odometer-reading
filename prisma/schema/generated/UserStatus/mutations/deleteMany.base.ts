import * as Inputs from "../../inputs";

import { BatchPayload } from '../../objects';import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyUserStatusMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.UserStatusWhereInput, required: true }) }))

export const deleteManyUserStatusMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyUserStatusMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.userStatus.deleteMany({ where: args.where }),
  }),
);

export const deleteManyUserStatusMutation = defineMutation((t) => ({
  deleteManyUserStatus: t.field(deleteManyUserStatusMutationObject(t)),
}));
