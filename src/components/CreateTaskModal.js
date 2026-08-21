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
import { CONSTANT } from "../utils/constant";
import { useColors } from "../common/hooks/color";

export function CreateTaskModal({ isOpen, onClose, onSave, mode, task }) {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState(taskValue);

  const colors = useColors();

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

  function handleSave(e) {
    e.preventDefault();

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
      <ModalOverlay bg={colors.modalOverlay} backdropFilter="blur(2px)" />

      <ModalContent
        bg={colors.modalBg}
        color={colors.textColor}
        border="1px solid"
        borderColor={colors.modalBorder}
        borderRadius="12px"
        p={{ base: "20px", md: "24px" }}
        w={{ base: "90%", sm: "450px" }}
      >
        <ModalHeader>
          {mode === "create"
            ? CONSTANT.tasks.createTask
            : CONSTANT.tasks.editTask}
        </ModalHeader>

        <chakra.form onSubmit={handleSave}>
          <ModalBody display="flex" flexDirection="column" gap="12px">
            {/* Task Title */}
            <div>
              <Input
                placeholder="Enter task title"
                name="title"
                value={form.title}
                onChange={handleChange}
                bg={colors.inputBg}
                color={colors.inputColor}
                border="1px solid"
                borderColor={errors.title ? colors.error : colors.inputBorder}
                _placeholder={{
                  color: colors.placeholderColor,
                }}
                _hover={{
                  borderColor: colors.inputHoverBorder,
                }}
                _focus={{
                  borderColor: colors.inputFocusBorder,
                  boxShadow: `0 0 0 1px ${colors.inputFocusBorder}`,
                }}
              />

              {errors.title && (
                <chakra.p color={colors.error} fontSize="12px" mt="4px">
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
              bg={colors.inputBg}
              color={colors.inputColor}
              border="1px solid"
              borderColor={colors.inputBorder}
              _placeholder={{
                color: colors.placeholderColor,
              }}
              _hover={{
                borderColor: colors.inputHoverBorder,
              }}
              _focus={{
                borderColor: colors.inputFocusBorder,
                boxShadow: `0 0 0 1px ${colors.inputFocusBorder}`,
              }}
            />

            {/* Status - Edit only */}
            {mode === "edit" && (
              <Select
                name="status"
                value={form.status}
                onChange={handleChange}
                bg={colors.inputBg}
                color={colors.inputColor}
                border="1px solid"
                borderColor={colors.inputBorder}
                _hover={{
                  borderColor: colors.inputHoverBorder,
                }}
                _focus={{
                  borderColor: colors.inputFocusBorder,
                  boxShadow: `0 0 0 1px ${colors.inputFocusBorder}`,
                }}
              >
                {CONSTANT.TaskStatusList.map((status) => (
                  <option
                    key={status.id}
                    value={status.value}
                    style={{
                      background: colors.inputBg,
                      color: colors.inputColor,
                    }}
                  >
                    {status.title}
                  </option>
                ))}
              </Select>
            )}
          </ModalBody>

          <ModalFooter display="flex" gap="12px" justifyContent="flex-end">
            {/* Cancel */}
            <Button
              type="button"
              onClick={closeHandler}
              bg={colors.cancelBg}
              color={colors.textColor}
              border="1px solid"
              borderColor={colors.actionBorder}
              borderRadius="8px"
              _hover={{
                bg: colors.cancelHoverBg,
              }}
            >
              Cancel
            </Button>

            {/* Submit */}
            <chakra.button
              type="submit"
              padding="8px 16px"
              border="1px solid"
              borderColor={colors.secondaryBtn}
              background={colors.secondaryBtn}
              color={colors.white}
              fontWeight="500"
              fontSize="16px"
              cursor="pointer"
              borderRadius="8px"
              transition="all 0.2s ease"
              _hover={{
                background: colors.secondaryHover,
              }}
              _active={{
                transform: "translateY(1px)",
              }}
            >
              {mode === "create" ? "Add Task" : "Save Changes"}
            </chakra.button>
          </ModalFooter>
        </chakra.form>
      </ModalContent>
    </Modal>
  );
}
