import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneReadingMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.ReadingWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.ReadingUpdateInput, required: true }),
    }))

export const updateOneReadingMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Reading',
    nullable: true,
    args: updateOneReadingMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.reading.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneReadingMutation = defineMutation((t) => ({
  updateOneReading: t.prismaField(updateOneReadingMutationObject(t)),
}));
