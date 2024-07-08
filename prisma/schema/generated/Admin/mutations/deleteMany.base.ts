import * as Inputs from "../../inputs";

import { BatchPayload } from '../../objects';import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyAdminMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.AdminWhereInput, required: true }) }))

export const deleteManyAdminMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyAdminMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.admin.deleteMany({ where: args.where }),
  }),
);

export const deleteManyAdminMutation = defineMutation((t) => ({
  deleteManyAdmin: t.field(deleteManyAdminMutationObject(t)),
}));
