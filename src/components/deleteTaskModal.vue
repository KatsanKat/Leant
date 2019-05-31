<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <h1>Abandonner l'objectif ?</h1>
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
              <button class="modal-default-button" @click.stop="$emit('close')">
                annuler
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

<style lang="scss">
  .modal-mask {
    position: fixed;
    z-index: 4000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }
  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }
  .modal-body {
    margin: 20px 0;
  }
  .modal-default-button {
    color: $white;
    font-size: 20px;
    text-align: center;
    width: 100%;
    background-color: #42b983;
    border: none;
    padding: 15px 0;
    font-weight: 700;
    margin-top: 15px;
    &.danger {
      background-color: #f74e4e;
    }
  }
</style>
