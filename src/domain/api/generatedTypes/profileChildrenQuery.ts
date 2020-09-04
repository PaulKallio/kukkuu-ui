/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: profileChildrenQuery
// ====================================================

export interface profileChildrenQuery_myProfile_children_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
}

export interface profileChildrenQuery_myProfile_children_edges {
  /**
   * The item at the end of the edge
   */
  node: profileChildrenQuery_myProfile_children_edges_node | null;
}

export interface profileChildrenQuery_myProfile_children {
  /**
   * Contains the nodes in this connection.
   */
  edges: (profileChildrenQuery_myProfile_children_edges | null)[];
}

export interface profileChildrenQuery_myProfile {
  /**
   * The ID of the object.
   */
  id: string;
  children: profileChildrenQuery_myProfile_children;
}

export interface profileChildrenQuery {
  myProfile: profileChildrenQuery_myProfile | null;
}
