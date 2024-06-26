import * as Inputs from "../../inputs";
import { prisma } from "../../../../../src/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneParticipationMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.ParticipationWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.ParticipationCreateInput, required: true }),
      update: t.field({ type: Inputs.ParticipationUpdateInput, required: true }),
    }))

export const upsertOneParticipationMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Participation',
    nullable: false,
    args: upsertOneParticipationMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.participation.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneParticipationMutation = defineMutation((t) => ({
  upsertOneParticipation: t.prismaField(upsertOneParticipationMutationObject(t)),
}));
