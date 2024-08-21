import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneReadingMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.ReadingWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.ReadingCreateInput, required: true }),
      update: t.field({ type: Inputs.ReadingUpdateInput, required: true }),
    }))

export const upsertOneReadingMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Reading',
    nullable: false,
    args: upsertOneReadingMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.reading.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneReadingMutation = defineMutation((t) => ({
  upsertOneReading: t.prismaField(upsertOneReadingMutationObject(t)),
}));
