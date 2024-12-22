import { useEffect } from 'react';
import { Container, Flex, Box } from "@chakra-ui/react";
import { useMotionStore } from "../store/motion"; // Adjust the path accordingly
import MotionComponents from "../components/MotionComponents";
import ValueCard from "../components/ValueCard";
import KeteranganCard from '../components/KeteranganCard';

function Motion() {
  const { fetchMotions } = useMotionStore();

  useEffect(() => {
    fetchMotions(); // Fetch motions when component mounts
    // Optionally, set up an interval for real-time updates
    const intervalId = setInterval(fetchMotions, 5000); // Fetch every 5 seconds for example
    return () => clearInterval(intervalId); // Clean up on unmount
  }, [fetchMotions]);

  return (
    <Container maxW="container.xl" p={4}>
      <Flex direction={{ base: 'column', md: 'row' }} wrap="wrap" justify="space-between" gap={4}>
        <Box flex="1" minWidth="300px">
          <MotionComponents />
        </Box>
        <Box flex="1" minWidth="300px">
          <ValueCard />
        </Box>
        <Box flex="1" minWidth="300px">
          <KeteranganCard />
        </Box>
      </Flex>
    </Container>
  );
}

export default Motion;
