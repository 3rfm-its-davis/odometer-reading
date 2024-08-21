import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneReadingMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.ReadingWhereUniqueInput, required: true }) }))

export const deleteOneReadingMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Reading',
    nullable: true,
    args: deleteOneReadingMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.reading.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneReadingMutation = defineMutation((t) => ({
  deleteOneReading: t.prismaField(deleteOneReadingMutationObject(t)),
}));
