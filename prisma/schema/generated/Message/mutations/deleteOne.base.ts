import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneMessageMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.MessageWhereUniqueInput, required: true }) }))

export const deleteOneMessageMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Message',
    nullable: true,
    args: deleteOneMessageMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.message.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneMessageMutation = defineMutation((t) => ({
  deleteOneMessage: t.prismaField(deleteOneMessageMutationObject(t)),
}));
