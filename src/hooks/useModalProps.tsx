import { useState } from "react";

export const useModalProps = <T extends Record<string, unknown> | undefined>(
  initialProps?: T
) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [props, setProps] = useState<T | undefined>(initialProps || ({} as T));

  const showModal = () => setIsModalOpen(true);

  const showModalWithProps = (props: T) => {
    setIsModalOpen(true);
    if (props) setProps(props);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProps(undefined);
  };

  return {
    isModalOpen,
    showModal,
    showModalWithProps,
    closeModal,
    props,
  };
};
