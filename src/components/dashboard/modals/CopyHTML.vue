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
const props = defineProps(['playback_id', 'name', 'type']);

import { notify } from "@kyvg/vue3-notification";

// TODO - Figure out viewer user id
function copy() {
	const text = `
    <mux-player
        stream-type="${props.type}"
        playback-id="${props.playback_id}"
        metadata-video-title="${props.name}"
        metadata-viewer-user-id="test"
    ></mux-player>`;
	navigator.clipboard.writeText(text);
	notify({
		type: 'success',
		title: `Copied to clipboard`,
	});
}

</script>