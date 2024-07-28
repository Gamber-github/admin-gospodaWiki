import { ReactNode } from "react";
import {
  Options,
  SectionHeader,
  TileContainer,
  Wrapper,
} from "../UI/CustomStyles/CustomStyles";

type whiteTileProps = {
  children?: ReactNode;
  title?: string;
  options?: ReactNode;
  fullheight?: boolean;
};

export const WhiteTile: React.FC<whiteTileProps> = ({
  children,
  title,
  options,
  fullheight,
}) => {
  return (
    <TileContainer fullheight={fullheight}>
      {(title || options) && (
        <Wrapper>
          <SectionHeader>{title}</SectionHeader>
          <Options>{options}</Options>
        </Wrapper>
      )}
      {children}
    </TileContainer>
  );
};
