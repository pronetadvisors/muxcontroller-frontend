<template>
  <button @click="copy()">
    <font-awesome-icon :icon="['far', 'clipboard']" class="w-6 h-6 mr-3 text-blue-600 transition duration-200 hover:scale-125" />
  </button>
</template>
<script setup>
// ICONS
import { library } from '@fortawesome/fontawesome-svg-core';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
library.add(faClipboard);

// PROPS
const props = defineProps(['playback_id']);

import { notify } from "@kyvg/vue3-notification";

function copy() {
	navigator.clipboard.writeText(props.playback_id);
	notify({
		type: 'success',
		title: `Copied to clipboard`,
	});
}

</script>