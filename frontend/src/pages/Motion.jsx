import { useEffect } from 'react';
import { Container } from "@chakra-ui/react";
import { useMotionStore } from "../store/motion"; // Adjust the path accordingly
import MotionComponents from "../components/MotionComponents";
import ValueCard from "../components/ValueCard";

function Motion() {
  const { fetchMotions } = useMotionStore();

  useEffect(() => {
    fetchMotions(); // Fetch motions when component mounts
    // Optionally, set up an interval for real-time updates
    const intervalId = setInterval(fetchMotions, 5000); // Fetch every 5 seconds for example
    return () => clearInterval(intervalId); // Clean up on unmount
  }, [fetchMotions]);

  return (
    <Container>
      <MotionComponents />
      <ValueCard />
    </Container>
  );
}

export default Motion;