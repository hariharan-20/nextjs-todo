/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IInputProps {
  name: string;
  value: string;
  placeHolder: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  InputClass?: string;
  ref?: any;
  disabled?: boolean;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IButtonProps {
  text: string | React.ReactNode;
  onClick: () => void;
  buttonClass?: string;
}

// server types

export interface ITodo {
  title: string | null;
  isCompleted: boolean;
  id: string;
  isEditing?: boolean;
  editingValue?: string;
  inputRef?: any;
}
