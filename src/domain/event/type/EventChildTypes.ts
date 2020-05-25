import { enrolOccurrenceMutation_enrolOccurrence_enrolment_child_occurrences as EnrolOccurrences } from '../../api/generatedTypes/enrolOccurrenceMutation';
import { unenrolOccurrenceMutation_unenrolOccurrence_child_occurrences as UnenrolOccurrences } from '../../api/generatedTypes/unenrolOccurrenceMutation';

export interface ChildEvents {
  childId: string;
  eventIds: string[];
}

export interface ChildOccurrences {
  childId: string;
  occurrences: EnrolOccurrences | UnenrolOccurrences;
}
