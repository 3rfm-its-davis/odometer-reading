import * as Inputs from "../../inputs";

import { BatchPayload } from '../../objects';import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyIncentiveTableMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.IncentiveTableWhereInput, required: true }) }))

export const deleteManyIncentiveTableMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyIncentiveTableMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.incentiveTable.deleteMany({ where: args.where }),
  }),
);

export const deleteManyIncentiveTableMutation = defineMutation((t) => ({
  deleteManyIncentiveTable: t.field(deleteManyIncentiveTableMutationObject(t)),
}));
