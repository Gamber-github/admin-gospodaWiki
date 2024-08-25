/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ControllerProps,
  FieldErrors,
  FieldPath,
  FieldValues,
} from "react-hook-form";

export type ControlledElement<T> = <
  ExtendedProps extends T,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: Omit<ControllerProps<TFieldValues, TName>, "render"> &
    ExtendedProps & {
      errors: FieldErrors<TFieldValues>;
    }
) => import("react").ReactElement<
  any,
  string | import("react").JSXElementConstructor<any>
>;
