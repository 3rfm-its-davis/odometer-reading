import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyParticipationMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.ParticipationCreateInput], required: true }) }))

export const createManyParticipationMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Participation'],
    nullable: false,
    args: createManyParticipationMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.participation.create({ data }))),
  }),
);

export const createManyParticipationMutation = defineMutation((t) => ({
  createManyParticipation: t.prismaField(createManyParticipationMutationObject(t)),
}));
