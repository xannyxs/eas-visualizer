<template>
  <UModal v-model="modelValue">
    <div class="p-4 text-white">hello world</div>
  </UModal>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: { type: Boolean, required: true },
});
const emit = defineEmits(["update:modelValue"]);

const handleClose = () => {
  emit("update:modelValue", false);
};
</script>
