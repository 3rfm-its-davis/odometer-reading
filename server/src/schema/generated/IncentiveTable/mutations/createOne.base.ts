import * as Inputs from "../../inputs";
import { prisma } from "../../../../../src/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneIncentiveTableMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.IncentiveTableCreateInput, required: true }) }))

export const createOneIncentiveTableMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'IncentiveTable',
    nullable: false,
    args: createOneIncentiveTableMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.incentiveTable.create({ data: args.data, ...query }),
  }),
);

export const createOneIncentiveTableMutation = defineMutation((t) => ({
  createOneIncentiveTable: t.prismaField(createOneIncentiveTableMutationObject(t)),
}));
