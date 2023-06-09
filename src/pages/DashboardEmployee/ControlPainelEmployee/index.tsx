import { Container, Flex, Heading } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";

import { OccupationPainel } from "../../../components/DashboardAdmin/OccupationPainel";
import { PriceByHour } from "../../../components/DashboardAdmin/PriceByHourPainel";

import { Header } from "../../../components/Header";

export const ControlPainelEmployee = () => {
  const token = localStorage.getItem("@Parking:Token");

  if (!token) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <Flex>
      <Header employee />
      <Container
        maxW={"5xl"}
        display="flex"
        flexDir={"column"}
        alignItems="center"
        p="2rem"
        overflowY="auto"
        h={{ base: "100vh", md: "100%" }}
      >
        <Heading size={"3xl"}>Painel de Controle</Heading>
        <Flex mt="2rem" wrap={"wrap"} gap="2rem" justify={"center"}>
          <OccupationPainel />

          <PriceByHour />
        </Flex>
      </Container>
    </Flex>
  );
};
