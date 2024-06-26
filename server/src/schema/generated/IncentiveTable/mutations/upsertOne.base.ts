import * as Inputs from "../../inputs";
import { prisma } from "../../../../../src/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneIncentiveTableMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.IncentiveTableWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.IncentiveTableCreateInput, required: true }),
      update: t.field({ type: Inputs.IncentiveTableUpdateInput, required: true }),
    }))

export const upsertOneIncentiveTableMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'IncentiveTable',
    nullable: false,
    args: upsertOneIncentiveTableMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.incentiveTable.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneIncentiveTableMutation = defineMutation((t) => ({
  upsertOneIncentiveTable: t.prismaField(upsertOneIncentiveTableMutationObject(t)),
}));
