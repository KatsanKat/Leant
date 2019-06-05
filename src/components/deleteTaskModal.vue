<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <h1>Abandonner ?</h1>
              <p>Un malus vous sera infligé</p>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button
                class="modal-default-button danger"
                @click.stop="$emit('delete-doing-task'); $emit('close')">
                Supprimer
              </button>
              <button class="modal-default-button dissmiss" @click.stop="$emit('close')">
                Annuler
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="js">
export default {
  name: 'deleteTaskModal',
};
</script>

<style scoped lang="scss">
.modal-mask .modal-wrapper .modal-container {
  p {
    padding-top: 10px;
    text-align: center;
  }
  .modal-default-button {
    &.danger {
      background-color: #ff4054;
      border: 2px solid #ff6d80;
    }
    &.dissmiss {
      margin-top: 0;
      background-color: transparent;
      color: #ff7777;
      border: none;
    }
  }
}
</style>
