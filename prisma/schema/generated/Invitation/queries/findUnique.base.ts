import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueInvitationQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.InvitationWhereUniqueInput, required: true }) }))

export const findUniqueInvitationQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Invitation',
    nullable: true,
    args: findUniqueInvitationQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.invitation.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueInvitationQuery = defineQuery((t) => ({
  findUniqueInvitation: t.prismaField(findUniqueInvitationQueryObject(t)),
}));
