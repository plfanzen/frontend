/* eslint-disable */
import * as types from "./graphql";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  "\n  mutation launchChallengeInstance($challengeId: String!) {\n    launchChallengeInstance(challengeId: $challengeId)\n  }\n": typeof types.LaunchChallengeInstanceDocument;
  "\n  mutation stopChallengeInstance($challengeId: String!) {\n    stopChallengeInstance(challengeId: $challengeId)\n  }\n": typeof types.StopChallengeInstanceDocument;
  "\n  mutation submitFlag($challengeId: String!, $flag: String!) {\n    submitFlag(challengeId: $challengeId, flag: $flag)\n  }\n": typeof types.SubmitFlagDocument;
  "\n  query getBasicEventInfo {\n    eventConfig {\n      eventName\n    }\n  }\n": typeof types.GetBasicEventInfoDocument;
  "\n  mutation refreshSession($refreshToken: String!) {\n    refreshSession(refreshToken: $refreshToken) {\n      accessToken\n      refreshToken\n    }\n  }\n": typeof types.RefreshSessionDocument;
  "\n  mutation endSession($refreshToken: String!) {\n    endSession(refreshToken: $refreshToken)\n  }\n": typeof types.EndSessionDocument;
  "\n  query getSyncStatus {\n    syncStatus {\n      commitHash\n      commitTimestamp\n      commitAuthor\n      commitTitle\n      isSynced\n    }\n  }\n": typeof types.GetSyncStatusDocument;
  "\n  mutation syncRepo {\n    syncRepo\n  }\n": typeof types.SyncRepoDocument;
  "\n  query getChallengesInfo {\n    challenges {\n      id\n      name\n      authors\n      descriptionMd\n      points\n      categories\n      difficulty\n      solved\n      solves\n      canExport\n      canStart\n      attachments\n      instance {\n        state\n        connectionInfo {\n          port\n          host\n          protocol\n        }\n      }\n    }\n    eventConfig {\n      categories {\n        name\n        id\n        color\n        description\n      }\n      difficulties {\n        name\n        id\n        color\n      }\n    }\n  }\n": typeof types.GetChallengesInfoDocument;
  "\n  mutation login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      refreshToken\n      accessToken\n    }\n  }\n": typeof types.LoginDocument;
  "\n  query getFrontPageMd {\n    eventConfig {\n      frontPageMd\n    }\n  }\n": typeof types.GetFrontPageMdDocument;
  "\n  mutation register($username: String!, $email: String!, $password: String!) {\n    createUser(username: $username, email: $email, password: $password)\n  }\n": typeof types.RegisterDocument;
  "\n  query getRulesMd {\n    eventConfig {\n      rulesMd\n    }\n  }\n": typeof types.GetRulesMdDocument;
  "\n  query getAllSolves {\n    users {\n      username\n      solves {\n        challenge {\n          points\n        }\n        actor\n        solvedAt\n      }\n    }\n  }\n": typeof types.GetAllSolvesDocument;
};
const documents: Documents = {
  "\n  mutation launchChallengeInstance($challengeId: String!) {\n    launchChallengeInstance(challengeId: $challengeId)\n  }\n":
    types.LaunchChallengeInstanceDocument,
  "\n  mutation stopChallengeInstance($challengeId: String!) {\n    stopChallengeInstance(challengeId: $challengeId)\n  }\n":
    types.StopChallengeInstanceDocument,
  "\n  mutation submitFlag($challengeId: String!, $flag: String!) {\n    submitFlag(challengeId: $challengeId, flag: $flag)\n  }\n":
    types.SubmitFlagDocument,
  "\n  query getBasicEventInfo {\n    eventConfig {\n      eventName\n    }\n  }\n":
    types.GetBasicEventInfoDocument,
  "\n  mutation refreshSession($refreshToken: String!) {\n    refreshSession(refreshToken: $refreshToken) {\n      accessToken\n      refreshToken\n    }\n  }\n":
    types.RefreshSessionDocument,
  "\n  mutation endSession($refreshToken: String!) {\n    endSession(refreshToken: $refreshToken)\n  }\n":
    types.EndSessionDocument,
  "\n  query getSyncStatus {\n    syncStatus {\n      commitHash\n      commitTimestamp\n      commitAuthor\n      commitTitle\n      isSynced\n    }\n  }\n":
    types.GetSyncStatusDocument,
  "\n  mutation syncRepo {\n    syncRepo\n  }\n": types.SyncRepoDocument,
  "\n  query getChallengesInfo {\n    challenges {\n      id\n      name\n      authors\n      descriptionMd\n      points\n      categories\n      difficulty\n      solved\n      solves\n      canExport\n      canStart\n      attachments\n      instance {\n        state\n        connectionInfo {\n          port\n          host\n          protocol\n        }\n      }\n    }\n    eventConfig {\n      categories {\n        name\n        id\n        color\n        description\n      }\n      difficulties {\n        name\n        id\n        color\n      }\n    }\n  }\n":
    types.GetChallengesInfoDocument,
  "\n  mutation login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      refreshToken\n      accessToken\n    }\n  }\n":
    types.LoginDocument,
  "\n  query getFrontPageMd {\n    eventConfig {\n      frontPageMd\n    }\n  }\n":
    types.GetFrontPageMdDocument,
  "\n  mutation register($username: String!, $email: String!, $password: String!) {\n    createUser(username: $username, email: $email, password: $password)\n  }\n":
    types.RegisterDocument,
  "\n  query getRulesMd {\n    eventConfig {\n      rulesMd\n    }\n  }\n":
    types.GetRulesMdDocument,
  "\n  query getAllSolves {\n    users {\n      username\n      solves {\n        challenge {\n          points\n        }\n        actor\n        solvedAt\n      }\n    }\n  }\n":
    types.GetAllSolvesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation launchChallengeInstance($challengeId: String!) {\n    launchChallengeInstance(challengeId: $challengeId)\n  }\n",
): (typeof documents)["\n  mutation launchChallengeInstance($challengeId: String!) {\n    launchChallengeInstance(challengeId: $challengeId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation stopChallengeInstance($challengeId: String!) {\n    stopChallengeInstance(challengeId: $challengeId)\n  }\n",
): (typeof documents)["\n  mutation stopChallengeInstance($challengeId: String!) {\n    stopChallengeInstance(challengeId: $challengeId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation submitFlag($challengeId: String!, $flag: String!) {\n    submitFlag(challengeId: $challengeId, flag: $flag)\n  }\n",
): (typeof documents)["\n  mutation submitFlag($challengeId: String!, $flag: String!) {\n    submitFlag(challengeId: $challengeId, flag: $flag)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getBasicEventInfo {\n    eventConfig {\n      eventName\n    }\n  }\n",
): (typeof documents)["\n  query getBasicEventInfo {\n    eventConfig {\n      eventName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation refreshSession($refreshToken: String!) {\n    refreshSession(refreshToken: $refreshToken) {\n      accessToken\n      refreshToken\n    }\n  }\n",
): (typeof documents)["\n  mutation refreshSession($refreshToken: String!) {\n    refreshSession(refreshToken: $refreshToken) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation endSession($refreshToken: String!) {\n    endSession(refreshToken: $refreshToken)\n  }\n",
): (typeof documents)["\n  mutation endSession($refreshToken: String!) {\n    endSession(refreshToken: $refreshToken)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getSyncStatus {\n    syncStatus {\n      commitHash\n      commitTimestamp\n      commitAuthor\n      commitTitle\n      isSynced\n    }\n  }\n",
): (typeof documents)["\n  query getSyncStatus {\n    syncStatus {\n      commitHash\n      commitTimestamp\n      commitAuthor\n      commitTitle\n      isSynced\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation syncRepo {\n    syncRepo\n  }\n",
): (typeof documents)["\n  mutation syncRepo {\n    syncRepo\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getChallengesInfo {\n    challenges {\n      id\n      name\n      authors\n      descriptionMd\n      points\n      categories\n      difficulty\n      solved\n      solves\n      canExport\n      canStart\n      attachments\n      instance {\n        state\n        connectionInfo {\n          port\n          host\n          protocol\n        }\n      }\n    }\n    eventConfig {\n      categories {\n        name\n        id\n        color\n        description\n      }\n      difficulties {\n        name\n        id\n        color\n      }\n    }\n  }\n",
): (typeof documents)["\n  query getChallengesInfo {\n    challenges {\n      id\n      name\n      authors\n      descriptionMd\n      points\n      categories\n      difficulty\n      solved\n      solves\n      canExport\n      canStart\n      attachments\n      instance {\n        state\n        connectionInfo {\n          port\n          host\n          protocol\n        }\n      }\n    }\n    eventConfig {\n      categories {\n        name\n        id\n        color\n        description\n      }\n      difficulties {\n        name\n        id\n        color\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      refreshToken\n      accessToken\n    }\n  }\n",
): (typeof documents)["\n  mutation login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      refreshToken\n      accessToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getFrontPageMd {\n    eventConfig {\n      frontPageMd\n    }\n  }\n",
): (typeof documents)["\n  query getFrontPageMd {\n    eventConfig {\n      frontPageMd\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation register($username: String!, $email: String!, $password: String!) {\n    createUser(username: $username, email: $email, password: $password)\n  }\n",
): (typeof documents)["\n  mutation register($username: String!, $email: String!, $password: String!) {\n    createUser(username: $username, email: $email, password: $password)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getRulesMd {\n    eventConfig {\n      rulesMd\n    }\n  }\n",
): (typeof documents)["\n  query getRulesMd {\n    eventConfig {\n      rulesMd\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getAllSolves {\n    users {\n      username\n      solves {\n        challenge {\n          points\n        }\n        actor\n        solvedAt\n      }\n    }\n  }\n",
): (typeof documents)["\n  query getAllSolves {\n    users {\n      username\n      solves {\n        challenge {\n          points\n        }\n        actor\n        solvedAt\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
