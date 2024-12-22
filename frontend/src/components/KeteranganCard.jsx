import { useEffect } from 'react';
import { useMotionStore } from "../store/motion";  // Adjust the path accordingly
import { Box, Text, Heading, Spinner, Card, CardBody } from "@chakra-ui/react";  // Chakra UI components

function KeteranganCard() {
  const { motions, fetchMotions } = useMotionStore();

  useEffect(() => {
    // Fetch motions when the component mounts
    fetchMotions();
  }, [fetchMotions]);

  // Display the keterangan from the latest motion, if available
  const keterangan = motions.length > 0 ? motions[motions.length - 1].keterangan : null;

  return (
    <Box
      maxW="md"
      borderWidth={1}
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      p={4}
      bg="white"
    >
      <Heading as="h2" size="lg" mb={4}>
        Keterangan:
      </Heading>
      <Card>
        <CardBody>
          {keterangan ? (
            <Text fontSize="xl" color="gray.700">
              {keterangan}
            </Text>
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center">
              <Spinner size="xl" />
            </Box>
          )}
        </CardBody>
      </Card>
    </Box>
  );
}

export default KeteranganCard;
