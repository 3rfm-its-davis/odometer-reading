import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countUserStateQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.UserStateWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.UserStateOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.UserStateWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.UserStateScalarFieldEnum], required: false }),
}))

export const countUserStateQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countUserStateQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.userState.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countUserStateQuery = defineQuery((t) => ({
  countUserState: t.field(countUserStateQueryObject(t)),
}));
