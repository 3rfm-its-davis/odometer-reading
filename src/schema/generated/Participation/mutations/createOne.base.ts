import * as Inputs from "../../inputs";
import { prisma } from "../../../../../src/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneParticipationMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.ParticipationCreateInput, required: true }) }))

export const createOneParticipationMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Participation',
    nullable: false,
    args: createOneParticipationMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.participation.create({ data: args.data, ...query }),
  }),
);

export const createOneParticipationMutation = defineMutation((t) => ({
  createOneParticipation: t.prismaField(createOneParticipationMutationObject(t)),
}));
