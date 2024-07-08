import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneParticipationMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.ParticipationWhereUniqueInput, required: true }) }))

export const deleteOneParticipationMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Participation',
    nullable: true,
    args: deleteOneParticipationMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.participation.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneParticipationMutation = defineMutation((t) => ({
  deleteOneParticipation: t.prismaField(deleteOneParticipationMutationObject(t)),
}));
