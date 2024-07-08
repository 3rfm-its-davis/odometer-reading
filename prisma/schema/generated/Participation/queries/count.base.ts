import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countParticipationQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.ParticipationWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.ParticipationOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.ParticipationWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.ParticipationScalarFieldEnum], required: false }),
}))

export const countParticipationQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countParticipationQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.participation.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countParticipationQuery = defineQuery((t) => ({
  countParticipation: t.field(countParticipationQueryObject(t)),
}));
