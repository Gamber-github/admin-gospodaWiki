import Button from "antd/es/button";
import Result from "antd/es/result";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Przepaszamy, ale strona, której szukasz nie istnieje."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Wróc do strony głównej
        </Button>
      }
    />
  );
};

export default Error404;
