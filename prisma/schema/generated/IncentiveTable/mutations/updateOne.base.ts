import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneIncentiveTableMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.IncentiveTableWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.IncentiveTableUpdateInput, required: true }),
    }))

export const updateOneIncentiveTableMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'IncentiveTable',
    nullable: true,
    args: updateOneIncentiveTableMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.incentiveTable.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneIncentiveTableMutation = defineMutation((t) => ({
  updateOneIncentiveTable: t.prismaField(updateOneIncentiveTableMutationObject(t)),
}));
