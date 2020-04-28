import { ChildrenQuery_children_edges_node as GeneratedChildType } from '../../api/generatedTypes/ChildrenQuery';
import {
  ChildInput,
  AddChildMutationInput,
  UpdateChildMutationInput,
} from '../../api/generatedTypes/globalTypes';

export interface Child extends ChildInput {
  homeCity: string;
}

export interface AddChild extends AddChildMutationInput {
  homeCity: string;
}

export interface UpdateChild extends UpdateChildMutationInput {
  homeCity: string;
}

export type ChildResponse = Partial<GeneratedChildType>;

export type Children = Child[];
