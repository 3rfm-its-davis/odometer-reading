import * as Inputs from "../../inputs";

import { BatchPayload } from '../../objects';import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyIncentiveTableMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.IncentiveTableWhereInput, required: false }),
      data: t.field({ type: Inputs.IncentiveTableUpdateManyMutationInput, required: true }),
    }))

export const updateManyIncentiveTableMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyIncentiveTableMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.incentiveTable.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyIncentiveTableMutation = defineMutation((t) => ({
  updateManyIncentiveTable: t.field(updateManyIncentiveTableMutationObject(t)),
}));
