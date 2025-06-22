import { createApp, h, ref } from 'vue'
import ConfirmationModal from '@/views/components/ConfirmationModal.vue'

export function useConfirmationModal() {
  const show = ref(false)
  const mensagem = ref('')
  let resolveFn = null

  const open = (msg) => {
    mensagem.value = msg
    show.value = true

    return new Promise((resolve) => {
      resolveFn = resolve
    })
  }

  const confirm = () => {
    show.value = false
    if (resolveFn) resolveFn(true)
  }

  const cancel = () => {
    show.value = false
    if (resolveFn) resolveFn(false)
  }

  const modal = createApp({
    render() {
      return h(ConfirmationModal, {
        show: show.value,
        actionMessage: mensagem.value,
        onConfirm: confirm,
        onCancel: cancel
      })
    }
  })

  const mountPoint = document.createElement('div')
  document.body.appendChild(mountPoint)
  modal.mount(mountPoint)

  return {
    open
  }
}
