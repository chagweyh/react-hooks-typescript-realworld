import { IErrors } from '../types';

type EditorAction =
  | { type: 'ADD_TAG'; tag: string }
  | { type: 'REMOVE_TAG'; tag: string }
  | { type: 'SET_TAGS'; tagList: string[] }
  | {
      type: 'SET_FORM';
      form: IForm;
    }
  | {
      type: 'UPDATE_FORM';
      field: { key: string; value: string };
    }
  | { type: 'SET_ERRORS'; errors: IErrors };

interface IForm {
  title: string;
  description: string;
  body: string;
  tag: string;
}

interface EditorState {
  tagList: string[];
  form: IForm;
  errors: IErrors;
  loading: boolean;
}

export const initalState: EditorState = {
  tagList: [],
  form: {
    title: '',
    description: '',
    body: '',
    tag: '',
  },
  errors: {},
  loading: false,
};

export function editorReducer(
  state: EditorState,
  action: EditorAction,
): EditorState {
  switch (action.type) {
    case 'ADD_TAG':
      return {
        ...state,
        tagList: [...state.tagList, action.tag],
      };
    case 'REMOVE_TAG':
      return {
        ...state,
        tagList: state.tagList.filter((tag) => tag !== action.tag),
      };
    case 'SET_TAGS':
      return {
        ...state,
        tagList: action.tagList,
      };
    case 'SET_FORM':
      return {
        ...state,
        form: action.form,
      };
    case 'UPDATE_FORM':
      return {
        ...state,
        form: {
          ...state.form,
          [action.field.key]: action.field.value,
        },
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return state;
  }
}
