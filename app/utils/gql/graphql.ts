/* eslint-disable */
// This file is generated automatically. DO NOT EDIT IT MANUALLY.
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export enum ConnectionProtocol {
  Https = "HTTPS",
  Ssh = "SSH",
  Tcp = "TCP",
  TcpTls = "TCP_TLS",
  Udp = "UDP",
}

export type CtfCategory = {
  __typename?: "CtfCategory";
  color?: Maybe<Scalars["String"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

export type CtfChallengeConnectionInfo = {
  __typename?: "CtfChallengeConnectionInfo";
  host: Scalars["String"]["output"];
  port: Scalars["Int"]["output"];
  protocol: ConnectionProtocol;
  sshPassword?: Maybe<Scalars["String"]["output"]>;
  sshUsername?: Maybe<Scalars["String"]["output"]>;
};

export type CtfChallengeMetadata = {
  __typename?: "CtfChallengeMetadata";
  attachments: Array<Scalars["String"]["output"]>;
  authors: Array<Scalars["String"]["output"]>;
  /** Whether the challenge source code can be exported by the user */
  canExport: Scalars["Boolean"]["output"];
  canStart: Scalars["Boolean"]["output"];
  categories: Array<Scalars["String"]["output"]>;
  descriptionMd: Scalars["String"]["output"];
  difficulty: Scalars["String"]["output"];
  endTime?: Maybe<Scalars["Int"]["output"]>;
  id: Scalars["String"]["output"];
  instance?: Maybe<InstanceStatus>;
  name: Scalars["String"]["output"];
  points: Scalars["Int"]["output"];
  releaseTime?: Maybe<Scalars["Int"]["output"]>;
  solved: Scalars["Boolean"]["output"];
  solves: Scalars["Int"]["output"];
};

export type CtfDifficulty = {
  __typename?: "CtfDifficulty";
  color?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

export type EventConfig = {
  __typename?: "EventConfig";
  categories: Array<CtfCategory>;
  difficulties: Array<CtfDifficulty>;
  endTime: Scalars["Int"]["output"];
  eventName: Scalars["String"]["output"];
  frontPageMd: Scalars["String"]["output"];
  maxTeamSize?: Maybe<Scalars["Int"]["output"]>;
  registrationEndTime?: Maybe<Scalars["Int"]["output"]>;
  registrationStartTime?: Maybe<Scalars["Int"]["output"]>;
  rulesMd: Scalars["String"]["output"];
  scoreboardFreezeTime?: Maybe<Scalars["Int"]["output"]>;
  startTime: Scalars["Int"]["output"];
  useTeams: Scalars["Boolean"]["output"];
};

export enum InstanceState {
  Creating = "CREATING",
  Running = "RUNNING",
}

export type InstanceStatus = {
  __typename?: "InstanceStatus";
  connectionInfo: Array<CtfChallengeConnectionInfo>;
  state: InstanceState;
};

export type InvalidSubmission = {
  __typename?: "InvalidSubmission";
  challengeId: Scalars["String"]["output"];
  submittedAt: Scalars["String"]["output"];
  submittedFlag: Scalars["String"]["output"];
  user: User;
};

export type Mutation = {
  __typename?: "Mutation";
  createTeam: Team;
  createUser: Scalars["Boolean"]["output"];
  disableJoinCode: Scalars["Boolean"]["output"];
  enableJoinCode: Scalars["String"]["output"];
  endSession: Scalars["Boolean"]["output"];
  joinTeamWithCode: Team;
  launchChallengeInstance: Scalars["Boolean"]["output"];
  leaveTeam: Scalars["Boolean"]["output"];
  login: SessionCredentials;
  refreshSession: SessionCredentials;
  stopChallengeInstance: Scalars["Boolean"]["output"];
  /** Returns the ID of the solved challenge if the flag is correct, or null otherwise. */
  submitFlag?: Maybe<Scalars["String"]["output"]>;
  syncRepo: Scalars["Boolean"]["output"];
};

export type MutationCreateTeamArgs = {
  createJoinCode: Scalars["Boolean"]["input"];
  name: Scalars["String"]["input"];
  slug: Scalars["String"]["input"];
};

export type MutationCreateUserArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type MutationEndSessionArgs = {
  refreshToken: Scalars["String"]["input"];
};

export type MutationJoinTeamWithCodeArgs = {
  joinCodeInput: Scalars["String"]["input"];
};

export type MutationLaunchChallengeInstanceArgs = {
  challengeId: Scalars["String"]["input"];
};

export type MutationLoginArgs = {
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type MutationRefreshSessionArgs = {
  refreshToken: Scalars["String"]["input"];
};

export type MutationStopChallengeInstanceArgs = {
  challengeId: Scalars["String"]["input"];
};

export type MutationSubmitFlagArgs = {
  challengeId: Scalars["String"]["input"];
  flag: Scalars["String"]["input"];
};

export type Query = {
  __typename?: "Query";
  challenges: Array<CtfChallengeMetadata>;
  eventConfig: EventConfig;
  isAuthenticated: Scalars["Boolean"]["output"];
  me?: Maybe<User>;
  solves: Array<Solve>;
  syncStatus: SyncStatus;
  teams: Array<Team>;
  userById?: Maybe<User>;
  users: Array<User>;
};

export type QueryUserByIdArgs = {
  userId: Scalars["String"]["input"];
};

export type SessionCredentials = {
  __typename?: "SessionCredentials";
  accessToken: Scalars["String"]["output"];
  refreshToken: Scalars["String"]["output"];
};

export type Solve = {
  __typename?: "Solve";
  challenge: CtfChallengeMetadata;
  challengeId: Scalars["String"]["output"];
  solvedAt: Scalars["String"]["output"];
  submittedFlag: Scalars["String"]["output"];
  user: User;
};

export type SyncStatus = {
  __typename?: "SyncStatus";
  commitAuthor?: Maybe<Scalars["String"]["output"]>;
  commitHash?: Maybe<Scalars["String"]["output"]>;
  commitTimestamp?: Maybe<Scalars["Int"]["output"]>;
  commitTitle?: Maybe<Scalars["String"]["output"]>;
  isSynced: Scalars["Boolean"]["output"];
};

export type Team = {
  __typename?: "Team";
  id: Scalars["String"]["output"];
  joinCode?: Maybe<Scalars["String"]["output"]>;
  members: Array<User>;
  name: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
};

export type User = {
  __typename?: "User";
  actor: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  invalidSubmissions: Array<InvalidSubmission>;
  invalidSubmissionsCount: Scalars["Int"]["output"];
  role: UserRole;
  solves: Array<Solve>;
  solvesCount: Scalars["Int"]["output"];
  username: Scalars["String"]["output"];
};

export enum UserRole {
  Admin = "ADMIN",
  Author = "AUTHOR",
  Player = "PLAYER",
}

export type LaunchChallengeInstanceMutationVariables = Exact<{
  challengeId: Scalars["String"]["input"];
}>;

export type LaunchChallengeInstanceMutation = {
  __typename?: "Mutation";
  launchChallengeInstance: boolean;
};

export type StopChallengeInstanceMutationVariables = Exact<{
  challengeId: Scalars["String"]["input"];
}>;

export type StopChallengeInstanceMutation = {
  __typename?: "Mutation";
  stopChallengeInstance: boolean;
};

export type SubmitFlagMutationVariables = Exact<{
  challengeId: Scalars["String"]["input"];
  flag: Scalars["String"]["input"];
}>;

export type SubmitFlagMutation = {
  __typename?: "Mutation";
  submitFlag?: string | null;
};

export type GetBasicEventInfoQueryVariables = Exact<{ [key: string]: never }>;

export type GetBasicEventInfoQuery = {
  __typename?: "Query";
  eventConfig: { __typename?: "EventConfig"; eventName: string };
};

export type RefreshSessionMutationVariables = Exact<{
  refreshToken: Scalars["String"]["input"];
}>;

export type RefreshSessionMutation = {
  __typename?: "Mutation";
  refreshSession: {
    __typename?: "SessionCredentials";
    accessToken: string;
    refreshToken: string;
  };
};

export type EndSessionMutationVariables = Exact<{
  refreshToken: Scalars["String"]["input"];
}>;

export type EndSessionMutation = {
  __typename?: "Mutation";
  endSession: boolean;
};

export type GetSyncStatusQueryVariables = Exact<{ [key: string]: never }>;

export type GetSyncStatusQuery = {
  __typename?: "Query";
  syncStatus: {
    __typename?: "SyncStatus";
    commitHash?: string | null;
    commitTimestamp?: number | null;
    commitAuthor?: string | null;
    commitTitle?: string | null;
    isSynced: boolean;
  };
};

export type SyncRepoMutationVariables = Exact<{ [key: string]: never }>;

export type SyncRepoMutation = { __typename?: "Mutation"; syncRepo: boolean };

export type GetChallengesInfoQueryVariables = Exact<{ [key: string]: never }>;

export type GetChallengesInfoQuery = {
  __typename?: "Query";
  challenges: Array<{
    __typename?: "CtfChallengeMetadata";
    id: string;
    name: string;
    authors: Array<string>;
    descriptionMd: string;
    points: number;
    categories: Array<string>;
    difficulty: string;
    solved: boolean;
    solves: number;
    canExport: boolean;
    canStart: boolean;
    attachments: Array<string>;
    instance?: {
      __typename?: "InstanceStatus";
      state: InstanceState;
      connectionInfo: Array<{
        __typename?: "CtfChallengeConnectionInfo";
        port: number;
        host: string;
        protocol: ConnectionProtocol;
        sshUsername?: string | null;
        sshPassword?: string | null;
      }>;
    } | null;
  }>;
  eventConfig: {
    __typename?: "EventConfig";
    categories: Array<{
      __typename?: "CtfCategory";
      name: string;
      id: string;
      color?: string | null;
      description?: string | null;
    }>;
    difficulties: Array<{
      __typename?: "CtfDifficulty";
      name: string;
      id: string;
      color?: string | null;
    }>;
  };
};

export type LoginMutationVariables = Exact<{
  username: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "SessionCredentials";
    refreshToken: string;
    accessToken: string;
  };
};

export type GetFrontPageMdQueryVariables = Exact<{ [key: string]: never }>;

export type GetFrontPageMdQuery = {
  __typename?: "Query";
  eventConfig: { __typename?: "EventConfig"; frontPageMd: string };
};

export type RegisterMutationVariables = Exact<{
  username: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type RegisterMutation = { __typename?: "Mutation"; createUser: boolean };

export type GetRulesMdQueryVariables = Exact<{ [key: string]: never }>;

export type GetRulesMdQuery = {
  __typename?: "Query";
  eventConfig: { __typename?: "EventConfig"; rulesMd: string };
};

export type GetAllSolvesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllSolvesQuery = {
  __typename?: "Query";
  users: Array<{
    __typename?: "User";
    username: string;
    actor: string;
    solves: Array<{
      __typename?: "Solve";
      solvedAt: string;
      challenge: {
        __typename?: "CtfChallengeMetadata";
        points: number;
        solves: number;
      };
    }>;
  }>;
};

export const LaunchChallengeInstanceDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "launchChallengeInstance" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "challengeId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "launchChallengeInstance" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "challengeId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "challengeId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  LaunchChallengeInstanceMutation,
  LaunchChallengeInstanceMutationVariables
>;
export const StopChallengeInstanceDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "stopChallengeInstance" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "challengeId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "stopChallengeInstance" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "challengeId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "challengeId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StopChallengeInstanceMutation,
  StopChallengeInstanceMutationVariables
>;
export const SubmitFlagDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "submitFlag" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "challengeId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "flag" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "submitFlag" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "challengeId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "challengeId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "flag" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "flag" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SubmitFlagMutation, SubmitFlagMutationVariables>;
export const GetBasicEventInfoDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getBasicEventInfo" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "eventConfig" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "eventName" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetBasicEventInfoQuery,
  GetBasicEventInfoQueryVariables
>;
export const RefreshSessionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "refreshSession" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "refreshToken" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "refreshSession" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "refreshToken" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "refreshToken" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "accessToken" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "refreshToken" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RefreshSessionMutation,
  RefreshSessionMutationVariables
>;
export const EndSessionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "endSession" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "refreshToken" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "endSession" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "refreshToken" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "refreshToken" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EndSessionMutation, EndSessionMutationVariables>;
export const GetSyncStatusDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getSyncStatus" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "syncStatus" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "commitHash" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "commitTimestamp" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "commitAuthor" },
                },
                { kind: "Field", name: { kind: "Name", value: "commitTitle" } },
                { kind: "Field", name: { kind: "Name", value: "isSynced" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetSyncStatusQuery, GetSyncStatusQueryVariables>;
export const SyncRepoDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "syncRepo" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "syncRepo" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SyncRepoMutation, SyncRepoMutationVariables>;
export const GetChallengesInfoDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getChallengesInfo" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "challenges" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "authors" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "descriptionMd" },
                },
                { kind: "Field", name: { kind: "Name", value: "points" } },
                { kind: "Field", name: { kind: "Name", value: "categories" } },
                { kind: "Field", name: { kind: "Name", value: "difficulty" } },
                { kind: "Field", name: { kind: "Name", value: "solved" } },
                { kind: "Field", name: { kind: "Name", value: "solves" } },
                { kind: "Field", name: { kind: "Name", value: "canExport" } },
                { kind: "Field", name: { kind: "Name", value: "canStart" } },
                { kind: "Field", name: { kind: "Name", value: "attachments" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "instance" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "state" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "connectionInfo" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "port" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "host" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "protocol" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "sshUsername" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "sshPassword" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "eventConfig" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "categories" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "color" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "difficulties" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "color" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetChallengesInfoQuery,
  GetChallengesInfoQueryVariables
>;
export const LoginDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "login" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "username" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "login" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "username" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "username" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "refreshToken" },
                },
                { kind: "Field", name: { kind: "Name", value: "accessToken" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const GetFrontPageMdDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getFrontPageMd" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "eventConfig" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "frontPageMd" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetFrontPageMdQuery, GetFrontPageMdQueryVariables>;
export const RegisterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "register" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "username" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "username" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "username" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const GetRulesMdDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getRulesMd" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "eventConfig" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "rulesMd" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetRulesMdQuery, GetRulesMdQueryVariables>;
export const GetAllSolvesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getAllSolves" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "users" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "actor" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "solves" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "challenge" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "points" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "solves" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "solvedAt" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAllSolvesQuery, GetAllSolvesQueryVariables>;
