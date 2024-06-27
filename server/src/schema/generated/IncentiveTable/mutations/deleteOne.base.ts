import * as Inputs from "../../inputs";
import { prisma } from "../../../../../src/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneIncentiveTableMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.IncentiveTableWhereUniqueInput, required: true }) }))

export const deleteOneIncentiveTableMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'IncentiveTable',
    nullable: true,
    args: deleteOneIncentiveTableMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.incentiveTable.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneIncentiveTableMutation = defineMutation((t) => ({
  deleteOneIncentiveTable: t.prismaField(deleteOneIncentiveTableMutationObject(t)),
}));
