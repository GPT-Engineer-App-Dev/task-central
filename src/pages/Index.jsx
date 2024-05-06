import { useState } from 'react';
import { Box, Container, VStack, Input, Button, Text, IconButton, useToast } from '@chakra-ui/react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText } : task));
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
        <Input
          placeholder="Add a new task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          size="md"
        />
        <Button onClick={addTask} colorScheme="blue">Add Task</Button>
        <VStack spacing={4} w="full">
          {tasks.map((task) => (
            <Box key={task.id} p={4} shadow="md" borderWidth="1px" w="full" d="flex" justifyContent="space-between" alignItems="center">
              <Text>{task.text}</Text>
              <Box>
                <IconButton icon={<FaEdit />} onClick={() => editTask(task.id, prompt('Edit task:', task.text))} aria-label="Edit task" mr={2} />
                <IconButton icon={<FaTrash />} onClick={() => deleteTask(task.id)} aria-label="Delete task" />
              </Box>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;