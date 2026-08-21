import {
  Modal,
  chakra,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { taskValue } from "../utils/initialValues";
import { globalStyles } from "../common/theme/styles";
import { CONSTANT } from "../utils/constant";

export function CreateTaskModal({ isOpen, onClose, onSave, mode, task }) {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState(taskValue);

  const colors = globalStyles.colors;

  useEffect(() => {
    if (task && mode === "edit") {
      setForm({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "pending",
      });
    } else {
      setForm({
        ...taskValue,
        status: "pending",
      });
    }
  }, [task, mode]);

  function handleChange(e) {
    const { name, value } = e.target;

    if (value.startsWith(" ")) return;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  }

  function validateForm() {
    const temp = {};

    if (!form.title.trim()) {
      temp.title = CONSTANT.tasks.titleNameError;
    }

    setErrors(temp);

    return Object.keys(temp).length === 0;
  }

  function handleSave() {
    if (!validateForm()) return;

    if (mode === "edit") {
      onSave({
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
        status: form.status,
      });
    } else {
      onSave({
        id: "task_" + crypto.randomUUID(),
        title: form.title.trim(),
        description: form.description.trim(),

        // New tasks always start as Pending
        status: "pending",
      });
    }

    closeHandler();
  }

  function closeHandler() {
    onClose();
    setForm(taskValue);
    setErrors({});
  }

  return (
    <Modal isOpen={isOpen} onClose={closeHandler} isCentered>
      <ModalOverlay />

      <ModalContent
        bg={colors.white}
        borderRadius="12px"
        p={{ base: "20px", md: "24px" }}
        w={{ base: "90%", sm: "450px" }}
      >
        <ModalHeader>
          {mode === "create"
            ? CONSTANT.tasks.createTask
            : CONSTANT.tasks.editTask}
        </ModalHeader>

        <ModalBody display="flex" flexDirection="column" gap="12px">
          {/* Task Title */}
          <div>
            <Input
              placeholder="Enter task title"
              name="title"
              value={form.title}
              onChange={handleChange}
              border={`1px solid ${
                errors.title ? colors.error : colors.taskField
              }`}
            />

            {errors.title && (
              <chakra.p color="red" fontSize="12px" mt="4px">
                {errors.title}
              </chakra.p>
            )}
          </div>

          {/* Description */}
          <Textarea
            placeholder="Enter task description (optional)"
            name="description"
            value={form.description}
            onChange={handleChange}
            minH="100px"
          />

          {/* Status - Edit only */}
          {mode === "edit" && (
            <Select name="status" value={form.status} onChange={handleChange}>
              {CONSTANT.TaskStatusList.map((status) => (
                <option key={status.id} value={status.value}>
                  {status.title}
                </option>
              ))}
            </Select>
          )}
        </ModalBody>

        <ModalFooter display="flex" gap="12px" justifyContent="flex-end">
          <Button onClick={closeHandler} variant="outline">
            Cancel
          </Button>

          <chakra.button
            padding="8px 16px"
            border="1px solid"
            borderColor={colors.primaryBtn}
            background={colors.primaryBtn}
            color={colors.white}
            fontWeight="500"
            fontSize="16px"
            cursor="pointer"
            borderRadius="8px"
            onClick={handleSave}
            _hover={{
              background: colors.primaryHover,
            }}
          >
            {mode === "create" ? "Add Task" : "Save Changes"}
          </chakra.button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
