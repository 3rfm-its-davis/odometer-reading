import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyIncentiveTableMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.IncentiveTableCreateInput], required: true }) }))

export const createManyIncentiveTableMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['IncentiveTable'],
    nullable: false,
    args: createManyIncentiveTableMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.incentiveTable.create({ data }))),
  }),
);

export const createManyIncentiveTableMutation = defineMutation((t) => ({
  createManyIncentiveTable: t.prismaField(createManyIncentiveTableMutationObject(t)),
}));
