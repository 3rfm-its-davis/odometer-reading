import * as User from './User';
import * as UserStatus from './UserStatus';
import * as Admin from './Admin';
import * as Post from './Post';
import * as PostStatus from './PostStatus';
import * as Participation from './Participation';
import * as IncentiveTable from './IncentiveTable';
import { builder } from '../builder';
import * as Objects from './objects';

type Model = Objects.Model;

export const Cruds: Record<
  Objects.Model,
  {
    Object: any;
    queries: Record<string, Function>;
    mutations: Record<string, Function>;
  }
> = {
  User: {
    Object: User.UserObject,
    queries: {
      findFirst: User.findFirstUserQueryObject,
      findMany: User.findManyUserQueryObject,
      count: User.countUserQueryObject,
      findUnique: User.findUniqueUserQueryObject,
    },
    mutations: {
      createMany: User.createManyUserMutationObject,
      createOne: User.createOneUserMutationObject,
      deleteMany: User.deleteManyUserMutationObject,
      deleteOne: User.deleteOneUserMutationObject,
      updateMany: User.updateManyUserMutationObject,
      updateOne: User.updateOneUserMutationObject,
      upsertOne: User.upsertOneUserMutationObject,
    },
  },
  UserStatus: {
    Object: UserStatus.UserStatusObject,
    queries: {
      findFirst: UserStatus.findFirstUserStatusQueryObject,
      findMany: UserStatus.findManyUserStatusQueryObject,
      count: UserStatus.countUserStatusQueryObject,
      findUnique: UserStatus.findUniqueUserStatusQueryObject,
    },
    mutations: {
      createMany: UserStatus.createManyUserStatusMutationObject,
      createOne: UserStatus.createOneUserStatusMutationObject,
      deleteMany: UserStatus.deleteManyUserStatusMutationObject,
      deleteOne: UserStatus.deleteOneUserStatusMutationObject,
      updateMany: UserStatus.updateManyUserStatusMutationObject,
      updateOne: UserStatus.updateOneUserStatusMutationObject,
      upsertOne: UserStatus.upsertOneUserStatusMutationObject,
    },
  },
  Admin: {
    Object: Admin.AdminObject,
    queries: {
      findFirst: Admin.findFirstAdminQueryObject,
      findMany: Admin.findManyAdminQueryObject,
      count: Admin.countAdminQueryObject,
      findUnique: Admin.findUniqueAdminQueryObject,
    },
    mutations: {
      createMany: Admin.createManyAdminMutationObject,
      createOne: Admin.createOneAdminMutationObject,
      deleteMany: Admin.deleteManyAdminMutationObject,
      deleteOne: Admin.deleteOneAdminMutationObject,
      updateMany: Admin.updateManyAdminMutationObject,
      updateOne: Admin.updateOneAdminMutationObject,
      upsertOne: Admin.upsertOneAdminMutationObject,
    },
  },
  Post: {
    Object: Post.PostObject,
    queries: {
      findFirst: Post.findFirstPostQueryObject,
      findMany: Post.findManyPostQueryObject,
      count: Post.countPostQueryObject,
      findUnique: Post.findUniquePostQueryObject,
    },
    mutations: {
      createMany: Post.createManyPostMutationObject,
      createOne: Post.createOnePostMutationObject,
      deleteMany: Post.deleteManyPostMutationObject,
      deleteOne: Post.deleteOnePostMutationObject,
      updateMany: Post.updateManyPostMutationObject,
      updateOne: Post.updateOnePostMutationObject,
      upsertOne: Post.upsertOnePostMutationObject,
    },
  },
  PostStatus: {
    Object: PostStatus.PostStatusObject,
    queries: {
      findFirst: PostStatus.findFirstPostStatusQueryObject,
      findMany: PostStatus.findManyPostStatusQueryObject,
      count: PostStatus.countPostStatusQueryObject,
      findUnique: PostStatus.findUniquePostStatusQueryObject,
    },
    mutations: {
      createMany: PostStatus.createManyPostStatusMutationObject,
      createOne: PostStatus.createOnePostStatusMutationObject,
      deleteMany: PostStatus.deleteManyPostStatusMutationObject,
      deleteOne: PostStatus.deleteOnePostStatusMutationObject,
      updateMany: PostStatus.updateManyPostStatusMutationObject,
      updateOne: PostStatus.updateOnePostStatusMutationObject,
      upsertOne: PostStatus.upsertOnePostStatusMutationObject,
    },
  },
  Participation: {
    Object: Participation.ParticipationObject,
    queries: {
      findFirst: Participation.findFirstParticipationQueryObject,
      findMany: Participation.findManyParticipationQueryObject,
      count: Participation.countParticipationQueryObject,
      findUnique: Participation.findUniqueParticipationQueryObject,
    },
    mutations: {
      createMany: Participation.createManyParticipationMutationObject,
      createOne: Participation.createOneParticipationMutationObject,
      deleteMany: Participation.deleteManyParticipationMutationObject,
      deleteOne: Participation.deleteOneParticipationMutationObject,
      updateMany: Participation.updateManyParticipationMutationObject,
      updateOne: Participation.updateOneParticipationMutationObject,
      upsertOne: Participation.upsertOneParticipationMutationObject,
    },
  },
  IncentiveTable: {
    Object: IncentiveTable.IncentiveTableObject,
    queries: {
      findFirst: IncentiveTable.findFirstIncentiveTableQueryObject,
      findMany: IncentiveTable.findManyIncentiveTableQueryObject,
      count: IncentiveTable.countIncentiveTableQueryObject,
      findUnique: IncentiveTable.findUniqueIncentiveTableQueryObject,
    },
    mutations: {
      createMany: IncentiveTable.createManyIncentiveTableMutationObject,
      createOne: IncentiveTable.createOneIncentiveTableMutationObject,
      deleteMany: IncentiveTable.deleteManyIncentiveTableMutationObject,
      deleteOne: IncentiveTable.deleteOneIncentiveTableMutationObject,
      updateMany: IncentiveTable.updateManyIncentiveTableMutationObject,
      updateOne: IncentiveTable.updateOneIncentiveTableMutationObject,
      upsertOne: IncentiveTable.upsertOneIncentiveTableMutationObject,
    },
  },
};

const crudEntries = Object.entries(Cruds);

type ResolverType = "Query" | "Mutation";
function generateResolversByType(type: ResolverType, opts?: CrudOptions) {
  return crudEntries
    .filter(([modelName]) => includeModel(modelName, opts))
    .map(([modelName, config]) => {
      const resolverEntries = Object.entries(config[type === "Query" ? "queries" : "mutations"]);

      return resolverEntries.map(([operationName, resolverObjectDefiner]) => {
        const resolverName = operationName + modelName;
        const isntPrismaFieldList = ["count", "deleteMany", "updateMany"];
        const isPrismaField = !isntPrismaFieldList.includes(operationName);

        const getFields = (t: any) => {
          const field = resolverObjectDefiner(t);
          const handledField = opts?.handleResolver
            ? opts.handleResolver({
                field,
                modelName: modelName as Model,
                operationName,
                resolverName,
                t,
                isPrismaField,
                type,
              })
            : field;

          return {
            [resolverName]: isPrismaField
              ? t.prismaField(handledField)
              : t.field(handledField),
          }
        }

        return type === "Query"
          ? builder.queryFields((t) => getFields(t))
          : builder.mutationFields((t) => getFields(t));
      });
    });
}

export function generateAllObjects(opts?: CrudOptions) {
  return crudEntries
    .filter(([md]) => includeModel(md, opts))
    .map(([modelName, { Object }]) => {
      return builder.prismaObject(modelName as Model, Object); // Objects is all imports
    });
}

export function generateAllQueries(opts?: CrudOptions) {
  generateResolversByType("Query", opts);
}

export function generateAllMutations(opts?: CrudOptions) {
  generateResolversByType("Mutation", opts);
}

export function generateAllResolvers(opts?: CrudOptions) {
  generateResolversByType("Mutation", opts);
  generateResolversByType("Query", opts);
}

type CrudOptions = {
  include?: Model[];
  exclude?: Model[];
  /**
   * Caution: This is not type safe
   * Wrap all queries/mutations to override args, run extra code in resolve function (ie: throw errors, logs), apply plugins, etc.
   */
  handleResolver?: (props: {
    modelName: Model;
    field: any;
    operationName: string;
    resolverName: string;
    t: any;
    isPrismaField: boolean;
    type: ResolverType;
  }) => any;
};

const includeModel = (model: string, opts?: CrudOptions): boolean => {
  if (!opts) return true;
  if (opts.include) return opts.include.includes(model as Model);
  if (opts.exclude) return !opts.exclude.includes(model as Model);
  return true;
};

export function generateAllCrud(opts?: CrudOptions) {
  generateAllObjects(opts);
  generateAllQueries(opts);
  generateAllMutations(opts);
}
