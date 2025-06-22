<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <p class="modal-message">
        Tem certeza que deseja <strong>{{ actionMessage }}</strong>?
      </p>
      <div class="modal-buttons">
        <button class="btn btn-confirm" @click="$emit('confirm')">Confirmar</button>
        <button class="btn btn-cancel" @click="$emit('cancel')">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  actionMessage: {
    type: String,
    required: true
  }
})

defineEmits(['confirm', 'cancel'])
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(128, 128, 128, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.modal-message {
  font-size: 18px;
  color: #333;
  margin-bottom: 24px;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.btn {
  padding: 8px 24px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}

.btn-confirm {
  background-color: #2e7d32;
  color: white;
}

.btn-cancel {
  background-color: #d32f2f;
  color: white;
}

.btn:hover {
  opacity: 0.9;
}
</style>
