import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneInvitationMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.InvitationWhereUniqueInput, required: true }) }))

export const deleteOneInvitationMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Invitation',
    nullable: true,
    args: deleteOneInvitationMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.invitation.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneInvitationMutation = defineMutation((t) => ({
  deleteOneInvitation: t.prismaField(deleteOneInvitationMutationObject(t)),
}));
