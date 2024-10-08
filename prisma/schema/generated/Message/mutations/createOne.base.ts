import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneMessageMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.MessageCreateInput, required: true }) }))

export const createOneMessageMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Message',
    nullable: false,
    args: createOneMessageMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.message.create({ data: args.data, ...query }),
  }),
);

export const createOneMessageMutation = defineMutation((t) => ({
  createOneMessage: t.prismaField(createOneMessageMutationObject(t)),
}));
