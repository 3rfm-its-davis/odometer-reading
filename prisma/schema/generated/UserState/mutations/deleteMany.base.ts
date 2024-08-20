import * as Inputs from "../../inputs";

import { BatchPayload } from '../../objects';import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyUserStateMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.UserStateWhereInput, required: true }) }))

export const deleteManyUserStateMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyUserStateMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.userState.deleteMany({ where: args.where }),
  }),
);

export const deleteManyUserStateMutation = defineMutation((t) => ({
  deleteManyUserState: t.field(deleteManyUserStateMutationObject(t)),
}));
