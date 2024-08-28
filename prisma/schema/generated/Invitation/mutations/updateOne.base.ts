import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneInvitationMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.InvitationWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.InvitationUpdateInput, required: true }),
    }))

export const updateOneInvitationMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Invitation',
    nullable: true,
    args: updateOneInvitationMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.invitation.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneInvitationMutation = defineMutation((t) => ({
  updateOneInvitation: t.prismaField(updateOneInvitationMutationObject(t)),
}));
