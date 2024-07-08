import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstParticipationQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.ParticipationWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.ParticipationOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.ParticipationWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.ParticipationScalarFieldEnum], required: false }),
}))

export const findFirstParticipationQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Participation',
    nullable: true,
    args: findFirstParticipationQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.participation.findFirst({
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

export const findFirstParticipationQuery = defineQuery((t) => ({
  findFirstParticipation: t.prismaField(findFirstParticipationQueryObject(t)),
}));
