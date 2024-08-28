import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneInvitationMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.InvitationCreateInput, required: true }) }))

export const createOneInvitationMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Invitation',
    nullable: false,
    args: createOneInvitationMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.invitation.create({ data: args.data, ...query }),
  }),
);

export const createOneInvitationMutation = defineMutation((t) => ({
  createOneInvitation: t.prismaField(createOneInvitationMutationObject(t)),
}));
