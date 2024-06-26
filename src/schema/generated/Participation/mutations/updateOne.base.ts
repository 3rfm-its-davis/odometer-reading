import * as Inputs from "../../inputs";
import { prisma } from "../../../../../src/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneParticipationMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.ParticipationWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.ParticipationUpdateInput, required: true }),
    }))

export const updateOneParticipationMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Participation',
    nullable: true,
    args: updateOneParticipationMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.participation.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneParticipationMutation = defineMutation((t) => ({
  updateOneParticipation: t.prismaField(updateOneParticipationMutationObject(t)),
}));
