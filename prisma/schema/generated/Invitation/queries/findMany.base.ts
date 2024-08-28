import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyInvitationQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.InvitationWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.InvitationOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.InvitationWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.InvitationScalarFieldEnum], required: false }),
}))

export const findManyInvitationQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['Invitation'],
    nullable: false,
    args: findManyInvitationQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.invitation.findMany({
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

export const findManyInvitationQuery = defineQuery((t) => ({
  findManyInvitation: t.prismaField(findManyInvitationQueryObject(t)),
}));
