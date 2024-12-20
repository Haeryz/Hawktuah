import { useEffect } from 'react';
import { useMotionStore } from "./../store/motion"; // Assuming Zustand store is in 'store.js'
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, Box, Spinner } from '@chakra-ui/react';

function MotionComponents() {
  // Accessing the state and fetch function from the Zustand store
  const { motions, fetchMotions } = useMotionStore();

  useEffect(() => {
    fetchMotions(); // Fetch motions data when the component mounts
  }, [fetchMotions]);

  return (
    <Box padding={5}>
      {motions.length === 0 ? (
        <Spinner size="xl" /> // Show loading spinner if no motions data
      ) : (
        <Table variant="simple">
          <TableCaption>Motion Data</TableCaption>
          <Thead>
            <Tr>
              <Th>PIR</Th>
              <Th>Sound</Th>
              <Th>Buzzer</Th>
              <Th>LED</Th>
              <Th>Keterangan</Th>
              <Th>Timestamp</Th>
            </Tr>
          </Thead>
          <Tbody>
            {motions.map((motion) => (
              <Tr key={motion._id}>
                <Td>{motion.pir}</Td>
                <Td>{motion.sound}</Td>
                <Td>{motion.buzzer}</Td>
                <Td>{motion.led}</Td>
                <Td>{motion.keterangan}</Td>
                <Td>{new Date(motion.createdAt).toLocaleString()}</Td> {/* Display timestamp */}
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
}

export default MotionComponents;
