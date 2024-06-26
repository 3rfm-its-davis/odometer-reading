import * as Inputs from "../../inputs";

import { BatchPayload } from '../../objects';import { prisma } from "../../../../../src/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyPostStatusMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.PostStatusWhereInput, required: true }) }))

export const deleteManyPostStatusMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyPostStatusMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.postStatus.deleteMany({ where: args.where }),
  }),
);

export const deleteManyPostStatusMutation = defineMutation((t) => ({
  deleteManyPostStatus: t.field(deleteManyPostStatusMutationObject(t)),
}));
