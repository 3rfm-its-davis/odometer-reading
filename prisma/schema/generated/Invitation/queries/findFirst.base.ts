import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstInvitationQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.InvitationWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.InvitationOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.InvitationWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.InvitationScalarFieldEnum], required: false }),
}))

export const findFirstInvitationQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Invitation',
    nullable: true,
    args: findFirstInvitationQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.invitation.findFirst({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        ...query,
      }),
  }),
);

export const findFirstInvitationQuery = defineQuery((t) => ({
  findFirstInvitation: t.prismaField(findFirstInvitationQueryObject(t)),
}));
