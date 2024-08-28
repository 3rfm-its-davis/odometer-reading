import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countInvitationQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.InvitationWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.InvitationOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.InvitationWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.InvitationScalarFieldEnum], required: false }),
}))

export const countInvitationQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countInvitationQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.invitation.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countInvitationQuery = defineQuery((t) => ({
  countInvitation: t.field(countInvitationQueryObject(t)),
}));
