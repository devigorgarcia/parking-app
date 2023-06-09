import { Flex, useDisclosure } from "@chakra-ui/react";
import { MenuToggle } from "./MenuToggle";
import { NavLinks } from "./NavLinks";

export interface IHeaderProps {
  employee?: boolean;
}

export const Header = ({ employee }: IHeaderProps) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Flex
        as="nav"
        wrap="wrap"
        bg="gray.800"
        color="white"
        flexDir={"column"}
        h="100vh"
      >
        <MenuToggle isOpen={isOpen} onToggle={onToggle} />
        <NavLinks isOpen={isOpen} onToggle={onToggle} employee={employee} />
      </Flex>
    </>
  );
};
