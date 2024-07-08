import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyParticipationQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.ParticipationWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.ParticipationOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.ParticipationWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.ParticipationScalarFieldEnum], required: false }),
}))

export const findManyParticipationQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['Participation'],
    nullable: false,
    args: findManyParticipationQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.participation.findMany({
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

export const findManyParticipationQuery = defineQuery((t) => ({
  findManyParticipation: t.prismaField(findManyParticipationQueryObject(t)),
}));
