import { Flex, Typography } from "antd";
import { arrify } from "../../utils/object";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Spinner } from "../UI/Spinner/Spinner";

type Status = "success" | "loading" | "error" | "idle";

const DEFAULT_ERROR_TEXT = "Wystąpił błąd.";

type StatusAsyncHelperProps = {
  status: Status | Status[];
  error: unknown | unknown[];
  marginTop?: boolean;
};

const errorTypeGuard = (error: unknown): error is Error =>
  error instanceof Error;

const { Text } = Typography;

export const StatusAsyncHelper: React.FC<StatusAsyncHelperProps> = ({
  status,
  error,
}) => {
  const statuses = arrify(status);
  const errors = arrify(error);

  const filteredErrors = errors?.length
    ? errors.filter(errorTypeGuard)
    : undefined;

  const foundError = filteredErrors?.length ? filteredErrors[0] : undefined;

  if (foundError) {
    return (
      <Flex>
        <Text color="red">
          <ExclamationCircleOutlined style={{ marginRight: "0.5rem" }} />
          {DEFAULT_ERROR_TEXT}
        </Text>
      </Flex>
    );
  }

  const isLoading: boolean = statuses.some((status) => status === "loading");

  if (isLoading) {
    return (
      <Flex>
        <Spinner />
      </Flex>
    );
  }
};
