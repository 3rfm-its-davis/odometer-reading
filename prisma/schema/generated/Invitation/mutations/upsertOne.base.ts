import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneInvitationMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.InvitationWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.InvitationCreateInput, required: true }),
      update: t.field({ type: Inputs.InvitationUpdateInput, required: true }),
    }))

export const upsertOneInvitationMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Invitation',
    nullable: false,
    args: upsertOneInvitationMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.invitation.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneInvitationMutation = defineMutation((t) => ({
  upsertOneInvitation: t.prismaField(upsertOneInvitationMutationObject(t)),
}));
