// import { Controller } from "react-hook-form";
// import { ControlledElement } from "../types";
// import { CustomSelection } from "./CustomSelection";
// import { Form } from "antd";
// import { Status } from "../../AsyncHelper/StatusAsyncHelper";

// export type ControlledSelectionProps = {
//     label: string,
//     mappedData: ,
//     tagError: unknown,
//     tagStatus: Status | Status[],
//     defaultValue: ,
// }


// export const ControlledSelection: ControlledElement<ControlledSelectionProps> = ({
//   control,
//   errors,
//   name,
//   label,
//   mappedData,
//   tagError,
//   tagStatus,
//   defaultValue,
// }) => {
//   return (
//     <Form.Item
//       label={label}
//       help={errors[name]?.message as string}
//       validateStatus={errors[name] ? "error" : ""}
//     >
//       <Controller
//         name={name}
//         control={control}
//         render={({ field }) => (
//           <CustomSelection
//             selectionData={{ data: mappedData }}
//             error={tagError}
//             status={tagStatus}
//             {...field}
//             data={defaultValue.tags.map((item: { tagId: string; name: string }) => ({
//               valueId: item.tagId,
//               name: item.name,
//             }))}
//             onChange={field.onChange}
//           />
//         )}
//       />
//     </Form.Item>
//   );
// };
