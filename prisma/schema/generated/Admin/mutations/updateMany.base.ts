import * as Inputs from "../../inputs";

import { BatchPayload } from '../../objects';import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyAdminMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.AdminWhereInput, required: false }),
      data: t.field({ type: Inputs.AdminUpdateManyMutationInput, required: true }),
    }))

export const updateManyAdminMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyAdminMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.admin.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyAdminMutation = defineMutation((t) => ({
  updateManyAdmin: t.field(updateManyAdminMutationObject(t)),
}));
