<template>

</template>

<script>
import { VueDraggableDirective } from 'vue-draggable'

export default {
  data: () => ({
    options: {
      dropzoneSelector: 'ul',
      draggableSelector: 'li',
      handlerSelector: null,
      reactivityEnabled: true,
      multipleDropzonesItemsDraggingEnabled: true,
      showDropzoneAreas: true,
      onDrop: function(event) {},
      onDragstart: function(event) {},
      onDragenter: function(event) {},
      onDragover: function(event) {},
      onDragend: function(event) {}
    }
  }),
  props: ['option_list'],
  directives: {
    dragAndDrop: VueDraggableDirective
  }
}

</script>
